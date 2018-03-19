'use strict'

const config = require('../config');

const util = {};

util.safeParseJSON = str => {
  try { return JSON.parse( str ); }
  catch( err ) { return {}; }
}

// rand from min(inclusive)-max(exclusive)
util.randomNumber = ( min, max ) => {
  return ( Math.floor( Math.random() * max ) + min );
}

util.randomFromObject = obj => {
  let keys = Object.keys( obj );
  let max = keys.length;
  let rand = randomNumber( 0, max );
  let randKey = keys[ rand ];
  return obj[randKey];
}

util.authentication = {
  routerAuthenticationHeader: function() {
    return {
      'authorization':`Bearer ${config.ROUTER_AUTH_TOKEN}`
    };
  },
  jsonAuthentication: function() {
    return {
      "key":config.ROUTER_AUTH_TOKEN
    }
  }
}

exports = module.exports = util;
