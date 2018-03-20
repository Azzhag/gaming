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
        waypoint:[x,y,z]
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
    const formation = context.bindings.formationIn[0]

    if( instance && formation ) {
        const formationId = payload[ c.labels.NPC_FORMATION_ID ];
        const waypoint = payload[ c.labels.NPC_FORMATION_WAYPOINT ];
        formation[ c.labels.NPC_FORMATION_WAYPOINT ] = waypoint;
        context.bindings.formation = formation;
        context.res = reqBody;
    } else { // invalid incoming instance
        // 404
        context.res = out.compileError( 404, c.message.NOT_FOUND, reqBody );
    }

    // complete
    context.done();
};