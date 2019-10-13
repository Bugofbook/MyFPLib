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
const invokeIf = fnCondition => ([fnTrue, fnFalse]) => arg =>
	fnCondition(arg) ? fnTrue(arg) : fnFalse(arg);
	
	module.exports = invokeIf