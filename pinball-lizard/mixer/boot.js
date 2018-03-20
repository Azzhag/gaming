'use strict'

const path = require('path');
const loadRemoteConfig = require('./src/helpers/retrieve-config').load;

(async () => {
  let configPath = path.join( __dirname, './src/config/config.json' );
  await loadRemoteConfig( configPath );
  require('./src/app');
})();
