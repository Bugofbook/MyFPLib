const Switchfunction = fnCondition => fnCaseValueMap => arg => {
  let currentfrag = fnCondition(arg);
  let currentMap = new Map(fnCaseValueMap);
  let result = arg;
  currentMap.forEach((currentvalue, currentcase) => {
    if (typeof currentcase === "function" || currentcase(arg) === currentfrag)
      result = currentvalue(arg);
    else if (currentcase === currentfrag) result = currentvalue(arg);
  });
  return result;
};

const Switchfunction2 = fnCondition => (fnCaseValueMap, arg) => {
  return arg === undefined
    ? Switchfunction(fnCondition)(fnCaseValueMap)
    : Switchfunction(fnCondition)(fnCaseValueMap)(arg);
};
/**
 * The HOF for invoke "Switch"
 * @param {(arg: U) => any} fnCondition
 * a condition function
 * @param {Array} fnCaseValueMap
 * the Map construct by case and value (or you can use 2-dimention Array). every key of map is 'case' of 'Switch',it can be function or data type
 * @param {U} arg
 * the argments for fnCondition and every callback function in the fnCaseValueMap
 */
const invokeSwitch = function(fnCondition, fnCaseValueMap, arg) {
  if (arguments.length === 1) return Switchfunction2(fnCondition);
  else if (arguments.length === 2)
    return Switchfunction(fnCondition)(fnCaseValueMap);
  else if (arguments.length === 3)
    return Switchfunction(fnCondition)(fnCaseValueMap)(arg);
  else
    return console.error(
      `the number of arguments for invokeSwitch are illegal`
    );
};
// const invokeSwitch = fnCondition => fnCaseValueMap => arg => {
//   let targetKey = fnCondition(arg);
//   return fnCaseValueMap.hasOwnProperty(targetKey)
//     ? fnCaseValueMap[targetKey](arg)
//     : fnCaseValueMap["default"](arg);
// };
module.exports = invokeSwitch;
