'use strict'

const config = require( '../config/config.json' );

const auth = msg => {
  return (
    msg && msg.auth &&
    msg.auth.key === config.AUTH_KEY
  );
}

exports = module.exports = auth;
