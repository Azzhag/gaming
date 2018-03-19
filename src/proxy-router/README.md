## Routing:

* Routing occurs between Unity/Router via open TLS WebSocket through Application Gateway
* Router lives behind Application Gateway
* Router implements basic pre-shared key authentication (backdoor:bearer, websocket:custom)
* Router proxies messages from Unity to all other functionality (via https)
* Router exposes backdoor port for incoming requests via https
	* Incoming requests are handle exactly like requests sent by Unity
	* Local requests can choose to receive response or have it forwarded to unity
		* Request option: "replyToSender" {bool}, if omitted or false, causes
		  request response to be forwarded to the websocket.
		* Request option: "replyToBoth" {bool}, will cause the response to be returned
		  to both sender and through websocket.
		* Request option: "passthru" {bool}, will cause the request body to be delivered
		  directly to the websocket.
		* Requests originating from websocket always respond via websocket


### See src/config/route/constants for pre-defined constant values

### Request Payload Schema:
```
{
  "id":"/MessageSchema",
  "type":"object",
  "properties":{
    "auth":{
      "type":"object",
      "properties":{
        "key":{ "type":"string" }
      },
      "required":["key"]
    },
    "instance":{
      "type":"string"
    },
    "type":{
      "type":"integer"
    },
    "spec":{
      "type":"integer"
    },
    "action":{
      "type":"integer"
    },
    "payload":{
      "type":"object"
    }
  },
  "required":[
    "instance", "auth", "type", "action", "spec", "payload"
  ]
}
```

### Explanation:

* type : type of request
* spec : specific
* action : type of action
* payload : contains data specific to this request


## Configuration: ( see src/config.json )

Configuration values are loaded remotely when this application is initialized. Since we use Docker container instances (preview) to host the individual microservices,
we utilize a configuration function app to centralize configurations ranging from authentication keys to service ip addresses. The remote configuration is read,
utilizing the endpoint and function key contained in the config.json, then the file is overwritten with configuration data loaded from the endpoint. Additionally,
the app exposes an endpoint which allows the configuration to be reloaded remotely on command. This allows us to change configurations and restart all services
to keep them synced. Please see the web functions for further information on the configuration endpoint.
