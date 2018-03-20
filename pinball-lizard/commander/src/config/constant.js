'use strict'

const remoteConfig = require('./config.json');

const c = {};

c.RADIUS_NPC_ICE_LICE_RADIUS = 1.75;

c.NPC_TYPE = 1;
c.NPC_TYPE_ICE_LICE = 1;
c.NPC_TYPE_ARACHNO_TANK = 2;
c.NPC_TYPE_FIRE_FLY = 3;

c.FORMATION_TYPE = 1;
c.FORMATION_SPEC = 4;

c.FORMATION_SPAWN_ACTION = 0;
c.FORMATION_SPLIT_ACTION = 4;
c.FORMATION_MERGE_ACTION = 5;
c.FORMATION_MOVE_ACTION = 7;
c.ICE_LICE_SCATTER_ACTION = 8;
c.ICE_LICE_MORPH_ACTION = 9;

// npc atomic color value
c.NPC_ATOMIC_COLOR_VALUE = 'Atomic';

// min/max formation waypoint locations
c.FORMATION_X_MIN = -30;
c.FORMATION_X_MAX = 30;
c.FORMATION_Y_MIN = 10;
c.FORMATION_Y_MAX = 30;
c.FORMATION_Z_MIN = -50;
c.FORMATION_Z_MAX = 0;
c.FORMATION_RADIUS = 9;
c.FORMATION_ONPLAYER_Z_OFFSET = -5;

// on player coordinate
c.GAME_INIT_PLAYER_WAYPOINT = {x:0,y:17,z:0};
// time before first scatter/attack
c.GAME_INITIAL_SCATTER_WAIT_TIME = 25000;
// initial spawn delay (wait after initial spawn)
c.GAME_INIT_SPAWN_DELAY = 0;
// initial number of formations to spawn
c.GAME_NUMBER_OF_FORMATIONS = remoteConfig.COMMANDER_NUMBER_OF_FORMATIONS;
// initial size of formations
c.GAME_FORMATION_SIZE = remoteConfig.COMMANDER_FORMATION_SIZE;
// min size formations (merge when)
c.GAME_FORMATION_MIN_SIZE = 3;
// max size of formations
c.GAME_MAX_FORMATION_SIZE = 100;
// remove game from memory in 4 minutes
c.GAME_MEMORY_TIMEOUT = 240000;
// timer carried over from Unity, handles actions on interval
c.GAME_ACTION_TIMER = 1000;
// next attack minimum value (ms)
c.GAME_ATTACK_MIN_TIME = 10000;
// next attack maximum value (ms)
c.GAME_ATTACK_MAX_TIME = 30000;
// tank barrage and airstrik expiration (ms)
c.GAME_ATTACK_EXPIRE_TIME = 100000;
// spawn new formation expiration (ms)
c.GAME_SPAWN_EXPIRE_TIME = 115000;
// delay between scatter icelice and air strike (ms)
c.GAME_SCATTER_DELAY_AIRSTRIKE = 1000;
// delay between tank barrage and scatter (ms)
c.GAME_SCATTER_DELAY_TANKS = 3000;
// attack time delay for airstrike (ms)
c.GAME_ATTACK_WAIT_TIME_AIRSTRIKE = 2500;
// attack time delay for barrage (ms)
c.GAME_ATTACK_WAIT_TIME_TANK_BARRAGE = 3000;
// minimum time between changing formation waypoints (ms)
c.GAME_FORMATION_SWITCH_TIME = 2000;
// game random atomic icelice time
c.GAME_RANDOM_ATOMIC_ICE_LICE_TIME = 200000;
// game initial atomic icelice time
c.GAME_INITIAL_ATOMIC_ICE_LICE_TIME = 60000;

exports = module.exports = c;
