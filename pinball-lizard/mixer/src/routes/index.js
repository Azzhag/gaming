'use strict'

const mixer = require('../helpers/mixer-connector');
const router = require('express').Router();

router.get( '/api/link/:instance', async (req, res) => {
  console.log( `Received link request for ${req.params.instance}` );
  await mixer.start( req.params.instance );
  try {
    await new Promise( (resolve, reject) => {
      let attempts = 0;
      let interval = setInterval( () => {
        if( attempts++ > 20 ) {
          clearInterval( interval );
          return reject('Maximum number of connection attempts exceeded.');
        }
        if( mixer.connected() ) {
          clearInterval( interval );
          return resolve();
        }
        return reject( 'Mixer not connected.' );
      }, 500 );
    });
  } catch( err ) {
      console.log( err );
      res.status(500).send( err );
      return;
  }
  res.status(200).send( mixer.status() );
});

router.get( '/api/unlink/:instance', async (req, res) => {
  await mixer.stop( req.params.instance );
  res.status(200).send( 'Interactive Disconnected.' );
});

router.get( '/api/status', (req, res) => {
  res.send( mixer.status() );
});

exports = module.exports = router;
