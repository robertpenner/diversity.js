/*
Simpson's Diversity Index
 */
function sum(xs) {
    return xs.reduce(function (total, x) { return total + x; }, 0);
}
function normalize(xs) {
    var total = sum(xs);
    return total === 1 ? xs.slice() : xs.map(function (x) { return x / total; });
}
exports.normalize = normalize;
function diversity(weights) {
    return 1 / sum(weights.map(function (w) { return w * w; }));
}
exports.diversity = diversity;
function richness(weights) {
    return weights.length;
}
exports.richness = richness;
