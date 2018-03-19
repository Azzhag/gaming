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
    const score = instance.playerScore;

    // check score
    if( score === undefined || score < 0 ) {
        context.res = output.compileError( 400, c.message.NOT_FOUND, reqBody );
        return context.done();  
    }

    // score is valid, set score and exit
    context.res = output.compile( 200, c.type.PLAYER, reqBody.spec, reqBody.action, null, reqBody, {
        [c.labels.MESSAGE]: c.message.OK,
        [c.labels.PLAYER_SCORE]: score
    });
    context.done();
}