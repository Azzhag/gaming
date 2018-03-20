# Unity Azure Commander

Provides gameplay functionality for Pinball Lizard. Game engine controls in game Ice Lice formations and movements and commands Air Strikes and Tank Barrages.

## Configuration: ( see src/config.json )

Configuration values are loaded remotely when this application is initialized. Since we use Docker container instances (preview) to host the individual microservices,
we utilize a configuration function app to centralize configurations ranging from authentication keys to service ip addresses. The remote configuration is read,
utilizing the endpoint and function key contained in the config.json, then the file is overwritten with configuration data loaded from the endpoint. Additionally,
the app exposes an endpoint which allows the configuration to be reloaded remotely on command. This allows us to change configurations and restart all services
to keep them synced. Please see the web functions for further information on the configuration endpoint.
