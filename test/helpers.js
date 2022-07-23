const path = require('path');

var assert = require('assert');
var Mimi = require(path.join(__dirname, '..', 'index'));
var fs = require('fs');
var {
  exec
} = require('child_process');

var cleanup = [];



var readFile = function(fileName) {
  var filePath = path.join(__dirname, 'data', fileName);
  return fs.readFileSync(filePath).toString();
}
module.exports.readFile = readFile;




var readNewFile = function(fileName) {
  var filePath = path.join(__dirname, 'data', fileName);
  cleanup.push(filePath);
  return fs.readFileSync(filePath).toString();
}
module.exports.readNewFile = readNewFile;




var sweep = function() {
  return new Promise((resolve, reject) => {
    while (cleanup.length > 0) { 
      var file = cleanup.pop();
      fs.unlink(file, function() {});
    }
    resolve();
  });
}
module.exports.sweep = sweep;




var execCommand = function(version, options) {
  var command = [process.execPath, getEntryPoint(version), options.command];

  var map = {
    input: '-i',
    output: '-o',
    vector: '-v',
    password: '-p'
  }

  command = Object.keys(options).reduce((command, key) => {
    if (map[key] != undefined) {
      command = command.concat([map[key], options[key]]);
    } else if (['backwards'].indexOf(key) > -1) {
      command = command.concat([(options[key] == true ? `--` : `--not-`)+key])
    } else if (['verbose'].indexOf(key) > -1) {
      command = command.concat([(options[key] == true ? `--` : `--not-`)+key])
    }
    return command
  }, command)

  if (options.verbose) {
    console.log('command: ', command.join(' '))
  }

  return new Promise((resolve, reject) => {
    exec(command.join(' '), {}, function(err, stdout, stderr) {
      if (options.verbose) {
	if (err != null) {
	  console.log('err:     ', err);
	}

	if (stdout.length > 0) {
	  console.log("stdout:\n", stdout);
	}

	if (stderr.length > 0) {
	  console.log("stderr:\n", stderr);
	}
      }

      if (err == null) {
	//console.log('resolved');
        resolve(stdout);
      } else {
        reject(err);
      }
    })
  });
}
module.exports.exec = execCommand;

var getEntryPoint = function(version) {
  if (version == 'common') {
    return path.join(__dirname, '..', 'bin', 'mimi.js');
  } else if (version == 'single') { 
    return path.join(__dirname, '..', 'mimi.js')
  } else if (version == 'ugly') {
    return path.join(__dirname, '..', 'mimi.ugly.js')
  }
}
module.exports.getEntryPoint = getEntryPoint;

var bashCommand = function(version, command, options={verbose: false}) {

  var map = {
    node: process.execPath,
    mimi: getEntryPoint(version)
  }

  command = Object.keys(options).reduce((command, string, index) => {
    if (map[string] != undefined) {
      command[index] = map[string];
    }
    return command
  }, command)

  if (options.verbose) {
    console.log('command: ', command.join(' '))
  }

  return new Promise((resolve, reject) => {
    exec(command.join(' '), {}, function(err, stdout, stderr) {
      if (options.verbose) {
	if (err != null) {
	  console.log('err:     ', err);
	}

	if (stdout.length > 0) {
	  console.log("stdout:\n", stdout);
	}

	if (stderr.length > 0) {
	  console.log("stderr:\n", stderr);
	}
      }

      if (err == null) {
        resolve(stdout);
      } else {
        reject(err);
      }
    })
  });
}
module.exports.bash = bashCommand;

