const {kafka} = require("./client");
async function init(){
    const producer = kafka.producer();
    console.log("Connecting producer..");
    await producer.connect();
    console.log("Producer connected successfully");

    await producer.send({
              topic:'rider-updates',
              messages:[
                {
                    partition:0,
                    key:"location-update",value:JSON.stringify({name:"Abhishek-"+Date.now(),loc:"Noida"})
                },
                {
                    partition:0,
                    key:"vendor",value:"CSE"
                }
            ]
    });
    await producer.disconnect();
}
init();