var url = require('url');
var http = require('http');
var EventEmitter = require('events');

var StreamingPost = function(options) {
  var self = this;
  var opts = url.parse(options.url);
  opts.headers = {};
  opts.headers["host"] = opts.host;
  opts.headers["Connection"] = "close";
  opts.headers["Transfer-Encoding"] = "Chunked";
  opts.method = "POST";
  opts.agent = false;
  this.request = http.request(opts, function(serverResponse) {
    //console.log(serverResponse);
  });
  this.writable = true
  this.events = new EventEmitter();
}

StreamingPost.prototype.write = function(data) {
  this.request.write(data);
}

StreamingPost.prototype.end = function() {
  this.request.end();
}
StreamingPost.prototype.on = function(e, f) {
  this.events.on(e, f);
}
StreamingPost.prototype.emit = function(e, f) {
  this.events.emit(e, f);
}
StreamingPost.prototype.removeListener = function(e, l) {
  this.events.removeListener(e, l);
}

module.exports = StreamingPost;
