'use strict'

const stats = require('../helpers/playfab-stats');
const Router = require('express').Router();

const types = {
  'il':'Ice Lice',
  'at':'Arachno Tank',
  'ff':'Fire Fly',
  'F':'Formation'
}

Router.post( '/api/spawn/:type', async (req, res) => {
  // don't block
  res.send('ok');
  const typeDef = types[ req.params.type ] || 'Formations';
  let itemLabel = `${typeDef} Spawned`;
  stats.actionOfType( req.uid, itemLabel );
});

Router.post( '/api/die/:type', async (req, res) => {
  // don't block
  res.send('ok');
  const typeDef = types[ req.params.type ] || 'Formations';
  let itemLabel = `${typeDef} Killed`;
  stats.actionOfType( req.uid, itemLabel );
});

exports = module.exports = Router;
