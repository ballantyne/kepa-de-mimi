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
  .option('-o, --output <output>', 'Output File')
  .option('-p, --password <password>', 'Password')
  .option('-v, --vector <vector>', 'Initialization Vector')
  .parse(process.argv);

var output;

if (program.args[0] == 'encrypt') {
  if (program.output == undefined) {
    output = [program.input, '.encrypted'].join('');
  } else {
    output = program.output;
  }
  Mimi.encrypt(program.password, program.input, output, program.vector);
}

if (program.args[0] == 'decrypt') {
  if (program.output == undefined) {
    output = program.input.replace('.encrypted', '');
  } else {
    output = program.output;
  }
  Mimi.decrypt(program.password, program.input, output, program.vector);
}
