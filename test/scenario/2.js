'use strict'

const path = require('path')
const fs = require('fs')
const expect = require('chai').expect;

const Web3 = require('web3')
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))

const Account_abi = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', '..', 'build', 'Account.abi')))
const Account = web3.eth.contract(Account_abi).at(JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', 'config.json'))).Account.address)
const Account0 = web3.eth.contract(Account_abi).at(JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', 'config.json'))).Account0.address)

describe('Scenario 2 : Get Account Contract Function', function () {

    describe('Use addLoyaltyPoint Function with Company A ,Point 100 ,and Rate 0.5', function () {
        it('should use successfully', function (done) {
            Account.addLoyaltyPoint("Company B", 100, 50, {
                from: web3.eth.coinbase,
                gas: 1234567
            }, (err, result, name) => {
                if (err !== undefined && err !== null)
                    done(err)
                if (result !== undefined && result !== null) {
                    console.log(result)
                    done()
                }
            })
        })
    })
    describe('Use getLoyaltyPoint Function with Company A', function () {
        it('should use successfully', function (done) {
            Account.getLoyaltyPoint("Company B", (err, result) => {
                if (err !== undefined && err !== null)
                    done(err)
                if (result !== undefined && result !== null) {
                    console.log(result)
                    done()
                }
            })
        })
    })
    describe('Use getLocalLoyaltyPoint Function with Company A', function () {
        it('should use successfully', function (done) {
            Account.getLocalLoyaltyPoint((err, result) => {
                if (err !== undefined && err !== null)
                    done(err)
                if (result !== undefined && result !== null) {
                    console.log(result)
                    done()
                }
            })
        })
    })
    describe('Use getCompanyName Function with Company A', function () {
        it('should use successfully', function (done) {
            Account.getCompanyName((err, result) => {
                if (err !== undefined && err !== null)
                    done(err)
                if (result !== undefined && result !== null) {
                    console.log(result)
                    done()
                }
            })
        })
    })

    describe('Use addLoyaltyPoint Function with Company B ,Point 100 ,and Rate 1', function () {
        it('should use successfully', function (done) {
            Account0.addLoyaltyPoint("Company A", 100, 200, {
                from: web3.eth.coinbase,
                gas: 1234567
            }, (err, result) => {
                if (err !== undefined && err !== null)
                    done(err)
                if (result !== undefined && result !== null) {
                    //console.log(result)
                    done()
                }
            })
        })
    })
    describe('Use getLoyaltyPoint Function with Company B', function () {
        it('should use successfully', function (done) {
            Account0.getLoyaltyPoint("Company A", (err, result) => {
                if (err !== undefined && err !== null)
                    done(err)
                if (result !== undefined && result !== null) {
                    //console.log(result)
                    done()
                }
            })
        })
    })
    describe('Use getLocalLoyaltyPoint Function with Company B', function () {
        it('should use successfully', function (done) {
            Account0.getLocalLoyaltyPoint((err, result) => {
                if (err !== undefined && err !== null)
                    done(err)
                if (result !== undefined && result !== null) {
                    //console.log(result)
                    done()
                }
            })
        })
    })
    describe('Use getCompanyName Function with Company B', function () {
        it('should use successfully', function (done) {
            Account0.getCompanyName((err, result) => {
                if (err !== undefined && err !== null)
                    done(err)
                if (result !== undefined && result !== null) {
                    //console.log(result)
                    done()
                }
            })
        })
    })
})