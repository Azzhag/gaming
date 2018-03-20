'use strict'

module.exports = {

    type: {
        PLAYER:                         0,
        ENEMY:                          1,
        BUILDING:                       2,
        ERROR:                          3,
        INIT:                           4,
        DESTROY:                        5
    },

    labels: { // note, if modifying, must change sql queries for relevant functions
        MESSAGE:                        'msg',
        ORIGINAL_MESSAGE:               'originalRequest',
        TYPE:                           'type',
        SPEC:                           'spec',
        ACTION:                         'action',
        PAYLOAD:                        'payload',
        INSTANCE:                       'instance',
        GAME_ACTIVE:                    'active',
        DO_MIXER:                       'enableMixer',

        // NPC RELATED
        NPC_ID:                         'npcId',
        NPC_LIST:                       'npcList',
        NPC_LIVING:                     'living',
        NPC_DEAD:                       'deceased',
        NPC_STATUS:                     'npcStatus',
        NPC_COUNT:                      'npcCount',
        NPC_TYPE:                       'npcType',
        NPC_WAYPOINT:                   'npcWaypoint',
        NPC_LABEL:                      'npcLabel',
        NPC_COLOR:                      "color",
        NPC_FORMATION_ID:               "formationId",
        NPC_FORMATION_WAYPOINT:         "waypoint",
        NPC_FORMATION_MEMBER_COUNT:     "memberCount",
        NPC_FORMATION_NEW_MEMBER_COUNT: "newFormationMemberCount",
        NPC_FORMATION_MEMBERS:          "listOfMembers",
        NPC_FORMATION_OFFSETS:          "listOfOffsets",
        NPC_FORMATION_SECONDARY_MEMBERS:"secondaryListOfMembers",
        NPC_FORMATION_SECONDARY_ID:     "secondaryFormationId",
        NPC_FORMATION_SECONDARY_OFFSETS:"secondaryListOfOffsets",
        NPC_FORMATION_ACTIVE:           "formationActive",

        BUILDING_ID:                    'buildingId',
        BUILDING_STATUS:                'buildingStatus',
        BUILDING_LIST:                  'buildingList',
        BUILDING_INTACT:                'intact',
        BUILDING_DESTROYED:             'destroyed',

        PLAYER_SCORE:                   'playerScore',
        PLAYER_NAME:                    'playerName'
    },

    message: { // note, if modifying, must change sql queries for relevant functions
        INVALID_INPUT:                  'Invalid input',    
        NOT_FOUND:                      'Not Found',
        OK:                             'Ok',
        NOT_INITIALIZED:                'Not Initialized',
        MISSING_DATA:                   'Missing Data',
    
        NPC_KILLED:                     'NPC Killed',
        NPC_SPAWNED:                    'NPC Spawned',
        NPC_ALREADY_DEAD:               'NPC Already Dead',
        NPC_LIVING:                     'Alive',
        NPC_DEAD:                       'Deceased',
        NPC_STATUS:                     'NPC Status',

        BUILDING_INTACT:                'Intact',
        BUILDING_DESTROYED:             'Destroyed',
        BUILDING_KILLED:                'Building Destroyed',
        BUILDING_ALREADY_DESTROYED:     'Building Already Destroyed',
        BUILDING_STATUS:                'Building Status',

        NO_MORE_WAYPOINTS:              'No Waypoints Left',           
    },

    val:{
        SCORE_REPORT_UPDATE_TIMEOUT:    2000
    }

}