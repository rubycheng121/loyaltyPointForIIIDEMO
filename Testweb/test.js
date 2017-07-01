'use strict'

const path = require('path')
const fs = require('fs')

const Web3 = require('web3')
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))

const Account_abi = [{"constant":false,"inputs":[{"name":"companyName","type":"bytes32"},{"name":"points","type":"int256"},{"name":"rate","type":"uint256"}],"name":"addLoyaltyPoint","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getCompanyName","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getLocalLoyaltyPoint","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"name","type":"bytes32"}],"name":"getLoyaltyPoint","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"inputs":[{"name":"_companyName","type":"bytes32"}],"payable":false,"type":"constructor"}]
const Account_bytecode = '0x6060604052341561000c57fe5b60405160208061064083398101604052515b60008181558181600161002f61008a565b92835260208301919091526040808301919091525190819003606001906000f080151561005857fe5b6000805481526001602052604090208054600160a060020a031916600160a060020a03831617905590505b505061009a565b6040516101c98061047783390190565b6103ce806100a96000396000f300606060405263ffffffff7c010000000000000000000000000000000000000000000000000000000060003504166318e48622811461005b57806343cfbd6514610090578063a8753d58146100b2578063bbf45cee146100de575bfe5b341561006357fe5b61007460043560243560443561010d565b60408051600160a060020a039092168252519081900360200190f35b341561009857fe5b6100a0610187565b60408051918252519081900360200190f35b34156100ba57fe5b61007461018e565b60408051600160a060020a039092168252519081900360200190f35b34156100e657fe5b6100746004356101ab565b60408051600160a060020a039092168252519081900360200190f35b6000600084848461011c6101c9565b92835260208301919091526040808301919091525190819003606001906000f080151561014557fe5b6000868152600160205260409020805473ffffffffffffffffffffffffffffffffffffffff1916600160a060020a03831617905591508190505b509392505050565b6000545b90565b60008054815260016020526040902054600160a060020a03165b90565b600081815260016020526040902054600160a060020a03165b919050565b6040516101c9806101da8339019056006060604052341561000c57fe5b6040516060806101c98339810160409081528151602083015191909201515b6000839055600182905560028190555b5050505b61017b8061004e6000396000f300606060405236156100755763ffffffff7c010000000000000000000000000000000000000000000000000000000060003504166317d7de7c81146100775780635ac801fe14610099578063679aefce146100ae578063deae0f77146100d0578063eb5bd8ba146100e5578063f4b7095b146100fa575bfe5b341561007f57fe5b61008761011c565b60408051918252519081900360200190f35b34156100a157fe5b6100ac600435610123565b005b34156100b657fe5b61008761012c565b60408051918252519081900360200190f35b34156100d857fe5b6100ac600435610133565b005b34156100ed57fe5b6100ac60043561013f565b005b341561010257fe5b610087610148565b60408051918252519081900360200190f35b6000545b90565b60008190555b50565b6002545b90565b60018054820190555b50565b60018190555b50565b6001545b905600a165627a7a723058201b338ef6dd60b19ca305beb93545f15a6998e97c506ef1238f0b154bd9278b820029a165627a7a7230582057554853d6336fd3436ffec60840d02e813c441e79aca70ecf7443eced9fa42a00296060604052341561000c57fe5b6040516060806101c98339810160409081528151602083015191909201515b6000839055600182905560028190555b5050505b61017b8061004e6000396000f300606060405236156100755763ffffffff7c010000000000000000000000000000000000000000000000000000000060003504166317d7de7c81146100775780635ac801fe14610099578063679aefce146100ae578063deae0f77146100d0578063eb5bd8ba146100e5578063f4b7095b146100fa575bfe5b341561007f57fe5b61008761011c565b60408051918252519081900360200190f35b34156100a157fe5b6100ac600435610123565b005b34156100b657fe5b61008761012c565b60408051918252519081900360200190f35b34156100d857fe5b6100ac600435610133565b005b34156100ed57fe5b6100ac60043561013f565b005b341561010257fe5b610087610148565b60408051918252519081900360200190f35b6000545b90565b60008190555b50565b6002545b90565b60018054820190555b50565b60018190555b50565b6001545b905600a165627a7a723058201b338ef6dd60b19ca305beb93545f15a6998e97c506ef1238f0b154bd9278b820029'

