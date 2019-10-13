const { compose, invokeCompose, invokeIf, invokeIfElseIf, invokeWhile, invokeDoWhile, invokeFor, invokeSwitch} = require("./lib/logicHOF");
const { sliceObjectByArray, renameObjectKeys} = require("./lib/objectHOF")

module.exports = {
  compose,
  invokeCompose,
  invokeIf,
  invokeIfElseIf,
  invokeWhile,
  invokeDoWhile,
  invokeFor,
  invokeSwitch,
  sliceObjectByArray,
  renameObjectKeys,
};
