'use strict'

const requestHelper = require('./request-helper');
const util = require('./util');
const config = require('../config');
const router = require('./router-coms');
const c = require('../config/constant');


const formationComs = {};

formationComs.spawn = (instance, formation) => {
    return router.send(
              instance,
              c.FORMATION_TYPE,
              c.FORMATION_SPEC,
              c.FORMATION_SPAWN_ACTION,
              formation.payload
            );
}

formationComs.sendSplit = ( instance, formationA, formationB ) => {
    return router.send(
              instance,
              c.FORMATION_TYPE,
              c.FORMATION_SPEC,
              c.FORMATION_SPLIT_ACTION,
              {
                formation:formationA.payload,
                secondaryFormation:formationB.payload
              }
            );

}

formationComs.sendMerge = ( instance, formationA, formationB ) => {
    return router.send(
              instance,
              c.FORMATION_TYPE,
              c.FORMATION_SPEC,
              c.FORMATION_MERGE_ACTION,
              {
                formationId:formationA.id,
                secondaryFormationId:formationB.id,
                listOfOffsets:formationA.offsets
              }
            );
}

formationComs.sendMove = ( instance, formation ) => {
    return router.send(
              instance,
              c.FORMATION_TYPE,
              c.FORMATION_SPEC,
              c.FORMATION_MOVE_ACTION,
              {
                formationId:formation.id,
                waypoint:formation.waypoint
              }
            );
}

exports = module.exports = formationComs;
