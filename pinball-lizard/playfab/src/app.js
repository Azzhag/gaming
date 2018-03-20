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

app.post( '/api/*', apiRoutes );

app.use( '*', (req, res) => {
  res.status( 404 ).send( 'Not Found' );
});

app.use(function(err, req, res, next) {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    console.error('Bad JSON');
  }
});

server.listen( c.PLAYFAB_HANDLER_PORT, () => {
  console.log( `Control endpoint listening on ${ c.PLAYFAB_HANDLER_PORT }` );
});
