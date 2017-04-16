'use strict'

module.exports = (mode) => {
	const path = require('path')
	const fs = require('fs')

	const config = require('./config.json')

	const provider = config[mode].provider

	const Web3 = require('web3')
	const web3 = new Web3(new Web3.providers.HttpProvider(provider))

	const Account_abi = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', 'build', 'Account.abi')))
	const Account_bytecode = '0x' + fs.readFileSync(path.resolve(__dirname, '..', 'build', 'Account.bin')).toString()

	const Account = web3.eth.contract(Account_abi)
	const Account0 = web3.eth.contract(Account_abi)

	//let addr,addr0
	return (new Promise((res, rej) => {

		Account.new(
			"Company B"
			, {
			from: web3.eth.coinbase,
			gas: '4700000',
			data: Account_bytecode
		}, (err, Account) => {
			if (err) {
				return rej(err)
			}

			if (Account.address !== undefined && Account.address !== null) {
				console.log('Account_ADDRESS', Account.address)

				return res(Account.address)
			}
		})
		//console.log('deploey end');
	}))
}
