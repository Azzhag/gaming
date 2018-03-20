'use strict'

const requests = require('./relay-request');

const hostname = process.env.COMMANDER_IP;
const port = process.env.COMMANDER_PORT;
const commanderToken = process.env.COMMANDER_TOKEN;

const npcStatusKillPath = '/api/report/npc/killed/';
const instanceStartPath = '/api/report/instance/started';
const instanceDestroyPath = '/api/report/instance/destroyed';

const commanderCom = {};

const sendPostRequest = ( instance, path, data, headers = {} )  => {
    const id = requests.initRelay( instance );
    // insert headers for authentication against commander
    headers['Authorization'] = `Bearer ${commanderToken}`;
    requests.addPostRequest( id, hostname, port, path, headers, data  );
}

commanderCom.flush = instance => {
    requests.sendRelays( instance, true );
}

//( id, hostname, port, path, headers, data )
commanderCom.sendNPCStatusKilled = ( instance, npc, formationId ) => {
    // data is just members
    sendPostRequest( instance, npcStatusKillPath, { instance, npc, formationId } );
}

commanderCom.sendInitialization = instance => {
    sendPostRequest( instance, instanceStartPath, { instance } );
}

commanderCom.sendDestroy = instance => {
    sendPostRequest( instance, instanceDestroyPath, { instance } );
}

module.exports = commanderCom;