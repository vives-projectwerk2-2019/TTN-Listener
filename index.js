var mqtt = require("mqtt")
var ttn = require("ttn")
require('dotenv').config()
var appID = process.env.APP_ID
var accessKey = process.env.ACCESS_KEY

var mqttclient = mqtt.connect('mqtt://labict.be');

ttn.data(appID, accessKey)
    .then(function (client) {
        client.on("uplink", function (devID, payload) {
            console.log("Received uplink from " + devID + " on port " + payload.port)
            if (payload.port == 48){
                button = {
                    button: payload.payload_fields.button
                }
                mqttclient.publish('TTN', JSON.stringify(button));
                console.log(JSON.stringify(button));
            }else if (payload.port == 1){
                newhardware = {
                    id: payload.payload_fields.id,
                    add_1: payload.payload_fields.add_1,
                    add_2: payload.payload_fields.add_2,
                    add_3: payload.payload_fields.add_3
                }
                mqttclient.publish('TTN', JSON.stringify(newhardware));
                console.log(JSON.stringify(newhardware));
            }
        })
    })
    .catch(function (error) {
        console.error("Error", error)
        process.exit(1)
    })