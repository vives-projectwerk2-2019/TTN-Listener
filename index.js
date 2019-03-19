var mqtt = require("mqtt")
var ttn = require("ttn")
require('dotenv').config()
var appID = process.env.APP_ID
var accessKey = process.env.ACCESS_KEY

var mqttclient = mqtt.connect('mqtt://' + process.env.BROKER_HOST);

newhardware = {};

ttn.data(appID, accessKey)
    .then(function (client) {
        client.on("uplink", function (devID, payload) {
            console.log("Received uplink from " + devID + " on port " + payload.port)
            if (payload.port == 2 && isValid(payload)){
                button = {
                    movement: payload.payload_fields.Movement,
                    action: payload.payload_fields.Action,
                    dev_id: payload.dev_id
                }
                mqttclient.publish('TTN', JSON.stringify(button));
                console.log(JSON.stringify(button));
            }else if (payload.port == 1 && isValid(payload)){
                newhardware = {
                    id: payload.payload_fields.id,
                    add_1: payload.payload_fields.add_1,
                    add_2: payload.payload_fields.add_2,
                    add_3: payload.payload_fields.add_3,
                    dev_id: payload.dev_id
                }
            }
            mqttclient.publish('hardware', JSON.stringify(newhardware));
            console.log(JSON.stringify(newhardware));
        })
    })
    .catch(function (error) {
        console.error("Error", error)
        process.exit(1)
    })

    function isValid(payload) {
        if(payload.payload_fields) {
            return true
        }else {
            return false;
        }
    }
