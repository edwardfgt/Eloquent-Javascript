const arrayToList = (array) => {
  let list = null;
  for (let i = array.length - 1; i >= 0; i--) {
    list = { value: array[i], rest: list };
  }
  return list;
};

const listToArray = (list) => {
  let array = [];
  for (let index = list; index != null; index = index.rest) {
    array.push(index.value);
  }
  return array;
};

const prepend = (value, list) => {
  return { value, rest: list };
};

console.log(arrayToList([1, 2, 3, 4, 5]));
console.log(listToArray(arrayToList([10, 20, 30])));
console.log(prepend(10, prepend(20, null)));
