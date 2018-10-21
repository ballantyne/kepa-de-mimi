process.env.NODE_ENV = 'test';

var path = require('path');
var assert = require('assert');
var Mimi = require(path.join(__dirname, '..', 'index'));
var fs = require('fs');

var cleanup = [];

var readNewFile = function(fileName) {
  var filePath = path.join(__dirname, 'data', fileName);
  cleanup.push(filePath);
  return fs.readFileSync(filePath).toString();
}

describe('Mimi', function () {
  describe('Encryption/Decryption', function() {
    afterEach(function(done) {
      while (cleanup.length > 0) { 
        var file = cleanup.pop();
        fs.unlink(file, function() {});
      }
      done();
    });


    it('should encrypt and decrypt earth secret using vector', function (done) {
      Mimi.encrypt({
        input: 'test/data/earth-secret.txt', 
        output: 'test/data/earth-secret.txt.encrypted', 
        password: 'test', 
        vector: 'v'
      });
      setTimeout(function() {
        Mimi.decrypt({
          input: 'test/data/earth-secret.txt.encrypted', 
          output: 'test/data/earth-secret.txt.result', 
          password: 'test', 
          vector: 'v'
        });
        setTimeout(function() {
          var file = readNewFile('earth-secret.txt.result');
          var encryptedFile = readNewFile('earth-secret.txt.encrypted');
          var decryptedFile = fs.readFileSync(path.join(__dirname, 'data','earth-secret.txt.sample')).toString();

          assert.equal(file.toString(), decryptedFile.toString());
          assert.notEqual(encryptedFile, file);
          assert.notEqual(decryptedFile, encryptedFile);
          done();
        }, 10);
      }, 10);
    });

    it('should encrypt and decrypt sun secreti using vector', function (done) {
      Mimi.encrypt({
        input: 'test/data/sun-secret.txt', 
        output: 'test/data/sun-secret.txt.encrypted', 
        password: 'test', 
        vector: 'v'
      });
      setTimeout(function() {
        Mimi.decrypt({
          input: 'test/data/sun-secret.txt.encrypted', 
          output: 'test/data/sun-secret.txt.result', 
          password: 'test', 
          vector: 'v'
        });
        setTimeout(function() {
          var file = readNewFile('sun-secret.txt.result');
          var encryptedFile = readNewFile('sun-secret.txt.encrypted');
          var decryptedFile = fs.readFileSync(path.join(__dirname, 'data','sun-secret.txt.sample')).toString();
          assert.equal(file.toString(), decryptedFile.toString());
          assert.notEqual(encryptedFile, file);
          assert.notEqual(decryptedFile, encryptedFile);
          done();
        }, 10);
      }, 10);
    });

    it('should encrypt and decrypt moon secret using vector', function (done) {
      Mimi.encrypt({
        input: 'test/data/moon-secret.txt', 
        output: 'test/data/moon-secret.txt.encrypted', 
        password: 'test', 
        vector: 'v'
      });
      setTimeout(function() {
        Mimi.decrypt({
          input: 'test/data/moon-secret.txt.encrypted', 
          output: 'test/data/moon-secret.txt.result', 
          password: 'test', 
          vector: 'v'
        });
        setTimeout(function() {
          var file = readNewFile('moon-secret.txt.result');
          var encryptedFile = readNewFile('moon-secret.txt.encrypted');
          var decryptedFile = fs.readFileSync(path.join(__dirname, 'data','moon-secret.txt.sample')).toString();
          assert.equal(file.toString(), decryptedFile.toString());
          assert.notEqual(encryptedFile, file);
          assert.notEqual(decryptedFile, encryptedFile);
          done();
        }, 10);
      }, 10);
    });

    it('should encrypt and decrypt earth secret without vector', function (done) {
      Mimi.encrypt({
        input: 'test/data/earth-secret.txt', 
        output: 'test/data/earth-secret.txt.encrypted', 
        password: 'test'
      });
      setTimeout(function() {
        Mimi.decrypt({
          input: 'test/data/earth-secret.txt.encrypted', 
          output: 'test/data/earth-secret.txt.result', 
          password: 'test'
        });
        setTimeout(function() {
          var file = readNewFile('earth-secret.txt.result');
          var encryptedFile = readNewFile('earth-secret.txt.encrypted');
          var decryptedFile = fs.readFileSync(path.join(__dirname, 'data','earth-secret.txt.sample')).toString();
          assert.equal(file.toString(), decryptedFile.toString());
          assert.notEqual(encryptedFile, file);
          assert.notEqual(decryptedFile, encryptedFile);
          done();
        }, 10);
      }, 10);
    });

    it('should encrypt and decrypt sun secret without vector', function (done) {
      Mimi.encrypt({
        input: 'test/data/sun-secret.txt', 
        output: 'test/data/sun-secret.txt.encrypted', 
        password: 'test'
      });
      setTimeout(function() {
        Mimi.decrypt({
          input: 'test/data/sun-secret.txt.encrypted', 
          output: 'test/data/sun-secret.txt.result', 
          password: 'test'
        });
        setTimeout(function() {
          var file = readNewFile('sun-secret.txt.result');
          var encryptedFile = readNewFile('sun-secret.txt.encrypted');
          var decryptedFile = fs.readFileSync(path.join(__dirname, 'data','sun-secret.txt.sample')).toString();
          assert.equal(file.toString(), decryptedFile.toString());
          assert.notEqual(encryptedFile, file);
          assert.notEqual(decryptedFile, encryptedFile);
          done();
        }, 10);
      }, 10);
    });

    it('should encrypt and decrypt moon secret without vector', function (done) {
      Mimi.encrypt({
        input: 'test/data/moon-secret.txt', 
        output: 'test/data/moon-secret.txt.encrypted', 
        password: 'test'
      });
      setTimeout(function() {
        Mimi.decrypt({
          input: 'test/data/moon-secret.txt.encrypted', 
          output: 'test/data/moon-secret.txt.result', 
          password: 'test'
        });
        setTimeout(function() {
          var file = readNewFile('moon-secret.txt.result');
          var encryptedFile = readNewFile('moon-secret.txt.encrypted');
          var decryptedFile = fs.readFileSync(path.join(__dirname, 'data','moon-secret.txt.sample')).toString();
          assert.equal(file.toString(), decryptedFile.toString());
          assert.notEqual(encryptedFile, file);
          assert.notEqual(decryptedFile, encryptedFile);
          done();
        }, 10);
      }, 10);
    });
  });
});
