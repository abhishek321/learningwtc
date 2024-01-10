const fs = require('fs');
(async () => {
    const writeStream = fs.createWriteStream("MOCK_DATA.csv");
    for(let i = 0; i<1e8; i++){
        const overWatermark = writeStream.write(`${i},1\n`);
        // wait until buffer data clear form memory
        if(!overWatermark){
            await new Promise((resolve)=> writeStream.once('drain',resolve));
        }
    }
    writeStream.end();
})();