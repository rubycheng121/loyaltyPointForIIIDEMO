'use strict'

const Web3 = require('web3')
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))

let Account_abi
let Account_bytecode

let Exchange_abi
let Exchange_bytecode

let LoyaltyPoint_abi
let LoyaltyPoint_bytecode

let Account = web3.eth.contract(Account_abi)
let Account0 = web3.eth.contract(Account_abi)
let exchange = web3.eth.contract(Exchange_abi)

let addr,addr0,Account_address,Account0_address,exchange_address

describe('Scenario 0 : Deploy Contracts', function () {
	this.timeout(0)

	describe('Account0 Contract', function () {


	})
	describe('Account1 Contract', function () {

	})

	describe('exchange Contract', function () {

	})
})
