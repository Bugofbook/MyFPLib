const Whilefunction = fnCondition => fnProcess => arg => {
  return fnCondition(arg)
    ? Whilefunction(fnCondition)(fnProcess)(fnProcess(arg))
    : arg;
};
/**
 * The HOF for invoke "While"
 * @param {(arg: U) => Boolean} fnCondition
 * a condition function. 
 * @param {(arg: U) => U} fnProcess
 * a callBack function ,we call fnProcess when fnCondition return true
 * @param {U} arg
 * a argments for fnCondition , fnProcess and " final  return" . it will change when every time we call fnProcess
 * @return
 * the callback function
 */
const invokeWhile = function (fnCondition ,fnProcess ,arg ) {
  if (arguments.length === 1)
    return Whilefunction(fnCondition)
  else if (arguments.length === 2)
    return Whilefunction(fnCondition)(fnProcess)
  else if (arguments.length === 3)
    return Whilefunction(fnCondition)(fnProcess)(arg)
  else 
    return console.error(`the number of arguments for invokeWhile are illegal`);
};
module.exports = invokeWhile