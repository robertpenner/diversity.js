/// <reference path="../typings/node/node.d.ts"/>
/// <reference path="../typings/mocha/mocha.d.ts"/>
/// <reference path="../typings/chai/chai.d.ts"/>
var expect = require('chai').expect;
var diversity = require('../diversity').diversity;
var richness = require('../diversity').richness;
var normalize = require('../diversity').normalize;
var tolerance = .000000001;
describe('diversity', function () {
    it('is a function', function () {
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
describe('richness', function () {
    var tolerance = .000000001;
    var testCases = [
        ['just 1', [1], 1],
        ['halved', [.5, .5], 2],
        ['3 numbers', [10, 5, 5], 3],
        ['5-way split', [.2, .2, .2, .2, .2], 5]
    ];
    testCases.forEach(function (testCase) {
        var subject = richness;
        // sweet destructuring action
        var description = testCase[0], input = testCase[1], expected = testCase[2];
        var actual = subject(input);
        var stringify = JSON.stringify;
        describe(description, function () {
            it(stringify(input) + " => " + stringify(expected), function () {
                expect(actual).to.be.closeTo(expected, tolerance);
            });
        });
    });
});
// might be quixotic
function runFunction1TestCases(subject, testCases, assertion) {
    testCases.forEach(function (testCase) {
        // sweet destructuring action
        var description = testCase[0], input = testCase[1], expected = testCase[2];
        var actual = subject(input);
        var stringify = JSON.stringify;
        describe(description, function () {
            var expectation = stringify(input) + " => " + stringify(expected);
            it(expectation, assertion(expected, actual));
        });
    });
}
var normalizeTestCases = [
    ['just 1', [1], [1],],
    ['halved', [.5, .5], [.5, .5],],
    ['50/50', [50, 50], [.5, .5],],
    ['Pareto', [80, 20], [.8, .2],],
    ['3 numbers', [10, 5, 5], [.5, .25, .25]]
];
runFunction1TestCases(normalize, normalizeTestCases, function (expected, actual) {
    return function () { return expect(actual).to.have.members(expected); };
});
describe('normalize', function () {
    var testCases = [
        ['just 1', [1], [1],],
        ['halved', [.5, .5], [.5, .5],],
        ['50/50', [50, 50], [.5, .5],],
        ['Pareto', [80, 20], [.8, .2],],
        ['3 numbers', [10, 5, 5], [.5, .25, .25]]
    ];
    testCases.forEach(function (testCase) {
        var subject = normalize;
        // sweet destructuring action
        var description = testCase[0], input = testCase[1], expected = testCase[2];
        var actual = subject(input);
        var stringify = JSON.stringify;
        describe(description, function () {
            it(stringify(input) + " => " + stringify(expected), function () {
                expect(actual).to.have.members(expected);
            });
        });
    });
});
//interface Function2<A, B, R> { (a: A, b: B): R }
//interface Function3<A, B, C, R> { (a: A, b: B, c: C): R }
//interface Function4<A, B, C, D, R> { (a: A, b: B, c: C, d: D): R }
//interface Function5<A, B, C, D, E, R> { (a: A, b: B, c: C, d: D, e: E): R }
