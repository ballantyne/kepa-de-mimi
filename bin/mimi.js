#!/usr/bin/env node

process.env.NODE_NO_WARNINGS = '1';

const path  = require('path');
var Mimi    = require(path.join(__dirname, '..', 'index'));

var options = Mimi.parser.parse(process.argv);
options     = Mimi.configure(options);


if (options.help) {
  Mimi.parser.printUsage();
} else {

  if (options.command == 'encrypt') {
    Mimi.encrypt(options).then(() => {
      process.nextTick(() => {
	process.exit(0);
      })
    }).catch((error) => {
      console.log(error)
      process.nextTick(() => {
	process.exit(1);
      })
    });
  }
  if (options.command == 'decrypt') {
    Mimi.decrypt(options).then(() => {
      process.nextTick(() => {
	process.exit(0);
      })
    }).catch((error) => {
      console.log(error)
      process.nextTick(() => {
	process.exit(1);
      })
      process.exit(1);
    });
  }
}
