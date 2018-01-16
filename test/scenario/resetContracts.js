'use strict'

module.exports = callback => {
	const path = require('path')
	const fs = require('fs')

	const Web3 = require('web3')
	const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))

	const projectContract_abi = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', 'build', 'projectContract.abi')))
	const projectContract_bytecode = '0x' + fs.readFileSync(path.resolve(__dirname, '..', 'build', 'projectContract.bin')).toString()

	const companyContract_abi = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', '..', 'build', 'company.abi')))
	const companyContract_bytecode = '0x' + fs.readFileSync(path.resolve(__dirname, '..', '..', 'build', 'company.bin')).toString()

	const projectContract = web3.eth.contract(projectContract_abi)
	const companyContract = web3.eth.contract(companyContract_abi)

	let projectContract_address
	let companyContract_address
	const _rate =80 /* var of type uint256 here */ ;
	const company1ID =1 /* var of type uint256 here */ ;
	const company1name ='A' /* var of type string here */ ;
	const company2ID =2 /* var of type uint256 here */ ;
	const company2name ='B' /* var of type string here */ ;


	projectContract.new(
		_rate,
		company1ID,
		company1name,
		company2ID,
		company2name, {
		from: web3.eth.coinbase,
		gas: '4700000',
		data: projectContract_bytecode
	}, (err, projectContract) => {
		if (err !== undefined && err !== null)
			console.log(err)
		if (projectContract.address !== undefined && projectContract.address !== null) {
			projectContract_address = projectContract.address

					companyContract.new({
						from: web3.eth.coinbase,
						gas: 44444444,
						data: companyContract_bytecode
					}, (err, companyContract) => {
						if (err !== undefined && err !== null)
							console.log(err)
						if (companyContract.address !== undefined && companyContract.address !== null) {
							companyContract_address = companyContract.address

							fs.writeFile(path.resolve(__dirname, '..', 'config.json'), JSON.stringify({
								projectContract: {
									address: projectContract_address
								},
								companyContract: {
									address: companyContract_address
								}
							}, null, '\t'), err => {
								if (err !== undefined && err !== null) console.log(err)
								else callback()
							})
						}
					})
				}

	})
}
