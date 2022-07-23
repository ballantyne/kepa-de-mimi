var url = require('url');
var http = require('http');
var events = require('events');


var post = function(options) {
  var self = this;
  var opts = url.parse(options.url);
  var transport = (options.url.indexOf('https') > -1 ? https : http);
  opts.headers  = {};
  opts.headers["host"] = opts.host;
  opts.headers["Connection"] = "close";
  opts.headers["Transfer-Encoding"] = "Chunked";
  opts.method   = "POST";
  opts.agent    = false;
  this.request  = transport.request(opts, function(serverResponse) {
    //console.log(serverResponse);
  });
  this.writable = true
  this.events = new events();
}

post.prototype.write = function(data) {
  this.request.write(data);
}

post.prototype.end = function() {
  this.request.end();
}
post.prototype.on = function(e, f) {
  this.events.on(e, f);
}
post.prototype.emit = function(e, f) {
  this.events.emit(e, f);
}
post.prototype.removeListener = function(e, l) {
  this.events.removeListener(e, l);
}

module.exports = post;
