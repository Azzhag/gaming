'use strict'

const {healthCheckPath} = require('../config');
const express = require('express');
const app = express();

app.get(['/', healthCheckPath], (req, res) => {
  res.status(200).send('Ok');
});

app.all( (req, res) => {
  res.status(404).send('Not Found');
});

exports.listen = module.exports.listen = port => {
  app.listen( port, () => {
    console.log( `Health probe listening on port ${port} at path ${healthCheckPath}` );
  });
}
