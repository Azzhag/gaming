'use strict'

const output = require('./output');
const c = require('./constants');

let util = {};

util.validate = ( item, list ) => {
    return list.indexOf( item ) >= 0;
}

util.checkSession = context => {
    // check that session was initialized
    if( context.bindings.instanceIn.length === 0 ) {
        context.res = output.compileError( 400, "Not Initialized" );
        return false;
    }
    return true;
}

util.fillReq = () =>{
    return {
        [c.labels.SPEC]:0,
        [c.labels.ACTION]:0,
        [c.labels.PAYLOAD]:{}
    }
}

util.parseJSON = obj => {
    if( typeof( obj ) === typeof( {} ) ) {
        return obj;
    }

    try {
        obj = JSON.parse( obj );
        return obj;
    } catch( e ) {
        return null;
    }
}

module.exports = util;