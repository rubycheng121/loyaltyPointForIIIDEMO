'use strict'

module.exports = (mode,addr,addr0,callback) => {
	const path = require('path')
	const fs = require('fs')

	const config = require('./config.json')

	const provider = config[mode].provider

	const Web3 = require('web3')
	const web3 = new Web3(new Web3.providers.HttpProvider(provider))

	const exchange_abi = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', 'build', 'exchange.abi')))
	const exchange_bytecode = '0x' + fs.readFileSync(path.resolve(__dirname, '..', 'build', 'exchange.bin')).toString()

	const exchange = web3.eth.contract(exchange_abi)


	//console.log('addr:'+addr);
	//console.log('addr0:'+addr0);

	return (new Promise((res, rej) => {

		exchange.new(
			addr,
			addr0
			, {
			from: web3.eth.coinbase,
			gas: '4700000',
			data: exchange_bytecode
		}, (err, exchange) => {
			if (err) {
				return rej(err)
			}

			if (exchange.address !== undefined && exchange.address !== null) {
				console.log('exchange_ADDRESS', exchange.address)
				callback(exchange.address)
			}
		})
		//console.log('deploey end');
	}))
}
