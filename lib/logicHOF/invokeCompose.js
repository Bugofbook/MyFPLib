/**
 * the HOF for compose many function, it is opposite to compose in redux.js
 */
const invokeCompose = (...fns) => arg =>
	fns.reduce((composed, f) => f(composed), arg);
	
	module.exports = invokeCompose