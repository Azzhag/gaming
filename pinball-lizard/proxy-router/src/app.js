'use strict'

const config = require('./config');
// require pre-configured connections
const { pub, prv } = require('./connections/create-connections');
const compileError = require('./helpers/error-message');
const schema = require('./config/schema/message-schema');
const Message = require('./obj/Message');
const relay = require('./helpers/router-relay');
const authenticateMW = require('./middleware/authenticate');
const bearerAuth = require('./middleware/bearer-authentication');
const passthruMW = require('./middleware/passthru-request');
const statusMW = require('./middleware/status-request');
const Route = require('./obj/Route');
const reloadTrigger = require('./helpers/retrieve-config').trigger;

/*************************************
********* Websocket Handler **********
**************************************/

pub.onMessage( async (msg, ws, context) => {
    // resolve route
    let r = new Route( msg ).resolve();
    if( r !== null ) {
      try {
        let res = await prv.send( msg, r.url, r.headers );
        relay( res, msg, null, pub );
      }catch( err ) {
        // reply to sender on err
        context.send( compileError( err ) );
      }
    } else {
      // reply to sender on err
      let errMsg = compileError( config.err.ERR_INVALID_ROUTE );
      errMsg.payload.originalRequest = msg.toJSON();
      context.send( errMsg );
    }
  }).start();


/*************************************
********* Backdoor Handler  **********
**************************************/

prv.app.get( '/config/reload', bearerAuth, reloadTrigger );

prv.app.use( (req, res, next) => {
  // msg contained in req.body is already parsed JSON
  let msg = new Message( req.body );
  // block if invalid message
  let valid = msg.isValid( schema );
  if( valid === true ) {
    req.body = null;
    req.msg = msg;
    next();
  } else {
    res.status(400).send( compileError( valid ) );
  };
});

prv.app.use( [bearerAuth, passthruMW(pub), statusMW(pub)] );

prv.app.use( async (req, res, next) => {
    let r = new Route( req.msg ).resolve( true );
    if( r !== null ) {
      try {
        let resp = await prv.send( req.msg, r.url, r.headers );
        relay( resp, req.msg, res, pub );
      } catch( err ){
        console.log( err );
        //res.send( compileError( err ) );
      }
    } else {
      // reply to sender on err
      let errMsg = compileError( config.err.ERR_INVALID_ROUTE );
      errMsg.payload.originalRequest = msg.toJSON();
      res.json( errMsg );
    }
});
