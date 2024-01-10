const {Kafka} = require('kafkajs');
exports.kafka = new Kafka({
    clientId:"my-app",
    brokers:["172.17.135.94:9092"]
});