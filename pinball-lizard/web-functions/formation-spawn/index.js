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
        formationId:"",
        listOfOffsets:[ [x,y,z], [x,y,z] ],
        members:[
            {
                "npcId":"",
                "color":"default"||"pink",
                "alive":true,
                "formationId":"<formationId>"
            }
        ]
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

    // require body
    if( !req.body || !req.body.payload ) {
        return outputError( context );
    }

    console.log( 'initial requirements passed' )
    const reqBody = util.parseJSON( req.body ) || util.fillReq();   
    const instanceIn = context.bindings.instanceIn[0];
    const instance = instanceIn.instance;
    const payload = reqBody.payload;

    if( instance ) {
        // only icelice allowed in formations
        const type = req.params.type;
        if( !util.validate( type, allowedTypes ) ){
            return outputError( context );
        }
        const formationId = payload [ c.labels.NPC_FORMATION_ID ];
        const formationWaypoint = payload[ c.labels.NPC_FORMATION_WAYPOINT ];
        const offsets = payload[ c.labels.NPC_FORMATION_OFFSETS ];
        const members = payload.members;
        if( !members ) {
            return outputError( context );
        }
        const outMembers = formations.createFormationMembers( instance, formationId, members );
        if( !outMembers ) {
            return outputError( context );
        }
        const listOfMembers = [];
        for( let member of members ) {
            listOfMembers.push( member[c.labels.NPC_ID] );
        }
        const formation = formations.createFormation( instance, formationId, formationWaypoint, offsets, members );
        // create formation output object
        context.bindings.formation = formation;
        context.bindings.npcs = outMembers;
        // pass on the request
        reqBody[c.labels.INSTANCE] = instance;
        reqBody[c.labels.PAYLOAD] = {
            listOfMembers,
            formationId,
            listOfOffsets:offsets,
            waypoint:formationWaypoint
        }
        context.res = reqBody;
                        
        playfab.spawn( instance, 'F', instanceIn.playerName );
        playfab.flush( instance );
        
    } else { // invalid incoming instance
        // 404
        context.res = out.compileError( 404, c.message.NOT_FOUND, reqBody );
    }

    // complete
    context.done();
};