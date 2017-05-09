'use strict'

const path = require('path')
const fs = require('fs')

const Web3 = require('web3')
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))

const exchange_abi = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', '..', 'build', 'exchange.abi')))

const exchange = web3.eth.contract(exchange_abi).at(JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', 'config.json'))).exchange.address)

describe('Scenario 3 : Get Exchage Contract Function', function () {
    this.timeout(0)
    describe('Use to Function when Company A wants to exchange 10 points',function(){
        it('should use successfully',function(done){
            exchange.to("Company B",10,{
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
    describe('Use getAccount Function',function(){
        it('should use successfully',function(done){
            exchange.getAccount((err,result) => {
                if(err !== undefined && err !== null)
                    done(err)
                if(result !== undefined && result !== null){
                    //console.log(result)
                    done()
                }
            })
        })
    })
    describe('Use getPartnerAccount Function',function(){
        it('should use successfully',function(done){
            exchange.getPartnerAccount((err,result) => {
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
