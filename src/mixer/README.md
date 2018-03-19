# Unity Azure Mixer Handler

Mixer handler functionality for Pinball Lizard

## Configuration: ( see src/config.json )

Configuration values are loaded remotely when this application is initialized. Since we use Docker container instances (preview) to host the individual microservices,
we utilize a configuration function app to centralize configurations ranging from authentication keys to service ip addresses. The remote configuration is read,
utilizing the endpoint and function key contained in the config.json, then the file is overwritten with configuration data loaded from the endpoint. Additionally,
the app exposes an endpoint which allows the configuration to be reloaded remotely on command. This allows us to change configurations and restart all services
to keep them synced. Please see the web functions for further information on the configuration endpoint.

## Mixer Authentication Token

**Tokens are valid for a period of (1) year.** Instructions as of Q1, 2018

1. Navigate to the developer lab at https://mixer.com/lab/oauth
2. Click to add a new application
3. Fill out the Name and Website fields with any valid values.
4. In the hosts field, enter 'localhost' (without quotes).
5. Do not check the 'Use Secret Key' checkbox.
6. Press create, this generates a Client ID.
7. Copy the Client ID to the following URI, which you can navigate to your browser:
<pre><code>https://mixer.com/oauth/authorize?redirect_uri=https:%2F%2Flocalhost%2Foauth-return&response_type=token&scope=interactive%3Arobot%3Aself&client_id=<your-oauth-client-id></code></pre>
8. The navigation should show 'page not found', this is ok.
9. Examine the URI you were directed to, your oauth_token will be contained in the URI.
10. Copy and paste your oauth_token from the URI.
