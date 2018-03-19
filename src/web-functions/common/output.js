'use strict'

const c = require('./constants');

const compileError = (code, msg, body={}) => {
    return compile( code, c.type.ERROR, 0, 0, msg, body );
}

/**
 * @param {int} statusCode
 * @param {int} responseType
 * @param {string} responseMessage
 */
const compile = ( statusCode, responseType, 
                  spec = 0, action = 0, responseMessage = null, original = {}, payload = null
                ) => {

    if( payload === null ) {
        payload = {
            [c.labels.MESSAGE] : responseMessage,
            [c.labels.ORIGINAL_MESSAGE] : original
        }
    } else {
        payload[c.labels.ORIGINAL_MESSAGE] = original;
    }

    if( Object.keys( original ).length === 0 ) {
        delete payload[ c.labels.ORIGINAL_MESSAGE ];
    }

    return {
        status: statusCode,
        headers: {
            "content-type":"application/json"
        },
        body: {
            [c.labels.TYPE]: responseType,
            [c.labels.SPEC]: spec,
            [c.labels.ACTION]: action,
            [c.labels.PAYLOAD]: payload
        }
    }

}

module.exports.compile = compile;
module.exports.compileError = compileError;