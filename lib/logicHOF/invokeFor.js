/**
 * the HOF for invoke "For"
 * @param {Number} doTime
 * a Number control how many time we call fnProcess. it need "Naturn Number"
 * @param {(arg: U) => U} fnProcess
 * a callBack function. 
 * @param {U} arg
 * a argments for fnProcess and " final  return" . it will change when every time we call fnProcess 
 */
const invokeFor = (doTime = 1) => fnProcess => arg => {
  return doTime === 0 ? arg : invokeFor(--doTime)(fnProcess)(fnProcess(arg));
};

module.exports = invokeFor