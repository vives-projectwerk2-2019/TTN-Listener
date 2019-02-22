var ttn = require("ttn")
var appID = process.env.APP_ID
var accessKey = process.env.ACCESS_KEY

ttn.data(appID, accessKey)
    .then(function (client) {
        client.on("uplink", function (devID, payload) {
            console.log("Received uplink from " + devID + " on port " + payload.port)
            if (payload.port == 0){
                button = {
                    button: payload.payload_fields.button
                }
                console.log(JSON.stringify(button));
            }else if (payload.port == 1){
                newhardware = {
                    id: payload.payload_fields.id,
                    add_1: payload.payload_fields.add_1,
                    add_2: payload.payload_fields.add_2,
                    add_3: payload.payload_fields.add_3
                }
                console.log(JSON.stringify(newhardware));
            }
        })
    })
    .catch(function (error) {
        console.error("Error", error)
        process.exit(1)
    })

function postApi() {
    var options = {
        hostname: 'api',
        port: 8080,
        path: '/ttn/something',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
    };
    var req = http.request(options, function(res) {
            // On request finish
            console.log('Status: ' + res.statusCode);
        });
    // Example body
    result = '{ "hello": "json" }';
    req.write('{"string": ' + result + '}');
    req.end();
}
