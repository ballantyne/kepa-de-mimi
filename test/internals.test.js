process.env.NODE_ENV = 'test';
process.env.NODE_NO_WARNINGS = '1';

var path   = require('path');
var assert = require('assert');

var {
  hashify
} = require(path.join(__dirname, '..', 'lib', 'internal'));

var {
  readFile,
  readNewFile,
  sweep
} = require(path.join(__dirname, 'helpers'));

describe('Mimi', function () {
  describe('Internals', function() {
    describe('hashify', function() {
      it('should encrypt and decrypt earth secret using vector', function (done) {
	
	done();
      })
    });
  })
})
