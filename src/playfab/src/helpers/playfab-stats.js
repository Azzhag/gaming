'use strict'

const Playfab = require('./playfab-utility');

module.exports.actionOfType = (uid, itemLabel) => {
  Playfab.getStats( uid, [itemLabel] )
  .then( current => {
    current[ itemLabel ] = current[ itemLabel ] ? ++current[ itemLabel ] : 1;
    return current;
  })
  .then( stats => {
    return Playfab.setStats( uid, stats );
  })
  .then( res => {} )
  .catch( err => console.log( err ) );
}
