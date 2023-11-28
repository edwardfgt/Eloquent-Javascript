const box = {
  locked: true,
  unlock() {
    this.locked = false;
  },
  lock() {
    this.locked = true;
  },
  _content: [],
  get content() {
    if (this.locked) throw new Error("Locked!");
    return this._content;
  },
};

const withBoxUnlocked = (fn, box) => {
  let initialState = box.locked;
  try {
    fn();
  } catch (error) {
    console.log(error);
  } finally {
    if (initialState === true) {
      box.lock();
    }
  }
};

withBoxUnlocked(() => console.log("hello", hello), box);
console.log(box.locked);
