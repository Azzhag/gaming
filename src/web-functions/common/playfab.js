'use strict'

const relay = require('./relay-request');
const constants = require('./constants');
const playfabHandlerIP = process.env.PLAYFAB_HANDLER_IP;
const playfabHandlerPort = process.env.PLAYFAB_HANDLER_PORT;
const playfabHandlerToken = process.env.PLAYFAB_HANDLER_TOKEN;

let lastUpdateTime = 0;

const playfabHandler = ( path, instance, postData ) => {
    const headers = { Authorization: `Bearer ${playfabHandlerToken}` };
    const relayId = relay.initRelay( instance );
    relay.addPostRequest( relayId, playfabHandlerIP, playfabHandlerPort, path, headers, postData );
    return true;
}

module.exports.flush = instance => {
    relay.sendRelays( instance, true );
}

module.exports.spawn = ( instance, type, username ) => {
    const path = `/api/spawn/${type}`;
    const data = { username, instance };
    return playfabHandler( path, instance, data );
}

module.exports.die = ( instance, type, username ) => {
    const path = `/api/die/${type}`;
    const data = { username, instance };
    return playfabHandler( path, instance, data );
}

module.exports.setScore = ( instance, score, username ) => {
    if( lastUpdateTime + constants.val.SCORE_REPORT_UPDATE_TIMEOUT < Date.now() ) {
        // return values discarded
        const path = `/api/score/set`;
        const data = { username, instance, score };
        lastUpdateTime = Date.now();
        return playfabHandler( path, instance, data );
    } else {
        console.log( 'Score add skipped...');
        return false;
    }
}

module.exports.destroyBuilding = ( instance, username ) => {
    const path = `/api/building/destroy`;
    const data = { username, instance };
    return playfabHandler( path, instance, data );
}