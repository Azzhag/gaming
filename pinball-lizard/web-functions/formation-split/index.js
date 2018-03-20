'use strict'

const c = require('../common/constants')
const out = require('../common/output');
const util = require('../common/util');
const npc = require('../common/npc');
const playfab = require('../common/playfab');
const formations = require('../common/formations');

const allowedTypes = ['il'];

// payload schema
/*
*
{
    "instance": "",
    "replyToBoth": true,
    "type": 1,
    "spec": 4,
    "action": 4,
    "payload": {
        formation:{
            formationId,
            members,
            listOfOffsets,
            waypoint
        },
        secondaryFormation:{
            formationId,
            members,
            listOfOffsets,
            waypoint
        }
    }
}
*
*/

const outputError = context => {
    context.res = out.compileError( 400, c.message.INVALID_INPUT );
    context.done();
    return;
}

module.exports = function (context, req) {

    // check that session was initialized
    if( !util.checkSession( context ) ) {
        return context.done();
    }

    // require body && payload
    if( !req.body || !req.body.payload ) {
        return outputError( context );
    }

    const reqBody = util.parseJSON( req.body ) || util.fillReq();
    const instanceIn = context.bindings.instanceIn[0];
    const instance = instanceIn.instance;
    const payload = reqBody.payload;
    let npcs = context.bindings.npcsIn;
    const formation = context.bindings.formationIn[0];

    const userFormation = payload.formation;
    const userSecondaryFormation = payload.secondaryFormation;

    if( instance ) {

        const listOfMembers = userFormation.members;
        const listOfMemberIds = [];
        const secondaryListOfMembers = userSecondaryFormation.members;
        const secondaryListOfMemberIds = [];
        
        // flatten member lists to keys
        for( let member of listOfMembers ) {
            listOfMemberIds.push( member.npcId );
        }
        for( let member of secondaryListOfMembers ) {
            secondaryListOfMemberIds.push( member.npcId );
        }

        // loop through to keep all other data intact
        for( let npc of npcs ) {
            if( listOfMemberIds.includes( npc[c.labels.NPC_ID] ) ) {
                npc[c.labels.NPC_FORMATION_ID ] = userFormation.formationId;
            }else{
                npc[c.labels.NPC_FORMATION_ID ] = userSecondaryFormation.formationId;
            }
        }

        context.log( npcs );

        // update existing formation
        formation[c.labels.NPC_FORMATION_MEMBER_COUNT] = listOfMembers.length;
        formation[c.labels.NPC_FORMATION_OFFSETS] = userFormation.listOfOffets;

        // create new formation
        const secondaryFormation = {
            [c.labels.INSTANCE]:instance,
            [c.labels.NPC_FORMATION_WAYPOINT]:userSecondaryFormation.waypoint,
            [c.labels.NPC_FORMATION_ID]:userSecondaryFormation.formationId,
            [c.labels.NPC_FORMATION_MEMBER_COUNT]:secondaryListOfMembers.length,
            [c.labels.NPC_FORMATION_OFFSETS]:userSecondaryFormation.listOfOffsets
        }
        
        // bind output
        context.bindings.formation = formation;
        context.bindings.secondaryFormation = secondaryFormation;
        context.bindings.npcs = npcs;
        // update output payload
        reqBody.payload = {
            [c.labels.NPC_FORMATION_ID]: formation.id,
            [c.labels.NPC_FORMATION_SECONDARY_ID]: userSecondaryFormation.formationId,
            [c.labels.NPC_WAYPOINT]: userSecondaryFormation.waypoint,
            [c.labels.NPC_FORMATION_MEMBERS]: listOfMemberIds,
            [c.labels.NPC_FORMATION_SECONDARY_MEMBERS]: secondaryListOfMemberIds,
            [c.labels.NPC_FORMATION_OFFSETS]: userFormation.listOfOffsets,
            [c.labels.NPC_FORMATION_SECONDARY_OFFSETS]: userSecondaryFormation.listOfOffsets
        }
        // output http(s)
        context.res = reqBody;
    } else { // invalid incoming instance
        // 404
        context.res = out.compileError( 404, c.message.NOT_FOUND, reqBody );
    }
    // complete
    context.done();
};