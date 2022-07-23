var path               = require('path');
var os                 = require('os');
var crypto             = require('crypto');
var fs                 = require('fs');
//var cipher           = 'aes-256-gcm';



var createReadable = function(input) {
  if (typeof input == 'string') {
    return fs.createReadStream(determineInputPath(input));
  } else {
    return input;
  }
}
module.exports.createReadable = createReadable;



var createWriteable = function(output) {
  if (typeof output == 'string') {
    return fs.createWriteStream(ensureOutputPath(output));
  } else {
    return output;
  }
}
module.exports.createWriteable = createWriteable;



var ensureFile = function(file) {
  var stats = fs.statSync(file);
  return stats.isFile()
}
module.exports.ensureFile = ensureFile;



var applyDefaults = function(options) {
  var defaults = { 
    algorithm: 'sha256', 
    cipher:'aes-256-ctr',
    stream: false
  };

  if (options.stream == undefined) {
    options.stream = defaults.stream;
  }

  options.promise = (options.stream ? false : true);

  if (options.algorithm == undefined) {
    options.algorithm = defaults.algorithm;
  }

  if (options.cipher == undefined) {
    options.cipher = defaults.cipher;
  }

  if (options.verbose) {
    console.log('configuration:')
    console.log(options);
  }

  return options;
}
module.exports.applyDefaults = applyDefaults;



var hashify = function(algo='sha256', password, vector) {
  return crypto.createHmac(algo, password)
    .update(vector)
    .digest('hex');
}
module.exports.hashify = hashify;



var logMessage = function(message) {
  if (process.env.NODE_ENV != 'test') {
    if (typeof message == 'string') {
      console.log(message);
    }  else {
      console.log(message.join(' '));
    }
  }
}
module.exports.logMessage = logMessage;




var insideHomeDirectory = function(filePath) {
  return path.join(os.homedir(), filePath.slice(1, filePath.length));
}
module.exports.insideHomeDirectory = insideHomeDirectory;




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
module.exports.determineInputPath = determineInputPath;  




var ensureOutputPath = function(filePath) {
  if ((filePath.indexOf('/') != -1 || filePath.indexOf("\\") != -1) && 
      (filePath.indexOf('/') != 0  && filePath.indexOf("\\") != 0)) {

    return path.join(process.cwd(), filePath);
  } else if (filePath.indexOf('~') == 0) {
    return insideHomeDirectory(filePath);
  } else {
    return filePath;
  }
}
module.exports.ensureOutputPath = ensureOutputPath;

