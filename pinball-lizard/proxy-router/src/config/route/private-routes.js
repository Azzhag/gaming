'use strict'

const _ = require('lodash');
const p = require('./constants/private-route-constants');
// inherit public routes
const routes = require( './public-routes');

let prvRoutes = {};
prvRoutes[p.type.STATUS] = reqBody => { /* Intercepted by middleware */ };

// assignIn routes
exports = module.exports = routes;
