'use strict'

const Playfab = require('../helpers/playfab-utility');
const Router = require('express').Router();
const scores = {};

Router.post( '/api/score/set', (req, res) => {

  // return immediately, do not block
  res.send('ok');

  let uid = req.uid;
  // if we haven't updated for this user recently, set display name...
  if( !scores[ uid ] ) {
    Playfab.setTitleName( req.shortUsername )
    .catch( err => console.log( err ) );
  }

  const update = { Score:req.body.score };
  scores[ uid ] = req.body.score;

  Playfab.setStats( uid, update )
  .then( res => {} )
  .catch( err => console.log( err ) );

});

exports = module.exports = Router;
