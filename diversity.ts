/*
Simpson's Diversity Index
 */

function sum(xs: number[]): number {
  return xs.reduce((total, x) => total + x, 0);
}

export function normalize(xs: number[]): number[] {
  var total = sum(xs);
  return total === 1 ? xs.slice() : xs.map(x => x / total);
}

export function diversity(weights: number[]): number {
  return 1 / sum(weights.map(w => w * w));
}

export function richness(weights: number[]): number {
  return weights.length;
}
