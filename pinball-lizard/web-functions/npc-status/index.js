'use strict'

const out = require('../common/output');
const c = require('../common/constants');
const npc = require('../common/npc');
const util = require('../common/util');

module.exports = function (context, req) {
    
    // check that session was initialized
    if( !util.checkSession( context ) ) {
        return context.done();
    }

    const npc = context.bindings.npcIn[0];
    const reqBody = util.parseJSON( req.body ) || util.fillReq();

    // if we got an npc from id binding
    if( npc ) {
        // create success message
        context.res = out.compile( 200, c.type.ENEMY, reqBody.spec, reqBody.action, null, reqBody,
            {
                [c.labels.MESSAGE]: c.message.NPC_STATUS,
                [c.labels.NPC_ID]: npc[c.labels.NPC_ID],
                [c.labels.NPC_STATUS]: npc[c.labels.NPC_STATUS]
            }
        );
    } else {
        context.res = out.compileError( 404, c.message.NOT_FOUND, reqBody );
    }

    // complete
    context.done();
};