#!/usr/bin/env node

var path = require('path');
var fs = require('fs');
var crypto = require('crypto');
var zlib = require('zlib');
var os = require('os');
var http = require('http');
var https = require('https');
var events = require('events');
var url = require('url');


/*

 It seems like someone wanted this all to be in one file.  
 I prefer to use the modules because it is easier to test.  
 Not sure what is the best way to test two different versions 
 of the same code.  Don't people normally try to avoid having 
 two versions of the same code?  Make changes in the commonjs 
 version first and then make changes in this file?  
 Is that a reasonable rule?

*/



/* 
 lib/carrier_pigeon.js 
*/

/*
  Copyright 2022 Scott Ballantyne
  code originally from the carrier-pigeon module.
  https://www.npmjs.com/package/carrier-pigeon

  I added this code here so that the module could be installed without 
  any dependencies.  Try to get changes from that module rather than making 
  them in this module if possible.

  Permission is hereby granted, free of charge, to any person obtaining 
  a copy of this software and associated documentation files (the "Software"), 
  to deal in the Software without restriction, including without limitation 
  the rights to use, copy, modify, merge, publish, distribute, sublicense, 
  and/or sell copies of the Software, and to permit persons to whom the 
  Software is furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included 
  in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS 
  OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, 
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE 
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, 
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE 
  SOFTWARE.
*/

