var path = require('path')
var CarrierPigeon = require(path.join(__dirname, 'carrier_pigeon'));


var parser = new CarrierPigeon({strict: true});

parser.commands({
  name: 'encrypt', description:'encrypt files'
}, {
  name: 'decrypt', description: 'decrypt files'
});

parser.option('input',     { type: 'file', description: 'Input File'});
parser.option('output',    { type: 'file', description: 'Output File' });
parser.option('url',       { type: 'string', description: 'Upload Url' });
parser.option('password',  { type: 'string', description: 'Password' });
parser.option('vector',    { type: 'string', description: 'Vector (IV)' });
parser.option('backwards', { default: false, description: 'Backwards Compatible' });
parser.option('cipher',    { type: 'string', default: 'aes-256-ctr', description: 'Cipher (aes-256-ctr)' });
parser.option('algorithm', { type: 'string', default: 'sha256', description: 'Hashing algorithm (sha256)'});
parser.option('stdout',    { type: 'boolean', flags: ['-O', "--stdout"], description: "Print to stdout" });
parser.option('extension', { default: 'mimi', flags: ['-e', '--ext', '--extension'], description: 'File Extension (.mimi)' });
parser.option('stream',    { default: false, description: 'Function returns a stream instead of a promise' });
parser.option('verbose',   { default: false, flags: ['-vv', '--verbose'], description: "Print Logs Verbosely"  });
parser.option('help',      { type: 'boolean', default: false, description: 'Print Usage'});

module.exports = parser;

