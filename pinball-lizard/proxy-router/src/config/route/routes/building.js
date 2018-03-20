'use strict'

const m = require('../constants/public-route-constants');
const {endpoints, keys} = require('../../index');

let routes = {};
routes[m.type.BUILDING] = {};
routes[m.type.BUILDING][m.spec.BUILDING.ALL] = {}
routes[m.type.BUILDING]
      [m.spec.BUILDING.ALL]
      [m.action.BUILDING.DESTROY] = reqBody => {
        const instance = reqBody.instance;
        const buildingId = reqBody.payload.buildingId;
        return {
            ep: `${endpoints.ENDPOINT_BUILDING_CONTROL}/destroy/${instance}/${buildingId}`,
            headers: {
              'x-functions-key':keys.ENDPOINT_BUILDING_KEY
            }
        };
      }

routes[m.type.BUILDING]
      [m.spec.BUILDING.ALL]
      [m.action.BUILDING.CREATE] = reqBody => {
        let instance = reqBody.instance;
        return {
          ep: `${endpoints.ENDPOINT_BUILDING_CONTROL}/create/${instance}`,
          headers: {
            'x-functions-key':keys.ENDPOINT_BUILDING_KEY
          }
        };
      }

routes[m.type.BUILDING]
      [m.spec.BUILDING.ALL]
      [m.action.BUILDING.STATUS] = reqBody => {
        let instance = reqBody.instance;
        let buildingId = reqBody.payload.buildingId
        return {
          ep: `${endpoints.ENDPOINT_BUILDING_CONTROL}/status/${instance}/${buildingId}`,
          headers: {
            'x-functions-key':keys.ENDPOINT_BUILDING_KEY
          }
        };
      }

routes[m.type.BUILDING]
      [m.spec.BUILDING.ALL]
      [m.action.BUILDING.LIST] = reqBody => {
        let instance = reqBody.instance;
        return {
          ep: `${endpoints.ENDPOINT_BUILDING_CONTROL}/list/${instance}`,
          headers: {
            'x-functions-key':keys.ENDPOINT_BUILDING_KEY
          }
        };
      }

exports = module.exports = routes;
