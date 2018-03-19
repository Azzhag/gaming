'use strict'

const config = require('../config');
const util = require('./util');
const requestHelper = require('./request-helper');
const dateformat = require('dateformat');

const routing = {};

routing.send = (instance, type, spec, action, payload = {}) => {
  const headers = util.authentication.routerAuthenticationHeader();
  const request = {
    instance,
    auth:util.authentication.jsonAuthentication(),
    replyToBoth:true,
    type, spec, action, payload
  };
  return requestHelper.https.post(
    config.ROUTER_IP,
    config.ROUTER_PORT,
    '/', headers, request );
}

routing.passthru = (instance, type, spec, action, payload = {} ) => {
  const headers = util.authentication.routerAuthenticationHeader();
  const now = Date.now();
  const request = {
    timestamp: now,
    human_time: dateformat( now ),
    auth:util.authentication.jsonAuthentication(),
    instance,
    passthru:true,
    type, spec, action, payload
  }
  return requestHelper.https.post(
    config.ROUTER_IP,
    config.ROUTER_PORT,
    '/', headers, request );
}

exports = module.exports = routing;
