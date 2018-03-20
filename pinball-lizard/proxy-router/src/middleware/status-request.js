'use strict'

const {type} = require('../config/route/constants/private-route-constants');

exports = module.exports = publicRoute => {
  return ( req, res, next ) => {
    if( req.msg.type === type.STATUS ) {
      res.send( new Message({
        type:type.STATUS,
        spec:0,
        action:0,
        payload:{
          ws_connected:publicRoute.connected
        }
      }));
      return;
    } // else
    next();
  }
}
