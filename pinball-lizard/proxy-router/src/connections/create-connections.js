'use strict'

const config = require('../config');
const Message = require('../obj/Message');
const altHealthProbe = require('./health-probe');
const compileError = require('../helpers/error-message');
const schema = require('../config/schema/message-schema');
const authHelper = require('../helpers/auth-helper');

const pub = require('./public-connection')( config.wsPort, config.useSSL );
const prv = require('./private-connection')( config.internalPort, config.bdUseSSL );

// require alt health check probe
// unless port overlaps with ws or bd
if( config.altHealthPort !== config.wsPort
    && config.altHealthPort !== config.InternalPort
){
  altHealthProbe.listen( config.altHealthPort );
}

// disallow response redirect on public/websocket requests
pub.onMessage(( m, ws, context ) => {
  // parse message to JSON
  let msg;
  try {
    msg = JSON.parse( m );
  }catch( err ){
    context.send( compileError( config.err.ERR_INVALID_DATA ) );
    context.setWebSocketValidated( ws, false );
    return false;
  }

  // basic authentication
  if( !authHelper( msg ) ){
    context.setWebSocketValidated( ws, false );
    context.send( "unauthorized", true );
    return false;
  } else {
    context.setWebSocketValidated( ws, true );
  }

  // create message
  let M = new Message( msg );
  // force response to sender
  M.returnToSender = true;
  // validate schema
  let valid = M.isValid( schema );
  if( valid !== true ) {
    context.send( compileError( valid ), true );
    // stop processing callback stack
    return false;
  }

  // return msg to pass to next method on stack
  return M;
});

pub.onStart( context => {
    const wss = config.useSSL ? 'WSS' : 'WS';
    console.log(`Listening for websocket connections on port: ${config.wsPort} (${wss})`);
});

exports = module.exports = { pub, prv }
