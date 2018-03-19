'use strict'

const formationCreator = require('../helpers/formation-create');
const formationComs = require('../helpers/formation-coms');
const gameEngine = require('../helpers/game-engine');
const actions = require('../helpers/action-commands');
const offsets = require('../helpers/offset-pattern');
const routingHelper = require('../helpers/router-coms');
const uuid = require('uuid/v1');

const reports = {};

reports.npcKilled = (req, res) => {
  console.log( `NPC Killed: ${req.body.npc} Formation: ${req.body.formationId} Instance: ${req.body.instance}` );
  gameEngine.checkNPCDeath( req.body.instance, req.body.npc, req.body.formationId );
  res.send('ok');
}

reports.initialized = (req, res) => {
  gameEngine.initialize( req.body.instance );
  res.send('ok');
}

reports.destroyed = (req, res) => {
  gameEngine.destroy( req.body.instance );
  res.send('ok');
}

reports.playerWaypoint = (req, res) => {
  if( !req.body.payload ) {
    res.sendStatus( 500 );
    return;
  }
  gameEngine.updatePlayerWaypoint( req.body.instance, req.body.payload.waypoint );
  res.status( 200 ).end();
}

exports = module.exports = reports;
