const Forfunction = (doTime = 1) => fnProcess => arg => {
  if (Number.isInteger( doTime) && doTime > 0)
    return console.error(`the number of iterations is not Nature number`); 
  else
    return doTime === 0 ? arg : Forfunction(--doTime)(fnProcess)(fnProcess(arg));
};
/**
 * the HOF for invoke "For"
 * @param {(arg: U) => U} doTimefn
 * a function control how many time we call fnProcess. it may callback "Naturn Number"
 * @param {(arg: U) => U} fnProcess
 * a callBack function. 
 * @param {U} arg
 * a argments for fnProcess and " final  return" . it will change when every time we call fnProcess 
 */
const invokeFor = function (doTimefn , fnProcess , arg){
  if (arguments.length === 1)
    return Forfunction(doTimefn(arg))
  else if (arguments.length === 2)
    return Forfunction(doTimefn(arg))(fnProcess)
  else if (arguments.length === 3)
    return Forfunction(doTimefn(arg))(fnProcess)(arg)
   else
    return console.error(`the number of arguments for invokeFor are illegal`); 
};

module.exports = invokeFor