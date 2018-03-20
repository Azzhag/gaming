'use strict'

const config = require('../config');
const messages = require('./message-callbacks');
const c = require('../config/constant.js');
const util = require('./util');
const interactive = require('beam-interactive-node2');
const ws = require('ws');
const controls = require('./mixer-controls');

const authToken = config.MIXER_CHANNEL_TOKEN;
const versionId = config.MIXER_CHANNEL_VERSION_ID;

let instanceId;
let timeOffset = 0;
let killTimeout;

interactive.setWebSocket( ws );
const client = new interactive.GameClient();
let active = false;

client.on('open', () => console.log( 'Attempting to connect...' ) );

client.on('message', payload => {
  console.log( payload )
  messages.processMessage( payload, instanceId, client );
});

client.on('error', err => {
  active = false;
  console.log( `Error from interactive:`);
  console.log( err );
});

client.on('hello', () => client.ready( true ) );

client.on('send', payload => {
  payload = util.safeParseJSON( payload );
  if( payload.method === c.MIXER_METHOD_VALIDATE_READY ) {
    // check param isReady
    active = payload.params.isReady || false;
    if( payload.params.isReady ) {
      active = true;
      console.log( 'Interactive Active.' );
    }
  }
});

const openClient = async instance => {
  clearTimeout( killTimeout );
  killTimeout = setTimeout( () => {
   console.log(`Timed out ${instance}`);
   closeClient( instance );
  }, c.TIMEOUT_TIME );
  const atomicButton = controls.types.atomicButton();
  await client.open( { authToken, versionId } );
  instanceId = instance;
  try {
    await client.createControls({
      sceneID: 'default',
      controls: atomicButton
    });
  } catch( err ){
    console.log( err );
  }
}

const closeClient = async instance => {
  if( !instanceId ) {
    return;
  }else if( instance === instanceId ) {
    console.log( `${instance} closed`)
    await client.close();
    messages.participants = {};
    active = false;
  } else if ( instanceId ) {
    console.log( `${instanceId} still active, closing...` );
    instanceId = null;
    await client.close();
    active = false;
  }
}

const connected = () => {
  return active;
}

const connectionStatus = () => {
  return connected() ? `Interactive Connected: ${instanceId}` : 'Not Connected to Interactive';
}

const getUsers = () => {
  let users = [];
  let participants = messages.participants;
  for( let x in participants ) {
    let user = participants[ x ];
    users.push({
      username:user.username,
      level:user.level,
      connectionTime:user.connectedAt
    });
  }
  return users;
}

const actions = {
    start: openClient,
    stop: closeClient,
    connected: connected,
    status: connectionStatus,
    users: getUsers
};

exports = module.exports = actions;
