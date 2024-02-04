class Node {
  #data;
  #left;
  #right;

  constructor(data = null) {
    this.#data = data;
    this.#left = null;
    this.#right = null;
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

  constructor(array = []) {
    // set root to null if array is empty to avoid undefined issues
    if (array.length > 0)
      this.#root = this.buildTree(array, 0, array.length - 1);
    else this.#root = null;
  }

  get root() {
    return this.#root;
  }

  // -----BUILD TREE-----
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

  // -----INSERT VALUE-----
  insert(value) {
    this.#root = this.insertHelper(value, this.#root);
  }
  insertHelper(value, root) {
    // base case will add node until it reaches correct leaf
    if (root == null) {
      root = new Node(value);
      root.setLeft(null);
      root.setRight(null);
      return root;
    }
    // choose left or right tree depending on less/greater
    if (value < root.data) {
      root.setLeft(this.insertHelper(value, root.left));
    } else if (value > root.data) {
      root.setRight(this.insertHelper(value, root.right));
    }
    return root;
  }

  // -----DELETE VALUE-----
  // Implementation taken from:
  // https://www.geeksforgeeks.org/deletion-in-binary-search-tree/
  delete(value) {
    console.log(`Deleting ${value}`);
    this.#root = this.deleteHelper(value, this.#root);
  }
  deleteHelper(value, root) {
    if (root == null) return root;
    if (root.data > value) {
      root.setLeft(this.deleteHelper(value, root.left));
      return root;
    } else if (root.data < value) {
      root.setRight(this.deleteHelper(value, root.right));
      return root;
    }

    if (root.left == null) {
      let temp = root.right;
      return temp;
    } else if (root.right == null) {
      let temp = root.left;
      return temp;
    } else {
      let succParent = root;
      let succ = root.right;
      while (succ.left != null) {
        succParent = succ;
        succ = succ.left;
      }

      if (succParent != root) succParent.setLeft(succ.right);
      else succParent.setRight(succ.right);

      root.setData(succ.data);
      return root;
    }
  }

  // -----FIND IMPLEMENTATION-----
  find(value) {
    // if BST is empty.
    if (this.#root == null) return false;

    let curr = this.#root;
    while (curr) {
      if (curr.data == value) return true;

      // move left or right
      if (curr.data > value) curr = curr.left;
      else curr = curr.right;
    }
    return false;
  }

  // -----LEVEL ORDER IMPLEMENTATION-----
  levelOrder(callback = null) {
    // exit if empty
    if (this.#root == null) return [];

    let arr = [];
    let queue = [];
    let curr = this.#root;

    while (curr) {
      // push discovered nodes to queue
      if (curr.left) queue.push(curr.left);
      if (curr.right) queue.push(curr.right);

      // call callback if it exists
      if (callback) arr.push(callback(curr.data));
      else arr.push(curr.data);

      // pop element next in queue
      // keep in mind that shift() call on an empty
      // array will return undefined and eval
      // the while loop arg to false
      // taking advantage of js quirk
      curr = queue.shift();
    }
    return arr;
  }

  // -----IN ORDER IMPLEMENTATION-----
  inOrder(callback = null) {
    // exit if empty
    if (this.#root == null) return [];

    let arr = [];
    return this.inOrderHelper(this.#root, arr, callback);
  }
  inOrderHelper(root, arr, callback) {
    if (root == null) return;
    // note we're making sure we traverse the left before
    // doing anything with the data or the right
    this.inOrderHelper(root.left, arr, callback);

    // call callback if it exists
    if (callback) arr.push(callback(root.data));
    else arr.push(root.data);

    // traverse right
    this.inOrderHelper(root.right, arr, callback);

    return arr;
  }

  // -----PRE ORDER IMPLEMENTATION-----
  preOrder(callback = null) {
    // exit if empty
    if (this.#root == null) return [];

    let arr = [];
    return this.preOrderHelper(this.#root, arr, callback);
  }
  preOrderHelper(root, arr, callback) {
    if (root == null) return;

    // process data and call callback before left and right
    if (callback) arr.push(callback(root.data));
    else arr.push(root.data);

    // left then right after processing data
    this.preOrderHelper(root.left, arr, callback);
    this.preOrderHelper(root.right, arr, callback);

    return arr;
  }

  // -----POST ORDER IMPLEMENTATION-----
  postOrder(callback = null) {
    // exit if empty
    if (this.#root == null) return [];

    let arr = [];
    return this.postOrderHelper(this.#root, arr, callback);
  }
  postOrderHelper(root, arr, callback) {
    if (root == null) return;

    // process left and right before data
    this.postOrderHelper(root.left, arr, callback);
    this.postOrderHelper(root.right, arr, callback);

    // process data after let and right
    if (callback) arr.push(callback(root.data));
    else arr.push(root.data);

    return arr;
  }

  // -----HEIGHT IMPLEMENTATION-----
  height(root = this.#root) {
    if (root == null) return 0;
    return Math.max(this.height(root.left), this.height(root.right)) + 1;
  }

  // -----IS-BALANCED IMPLEMENTATION-----
  isBalanced(root = this.#root) {
    if (root == null) return true;

    let leftHeight = this.height(root.left);
    let rightHeight = this.height(root.right);

    if (
      Math.abs(leftHeight - rightHeight) <= 1 &&
      this.isBalanced(root.left) &&
      this.isBalanced(root.right)
    )
      return true;
    else return false;
  }

  // -----REBALANCE IMPLEMENTATION-----
  rebalance() {
    if (this.#root == null) return;
    let arr = this.inOrder();
    this.#root = this.buildTree(arr, 0, arr.length - 1);
  }

  // -----VISUALIZATION-----
  // used to visualize the BST
  // provided by The Odin Project
  prettyPrint(node = this.#root, prefix = '', isLeft = true) {
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

let tree = new Tree([1, 2, 3, 4, 5, 7, 8, 9, 10]);
tree.insert(11);
tree.insert(12);
tree.insert(13);
tree.insert(0);
tree.insert(-1);
tree.prettyPrint();
console.log('Is it balanced:', tree.isBalanced());
tree.rebalance();
tree.prettyPrint();
console.log('Is it balanced:', tree.isBalanced());
