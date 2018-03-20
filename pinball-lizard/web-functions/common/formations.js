'use strict'

const npc = require('./npc');
const c = require('./constants');

//( instance, id, type, count, waypoint, color, formationId = null )

module.exports.createFormationMembers = ( instance, formationId, members ) => {
    const retMembers = [];
    const count = Object.keys( members ).length;
    // verify each member before commiting
    for( let member of members ) {
        if( !member[c.labels.NPC_ID ] || 
            !member[c.labels.NPC_COLOR] || 
            !member[c.labels.NPC_TYPE] ) {
                console.log( member )
                return;
            return false;
        }
        retMembers.push( 
            npc.create( 
                instance, 
                member[c.labels.NPC_ID], 
                member[c.labels.NPC_TYPE], 
                member[c.labels.NPC_COLOR], 
                formationId 
            ) 
        );
    }
    return retMembers;
}

module.exports.createFormation = ( instance, formationId, formationWaypoint, listOfOffsets, members ) => {
    return {
        [c.labels.INSTANCE]:instance,
        [c.labels.NPC_FORMATION_ID]:formationId,
        [c.labels.NPC_FORMATION_WAYPOINT]:formationWaypoint,
        [c.labels.NPC_FORMATION_OFFSETS]:listOfOffsets,
        [c.labels.NPC_FORMATION_MEMBER_COUNT]: Object.keys( members ).length,
        [c.labels.NPC_FORMATION_ACTIVE]: true
    }
}

module.exports.getWaypoints = ( members ) => {
    // create 'listOfOffsets' for unity
    const listOfOffsets = [];
    for( let member of members ) {
        listOfOffsets.push( member[ c.labels.NPC_WAYPOINT ] );
    }
    return listOfOffsets;
}