'use strict'

const c = require('../config');
const https = require('https');
const http = require('http');

const makeRequest = ( opts, handler, postData ) => {
    opts.agent = false;
    opts.rejectUnauthorized = false;
    return new Promise( (resolve, reject) => {
        const req = handler.request(opts, res => {
            let response = "";
            res.setEncoding('utf8');
            res.on('data', chunk => {
                response += chunk;
            });
            if( res.statusCode === 200 ) {
              res.on('end', () => {
                  resolve( response );
              });
            } else {
              res.on('end', () => {
                  reject({
                    response,
                    code:res.statusCode,
                    msg:res.statusMessage
                  });
              });
            }
        });
        req.on('error', err => {
            console.log( err );
        });
        if( postData !== undefined ) {
            req.write( postData );
        }
        req.end();
    });
}

module.exports.https = {};

module.exports.https.get = ( hostname, port, path, headers ) => {
    const opts = {
        hostname, port, path,
        method: 'GET',
        headers: headers
    }
    return makeRequest( opts, https );
}

module.exports.https.post = ( hostname, port, path, headers, data ) => {
    data = typeof data === "string" ? JSON.parse( data ) : data;
    // insert auth key into postData
    data.auth = { key:c.ROUTER_AUTH_TOKEN };
    data.replyToSender = true;
    data = JSON.stringify( data );
    headers['Content-Type'] = 'application/json';
    headers['Content-Length'] = Buffer.byteLength( data );
    const opts = {
        hostname, port, path,
        method: 'POST',
        headers: headers
    }
    return makeRequest( opts, https, data );
}

module.exports.http = {};

module.exports.http.get = ( hostname, port, path, headers ) => {
    const opts = {
        hostname, port, path,
        method: 'GET',
        headers: headers
    }
    return makeRequest( opts, http );
}

module.exports.http.post = ( hostname, port, path, headers, data ) => {
    data = typeof data === "string" ? JSON.parse( data ) : data;
    // insert auth key into postData
    data.auth = { key:c.ROUTER_AUTH_TOKEN };
    data.replyToSender = true;
    data = JSON.stringify( data );
    headers['Content-Type'] = 'application/json';
    headers['Content-Length'] = Buffer.byteLength( data );
    const opts = {
        hostname, port, path,
        method: 'POST',
        headers: headers
    }
    return makeRequest( opts, http, data );
}

module.exports.makeRequest = makeRequest;
