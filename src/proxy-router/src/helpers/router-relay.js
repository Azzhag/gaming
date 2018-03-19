'use strict'

const errMessage = require('../config').err;
const compileError = require('./error-message');
const { replyToSender, replyToBoth } = require('../config');

/**
*
* @param {json} orig originial json request
* @param {?|json} server_resp response from server
* @param {express} res the express response Object
* @param {Wss-server} ws the websocket object
*/

const relay = (server_resp, orig, res, ws) => {
    if( orig[replyToBoth] === true && res && ws ) {
      res.set( 'content-type', 'application/json' )
         .status( 200 )
         .send( server_resp );
      ws.send( server_resp );
      // check returnToSender value
    } else if( orig[replyToSender] === true && res ) {
      // in this case we're always responding via prv res eg ret
      res.set( 'content-type', 'application/json' )
         .status( 200 )
         .send( server_resp );
    }else { // otherwise it goes to the websocket
      if( !ws.connected && res ){
        res.status( 500 ).send( compileError( errMessage.ERR_WEBSOCKET_NOT_CONNECTED ) );
      } else {
        ws.send( server_resp );
        if( res ) {
          res.status( 200 ).end();
        }
      }
    }
}

exports = module.exports = relay;
