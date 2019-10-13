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

module.exports = invokeWhile