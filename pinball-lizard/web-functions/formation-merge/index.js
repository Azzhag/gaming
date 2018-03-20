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
        secondaryFormationId:"",
        listOfOffsets:[[],[],[]]
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

    const reqBody = util.parseJSON( req.body ) || util.fillReq();   
    const instanceIn = context.bindings.instanceIn[0];
    const instance = instanceIn.instance;
    const payload = reqBody.payload;

    if( instance ) {
        // only icelice allowed in formations
        const formationId = payload[ c.labels.NPC_FORMATION_ID ];
        const secondaryFormationId = payload[ c.labels.NPC_FORMATION_SECONDARY_ID ];
        const npcs = context.bindings.npcsIn;
        let formationA;
        let formationB;

        for( let formation of context.bindings.formationsIn ) {
            if( formation[c.labels.NPC_FORMATION_ID] === formationId ) {
                formationA = formation;
            }else {
                formationB = formation;
            }
        }
        console.log( `NPCS length: ${npcs.length}` );
        // mark all members formation as formationA
        const listOfMembers = [];
        for( let npc of npcs ) {
            npc[ c.labels.NPC_FORMATION_ID ] = formationId;
            listOfMembers.push( npc[ c.labels.NPC_ID ] );
        }
        // change count and offsets in formation A
        formationA[c.labels.NPC_FORMATION_MEMBER_COUNT] = npcs.length;
        formationA[c.labels.NPC_FORMATION_OFFSETS] = payload.listOfOffsets;
        // deactivate formation B
        formationB[c.labels.NPC_FORMATION_ACTIVE] = false;
        // create formation output object
        context.bindings.formations = [formationA, formationB];
        context.bindings.npcs = npcs;
        // pass on the request
        reqBody.payload[c.labels.NPC_FORMATION_MEMBERS] = listOfMembers;
        context.res = reqBody;
    } else { // invalid incoming instance
        // 404
        context.res = out.compileError( 404, c.message.NOT_FOUND, reqBody );
    }

    // complete
    context.done();
};