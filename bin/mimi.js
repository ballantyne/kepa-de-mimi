#!/usr/bin/env node
 
/**
 * Module dependencies.
 */

const path = require('path');
var Mimi = require(path.join(__dirname, '..', 'index'));
var program = require('commander');
 
program
  .version('0.1.0')
  .option('-i, --input <input>', 'Input File')
  .option('-p, --password <password>', 'Password')
  .option('-v, --vector <vector>', 'Initialization Vector')
  .parse(process.argv);

if (program.args[0] == 'encrypt') {
  Mimi.encrypt(program.password, program.input, program.vector);
}

if (program.args[0] == 'decrypt') {
  Mimi.decrypt(program.password, program.input, program.vector);
}
