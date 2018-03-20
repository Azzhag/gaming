'use strict'

const util = require('../common/util');
const output = require('../common/output');
const buildings = require('../common/buildings');
const playfab = require('../common/playfab');
const c = require('../common/constants');

module.exports = function (context, req) {

    // check that session was initialized
    if( !util.checkSession( context ) ) {
        return context.done();
    }
    
    const reqBody = util.parseJSON( req.body ) || util.fillReq();
    const instance = context.bindings.instanceIn[0];
    let building = context.bindings.buildingIn[0];

    if( building ){
        // compile response
        const msg = building[ c.labels.BUILDING_STATUS ]
                        === c.message.BUILDING_DESTROYED
                        ? c.message.BUILDING_ALREADY_DESTROYED
                        : c.message.BUILDING_KILLED;
        // update cosmosdb
        building[ c.labels.BUILDING_STATUS ] = c.message.BUILDING_DESTROYED;
        context.bindings.buildingOut = building;
        context.res = output.compile( 200, c.type.BUILDING, reqBody.spec, reqBody.action, null, reqBody,
            {
                [c.labels.MESSAGE]: msg,
                [c.labels.BUILDING_ID]: building[c.labels.BUILDING_ID],
                [c.labels.BUILDING_STATUS]: building[c.labels.BUILDING_STATUS]
            }
        );
    } else {
        context.res = output.compileError(404, c.message.NOT_FOUND, reqBody);
    }
    playfab.destroyBuilding( instance.instance, instance.playerName );
    playfab.flush( instance.instance );
    context.done();
}