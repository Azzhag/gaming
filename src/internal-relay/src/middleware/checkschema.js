'use strict'

const schema = require('../config/relay-message-schema.json');
const { Validator } = require('jsonschema');
const validator = new Validator();

exports = module.exports = (req, res, next) => {
  let valid = validator.validate( req.body, schema );
  if( valid.errors.length > 0 ) {
      console.log( valid.errors );
      res.status(400).end();
  } else {
     next();
  }
}
