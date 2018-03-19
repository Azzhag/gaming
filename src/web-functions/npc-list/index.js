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
    
    const npcs = context.bindings.npcsIn;
    const reqBody = util.parseJSON( req.body ) || util.fillReq();

    // create living/dead lists
    let living = [];
    let dead = [];
    let blacklist = [ 'id' ];
    for( let x of npcs ) {
        // remove all items with prefix _
        for( let k in x ) {
            if( k.substring( 0, 1 ) === "_" || blacklist.includes( k ) ) {
                delete x[k];
            }
        }
        if( x[c.labels.NPC_STATUS] === c.message.NPC_LIVING ) {
            living.push( x );
        } else {
            dead.push( x );
        }
    }

    // create output message
    context.res = out.compile( 200, c.type.ENEMY, reqBody.spec, reqBody.action, null, reqBody, 
        {
            [c.labels.NPC_LIST]: npcs,
            [c.labels.NPC_LIVING]: living,
            [c.labels.NPC_DEAD]: dead
        }
    );

    // complete
    context.done();
};