const Exchange_abi = [{"constant":true,"inputs":[],"name":"getPartnerAccount","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"sourceName","type":"bytes32"},{"name":"targerName","type":"bytes32"},{"name":"amount","type":"int256"}],"name":"to","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getAccount","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"inputs":[{"name":"me","type":"address"},{"name":"partner","type":"address"}],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"test","type":"bool"}],"name":"testFunctionRun","type":"event"}]
const Exchange_bytecode = '0x6060604052341561000c57fe5b60405160408061069e8339810160405280516020909101515b60008054600160a060020a03808516600160a060020a03199283161790925560018054928416929091169190911790555b50505b610636806100686000396000f300606060405263ffffffff60e060020a60003504166352bd129c8114610037578063a2cc30fe14610063578063db613e8114610090575bfe5b341561003f57fe5b6100476100bc565b60408051600160a060020a039092168252519081900360200190f35b341561006b57fe5b61007c6004356024356044356100cc565b604080519115158252519081900360200190f35b341561009857fe5b6100476105fa565b60408051600160a060020a039092168252519081900360200190f35b600154600160a060020a03165b90565b6000805460408051602090810184905281517fbbf45cee0000000000000000000000000000000000000000000000000000000081526004810187905291518493849384938493600160a060020a039093169263bbf45cee92602480820193929182900301818787803b151561013d57fe5b6102c65a03f1151561014b57fe5b505060408051805160008054602093840182905284517fa8753d580000000000000000000000000000000000000000000000000000000081529451929950600160a060020a0316945063a8753d58936004808201949392918390030190829087803b15156101b557fe5b6102c65a03f115156101c357fe5b50506040805180516001546000602093840181905284517fbbf45cee000000000000000000000000000000000000000000000000000000008152600481018f90529451929850600160a060020a03909116945063bbf45cee936024808201949392918390030190829087803b151561023757fe5b6102c65a03f1151561024557fe5b50506040805180516001546000602093840181905284517fa8753d580000000000000000000000000000000000000000000000000000000081529451929750600160a060020a03909116945063a8753d58936004808201949392918390030190829087803b15156102b257fe5b6102c65a03f115156102c057fe5b50505060405180519050905060008684600160a060020a031663f4b7095b6000604051602001526040518163ffffffff1660e060020a028152600401809050602060405180830381600087803b151561031557fe5b6102c65a03f1151561032357fe5b5050506040518051905003121561037157604080516000815290517fa8b5c7566a171f8a28662bb782cf261affa362b9a1dc23bf8da6dc0612a90be69181900360200190a1600094506105ef565b604080517fdeae0f77000000000000000000000000000000000000000000000000000000008152600088810360048301529151600160a060020a0386169263deae0f77926024808201939182900301818387803b15156103cd57fe5b6102c65a03f115156103db57fe5b50505081600160a060020a031663deae0f77876040518263ffffffff1660e060020a02815260040180828152602001915050600060405180830381600087803b151561042357fe5b6102c65a03f1151561043157fe5b50505083600160a060020a031663deae0f77606486600160a060020a031663679aefce6000604051602001526040518163ffffffff1660e060020a028152600401809050602060405180830381600087803b151561048b57fe5b6102c65a03f1151561049957fe5b5050604051518a0290508115156104ac57fe5b056040518263ffffffff1660e060020a02815260040180828152602001915050600060405180830381600087803b15156104e257fe5b6102c65a03f115156104f057fe5b50505080600160a060020a031663deae0f77606486600160a060020a031663679aefce6000604051602001526040518163ffffffff1660e060020a028152600401809050602060405180830381600087803b151561054a57fe5b6102c65a03f1151561055857fe5b5050604051518a02905081151561056b57fe5b056000036040518263ffffffff1660e060020a02815260040180828152602001915050600060405180830381600087803b15156105a457fe5b6102c65a03f115156105b257fe5b5050604080516001815290517fa8b5c7566a171f8a28662bb782cf261affa362b9a1dc23bf8da6dc0612a90be692509081900360200190a1600194505b505050509392505050565b600054600160a060020a03165b905600a165627a7a7230582033da5596867b1bbfbb4fc79598b1668ee4e440ef7b6b9efeac4613c97f3ae1840029'

const LoyaltyPoint_abi = [{"constant":true,"inputs":[],"name":"getName","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_name","type":"bytes32"}],"name":"setName","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getRate","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"int256"}],"name":"addPoints","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"setPoints","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getPoints","outputs":[{"name":"","type":"int256"}],"payable":false,"type":"function"},{"inputs":[{"name":"_name","type":"bytes32"},{"name":"_points","type":"int256"},{"name":"_rate","type":"uint256"}],"payable":false,"type":"constructor"}]
const LoyaltyPoint_bytecode = '0x6060604052341561000c57fe5b6040516060806101c98339810160409081528151602083015191909201515b6000839055600182905560028190555b5050505b61017b8061004e6000396000f300606060405236156100755763ffffffff7c010000000000000000000000000000000000000000000000000000000060003504166317d7de7c81146100775780635ac801fe14610099578063679aefce146100ae578063deae0f77146100d0578063eb5bd8ba146100e5578063f4b7095b146100fa575bfe5b341561007f57fe5b61008761011c565b60408051918252519081900360200190f35b34156100a157fe5b6100ac600435610123565b005b34156100b657fe5b61008761012c565b60408051918252519081900360200190f35b34156100d857fe5b6100ac600435610133565b005b34156100ed57fe5b6100ac60043561013f565b005b341561010257fe5b610087610148565b60408051918252519081900360200190f35b6000545b90565b60008190555b50565b6002545b90565b60018054820190555b50565b60018190555b50565b6001545b905600a165627a7a723058201b338ef6dd60b19ca305beb93545f15a6998e97c506ef1238f0b154bd9278b820029'

const Account = web3.eth.contract(Account_abi)
const Account0 = web3.eth.contract(Account_abi)
const exchange = web3.eth.contract(Exchange_abi)

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
				data: Exchange_bytecode
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
})
