'use strict'

const c = require('./constants');

const enemy = {

    labels: {
        "il" : "Ice Lice",
        "at" : "Arachno Tank",
        "ff" : "Fire Fly"
    },

    maxAllowed: {
        "il" : 500,
        "at" : 100,
        "ff" : 100
    }
}

module.exports.findWaypoint = ( npcList, type ) => {
    // maximum allowed npc of this type
    const max = enemy.maxAllowed[ type ];
    // if we already have max, return -1
    if( npcList.length >= max ) {
        return -1;
    }
    // build an array of waypoints
    let waypoints = [];
    // mark current waypoints
    for( let x of npcList ) {
        waypoints[x[c.labels.NPC_WAYPOINT]] = 1;
    }
    // find a random start position
    let start = Math.floor( Math.random() * enemy.maxAllowed[ type ] );
    // loop until we hit an open waypoint
    while( waypoints[ start ] === 1 ) {
        start = ++start % max;
    }
    return start;
}

module.exports.create = ( instance, id, type, color, formationId = 'default' ) => {
    return { 
                [c.labels.INSTANCE]: instance,
                [c.labels.NPC_ID]: id, 
                [c.labels.NPC_TYPE]: type,
                [c.labels.NPC_COLOR]: color,
                [c.labels.NPC_LABEL]: enemy.labels[ type ],
                [c.labels.NPC_FORMATION_ID]: formationId,
                [c.labels.NPC_STATUS]: c.message.NPC_LIVING
           };
}