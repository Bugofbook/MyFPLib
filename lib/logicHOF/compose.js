/**
 * the HOF for compose many function, it is equal to compose in redux.js
 */
const compose = (...fns) => arg =>
	fns.reduceRight((composed, f) => f(composed), arg);
	
	module.exports = compose