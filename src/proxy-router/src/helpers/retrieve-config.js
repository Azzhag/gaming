'use strict'

// self-contained
const https = require('https');
const express = require('express');
const { URL } = require('url');
const fs = require('fs');
const config = require('../config/config.json');
const reloadPort = 10212;
const reloadPath = '/config/reload';
const maxRetries = 15;
const retryTimeout = 3000;
let configWritePath;


const reloadTrigger = async (req, res) => {
  if( configWritePath ) {
    let success;
    try {
      success = await loadAndWriteConfig( configWritePath );
    } catch( err ) {
      console.log( err );
    }
    res.status(200).send('ok');
    process.exit();
  } else {
    res.status(200).send('Config never loaded.')
  }
}

const loadAndWriteConfig = async configPath => {
  configWritePath = configPath;
  console.log('Retrieving remote config...');
  await new Promise( (resolve, reject) => {
    let configLoaded;
    let attempts = 0;
    let loadConfig = async () => {
      if( attempts++ >= maxRetries ) {
        console.log('Max retries reached, could not load configuration.');
        process.exit();
        reject( configPath );
      }else if( !await loadPath( configPath ) ) {
        console.log('Could not load from remote host, retrying in...');
        setTimeout( () => loadConfig( configPath ), retryTimeout );
      }else {
        resolve( configPath );
      }
    }
    loadConfig();
  });
}

const loadPath = async configPath => {
  try{
      console.log( 'Reading remote config' );
      let remoteConfig = await loadRemoteConfig( configPath );
      console.log( 'Writing config to local path' );
      writeConfig( remoteConfig, configPath );
      return true;
  } catch(err) {
     console.log( err );
     return false;
  }
}

// return Promise
const loadRemoteConfig = configPath => {
  let url = new URL( config.CONFIG_ENDPOINT_URI );
  let opts = {
    protocol:'https:',
    hostname:url.hostname,
    port:url.port,
    timeout:3000,
    path:url.pathname,
    rejectUnauthorized: false,
    requestCert: true,
    agent: false,
    headers:{
      'x-functions-key':config.CONFIG_ENDPOINT_KEY
    },
    method:'GET'
  };
  return new Promise( ( resolve, reject ) => {
    let req = https.request( opts, (res) => {
      if( res.statusCode != 200 ) {
        reject( res.statusMessage );
      }
      let response = '';
      res.setEncoding('utf8');
      res.on('data', chunk => {
        response += chunk;
      });
      res.on('end', chunk => {
        resolve( response );
      });
    });
    req.on( 'error', err => {
      console.log( `Error retrieving configuration: ${err}` );
      reject( err );
    });
    req.end();
  });
}

const writeConfig = ( newConfig, configPath ) => {
  if( typeof newConfig == typeof "" ) {
    newConfig = JSON.parse( newConfig );
  }
  // don't remove any other configuration
  const currentConfig = require(configPath);
  for( let c in newConfig ) {
    currentConfig[ c ] = newConfig[ c ];
  }
  let outputConfig = JSON.stringify( currentConfig, null, "\t" );
  fs.writeFileSync( configPath, outputConfig, 'utf-8');
}

exports = module.exports;
module.exports.load = loadAndWriteConfig;
module.exports.trigger = reloadTrigger;
