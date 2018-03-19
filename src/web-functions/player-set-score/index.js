'use strict'

const util = require('../common/util');
const output = require('../common/output');
const c = require('../common/constants');
const playfab = require('../common/playfab');

module.exports = function (context, req) {

    // check that session was initialized
    if( !util.checkSession( context ) ) {
        return context.done();
    }
    
    const reqBody = util.parseJSON( req.body ) || util.fillReq();
    
    const instance = context.bindings.instanceIn[0];
    let score = req.params.score;

    // check score
    score = parseInt( score );
    if( isNaN( score ) || score < 0 ) {
        context.res = output.compileError( 400, c.message.INVALID_INPUT, reqBody );
        return context.done();  
    }

    // score is valid, set score and exit
    instance.playerScore = score;
    context.bindings.instanceOut = instance;
    context.res = output.compile( 200, c.type.PLAYER, reqBody.spec, reqBody.action, null, reqBody, {
        [c.labels.MESSAGE]: c.message.OK,
        [c.labels.PLAYER_SCORE]: instance.playerScore
    });

    // playfab.setScore( instance.instance, score, instance.playerName );
    // playfab.flush( instance.instance );
    context.done();
}