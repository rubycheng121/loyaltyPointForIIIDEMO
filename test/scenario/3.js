'use strict'

const path = require('path')
const fs = require('fs')

const Web3 = require('web3')
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))

const Account_abi = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', '..', 'build', 'Account.abi')))
const Account = web3.eth.contract(Account_abi).at(JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', 'config.json'))).Account.address)

const LoyaltyPoint_abi = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', '..', 'build', 'LoyaltyPoint.abi')))
const LoyaltyPoint = web3.eth.contract(LoyaltyPoint_abi).at(Account.getLocalLoyaltyPoint())


describe('Scenario 3 : Get LoyaltyPoint Contract Function', function () {
    this.timeout(0)
    describe('Use getName Function', function () {
        it('should use successfully', function (done) {
            LoyaltyPoint.getName((err, result) => {
                if (err !== undefined && err !== null)
                    done(err)
                if (result !== undefined && result !== null) {
                    console.log(result)
                    done()
                }
            })
        })
    })
    describe('Use getPoints Function', function () {
        it('should use successfully', function (done) {
            console.log(LoyaltyPoint.getPoints())
            LoyaltyPoint.getPoints((err, result) => {
                if (err !== undefined && err !== null)
                    done(err)
                if (result !== undefined && result !== null) {
                    console.log(result)
                    done()
                }
            })
        })
    })
    describe('Use addPoints Function', function () {
        it('should use successfully', function (done) {
            LoyaltyPoint.addPoints(10, {
                from: web3.eth.coinbase,
                gas: 1234567
            },(err, result) => {
                if (err !== undefined && err !== null)
                    done(err)
                if (result !== undefined && result !== null) {
                    console.log(result)
                    done()
                }
            })
        })
    })
    describe('Use setPoints Function', function () {
        it('should use successfully', function (done) {
            LoyaltyPoint.setPoints(500, {
                from: web3.eth.coinbase,
                gas: 1234567
            },(err, result) => {
                if (err !== undefined && err !== null)
                    done(err)
                if (result !== undefined && result !== null) {
                    console.log(result)
                    done()
                }
            })
        })
    })
    describe('Use getRate Function', function () {
        it('should use successfully', function (done) {
            console.log(LoyaltyPoint.getRate())
            LoyaltyPoint.getRate((err, result) => {
                if (err !== undefined && err !== null)
                    done(err)
                if (result !== undefined && result !== null) {
                    console.log(result)
                    done()
                }
            })
        })
    })
})