class CarrierPigeon {
  constructor(options = {}) {
    Object.assign(this, options);
    if (this.strict == undefined) {
      this.strict = false;
    }
    this.reset();
  }
  reset() {
    if (this.env == undefined) {
      this.env = true;
    }
    if (this.cmds == undefined) {
      this.cmds = [];
    }
    if (this.options == undefined) {
      this.options = {};
    }
    if (this.defaults == undefined) {
      this.defaults = {};
    }
    if (this.envMap == undefined) {
      this.envMap = {};
    }
    if (this.flags == undefined) {
      this.flags = {};
    }
  }
  cast(type, value) {
    switch (type) {
      case 'number':
	return Number(value);
      case 'file':
	return path.resolve(value);
      default:
	return value;
    }
  }
  determineType(name) {
    if (this.options[name].type != undefined) {
      this.options[name].type = this.options[name].type;
    }
    else if (this.options[name].default != undefined) {
      if (this.options[name].default instanceof Array) {
	this.options[name].type = 'array';
      }
      else {
	this.options[name].type = (typeof this.options[name].default);
      }
    }
    if (this.options[name].type == undefined) {
      this.options[name].type = 'string';
    }
  }
  command(cmd) {
    if (typeof cmd == 'string') {
      cmd = { name: cmd };
    }
    this.cmds.push(cmd);
  }
  commands(...cmds) {
    cmds = cmds.map((cmd) => {
      if (typeof cmd == 'string') {
	cmd = { name: cmd };
      }
      return cmd;
    });
    this.cmds = cmds;
  }
  dashedLine(length = 80) {
    return Array(length).join('-');
  }
  longest(list, name) {
    var length = 0;
    for (var i = 0; i < list.length; i++) {
      var command = list[i];
      if (length < list[i][name].length) {
	length = list[i][name].length;
      }
    }
    return length;
  }
  getColumnSizes(keys) {
    var widest = { type: 0, flags: 0, names: 0 };
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var type = (this.options[key].type == 'boolean' ? '' : `<${this.options[key].type}>`);
      var flags = this.options[key].flags.join(', ');
      if (widest.type < type.length) {
	widest.type = type.length;
      }
      if (widest.flags < flags.length) {
	widest.flags = flags.length;
      }
      if (widest.names < key.length) {
	widest.names = key.length;
      }
    }
    return widest;
  }
  usage() {
    var entries = [];
    var keys = Object.keys(this.options);
    if (this.cmds.length > 0) {
      entries.push(this.dashedLine(80));
      var widestName = this.longest(this.cmds, 'name');
      for (var i = 0; i < this.cmds.length; i++) {
	var command = this.cmds[i];
	var entry = [
	  '  ',
	  this.column({
	    string: this.cmds[i].name,
	    width: widestName + 15,
	    align: 'left'
	  })
	];
	if (this.cmds[i].description != undefined) {
	  entry.push(this.multilineColumn({
	    text: this.cmds[i].description,
	    width: 50 - widestName,
	    padding: widestName + 16
	  }));
	  if (this.cmds[i].description.length > 40) {
	    entry.push("\n");
	  }
	}
	entries.push(entry.join(''));
      }
      entries.push(this.dashedLine(80));
    }
    var widest = this.getColumnSizes(keys);
    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      var type = (this.options[key].type == 'boolean' ? '' : `<${this.options[key].type}>`);
      var flags = this.options[key].flags.join(', ');
      var padding = (widest.type + widest.flags + 9);
      entries.push([
	' ',
	this.column({
	  string: this.options[key].flags.join(', '),
	  width: widest.flags + 3,
	  align: 'left'
	}),
	this.column({
	  string: type,
	  width: widest.type + 3,
	  align: 'left'
	}),
	this.column({
	  string: key,
	  width: widest.names + 3,
	  align: 'left'
	}),
	this.multilineColumn({
	  text: this.options[key].description,
	  width: padding - 5,
	  padding: padding + 7
	})
      ].join(''));
    }
    return entries;
  }
  printUsage() {
    console.log(this.usage().join("\n"));
    console.log();
  }
  column(options) {
    var stringLen = options.string.length;
    var difference = options.width - stringLen;
    var padding = Array(difference).join(' ');
    if (options.align == 'left') {
      return [options.string, padding].join('');
    }
    else if (options.align == 'right') {
      return [padding, options.string].join('');
    }
  }
  multilineColumn(options) {
    var first = true;
    var words = options.text.split(' ');
    function addLine(collection, line, firstLine) {
      if (firstLine) {
	collection.text.push(line);
      }
      else {
	collection.text.push([Array(options.padding + 1).join(' '), line].join(''));
      }
      return collection;
    }
    return words.reduce((collection, word, index) => {
      var willBeLonger = (collection.line.join(" ").length + word.length + 1) > options.width;
      if (willBeLonger) {
	var line = collection.line.join(' ');
	collection.line = [word];
	collection = addLine(collection, line, first);
	first = false;
      }
      else {
	collection.line.push(word);
      }
      if (words.length == index + 1) {
	collection = addLine(collection, collection.line.join(' '), first);
      }
      return collection;
    }, { text: [], line: [] }).text.join("\n");
  }
  option(name, options = {}) {
    var self = this;
    options.variable = name;
    this.options[name] = options;
    this.determineType(name);
    if (options.default != undefined) {
      this.defaults[name] = options.default;
    }
    if (options.env != undefined) {
      this.envMap[name] = options.env;
    }
    if (options.flags != undefined) {
      options.flags.forEach((flag) => {
	self.flags[flag] = name;
      });
    }
    else {
      var initial = name.substring(0, 1);
      if (self.flags[`-${initial}`] == undefined) {
	self.flags[`-${initial}`] = name;
      }
      self.flags[`--${name}`] = name;
      self.options[name].flags = [`-${initial}`, `--${name}`];
    }
  }
  negators() {
    return [
      '--no-',
      '--not-'
    ];
  }
  negated(word) {
    return this.negators().map((neg) => {
      return [neg, word].join('');
    });
  }
  isNegated(word) {
    return this.negators().map((neg) => {
      return word.indexOf(neg) == -1;
    }).indexOf(false) > -1;
  }
  unnegate(word) {
    return this.negators().reduce((array, neg) => {
      if (word.indexOf(neg) > -1) {
	array.push(word.replace(neg, ''));
      }
      return array;
    }, [])[0];
  }
  deflag(flag) {
    if (/^--.+/.test(flag)) {
      if (this.strict || this.flags[flag] != undefined) {
	return this.flags[flag];
      }
      else {
	return flag.replace('--', '');
      }
    }
    else {
      return this.flags[flag];
    }
  }
  isFlag(input) {
    return /^-.+/.test(input);
  }
  isBoolean(flag) {
    if (this.existing(flag)) {
      return this.options[this.flag(flag)].type == 'boolean';
    }
    else {
      return false;
    }
  }
  flag(flag) {
    return this.flags[flag];
  }
  variable(flag) {
    return this.options[this.flags[flag]];
  }
  existing(flag) {
    return this.flags[flag] != undefined;
  }
  countFlags(instances, name) {
    if (instances[name] == undefined) {
      instances[name] = 0;
    }
    instances[name] = instances[name] + 1;
    return instances;
  }
  reflag(word) {
    return ['--', word].join('');
  }
  parse(argv = []) {
    var self = this;
    var index = 0;
    var options = JSON.parse(JSON.stringify(this.defaults));
    var mode = 'cull';
    var instances = {};
    var current;
    while (index <= argv.length - 1) {
      if (mode == 'cull') {
	if (self.isFlag(argv[index])) {
	  mode = 'interpret';
	}
	else if (self.cmds.map((cmd) => { return cmd.name; }).indexOf(argv[index]) > -1) {
	  options.command = argv[index];
	  argv.shift();
	}
	else {
	  argv.shift();
	}
      }
      if (mode == 'interpret') {
	current = argv[index];
	instances = self.countFlags(instances, current);
	if (self.isNegated(current) &&
	  (self.isBoolean(self.reflag(self.unnegate(current))) || self.strict == false)) {
	  options[self.unnegate(current)] = false;
	  current = undefined;
	}
	else if (self.isBoolean(current) ||
	  (self.strict == false && self.existing(current) == false)) {
	  options[self.deflag(current)] = true;
	}
	else if (self.existing(current)) {
	  index = index + 1;
	  var value = argv[index];
	  options = self.set(options, current, value, instances[current]);
	}
	index = index + 1;
      }
    }
    if (this.env) {
      this.forEnv(options);
    }
    return options;
  }
  isAnArray(options, flag) {
    return (options[this.flag(flag)] instanceof Array);
  }
  isntAnArray(options, flag) {
    return this.isAnArray(options, flag) == false;
  }
  currentIsDefault(count) {
    return (count == 1);
  }
  shouldBeArray(flag) {
    return this.variable(flag).type == 'array';
  }
  shouldConvertToArray(options, flag, count) {
    return (this.isntAnArray(options, flag) && count == 2);
  }
  set(options, flag, value, count) {
    var self = this;
    if (self.shouldBeArray(flag) ||
      (self.isAnArray(options, flag) && self.strict == false) ||
      (self.shouldConvertToArray(options, flag, count) && self.strict == false)) {
      if (self.shouldConvertToArray(options, flag, count)) {
	options[self.flag(flag)] = [options[self.flag(flag)]];
      }
      if (this.currentIsDefault(count) &&
	(this.shouldBeArray(flag) || this.isAnArray(options, flag))) {
	options[self.flag(flag)] = [];
      }
      options[self.flag(flag)].push(self.cast(this.variable(flag).type, value));
    }
    else {
      options[self.flag(flag)] = self.cast(this.variable(flag).type, value);
    }
    return options;
  }
  toEnv(json) {
    if (typeof json == 'string') {
      json = require(path.resolve(json));
    }
    Object.assign(process.env, json);
  }
  forEnv(gathered = {}) {
    var self = this;
    Object.keys(this.envMap).forEach((variable) => {
      if (gathered[variable] != undefined) {
	process.env[self.envMap[variable]] = gathered[variable];
      }
    });
  }
};




