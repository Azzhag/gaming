'use strict'

const c = require('../config/constant');
const config = require('../config');
const util = require('./util');
const actions = {};
const pub = {};
const spawn = require('./spawn-request');
const controls = require('./mixer-controls');

let timeOffset = 0;

pub.participants = {};

pub.processMessage = ( payload, instance, client ) => {
  payload = util.safeParseJSON( payload );
  if( payload.type === c.MIXER_METHOD_TYPE_REPLY ) {
    if( payload.result && payload.result.time > 0 ) {
      syncTimeOffset( payload.result.time );
    }
  } else if( payload.type == c.MIXER_TYPE_METHOD ){
    switch( payload.method ) {
      case c.MIXER_METHOD_TYPE_JOIN:
        actions.mixerUserJoin( payload );
        break;
      case c.MIXER_METHOD_TYPE_JOIN:
        actions.mixerUserJoin( payload );
        break;
      case c.MIXER_METHOD_TYPE_LEAVE:
        actions.mixerUserLeave( payload );
        break;
      case c.MIXER_METHOD_TYPE_INPUT:
        actions.mixerUserInput( payload, instance, client );
        break;
    }
  }
}

actions.mixerUserInput = async ( payload, instance, client ) => {
  let user = pub.participants[ payload.params.participantID ];
  if( payload.params.input.controlID === c.MIXER_CONTROL_ID_ATOMIC
   && payload.params.input.event === c.MIXER_PARAMS_EVENT_MOUSE_DOWN
  ) {
    console.log( `${user.username} pushed button...` );
    const atomicButton = controls.types.atomicButton( getCooldownTime() );
    await client.updateControls({
      sceneID: 'default',
      controls: atomicButton
    });
    spawn.send( spawn.SPEC_ICE_LICE, instance, c.MIXER_CONTROL_ATOMIC_COLOR );
  }
}

actions.mixerUserLeave = payload => {
  let users = payload.params.participants;
  for( let p of users ) {
    console.log( `Participant left: ${p.username}` );
    if( pub.participants[p.sessionID] !== undefined ) {
      delete pub.participants[p.sessionID];
    }
  }
}

actions.mixerUserJoin = payload => {
  let parts = payload.params.participants;
  for( let p of parts ) {
    console.log(`Participant joined: ${p.username}`);
    pub.participants[p.sessionID] = p;
  }
}

const syncTimeOffset = ts => {
  timeOffset = ts - Date.now();
  console.log( `Server Time Offset: ${ ts - Date.now() }ms` );
}

const getSyncTime = () => {
  return Date.now() + timeOffset;
}

const getCooldownTime = () => {
  console.log( config )
  return Date.now() + parseInt( config.MIXER_BUTTON_COOLDOWN );
}



exports = module.exports = pub;
