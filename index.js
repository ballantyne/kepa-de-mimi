var path = require('path'),
    crypto = require('crypto'),
    algorithm = 'aes-256-ctr';

var fs = require('fs');
var zlib = require('zlib');

module.exports.encrypt = function(password, input, vector) {
  var encrypt;
  if (vector != undefined) {
    encrypt = crypto.createCipheriv(algorithm, password, vector);
  } else {
    encrypt = crypto.createCipher(algorithm, password);
  }
  
  var r = fs.createReadStream(path.join(process.cwd(), input));
  var zip = zlib.createGzip();
  var output = [input, ".encrypted"].join('');
  var w = fs.createWriteStream(path.join(process.cwd(), output));
  r.pipe(zip).pipe(encrypt).pipe(w);
  console.log('-> creating', output);
}

module.exports.decrypt = function(password, input, vector) {
  var decrypt;
  if (vector != undefined) {
    decrypt = crypto.createDecipheriv(algorithm, password, vector);
  } else {
    decrypt = crypto.createDecipher(algorithm, password);
  }
  var r = fs.createReadStream(path.join(process.cwd(), input));
  var unzip = zlib.createGunzip();
  var output = input.replace('.encrypted', '');
  var w = fs.createWriteStream(path.join(process.cwd(), output));
  r.pipe(decrypt).pipe(unzip).pipe(w);
  console.log('-> creating', output);
}