/*
 lib/post.js 
 */

var post = function(options) {
  var self = this;
  var opts = url.parse(options.url);
  var transport = (options.url.indexOf('https') > -1 ? https : http);
  opts.headers = {};
  opts.headers["host"] = opts.host;
  opts.headers["Connection"] = "close";
  opts.headers["Transfer-Encoding"] = "Chunked";
  opts.method = "POST";
  opts.agent = false;
  this.request = transport.request(opts, function(serverResponse) {
    //console.log(serverResponse);
  });
  this.writable = true
  this.events = new events();
}

post.prototype.write = function(data) {
  this.request.write(data);
}

post.prototype.end = function() {
  this.request.end();
}
post.prototype.on = function(e, f) {
  this.events.on(e, f);
}
post.prototype.emit = function(e, f) {
  this.events.emit(e, f);
}
post.prototype.removeListener = function(e, l) {
  this.events.removeListener(e, l);
}





/*
  lib/internal.js
  */

var createReadable = function(input) {
  if (typeof input == 'string') {
    return fs.createReadStream(determineInputPath(input));
  } else {
    return input;
  }
}



var createWriteable = function(output) {
  if (typeof output == 'string') {
    return fs.createWriteStream(ensureOutputPath(output));
  } else {
    return output;
  }
}

