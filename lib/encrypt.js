var path = require('path');
var zlib = require('zlib');

var {
  applyDefaults,
  createReadable,
  createWriteable
} = require(path.join(__dirname, 'internal'));

var post   = require(path.join(__dirname, 'post'));
var cipher = require(path.join(__dirname, 'cipher'));

module.exports = function(options) {
  options      = applyDefaults(options);

  return new Promise((resolve, reject) => {
    var cipherer  = cipher(options);
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
      var upload = new Post({url: options.url});
      cipherer.pipe(upload);
    } 
  
    cipherer.on('end', function() {
      if (options.promise) {
        resolve();
      }
    })

    readable.pipe(zipper).pipe(cipherer)

    if (options.stream) {
      resolve(cipherer);
    }
  })
}

