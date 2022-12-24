'use strict';

function assertIsNumber(val) {
  if (typeof val !== 'number' || val !== val) {
    throw new TypeError('Every element in the array must be a number.');
  }
}

function isLargerThanNext(current, next) {
  assertIsNumber(current);
  return current - next;
}

function isSmallerThanNext(current, next) {
  assertIsNumber(current);
  return next - current;
}

function main(arr, compareFn) {
  if (!Array.isArray(arr)) {
    throw new TypeError(
      arr +
      ' is not an array. The first argument to sortNumber must be an array.'
    );
  }

  if (arr.length === 0) {
    return [];
  }

  assertIsNumber(arr[arr.length - 1]);

  return arr.sort(compareFn);
}

function sortNumbers(arr) {
  return main(arr, isLargerThanNext);
}

sortNumbers.asc = sortNumbers;

sortNumbers.desc = function sortNumbersDesc(arr) {
  return main(arr, isSmallerThanNext);
};
