const express = require('express');
const AWS = require('aws-sdk');

const app = express();
const port = 3000;

// AWS S3 configuration
const s3 = new AWS.S3({
  accessKeyId: 'your-access-key-id',
  secretAccessKey: 'your-secret-access-key',
  region: 'your-s3-region',
});

// Endpoint for initiating file download
app.get('/download/:key', (req, res) => {
  const key = req.params.key;

  // Set S3 bucket name
  const bucketName = 'your-s3-bucket-name';

  // Configure the parameters for downloading from S3
  const params = {
    Bucket: bucketName,
    Key: key,
  };

  // Create a readable stream from S3 and pipe it to the response
  const s3Stream = s3.getObject(params).createReadStream();

  // Set appropriate headers for the response
  res.setHeader('Content-Disposition', `attachment; filename="${key}"`);
  res.setHeader('Content-Type', 'application/octet-stream');

  // Pipe the S3 stream to the response
  s3Stream.pipe(res);
});

app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});
