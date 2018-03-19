'use strict'

const _ = require('lodash');

/* Include Routes */
const player = require('./routes/player');
const building = require('./routes/building');
const enemy = require('./routes/enemy');
const formation = require('./routes/formation');
const init = require('./routes/init');
const destroy = require('./routes/destroy');

const routes = {};

_.merge( routes, init, player, building, enemy, formation, destroy );

exports = module.exports = routes;
