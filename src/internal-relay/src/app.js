'use strict'

const config = require('./config/config.json');
const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const authenticate = require('./middleware/authenticate');
const checkSchema = require('./middleware/checkschema');
const fs = require('fs');
const path = require('path');
const reloadTrigger = require('./helpers/retrieve-config').trigger;
const privateKey =  fs.readFileSync( path.resolve( __dirname, './ssl/key.pem'), 'utf8' );
const certificate = fs.readFileSync( path.resolve( __dirname, './ssl/cert.pem'), 'utf8' );
const credentials = { key:privateKey, cert:certificate, passphrase:config.SSL_PASSPHRASE };
const relay = require('./routes/relay.js');

const app = express();
const server = https.createServer( credentials, app );

app.get( '/config/reload', authenticate, reloadTrigger );
app.use( [ authenticate, bodyParser.json(), checkSchema ] );
app.post( '/relay', relay );

server.listen( config.INTERNAL_RELAY_PORT, () => {
  console.log( `Server listening on port ${config.INTERNAL_RELAY_PORT}` );
});
