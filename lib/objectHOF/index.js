//無效
export const sliceObject = keysArray => inputObject => {
  keysArray.reduce(
    (curObj, keyvalue) =>
      Object.assign(curObj, { [keyvalue]: inputObject[keyvalue] }),
    {}
  );
};
