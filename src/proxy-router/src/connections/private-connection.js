'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const config = require('../config');
const { healthCheckPath } = require('../config');
const privateServer = require('./private-server');
const privateKey =  fs.readFileSync( path.resolve( __dirname, '../../ssl/key.pem'), 'utf8' );
const certificate = fs.readFileSync( path.resolve( __dirname, '../../ssl/cert.pem'), 'utf8' );
const credentials = { key:privateKey, cert:certificate, passphrase:config.sslPass };

const priv = express();

// set up health check path
priv.all( healthCheckPath, (req, res) => {
    res.status(200).send('Ok');
});

// all requests should be json
priv.use( bodyParser.json() );

/**
* @param {string} internal port number
*/
exports = module.exports = ( port, useSSL = false ) => {

  let server;
  if( useSSL ) {
    server = https.createServer( credentials, priv );
  } else {
    server = http.createServer( priv );
  }

  // setup private route listener
  server.listen( port, () => {
    console.log( `Command route opened on port: ${port} (HTTPS)`);
  });
  return {
    app: priv,
    send: privateServer
  }
}
