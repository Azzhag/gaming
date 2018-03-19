'use strict'

/*
*
*   Provides configuration data to all other microservices
*
*/

module.exports = function (context, req) {

    let config = {
        // Config Endpoint (Must be initially set to the current values in each app's config)
        // when changed, app config will be re-written within the containers upon s://<app-ip>/config/reload
        "CONFIG_ENDPOINT_URI":process.env.CONFIG_ENDPOINT_URI,
        "CONFIG_ENDPOINT_KEY":process.env.CONFIG_ENDPOINT_KEY,
        // Commander
        "COMMANDER_IP":process.env.COMMANDER_IP,
        "COMMANDER_PORT":process.env.COMMANDER_PORT,
        "COMMANDER_TOKEN":process.env.COMMANDER_TOKEN,
        "COMMANDER_NUMBER_OF_FORMATIONS":process.env.COMMANDER_NUMBER_OF_FORMATIONS,
        "COMMANDER_FORMATION_SIZE":process.env.COMMANDER_FORMATION_SIZE,
        // Internal Relay
        "INTERNAL_RELAY_IP":process.env.INTERNAL_RELAY_IP,
        "INTERNAL_RELAY_PORT":process.env.INTERNAL_RELAY_PORT,
        "INTERNAL_RELAY_AUTH_TOKEN":process.env.INTERNAL_RELAY_AUTH_TOKEN,
        "INTERNAL_RELAY_ALLOWED_HOSTS":process.env.INTERNAL_RELAY_ALLOWED_HOSTS,
        // Router
        "ROUTER_IP":process.env.ROUTER_IP,
        "ROUTER_PORT":process.env.ROUTER_PORT,
        "ROUTER_WS_PORT":process.env.ROUTER_WS_PORT,
        "ROUTER_AUTH_TOKEN":process.env.ROUTER_AUTH_TOKEN,
        // Mixer Handler
        "MIXER_HANDLER_TOKEN":process.env.MIXER_HANDLER_TOKEN,
        "MIXER_HANDLER_IP":process.env.MIXER_HANDLER_IP,
        "MIXER_HANDLER_PORT":process.env.MIXER_HANDLER_PORT,
        "MIXER_CHANNEL_TOKEN":process.env.MIXER_CHANNEL_TOKEN,
        "MIXER_CHANNEL_VERSION_ID":process.env.MIXER_CHANNEL_VERSION_ID,
        "MIXER_BUTTON_COOLDOWN":process.env.MIXER_BUTTON_COOLDOWN,
        // Application Gateway
        "APP_GATEWAY_IP":process.env.APP_GATEWAY_IP,
        // Playfab Handler
        "PLAYFAB_HANDLER_IP":process.env.PLAYFAB_HANDLER_IP,
        "PLAYFAB_HANDLER_PORT":process.env.PLAYFAB_HANDLER_PORT,
        "PLAYFAB_HANDLER_TOKEN":process.env.PLAYFAB_HANDLER_TOKEN,
        "PLAYFAB_API_TITLE_ID":process.env.PLAYFAB_API_TITLE_ID,
        "PLAYFAB_API_SECRET":process.env.PLAYFAB_API_SECRET,
        // Router link
        "ROUTER_FUNCTION_ENDPOINT":process.env.ROUTER_FUNCTION_ENDPOINT,
        "ROUTER_FUNCTION_KEY":process.env.ROUTER_FUNCTION_KEY
    }

    context.res = config;
    context.done();
}