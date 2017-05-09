'use strict'

const path = require('path')
const fs = require('fs')

const Web3 = require('web3')
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))

const Account_abi = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', '..','build', 'Account.abi')))

const Account = web3.eth.contract(Account_abi).at(JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', 'config.json'))).Account.address)

let company = "Company A"
describe('Scenario 2 : Get Account Contract Function', function () {

    describe('Use addLoyaltyPoint Function with Company A ,Point 100 ,and Rate 0.5',function(){
        it('should use successfully',function(done){
            Account.addLoyaltyPoint(company,100,50,{
                from:web3.eth.coinbase,
                gas:1234567
            },(err,result) => {
                if(err !== undefined && err !== null)
                    done(err)
                if(result !== undefined && result !== null){
                    //console.log(result)
                    done()
                }
            })
        })
    })
    describe('Use getLoyaltyPoint Function with Company A',function(){
        it('should use successfully',function(done){
            Account.getLoyaltyPoint(company,(err,result) => {
                if(err !== undefined && err !== null)
                    done(err)
                if(result !== undefined && result !== null){
                    //console.log(result)
                    done()
                }
            })
        })
    })
    describe('Use getLocalLoyaltyPoint Function with Company A',function(){
        it('should use successfully',function(done){
            Account.getLocalLoyaltyPoint((err,result) => {
                if(err !== undefined && err !== null)
                    done(err)
                if(result !== undefined && result !== null){
                    //console.log(result)
                    done()
                }
            })
        })
    })
    describe('Use getCompanyName Function with Company A',function(){
        it('should use successfully',function(done){
            Account.getCompanyName((err,result) => {
                if(err !== undefined && err !== null)
                    done(err)
                if(result !== undefined && result !== null){
                    //console.log(result)
                    done()
                }
            })
        })
    })
})
