const IFfunction = fnCondition => ([fnTrue, fnFalse = f => f]) => arg => {
  if (typeof fnCondition !== "function")
    return console.error(`the fnCondition of invokeIf is not function`);
  else if (typeof fnTrue !== "function")
    return console.error(`the fnTrue of invokeIf is not function`);
  else return fnCondition(arg) ? fnTrue(arg) : fnFalse(arg);
};
const IFfunction2 = fnCondition => ([fnTrue, fnFalse], arg) =>
  arg === undefined
    ? IFfunction(fnCondition)([fnTrue, fnFalse])
    : IFfunction(fnCondition)([fnTrue, fnFalse])(arg);

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
 * @return
 * the callback function
 */
const invokeIf = function(fnCondition, [fnTrue, fnFalse], arg) {
  if (arguments.length === 1) {
    return IFfunction2(fnCondition);
  } else if (arguments.length === 2) {
    return IFfunction(fnCondition)([fnTrue, fnFalse]);
  } else if (arguments.length === 3) {
    return IFfunction(fnCondition)([fnTrue, fnFalse])(arg);
  } else {
    return console.error(`the number of arguments for invokeIf are illegal`);
  }
};

module.exports = invokeIf;
