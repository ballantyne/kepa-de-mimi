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
      Mimi.encrypt("test", 'test/data/earth-secret.txt', 'test/data/earth-secret.txt.encrypted', 'v');
      setTimeout(function() {
        Mimi.decrypt("test", 'test/data/earth-secret.txt.encrypted', 'test/data/earth-secret.txt.result', 'v');
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
      Mimi.encrypt("test", 'test/data/sun-secret.txt', 'test/data/sun-secret.txt.encrypted', 'v');
      setTimeout(function() {
        Mimi.decrypt("test", 'test/data/sun-secret.txt.encrypted', 'test/data/sun-secret.txt.result', 'v');
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
      Mimi.encrypt("test", 'test/data/moon-secret.txt', 'test/data/moon-secret.txt.encrypted', 'v');
      setTimeout(function() {
        Mimi.decrypt("test", 'test/data/moon-secret.txt.encrypted', 'test/data/moon-secret.txt.result', 'v');
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
      Mimi.encrypt("test", 'test/data/earth-secret.txt', 'test/data/earth-secret.txt.encrypted');
      setTimeout(function() {
        Mimi.decrypt("test", 'test/data/earth-secret.txt.encrypted', 'test/data/earth-secret.txt.result');
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
      Mimi.encrypt("test", 'test/data/sun-secret.txt', 'test/data/sun-secret.txt.encrypted');
      setTimeout(function() {
        Mimi.decrypt("test", 'test/data/sun-secret.txt.encrypted', 'test/data/sun-secret.txt.result');
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
      Mimi.encrypt("test", 'test/data/moon-secret.txt', 'test/data/moon-secret.txt.encrypted');
      setTimeout(function() {
        Mimi.decrypt("test", 'test/data/moon-secret.txt.encrypted', 'test/data/moon-secret.txt.result');
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