var ensureFile = function(file) {
  var stats = fs.statSync(file);
  return stats.isFile()
}

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

var hashify = function(algo='sha256', password, vector) {
  return crypto.createHmac(algo, password)
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
  if ((filePath.indexOf('/') != -1 || filePath.indexOf("\\") != -1) && 
    (filePath.indexOf('/') != 0  && filePath.indexOf("\\") != 0)) {

    return path.join(process.cwd(), filePath);
  } else if (filePath.indexOf('~') == 0) {
    return insideHomeDirectory(filePath);
  } else {
    return filePath;
  }
}





/*
  lib/configure.js
  */

var configure = function(options) {
  if (options.input == undefined) {
    options.input = process.stdin;
  } else {
    options.input = path.resolve(options.input);
  }

  if (options.output == undefined) {
    if (options.stdout) {
      options.output = process.stdout;
    } else {
      if (typeof options.input == 'string') {
	if (options.input.indexOf(`.${options.extension}`) > -1) {
	  options.output = path.resolve(options.input.replace(`.${options.extension}`, ''));
	} else {
	  // the last version of this module didn't add the mimi automatically.  
	  // I figure if it is not set, then it should be added.  That is probably 
	  // a better default behavior.  If you disagree tell me how stupid 
	  // I am on twitter.
	  options.output = path.resolve([options.input, options.extension].join('.'));
	}
      }
    }
  } else {
    options.output = path.resolve(options.output);
  }

  return options;
}





/*
  lib/cipher.js
  */

var cipher = function(options={}) {
  if (options.backwards) {

    if (options.vector != undefined) {
      options.vector   = hashify(options.algorithm, options.password, options.vector).slice(0, 16);
      options.password = hashify(options.algorithm, options.password, options.vector).slice(0, 32);
      return crypto.createCipheriv(options.cipher, options.password, options.vector);
    } else {
      return crypto.createCipher(options.cipher, options.password);
    }
  } else {

    options.vector   = hashify(options.algorithm, options.password, options.vector).slice(0, 16);
    options.password = hashify(options.algorithm, options.password, options.vector).slice(0, 32);
    return crypto.createCipheriv(options.cipher, options.password, options.vector);
  }
}





/*
 lib/decipher.js
 */

var decipher = function(options={}) {
  if (options.backwards) {
    if (options.vector != undefined) {
      options.vector   = hashify(options.algorithm,  options.password, options.vector).slice(0, 16);
      options.password = hashify(options.algorithm,  options.password, options.vector).slice(0, 32);
      return crypto.createDecipheriv(options.cipher, options.password, options.vector);
    } else {
      return crypto.createDecipher(options.cipher, options.password);
    }
  } else {
    options.vector   = hashify(options.algorithm,  options.password, options.vector).slice(0, 16);
    options.password = hashify(options.algorithm,  options.password, options.vector).slice(0, 32);
    return crypto.createDecipheriv(options.cipher, options.password, options.vector);
  }
}





/*
 lib/decrypt.js
 */

