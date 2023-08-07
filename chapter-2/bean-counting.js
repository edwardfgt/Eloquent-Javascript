const countBs = (string) => {
  return countChar("B", string);
};

const countChar = (char, string) => {
  let count = 0;
  for (let index = 0; index < string.length; index++) {
    if (string[index] == char) {
      count++;
    }
  }
  return count;
};

console.log(countChar("B,", "hello world"));
console.log(countBs("hello Borld"));
console.log(countBs("BbbbbbelBo Borld"));
console.log(countChar("a", "BbbbbbelBo Boraald"));
