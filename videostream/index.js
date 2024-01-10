const express = require("express");
const app = express();
const fs = require("fs");
const path = require('path');
const fs = require('fs');
const ytdl = require('ytdl-core');//not working
const request = require('request');
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.get("/video", function (req, res) {
    const range = req.headers.range;
    if (!range) {
        res.status(400).send("Requires Range header");
    }
    const videoPath = "Chris-Do.mp4";
    const videoSize = fs.statSync("Chris-Do.mp4").size;
    const CHUNK_SIZE = 10 ** 6;
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
    const contentLength = end - start + 1;
    const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": "bytes",
        "Content-Length": contentLength,
        "Content-Type": "video/mp4",
    };
    res.writeHead(206, headers);
    const videoStream = fs.createReadStream(videoPath, { start, end });
    videoStream.pipe(res);
});
app.get("/u-tube",async (req, res) => {
    const videoUrl = 'https://youtu.be/XGSy3_Czz8k';
  
    try {
      const info = await ytdl.getInfo(videoUrl);
      const format = ytdl.chooseFormat(info.formats, { quality: 'highestvideo' });
  
      if (format) {
        res.header('Content-Disposition', `attachment; filename="${info.title}.mp4"`);
        ytdl(videoUrl, { format: format }).pipe(res);
      } else {
        res.status(500).send('No available video format');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Error fetching video');
    }
  });
  app.get("/rq-video",async (req, res) => {
    const videoUrl = 'http://www.youtube.com/watch?v=XGSy3_Czz8k';
    var x = request(videoUrl)
    req.pipe(x)
    x.pipe(res)
  });
app.listen(8000, function () {
    console.log("Listening on port 8000!");
});