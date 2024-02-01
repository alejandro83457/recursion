class Node {
  #value;
  #nextNode;
  constructor() {
    this.#value = null;
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
  prepend(value) {
    let node = new Node();
    node.setValue(value);
    if (this.#head) node.setNextNode(this.#head);
    this.#head = node;
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
list.prepend(3);
list.prepend(2);
list.prepend(1);
console.log(list.toString());
