/// <reference path="../typings/node/node.d.ts"/>
/// <reference path="../typings/mocha/mocha.d.ts"/>
/// <reference path="../typings/chai/chai.d.ts"/>
import { expect, assert } from 'chai';
import { diversity, richness, normalize, evenness } from '../diversity';

describe('diversity', function() {
  const tests: Fn1Test<number[], number>[] = [
  //  input               expected   description
      [[1],                  1,      'just 1']
    , [[.5, .5],             2,      'halved']
    , [[50, 50],             2,      '50/50 unnormalized']
    , [[.2, .2, .2, .2, .2], 5,      '5-way split']
  ];

  runFunction1Tests(diversity, closeEnough, tests);
});

describe('richness', function() {
  const tests: Fn1Test<number[], number>[] = [
    //  input             expected     description
      [[1],                  1,        'just 1']
    , [[.5, .5],             2]
    , [[10, 5, 5],           3,        '3 numbers']
    , [[.2, .2, .2, .2, .2], 5]
  ];

  runFunction1Tests(richness, closeEnough, tests);
});

describe('evenness', function() {
  const tests: Fn1Test<number[], number>[] = [
      [[1],                  1, 'just 1 is perfectly even']
    , [[.5, .5],             1, 'halved is perfectly even']
    , [[50, 50],             1, '50/50 is perfectly even']
    //, [[10, 5, 5],           1, 'uneven numbers']
    , [[.2, .2, .2, .2, .2], 1, '5-way split is perfectly even']
  ];

  runFunction1Tests(evenness, closeEnough, tests);
});

describe('normalize', function() {
  const tests: Fn1Test<number[], number[]>[] = [
      [[1],        [1],            'just 1']
    , [[.5, .5],   [.5, .5],       'halved']
    , [[50, 50],   [.5, .5],       '50/50']
    , [[80, 20],   [.8, .2],       'Pareto']
    , [[10, 5, 5], [.5, .25, .25], '3 numbers']
  ];

  runFunction1Tests(normalize, assert.deepEqual, tests);
});

////////////////////////////////
const tolerance = .000000001;
function closeEnough(expected, actual) {
  expect(actual).to.be.closeTo(expected, tolerance);
}

function runFunction1Test<A, Result>(subject: Fn1<A, Result>,
                                     assertion: (expected: Result, actual: Result) => void,
                                     test: Fn1Test<A, Result>) {
  // sweet destructuring action
  const [ input, expected, description ] = test;
  const actual = subject(input);
  const expectation = `${ JSON.stringify(input) } => ${ JSON.stringify(expected) }`;
  it(description || expectation, () => assertion(actual, expected));
}

function runFunction1Tests<A, Result>(subject: Fn1<A, Result>,
                                      assertion: (expected: Result, actual: Result) => void,
                                      tests: Fn1Test<A, Result>[]) {
  tests.forEach(test => runFunction1Test(subject, assertion, test));
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