const {kafka} = require('./client');
const consumer = kafka.consumer({ groupId: 'test-group' })
async function init(){
await consumer.connect()
await consumer.subscribe({ topic: 'test-topic', fromBeginning: true })

await consumer.run({
  eachMessage: async ({ topic, partition, message }) => {
    console.log({ partition:partition,
      value: message.value.toString(),
    })
  },
})
}
init();