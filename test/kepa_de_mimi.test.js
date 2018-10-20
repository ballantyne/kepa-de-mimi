process.env.NODE_ENV = 'test';

var path = require('path');
var assert = require('assert');
var Mimi = require(path.join(__dirname, '..', 'index'));
var fs = require('fs');

describe('Mimi', function () {
  describe('Encryption', function() {
    it('should encrypt and decrypt earth secret', function (done) {
      Mimi.encrypt("test", 'test/data/earth-secret.txt', 'test/data/earth-secret.txt.encrypted', 'v');
      setTimeout(function() {
        Mimi.decrypt("test", 'test/data/earth-secret.txt.encrypted', 'test/data/earth-secret.txt.result', 'v');
        setTimeout(function() {
          var file = fs.readFileSync(path.join(__dirname, 'data','earth-secret.txt.result')).toString();
          var encryptedFile = fs.readFileSync(path.join(__dirname, 'data','earth-secret.txt.encrypted')).toString();
          var decryptedFile = fs.readFileSync(path.join(__dirname, 'data','earth-secret.txt.sample')).toString();
          assert.equal(file.toString(), decryptedFile.toString());
          assert.notEqual(encryptedFile, file);
          assert.notEqual(decryptedFile, encryptedFile);
          done();
        }, 10);
      }, 10);
    });

    it('should encrypt and decrypt sun secret', function (done) {
      Mimi.encrypt("test", 'test/data/sun-secret.txt', 'test/data/sun-secret.txt.encrypted', 'v');
      setTimeout(function() {
        Mimi.decrypt("test", 'test/data/sun-secret.txt.encrypted', 'test/data/sun-secret.txt.result', 'v');
        setTimeout(function() {
          var file = fs.readFileSync(path.join(__dirname, 'data','sun-secret.txt.result')).toString();
          var encryptedFile = fs.readFileSync(path.join(__dirname, 'data','sun-secret.txt.encrypted')).toString();
          var decryptedFile = fs.readFileSync(path.join(__dirname, 'data','sun-secret.txt.sample')).toString();
          assert.equal(file.toString(), decryptedFile.toString());
          assert.notEqual(encryptedFile, file);
          assert.notEqual(decryptedFile, encryptedFile);
          done();
        }, 10);
      }, 10);
    });

    it('should encrypt and decrypt moon secret', function (done) {
      Mimi.encrypt("test", 'test/data/moon-secret.txt', 'test/data/moon-secret.txt.encrypted', 'v');
      setTimeout(function() {
        Mimi.decrypt("test", 'test/data/moon-secret.txt.encrypted', 'test/data/moon-secret.txt.result', 'v');
        setTimeout(function() {
          var file = fs.readFileSync(path.join(__dirname, 'data','moon-secret.txt.result')).toString();
          var encryptedFile = fs.readFileSync(path.join(__dirname, 'data','moon-secret.txt.encrypted')).toString();
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
