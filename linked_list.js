class Node {
  #value;
  #nextNode;
  constructor(value = null) {
    this.#value = value;
    this.#nextNode = null;
  }
  get value() {
    return this.#value;
  }
  get nextNode() {
    return this.#nextNode;
  }
  setValue(value) {
    this.#value = value;
  }
  setNextNode(nextNode) {
    this.#nextNode = nextNode;
  }
}

class LinkedList {
  #head;
  constructor() {
    this.#head = null;
  }
  append(value) {
    let node = new Node(value);
    let currNode = this.#head;
    // check if head is empty
    if (!this.#head) {
      this.#head = node;
      return;
    }
    // head is not empty
    while (currNode.nextNode) currNode = currNode.nextNode;
    currNode.setNextNode(node);
  }
  prepend(value) {
    let node = new Node(value);
    // check if head is not empty
    if (this.#head) node.setNextNode(this.#head);
    this.#head = node;
  }
  get size() {
    let count = 0;
    let curr = this.#head;
    while (curr) {
      count++;
      curr = curr.nextNode;
    }
    return count;
  }
  toString() {
    let str = '';
    let currNode = this.#head;
    while (currNode) {
      str += `( ${currNode.value} )-> `;
      currNode = currNode.nextNode;
    }
    str += 'null';
    return str;
  }
}

let list = new LinkedList();
console.log(list.toString());
console.log('Size:', list.size);
