/// <reference path="../typings/node/node.d.ts"/>
/// <reference path="../typings/mocha/mocha.d.ts"/>
/// <reference path="../typings/chai/chai.d.ts"/>
var expect = require('chai').expect;
var diversity = require('../diversity').diversity;
var richness = require('../diversity').richness;
var normalize = require('../diversity').normalize;
var tolerance = .000000001;
describe('diversity', function () {
    var testCases = [
        [[1], 1, 'just 1'],
        [[.5, .5], 2, 'halved'],
        [[.2, .2, .2, .2, .2], 5, '5-way split']
    ];
    runFunction1Tests(richness, testCases, function (expected, actual) {
        expect(actual).to.be.closeTo(expected, tolerance);
    });
});
describe('richness', function () {
    var testCases = [
        [[1], 1, 'just 1'],
        [[.5, .5], 2, 'halved'],
        [[10, 5, 5], 3, '3 numbers'],
        [[.2, .2, .2, .2, .2], 5]
    ];
    runFunction1Tests(richness, testCases, function (expected, actual) {
        expect(actual).to.be.closeTo(expected, tolerance);
    });
});
describe('normalize', function () {
    var testCases = [
        [[1], [1], 'just 1'],
        [[.5, .5], [.5, .5], 'halved'],
        [[50, 50], [.5, .5], '50/50'],
        [[80, 20], [.8, .2], 'Pareto'],
        [[10, 5, 5], [.5, .25, .25], '3 numbers']
    ];
    runFunction1Tests(normalize, testCases, function (expected, actual) {
        expect(actual).to.have.members(expected);
    });
});
////////////////////////////////
function runFunction1Test(subject, test, assertion) {
    // sweet destructuring action
    var input = test[0], expected = test[1], description = test[2];
    var actual = subject(input);
    var stringify = JSON.stringify;
    var expectation = stringify(input) + " => " + stringify(expected);
    describe(description || expectation, function () {
        it(expectation, function () { return assertion(expected, actual); });
    });
}
function runFunction1Tests(subject, tests, assertion) {
    tests.forEach(function (test) { return runFunction1Test(subject, test, assertion); });
}
