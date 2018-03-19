'use strict'

const config = require('../config/config.json');
const auth_key = config.INTERNAL_RELAY_AUTH_TOKEN;

exports = module.exports = ( req, res, next ) => {
  const auth = req.headers['authorization'];
  let allowed = false;
  if( auth ) {
    let parts = auth.split( ' ' );
    if( parts.length > 1 && parts[0].toLowerCase() === 'bearer' ) {
      allowed = parts[1] === auth_key;
    }
  }
  if( !allowed ) {
      res.status( 401 ).end();
  } else {
      next();
  }
}
