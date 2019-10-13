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

module.exports = invokeSwitch