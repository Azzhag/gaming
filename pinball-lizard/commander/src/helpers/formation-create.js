'use strict'

const uuid = require('uuid/v1');
const c = require('../config/constant');
const npc = require('./npc-create');
const Formation = require('../obj/formation');

const formationCreator = {};

/**
*@return Formation
*/
formationCreator.spawn = ( instance, numMembers, waypoint, offsetAlgorithm ) => {
    const formationId = uuid();
    const members = npc.spawnNum( instance, formationId, numMembers );
    const formation = new Formation( formationId, waypoint, members, offsetAlgorithm );
    return formation;
}

formationCreator.splitF = ( formation, newWaypoint, newFormationMemberCount, offsetAlgorithm ) => {
   const newFormationMembers = formation.removeMembers( newFormationMemberCount );
   const formationId = uuid();
   // update newFormationMembers formationId
   for( let member of newFormationMembers ) {
     member.formationId = formationId;
   }
   const newFormation = new Formation( formationId, newWaypoint, newFormationMembers, offsetAlgorithm );
   return { formation, newFormation };
}

formationCreator.mergeF = ( formationA, formationB ) => {
  console.log( `${formationA.id} <---- ${formationB.id}` );
  formationA.addMembers( formationB.members );
  formationB.empty();
  return formationA;
}

formationCreator.moveF = ( formation, waypoint ) => {
  formation.waypoint = waypoint;
  return formation;
}

exports = module.exports = formationCreator;
