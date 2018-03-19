'use strict'

const https = require('https');
const config = require('../config');
const TYPE = 1;
const ACTION = 9;
const TYPE_ERROR = 3;

const req = {};
req.SPEC_ICE_LICE     = 1;
req.SPEC_ARACHNO_TANK = 2;
req.SPEC_FIRE_FLY     = 3;

const compile = ( spec, instance, color ) => {
  return {
    instance,
    auth: {
      key: config.ROUTER_AUTH_TOKEN
    },
    action: ACTION,
    type: TYPE,
    spec,
    payload:{
      color
    }
  }
}

const sendRequest = payload => {
  payload = JSON.stringify( payload );
  const opts = {
    host: config.ROUTER_IP,
    port: config.ROUTER_PORT,
    method: 'POST',
    rejectUnauthorized: false,
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload),
        'authorization': `Bearer ${config.ROUTER_AUTH_TOKEN}`
    }
  }
  return new Promise( (resolve, reject) => {
    let req = https.request( opts, res => {
      let response = '';
      res.setEncoding('utf8');
      res.on('data', chunk => {
        response += chunk;
      });
      res.on( 'end', () => {
        if( res.statusCode === 200 ) {
          resolve( response );
        } else {
          console.log( res.statusMessage )
          reject( response );
        }
      });
    });
    req.on('error', err => {
      reject( err );
    });
    req.write( payload );
    req.end();
  });
}

req.send = async ( spec, instance, color ) => {
  const payload = compile( spec, instance, color );
  try {
    let res = await sendRequest( payload );
    console.log( res );
    return true;
  } catch( err ) {
    console.log( `Send error: ${err}`);
  }
}

exports = module.exports = req;
