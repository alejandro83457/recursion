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
  head() {
    // if head is not empty
    if (this.#head) return this.#head.value;
    else return null;
  }
  tail() {
    // if head is empty
    if (!this.#head) return null;
    let curr = this.#head;
    // head is not empty
    while (curr.nextNode) {
      curr = curr.nextNode;
    }
    return curr.value;
  }
  at(index) {
    // if index is out of range
    if (index > this.size - 1) return null;
    let curr = this.#head;
    while (index > 0) {
      curr = curr.nextNode;
      index--;
    }
    return curr.value;
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
list.append(1);
list.append(2);
list.append(3);
list.append(4);
console.log(list.toString());
console.log('Size:', list.size);
console.log('Head:', list.head());
console.log('Tail:', list.tail());
console.log('Index 0:', list.at(0));
