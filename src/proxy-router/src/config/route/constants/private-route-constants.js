'use strict'

const _ = require('lodash');
const pubRoutes = require('./public-route-constants');

/*
* message PRIVATE routing constants
* private messages are allowed through
* the local VN only and have no public
* endpoint
*/

const privateMsg = {};

/*
* Message type: initial route id
* When defining private message types, ensure index
* does not overwrite public message type unless desired
*/
privateMsg.type = {};
privateMsg.type.STATUS = 30;

/*
* Message specific: second route id
*/

privateMsg.spec = {};

/*
* Message action: third route id
*/

privateMsg.action = {};

// merge into pubRoutes
_.forIn( pubRoutes, (val, key) => {
  _.assignIn( privateMsg[key], val );
});

// Export: pubRoutes <<<< privRoutes (merged)
exports = module.exports = privateMsg;
