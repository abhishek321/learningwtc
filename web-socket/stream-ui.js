const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files from the public directory
app.use(express.static('public'));

// Endpoint to serve the HTML file
app.get('/test', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'stream-ui.html'));
});

// Streaming endpoint
app.get('/stream', (req, res) => {
    // Set the content type as text/plain
    res.setHeader('Content-Type', 'text/plain');

    // Create a read stream for the large file
    const readStream = fs.createReadStream('./sample.txt', { encoding: 'utf-8' });

    // Pipe the read stream to the response
    readStream.pipe(res);
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
