/**
 * 從物件中取出指定鍵值的HOF
 * @param {Array} keysArray
 * 指定鍵值的陣列
 * @param {Object} inputObject
 * 目標物件
 */
// let oldObject = () => { a: 1, b: 2, c: 3,d: 4};
// let keyArray = () => ["a","b","e"]
// let result1 = sliceObjectByArray(keyArray)(oldObject)
// console.log(result1)
// let catchKeysABE = sliceObjectByArray(keyArray)
// let result2 = catchKeysABE(oldObject)
const  sliceObjectByArray = (keysArray = [] ) => (inputObject = {} ,outputObject = {}) => {
  let [currentkeys,...otherkeys] = keysArray
  let newObject = (inputObject.hasOwnProperty(currentkeys)) ? { [currentkeys]: inputObject[currentkeys]}  : {}
  return otherkeys.length === 0  ? Object.assign(outputObject,newObject) : sliceObjectByArray(...otherkeys)(inputObject,Object.assign(outputObject,newObject))
}
/**
 * 把目標物件中舊的指定鍵值改成新的
 * @param  {Array} keyArrays 
 * 一串要改的舊新鍵值陣列，["舊鍵值","新鍵值"]
 * @param {Object} inputObject
 * 目標物件
 */
// let AToAA = () => ["a","aa"]
// let BToBB = () => ["b","bb"]
// let DToDD = () => ["d","dd"]
// let GToGG = () => ["g","gg"]
//  let oldObject = () => { a: 1, b: 2, c: 3,d: 4};
// let result1 = renameObjectKeys(AToAA,BToBB,DToDD,GToGG)(oldObject)
// console.log(result1)
// let ABDGTODouble = renameObjectKeys(AToAA,BToBB,DToDD,GToGG)
// let result2 = ABDGTODouble(oldObject)
// console.log(result2)
const renameObjectKeys = (...keyArrays) => (inputObject = {}) => {
  let [currentArray,...otherArray] = keyArrays
  let newObject = (inputObject.hasOwnProperty(currentArray[0])) ? { [currentArray[1]]: inputObject[currentArray[0]]}  : {}
  delete inputObject[currentArray[0]]
  return otherArray.length === 0  ? Object.assign(inputObject,newObject) : renameObjectKeys(...otherArray)(Object.assign(inputObject,newObject))
}