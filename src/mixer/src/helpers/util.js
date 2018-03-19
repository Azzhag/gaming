'use strict'

const util = {};

util.safeParseJSON = str => {
  try { return JSON.parse( str ); }
  catch( err ) { return {}; }
}

exports = module.exports = util;
