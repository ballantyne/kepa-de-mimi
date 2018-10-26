var path               = require('path'),
    os                 = require('os'),
    crypto             = require('crypto'),
    algorithm          = 'sha256',
    cipher             = 'aes-256-ctr';

var fs                 = require('fs');
var zlib               = require('zlib');
var through            = require('through');
var StreamingPost      = require(path.join(__dirname, 'lib', 'streaming_post'));

var hashify            = function(algo, password, vector) {
  return crypto.createHmac('sha256', password)
    .update(vector)
    .digest('hex');
}

var logMessage         = function(message) {
  if (process.env.NODE_ENV != 'test') {
    if (typeof message == 'string') {
      console.log(message);
    }  else {
      console.log(message.join(' '));
    }
  }
}

var insideHomeDirectory = function(filePath) {
  return path.join(os.homedir(), filePath.slice(1, filePath.length));
}

var determineInputPath = function(filePath) {
  if (fs.existsSync(filePath)) {
    return filePath;
  } else if (fs.existsSync(path.join(process.cwd(), filePath))) {
    return path.join(process.cwd(), filePath);
  } else if (fs.existsSync(filePath)) {
    return filePath;
  } else if (filePath.indexOf('~') == 0) {
    return insideHomeDirectory(filePath);
  } 
}

var ensureOutputPath   = function(filePath) {
  if ((filePath.indexOf('/') != -1 || filePath.indexOf("\\") != -1) && (filePath.indexOf('/') != 0 && filePath.indexOf("\\") != 0)) {
    return path.join(process.cwd(), filePath);
  } else if (filePath.indexOf('~') == 0) {
    return insideHomeDirectory(filePath);
  } else {
    return filePath;
  }
}



module.exports.encrypt = function(options) {
  var encrypt, readable, writeable;
  var zip = zlib.createGzip();
  
  var stream = new through(function(data){
    this.queue(data);
  });
  
  if (options.algorithm == undefined) {
    options.algorithm = algorithm;
  }

  if (options.cipher == undefined) {
    options.cipher = cipher;
  }

  if (options.vector != undefined) {
    options.vector = hashify(options.algorithm, options.password, options.vector).slice(0, 16);
    options.password = hashify(options.algorithm, options.password, options.vector).slice(0, 32);
    encrypt = crypto.createCipheriv(options.cipher, options.password, options.vector);
  } else {
    encrypt = crypto.createCipher(options.cipher, options.password);
  }
  
  if (typeof options.input == 'string') {
    var readable = fs.createReadStream(determineInputPath(options.input));
  } else {
    var readable = options.input;
  }

  readable.on('end', function() {
    //stream.end()
  });

  if (typeof options.output == 'string') {
    writeable = fs.createWriteStream(ensureOutputPath(options.output));
  } else {
    writeable = options.output;
  } 
 
  readable.pipe(zip).pipe(encrypt).pipe(stream);
  
  if (typeof options.output == 'string') {
    stream.pipe(writeable);
  }
  
  if (options.stdout) {
    stream.pipe(process.stdout);
  }

  if (options.url != undefined) {
    var upload = new StreamingPost({url: options.url});
    stream.pipe(upload);
  } 
  return stream;
}

module.exports.decrypt = function(options) {
  var decrypt, readable, writeable;
  var unzip = zlib.createGunzip();
  
  var stream = new through(function(data){
    this.queue(data);
  });
  
  if (options.algorithm == undefined) {
    options.algorithm = algorithm;
  }
  
  if (options.cipher == undefined) {
    options.cipher = cipher;
  }
  
  if (options.vector != undefined) {
    options.vector = hashify(options.algorithm, options.password, options.vector).slice(0, 16);
    options.password = hashify(options.algorithm, options.password, options.vector).slice(0, 32);
    decrypt = crypto.createDecipheriv(options.cipher, options.password, options.vector);
  } else {
    decrypt = crypto.createDecipher(options.cipher, options.password);
  }
  
  if (typeof options.input == 'string') {
    readable = fs.createReadStream(determineInputPath(options.input));
  } else {
    readable = options.input;
  } 
  
  readable.on('end', function() {
    //stream.end()
  });

  
  if (typeof options.output == 'string') {
    writeable = fs.createWriteStream(ensureOutputPath(options.output));
  } else {
    writeable = options.output;
  } 

  readable.pipe(decrypt).pipe(unzip).pipe(stream);
  
  if (typeof options.output == 'string') {
    stream.pipe(writeable);
  }
  
  if (options.stdout) {
    stream.pipe(process.stdout);
  }


  if (options.url != undefined) {
    var upload = new StreamingPost({url: options.url});
    stream.pipe(upload);
  } 
  return stream;
}
