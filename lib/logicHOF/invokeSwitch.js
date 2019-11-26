const Switchfunction = fnCondition => caseValueMap => arg => {
  let currentfrag = fnCondition(arg)
  let currentMap = new Map(caseValueMap)
  let result = arg
  currentMap.forEach((currentvalue,currentcase) => {
    if ((typeof currentcase === 'function') || currentcase(arg) === currentfrag)
      result = currentvalue(arg)
    else if (currentcase === currentfrag)
      result = currentvalue(arg)
  })
  return result
}

/**
 * The HOF for invoke "Switch"
 * @param {(arg: U) => any} fnCondition
 * a condition function
 * @param {Array} caseValueMap
 * the Map construct by case and value (or you can use 2-dimention Array). every key of map is 'case' of 'Switch',it can be function or data type
 * @param {U} arg
 * the argments for fnCondition and every callback function in the caseValueMap
 */
const invokeSwitch = function (fnCondition , caseValueMap , arg) {
  if (arguments.length === 1)
    return Switchfunction(fnCondition)
  else if (arguments.length === 2)
    return  Switchfunction(fnCondition)(caseValueMap)
  else if (arguments.length === 3)
    return Switchfunction(fnCondition)(caseValueMap)(arg)
  else
    return console.error(`the number of arguments for invokeSwitch are illegal`);
  };
// const invokeSwitch = fnCondition => caseValueMap => arg => {
//   let targetKey = fnCondition(arg);
//   return caseValueMap.hasOwnProperty(targetKey)
//     ? caseValueMap[targetKey](arg)
//     : caseValueMap["default"](arg);
// };
module.exports = invokeSwitch