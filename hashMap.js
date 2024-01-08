import Node from './hashNode.js';

function hashStringToInt(key, tableSize) {
  // From https://opendsa-server.cs.vt.edu/ODSA/Books/CS3/html/HashFuncExamp.html#
  let sum = 0;
  let mul = 1;
  for (let i = 0; i < key.length; i++) {
    mul = i % 4 === 0 ? 1 : mul * 256;
    sum += key.charCodeAt(i) * mul;
  }
  return sum % tableSize;
}

export default class StringHashMap {
  constructor() {
    this.buckets = new Array(16);
    this.capacity = 0;
  }

  resize() {
    let newBuckets = new Array(this.buckets.length * 2);
    this.buckets.forEach((item) => {
      if (item) {
        item.forEach((node) => {
          const index = hashStringToInt(node.key, newBuckets.length);
          if (newBuckets[index]) {
            newBuckets[index].push(node);
          } else {
            newBuckets[index] = [node];
          }
        });
      }
    });
    this.buckets = newBuckets;
    return 0;
  }

  set(key, value) {
    if (this.getLoadFactor() > 0.75) {
      this.resize();
    }

    const index = hashStringToInt(key, this.buckets.length);
    const node = new Node(key, value);
    if (this.buckets[index]) {
      this.buckets[index].push(node);
    } else {
      this.buckets[index] = [node];
    }
    this.capacity += 1;
    return index;
  }

  get(key) {
    const index = hashStringToInt(key, this.buckets.length);
    for (const node of this.buckets[index]) {
      if (node.key === key) {
        return node.value;
      }
    }
    return null;
  }

  has(key) {
    return this.get(key) ? true : false;
  }

  getLoadFactor() {
    return this.capacity / this.buckets.length;
  }

  remove(key) {
    if (!this.has(key)) {
      return -1;
    }

    const index = hashStringToInt(key, this.buckets.length);
    this.buckets[index] = this.buckets[index].filter(
      (node) => node.key !== key
    );
    this.capacity -= 1;
    return 0;
  }

  length() {
    return this.buckets.reduce((acc, item) => {
      if (!item) return 0;
      return acc + item.length;
    }, 0);
  }

  clear() {
    this.buckets = new Array(16);
    return 0;
  }

  keys() {
    const keys = [];
    this.buckets.forEach((item) => {
      item.forEach((node) => {
        keys.push(node.key);
      });
    });
    return keys;
  }

  values() {
    const values = [];
    this.buckets.forEach((item) => {
      item.forEach((node) => {
        values.push(node.value);
      });
    });
    return values;
  }

  entries() {
    const entries = [];
    this.buckets.forEach((item) => {
      item.forEach((node) => {
        entries.push([node.key, node.value]);
      });
    });
    return entries;
  }
}
