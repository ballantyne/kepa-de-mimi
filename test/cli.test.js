process.env.NODE_ENV = 'test';
process.env.NODE_NO_WARNINGS = '1';

var path   = require('path');
var assert = require('assert');
var {
  readFile,
  readNewFile,
  sweep,
  exec
} = require(path.join(__dirname, 'helpers'));


['common', 'single', 'ugly'].forEach((version) => {
  process.env.MODULE_VERSION = version;

  if (version == 'common') {
    var Mimi = require(path.join(__dirname, '..', 'index'));
  } else if (version == 'single') {
    var Mimi = require(path.join(__dirname, '..', 'mimi')).index;
  } else {
    var Mimi = require(path.join(__dirname, '..', 'mimi.ugly')).index;
  }

  describe(`Mimi (${version}) version`, function () {
    describe('Command Line Interface', function() {
      afterEach(function(done) {
	sweep().then(done)
      });

      it('should encrypt and decrypt earth secret using vector', function (done) {
	exec(version, {
	  command: 'encrypt',
	  input: 'test/data/earth-secret.txt', 
	  output: 'test/data/earth-secret.txt.encrypted', 
	  password: 'test', 
	  vector: 'v',
	  verbose: false
	}).then(() => {
	  exec(version, {
	    command: 'decrypt',
	    input: 'test/data/earth-secret.txt.encrypted', 
	    output: 'test/data/earth-secret.txt.result', 
	    password: 'test', 
	    vector: 'v',
	    verbose: false
	  }).then(() => {
	    var file          = readNewFile('earth-secret.txt.result');
	    var encryptedFile = readNewFile('earth-secret.txt.encrypted');
	    var decryptedFile = readFile('earth-secret.txt.sample');

	    assert.equal(file.toString(), decryptedFile.toString());
	    assert.notEqual(encryptedFile, file);
	    assert.notEqual(decryptedFile, encryptedFile);
	    done();
	  }).catch((error) => {console.log('decrypt error',error)});	
	}).catch((error) => {console.log('encrypt error',error)})
      });

      it('should encrypt and decrypt sun secret using vector', function (done) {
	exec(version, {
	  command: 'encrypt',
	  input: 'test/data/sun-secret.txt', 
	  output: 'test/data/sun-secret.txt.encrypted', 
	  password: 'test', 
	  vector: 'v'
	}).then(() => {
	  exec(version, {
	    command: 'decrypt',
	    input: 'test/data/sun-secret.txt.encrypted', 
	    output: 'test/data/sun-secret.txt.result', 
	    password: 'test', 
	    vector: 'v'
	  }).then(() => {
	    var file = readNewFile('sun-secret.txt.result');
	    var encryptedFile = readNewFile('sun-secret.txt.encrypted');
	    var decryptedFile = readFile('sun-secret.txt.sample');
	    assert.equal(file.toString(), decryptedFile.toString());
	    assert.notEqual(encryptedFile, file);
	    assert.notEqual(decryptedFile, encryptedFile);
	    done();
	  })
	})
      });

      it('should encrypt and decrypt moon secret using vector', function (done) {
	exec(version, {
	  command: 'encrypt',
	  input: 'test/data/moon-secret.txt', 
	  output: 'test/data/moon-secret.txt.encrypted', 
	  password: 'test', 
	  vector: 'v'
	}).then(() => {
	  exec(version, {
	    command: 'decrypt',
	    input: 'test/data/moon-secret.txt.encrypted', 
	    output: 'test/data/moon-secret.txt.result', 
	    password: 'test', 
	    vector: 'v'
	  }).then(() => {
	    var file = readNewFile('moon-secret.txt.result');
	    var encryptedFile = readNewFile('moon-secret.txt.encrypted');
	    var decryptedFile = readFile('moon-secret.txt.sample');
	    assert.equal(file.toString(), decryptedFile.toString());
	    assert.notEqual(encryptedFile, file);
	    assert.notEqual(decryptedFile, encryptedFile);
	    done();
	  });
	});
      });

      it('should encrypt and decrypt earth secret without vector', function (done) {
	exec(version, {
	  command: 'encrypt',
	  input: 'test/data/earth-secret.txt', 
	  output: 'test/data/earth-secret.txt.encrypted', 
	  password: 'test',
	  backwards: true
	}).then(() => {
	  exec(version, {
	    command: 'decrypt',
	    input: 'test/data/earth-secret.txt.encrypted', 
	    output: 'test/data/earth-secret.txt.result', 
	    password: 'test',
	    backwards: true
	  }).then(() => {
	    var file = readNewFile('earth-secret.txt.result');
	    var encryptedFile = readNewFile('earth-secret.txt.encrypted');
	    var decryptedFile = readFile('earth-secret.txt.sample');
	    assert.equal(file.toString(), decryptedFile.toString());
	    assert.notEqual(encryptedFile, file);
	    assert.notEqual(decryptedFile, encryptedFile);
	    done();
	  });
	});
      });

      it('should encrypt and decrypt sun secret without vector', function (done) {
	exec(version, {
	  command: 'encrypt',
	  input: 'test/data/sun-secret.txt', 
	  output: 'test/data/sun-secret.txt.encrypted', 
	  password: 'test',
	  backwards: true
	}).then(() => {
	  exec(version, {
	    command: 'decrypt',
	    input: 'test/data/sun-secret.txt.encrypted', 
	    output: 'test/data/sun-secret.txt.result', 
	    password: 'test',
	    backwards: true
	  }).then(() => {
	    var file = readNewFile('sun-secret.txt.result');
	    var encryptedFile = readNewFile('sun-secret.txt.encrypted');
	    var decryptedFile = readFile('sun-secret.txt.sample');
	    assert.equal(file.toString(), decryptedFile.toString());
	    assert.notEqual(encryptedFile, file);
	    assert.notEqual(decryptedFile, encryptedFile);
	    done();
	  });
	});
      });

      it('should encrypt and decrypt moon secret without vector', function (done) {
	exec(version, {
	  command: 'encrypt',
	  input: 'test/data/moon-secret.txt', 
	  output: 'test/data/moon-secret.txt.encrypted', 
	  password: 'test',
	  backwards: true,
	  verbose: false
	}).then(() => {
	  exec(version, {
	    command: 'decrypt',
	    input: 'test/data/moon-secret.txt.encrypted', 
	    output: 'test/data/moon-secret.txt.result', 
	    password: 'test',
	    backwards: true,
	    verbose:false 
	  }).then(() => {
	    var file = readNewFile('moon-secret.txt.result');
	    var encryptedFile = readNewFile('moon-secret.txt.encrypted');
	    var decryptedFile = readFile('moon-secret.txt.sample');
	    assert.equal(file.toString(), decryptedFile.toString());
	    assert.notEqual(encryptedFile, file);
	    assert.notEqual(decryptedFile, encryptedFile);
	    done();
	  });
	});
      });
    });
  });
})
