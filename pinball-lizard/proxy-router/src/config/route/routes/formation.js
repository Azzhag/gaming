'use strict'

const m = require('../constants/public-route-constants');
const {endpoints, keys} = require('../../index');

let routes = {};
routes[m.type.ENEMY] = routes[m.type.ENEMY] || {};

/********** FORMATION ***********/

routes[m.type.ENEMY][m.spec.ENEMY.FORMATION] = {};

routes[m.type.ENEMY]
      [m.spec.ENEMY.FORMATION]
      [m.action.ENEMY.SPAWN] = reqBody => {
        const instance = reqBody.instance;
        return {
          ep: `${endpoints.ENDPOINT_FORMATION_CONTROL}/spawn/il/${instance}`,
          headers: { 'x-functions-key':keys.ENDPOINT_FORMATION_KEY }
        };
};

routes[m.type.ENEMY]
      [m.spec.ENEMY.FORMATION]
      [m.action.ENEMY.SPLIT_FORMATION] = reqBody => {
        const instance = reqBody.instance;
        const formationId = reqBody.payload.formation.formationId;
        return {
          ep: `${endpoints.ENDPOINT_FORMATION_CONTROL}/split/${instance}/${formationId}`,
          headers: { 'x-functions-key':keys.ENDPOINT_FORMATION_KEY }
        };
};

routes[m.type.ENEMY]
      [m.spec.ENEMY.FORMATION]
      [m.action.ENEMY.MERGE_FORMATION] = reqBody => {
        const instance = reqBody.instance;
        const formationA = reqBody.payload.formationId;
        const formationB = reqBody.payload.secondaryFormationId;
        return {
          ep: `${endpoints.ENDPOINT_FORMATION_CONTROL}/merge/${instance}/${formationA}/${formationB}`,
          headers: { 'x-functions-key':keys.ENDPOINT_FORMATION_KEY }
        };
};

routes[m.type.ENEMY]
      [m.spec.ENEMY.FORMATION]
      [m.action.ENEMY.MOVE_FORMATION] = reqBody => {
        const instance = reqBody.instance;
        const formation = reqBody.payload.formationId;
        return {
          ep: `${endpoints.ENDPOINT_FORMATION_CONTROL}/move/${instance}/${formation}`,
          headers: { 'x-functions-key':keys.ENDPOINT_FORMATION_KEY }
        };
};
exports = module.exports = routes;
