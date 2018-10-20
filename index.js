var path = require('path'),
    crypto = require('crypto'),
    algorithm = 'aes-256-ctr';

var fs = require('fs');
var zlib = require('zlib');

var hashify = function(password, vector) {
  return crypto.createHmac('sha256', password)
    .update(vector)
    .digest('hex');
}

var logMessage = function(message) {
  if (process.env.NODE_ENV != 'test') {
    if (typeof message == 'string') {
      console.log(message);
    }  else {
      console.log(message.join(' '));
    }
  }
}

module.exports.encrypt = function(password, input, output, vector) {
  var encrypt;
  if (vector != undefined) {
    vector = hashify(password, vector).slice(0, 16);
    password = hashify(password, vector).slice(0, 32);
    encrypt = crypto.createCipheriv(algorithm, password, vector);
  } else {
    encrypt = crypto.createCipher(algorithm, password);
  }
  
  var r = fs.createReadStream(path.join(process.cwd(), input));
  var zip = zlib.createGzip();
  var w = fs.createWriteStream(path.join(process.cwd(), output));
  
  w.on('finish', () => {
    logMessage([input, 'encrypted as', output]);
  });
  
  r.pipe(zip).pipe(encrypt).pipe(w);
}

module.exports.decrypt = function(password, input, output, vector) {
  var decrypt;
  if (vector != undefined) {
    vector = hashify(password, vector).slice(0, 16);
    password = hashify(password, vector).slice(0, 32);
    decrypt = crypto.createDecipheriv(algorithm, password, vector);
  } else {
    decrypt = crypto.createDecipher(algorithm, password);
  }
  
  var r = fs.createReadStream(path.join(process.cwd(), input));
  var unzip = zlib.createGunzip();
  var w = fs.createWriteStream(path.join(process.cwd(), output));

  w.on('finish', () => {
    logMessage([input, 'decrypted to', output]);
  });
 
  r.pipe(decrypt).pipe(unzip).pipe(w);
}


