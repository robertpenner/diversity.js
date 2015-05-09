/// <reference path="../typings/node/node.d.ts"/>
/// <reference path="../typings/mocha/mocha.d.ts"/>
/// <reference path="../typings/chai/chai.d.ts"/>
var expect = require('chai').expect;
var diversity_1 = require('../diversity');
describe('diversity', function () {
    var tests = [
        //  input               expected   description
        [[1], 1, 'just 1'],
        [[.5, .5], 2, 'halved'],
        [[50, 50], 2, '50/50 unnormalized'],
        [[.2, .2, .2, .2, .2], 5, '5-way split']
    ];
    runFunction1Tests(diversity_1.diversity, closeEnough, tests);
});
describe('richness', function () {
    var tests = [
        //  input             expected     description
        [[1], 1, 'just 1'],
        [[.5, .5], 2],
        [[10, 5, 5], 3, '3 numbers'],
        [[.2, .2, .2, .2, .2], 5]
    ];
    runFunction1Tests(diversity_1.richness, closeEnough, tests);
});
describe('evenness', function () {
    var tests = [
        [[1], 1, 'just 1 is perfectly even'],
        [[.5, .5], 1, 'halved is perfectly even'],
        [[50, 50], 1, '50/50 is perfectly even'],
        [[.2, .2, .2, .2, .2], 1, '5-way split is perfectly even']
    ];
    runFunction1Tests(diversity_1.evenness, closeEnough, tests);
});
describe('normalize', function () {
    var tests = [
        [[1], [1], 'just 1'],
        [[.5, .5], [.5, .5], 'halved'],
        [[50, 50], [.5, .5], '50/50'],
        [[80, 20], [.8, .2], 'Pareto'],
        [[10, 5, 5], [.5, .25, .25], '3 numbers']
    ];
    runFunction1Tests(diversity_1.normalize, matchesStructure, tests);
});
////////////////////////////////
var tolerance = .000000001;
function closeEnough(expected, actual) {
    expect(actual).to.be.closeTo(expected, tolerance);
}
function matchesStructure(expected, actual) {
    expect(actual).to.have.members(expected);
}
function runFunction1Test(subject, assertion, test) {
    // sweet destructuring action
    var input = test[0], expected = test[1], description = test[2];
    var actual = subject(input);
    var expectation = JSON.stringify(input) + " => " + JSON.stringify(expected);
    it(description || expectation, function () { return assertion(expected, actual); });
}
function runFunction1Tests(subject, assertion, tests) {
    tests.forEach(function (test) { return runFunction1Test(subject, assertion, test); });
}
