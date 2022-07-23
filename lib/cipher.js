var path   = require('path');
var crypto = require('crypto');

var {
  hashify,
} = require(path.join(__dirname, 'internal'));

   
// Refactor this so that more algorithms and ciphers or whatever work.  
// Also make it backwards compatible?

module.exports = function(options={}) {
  if (options.backwards) {
    
    // This is the old code.  Backwards stands for backwards compatibility.

    if (options.vector != undefined) {
      options.vector   = hashify(options.algorithm, options.password, options.vector).slice(0, 16);
      options.password = hashify(options.algorithm, options.password, options.vector).slice(0, 32);
      return crypto.createCipheriv(options.cipher, options.password, options.vector);
    } else {
      return crypto.createCipher(options.cipher, options.password);
    }
  } else {

    // This is where the new code goes, currently it is just 
    // the part of the code above that is not deprecated.

    // This code is not finished. Because it might change, it 
    // also might not encrypt and decrypt the same way and it 
    // might not be possible to recover your files if you don't 
    // have the version of the module that you used to encrypt 
    // and decrypt.  

    options.vector   = hashify(options.algorithm, options.password, options.vector).slice(0, 16);
    options.password = hashify(options.algorithm, options.password, options.vector).slice(0, 32);
    return crypto.createCipheriv(options.cipher, options.password, options.vector);
  }
}

