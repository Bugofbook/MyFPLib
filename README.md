# FP fonction

function in there can Currying.

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

the function is invoke if. it have currying

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
console.log(result3); // isbig: 114
```

### invokeIfElseIf

the function is invoke if...elseif. it have currying

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
  [ffa]
])(110);
console.log(result1); // isbig100:110
let result2 = invokeIfElseIf(
  [[fbig1000, ftr1], [fbig100, ftr2], [fbig10, ftr3], [ffa]],
  13
);
console.log(result2); // isbig10:13
```

## 222

111
