const reverseArray = (array) => {
  let newArray = [];
  for (let index = array.length - 1; index >= 0; index--) {
    newArray.push(array[index]);
  }
  return newArray;
};

const reverseArrayInPlace = (array) => {
  let halfLength = Math.floor(array.length / 2);
  let lastIndex = array.length - 1;

  for (let i = 0; i < halfLength; i++) {
    let temp = array[i];
    array[i] = array[lastIndex - i];
    array[lastIndex - i] = temp;
  }
  return array;
};

console.log(reverseArray([1, 2, 3, 4]));
console.log(reverseArrayInPlace([1, 2, 3, 4, 5]));
