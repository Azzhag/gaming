'use strict'

const authHelper = require('../helpers/auth-helper');

exports = module.exports = (req, res, next) => {
  if( !authHelper( req.msg ) ){
    return res.status(401).send( "unauthorized" );
  }
  next();
}
