'use strict'

const out = require('../common/output');
const c = require('../common/constants');
const npc = require('../common/npc');
const util = require('../common/util');

module.exports = function (context, req) {
    
    // check that session was initialized
    if( !util.checkSession( context ) ) {
        return context.done();
    }

    const building = context.bindings.buildingIn[0];
    const reqBody = util.parseJSON( req.body ) || util.fillReq();

    // if we got a building from id binding
    if( building ) {
        // create success message
        context.res = out.compile( 200, c.type.ENEMY, reqBody.spec, reqBody.action, null, reqBody,
            {
                [c.labels.MESSAGE]: c.message.BUILDING_STATUS,
                [c.labels.BUILDING_ID]: building[c.labels.BUILDING_ID],
                [c.labels.BUILDING_STATUS]: building[c.labels.BUILDING_STATUS]
            }
        );
    } else {
        context.res = r.output.compileError( 404, c.message.NOT_FOUND, reqBody );
    }

    // complete
    context.done();
};