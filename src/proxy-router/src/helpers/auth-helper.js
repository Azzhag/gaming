'use strict'

const config = require('../config');

const auth = msg => {
  return (
    msg && msg.auth &&
    msg.auth.key === config.authToken
  );
}

exports = module.exports = auth;
