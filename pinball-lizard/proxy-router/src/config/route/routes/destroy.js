'use strict'

const m = require('../constants/public-route-constants');
const {endpoints, keys} = require('../../index');

let routes = {};

routes[m.type.DESTROY] = reqBody => {
  const instance = reqBody.instance;
  return {
    ep: `${endpoints.ENDPOINT_DESTROY}/${instance}`,
    headers: {
      'x-functions-key':keys.ENDPOINT_DESTROY_KEY
    }
  }
};

exports = module.exports = routes;
