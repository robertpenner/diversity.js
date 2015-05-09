/// <reference path="../typings/node/node.d.ts"/>
/// <reference path="../typings/mocha/mocha.d.ts"/>
/// <reference path="../typings/chai/chai.d.ts"/>
interface Reducer<T> { (ts: T[]): T }
interface Mapper<T> { (ts: T[]): T[] }

const expect = require('chai').expect;
const diversity: Reducer<number> = require('../diversity').diversity;
const richness: Reducer<number> = require('../diversity').richness;
const normalize: Mapper<number> = require('../diversity').normalize;

const tolerance = .000000001;

describe('diversity', function() {
  const testCases: Fn1Test<number[], number>[] = [
      [[1],                  1, 'just 1']
    , [[.5, .5],             2, 'halved']
    , [[.2, .2, .2, .2, .2], 5, '5-way split']
  ];

  runFunction1Tests(richness, testCases, function(expected, actual) {
    expect(actual).to.be.closeTo(expected, tolerance);
  });
});

describe('richness', function() {
  const testCases: Fn1Test<number[], number>[] = [
      [[1],                  1, 'just 1']
    , [[.5, .5],             2, 'halved']
    , [[10, 5, 5],           3, '3 numbers']
    , [[.2, .2, .2, .2, .2], 5]
  ];

  runFunction1Tests(richness, testCases, function(expected, actual) {
    expect(actual).to.be.closeTo(expected, tolerance);
  });
});

describe('normalize', function() {

  const testCases: Fn1Test<number[], number[]>[] = [
      [[1],        [1],            'just 1']
    , [[.5, .5],   [.5, .5],       'halved']
    , [[50, 50],   [.5, .5],       '50/50']
    , [[80, 20],   [.8, .2],       'Pareto']
    , [[10, 5, 5], [.5, .25, .25], '3 numbers']
  ];

  runFunction1Tests(normalize, testCases, function(expected, actual) {
    expect(actual).to.have.members(expected);
  });

});

////////////////////////////////

function runFunction1Test<A, Result>(subject: Fn1<A, Result>,
                                     test: Fn1Test<A, Result>,
                                     assertion: (expected: Result, actual: Result) => void) {
  // sweet destructuring action
  const [ input, expected, description ] = test;
  const actual = subject(input);
  const stringify = JSON.stringify;
  const expectation = `${ stringify(input) } => ${ stringify(expected) }`;
  describe(description || expectation, function () {
    it(expectation, () => assertion(expected, actual));
  });
}

function runFunction1Tests<A, Result>(subject: Fn1<A, Result>,
                                      tests: Fn1Test<A, Result>[],
                                      assertion: (expected: Result, actual: Result) => void) {
  tests.forEach(test => runFunction1Test(subject, test, assertion));
}

interface Fn1<A, Result> { (a: A): Result }
interface Fn2<A, B, Result> { (a: A, b: B): Result }

interface Fn1Test<A, Result> extends Array<A | Result | string> {
  0: A;
  1: Result;  // expected
  2?: string; // description
}

interface Fn2Test<A, B, Result> extends Array<A | B | Result | string> {
  0: A;
  1: B;
  2: Result;  // expected
  3?: string; // description
}