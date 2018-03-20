'use strict'

const c = require('../config/constant');
const uuid = require('uuid/v1');
const npc = {};

let testNum = 0;

const types = {
  [c.NPC_TYPE_ICE_LICE]:"il",
  [c.NPC_TYPE_ARACHNO_TANK]:"at",
  [c.NPC_TYPE_FIRE_FLY]:"ff"
}

npc.spawnNum = (instance, formationId, toSpawn ) => {
  const members = [];
  // create each member
  for( let i = 0; i < toSpawn; i++ ) {
    members.push( npc.spawn( instance, c.NPC_TYPE_ICE_LICE, formationId ) );
  }
  return members;
}

npc.spawn = ( instance, npcType, formationId,  color = 'default' ) => {
  const npcId = uuid();
  return {
    instance,
    npcId,
    formationId,
    npcType:types[npcType],
    color,
    npcStatus:"Alive"
  }
}

exports = module.exports = npc;
