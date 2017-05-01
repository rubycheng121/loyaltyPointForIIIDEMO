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

    var Account = accountContract.new(companyName,{
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
  deploeyExchangeContract : (myAddress,partnerAddress,callback)=>{
    const Exchange_abi = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', '..','build', 'Exchange.abi')))
    const Exchange_bytecode = '0x' + fs.readFileSync(path.resolve(__dirname, '..','..', 'build', 'Exchange.bin')).toString()
    let exchangeContract = web3.eth.contract(Exchange_abi)

    if (!Exchange_abi) {
     throw new Error('Exchange_abi = ' + Exchange_abi);
    }
    else if (!Exchange_bytecode ) {
      throw new Error('Exchange_bytecode = ' + Exchange_bytecode);
    }
    else if (!exchangeContract) {
      throw new Error('exchangeContract = ' + exchangeContract);
    }

    var Exchange = exchangeContract.new(myAddress,partnerAddress,{
      from: web3.eth.accounts[0],
      data:Exchange_bytecode,
      gas: '4700000'
    },function(err, contract){
      if (typeof contract.address !== 'undefined') {
        callback(myAddress,partnerAddress,contract.address)
      }
      if (err) {
        throw new Error(e)
      }
    });
  },
  deploeyLoyaltyPointContract : (name,points,rate,callback)=>{
    const LoyaltyPoint_abi = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', '..','build', 'LoyaltyPoint.abi')))
    const LoyaltyPoint_bytecode = '0x' + fs.readFileSync(path.resolve(__dirname, '..','..', 'build', 'LoyaltyPoint.bin')).toString()
    let loyaltypointContract = web3.eth.contract(LoyaltyPoint_abi)

    if (!LoyaltyPoint_abi) {
     throw new Error('LoyaltyPoint_abi = ' + LoyaltyPoint_abi);
    }
    else if (!LoyaltyPoint_bytecode ) {
      throw new Error('LoyaltyPoint_bytecode = ' + LoyaltyPoint_bytecode);
    }
    else if (!loyaltypointContract) {
      throw new Error('loyaltypointContract = ' + loyaltypointContract);
    }

    var LoyaltyPoint = loyaltypointContract.new(name,points,rate,{
      from: web3.eth.accounts[0],
      data:LoyaltyPoint_bytecode,
      gas: '4700000'
    },function(err, contract){
      if (typeof contract.address !== 'undefined') {
        callback(name,points,rate,contract.address)
      }
      if (err) {
        throw new Error(e)
      }
    });
  },
  test : function( data ){
  }
};
