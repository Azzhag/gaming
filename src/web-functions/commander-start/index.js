'use strict'

const c = require('../common/constants');
const out = require('../common/output');
const util = require('../common/util');
const mixer = require('../common/mixer');
const commanderComs = require('../common/commander-coms');

module.exports = function (context, req) {

    if( !util.checkSession( context ) ) {
        context.done();
    }

    const instance = context.bindings.instanceIn[0];
    const reqBody = util.parseJSON( req.body );

    if( reqBody === null ) {
       context.res = out.compileError( 400, c.message.INVALID_INPUT, reqBody ); 
       return context.done();
    }

    // mark instance active
    instance[c.labels.GAME_ACTIVE] = true;
    instance[c.labels.DO_MIXER] = true;

    context.res = out.compile( 
        200, c.type.INIT, reqBody.spec, 
        reqBody.action, 'Game started', reqBody
    );

    context.bindings.instance = instance;
    
    const instanceId = instance.instance;

    // we don't wait for this call to be completed
    mixer.connect( instanceId );

    // initialize commander
    commanderComs.sendInitialization( instanceId );
    commanderComs.flush( instanceId );

    context.res.instance = instanceId;

    context.done();
};