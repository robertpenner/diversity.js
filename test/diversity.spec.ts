/// <reference path="../typings/node/node.d.ts"/>
/// <reference path="../typings/mocha/mocha.d.ts"/>
/// <reference path="../typings/chai/chai.d.ts"/>
const expect = require('chai').expect;
const diversity = require('../diversity').diversity;
const richness = require('../diversity').richness;
const normalize = require('../diversity').normalize;

const tolerance = .000000001;

describe('diversity', function() {
  it('is a function', function() {
    expect(diversity).to.be.an.instanceOf(Function);
  });

  describe('of 1', function () {
    var weights = [1];
    it('is 1', function () {
      expect(diversity(weights)).to.equal(1);
    });

  });

  describe('2-way split', function () {
    var weights = [.5, .5];
    it('is 2', function () {
      expect(diversity(weights)).to.equal(2);
    });
  });

  describe('5-way split', function () {
    var weights = [.2, .2, .2, .2, .2];
    it('is 5', function () {
      expect(diversity(weights)).to.be.closeTo(5, tolerance);
    });
  });
});

//TODO: base generics on input/output types of the function under test
type NumbersReduceTestCase = TestCase<number[], number>;
type NumbersMapTestCase = TestCase<number[], number[]>;

describe('richness', function() {
  const tolerance = .000000001;

  const testCases: NumbersReduceTestCase[] = [
      ['just 1',      [1],                    1      ]
    , ['halved',      [.5, .5],               2      ]
    , ['3 numbers',   [10, 5, 5],             3      ]
    , ['5-way split', [.2, .2, .2, .2, .2],   5      ]
  ];

  testCases.forEach(testCase => {
    const subject = richness;

    // sweet destructuring action
    const [ description, input, expected ] = testCase;
    const actual = subject(input);
    const stringify = JSON.stringify;
    describe(description, function() {
      it(`${ stringify(input) } => ${ stringify(expected) }`, function() {
        expect(actual).to.be.closeTo(expected, tolerance);
      })
    })
  });

});




// might be quixotic
function runFunction1TestCases<A, Result>(subject: Function1<A, Result>,
                                          testCases: TestCase<A, Result>[],
                                          assertion: (expected: Result, actual: Result) => () => void) {
  testCases.forEach(testCase => {
    // sweet destructuring action
    const [ description, input, expected ] = testCase;
    const actual = subject(input);
    const stringify = JSON.stringify;
    describe(description, function () {
      const expectation = `${ stringify(input) } => ${ stringify(expected) }`;
      it(expectation, assertion(expected, actual));
    });
  });
}

const normalizeTestCases: NumbersMapTestCase[] = [
  ['just 1',    [1],          [1],           ]
  , ['halved',    [.5, .5],     [.5, .5],      ]
  , ['50/50',     [50, 50],     [.5, .5],      ]
  , ['Pareto',    [80, 20],     [.8, .2],      ]
  , ['3 numbers', [10, 5, 5],   [.5, .25, .25] ]
];

runFunction1TestCases(normalize, normalizeTestCases, function(expected, actual) {
  return () => expect(actual).to.have.members(expected);
});

describe('normalize', function() {
  const testCases: NumbersMapTestCase[] = [
      ['just 1',    [1],          [1],           ]
    , ['halved',    [.5, .5],     [.5, .5],      ]
    , ['50/50',     [50, 50],     [.5, .5],      ]
    , ['Pareto',    [80, 20],     [.8, .2],      ]
    , ['3 numbers', [10, 5, 5],   [.5, .25, .25] ]
  ];

  testCases.forEach(testCase => {
    const subject = normalize;

    // sweet destructuring action
    const [ description, input, expected ] = testCase;
    const actual = subject(input);
    const stringify = JSON.stringify;
    describe(description, function() {
      it(`${ stringify(input) } => ${ stringify(expected) }`, function() {
        expect(actual).to.have.members(expected);
      });
    });
  });
});


interface TestCase<Input, Expected> extends Array<string | Input | Expected> {
  0: string; // description
  1: Input;
  2: Expected;
}

//interface FnTestCase<Fn extends Function> extends Array<string | Input | Expected> {
//  0: string; // description
//  1: Input;
//  2: Expected;
//}

interface Fn1TestCase<A, Result> extends Array<string | A | Result> {
  0: string; // description
  1: A;
  2: Result;
}

//interface Function0<R> { (): R }
interface Function1<A, Result> { (a: A): Result }
//interface Function2<A, B, R> { (a: A, b: B): R }
//interface Function3<A, B, C, R> { (a: A, b: B, c: C): R }
//interface Function4<A, B, C, D, R> { (a: A, b: B, c: C, d: D): R }
//interface Function5<A, B, C, D, E, R> { (a: A, b: B, c: C, d: D, e: E): R }
