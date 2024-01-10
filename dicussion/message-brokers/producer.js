const {kafka} = require('./client');
const producer = kafka.producer()
async function init(){
await producer.connect()
await producer.send({
  topic: 'test-topic',
  messages: [
    { value: 'Hello KafkaJS user!' },
  ],
})

await producer.disconnect()
}
init();