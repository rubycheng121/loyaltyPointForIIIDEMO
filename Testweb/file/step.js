const { defineSupportCode } = require('cucumber')
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

defineSupportCode(function ({ Given, When, Then, And }) {

	Given('the exchange rate is {alp}alp={blp}blp', function (alp, blp, callback) {
		// Write code here that turns the phrase above into concrete actions
		let addressData = {}

		Code.deploeyAccountContract('Company A', (name, address) => {
			assert.ok(address, 'Company A address has been defined');
			addressData.companyA = {
				companyName: name,
				companyAddress: address
			}
			Code.deploeyAccountContract('Company B', (name, address) => {
				assert.ok(address, 'Company B address has been defined');
				addressData.companyB = {
					companyName: name,
					companyAddress: address
				}
				fs.writeFile(path.resolve(__dirname, '..', '..', 'build', 'contract.address'), JSON.stringify(addressData, null, 4), (err) => {
					assert.ifError(err);
					AccountA_address = addressData.companyA.companyAddress
					AccountB_address = addressData.companyB.companyAddress
					A_Contract = web3.eth.contract(Account_abi).at(AccountA_address)
					B_Contract = web3.eth.contract(Account_abi).at(AccountB_address)
					callback()
				});
			})
		})
	});

	Given('original alp account of A is {originalAlp}', function (originalAlp, callback) {
		A_LocalLoyaltyPointContract = web3.eth.contract(LoyaltyPoint_abi).at(A_Contract.getLocalLoyaltyPoint());
		Code.addPoints(A_LocalLoyaltyPointContract, originalAlp, (err, txhash) => {
			if (err !== undefined && err !== null) throw err
			else callback()
		})
	})

	Given('original blp account of A is {originalBlp}', function (originalBlp, callback) {
		Code.addLoyaltyPoint(A_Contract, 'Company B', originalBlp, 50, (err, txhash) => {
			if (err !== undefined && err !== null) throw err
			else callback()
		})
	});

	Given('original alp account of B is {originalAlp}', function (originalAlp, callback) {
		Code.addLoyaltyPoint(B_Contract, 'Company A', originalAlp, 150, (err, txhash) => {
			if (err !== undefined && err !== null) throw err
			else callback()
		})
	});

	Given('original blp account of B is {originalBlp}', function (originalBlp, callback) {
		B_LocalLoyaltyPoint_contract = web3.eth.contract(LoyaltyPoint_abi).at(B_Contract.getLocalLoyaltyPoint());
		Code.addPoints(B_LocalLoyaltyPointContract, originalBlp, (err, txhash) => {
			if (err !== undefined && err !== null) throw err
			else callback()
		})
	});

	When('A want to exchange {exchangingAlp} alp for blp', function (exchangingAlp, callback) {
		Code.deploeyExchange_contract(AccountA_address, AccountB_address, (myAddress, partnerAddress, address) => {
			Exchange_contract = web3.eth.contract(Exchange_abi).at(address);
			Code.to(ExchangeContract, 'Company A', 'Company B', exchangingAlp, (err, txhash) => {
				if (err !== undefined && err !== null) throw err
				else callback()
			})
		})
	});

	Then('alp account of A should be {resultAlp}', function (resultAlp, callback) {
		if (A_LocalLoyaltyPoint_contract.getPoints() == resultAlp) {
			callback();
		}
		else {
			throw "A_LocalLoyaltyPointContract.getPoints() = " + A_LocalLoyaltyPointContract.getPoints();
		}
	});


	Then('blp account of A should be {resultBlp}', function (resultBlp, callback) {
		A_BLoyaltyPointContract = web3.eth.contract(LoyaltyPoint_abi).at(A_Contract.getLoyaltyPoint('Company B'));
		if (A_BLoyaltyPoint_contract.getPoints() == resultBlp) {
			callback();
		}
		else {
			throw "A_BLoyaltyPointContract.getPoints() = " + A_BLoyaltyPointContract.getPoints();
		}
	});

	Then('alp account of B should be {resultBlp}', function (resultBlp, callback) {
		B_ALoyaltyPointContract = web3.eth.contract(LoyaltyPoint_abi).at(B_Contract.getLoyaltyPoint('Company A'));
		if (B_ALoyaltyPoint_contract.getPoints() == resultBlp) {
			callback();
		}
		else {
			throw "B_ALoyaltyPointContract.getPoints() = " + B_ALoyaltyPointContract.getPoints();
		}
	});


	Then('blp account of B should be {resultBlp}', function (resultBlp, callback) {
		if (B_LocalLoyaltyPoint_contract.getPoints() == resultBlp) {
			callback();
		}
		else {
			throw "B_LocalLoyaltyPointContract.getPoints() = " + B_LocalLoyaltyPointContract.getPoints();
		}
	});

});
