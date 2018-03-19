'use strict'

const m = require('../constants/public-route-constants');
const {endpoints, keys} = require('../../index');

let routes = {};
routes[m.type.ENEMY] = routes[m.type.ENEMY] || {};


/********** ALL ***********/

routes[m.type.ENEMY][m.spec.ENEMY.ALL] = {};

routes[m.type.ENEMY]
      [m.spec.ENEMY.ALL]
      [m.action.ENEMY.LIST] = reqBody => {
        const instance = reqBody.instance;
        return {
          ep: `${endpoints.ENDPOINT_ENEMY_CONTROL}/list/${instance}`,
          headers: {
            'x-functions-key':keys.ENDPOINT_ENEMY_KEY
          }
        };
      };

routes[m.type.ENEMY]
      [m.spec.ENEMY.ALL]
      [m.action.ENEMY.STATUS] = reqBody => {
        const instance = reqBody.instance;
        const npcId = reqBody.payload.npcId;
        return {
          ep: `${endpoints.ENDPOINT_ENEMY_CONTROL}/status/${instance}/${npcId}`,
          headers: {
            'x-functions-key':keys.ENDPOINT_ENEMY_KEY
          }
        };
      };

routes[m.type.ENEMY]
      [m.spec.ENEMY.ALL]
      [m.action.ENEMY.DIE] = reqBody => {
        const instance = reqBody.instance;
        const npcId = reqBody.payload.npcId;
        const formationId = reqBody.payload.formationId;
        return {
          ep: `${endpoints.ENDPOINT_ENEMY_CONTROL}/die/${instance}/${formationId}/${npcId}`,
          headers: {
            'x-functions-key':keys.ENDPOINT_ENEMY_KEY
          }
        };
};

/********** ICE LICE ***********/

routes[m.type.ENEMY][m.spec.ENEMY.ICE_LICE] = {};

routes[m.type.ENEMY]
      [m.spec.ENEMY.ICE_LICE]
      [m.action.ENEMY.SPAWN] = reqBody => {
        const instance = reqBody.instance;
        const formationId = reqBody.payload.formationId;
        return {
          ep: `${endpoints.ENDPOINT_ENEMY_CONTROL}/spawn/il/${instance}`,
          headers: {
            'x-functions-key':keys.ENDPOINT_ENEMY_KEY
          }
        };
      };

routes[m.type.ENEMY]
      [m.spec.ENEMY.ICE_LICE]
      [m.action.ENEMY.MORPH] = reqBody => {
        const instance = reqBody.instance;
        const color = reqBody.payload.color;
        return {
          ep: `${endpoints.ENDPOINT_ENEMY_CONTROL}/morphrand/${instance}/${color}`,
          headers: {
            'x-functions-key':keys.ENDPOINT_ENEMY_KEY
          }
        };
      };

/********** ARACHNO TANK ***********/

routes[m.type.ENEMY][m.spec.ENEMY.ARACHNO_TANK] = {};

routes[m.type.ENEMY]
      [m.spec.ENEMY.ARACHNO_TANK]
      [m.action.ENEMY.SPAWN] = reqBody => {
        const instance = reqBody.instance;
        return {
          ep: `${endpoints.ENDPOINT_ENEMY_CONTROL}/spawn/at/${instance}`,
          headers: {
            'x-functions-key':keys.ENDPOINT_ENEMY_KEY
          }
        };
      };

/********** FIRE FLY ***********/

routes[m.type.ENEMY][m.spec.ENEMY.FIRE_FLY] = {};

routes[m.type.ENEMY]
      [m.spec.ENEMY.FIRE_FLY]
      [m.action.ENEMY.SPAWN] = reqBody => {
        const instance = reqBody.instance;
        return {
          ep: `${endpoints.ENDPOINT_ENEMY_CONTROL}/spawn/ff/${instance}`,
          headers: {
            'x-functions-key':keys.ENDPOINT_ENEMY_KEY
          }
        };
      };

exports = module.exports = routes;
