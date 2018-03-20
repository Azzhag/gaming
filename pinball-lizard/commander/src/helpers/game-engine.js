'use strict'

const formationCreator = require('../helpers/formation-create');
const formationComs = require('../helpers/formation-coms');
const waypoints = require('../helpers/waypoints');
const actions = require('../helpers/action-commands');
const offsets = require('../helpers/offset-pattern');
const routingHelper = require('../helpers/router-coms');
const uuid = require('uuid/v1');
const Game = require('../obj/game');
const c = require('../config/constant');

// interval for action choices
let actionIntervals = {};

const engine = {};
const games = {};

engine.initialize = async instance => {
    console.log( `Engine initialized for instance ${ instance }`);
    // create new game
    let game = new Game( instance );
    game.setFormationSwitchTime( c.GAME_FORMATION_SWITCH_TIME );
    game.updateAttackTime( c.GAME_INITIAL_SCATTER_WAIT_TIME, c.GAME_INITIAL_SCATTER_WAIT_TIME );
    game.setAtomicIceLiceTime( c.GAME_INITIAL_ATOMIC_ICE_LICE_TIME );
    game.playerWaypoint = c.GAME_INIT_PLAYER_WAYPOINT;
    // spawn <num> formations to start
    game = initFormations( game );
    // wait until we've spawned first formations
    spawnGameFormations( game );
    // timeout/remove this game in gameMemoryTimeout
    setTimeout( () => {
      console.log( `Timeout check for instance ${ instance }`);
      deleteGame( instance );
    }, c.GAME_MEMORY_TIMEOUT );
    // store game
    games[ instance ] = game;
    // set up action caller
    setTimeout( () => {
      actionIntervals[ instance ] = setInterval( async () => {
        games[ instance ] = await processAction( games[ instance ] );
      }, c.GAME_ACTION_TIMER );
    }, c.GAME_INIT_SPAWN_DELAY );
}

engine.getGame = instance => {
  return games[ instance ];
}

engine.destroy = instance => {
    console.log( `Engine destroyed for instance ${ instance }`);
    deleteGame( instance );
}

engine.checkNPCDeath = ( instance, npc, formationId ) => {
  const game = games[ instance ];
  let formation = game.getFormationById( formationId );
  let found = killNPCInFormation( npc.npcId, formation );
  if( !found ) {
    found = killNPCInAnyFormation( npc.npcId, game.formations );
  }
  return found;
}

engine.updatePlayerWaypoint = ( instance, waypoint ) => {
  if( games[instance] ) games[ instance ].playerWaypoint = waypoint;
}

const killNPCInFormation = ( npcId, formation ) => {
  return !formation ? false : formation.removeMember( npcId );
}

const killNPCInAnyFormation = ( npcId, formations ) => {
  for( let formation of formations ) {
    if( formation.removeMember( npcId ) ) {
      return true;
    }
  }
  return false;
}

const checkFormationSizes = game => {
  let formations = game.formations;
  // check each formation size
  let toMerge = [];
  for( let formation of formations ) {
    if( formation.size <= c.GAME_FORMATION_MIN_SIZE ) {
      toMerge.push( formation );
      game.removeFormation( formation );
    }
  }
  // handle each case separately
  if( toMerge.length > 0 && game.formations.length > 0 ) {
    // update formations
    formations = game.formations;
    // get smallest formation
    let smallest = formations.shift();
    // merge everything needed into this formation
    for( let merge of toMerge ) {
      const mergeID = merge.id;
      const smallestId = smallest.id;
      console.log( `Merging ${mergeID} into ${smallestId}...`);
      formationComs.sendMerge( game.instance, smallest, merge );
      smallest = formationCreator.mergeF( smallest, merge );
    }
    // overwrite this formation onto game
    game.addFormation( smallest );
    // add a new formation
    const waypoint = waypoints.singleWaypoint();
    const newFormation = formationCreator.spawn(
                            game.instance,
                            c.GAME_FORMATION_SIZE,
                            waypoint,
                            offsets.random );
    game.formationsWaiting =  game.formationsWaiting.concat(
      [ newFormation ]
    );
  } else {
    // push formations back onto game
    for( let merge of toMerge ) {
      game.addFormation( merge );
    }
  }

  return game;
}

