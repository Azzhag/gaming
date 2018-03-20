'use strict'

const config = require('./config.json');

// configure endpoints
exports.endpoints = module.exports.endpoints = {
    ENDPOINT_PLAYER_CONTROL:`${config.ROUTER_FUNCTION_ENDPOINT}/player`,
    ENDPOINT_ENEMY_CONTROL:`${config.ROUTER_FUNCTION_ENDPOINT}/npc`,
    ENDPOINT_BUILDING_CONTROL:`${config.ROUTER_FUNCTION_ENDPOINT}/building`,
    ENDPOINT_INIT:`${config.ROUTER_FUNCTION_ENDPOINT}/initialize`,
    ENDPOINT_DESTROY:`${config.ROUTER_FUNCTION_ENDPOINT}/destroy`,
    ENDPOINT_FORMATION_CONTROL:`${config.ROUTER_FUNCTION_ENDPOINT}/formation`,
    ENDPOINT_START:`${config.ROUTER_FUNCTION_ENDPOINT}/start`,
    ENDPOINT_COMMANDER:`https://${config.COMMANDER_IP}:${config.COMMANDER_PORT}/api`
};

// constant error messages
exports.err = module.exports.err = {
  ERR_MISSING_REQUIRED_DATA : "request missing required data",
  ERR_INVALID_DATA: "invalid data received",
  ERR_INVALID_ROUTE: "route could not be determined based on input",
  ERR_INVALID_OPTION: "invalid option specified",
  ERR_WEBSOCKET_NOT_CONNECTED: "websocket not connected"
};

// deployment keys
exports.keys = module.exports.keys = {
  ENDPOINT_ENEMY_KEY: config.ROUTER_FUNCTION_KEY,
  ENDPOINT_PLAYER_KEY: config.ROUTER_FUNCTION_KEY,
  ENDPOINT_BUILDING_KEY: config.ROUTER_FUNCTION_KEY,
  ENDPOINT_INIT_KEY: config.ROUTER_FUNCTION_KEY,
  ENDPOINT_DESTROY_KEY: config.ROUTER_FUNCTION_KEY,
  ENDPOINT_FORMATION_KEY: config.ROUTER_FUNCTION_KEY,
  ENDPOINT_START_KEY: config.ROUTER_FUNCTION_KEY,
  ENDPOINT_COMMANDER_KEY: config.COMMANDER_TOKEN
}

// auth key
exports.authToken = config.ROUTER_AUTH_TOKEN;
// ssl certificate passphrase
exports.sslPass = config.SSL_PASSPHRASE;
// use ssl for websocket?
exports.useSSL = module.exports.useSSL = true;
// use ssl for backdoor connections?
exports.bdUseSSL = module.exports.bdUseSSL = true;
// backdoor port
exports.internalPort = module.exports.internalPort = config.ROUTER_PORT;
// websocket port
exports.wsPort = module.exports.wsPort = config.ROUTER_WS_PORT;
// alternate health check probe port
exports.altHealthPort = module.exports.altHealthPort = process.env.HEALTH_PORT || "80";
// health check path for all ports
exports.healthCheckPath = module.exports.healthCheckPath = '/health';
// websocket path ( note: path / does not allow for health ping )
exports.wsPath = module.exports.wsPath = '/ws';
// return to sender key
exports.replyToSender = "replyToSender";
// reply to both (websocket & backdoor) key
exports.replyToBoth = "replyToBoth";
// passthrough key (pass request straight to websocket)
exports.passthrough = "passthru";
// rate limiting outgoing requests: maximum concurrent requests
exports.maxOutgoingRequests = 12;
// rate limiting outgoing requests: minimum time between requests (ms)
exports.minRequestDelayTime = 1;
// timeout for websocket to send authenticated message (on connect)
exports.websocketTimeout = 3000;
