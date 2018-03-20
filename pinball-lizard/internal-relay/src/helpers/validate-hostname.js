'use strict'

const config = require('../config/config.json');

const allowedHostnames = () => {
  return [
    config.CONFIG_ENDPOINT_URI,
    config.COMMANDER_IP,
    config.INTERNAL_RELAY_IP,
    config.ROUTER_IP,
    config.MIXER_HANDLER_IP,
    config.APP_GATEWAY_IP,
    config.PLAYFAB_HANDLER_IP,
    config.ROUTER_FUNCTION_ENDPOINT,
    'azurewebsites.net',
    'localhost',
    'ngrok.io'
  ]
}

const domainName = url => {
  const regex = /^(?:[\d]{1,3}[\.]{1}){3}[\d]{1,3}$/;
  const host = url.hostname;
  // check for ip address
  if( host.match( regex ) ) {
    return host;
  }
  // split off subdomains
  let parts = host.split('.');
  if( parts.length > 1 ) {
    let tld = parts.pop();
    let domain = parts.pop();
    return `${domain}.${tld}`;
  }else{
    return host;
  }
}

exports = module.exports = url => {
  const hosts = allowedHostnames();
  return hosts.includes( domainName( url ) );
}
