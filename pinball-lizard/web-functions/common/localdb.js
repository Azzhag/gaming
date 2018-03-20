const { DocumentClient } = require("documentdb");
const config = require('../config');

let host = config.HOST;
let masterKey = config.AUTHKEY;

const client = new DocumentClient( host, { masterKey } );

const db = { id: config.DATABASEID };
const col = { id: config.COLLECTIONID };

const testDB = ( context, entry ) => {
    return new Promise( (resolve, reject) => {
        client.createDatabase( db, (err, database) => {
            if( err ) return reject(err);
            context.log( 'Created Or Found DB' );
            context.log( typeof( database ) );
            // create the collection
            client.createCollection( database._self, col, (err, collection) => {
                if( err ) return reject( err );
                context.log( "Created Or Found Collection");
                client.createDocument( collection._self, entry, (err, document) => {
                    if( err ) return reject( err );
                    context.log( "Created document..." );
                    context.log( document.content );
                });
            });
        });
    });
}