'use strict'

const { wsPath, healthCheckPath } = require('../config');
const express = require('express');
const WssServer = require('../obj/Wss-server');
const https = require('https');
const http = require('http');
const fs = require('fs');
const path = require('path');
const config = require('../config');
const privateKey =  fs.readFileSync( path.resolve( __dirname, '../../ssl/key.pem'), 'utf8' );
const certificate = fs.readFileSync( path.resolve( __dirname, '../../ssl/cert.pem'), 'utf8' );
const credentials = { key:privateKey, cert:certificate, passphrase:config.sslPass };

const app = express();

// set up health check path
app.all( healthCheckPath, (req, res) => {
    res.status(200).send('Ok');
});

/**
* @param {string} websocket port number
* @param {boolean} useWSS use wss connection
*/
exports = module.exports = ( port, useWSS = false ) => {

  let server
  if( useWSS ) {
    server = https.createServer( credentials, app );
  } else {
    server = http.createServer( app );
  }

  server.listen( port );

  return new WssServer( [{ server, path:wsPath }], config.websocketTimeout )
  .onConnect( ws => {
     console.log('Websocket Connected.')
  }).onClose( context => {
     console.log('Websocket Closed.');
  }).onError( err => {
     console.log('Websocket process stack stopped unexpectedely.');
  });

}
