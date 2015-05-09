/**
Simpson's Diversity Index
http://www.countrysideinfo.co.uk/simpsons.htm
*/

function sum(xs: number[]): number {
  return xs.reduce((total, x) => total + x, 0);
}

export function normalize(xs: number[]): number[] {
  var total = sum(xs);
  // If array is already normalized, return a clone.
  return total === 1 ? xs.slice() : xs.map(x => x / total);
}

export function diversity(weights: number[]): number {
  return 1 / sum(normalize(weights).map(w => w * w));
}

export function richness(weights: number[]): number {
  return weights.length;
}

export function evenness(weights: number[]): number {
  return diversity(weights) / richness(weights);
}
