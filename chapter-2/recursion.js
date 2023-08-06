const isEven = (n) => {
  if (n == 0) {
    return true;
  } else if (n == 1) {
    return false;
  } else {
    return isEven(n - 2);
  }
};

//testing the function
console.log(isEven(8));
console.log(isEven(9));
console.log(isEven(1));
console.log(isEven(0));
