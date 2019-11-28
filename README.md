# FP fonction

functions are the High-order-function invoke "control structure" in javascript. and almost every function can Currying.

## logicHOF

use logicHOF

```javascript
import {...} from '/logic'
```

use function

- compose
- invokeCompose
- invokeIf
- invokeIfElseIf
- invokeWhile
- invokeDoWhile
- invokeSwitch
- invokeFor

### compose and invokeCompose

both function are the copy from Redux.js. And invokeCompose is reverse to compose.there are no curry.

Use function:

```javascript
compose(fnProcessN,...,fnProcess2,fnProcess1)(data)
invokeCompose(fnProcess1,fnProcess2,...,fnProcessN)(data)
```

both expression statments are equal to...

```javascript
fnProcessN(...fnProcess2(fnProcess1(data)));
```

For example:

```javascript
const process1 = data => data + "1";
const process2 = data => data + "2";
const process3 = data => data + "3";
let data = "0";
let aaa = compose(process3, process2, process1)(data);
let bbb = invokeCompose(process1, process2, process2)(data);
console.log(aaa); // '0123'
console.log(bbb); // '0123'
```

### invokeIf

the function is invoke "if". it have currying

Use function:

```javascript
invokeIf(fnCondition, [fnTrue, fnFalse], arg);
invokeIf(fnCondition)([fnTrue, fnFalse], arg);
invokeIf(fnCondition)([fnTrue, fnFalse], arg);
invokeIf(fnCondition)([fnTrue, fnFalse])(arg);
```

those expression statments are equal to...

```javascript
if (fnCondition(arg)) {
  return fnTrue(arg);
} else {
  return fnFalse(arg);
}
```

For example:

```javascript
const fcon = e => e > 10;
const ftr = e => "isbig:" + e;
const ffa = e => "issmall:" + e;
let result1 = invokeIf(fcon)([ftr, ffa])(3);
console.log(result1); // issmall: 3
let isbig10 = invokeIf(fcon);
let result2 = isbig10([ftr, ffa])(11);
console.log(result2); // isbig: 11
let result3 = invokeIf(fcon, [ftr, ffa])(14);
console.log(result3); // isbig: 14
```

### invokeIfElseIf

the function is invoke if...elseif. it have currying

Use function:

```javascript
invokeIfElseIf(
  [
    [fnCondition1, fnResult1],
    [fnCondition2, fnResult2]
  ],
  data
);
invokeIfElseIf([
  [fnCondition1, fnResult1],
  [fnCondition2, fnResult2]
])(data);
```

both expression statments are equal to...

```javascript
if (fnCondition1(data)) {
  return fnResult1(data);
} else if (fnCondition2) {
  return fnResult2(data);
} else {
  return data;
}
```

For example:

```javascript
const fbig1000 = e => e > 1000;
const fbig100 = e => e > 100;
const fbig10 = e => e > 10;
const ftr1 = e => "isbig1000:" + e;
const ftr2 = e => "isbig100:" + e;
const ftr3 = e => "isbig10:" + e;
const ffa = e => "nobig10:" + e;
let result1 = invokeIfElseIf([
  [fbig1000, ftr1],
  [fbig100, ftr2],
  [fbig10, ftr3],
  [()=>true,ffa]
])(110);
console.log(result1); // isbig100:110
let result2 = invokeIfElseIf(
  [[fbig1000, ftr1], [fbig100, ftr2], [fbig10, ftr3]],
  3
);
console.log(result2); // 3
```

### invokeWhile and invokeDoWhile

the function is invoke "while" and "Do...while". it have currying.

Use function:

```javascript
invokeWhile(fnCondition, fnProcess, arg);
invokeWhile(fnCondition)(fnProcess, arg);
invokeWhile(fnCondition, fnProcess)(arg);
invokeWhile(fnCondition)(fnProcess)(arg);
invokeDoWhile(fnCondition, fnProcess, arg);
invokeDoWhile(fnCondition)(fnProcess, arg);
invokeDoWhile(fnCondition, fnProcess)(arg);
invokeDoWhile(fnCondition)(fnProcess)(arg);
```

those expression statments are equal to...

```javascript
While: while (fnCondition(arg)) {
  arg = fnProcess(arg);
}
return arg;

DoWhile: arg = fnProcess(arg);
while (fnCondition(arg)) {
  arg = fnProcess(arg);
}
return arg;
```

For example:

```javascript
let fcon = e => e < 10;
let fporc = e => e + 2;
let result1 = invokeWhile(fcon)(fporc)(3);
console.log(result1); // 11
let addTo10 = invokeWhile(fcon);
let result2 = invokeWhile(fcon, fporc, 3);
console.log(result2); // 11
let addOneTo10 = invokeWhile(fcon)(fporc);
let result3 = addOneTo10(3);
console.log(result3); // 11
```

### invokeSwitch

the function is invoke "Switch",

Use function:

```javascript
invokeSwitch(
  fnCondition,
  [
    [fnCase1, fnProcess1],
    [fnCase2, fnProcess2]
  ],
  data
);
invokeSwitch(fnCondition)(
  [
    [fnCase1, fnProcess1],
    [fnCase2, fnProcess2]
  ],
  data
);
invokeSwitch(fnCondition, [
  [fnCase1, fnProcess1],
  [fnCase2, fnProcess2]
])(data);
invokeSwitch(fnCondition)([
  [fnCase1, fnProcess1],
  [fnCase2, fnProcess2]
])(data);
```

both expression statments are equal to...

if fnCase1 is function and fnCase2 is not function

```javascript
switch (fnCondition(data)) {
  case:fnCase1(data) {
    fnProcess1(data)
  }
  case:fnCase2 {
    fnProcess2(data)
  }
}
```

For example:

```javascript
let fCond = e => `${e}${e}`;
let fCase1 = () => "成績為A";
let fCase2 = () => "成績為B";
let fCase3 = () => "成績為C";
let fCase4 = () => "成績為D";
let fDefault = () => "資料有錯，請檢查"
let CaseObj = [
  ["aa", fCase1],
  ["bb", fCase2],
  ["cc", fCase3],
  ["dd", fCase4],
  [fCond,fDefault]
];
let result1 = invokeSwitch(fCond)(CaseObj)("a");
console.log(result1); // 成績為A
let show1 = invokeSwitch(fCond);
let result2 = show1(CaseObj)("b");
console.log(result2); // 成績為B
let result3 = invokeSwitch(fCond)(CaseObj)("z");
console.log(result1); // 資料有錯，請檢查
```

