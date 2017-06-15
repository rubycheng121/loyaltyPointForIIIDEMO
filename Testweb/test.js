'use strict'

const path = require('path')
const fs = require('fs')

const Web3 = require('web3')
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))

const Account_abi = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', '..','build', 'Account.abi')))
const Account_bytecode = '0x' + fs.readFileSync(path.resolve(__dirname, '..','..', 'build', 'Account.bin')).toString()

const exchange_abi = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', '..', 'build', 'exchange.abi')))
const exchange_bytecode = '0x' + fs.readFileSync(path.resolve(__dirname, '..', '..', 'build', 'exchange.bin')).toString()

const Account = web3.eth.contract(Account_abi)
const Account0 = web3.eth.contract(Account_abi)
const exchange = web3.eth.contract(exchange_abi)

let addr,addr0,Account_address,Account0_address,exchange_address

describe('Scenario 0 : Deploy Contracts', function () {
	this.timeout(0)

	describe('Account0 Contract', function () {
		it('should deployed successfully', function (done) {

		Account.new("company A", {
			from: web3.eth.coinbase,
			gas: '4700000',
			data: Account_bytecode
		}, (err, Contract) => {
				if (err !== undefined && err !== null)
					done(err)
				if (Contract.address !== undefined && Contract.address !== null) {
					Account_address = Contract.address
					addr=Account_address
					done()
				}
			})
		})
	})
	describe('Account1 Contract', function () {
		it('should deployed successfully', function (done) {

		Account.new("company B", {
			from: web3.eth.coinbase,
			gas: '4700000',
			data: Account_bytecode
		}, (err, Contract) => {
				if (err !== undefined && err !== null)
					done(err)
				if (Contract.address !== undefined && Contract.address !== null) {
					Account0_address = Contract.address
					addr0=Account0_address
					done()
				}
			})
		})
	})


	describe('exchange Contract', function () {
		it('should deployed successfully', function (done) {
			exchange.new(addr,addr0, {
				from: web3.eth.coinbase,
				gas: 44444444,
				data: exchange_bytecode
			}, (err, Contract) => {
				if (err !== undefined && err !== null)
					done(err)
				if (Contract.address !== undefined && Contract.address !== null) {
					exchange_address = Contract.address
					done()
				}
			})
		})
	})

	describe('Writing deploy result config', function () {
		it('should wrote in config.json', function (done) {
			fs.writeFile(path.resolve(__dirname, '..', 'config.json'), JSON.stringify({
				Account: {
					address: Account_address
				},
				Account0: {
					address: Account0_address
				},
				exchange: {
					address: exchange_address
				}
			}, null, '\t'), err => {
				if (err !== undefined && err !== null) done(err)
				else done()
			})
		})
	})
})
