'use strict'

const c = require('../config/constant');

const waypoints = {};

waypoints.repositionFormations = ( formations, playerWaypoint, moveOnPlayer ) => {
  let onPlayer;
  let newWaypoint = Object.assign( {}, playerWaypoint );
  newWaypoint.x = 0;
  newWaypoint.z += c.FORMATION_ONPLAYER_Z_OFFSET;
  let field = [];
  // determine current onPlayer
  for( let formation of formations ) {
    if( formation.onPlayer ) {
      formation.onPlayer = false;
      onPlayer = formation;
    } else {
      field.push( formation );
    }
  }
  // randomly sort field players
  field.sort( (a, b) => {
    return 0.5 - Math.random();
  });
  let newOnPlayer;
  // determine if we're moving onplayer formation
  if( moveOnPlayer ) {
    console.log( 'formation switch...')
    // pop new player
    newOnPlayer = field.pop();
    // add old onPlayer to field if exists
    if( onPlayer ) field.push( onPlayer );
  } else {
    console.log( 'background switch...')
    // keep current formation on player
    newOnPlayer = onPlayer;
  }
  // determine field positioning
  field = calculateFieldWaypoints( field );

  // potential race condition
  while( !newOnPlayer && field.length > 1 ) {
    newOnPlayer = field.pop();
  }

  if( newOnPlayer ) {
    // place newOnPlayer on player
    newOnPlayer.waypoint = newWaypoint;
    newOnPlayer.onPlayer = true;
    // add newOnPlayer back into formation
    field.push( newOnPlayer );
  }

  return field;
}

waypoints.singleWaypoint = () => {
  const x = randomSetWithOffset( c.FORMATION_X_MIN, c.FORMATION_X_MAX, 1, c.FORMATION_RADIUS );
  const y = randomSetWithOffset( c.FORMATION_Y_MIN, c.FORMATION_Y_MAX, 1, c.FORMATION_RADIUS );
  const z = randomSetWithOffset( c.FORMATION_Z_MIN, c.FORMATION_Z_MAX, 1, c.FORMATION_RADIUS );
  return {
    x:x[0],
    y:y[0],
    z:z[0]
  };
}

const calculateFieldWaypoints = ( formations ) => {
  const num = formations.length;
  const x = randomSetWithOffset( c.FORMATION_X_MIN, c.FORMATION_X_MAX, num, c.FORMATION_RADIUS );
  const y = randomSetWithOffset( c.FORMATION_Y_MIN, c.FORMATION_Y_MAX, num, c.FORMATION_RADIUS );
  const z = randomSetWithOffset( c.FORMATION_Z_MIN, c.FORMATION_Z_MAX, num, c.FORMATION_RADIUS );
  for( let i = 0; i < num; i++ ) {
    formations[i].waypoint = {
                              x:x[i],
                              y:y[i],
                              z:z[i]
                             };
  }
  return formations;
}

const randomSetWithOffset = ( min, max, num, radius ) => {
  // compute range
  let range = max - min;
  // we want random...
  let maxCalc = 10 * num; // limit recursion
  let offsets = [];
  while( maxCalc-- !== 0 && offsets.length < num ) {
    let chk = num * 2;
    for( let i = 0; i < chk; i++ ) {
      // choose a random number in range
      let rand = Math.floor( Math.random() * range );
      let accepted = true;
      for( let offset of offsets ) {
        if( Math.abs( offset - rand ) <= radius ) {
          accepted = false;
        }
      }
      if( accepted ) {
        offsets.push( max - rand );
      }
    }
    // adjust radius
    radius = radius * .95;
  }
  // check for recursion limit case
  if( maxCalc === -1 ) {
    // fill with random, ignoring radius
    while( offsets.length < num ) {
      let rand = Math.floor( Math.random() * range );
      offsets.push( max - rand );
    }
  }
  return offsets;
}

exports = module.exports = waypoints;
