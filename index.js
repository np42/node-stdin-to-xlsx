var XLSX    = require('xlsx');
var helpers = require('./helpers.js');

var sheetName = process.argv[2];
var output    = process.argv[3];

if (output == null || sheetName == null) {
  process.stderr.write('USAGE: node index.js <SheetName> <OutputFile.xlsx>\n');
  process.exit(1);
}

var data = [];

process.stdin.on('data', chunk => data.push(chunk.toString()));

process.stdin.on('end', function () {
  var json = data.join('').split(/\r?\n/).map(line => line.split('\t'))
  var wb = { SheetNames: [sheetName], Sheets: { [sheetName]: helpers.json2ws(json) } };
  XLSX.writeFile(wb, output);
});
