'use strict'

const path = require('path')
const config = require('./config.json')
const assert = require('assert')
const Web3 = require('web3')
const fs = require('fs')
const EventEmitter = require('events')
const emitter = new EventEmitter()
const mode = "debug"
const provider = config[mode].provider
const web3 = new Web3(new Web3.providers.HttpProvider(provider))

let result


let account_address
let account0_address
let exchange_address
let LoyaltyPoint_address

let myAccount
let partnerAccount
let exchange
let LoyaltyPoint


module.exports = {
  deploeyAccountContract : (companyName,callback)=>{
    const Account_abi = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', '..','build', 'Account.abi')))
    const Account_bytecode = '0x' + fs.readFileSync(path.resolve(__dirname, '..','..', 'build', 'Account.bin')).toString()
    let accountContract = web3.eth.contract(Account_abi)

    if (!Account_abi) {
     throw new Error('Account_abi = ' + Account_abi);
    }
    else if (!Account_bytecode ) {
      throw new Error('Account_bytecode = ' + Account_bytecode);
    }
    else if (!accountContract) {
      throw new Error('accountContract = ' + accountContract);
    }

    var Account = accountContract.new({
      from: web3.eth.accounts[0],
      data:Account_bytecode,
      gas: '4700000'
    },function(err, contract){
      if (typeof contract.address !== 'undefined') {
        callback(companyName,contract.address)
      }
      if (err) {
        throw new Error(e)
      }
    });


  },
  test : function( data ){
  }
};
