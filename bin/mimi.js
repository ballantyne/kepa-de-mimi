#!/usr/bin/env node
 
/**
 * Module dependencies.
 */

const path = require('path');
var Mimi = require(path.join(__dirname, '..', 'index'));
var program = require('commander');

process.env.NODE_NO_WARNINGS = '1';

program
  .version('0.1.0')
  .usage('command [options]')
  .option('-i, --input <input>', 'Input File')
  .option('-o, --output <output>', 'Output File')
  .option('-u, --url <url>', 'URL')
  .option('-p, --password <password>', 'Password')
  .option('-v, --vector <vector>', 'Initialization Vector')
  .option('-a, --algorithm <algorithm>', 'Algorithm')
  .option('-O, --stdout', 'Pipe to Standard Output')
  .parse(process.argv);

var output, input;

if (program.args[0] == 'encrypt') {
  if (program.input == undefined) {
    input = process.stdin;
  } else {
    input = program.input;
  }
  
  if (program.output == undefined) {
    if (program.stdout) {
      output = process.stdout;
    } else {
      output = [program.input, '.mimi'].join('');
    }
  } else {
    output = program.output;
  }
  
  Mimi.encrypt({
    input: input, 
    output: output, 
    password: program.password, 
    vector: program.vector, 
    stdout: program.stdout,
    url: program.url
  });
}

if (program.args[0] == 'decrypt') {
  
  if (program.input == undefined) {
    input = process.stdin;
  } else {
    input = program.input;
  }
  
  if (program.output == undefined) {
    if (program.stdout) {
      output = process.stdout;
    } else {
      output = program.input.replace('.mimi', '');
    }
  } else {
    output = program.output;
  }
  
  Mimi.decrypt({
    input: input, 
    output: output, 
    password: program.password, 
    vector: program.vector, 
    stdout: program.stdout,
    url: program.url
  });
}
