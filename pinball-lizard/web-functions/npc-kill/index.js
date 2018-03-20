'use strict'

const output = require('../common/output');
const util = require('../common/util');
const c = require('../common/constants');
const npc = require('../common/npc');
const playfab = require('../common/playfab');
const commanderCom = require('../common/commander-coms');

module.exports = function (context, req) {

    // check that session was initialized
    if( !util.checkSession( context ) ) {
        return context.done();
    }
    
    const npc = context.bindings.npcIn[0];
    const formation = context.bindings.formationIn[0];
    const instance = context.bindings.instanceIn[0];
    const npcId = req.params.id;
    const formationId = req.params.formation;
    const instanceId = req.params.instance;
    const reqBody = util.parseJSON( req.body ) || util.fillReq();
    // if we got an npc
    if( npc ) {
        // find our target npc and change status
        let msg;
        if( npc[ c.labels.NPC_STATUS ] === c.message.NPC_DEAD ) {
            msg = c.message.NPC_ALREADY_DEAD;
        } else {
            msg = c.message.NPC_KILLED;
            // change npc status
            npc[ c.labels.NPC_STATUS ] = c.message.NPC_DEAD;
            // alert commander of death
            commanderCom.sendNPCStatusKilled( instanceId, npc, formationId );
            // alert playfab of a death
            playfab.die( instanceId, npc.npcType, instance.playerName );
            // flush all relays against instanceId
            commanderCom.flush( instanceId );
        }
        // output this npc to the cosmosdb binding
        context.bindings.npcOut = npc;
        // remove one member from formation
        formation[c.labels.NPC_FORMATION_MEMBER_COUNT] -= 1;
        context.bindings.formationOut = formation;
        
        context.res = output.compile( 200, c.type.ENEMY, reqBody.spec, reqBody.action, null, reqBody,
            {
                [c.labels.MESSAGE]: msg, 
                [c.labels.NPC_ID]: npc[c.labels.NPC_ID],
                [c.labels.NPC_STATUS]: npc[c.labels.NPC_STATUS]
            }
        );
    } else {
        context.res = output.compileError( 404, c.message.NOT_FOUND, reqBody );
    }

    // complete
    context.done();
};