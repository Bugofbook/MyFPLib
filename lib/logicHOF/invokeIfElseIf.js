const IFfunction = fnCondition => ([fnTrue, fnFalse = f => f]) => arg => {
  if (typeof fnCondition !== "function")
    return console.error(`the fnCondition of invokeIf is not function`);
  else if (typeof fnTrue !== "function")
    return console.error(`the fnTrue of invokeIf is not function`);
  else return fnCondition(arg) ? fnTrue(arg) : fnFalse(arg);
};

const IfElseIffunction = (
  [currentProcessfn, ...otherProcessfn] = [[]]
) => arg => {
  return otherProcessfn.length === 0
    ? currentProcessfn[currentProcessfn.length - 1](arg)
    : IFfunction(currentProcessfn[0])([
        currentProcessfn[1],
        IfElseIffunction(...otherProcessfn)
      ])(arg);
};
/**
 * the HOF for invoke "if...else-if...else"
 * @param  {Array[]} arrProcessfns
 * the Arrays of callBack functions.
 * for example：[[fnCondition1,fnTrue1],[fnCondition2,fnTrue2],...,[fnConditionk,fnTruek],[fnfalse]]
 * @param {U} arg
 * the argments for all function
 */
const invokeIfElseIf = function(arrProcessfns = [], arg) {
  if (arguments.length === 1) return IfElseIffunction(arrProcessfns);
  else if (arguments.length === 2) return IfElseIffunction(arrProcessfns)(arg);
  else return console.error(`the number of arguments for invokeIf are illegal`);
};

module.exports = invokeIfElseIf;
