/*jshint unused:true */
'use strict';

var exec = require('child_process').exec;

var sortNumbers = require('./');
var test = require('tape');

var pkg = require('./package.json');

test('sortNumbers()', function(t) {
  t.plan(7);

  t.equal(sortNumbers.name, 'sortNumbers', 'should have a function name.');

  t.deepEqual(
    sortNumbers([0, -1, Infinity, 1]),
    [-1, 0, 1, Infinity],
    'should sort numbers in ascending order.'
  );

  t.deepEqual(
    sortNumbers([1, 0, 3, 4, 7, 98, 1, 0, 9, 4, 28]),
    [0, 0, 1, 1, 3, 4, 4, 7, 9, 28, 98],
    'should sort numbers even if the array includes duplicates.'
  );

  t.deepEqual(sortNumbers([]), [], 'should return the empty array as it is.');

  t.throws(
    sortNumbers.bind(null, {'0': 1, '1': 2}),
    /TypeError.*must be an array/,
    'should throw a type error when the argument is not an array.'
  );

  t.throws(
    sortNumbers.bind(null, [0, true]),
    /TypeError.*must be a number/,
    'should throw a type error when the array contains non-number values.'
  );

  t.throws(
    sortNumbers.bind(null, [NaN]),
    /TypeError.*must be a number/,
    'should throw a type error when the argument contains NaN.'
  );
});

test('sortNumbers.desc()', function(t) {
  t.plan(7);

  t.equal(sortNumbers.desc.name, 'sortNumbersDesc', 'should have a function name.');

  t.deepEqual(
    sortNumbers.desc([1, 2, 0, Infinity]),
    [Infinity, 2, 1, 0],
    'should sort numbers in descending order.'
  );

  t.deepEqual(
    sortNumbers.desc([0, 2, 1, 0]),
    [2, 1, 0, 0],
    'should sort numbers even if the array includes duplicates.'
  );

  t.deepEqual(sortNumbers.desc([]), [], 'should return the empty array as it is.');

  t.throws(
    sortNumbers.desc.bind(null, {'0': -1, '1': 0}),
    /TypeError.*must be an array/,
    'should throw a type error when the argument is not an array.'
  );

  t.throws(
    sortNumbers.desc.bind(null, [0, [1, 3]]),
    /TypeError.*must be a number/,
    'should throw a type error when the array contains non-number values.'
  );

  t.throws(
    sortNumbers.bind(null, [parseInt('foo', 10)]),
    /TypeError.*must be a number/,
    'should throw a type error when the argument contains NaN.'
  );
});

test('sortNumbers.asc()', function(t) {
  t.plan(1);
  t.equal(sortNumbers.asc, sortNumbers, 'should be the same as sortNumbers().');
});

test('"sort-numbers" command inside a TTY context', function(t) {
  t.plan(8);

  var execBin = function(arg, cb) {
    return exec('node ' + pkg.bin + ' ' + arg, cb);
  };

  execBin('0.43 8 -3.333', function(err, stdout) {
    t.equal(stdout, '-3.333,0.43,8\n', 'should print sorted numbers.');
  });

  execBin('0.43 8 -3.333 --desc', function(err, stdout) {
    t.equal(
      stdout,
      '8,0.43,-3.333\n',
      'should print sorted numbers in descending order, using --desc flag.'
    );
  });

  execBin('Infinity 0 -d', function(err, stdout) {
    t.equal(stdout, 'Infinity,0\n', 'should use -d as an alias of --desc.');
  });

  execBin('1 foo', function(err, stdout, stderr) {
    t.ok(
      /argument/.test(stderr),
      'should print an error when the arguments include non-number value.'
    );
  });

  execBin('--version', function(err, stdout) {
    t.equal(stdout, pkg.version + '\n', 'should print version using --version flag.');
  });

  execBin('-v', function(err, stdout) {
    t.equal(stdout, pkg.version + '\n', 'should use -v as an alias of --version.');
  });

  execBin('--help', function(err, stdout) {
    t.ok(/Usage/.test(stdout), 'should print usage information using --help flag.');
  });

  execBin('-h', function(err, stdout) {
    t.ok(/Usage/.test(stdout), 'should use -h as an alias of --help.');
  });
});
