const DoWhilefunction = fnCondition => fnProcess => arg => {
  return fnCondition(arg)
    ? DoWhilefunction(fnCondition)(fnProcess)(fnProcess(arg))
    : fnProcess(arg);
};

const DoWhilefunction2 = fnCondition => (fnProcess, arg) => {
  return arg === undefined
    ? DoWhilefunction(fnCondition)(fnProcess)
    : DoWhilefunction(fnCondition)(fnProcess)(arg);
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
const invokeDoWhile = function(fnCondition, fnProcess, arg) {
  if (arguments.length === 1) return DoWhilefunction2(fnCondition);
  else if (arguments.length === 2)
    return DoWhilefunction(fnCondition)(fnProcess);
  else if (arguments.length === 3)
    return DoWhilefunction(fnCondition)(fnProcess)(arg);
  else
    return console.error(
      `the number of arguments for invokeDoWhile are illegal`
    );
};
module.exports = invokeDoWhile;
