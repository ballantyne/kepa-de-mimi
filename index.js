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

var determineInputPath = function(filePath) {
  if (fs.existsSync(filePath)) {
    return filePath;
  } else if (fs.existsSync(path.join(process.cwd(), filePath))) {
    return path.join(process.cwd(), filePath);
  } else if (fs.existsSync(filePath)) {
    return filePath;
  } 
}

var ensureOutputPath = function(filePath) {
  if (filePath.indexOf('/') == -1 || filePath.indexOf("\\") == -1) {
    return path.join(process.cwd(), filePath);
  } else {
    return filePath;
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
  
  var readable = fs.createReadStream(determineInputPath(input));
  var zip = zlib.createGzip();
  var writeable = fs.createWriteStream(ensureOutputPath(output));
  
  writeable.on('finish', () => {
    logMessage([input, 'encrypted as', output]);
  });
  
  readable.pipe(zip).pipe(encrypt).pipe(writeable);
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
  
  var readable = fs.createReadStream(determineInputPath(input));
  var unzip = zlib.createGunzip();
  var writeable = fs.createWriteStream(ensureOutputPath(output));

  writeable.on('finish', () => {
    logMessage([input, 'decrypted to', output]);
  });
 
  readable.pipe(decrypt).pipe(unzip).pipe(writeable);
}


