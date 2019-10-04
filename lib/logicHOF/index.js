//
/**
 * 組合函數用的HOF,和redux.js的compose函數用法相同
 * @param {} fns
 * 函式參數群
 * @param {} arg
 * 輸入的參數
 * @returns {(arg: U ) => U}
 * 把函式參數由右至左組合起來的函式群
 */
// 例子：
// let push1 = (arr) => arr.concat([1])
// let push2 = (arr) => arr.concat([2])
// let pushNo = (no) => (arr).concat([no])
// let startArr = [0]
// let result = compose(pushNo(3),push2,push1)(startArr)
// console.log(result)
const compose = (...fns) => arg =>
  fns.reduceRight((composed, f) => f(composed), arg);
/**
 * 組合函數用的HOF,和redux.js的compose函數用法相反
 * @param {} fns
 * 函式參數群
 * @param {} arg
 * 輸入的參數
 * @returns {(arg: U ) => U}
 * 把函式參數由左至右組合起來的函式群
 */
const invokeCompose = (...fns) => arg =>
  fns.reduce((composed, f) => f(composed), arg);
/**
 * 模擬if函式的HOF
 * @param {(arg: U ) => boolean} fnCondition
 * 回傳值為布林值的條件函式
 * @param {(arg: U ) => U} fnTrue
 * 如果fnCondition的回傳值為true，就呼叫fnTrue函式
 * @param {(arg: U ) => U} fnFalse
 * 如果fnCondition的回傳值為false，就呼叫fnFalse函式
 * @param { U } arg
 * 輸入的參數
 */
// let fcon = (e) => e > 10
// let ftr = (e) => "isbig:" + e
// let ffa = (e) => "Nobig:" + e
// let isbig10 = invokeIf(fcon)
// let result1 = invokeIf(fcon)(ftr,ffa)(3)
// console.log(result1)
// let isbig10 = invokeIf(fcon)
// let result2 = isbig10(ftr,ffa)(11)
// console.log(result2)
// let show10 = isbig(ftr,ffa)
// let result3 = show10(5)
// console.log(result3)
const invokeIf = fnCondition => (fnTrue, fnFalse) => arg =>
  fnCondition(arg) ? fnTrue(arg) : fnFalse(arg);
/**
 * 模擬if...else-if...else函式的HOF
 * @param  {...[fnCondition: (arg: U) => boolean, fnTrue: (arg: U) => U] } arrProcessfns
 * 處理陣列:
 * 例如：[[fnCondition1,fnTrue1],[fnCondition2,fnTrue2],...,[fnConditionk,fnTruek],[fnfalse]]
 * @param {U} arg
 * 輸入的參數
 */
// let fbig1000 = (e) => e > 1000
// let fbig100 = (e) => e > 100
// let fbig10 = (e) => e > 10
// let ftr1 = (e) => "isbig1000:" + e
// let ftr2 = (e) => "isbig100:" + e
// let ftr3 = (e) => "isbig10:" + e
// let ffa = (e) => "nobig10:" + e
// let result1 = invokeIfElseIf([fbig1000,ftr1],[fbig100,ftr2],[fbig10,ftr3],[ffa])(110)
// console.log(result1)
// let show1000 = invokeIfElseIf([fbig1000,ftr1],[fbig100,ftr2],[fbig10,ftr3],[ffa])
// let result2 = show1000(13)
// console.log(result2)
const invokeIfElseIf = (...arrProcessfns) => arg => {
  let [currentProcessfn, ...otherProcessfn] = arrProcessfns;
  return otherProcessfn.length === 0
    ? currentProcessfn[0](arg)
    : invokeIf(
        currentProcessfn[0],
        currentProcessfn[1],
        invokeIfElseIf(...otherProcessfn)
      )(arg);
};
/**
 * 模擬While函式的HOF
 * @param {(arg: U) => Boolean} fnCondition
 * 回傳值為布林值的條件函式
 * @param {(arg: U) => U} fnProcess
 * 如果fnCondition的回傳值為ture，就呼叫fnProcess
 * @param {U} arg
 * 輸入的參數
 */
// let fcon = (e) => e < 10
// let fporc = (e) => e += 1
// let result1 = invokeWhile(fcon)(fporc)(3)
// console.log(result1)
// let addTo10 = invokeWhile(fcon)
// let result2 = addTo10(fporc)(3)
// console.log(result2)
// let addOneTo10 = addTo10(fporc)
// let result3 = addOneTo10(3)
// console.log(result3)
const invokeWhile = fnCondition => fnProcess => arg => {
  return fnCondition(arg)
    ? invokeWhile(fnCondition)(fnProcess)(fnProcess(arg))
    : arg;
};
/**
 * 模擬DoWhile函式的HOF
 * @param {(arg: U) => Boolean} fnCondition
 * 回傳值為布林值的條件函式
 * @param {(arg: U) => U} fnProcess
 * 如果fnCondition的回傳值為ture，就呼叫fnProcess
 * @param {U} arg
 * 輸入的參數
 */
const invokeDoWhile = (fnCondition, fnProcess) => arg => {
  return fnCondition(arg)
    ? invokeWhile(fnCondition, fnProcess)(fnProcess(arg))
    : fnProcess(arg);
};
/**
 * 模擬Switch函式的HOF
 * @param {(arg: U) => String} fnCondition
 * 回傳值為字串的條件函式
 * @param {Object} ObjCasefn
 * 以fnCondition的回傳值為key，在ObjCasefn中找到對應的fnCase，建議ObjCasefn中有一個名為"default"的鍵值
 * @param {U} arg
 * 輸入的參數
 */
let fCond = e => e + e;
let fCase1 = e => "成績為A";
let fCase2 = e => "成績為B";
let fCase3 = e => "成績為C";
let fCase4 = e => "成績為D";
let fdefault = e => "成績為E";
let CaseObj = {
  aa: fCase1,
  bb: fCase2,
  cc: fCase3,
  dd: fCase4,
  default: fdefault
};
// let result1 = invokeSwitch(fCond)(CaseObj)("a")
// console.log(result1)
// let show1 = invokeSwitch(fCond)
// let result2 = show1(CaseObj)("b")
// console.log(result2)
// let showk = show1(CaseObj)
// let result2 = showk("g")
// console.log(result2)
const invokeSwitch = fnCondition => ObjCasefn => arg => {
  let targetKey = fnCondition(arg);
  return ObjCasefn.hasOwnProperty(targetKey)
    ? ObjCasefn[targetKey](arg)
    : ObjCasefn["default"](arg);
};
/**
 * 模擬For函式的HOF
 * @param {Number} doTime
 * 迴圈次數
 * @param {(arg: U) => U} fnProcess
 * 處理函式
 * @param {U} arg
 * 輸入的參數
 */
const invokeFor = (doTime = 1) => fnProcess => arg => {
  return doTime === 0 ? arg : invokeFor(--doTime)(fnProcess)(fnProcess(arg));
};

export {
  compose,
  invokeCompose,
  invokeIf,
  invokeIfElseIf,
  invokeWhile,
  invokeDoWhile,
  invokeSwitch,
  invokeFor
};
