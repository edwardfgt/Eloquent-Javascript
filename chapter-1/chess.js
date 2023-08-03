const size = 8;
let totalgridsize = size * size + size;
let grid = "";
for (let index = 0; index < totalgridsize; index++) {
  if (index % (size + 1) == 0) {
    grid += "\n";
  } else if (index % 2 == 0) {
    grid += "#";
  } else {
    grid += " ";
  }
}
console.log(grid);
