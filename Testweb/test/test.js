const assert = require('assert')
const Web3 = require('web3')
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))
let Code

let Account_abi
let Exchange_abi
let LoyaltyPoint_abi

let Account_bytecode
let Exchange_bytecode
let LoyaltyPoint_bytecode

let AccountA_address
let AccountA_contract
let AccountB_address
let AccountB_contract

let Exchange_address
let Exchange_contract

let A_LocalLoyaltyPoint_address
let A_LocalLoyaltyPoint_contract
let A_BLoyaltyPoint_address
let A_BLoyaltyPoint_contract
let B_LocalLoyaltyPoint_address
let B_LocalLoyaltyPoint_contract
let B_ALoyaltyPoint_address
let B_ALoyaltyPoint_contract

describe('Scenario 0 : Deploy Contracts', function () {
	this.timeout(0)

	describe('deploeyAccountContract', function () {
		it('should deployed successfully', function (done) {
			done()
		})
	})

	describe('addPoints', function () {
		it('should deployed successfully', function (done) {
			done()
		})
	})

	describe('addLoyaltyPoint', function () {
		it('should deployed successfully', function (done) {
			done()
		})
	})

	describe('deploeyExchange_contract', function () {
		it('should deployed successfully', function (done) {
			done()
		})
	})

	describe('to', function () {
		it('should deployed successfully', function (done) {
			done()
		})
	})

	describe('getPoints', function () {
		it('should deployed successfully', function (done) {
			done()
		})
	})

})