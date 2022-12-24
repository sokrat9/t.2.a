# sort-numbers.js

[![NPM version](https://img.shields.io/npm/v/sort-numbers.svg)](https://www.npmjs.com/package/sort-numbers)
[![Bower version](https://img.shields.io/bower/v/sort-numbers.svg)](https://github.com/shinnn/sort-numbers.js/releases)
[![Build Status](https://travis-ci.org/shinnn/sort-numbers.js.svg?branch=master)](https://travis-ci.org/shinnn/sort-numbers.js)
[![Build status](https://ci.appveyor.com/api/projects/status/taowvn86fmy1s21y?svg=true)](https://ci.appveyor.com/project/ShinnosukeWatanabe/sort-numbers-js)
[![Coverage Status](https://img.shields.io/coveralls/shinnn/sort-numbers.js.svg)](https://coveralls.io/r/shinnn/sort-numbers.js)
[![devDependency Status](https://img.shields.io/david/dev/shinnn/sort-numbers.js.svg?label=devDeps)](https://david-dm.org/shinnn/sort-numbers.js#info=devDependencies)

Sort numbers in ascending or descending order

```javascript
sortNumbers([0.45, Infinity, -2]); //=> [-2, 0.45, Infinity]
sortNumbers.desc([ 0.45, Infinity, -2]); //=> [Infinity, 0.45, -2]
```

## Installation

### Package managers

#### [npm](https://www.npmjs.org/)
```sh
npm install sort-numbers
```

#### [Bower](http://bower.io/)

```sh
bower install sort-numbers
```

#### [Duo](http://duojs.org/)

```javascript
var sortNumbers = require('shinnn/sort-numbers.js');
```

### Standalone

[Download the script file directly.](https://raw.githubusercontent.com/shinnn/sort-numbers.js/master/dist/sort-numbers.js)

## API

### sortNumbers(*numbers*)

*numbers*: `Array` of `Number` without `NaN`  
Return: `Array` of `Number`

It returns the array numerically sorted in ascending order.

*Note that [`Array.prototype.sort`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) works as lexical sort by default.*

```javascript
var arr = [100, -2, -Infinity];

sortNumbers(arr); //=> [ -Infinity, -2, 100 ]
arr.sort(); //=> [ -2, -Infinity, 100 ]
```

It returns an empty array when the argument is an empty array.

It throws a [TypeError](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/TypeError) when the array contains non-number values or [`NaN`](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/NaN).

```javascript
sortNumbers(new Array()); //=> []

sortNumbers([1, '2', 3]); // throw a type error
sortNumbers([NaN]); // throw a type error
```

### sortNumbers.desc(*numbers*)

*numbers*: `Array` of `Number` without `NaN`  
Return: `Array` of `Number`

It returns the array numerically sorted in descending order.

```javascript
var arr = [0, 1, 2 ,3];

sortNumbers.desc(arr) //=> [3, 2, 1, 0]
sortNumbers(arr) //=> [0, 1, 2, 3]
```

### sortNumbers.asc(*numbers*)

An alias to `sortNumbers`.

## CLI

You can use this module as a CLI tool by installing it [globally](https://docs.npmjs.com/files/folders#global-installation).

```sh
npm install -g sort-numbers
```

### Usage

```sh
Usage: sort-numbers <number0> [<number1> <number2> ...]

Options:
--desc,    -d  Sort numbers in descending order (ascending order by default)
--help,    -h  Print usage information
--version, -v  Print version
```

### Example

```sh
sort-numbers -23 7 -Infinity Infinity 
```

yields:

```sh
-Infinity,-23,7,Infinity
```

## License

Copyright (c) 2014 - 2015 [Shinnosuke Watanabe](https://github.com/shinnn)

Licensed under [the MIT License](https://github.com/shinnn/sort-numbers/blob/master/LICENSE).
