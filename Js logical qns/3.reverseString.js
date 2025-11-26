let str = "hello";

let strToArray = str.split("");

console.log("strToArray", strToArray);

let arrayReverse = strToArray.reverse();

console.log("reverse", arrayReverse);

let arrayToString = arrayReverse.join("");

console.log("type", typeof arrayToString);

console.log("reverseString", arrayToString);

// *******************************

let reverseString = str.split("").reverse().join("");

console.log("reverseString", reverseString);

// *************************************

let reverseStringUsingLoop = "";

for (let i = str.length - 1; i >= 0; i--) {
  reverseStringUsingLoop += str[i];
}

console.log("reverseStringUsingLoop", reverseStringUsingLoop);
