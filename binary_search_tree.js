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
    console.log(`Inserting ${value}`);
    this.#root = this.insertHelper(value, this.#root);
  }
  insertHelper(value, root) {
    // base case will add node until it reaches correct leaf
    if (root == null) {
      console.log(`Current node is null`);
      root = new Node(value);
      root.setLeft(null);
      root.setRight(null);
      return root;
    }
    // choose left or right tree depending on less/greater
    if (value < root.data) {
      console.log(`${value} is less than ${root.data}`);
      root.setLeft(this.insertHelper(value, root.left));
    } else if (value > root.data) {
      console.log(`${value} is greater than ${root.data}`);
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
      // root = null;
      return temp;
    } else if (root.right == null) {
      let temp = root.left;
      // root = null;
      return temp;
    } else {
      let succParent = root;
      let succ = root.right;
      while (succ.left != null) {
        succParent = succ;
        succ = succ.left;
      }

      if (succParent != root) {
        succParent.setLeft(succ.right);
      } else {
        succParent.setRight(succ.right);
      }

      root.setData(succ.data);
      // succ = null;
      return root;
    }
  }

  // -----VISUALIZATION-----
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

let tree = new Tree([1, 2, 3, 4, 5, 7, 8, 9, 10]);
// let tree = new Tree();
tree.prettyPrint(tree.root);
tree.delete(10);
tree.prettyPrint(tree.root);
