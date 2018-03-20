'use strict'

const util = require('../common/util');
const output = require('../common/output');
const buildings = require('../common/buildings');
const c = require('../common/constants');

module.exports = function (context, req) {

    // check that session was initialized
    if( !util.checkSession( context ) ) {
        return context.done();
    }
    
    const reqBody = util.parseJSON( req.body ) || util.fillReq();
    const instance = context.bindings.instanceIn[0];
    const instanceId = req.params.instance;
    const id = context.invocationId;

    // create building
    const building = buildings.create( id, instanceId );

    // compile response
    context.res = output.compile( 200, c.type.BUILDING, reqBody.spec, reqBody.action, null, reqBody,
        {
            [c.labels.BUILDING_ID]: id,
            [c.labels.BUILDING_STATUS]: c.message.BUILDING_INTACT
        }
    );

    context.bindings.buildingOut = building;

    context.done();
}