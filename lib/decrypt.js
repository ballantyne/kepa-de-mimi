var path = require('path');
var zlib = require('zlib');

var {
  applyDefaults,
  createReadable,
  createWriteable
} = require(path.join(__dirname, 'internal'));

var post     = require(path.join(__dirname, 'post'));
var decipher = require(path.join(__dirname, 'decipher'));

module.exports = function(options) {
  options      = applyDefaults(options);

  return new Promise((resolve, reject) => {
    var decipherer  = decipher(options);
    var readable  = createReadable(options.input);
    var writeable = createWriteable(options.output);
    var unzipper  = zlib.createGunzip();
    
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

