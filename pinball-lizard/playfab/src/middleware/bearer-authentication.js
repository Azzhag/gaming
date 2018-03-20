'use strict'

const { PLAYFAB_HANDLER_TOKEN } = require('../config');

exports = module.exports = (req, res, next) => {
  const authHeader = req.get('Authorization');
  if( authHeader ) {
    const parts = authHeader.split( ' ' );
    if( parts.length > 1 && parts[0].toLowerCase() === 'bearer' ) {
      if( parts[1] == PLAYFAB_HANDLER_TOKEN ) {
        next();
        return;
      }
    }
  }
  res.status( 401 ).send( 'Not Authorized' );
}
