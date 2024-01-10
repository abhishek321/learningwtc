const express = require('express');
const status = require("express-status-monitor");
const app = express();
const fs = require('fs');
const zlib = require('zlib');
app.use(status());
fs.createReadStream('./sample.txt').pipe(zlib.createGzip().pipe(fs.createWriteStream("./sample.zip")));
app.get('/',(req,res)=>{
    // fs.readFile("./sample.txt",(err,data)=>{
    //  res.end(data)
    // })
    const stream = fs.createReadStream("./sample.txt","utf-8");
    // Streams are four type, Readable,Writeable,Duplex,Transform.
    //Nodejs Eventemitter instances;
    stream.on("data",(chunck)=>res.write(chunck));
    stream.on("end",()=>res.end());
    stream.on("error",(err)=>{console.log(err);res.end("File not found")});
    stream.on("finish",()=>{console.log("finiesed");res.end("File read completed")});
    // stream.pipe(res);
})
app.listen(4000, () => {
    console.log('server running at http://localhost:4000');
  });