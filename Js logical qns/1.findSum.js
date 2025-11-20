const num = [1, 5, 6, 7, 98, 10, 5, 8, 9, 3, 10];

let sum = 0;

// for (let i = 0; i < num.length; i++) {
//   //   sum = sum + num[i];
//   sum += num[i];
// }

// console.log("sum", sum);

// for loop

for (let n of num) {
  sum += n;
}

console.log("sum", sum);
