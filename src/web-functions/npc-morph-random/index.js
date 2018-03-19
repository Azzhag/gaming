'use strict'

const util = require('../common/util');
const out = require('../common/output');
const c = require('../common/constants');

module.exports = function (context, req) {
    
    // check that session was initialized
    if( !util.checkSession( context ) ) {
        context.res = out.compileError( 404, c.message.NOT_FOUND );
        return context.done();
    }

    const npcs = context.bindings.npcsIn;
    const reqBody = util.parseJSON( req.body ) || util.fillReq();

    // if we got an npc from id binding
    if( npcs.length > 0 ) {
        const npc = npcs[ Math.floor( Math.random() * npcs.length ) ];
        npc.color = reqBody.payload[c.labels.NPC_COLOR];
        context.bindings.npcOut = npc;
        // create success message
        context.res = out.compile( 200, c.type.ENEMY, reqBody.spec, reqBody.action, null, {},
            {
                [c.labels.NPC_ID]: npc[c.labels.NPC_ID],
                [c.labels.NPC_COLOR]: npc[c.labels.NPC_COLOR]
            }
        );
    } else {
        context.res = out.compileError( 404, c.message.NOT_FOUND, reqBody );
    }

    // complete
    context.done();
};