const initFormations = game => {
  const formations = [];
  let waypoint = [0,0,0];
  let numFormations = c.GAME_NUMBER_OF_FORMATIONS;
  for( let i = 0; i < numFormations ; i++ ) {
    let newFormation = formationCreator.spawn(
      game.instance, c.GAME_FORMATION_SIZE, waypoint, offsets.random
    )
    formations.push( newFormation );
  }
  game.formationsWaiting = waypoints.repositionFormations(
                              formations, game.playerWaypoint, true
                           );
  return game;
}

const spawnGameFormations = async game => {
  let formationsWaiting = game.formationsWaiting;
  let instance = game.instance;
  while( formationsWaiting.length > 0 ) {
    let formation = formationsWaiting.pop();
    // stage all formations when spawning
    formation.stage();
    try {
      let res = await formationComs.spawn( instance, formation );
      console.log( `Spawned formation ${formation.id} size ${formation.size}` );
      formation.hasSpawned = true;
      game.addFormation( formation );
    } catch( err ) {
      console.log( err );
      return false;
    };
  }
  return true;
}

const moveGameFormations = game => {
  const instance = game.instance;
  let formations = waypoints.repositionFormations(
                      game.formations, game.playerWaypoint, game.onPlayerFlip
                   );
  for( let formation of formations ) {
    formationComs.sendMove( instance, formation );
  }
  game.formations = formations;
  return game;
}

const deleteGame = instance => {
  if( actionIntervals[ instance ] ) {
    clearInterval( actionIntervals[ instance ] );
    delete( actionIntervals[ instance ] );
  }
  delete( games[ instance ] );
}

const airStrike = game => {
  setFieldScattered( game, c.GAME_ATTACK_WAIT_TIME_AIRSTRIKE );
  setTimeout( () => {
    console.log( 'Sending airstrike' );
    actions.airstrike( game.instance );
  }, c.GAME_SCATTER_DELAY_AIRSTRIKE );
}

const tankBarrage = game => {
  console.log( 'Sending tank barrage' );
  actions.tankBarrage( game.instance );
  setTimeout( () => {
    setFieldScattered( game, c.GAME_ATTACK_WAIT_TIME_TANK_BARRAGE );
  }, c.GAME_SCATTER_DELAY_TANKS );
}

const setFieldScattered = ( game, waitTime ) => {
  console.log( 'Scattering Ice Lice' );
  actions.scatterIceLice( game.instance, game.formations );
  game.fieldScattered = true;
  game.setScatterReleaseTime( waitTime );
}

const processAction = async game => {
  if( game.atomicIceLiceAvailable ) {
    actions.morphRandomIceLice( game.instance );
    game.setAtomicIceLiceTime(
      Math.round( Math.random() * c.GAME_RANDOM_ATOMIC_ICE_LICE_TIME )
    );
  }

  if( !game.formationLock ) {
    game = checkFormationSizes( game );
    if( !game.fieldScattered && game.clockTime < c.GAME_SPAWN_EXPIRE_TIME ) {
      spawnGameFormations( game );
    }
  }

  // check if attack is available
  if( game.attackAvailable && !game.fieldScattered ) {
    console.log( 'processing attack...')
    game.setFormationSwitchTime( c.GAME_FORMATION_SWITCH_TIME );
    let which = Math.floor( (Math.random() * 20) ) % 2;
    switch( which ) {
      case 0: // air strike
        airStrike( game );
        break;
      default:
        tankBarrage( game );
    }
    game.updateAttackTime(
          c.GAME_ATTACK_MIN_TIME,
          c.GAME_ATTACK_MAX_TIME,
          c.GAME_ATTACK_EXPIRE_TIME
        );
  }

  // recall attack if needed
  if( game.scatterReleaseAvailable ) {
    console.log( 'scatter release...' )
    game = moveGameFormations( game );
    game.fieldScattered = false;
    game.setFormationSwitchTime( c.GAME_FORMATION_SWITCH_TIME );
  }else if( !game.fieldScattered && game.formationSwitchAvailable ) {
    // only proceed with switch timing when attack is not in place
    game = moveGameFormations( game );
    game.setFormationSwitchTime( c.GAME_FORMATION_SWITCH_TIME );
  }
  return game;
}


exports = module.exports = engine;
