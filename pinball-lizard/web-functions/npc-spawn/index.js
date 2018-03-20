'use strict'

const c = require('../common/constants')
const out = require('../common/output');
const util = require('../common/util');
const npc = require('../common/npc');
const playfab = require('../common/playfab');

const spawn = {

    allowedTypes: [
        "il", "at", "ff"
    ]

}

module.exports = function (context, req) {

    // check that session was initialized
    if( !util.checkSession( context ) ) {
        return context.done();
    }

    // require body
    if( !req.body ) {
        return context.done();
    }
    
    let npcs = context.bindings.npcs;
    const reqBody = util.parseJSON( req.body ) || util.fillReq();
    const type = req.params.type;
    const instanceIn = context.bindings.instanceIn[0];
    const instance = instanceIn.instance;
    const color = ( req.body.payload && req.body.payload.color ) || 'default';
    const formationId = req.body.payload.formationId;

    // validate incoming type
    const valid = util.validate( type, spawn.allowedTypes );

    if( valid && instance ) {
        const id = context.invocationId;
        // determine new waypoint
        const waypoint = npc.findWaypoint( npcs, type );
        if( waypoint >= 0 ) { // valid waypoint
            // create a new npc entry
            context.bindings.spawn = JSON.stringify(
                npc.create( instance, id, type, waypoint, color, formationId )
            );
            // create output
            context.res = out.compile(
                            200, 
                            c.type.ENEMY, 
                            reqBody[c.labels.SPEC],
                            reqBody[c.labels.ACTION],
                            null,
                            reqBody,
                            JSON.parse( context.bindings.spawn ) );                
            playfab.spawn( instance, type, instanceIn.playerName );
            playfab.flush( instance );
        } else { // no more waypoints to give
            context.res = out.compileError(200, c.message.NO_MORE_WAYPOINTS, reqBody);
        }
    } else { // invalid incoming type
        // 404
        context.res = out.compileError( 404, c.message.NOT_FOUND, reqBody );
    }
   
    // complete
    context.done();
};