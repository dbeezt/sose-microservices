const Eureka = require('eureka-js-client').Eureka;
const port = 3000;
const host = '0.0.0.0';

const client = new Eureka({
    instance: {
        app: 'test service',
        hostName: 'localhost',
        ipAddr: '127.0.0.1',
        statusPageUrl: 'http://localhost:3000',
        vipAddress: 'test-service',
        port: {
            $: port,
            '@enabled': 'true',
        },
        dataCenterInfo: {
            '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
            name: 'MyOwn',
        },
        registerWithEureka: true,
        fetchRegistry: true,
    },
    eureka: {
        host: 'localhost',
        port: 8761,
        servicePath: '/eureka/apps',
    },
});

module.exports = client;