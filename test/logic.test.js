const { invokeIf , invokeIfElseIf, invokeWhile, invokeSwitch} = require('../lib/logicHOF/index.js');

let fnConbig10 = (e) => e > 10
let fnConbig100 = (e) => e > 100
let fnConbig1000 = (e) => e > 1000
let fnResSmall11 = (e) => "is Smaill 11:" + e
let fnRes11To100 = (e) => "is between 11 and 100:" + e
let fnRes101To1000 = (e) => "is between 101 and 1000:" + e
let fnResBig1001 = (e) => "is Big 1001:" + e
let Number4 = () => 4
let Number14 = () => 14
let Number114 = () => 114
let Number1114 = () => 1114
let min3 = (e) => e - 3
describe("test invokeif", () => {
	it("test standand" , () => {
		expect(invokeIf(fnConbig10)(fnRes11To100,fnResSmall11)(Number4())).toBe("is Smaill 11:4")
	})
	const type2 = invokeIf(fnConbig10)
	it("test iftype2" , () => {
		expect(type2(fnRes11To100,fnResSmall11)(Number4())).toBe("is Smaill 11:4")
	})
	const type3 = invokeIf(fnConbig10)(fnRes11To100,fnResSmall11)
	it("test type3" , () => {
		expect(type3(Number4())).toBe("is Smaill 11:4")
	})
})

describe("test invokeIfElseIf", () => {
	const arrfn1 = [fnConbig1000,fnResBig1001]
	const arrfn2 = [fnConbig100,fnRes101To1000]
	const arrfn3 = [fnConbig10,fnRes11To100]
	const arrfn4 = [fnResSmall11]
	it("test standand" , () => {
		expect(invokeIfElseIf(arrfn1,arrfn2,arrfn3,arrfn4)(Number4())).toBe("is Smaill 11:4")
	})
	const type2 = invokeIfElseIf(arrfn1,arrfn2,arrfn3,arrfn4)
	it("test type2" , () => {
		expect(type2(Number4())).toBe("is Smaill 11:4")
	})
})

describe("test invokeWhile", () => {
	it("test standand" , () => {
		expect(invokeWhile(fnConbig10)(min3)(Number14())).toBe(8)
	})
	const type2 = invokeWhile(fnConbig10)
	it("test type2" , () => {
		expect(type2(min3)(Number14())).toBe(8)
	})
	const type3 = invokeWhile(fnConbig10)(min3);
	it("test type３" , () => {
	expect(type3(Number14())).toBe(8)
	})
})

describe("test invokeSwitch", () => {
	const CaseObj = {
		[Number1114()]: fnResBig1001,
		[Number114()]: fnRes101To1000,
		[Number14()]: fnRes11To100,
		"default": fnResSmall11,
	}

	it("test standand" , () => {
		expect(invokeSwitch(min3)(CaseObj)(Number4())).toBe("is Smaill 11:4")
	})
	const type2 = invokeSwitch(min3)
	it("test type2" , () => {
		expect(type2(CaseObj)(Number4())).toBe("is Smaill 11:4")
	})
	const type3 = invokeSwitch(min3)(CaseObj)
	it("test type3" , () => {
		expect(type3(Number4())).toBe("is Smaill 11:4")
	})
})
