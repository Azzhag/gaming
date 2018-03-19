'use strict'

const https = require('https');
const Url = require('url');

const relayIP = process.env.INTERNAL_RELAY_IP;
const relayPort = process.env.INTERNAL_RELAY_PORT;
const relayToken = process.env.INTERNAL_RELAY_AUTH_TOKEN;

const requests = {};

const makeRequest = ( opts, handler, postData ) => {

    if( typeof postData !== "string" ) {
        console.log( 'postData must be stringified!' );
        return;
    }
    opts.agent = false;
    opts.rejectUnauthorized = false;
    return new Promise( (resolve, reject) => {
        const req = handler.request(opts, res => {
            if( res.statusCode === 200 ) {
                let response = "";
                res.setEncoding('utf8');
                res.on('data', chunk => {
                    response += chunk;
                });
                res.on('end', () => {
                    resolve( response );
                });
            } else {
                reject( res.statusMessage );
            }
        });
        req.on('error', err => {
            console.log( err );
        });
        if( postData !== undefined ) {
            req.write( postData );
        }
        req.end();
    }).catch( err => {
        console.log( err );  
    });
}

const addRelayRequest = ( id, url, method, headers, data=null ) => {
    let relay = {
        "uri":url.href,
        "method":method
    };
    if( data ) relay['payload'] = data;
    if( headers ) relay['headers'] = headers;
    if( !requests[id] ) {
        console.log("Relay not initialized.")
        return false;
    } else {
        requests[id].relays.push( relay );
        return true;
    }
}

const compileURI = ( hostname, port, path ) => {
    const url = Url.parse( Url.resolve( `https://${hostname}:${port}`, path ) );
    return url;
}

module.exports.initRelay = id => {
    if( !requests[ id ] ) {
        requests[ id ] = {
            "ordered":false,
            "headers":{},
            "relays":[]
        }
    }
    return id;
}

// return a promise
module.exports.sendRelays = ( id, ordered = false ) => {
    //console.log( `Sending relays for ${id}`)
    if( !requests[ id ] ) return false;
    requests[id].ordered = ordered;
    let postData = requests[ id ];
    postData = JSON.stringify( postData );
    let opts = {
        protocol:"https:",
        hostname:relayIP,
        port:relayPort,
        method:"POST",
        headers:{
            "Authorization":`Bearer ${relayToken}`,
            "Content-Type":"application/json",
            "Content-Length":Buffer.byteLength( postData )
        },
        agent:false,
        rejectUnauthorized:false,
        timeout:3000,
        path:"/relay"
    }
    delete requests[id];
    return makeRequest( opts, https, postData );
}

module.exports.addGetRequest = ( id, hostname, port, path, headers ) => {
    const url = compileURI( hostname, port, path );
    return addRelayRequest( id, url, "GET", headers );
}

module.exports.addPostRequest = ( id, hostname, port, path, headers, data ) => {
    data = JSON.stringify( data );
    headers['Content-Type'] = 'application/json';
    headers['Content-Length'] = Buffer.byteLength( data );
    const url = compileURI( hostname, port, path );
    return addRelayRequest( id, url, "POST", headers, data );
}
