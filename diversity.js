/**
Simpson's Diversity Index
http://www.countrysideinfo.co.uk/simpsons.htm
*/
function sum(xs) {
    return xs.reduce(function (total, x) { return total + x; }, 0);
}
function normalize(xs) {
    var total = sum(xs);
    // If array is already normalized, return a clone.
    return total === 1 ? xs.slice() : xs.map(function (x) { return x / total; });
}
exports.normalize = normalize;
function diversity(weights) {
    return 1 / sum(normalize(weights).map(function (w) { return w * w; }));
}
exports.diversity = diversity;
function richness(weights) {
    return weights.length;
}
exports.richness = richness;
function evenness(weights) {
    return diversity(weights) / richness(weights);
}
exports.evenness = evenness;
