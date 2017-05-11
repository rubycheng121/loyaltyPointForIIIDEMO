'use strict'

const path = require('path')
const fs = require('fs')

const Web3 = require('web3')
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'))

let Account_abi
let Account
let Account0

let LoyaltyPoint_abi
let LoyaltyPoint
let LoyaltyPoint0

let ap, ap2, ap3, rate, aCompanyName;

describe('Scenario 3 : Get LoyaltyPoint Contract Function', function () {
    this.timeout(0)

    before(function (done) {

        Account_abi = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', '..', 'build', 'Account.abi')))
        Account = web3.eth.contract(Account_abi).at(JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', 'config.json'))).Account.address)
        Account0 = web3.eth.contract(Account_abi).at(JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', 'config.json'))).Account0.address)

        LoyaltyPoint_abi = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', '..', 'build', 'LoyaltyPoint.abi')))
        LoyaltyPoint = web3.eth.contract(LoyaltyPoint_abi).at(Account.getLocalLoyaltyPoint())
        LoyaltyPoint0 = web3.eth.contract(LoyaltyPoint_abi).at(Account0.getLocalLoyaltyPoint())

        done()
    })

    describe('Use getName Function', function () {
        it('should use successfully', function (done) {
            LoyaltyPoint.getName((err, result) => {
                if (err !== undefined && err !== null)
                    done(err)
                if (result !== undefined && result !== null) {
                    //console.log(result)
                    aCompanyName = result;
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
                    //console.log(result)
                    ap = result;
                    done()
                }
            })
        })
    })
    describe('Use addPoints Function', function () {
        it('should use successfully', function (done) {
            LoyaltyPoint.addPoints(456, {
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
    describe('Use addPoints Function', function () {
        it('should use successfully', function (done) {
            LoyaltyPoint0.addPoints(456, {
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
    describe('Use getPoints Function', function () {
        it('should use successfully', function (done) {
            console.log(LoyaltyPoint.getPoints())
            LoyaltyPoint.getPoints((err, result) => {
                if (err !== undefined && err !== null)
                    done(err)
                if (result !== undefined && result !== null) {
                    //console.log(result)
                    ap2 = result;
                    done()
                }
            })
        })
    })
    describe('Use setPoints Function', function () {
        it('should use successfully', function (done) {
            LoyaltyPoint.setPoints(123, {
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
    describe('Use getPoints Function', function () {
        it('should use successfully', function (done) {
            console.log(LoyaltyPoint.getPoints())
            LoyaltyPoint.getPoints((err, result) => {
                if (err !== undefined && err !== null)
                    done(err)
                if (result !== undefined && result !== null) {
                    //console.log(result)
                    ap3 = result;
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
                    //console.log(result)
                    rate = result;
                    done()
                }
            })
        })
    })
    describe('Writing account result config', function () {
        it('should wrote in config.json', function (done) {
            fs.writeFile(path.resolve(__dirname, '..', 'config3.json'), JSON.stringify({
                "aCompanyName": {
                    address: aCompanyName
                },
                "ap": {
                    address: ap
                },
                "ap2": {
                    address: ap2
                },
                "ap3": {
                    address: ap3
                },
                "rate": {
                    address: rate
                },
            }, null, '\t'), err => {
                if (err !== undefined && err !== null) done(err)
                else done()
            })
        })
    })
})