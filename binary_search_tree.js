class Node {
  #data;
  #left;
  #right;

  constructor(data = undefined) {
    this.#data = data;
    this.#left = undefined;
    this.#right = undefined;
  }

  get data() {
    return this.#data;
  }

  get left() {
    return this.#left;
  }

  get right() {
    return this.#right;
  }

  setData(data) {
    this.#data = data;
  }

  setLeft(left) {
    this.#left = left;
  }

  setRight(right) {
    this.#right = right;
  }
}

class Tree {
  #root;

  constructor(array) {
    this.#root = this.buildTree(array, 0, array.length - 1);
  }

  get root() {
    return this.#root;
  }

  buildTree(array, start, end) {
    // base case
    if (start > end) return null;

    let mid = Math.floor((start + end) / 2);
    // console.log(start, mid, end);

    let node = new Node(array[mid]);

    // set left and right recursively
    node.setLeft(this.buildTree(array, start, mid - 1));
    node.setRight(this.buildTree(array, mid + 1, end));

    return node;
  }

  // used to visualize the BST
  // provided by The Odin Project
  prettyPrint(node, prefix = '', isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(
        node.right,
        `${prefix}${isLeft ? '│   ' : '    '}`,
        false
      );
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }
}

let tree = new Tree([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
tree.prettyPrint(tree.root);
