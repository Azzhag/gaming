'use strict'

const Router = require('express').Router();
const bodyParser = require('body-parser');
const enemy = require('./enemy');
const score = require('./score');
const building = require('./building');
const getUserData = require('../middleware/get-user-data');


Router.use( bodyParser.json(), getUserData );
Router.post( ['/api/spawn/*', '/api/die/*'], enemy);
Router.post( '/api/score/*', score);
Router.post( '/api/building/*', building);

exports = module.exports = Router;
