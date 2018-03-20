'use strict'

const _ = require('lodash');
const https = require('https');
const http = require('http');
const Bottleneck = require('bottleneck');
const { minRequestDelayTime, maxOutgoingRequests } = require('../config');

const limiter = new Bottleneck({
  maxConcurrent: maxOutgoingRequests,
  minTime: minRequestDelayTime
});

const agentOpts = {
  keepAlive:true,
  keepAliveMsecs:10000,
  rejectUnauthorized:false
};

const httpAgent = new http.Agent( agentOpts );
const httpsAgent = new https.Agent( agentOpts );

const sendRequest = ( msg, url, hdrs = false ) => {

  let sender, agent;
  if( url.protocol == 'https:' ) {
    sender = https;
    agent = httpsAgent;
  } else {
    sender = http;
    agent = httpAgent;
  }

  const postData = msg.toJSONString();
  let headers = {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  };

  if( hdrs ) {
    Object.assign( headers, hdrs );
  }

  const opts = {
    protocol: url.protocol,
    host: url.hostname,
    path: url.pathname,
    port: url.port,
    method: 'POST',
    headers,
    agent
  };

  return new Promise( (resolve, reject) => {
    const r = sender.request( opts, result => {
      let d = '';
      result.setEncoding('utf8');
      result.on('data', data => {
        d += data;
      });
      result.on('end', () => {
        let status = result.statusCode;
        if( status === 200 ) {
          resolve( d );
        }else {
          reject( `Endpoint returned status code: ${ status }` );
        }
      });
    });
    r.on('error', err => {
      reject( err );
    });
    r.end( postData );
  });
}

// wrap sendRequest in rate limiter to prevent bombarding
// endpoints
exports = module.exports = limiter.wrap( sendRequest );
