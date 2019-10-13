const invokeIf = fnCondition => ([fnTrue, fnFalse]) => arg =>
	fnCondition(arg) ? fnTrue(arg) : fnFalse(arg);
/**
 * the HOF for invoke "if...else-if...else"
 * @param  {Array[] arrProcessfns
 * the Arrays of callBack functions.
 * for example：[[fnCondition1,fnTrue1],[fnCondition2,fnTrue2],...,[fnConditionk,fnTruek],[fnfalse]]
 * @param {U} arg
 * the argments for all function
 */
const invokeIfElseIf = (arrProcessfns) => arg => {
  let [currentProcessfn, ...otherProcessfn] = arrProcessfns;
  return otherProcessfn.length === 0
    ? currentProcessfn[currentProcessfn.length - 1](arg)
    : invokeIf(currentProcessfn[0])([currentProcessfn[1], invokeIfElseIf(...otherProcessfn)])(arg);
};

module.exports = invokeIfElseIf