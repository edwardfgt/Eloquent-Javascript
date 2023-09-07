const deepEqual = (a, b) => {
  if (a === b) {
    return true;
  }

  if (
    a === null ||
    typeof a != "object" ||
    b === null ||
    typeof b != "object"
  ) {
    return false;
  }

  let aKeys = Object.keys(a);
  let bKeys = Object.keys(b);

  for (let key of aKeys) {
    //checks that keys match
    if (!bKeys.includes(key)) {
      return false;
      //checks that values match
    } else if (deepEqual(a[key], b[key]) == false) {
      return false;
    }
  }

  return true;
};

let obj = { here: { is: "an" }, object: 2 };
let obj2 = { here: { is: "and" }, object: 2 };

console.log(deepEqual(obj, obj2));
console.log(deepEqual(obj, { here: { is: "an" }, object: 2 }));
