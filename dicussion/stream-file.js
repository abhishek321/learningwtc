const express = require('express');
const fs = require('fs');
const app = express();
const port = 3002;
app.get('/stream-data',(req,res)=>{
  const stream = fs.createReadStream("example.txt");
  stream.on("data",(chunk)=>{
   res.write(chunk);
  });
  stream.on("error",(err)=>{
    console.log('Chunke error', err);
  })
  stream.on("end",()=>{
    console.log("Data fininsed");
    res.end("Data fininsed");
  })
});
app.get('/pipe-data',(req,res)=>{
    const stream = fs.createReadStream("example.txt");
    stream.pipe(res);
  });
app.listen(port,()=>{
    console.log(`Server runs on the port ${port}`);
})