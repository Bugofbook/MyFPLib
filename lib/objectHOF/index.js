/**
 * the function can slice target key and value By a special Array From Object.
 * @param {Array} keysArray
 * the keys of Array we slice from Object
 * @param {Object} inputObject
 * the old Object we slice from
 * @return {Object} outputObject
 * the new Object we Slice to
 */
const sliceObjectByArray = (keysArray = []) => (
  inputObject = {},
  outputObject = {}
) => {
  let [currentkeys, ...otherkeys] = keysArray;
  let newObject = inputObject.hasOwnProperty(currentkeys)
    ? { [currentkeys]: inputObject[currentkeys] }
    : {};
  return otherkeys.length === 0
    ? Object.assign(outputObject, newObject)
    : sliceObjectByArray(...otherkeys)(
        inputObject,
        Object.assign(outputObject, newObject)
      );
};
/**
 * rename some kets of Object By special Arrays
 * @param  {Array} keyArrays
 * the Arrays with old key and new key. ["oldkey","newkey"]
 * @param {Object} inputObject
 * the old Object we want to rename key
 * @return {Object}
 * the new Object has being rename key
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
  let [currentArray, ...otherArray] = keyArrays;
  let newObject = inputObject.hasOwnProperty(currentArray[0])
    ? { [currentArray[1]]: inputObject[currentArray[0]] }
    : {};
  delete inputObject[currentArray[0]];
  return otherArray.length === 0
    ? Object.assign(inputObject, newObject)
    : renameObjectKeys(...otherArray)(Object.assign(inputObject, newObject));
};

/**
 * Use keysArray to make new Object
 *
 */
const MakeObjectByArray = (keysArray = []) => (dataArray = []) =>
  keysArray
    .map((e, index) => (e !== "" ? { [e]: dataArray[index] } : {}))
    .reduce(({ ...preobj }, { ...curobj }) => ({ ...preobj, ...curobj }), {});

const createSingletonObg = (findKeyName, setKeyName) => (
  keyData,
  stateData
) => ({ [setKeyName]: [{ ...stateData }], [findKeyName]: keyData });

const addIntoSingetonObj = setKeyName => (
  keyData,
  { [setKeyName]: aaa, ...others }
) => ({ ...others, [setKeyName]: [...aaa, keyData] });

/***
 * Use Singleton to separate objects into new object
 * @param {String} findKeyName
 * the name of key we use to check new object is singleton or not.
 * @param {String} setKeyName
 * the name of key we use to save data in singleton-object.
 * @param {Array} data
 * the object we will separate.
 */
const separateObjectIntoSingletonObjects = (
  findKeyName = "",
  setKeyName = ""
) => (data = []) =>
  data.reduce(
    (preArray, { [findKeyName]: curObjFindKey, ...curObjOtherskey }) => {
      let newindex = preArray.findIndex(
        element => element[findKeyName] === curObjFindKey
      );
      if (newindex === -1)
        return preArray.concat(
          createSingletonObg(findKeyName, setKeyName)(
            curObjFindKey,
            curObjOtherskey
          )
        );
      else
        return preArray.map((e, index) =>
          index === newindex
            ? addIntoSingetonObj(setKeyName)(curObjOtherskey, e)
            : e
        );
    },
    []
  );

export {
  sliceObjectByArray,
  renameObjectKeys,
  MakeObjectByArray,
  separateObjectIntoSingletonObjects
};
