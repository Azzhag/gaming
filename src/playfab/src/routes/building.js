'use strict'

const stats = require('../helpers/playfab-stats');
const Router = require('express').Router();


Router.post( '/api/building/destroy/', async (req, res) => {
  // don't block
  res.send('ok');
  let itemLabel = 'Buildings Destroyed';
  stats.actionOfType( req.uid, itemLabel );
});

exports = module.exports = Router;
