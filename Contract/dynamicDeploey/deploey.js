'use strict'

const path = require('path')
const fs = require('fs')

const Account_build = require('./Account0-1.js')
const Account0_build = require('./Account0-2.js')

const Exchange_build = require('./Exchange0.js')

// "release" or "debug"
const mode = "debug"

const result = {}
module.exports = {
  init: function(callback) {
	let addr,addr0
	Account_build(mode,function(account_Address){
		result.Account = {
			address: account_Address
		}
		addr=account_Address
	})
	Account0_build(mode,function(account_Address){
		result.Account0 = {
			address: account_Address
		}
		addr0=account_Address
	})
	Exchange_build(mode,addr,addr0,function(exchange_address){

			result.exchange = {
				address: exchange_address
			}
		// load coinbase
		const config = require('./config.json')
		const provider = config[mode].provider
		const Web3 = require('web3')
		const web3 = new Web3(new Web3.providers.HttpProvider(provider))
		result.coinbase = web3.eth.coinbase
		result.provider = provider
		console.log(result);

		// in build dir
		fs.writeFileSync(path.resolve(__dirname, '../../script/', 'deployResult', 'result.json'), JSON.stringify(result, null, 4))
		// for frontend address
		const address_str = `var Account_address = '${result.Account.address}';
var Account0_address = '${result.Account0.address}';
var exchange_address = '${result.exchange.address}';`
		fs.writeFileSync(path.resolve(__dirname, '../../script/', 'deployResult', 'address.js'), address_str)

		// for frontend abi
		const Account_abi = fs.readFileSync(path.resolve(__dirname, '..', 'build', 'Account.abi'))
		const Exchange_abi = fs.readFileSync(path.resolve(__dirname, '..', 'build', 'Exchange.abi'))

		const abi_str = `var Account_abi = ${Account_abi};
var Exchange_abi = ${Exchange_abi};`
		fs.writeFileSync(path.resolve(__dirname, '../../script/', 'deployResult', 'abi.js'), abi_str)

		console.log('all good')


	})

      callback(result)
  }
};
