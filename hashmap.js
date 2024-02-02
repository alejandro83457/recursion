class HashMap {
  #map;
  #load;
  #cap;

  constructor() {
    this.#map = Array(16);
    this.#load = 0.75;
    this.#cap = 0;
  }

  hash(key) {
    let hash = 0;
    const prime = 31;
    for (let i = 0; i < key.length; i++) {
      hash = prime * hash + key.charCodeAt(i);
    }
    return hash;
  }

  set(key, value) {
    // generate an index using hash and %
    let index = this.hash(key) % this.#map.length;
    // if we surpass our load
    if (this.#cap / this.#map.length >= this.#load) this.#increaseCap();
    // if bucket is not taken
    if (!this.#map[index]) this.#cap++;
    this.#map[index] = { key, value };
  }

  get(key) {
    let index = this.hash(key) % this.#map.length;
    if (!this.#map[index]) return false;
    return this.#map[index].key === key ? this.#map[index].value : false;
  }

  has(key) {
    let index = this.hash(key) % this.#map.length;
    if (!this.#map[index]) return false;
    return this.#map[index].key === key ? true : false;
  }

  remove(key) {
    let index = this.hash(key) % this.#map.length;
    if (this.#map[index]) {
      this.#map[index] = undefined;
      return true;
    }
    return false;
  }

  #increaseCap() {
    let temp = Array(this.#map.length * 2);
    for (let el of this.#map) {
      if (el) {
        let { key, value } = el;
        let index = this.hash(key) % temp.length;
        temp[index] = { key, value };
      }
    }
    this.#map = temp;
  }

  print() {
    console.log('Current size:', this.#map.length);
    console.log('Curent cap:', this.#cap);
    console.log('Current load:', this.#cap / this.#map.length);
    for (let el of this.#map) {
      console.log(el);
    }
  }
}

let map = new HashMap();
map.set('sara', 1);
map.set('alex', 2);
map.set('test', 3);
map.set('set', 4);
map.set('rock', 5);
map.set('paper', 6);
map.set('scissors', 7);
map.set('car', 8);
map.set('bike', 9);
map.set('street', 10);
map.set('road', 11);
map.set('xbox', 12);
map.set('ps5', 13);
map.set('monitor', 14);
// map.set('laptop', 15);
// map.set('keyboard', 16);
// map.set('door', 17);
// map.set('chair', 18);
// map.set('closet', 19);
// map.set('sarad', 20);
// map.set('aledx', 21);
// map.set('tesdt', 22);
// map.set('sedt', 23);
// map.set('rodck', 24);
// map.set('padper', 25);

map.print();
console.log(map.get('sedt'));
console.log(map.has('sedt'));
console.log(map.remove('ps5'));
map.print();
