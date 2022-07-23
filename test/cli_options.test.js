process.env.NODE_ENV = 'test';
process.env.NODE_NO_WARNINGS = '1';
var path      = require('path');
var assert    = require('assert');

var {
  readFile,
  readNewFile,
  sweep
} = require(path.join(__dirname, 'helpers'));

['common', 'single', 'ugly'].forEach((version) => {

  if (version == 'common') {
    var parser    = require(path.join(__dirname, '..', 'lib', 'parser'));
    var configure = require(path.join(__dirname, '..', 'lib', 'configure'));
  } else if (version == 'single'){
    var parser    = require(path.join(__dirname, '..', 'mimi')).parser;
    var configure = require(path.join(__dirname, '..', 'mimi')).configure;
  } else {
    var parser    = require(path.join(__dirname, '..', 'mimi.ugly')).parser;
    var configure = require(path.join(__dirname, '..', 'mimi.ugly')).configure;
  }

  describe(`Mimi (${version}) version`, function () {
    describe('Options', function() {
      describe('parse', function() {
	it('should set options.input with -i', function (done) {
	  var input   = path.join(__dirname, 'data', 'earth-secret.txt')
	  var options = parser.parse(['node', 'mimi', 'encrypt', '-i', input])

	  assert.equal(options.input, input);
	  done();
	})

	it('should set options.output with -o', function (done) {
	  var output  = path.join(__dirname, 'data', 'earth-secret.txt.mimi')
	  var input   = path.join(__dirname, 'data', 'earth-secret.txt')
	  var options = parser.parse(['node', 'mimi', 'encrypt', '-i', input, '-o', output])

	  assert.equal(options.output, output);
	  done();
	})

	it('should set options.password with -p', function (done) {
	  var options = parser.parse(['node', 'mimi', 'encrypt', '-p', 'password'])

	  assert.equal(options.password, 'password');
	  done();
	})

	it('should set options.vector with -v', function (done) {
	  var options = parser.parse(['node', 'mimi', 'encrypt', '-v', 'vector'])

	  assert.equal(options.vector, 'vector');
	  done();
	})
      });

      describe('configure', function() {
	it('should resolve the filepath to a full file path', function(done) {
	  var output  = path.join('test','data', 'earth-secret.txt.mimi')
	  var input   = path.join('test','data', 'earth-secret.txt')
	  var options = parser.parse(['node', 'mimi', 'encrypt', '-i', input, '-o', output])
	  options     = configure(options);

	  assert.notEqual(options.input, input)
	  assert.notEqual(options.output, output)
	  done();
	})

	it('should set the output as the input w/mimi extension', function(done) {
	  var input   = path.join('test','data', 'earth-secret.txt')
	  var options = parser.parse(['node', 'mimi', 'encrypt', '-i', input])
	  options     = configure(options);

	  assert.notEqual(options.input, input)
	  assert.equal(options.output, [options.input, 'mimi'].join('.'))
	  done();
	})

	it('should set the output as the input w/o mimi extension', function(done) {
	  var input   = path.join('test','data', 'earth-secret.txt.mimi')
	  var options = parser.parse(['node', 'mimi', 'encrypt', '-i', input])
	  options     = configure(options);
	  assert.notEqual(options.input, input)
	  assert.equal(options.output, options.input.replace('.mimi', ''))
	  done();
	})

	it('should set stdout as the output', function(done) {
	  var input   = path.join('test','data', 'earth-secret.txt')
	  var options = parser.parse(['node', 'mimi', 'encrypt', '-i', input, '--stdout'])
	  options     = configure(options);

	  assert.notEqual(options.input, input)
	  assert.equal(options.output, process.stdout)
	  done();
	})

	it('should set stdin as the input', function(done) {
	  var options = parser.parse(['node', 'mimi', 'encrypt'])
	  options     = configure(options);

	  assert.equal(options.input, process.stdin)
	  done();
	})

      })
    })
  })
})
