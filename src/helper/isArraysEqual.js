function isArraysEqual(first, second) {
  return JSON.stringify(first) === JSON.stringify(second);
}

export { isArraysEqual };
