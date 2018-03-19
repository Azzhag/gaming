'use strict'

const router = require('./router-coms');
const c = require('../config/constant');

const actionCommands = {};

actionCommands.tankBarrage = instance => {
  return router.passthru( instance, c.FORMATION_TYPE, c.NPC_TYPE_ARACHNO_TANK, c.FORMATION_SPLIT_ACTION );
}

actionCommands.airstrike = instance => {
  return router.passthru( instance, c.FORMATION_TYPE, c.NPC_TYPE_FIRE_FLY, c.FORMATION_SPLIT_ACTION );
}

actionCommands.scatterIceLice = (instance, formations) => {
  let formationIds = [];
  for( let formation of formations ) {
    formationIds.push( formation.id );
  }
  return router.passthru( instance, c.FORMATION_TYPE, c.FORMATION_SPEC, c.ICE_LICE_SCATTER_ACTION, {listOfMembers:formationIds} );
}

actionCommands.morphRandomIceLice = (instance) => {
  console.log( 'Sending atomic ice lice...' );
  return router.send( instance, c.NPC_TYPE, c.NPC_TYPE_ICE_LICE, c.ICE_LICE_MORPH_ACTION, { color:c.NPC_ATOMIC_COLOR_VALUE } );
}

exports = module.exports = actionCommands;
