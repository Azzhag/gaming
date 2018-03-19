'use strict'

const util = require('./util')
const offsets = {};

const limits = [30,30,30];

offsets.random = num => {
  num = num === 0 ? 100 : parseInt( num );
  let offsets = [];
  for( let x = 0; x < num; x++ ) {
    offsets.push({
      x:util.randomNumber( 0, limits[0] ),
      y:util.randomNumber( 0, limits[1] ),
      z:util.randomNumber( 0, limits[2] )
    });
  }
  return offsets;
}

exports = module.exports = offsets;
