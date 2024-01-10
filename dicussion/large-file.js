const express = require('express');
const fs = require('fs');
const app = express();
const port = 3003;

app.get('/stream-chunk', (req, res) => {
    const range = req.headers.range;
    let first1 = 1;
    if (!range && first1 > 1) {
        res.status(400).send("Requires range headers");
    }
    first1++;
    const filePath = 'example.txt';
    const chunkSize = 10**6;

    // Get the file size
    const fileSize = fs.statSync(filePath).size;
    let start = Number(range.replace(/\D/g, ""));
    let end = Math.min(start + chunkSize, fileSize - 1);
    const contentLength = end - start + 1;
    const headers = {
        "Content-Range": `bytes ${start}-${end}/${fileSize - 1}`,
        "Accept-Range": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "text/plain"
    };
    res.writeHead(206, headers);

    // Now, start and end are declared before usage
    const streamFile = fs.createReadStream(filePath, { start, end });
    streamFile.pipe(res);
});

app.get("/ch",(req,res)=>{
const readStream = fs.createReadStream("MOCK_DATA.csv");

let sum = 0;
let unprocessed = '';
readStream.on("data",(chunk)=>{
    let chunkString = unprocessed+chunk.toString();
    unprocessed='';
    let startIndex = 0;
    for(let ch=startIndex; ch < chunkString; ch++){
        if(chunkString[ch] == '\n'){
            const line = chunkString.slice(startIndex,ch);
            const idx = line.indexOf(',');
            const cost = line.slice(idx + 1);
            sum+=parseFloat(cost);
            startIndex = ch + 1;
        }
    }
    if(chunkString[chunkString.length - 1] !== '\n'){
        unprocessed = chunkString.slice(startIndex);
    }
});
readStream.on("end", () => {
    console.log("sum", sum);
});
readStream.on("end",()=>{
    console.log("sum",sum);
});
});

app.listen(port, () => {
    console.log(`Server runs on the port ${port}`);
});
