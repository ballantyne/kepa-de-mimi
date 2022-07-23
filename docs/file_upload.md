# File Upload

Here is an example of an express router for uploading directly to a server from mimi cli using the -u or --url option.  If you think that this should be handled differently, please feel free to let me know.

```bash 
cat large_file.extension | mimi encrypt -p password -u http://localhost:3000/upload/a_really_long_api_key/large_file.extension.mimi
```

```javascript
var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');

router.post('/upload/:api_key/:filename', function(req, res, next) {
  var filename = [new Date().getTime().toString(), req.params.filename].join('-');
  var writeable = fs.createWriteStream(path.join(__dirname, '..', 'public', filename));
  req.pipe(writeable);

  req.on('end', function() {
    res.json({success: true})
  })
});

module.exports = router;
```

Or using plain old node.js
```bash
cat large_file.extension | mimi encrypt -p password -u http://localhost:3000/upload/a_really_long_api_key/large_file.extension.mimi
```

```javascript
var fs = require('fs');
var path = require('path');
var http = require('http');
var server = http.createServer(function (req, res) {
  var filename = [new Date().getTime().toString(), req.url.split('/').pop()].join('-');
  var writeable = fs.createWriteStream(path.join(__dirname, 'public', filename));
  req.pipe(writeable);

  req.on('end', function() {
    res.write('{"success": true}');
    res.end();
  })
});
server.listen(3000, '127.0.0.1');
```

Or to stream to s3 from a node.js http server
```javascript
var path = require('path');
var http = require('http');
var AWS = require('aws-sdk');

AWS.config = new AWS.Config({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

var modifyUrl = function(url) {
  var urlComponents = url.split('/')
  var filename = [new Date().getTime().toString(), urlComponents.pop()].join('-');
  urlComponents.push(filename);
  url = urlComponents.join('/');
  return url.slice(1, url.length);
}

var server = http.createServer(function (req, res) {
  var s3obj = new AWS.S3({
    params: {
      Bucket: process.env.AWS_BUCKET,
      Key: modifyUrl(req.url)
    }
  });

  s3obj.upload({Body: req})
    .on('httpUploadProgress', function(evt) { console.log(evt); })
    .send(function(err, data) { console.log(err, data) });

  req.on('end', function() {
    res.write('{"success": true}');
    res.end();
  })
});
server.listen(8000, '127.0.0.1');
```
