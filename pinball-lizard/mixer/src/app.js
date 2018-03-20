'use strict'

const https = require('https');
const path = require('path');
const fs = require('fs');
const express = require('express');
const apiRoutes = require('./routes');
const reloadTrigger = require('./helpers/retrieve-config').trigger;
const c = require('./config');
const bearerAuth = require('./middleware/bearer-authentication');
const privateKey =  fs.readFileSync( path.resolve( __dirname, '../ssl/key.pem'), 'utf8' );
const certificate = fs.readFileSync( path.resolve( __dirname, '../ssl/cert.pem'), 'utf8' );
const credentials = { key:privateKey, cert:certificate, passphrase:c.SSL_PASSPHRASE };

const app = express();
const server = https.createServer( credentials, app );
const middlewares = [ bearerAuth ];

app.use( middlewares );
app.get( '/config/reload', bearerAuth, reloadTrigger );
app.get( '/api/*', apiRoutes );

app.use( '*', (req, res) => {
  res.status( 404 ).send( 'Not Found' );
});

server.listen( c.MIXER_HANDLER_PORT, () => {
  console.log( `Control endpoint listening on ${ c.MIXER_HANDLER_PORT }` );
});
