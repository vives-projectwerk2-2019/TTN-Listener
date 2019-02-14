# TTN Listener

## Create an app on The Things Network
[Information can be found here.](https://www.thethingsnetwork.org/docs/applications/add.html)

## Install dependencies
```
npm install
``` 
## Create .env file
Create a `.env` file that looks like the `.env.example` file.
```
APP_ID=appId
ACCESS_KEY=accessKey
```
* For `appId`,copy the value for Application ID in the Application Overview box.
* For `accessKey`, scroll down and then show and copy the value for default key in the Access Key box.

## Run application
```
node index.js
```
## Test application
To simulate data you can navigate to `Applications > "YOUR_APP" > DEVICES > "YOUR_DEVICE"`
* Scroll down to 'SIMULATE UPLINK'.
* Insert payload and send.
