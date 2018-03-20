'use strict'

const path = require('path');
const loadRemoteConfig = require('./src/helpers/retrieve-config').load;

(async () => {
  let configPath = path.join( __dirname, './src/config/config.json' );
  await loadRemoteConfig( configPath );
  require('./src/app');
})();

process.on(
    "unhandledRejection",
    function handleWarning( reason, promise ) {
        console.log( "[PROCESS] Unhandled Promise Rejection" );
        console.log( "- - - - - - - - - - - - - - - - - - -" );
        console.log( reason );
        console.log( "- -" );
    }
);
