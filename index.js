var path = require('path');

module.exports.parser    = require(path.join(__dirname, 'lib', 'parser'));
module.exports.configure = require(path.join(__dirname, 'lib', 'configure'));
module.exports.encrypt   = require(path.join(__dirname, 'lib', 'encrypt'));
module.exports.decrypt   = require(path.join(__dirname, 'lib', 'decrypt'));
