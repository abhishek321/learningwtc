const {kafka} = require("./client");
async function init(){
    const admin = kafka.admin();
    console.log("Admin connecting..");
    await admin.connect();
    console.log("Admin connection Success...");
    console.log("Creating topic [rider-updats]");
   await admin.createTopics({
        topics:[{topic:'rider-updates',numPartitions:2}]
    });
    console.log("Topic created successfully");
    console.log("Admin disconnected")
   await admin.disconnect();
   
}
init();