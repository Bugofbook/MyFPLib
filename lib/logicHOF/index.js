/**
 * the HOF for compose many function, it is equal to compose in redux.js
 */
const compose = (...fns) => arg =>
  fns.reduceRight((composed, f) => f(composed), arg);
/**
 * the HOF for compose many function, it is opposite to compose in redux.js
 */
const invokeCompose = (...fns) => arg =>
  fns.reduce((composed, f) => f(composed), arg);
/**
 * the HOF for invoke if 
 * @param {(arg: U ) => boolean} fnCondition
 *  a Condition function. fnCondition:  (arg) => Boolean
 * @param {(arg: U ) => U} fnTrue
 * call the  CallBack function When fnCondition return true. fnTrue: (arg) => any
 * @param {(arg: U ) => U} fnFalse
 * call the  CallBack function When fnCondition return true. fnTrue: (arg) => any
 * @param { U } arg
 * the arguments for fnCondition, fnTrue, fnFalse
 */
const invokeIf = fnCondition => (fnTrue, fnFalse) => arg =>
  fnCondition(arg) ? fnTrue(arg) : fnFalse(arg);
/**
 * the HOF for invoke "if...else-if...else"
 * @param  {Array[] } arrProcessfns
 * the Arrays of callBack functions.
 * for example：[fnCondition1,fnTrue1],[fnCondition2,fnTrue2],...,[fnConditionk,fnTruek],[fnfalse]
 * @param {U} arg
 * the argments for all function
 */
const invokeIfElseIf = (...arrProcessfns) => arg => {
  let [currentProcessfn, ...otherProcessfn] = arrProcessfns;
  return otherProcessfn.length === 0
    ? currentProcessfn[currentProcessfn.length - 1](arg)
    : invokeIf(
        currentProcessfn[0])(
        currentProcessfn[1],
        invokeIfElseIf(...otherProcessfn)
      )(arg);
};
/**
 * The HOF for invoke "While"
 * @param {(arg: U) => Boolean} fnCondition
 * a condition function. 
 * @param {(arg: U) => U} fnProcess
 * a callBack function ,we call fnProcess when fnCondition return true
 * @param {U} arg
 * a argments for fnCondition , fnProcess and " final  return" . it will change when every time we call fnProcess 
 */
const invokeWhile = fnCondition => fnProcess => arg => {
  return fnCondition(arg)
    ? invokeWhile(fnCondition)(fnProcess)(fnProcess(arg))
    : arg;
};
/**
 * The HOF for invoke "Do While"
 * @param {(arg: U) => Boolean} fnCondition
 * a condition function. 
 * @param {(arg: U) => U} fnProcess
 * a callBack function ,we call fnProcess when fnCondition return true
 * @param {U} arg
 * a argments for fnCondition , fnProcess and " final  return" . it will change when every time we call fnProcess 
 */
const invokeDoWhile = fnCondition => fnProcess => arg => {
  return fnCondition(arg)
    ? invokeWhile(fnCondition, fnProcess)(fnProcess(arg))
    : fnProcess(arg);
};
/**
 * The HOF for invoke "Switch"
 * @param {(arg: U) => String} fnCondition
 * a condition function, it return {String}
 * @param {Object} ObjCasefn
 * the Object For select "case".  every "key" is the value for "case" ,and its "value " are callBack function. you should add a key "default" for "default"
 * @param {U} arg
 * the argments for fnCondition and every callback function in the ObjCasefn
 */
const invokeSwitch = fnCondition => ObjCasefn => arg => {
  let targetKey = fnCondition(arg);
  return ObjCasefn.hasOwnProperty(targetKey)
    ? ObjCasefn[targetKey](arg)
    : ObjCasefn["default"](arg);
};
/**
 * the HOF for invoke "For"
 * @param {Number} doTime
 * a Number control how many time we call fnProcess. it need "Naturn Number"
 * @param {(arg: U) => U} fnProcess
 * a callBack function. 
 * @param {U} arg
 * a argments for fnProcess and " final  return" . it will change when every time we call fnProcess 
 */
const invokeFor = (doTime = 1) => fnProcess => arg => {
  return doTime === 0 ? arg : invokeFor(--doTime)(fnProcess)(fnProcess(arg));
};

module.exports=  {
  compose,
  invokeCompose,
  invokeIf,
  invokeIfElseIf,
  invokeWhile,
  invokeDoWhile,
  invokeSwitch,
  invokeFor
};
