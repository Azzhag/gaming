
'use strict'

const router = require('express')();
const reporting = require('./reporting');
const bodyParser = require('body-parser');

// reporting helpers
router.use( '/api/*', bodyParser.json() );
router.post( '/api/report/npc/killed', reporting.npcKilled );
router.post( '/api/report/instance/started', reporting.initialized );
router.post( '/api/report/instance/destroyed', reporting.destroyed );
router.post( '/api/report/playerwaypoint/', reporting.playerWaypoint );

exports = module.exports = router;
