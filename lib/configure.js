var path = require('path');


module.exports = function(options) {
  if (options.input == undefined) {
    options.input = process.stdin;
  } else {
    options.input = path.resolve(options.input);
  }
  
  if (options.output == undefined) {
    if (options.stdout) {
      options.output = process.stdout;
    } else {
      if (typeof options.input == 'string') {
        if (options.input.indexOf(`.${options.extension}`) > -1) {
	  options.output = path.resolve(options.input.replace(`.${options.extension}`, ''));
	} else {
	  // the last version of this module didn't add the mimi automatically.  
	  // I figure if it is not set, then it should be added.  That is probably 
	  // a better default behavior.  If you disagree tell me how stupid 
	  // I am on twitter.
	  options.output = path.resolve([options.input, options.extension].join('.'));
	}
      }
    }
  } else {
    options.output = path.resolve(options.output);
  }

  return options;
}

