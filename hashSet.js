function hash(key, tableSize) {
  // From https://opendsa-server.cs.vt.edu/ODSA/Books/CS3/html/HashFuncExamp.html#
  let sum = 0;
  let mul = 1;
  for (let i = 0; i < key.length; i++) {
    mul = i % 4 === 0 ? 1 : mul * 256;
    sum += key.charCodeAt(i) * mul;
  }
  return sum % tableSize;
}

export default class StringHashSet {
  constructor() {
    this.buckets = new Array(16);
    this.capacity = 0;
  }

  resize() {
    let newBuckets = new Array(this.buckets.length * 2);
    this.buckets.forEach((item) => {
      if (item) {
        item.forEach((key) => {
          const index = hash(key, newBuckets.length);
          if (newBuckets[index]) {
            newBuckets[index].push(key);
          } else {
            newBuckets[index] = [key];
          }
        });
      }
    });
    this.buckets = newBuckets;
    return 0;
  }

  add(key) {
    if (this.getLoadFactor() > 0.75) {
      this.resize();
    }

    const index = hash(key, this.buckets.length);
    if (this.buckets[index]) {
      if (this.buckets[index].includes(key)) {
        return -1;
      }
      this.buckets[index].push(key);
    } else {
      this.buckets[index] = [key];
    }
    this.capacity += 1;
    return index;
  }

  get(key) {
    const index = hash(key, this.buckets.length);
    for (const k of this.buckets[index]) {
      if (k === key) {
        return k;
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

    const index = hash(key, this.buckets.length);
    this.buckets[index] = this.buckets[index].filter((k) => k !== key);
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
      item.forEach((key) => {
        keys.push(key);
      });
    });
    return keys;
  }
}
