// features/step_definitions/browser_steps.js 1s
const path = require('path')
const { defineSupportCode } = require('cucumber');
const fs = require('fs')
const assert = require('assert');
var Code = require(process.cwd() + '/script/model/Code');
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

defineSupportCode(function ({ Given, When, Then, And }) {
  //let request=exchangRequest.newRequest();
  let Account_abi = [{"constant":false,"inputs":[{"name":"companyName","type":"bytes32"},{"name":"points","type":"int256"},{"name":"rate","type":"uint256"}],"name":"addLoyaltyPoint","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getCompanyName","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getLocalLoyaltyPoint","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":true,"inputs":[{"name":"name","type":"bytes32"}],"name":"getLoyaltyPoint","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"inputs":[{"name":"_companyName","type":"bytes32"}],"payable":false,"type":"constructor"}]
  let LoyaltyPoint_abi = [{"constant":true,"inputs":[],"name":"getName","outputs":[{"name":"","type":"bytes32"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"_name","type":"bytes32"}],"name":"setName","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getRate","outputs":[{"name":"","type":"uint256"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"int256"}],"name":"addPoints","outputs":[],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"amount","type":"uint256"}],"name":"setPoints","outputs":[],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getPoints","outputs":[{"name":"","type":"int256"}],"payable":false,"type":"function"},{"inputs":[{"name":"_name","type":"bytes32"},{"name":"_points","type":"int256"},{"name":"_rate","type":"uint256"}],"payable":false,"type":"constructor"}]
  let Exchange_abi = [{"constant":true,"inputs":[],"name":"getPartnerAccount","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"sourceName","type":"bytes32"},{"name":"targerName","type":"bytes32"},{"name":"amount","type":"int256"}],"name":"to","outputs":[{"name":"","type":"bool"}],"payable":false,"type":"function"},{"constant":true,"inputs":[],"name":"getAccount","outputs":[{"name":"","type":"address"}],"payable":false,"type":"function"},{"inputs":[{"name":"me","type":"address"},{"name":"partner","type":"address"}],"payable":false,"type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"name":"test","type":"bool"}],"name":"testFunctionRun","type":"event"}]

  let AccountA_address
  let AccountB_address

  let A_Contract
  let B_Contract
  let ExchangeContract

  let A_LocalLoyaltyPointContract
  let A_BLoyaltyPointContract;
  let B_LocalLoyaltyPointContract
  let A_ALoyaltyPointContract;

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
    A_LocalLoyaltyPointContract.addPoints(originalAlp, {
      from: web3.eth.coinbase,
      gas: 44444444
    }, (err, txhash) => {
      if (err !== undefined && err !== null) throw err;
      else {
        callback()
      }
    })
  });

  Given('original blp account of A is {originalBlp}', function (originalBlp, callback) {
    A_Contract.addLoyaltyPoint('Company B', originalBlp, 50, {
      from: web3.eth.coinbase,
      gas: 44444444
    }, (err, txhash) => {
      if (err !== undefined && err !== null) throw err;
      else {
        callback()
      }
    })

  });

  Given('original alp account of B is {originalAlp}', function (originalAlp, callback) {
    B_Contract.addLoyaltyPoint('Company A', originalAlp, 150, {
      from: web3.eth.coinbase,
      gas: 44444444
    }, (err, txhash) => {
      if (err !== undefined && err !== null) throw err;
      else {
        callback()
      }
    })
  });

  Given('original blp account of B is {originalBlp}', function (originalBlp, callback) {
    B_LocalLoyaltyPointContract = web3.eth.contract(LoyaltyPoint_abi).at(B_Contract.getLocalLoyaltyPoint());
    B_LocalLoyaltyPointContract.addPoints(originalBlp, {
      from: web3.eth.coinbase,
      gas: 44444444
    }, (err, txhash) => {
      if (err !== undefined && err !== null) throw err;
      else {
        callback()
      }
    })
  });

  When('A want to exchange {exchangingAlp} alp for blp', function (exchangingAlp, callback) {
    Code.deploeyExchangeContract(AccountA_address, AccountB_address, (myAddress, partnerAddress, address) => {
      ExchangeContract = web3.eth.contract(Exchange_abi).at(address);
      ExchangeContract.to('Company A','Company B', exchangingAlp, {
        from: web3.eth.coinbase,
        gas: 44444444
      }, (err, txhash) => {
        if (err !== undefined && err !== null) throw err;
        else {
          callback()
        }
      })
    })
  });

  Then('alp account of A should be {resultAlp}', function (resultAlp, callback) {
    if (A_LocalLoyaltyPointContract.getPoints() == resultAlp) {
      callback();
    }
    else {
      throw "A_LocalLoyaltyPointContract.getPoints() = " + A_LocalLoyaltyPointContract.getPoints();
    }
  });


  Then('blp account of A should be {resultBlp}', function (resultBlp, callback) {
    A_BLoyaltyPointContract = web3.eth.contract(LoyaltyPoint_abi).at(A_Contract.getLoyaltyPoint('Company B'));
    if (A_BLoyaltyPointContract.getPoints() == resultBlp) {
      callback();
    }
    else {
      throw "A_BLoyaltyPointContract.getPoints() = " + A_BLoyaltyPointContract.getPoints();
    }
  });

  Then('alp account of B should be {resultBlp}', function (resultBlp, callback) {
    B_ALoyaltyPointContract = web3.eth.contract(LoyaltyPoint_abi).at(B_Contract.getLoyaltyPoint('Company A'));
    if (B_ALoyaltyPointContract.getPoints() == resultBlp) {
      callback();
    }
    else {
      throw "B_ALoyaltyPointContract.getPoints() = " + B_ALoyaltyPointContract.getPoints();
    }
  });


  Then('blp account of B should be {resultBlp}', function (resultBlp, callback) {
    if (B_LocalLoyaltyPointContract.getPoints() == resultBlp) {
      callback();
    }
    else {
      throw "B_LocalLoyaltyPointContract.getPoints() = " + B_LocalLoyaltyPointContract.getPoints();
    }
  });

});
