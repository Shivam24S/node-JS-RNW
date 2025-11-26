// let str = "sms";

let str = "ABA";

let reverse = str.split("").reverse().join("");

console.log(reverse);

if (reverse === str) {
  console.log("this is palindrome");
} else {
  console.log("this is not palindrome");
}

// using for loop

let reverseStr = "";

for (let i = str.length - 1; i >= 0; i--) {
  reverseStr += str[i];
}

if (str === reverseStr) {
  console.log("string is palindrome");
} else {
  console.log("string is not palindrome");
}
