'use strict'

const util = require('../common/util');
const output = require('../common/output');
const c = require('../common/constants');

module.exports = function (context, req) {

    // check that session was initialized
    if( !util.checkSession( context ) ) {
        return context.done();
    }
    
    const reqBody = util.parseJSON( req.body ) || util.fillReq();
    
    const instance = context.bindings.instanceIn[0];
    const name = req.params.name;

    // check name
    if( name === undefined ) {
        context.res = output.compileError( 400, c.message.INVALID_INPUT, reqBody );
        return context.done();  
    }

    // name is valid, set name and exit
    instance.playerName = name;
    context.bindings.instanceOut = instance;
    context.res = output.compile( 200, c.type.PLAYER, reqBody.spec, reqBody.action, null, reqBody, {
        [c.labels.MESSAGE]: c.message.OK,
        [c.labels.PLAYER_NAME]: name
    });
    context.done();
}