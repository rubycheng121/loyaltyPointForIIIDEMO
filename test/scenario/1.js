'use strict'

const assert = require('assert')
const path = require('path')
const fs = require('fs')

const EventEmitter = require('events')
const emitter = new EventEmitter()
emitter.setMaxListeners(0)

let testConfig

const Web3 = require('web3')
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))


const Account_abi = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', '..', 'Contract', 'build', 'Account.abi')))
const Account_bytecode = '0x' + fs.readFileSync(path.resolve(__dirname, '..', '..', 'Contract', 'build', 'Account.bin')).toString()

const exchange_abi = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', '..', 'Contract', 'build', 'exchange.abi')))
const exchange_bytecode = '0x' + fs.readFileSync(path.resolve(__dirname, '..', '..', 'Contract', 'build', 'exchange.bin')).toString()

const Account = web3.eth.contract(Account_abi)
const Account0 = web3.eth.contract(Account_abi)
const exchange = web3.eth.contract(exchange_abi)

let Account,Account0,exchange


describe('Scenario 1 : Client account can be create and use', function () {
	this.timeout(0)

	before(function (done) {
		require('./resetContracts.js')(function () {
			testConfig =JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', 'config.json')))

			Account = web3.eth.contract(Account_abi).at(testConfig.Account.address)
			Account = web3.eth.contract(Account_abi).at(testConfig.Account0.address)
			exchange = web3.eth.contract(exchange_abi).at(testConfig.exchange.address)

			web3.eth.filter('latest', (err, blockNumber) => {
				web3.eth.getBlock(blockNumber, (err, block) => {
					if (!err) {
						block.transactions.forEach(txhash => {
							web3.eth.getTransactionReceipt(txhash, (err, txr) => {
								if (!err) {
									if (txr.gasUsed < 44444444) emitter.emit(txhash)
									else throw 'tx throwed!, gas == 44444444'
								} else {
									throw err
								}
							})
						})
					} else {
						throw err
					}
				})
			})

			done()
		})
	})

	describe('Create an user (Client)', function () {
		it('should has id:1, name:"RubyCheng", password:"123", points:10000', function (done) {
			companyContract.createUserAccount(1, 'RubyCheng', '123', 10000, {
				from: web3.eth.coinbase,
				gas: 44444444
			}, (err, txhash) => {
				if (err !== undefined && err !== null) done(err)
				else {
					emitter.once(txhash, () => {
						companyContract.getUser(1, (err, result) => {
							if (err !== undefined && err !== null) done(err)
							else {
								assert.strictEqual(result[0].toNumber(), 1)
								assert.strictEqual(result[1], 'RubyCheng')
								assert.strictEqual(result[2].toNumber(), 10000)
								done()
							}
						})
					})
				}
			})
		})
	})


	})
