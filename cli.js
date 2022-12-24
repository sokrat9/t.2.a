#!/usr/bin/env node
/*!
 * sort-numbers | MIT (c) Shinnosuke Watanabe
 * https://github.com/shinnn/sort-numbers.js
*/
'use strict';

var fs = require('fs');

var numbers = [];

var argv = require('minimist')(process.argv.slice(2).filter(function(arg) {
  var numberArg = parseFloat(arg);
  if (numberArg === numberArg) {
    numbers.push(numberArg);
    return false;
  }
  return true;
}), {
  alias: {
    d: 'desc',
    h: 'help',
    v: 'version'
  },
  boolean: ['desc', 'help', 'version']
});

function help() {
  var sumUp = require('sum-up');
  var yellow = require('chalk').yellow;

  var pkg = require('./package.json');

  console.log([
    sumUp(pkg),
    '',
    'Usage: ' + pkg.name + ' <number0> [<number1> <number2> ...]',
    '',
    'Options:',
    yellow('--desc,    -d') + '  Sort numbers in descending order (ascending order by default)',
    yellow('--help,    -h') + '  Print usage information',
    yellow('--version, -v') + '  Print version',
    ''
  ].join('\n'));
}

if (argv.version) {
  console.log(require('./package.json').version);

} else if (argv.help) {
  help();

} else if (argv._.length > 0) {
  process.stderr.write('Every argument should be a number.\n', function() {
    process.exit(1);
  });

} else if (numbers.length === 0) {
  help();

} else {
  var sortNumbers = require('./');

  var fn;
  if (argv.desc) {
    fn = sortNumbers.desc;
  } else {
    fn = sortNumbers;
  }

  console.log(fn(numbers).join(','));
}
