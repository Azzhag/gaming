'use strict'

const out = require('../common/output');
const c = require('../common/constants');
const util = require('../common/util');

module.exports = function (context, req) {
    
    // check that session was initialized
    if( !util.checkSession( context ) ) {
        return context.done();
    }
    
    const buildings = context.bindings.buildingsIn;
    const reqBody = util.parseJSON( req.body ) || util.fillReq();

    // create intact/destroyed lists
    let intact = [];
    let destroyed = [];
    let blacklist = [ 'id' ];
    for( let x of buildings ) {
        // remove all items with prefix _
        for( let k in x ) {
            if( k.substring( 0, 1 ) === "_" || blacklist.includes( k ) ) {
                delete x[k];
            }
        }
        if( x[c.labels.BUILDING_STATUS] === c.message.BUILDING_INTACT ) {
            intact.push( x );
        } else {
            destroyed.push( x );
        }
    }

    // create output message
    context.res = out.compile( 200, c.type.BUILDING, reqBody.spec, reqBody.action, null, reqBody, 
        {
            [c.labels.BUILDING_LIST]: buildings,
            [c.labels.BUILDING_INTACT]: intact,
            [c.labels.BUILDING_DESTROYED]: destroyed
        }
    );

    // complete
    context.done();
};