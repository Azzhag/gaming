'use strict'

const m = require('../constants/public-route-constants');
const {endpoints, keys} = require('../../index');

let routes = {};
routes[m.type.PLAYER] = {};
routes[m.type.PLAYER][m.spec.PLAYER.CURRENT] = {

    [m.action.PLAYER.UPDATE_NAME]: reqBody => {
      const instance = reqBody.instance;
      const name = reqBody.payload.playerName;
      return {
        ep: `${endpoints.ENDPOINT_PLAYER_CONTROL}/setname/${instance}/${name}`,
        headers: {
          'x-functions-key':keys.ENDPOINT_PLAYER_KEY
        }
      }
    },

    [m.action.PLAYER.UPDATE_SCORE]: reqBody => {
      const instance = reqBody.instance;
      const score = reqBody.payload.playerScore;
      return {
        ep: `${endpoints.ENDPOINT_PLAYER_CONTROL}/setscore/${instance}/${score}`,
        headers: {
          'x-functions-key':keys.ENDPOINT_PLAYER_KEY
        }
      }
    },

    [m.action.PLAYER.ADD_SCORE]: reqBody => {
      const instance = reqBody.instance;
      const score = reqBody.payload.playerScore;
      return {
        ep: `${endpoints.ENDPOINT_PLAYER_CONTROL}/addscore/${instance}/${score}`,
        headers: {
          'x-functions-key':keys.ENDPOINT_PLAYER_KEY
        }
      }
    },

    [m.action.PLAYER.GET_SCORE]: reqBody => {
      const instance = reqBody.instance;
      return {
        ep: `${endpoints.ENDPOINT_PLAYER_CONTROL}/getscore/${instance}`,
        headers: {
          'x-functions-key':keys.ENDPOINT_PLAYER_KEY
        }
      }
    },

    [m.action.PLAYER.SET_WAYPOINT]: reqBody => {
      return {
        ep: `${endpoints.ENDPOINT_COMMANDER}/report/playerwaypoint`,
        headers: {
          'Authorization': `bearer ${keys.ENDPOINT_COMMANDER_KEY}`
        }
      }
    }
}

exports = module.exports = routes;
