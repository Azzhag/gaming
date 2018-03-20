'use strict'

/*
* message PUBLIC routing constants
* public messages are allowed through
* the websocket/unity
*/

const publicMsg = {}

/*
* Message type: initial route id
*/

publicMsg.type = {};

publicMsg.type.PLAYER     =  0;
publicMsg.type.ENEMY      =  1;
publicMsg.type.BUILDING   =  2;
publicMsg.type.ERROR      =  3;
publicMsg.type.INIT       =  4;
publicMsg.type.DESTROY    =  5;

/*
* Message specific: second route id
*/

publicMsg.spec = {};

publicMsg.spec.PLAYER = {};
publicMsg.spec.PLAYER.CURRENT       =  0;

publicMsg.spec.ENEMY = {};
publicMsg.spec.ENEMY.ALL            =  0;
publicMsg.spec.ENEMY.ICE_LICE       =  1;
publicMsg.spec.ENEMY.ARACHNO_TANK   =  2;
publicMsg.spec.ENEMY.FIRE_FLY       =  3;
publicMsg.spec.ENEMY.FORMATION      =  4;

publicMsg.spec.BUILDING = {};
publicMsg.spec.BUILDING.ALL         =  0;

publicMsg.spec.INIT = {};
publicMsg.spec.INIT.ALL             =  0;

publicMsg.spec.DESTROY = {};
publicMsg.spec.ERROR = {};


/*
* Message action: third route id
*/

publicMsg.action = {};

publicMsg.action.PLAYER = {};
publicMsg.action.PLAYER.UPDATE_NAME       =  0;
publicMsg.action.PLAYER.UPDATE_SCORE      =  1;
publicMsg.action.PLAYER.GET_SCORE         =  2;
publicMsg.action.PLAYER.ADD_SCORE         =  3;
publicMsg.action.PLAYER.SET_WAYPOINT      =  4;

publicMsg.action.ENEMY = {};
publicMsg.action.ENEMY.SPAWN              =  0;
publicMsg.action.ENEMY.DIE                =  1;
publicMsg.action.ENEMY.LIST               =  2;
publicMsg.action.ENEMY.STATUS             =  3;
publicMsg.action.ENEMY.SPLIT_FORMATION    =  4;
publicMsg.action.ENEMY.MERGE_FORMATION    =  5;
publicMsg.action.ENEMY.MOVE_FORMATION     =  7;
publicMsg.action.ENEMY.FORMATION_SCATTER  =  8;
publicMsg.action.ENEMY.MORPH              =  9;

publicMsg.action.BUILDING = {};
publicMsg.action.BUILDING.CREATE          =  0;
publicMsg.action.BUILDING.DESTROY         =  0;
publicMsg.action.BUILDING.LIST            =  0;
publicMsg.action.BUILDING.STATUS          =  0;

publicMsg.action.INIT  = {};
publicMsg.action.INIT.INITIALIZE          =  0;
publicMsg.action.INIT.START               =  1;

publicMsg.action.DESTROY  = {};
publicMsg.action.ERROR = {};

exports = module.exports = publicMsg;
