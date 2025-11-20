const number = [1, 2, 45, 6, 8, 1, 2, 3, 4, 3, 5, 6, 78, 5, 5];

// using inbuilt method

// const uniqueVal = [...new Set(number)];

// console.log("unique values", uniqueVal);

// now using manual

const count = {};

const uniqueVal = [];

const repetitiveVal = [];

for (let n of number) {
  if (count[n]) {
    count[n] += 1;
  } else {
    count[n] = 1;
  }
}

for (let key in count) {
  if (count[key] === 1) {
    uniqueVal.push(key);
  } else {
    repetitiveVal.push(key);
  }
}

console.log("count", count);
console.log("unique val", uniqueVal);
console.log("repetitive val", repetitiveVal);
