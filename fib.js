function fib(num) {
  // base cases
  if (num === 1) return [0];
  if (num === 2) return [0, 1];

  // base vals used algo
  let arr = [0, 1];
  for (let i = 2; i < num; i++) {
    // destructure last two arr vals
    let [a, b] = arr.slice(-2);

    // push the sum
    arr.push(a + b);
  }
  return arr;
}

function fibRec(num) {
  // base cases
  if (num === 1) return [0];
  if (num === 2) return [0, 1];

  // destructure last two arr vals
  const [a, b] = fibRec(num - 1).slice(-2);

  // concat the sum
  return fibRec(num - 1).concat([a + b]);
}

console.log(fibRec(12));
console.log(fib(12));