var decrypt = function(options) {
  options      = applyDefaults(options);

  return new Promise((resolve, reject) => {
    var decipherer = decipher(options);
    var readable   = createReadable(options.input);
    var writeable  = createWriteable(options.output);
    var unzipper   = zlib.createGunzip();

    readable.pipe(decipherer).pipe(unzipper);

    if (typeof options.output == 'string') {
      unzipper.pipe(writeable);
    }

    if (options.stdout) {
      unzipper.pipe(process.stdout);
    }

    if (options.url != undefined) {
      var upload = new post({url: options.url});
      unzipper.pipe(upload);
    } 

    unzipper.on('end', function() {
      if (options.promise) {
	resolve();
      }
    })

    if (options.stream) {
      resolve(unzipper);
    }
  })

}





/* 
 lib/encrypt.js
 */

var encrypt = function(options) {
  options      = applyDefaults(options);

  return new Promise((resolve, reject) => {
    var cipherer    = cipher(options);
    var readable  = createReadable(options.input);
    var writeable = createWriteable(options.output);
    var zipper    = zlib.createGzip();

    if (typeof options.output == 'string') {
      cipherer.pipe(writeable);
    }

    if (options.stdout) {
      cipherer.pipe(process.stdout);
    }

    if (options.url != undefined) {
      var upload = new post({url: options.url});
      cipherer.pipe(upload);
    } 

    cipherer.on('end', function() {
      if (options.promise) {
	resolve();
      }
    })

    readable.pipe(zipper).pipe(cipherer);

    if (options.stream) {
      resolve(cipherer);
    }
  })
}





/*
 lib/parse.js
 */


var parser = new CarrierPigeon({strict: true});

parser.commands({
  name: 'encrypt', description:'encrypt files'
}, {
  name: 'decrypt', description: 'decrypt files'
});

parser.option('input',     { type: 'file', description: 'Input File'});
parser.option('output',    { type: 'file', description: 'Output File' });
parser.option('url',       { type: 'string', description: 'Upload Url' });
parser.option('password',  { type: 'string', description: 'Password' });
parser.option('vector',    { type: 'string', description: 'Vector (IV)' });
parser.option('backwards', { default: false, description: 'Backwards Compatible' });
parser.option('cipher',    { type: 'string', default: 'aes-256-ctr', description: 'Choose which cipher to use.  (aes-256-ctr)' });
parser.option('algorithm', { type: 'string', default: 'sha256', description: 'Select the hashing algorithm (sha256)'});
parser.option('stdout',    { type: 'boolean', flags: ['-O', "--stdout"], description: "Print to stdout" });
parser.option('extension', { default: 'mimi', flags: ['-e', '--ext', '--extension'], description: 'File Extension (.mimi)' });
parser.option('stream',    { default: false, description: 'Function returns a stream instead of a promise' });
parser.option('verbose',   { default: false, flags: ['-vv', '--verbose'], description: "Print Logs Verbosely"  });
parser.option('help',      { type: 'boolean', default: false, description: 'Print Usage'});





if (require.main === module) {
  /* 
    bin/mimi.js
    */

  var options = configure(parser.parse(process.argv));

  if (options.help) {
    parser.printUsage();
  } else {
    if (options.command == 'encrypt') {
      encrypt(options).then(() => {
	process.nextTick(() => {
	  process.exit(0);
	})
      });
    }

    if (options.command == 'decrypt') {
      decrypt(options).then(() => {
	process.nextTick(() => {
	  process.exit(0);
	})
      });
    }
  }
} else {

  /*
    module.exports for testing to maintain consistency between the two versions.
    */

  module.exports = {
    index: {
      encrypt:   encrypt,
      decrypt:   decrypt,
      parser:     parser,
      configure: configure
    },
    carrier_pigeon: CarrierPigeon,
    cipher:    cipher,
    configure: configure,
    decipher:  decipher,
    decrypt:   decrypt,
    encrypt:   encrypt,
    internal: {
      createReadable:      createReadable,
      createWriteable:     createWriteable,
      ensureFile:          ensureFile,
      applyDefaults:       applyDefaults,
      hashify:             hashify,
      logMessage:          logMessage,
      insideHomeDirectory: insideHomeDirectory,
      determineInputPath:  determineInputPath,
      ensureOutputPath:    ensureOutputPath
    },
    parser: parser,
    post:  post
  }

}
