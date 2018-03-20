'use strict'

const config = require('../config');
const compileError = require('../helpers/error-message');

exports = module.exports = publicRoute => {
  return ( req, res, next ) => {
    if( req.msg[ config.passthrough ] === true ) {
      if( publicRoute.connected ) {
        publicRoute.send( req.msg.toJSON() );
        res.status(200).end();
      } else {
        res.send(
          compileError( config.err.ERR_WEBSOCKET_NOT_CONNECTED )
        );
      }
      return;
    } // else
    next();
  }
}
