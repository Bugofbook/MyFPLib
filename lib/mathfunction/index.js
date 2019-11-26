// 製造一個在二個整數之間的隨機整數
export const RandomNumber1 = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;
//製造一個n1~n2的陣列
export const StartArray = (number1 = 0, number2 = 1) =>
  Array(number2 - number1 + 1)
    .fill(number1)
    .map((e, index) => e + index);
