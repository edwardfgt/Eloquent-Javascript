const Range = (start, end, optionalStep = 1) => {
  let output = [];
  if (optionalStep > 0) {
    for (let index = start; index <= end; index += optionalStep) {
      output.push(index);
    }
  } else if (optionalStep < 0) {
    for (let index = start; index >= end; index += optionalStep) {
      output.push(index);
    }
  }
  return output;
};

const SumRange = (array) => {
  let sum = 0;
  array.forEach((element) => {
    sum += element;
  });
  return sum;
};

console.log(SumRange(Range(1, 10)));
console.log(Range(1, 10, 2));
console.log(Range(5, 2, -1));
