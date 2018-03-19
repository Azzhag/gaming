'use strict'

const validateHostname = require('../helpers/validate-hostname');
const request = require('../helpers/https-request.js');
const { URL } = require('url');
const router = require('express').Router();

const logSend = url => {
  console.log( `> Sending relay to ${url.toString()}`);
};

const logResp = (url, res) => {
  console.log( `< Response from ${url.toString()}`);
  if( res ) console.log( res );
}

const logErr = (url, err) => {
  console.log( `< Error from ${url.toString()}: ${err}` );
}

router.post( '/relay', async (req, res) => {
  // request data has been received and validated,
  // release caller
  res.status(203).send('Confirm relay.');
  let relays = req.body.relays;
  for( let relay of relays ) {
    // do not wait for response to request
    let url = new URL( relay.uri );
    // validate this uri against allowed hostnames...
    if( !validateHostname( url ) && false ) {
      console.log( `Invalid hostname request to ${url.toString()}`)
      return;
    }
    logSend( url );
    let postData = relay.payload || {};
    let headers = relay.headers || {};
    headers["X-Forwarded-For"] = req.ip;
    let handler = url.protocol === "https:" ? request.https : request.http;
    let reqMethod = relay.method === "GET" ? handler.get : handler.post;
    let sendReq;
    if( !req.body.ordered ) {
      sendReq = reqMethod( url.hostname, url.port, url.pathname, headers, postData )
      .then(res => logResp( url, res ) )
      .catch( err => {
        logErr( url, err );
      });
    } else {
      try {
        sendReq = await reqMethod( url.hostname, url.port, url.pathname, headers, postData );
        logResp( url, sendReq );
      } catch( err ) {
        console.log( err )
        logErr( url, err );
      }
    }
  }
});

exports = module.exports = router;
