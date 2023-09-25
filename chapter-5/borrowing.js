const borrow = {
  hasOwnProperty: "YES",
  name: "Edward",
};

console.log(Object.prototype.hasOwnProperty.call(borrow, "name"));
