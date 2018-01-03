// https://www.npmjs.com/package/node-ssdp
// https://github.com/netbeast/react-native-ssdp

import {Client} from 'react-native-ssdp';

class SearchUpnp {

    client;

    constructor(updateFc) {
        this.client = new Client({
            //adInterval Number advertise event frequency (ms). Default: 10 sec.
            adInterval: 1000
        });
        this.client.on('response', (headers, code, rinfo) => updateFc(headers, code, rinfo));
        this.client.on('notify', function (args) {
            console.log('Got a notification.', args);
        });
        this.client.on('message', function (data, rinfo) {
            console.log('uPnP message');
            console.log(JSON.stringify(rinfo, null, ' '));
            console.log(data);
        });
    }

    search = () => {
        console.log('uPnP searching');
        this.client.search('ssdp:all');
        //stop after 10sec
        // setTimeout(() => {
        //     this.stop();
        // }, 10000);
    };

    stop = () => {
        // search for a service type
        // client.search('urn:schemas-upnp-org:service:ContentDirectory:1');
        // urn:schemas-upnp-org:device:MediaServer:1
        //TV LG
        // urn:schemas-upnp-org:service:RenderingControl:1
        //urn:schemas-upnp-org:service:ConnectionManager:1
        //urn:schemas-upnp-org:service:AVTransport:1

        // Or get a list of all services on the network
        // setTimeout(() => {
        console.log('uPnP STOP');
        this.client.stop();
        // }, 10000);
    }
}

export default SearchUpnp;
