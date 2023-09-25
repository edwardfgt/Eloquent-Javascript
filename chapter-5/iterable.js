class Group {
  constructor() {
    this.members = [];
  }

  has(value) {
    return this.members.includes(value);
  }

  add(value) {
    if (!this.has(value)) {
      this.members.push(value);
    }
  }

  delete(value) {
    this.members = this.members.filter((v) => v !== value);
  }

  static from(collection) {
    let group = new Group();
    for (let value of collection) {
      group.add(value);
    }
    return group;
  }

  [Symbol.iterator]() {
    return new IterableGroup(this);
  }
}

class IterableGroup {
  constructor(group) {
    this.i = 0;
    this.group = group;
  }

  next() {
    if (this.i === this.group.members.length) return { done: true };
    let value = this.group.members[this.i];
    this.i++;
    return { value, done: false };
  }
}

for (let value of Group.from(["a", "b", "c"])) {
  console.log(value);
}
