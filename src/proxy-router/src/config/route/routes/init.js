'use strict'

const m = require('../constants/public-route-constants');
const {endpoints, keys} = require('../../index');

let routes = {};

routes[m.type.INIT] = {};
routes[m.type.INIT][m.spec.INIT.ALL] = {};

routes[m.type.INIT]
      [m.spec.INIT.ALL]
      [m.action.INIT.INITIALIZE]= reqBody => {
    return {
      ep: endpoints.ENDPOINT_INIT,
      headers: {
        'x-functions-key':keys.ENDPOINT_INIT_KEY
      }
    }
};


routes[m.type.INIT]
      [m.spec.INIT.ALL]
      [m.action.INIT.START]= reqBody => {
    const instance = reqBody.instance;
    return {
      ep: `${endpoints.ENDPOINT_START}/${instance}`,
      headers: {
        'x-functions-key':keys.ENDPOINT_START_KEY
      }
    }
};

exports = module.exports = routes;
