'use strict'

const path = require('path')
const fs = require('fs')
const config = require('./config.json')
const assert = require('assert')
const Web3 = require('web3')
const EventEmitter = require('events')
const emitter = new EventEmitter()
const abi = require(path.resolve(__dirname, '..', 'deployResult', 'abi.js'))

const deploey = require(process.cwd() + '/Contract/dynamicDeploey/deploey');

const mode = "debug"
const provider = config[mode].provider
const web3 = new Web3(new Web3.providers.HttpProvider(provider))

const Account_abi = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', '..','Contract','build', 'Account.abi')))
const Account_bytecode = '0x' + fs.readFileSync(path.resolve(__dirname, '..', '..','Contract','build', 'Account.bin')).toString()
const exchange_abi = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', '..','Contract','build', 'Exchange.abi')))
const exchange_bytecode = '0x' + fs.readFileSync(path.resolve(__dirname, '..', '..','Contract','build', 'Exchange.bin')).toString()
const LoyaltyPoint_abi = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', '..','Contract','build', 'LoyaltyPoint.abi')))
const LoyaltyPoint_bytecode = '0x' + fs.readFileSync(path.resolve(__dirname, '..', '..','Contract','build', 'LoyaltyPoint.bin')).toString()


let result


let account_address
let account0_address
let exchange_address
let LoyaltyPoint_address

let myAccount
let partnerAccount
let exchange
let LoyaltyPoint


/*web3.eth.filter('latest', (err, blockNumber) => {
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
})*/

module.exports = {
  the_exchange_rate_is_alp_blp : function(alp,blp){
  /*  deploey.init(function(result){
      console.log("Deploey！"+result);
    });*/
    result = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..','deployResult', 'Result.json')))

    account_address=result.Account.address
    account0_address=result.Account0.address
    exchange_address=result.exchange.address

    myAccount = web3.eth.contract(Account_abi).at(account_address)
    partnerAccount = web3.eth.contract(Account_abi).at(account0_address)
    exchange = web3.eth.contract(exchange_abi).at(exchange_address)

    myAccount.addLoyaltyPoint("Company B", 0,blp/alp, {
      from: web3.eth.coinbase,
      gas: 44444444
    }, (err, txhash) => {
      if (err !== undefined && err !== null) done(err)
      else {
          // if pass do something

      }
    })
      partnerAccount.addLoyaltyPoint("Company A", 0,alp/blp, {
        from: web3.eth.coinbase,
        gas: 44444444
      }, (err, txhash) => {
        if (err !== undefined && err !== null) done(err)
        else {
          // if pass do something
        }
      })

  },
  original_alp_account_of_A_is : function(originalAlp){

    myAccount.getLocalLoyaltyPoint( {
      from: web3.eth.coinbase,
      gas: 44444444
    }, (err, txhash) => {
      if (err !== undefined && err !== null) console.log();
      else {
          LoyaltyPoint_address=result[0];
          console.log('Message:'+result[0]);
      }
    })


    LoyaltyPoint = web3.eth.contract(LoyaltyPoint_abi).at(LoyaltyPoint_address)
    LoyaltyPoint.setPoints(originalAlp, {
      from: web3.eth.coinbase,
      gas: 44444444
    }, (err, txhash) => {
      if (err !== undefined && err !== null) console.log();
      else {
        // if pass do something
      }
    })

  },
  original_blp_account_of_A_is : function(originalBlp){
    partnerAccount.getLocalLoyaltyPoint( {
      from: web3.eth.coinbase,
      gas: 44444444
    }, (err, txhash) => {
      if (err !== undefined && err !== null) console.log();
      else {
          LoyaltyPoint_address=result[0];
          console.log('Message:'+result[0]);
      }
    })


    LoyaltyPoint = web3.eth.contract(LoyaltyPoint_abi).at(LoyaltyPoint_address)
    LoyaltyPoint.setPoints(originalBlp, {
      from: web3.eth.coinbase,
      gas: 44444444
    }, (err, txhash) => {
      if (err !== undefined && err !== null) console.log();
      else {
        // if pass do something
      }
    })

  },
  original_alp_account_of_B_is : function(originalAlp){

  },
  original_blp_account_of_B_is : function(originalBlp){

  },
  a_want_to_exchange_alp_for_blp : function(exchangingAlp){

  },
  alp_account_of_A_should_be : function(resultAlp){

  },
  blp_account_of_A_should_be : function(resultBlp){

  },
  alp_account_of_B_should_be : function(resultBlp){

  },
  blp_account_of_B_should_be : function(resultAlp){

  },
  test : function( data ){
    // print out the data
     fs.writeFileSync(path.resolve(__dirname, '..', 'deployResult', 'test.js'), "test")
  }
};
