'use strict'

const relay = require('./relay-request');
const mixerHandlerIP = process.env.MIXER_HANDLER_IP;
const mixerHandlerPort = process.env.MIXER_HANDLER_PORT;
const mixerHandlerToken = process.env.MIXER_HANDLER_TOKEN;

const mixerHandler = ( path, instance ) => {
    const headers = { Authorization: `Bearer ${mixerHandlerToken}` };
    const relayId = `${instance}mixer`;
    relay.initRelay( relayId );
    relay.addGetRequest( relayId, mixerHandlerIP, mixerHandlerPort, path, headers );
    // return values discarded
    relay.sendRelays( relayId, true );
    return true;
}

module.exports.connect = instance => {
    const path = `/api/link/${instance}`;
    return mixerHandler( path, instance );
}

module.exports.disconnect = instance => {
    const path = `/api/unlink/${instance}`;
    return mixerHandler( path, instance );
}