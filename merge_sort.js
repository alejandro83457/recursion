function mergeSort(arr) {
  // base case
  if (arr.length === 1) return arr;

  // figure out midpoint
  let i = Math.floor(arr.length / 2) - 1;

  // recursively cut arr in half
  let left = mergeSort(arr.slice(0, i + 1));
  let right = mergeSort(arr.slice(i + 1));

  // merge sorted arrays
  return merge(left, right);
}

function merge(left, right) {
  let sorted = [];
  let l = 0;
  let r = 0;

  // will run until we reach the sum of the length of both arrs
  while (l + r < left.length + right.length) {
    // if left is empty add right
    if (left[l] === undefined) {
      sorted.push(right[r++]);
      continue;
    }
    // if right is empty add left
    if (right[r] === undefined) {
      sorted.push(left[l++]);
      continue;
    }

    // add whichever val is currently smaller
    if (left[l] <= right[r]) sorted.push(left[l++]);
    else sorted.push(right[r++]);
  }

  return sorted;
}

let sorted = mergeSort([3, 2, 1, 13, 8, 5, 0, 1]);
console.log(sorted);
