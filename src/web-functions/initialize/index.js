'use strict'

const c = require('../common/constants');
const out = require('../common/output');
const util = require('../common/util');
const mixer = require('../common/mixer');
const commanderComs = require('../common/commander-coms');

module.exports = function (context, req) {

    const instance = context.invocationId;
    const reqBody = util.parseJSON( req.body ); 
    if( reqBody === null ) {
       context.res = out.compileError( 400, c.message.INVALID_INPUT, reqBody ); 
       return context.done();
    }

    // get player name from request, or use something else...
    let playerName;
    let enableMixer;
    if( reqBody.payload ) {
        if( reqBody.payload.playerName ) {
            playerName = reqBody.payload.playerName;
        } else {
            playerName = instance.split('-')[0];
        }
        enableMixer = reqBody.payload[c.labels.DO_MIXER];
    }

    const newInstance = {
        [c.labels.INSTANCE]: instance,
        [c.labels.GAME_ACTIVE]: false,
        [c.labels.PLAYER_SCORE]: 0,
        [c.labels.PLAYER_NAME]: playerName
    };

    context.res = out.compile( 
        200, c.type.INIT, reqBody.spec, 
        reqBody.action, null, reqBody, newInstance
    );

    context.bindings.instance = JSON.stringify( newInstance );

    context.done();
};