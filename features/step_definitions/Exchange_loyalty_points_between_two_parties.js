// features/step_definitions/browser_steps.js 1s
const path = require('path')
const {defineSupportCode} = require('cucumber');
const fs = require('fs')
const assert = require('assert');
var Code = require(process.cwd() + '/script/model/Code');


defineSupportCode(function({Given, When, Then, And}) {
  //let request=exchangRequest.newRequest();

  Given('the exchange rate is {alp}alp={blp}blp', function (alp, blp,callback) {
  // Write code here that turns the phrase above into concrete actions
  let addressData={}
  Code.deploeyAccountContract('Company A',(name,address)=>{
    assert.ok(address, 'Company A address has been defined');
    addressData.companyA={
        companyName:name,
        companyAddress:address
      }
    Code.deploeyAccountContract('Company B',(name,address)=>{
      assert.ok(address, 'Company B address has been defined');
      addressData.companyB={
              companyName:name,
              companyAddress:address
          }
      fs.writeFile(path.resolve(__dirname, '..', '..','build', 'contract.address'), JSON.stringify(addressData, null, 4), (err) => {
        assert.ifError(err);
        callback()
      });
    })
  })
});

  Given('original alp account of A is {originalAlp}', function (originalAlp,callback) {

  callback();
  });

  Given('original blp account of A is {originalBlp}', function (originalBlp,callback) {


    callback();
  });

  Given('original alp account of B is {originalAlp}', function (originalAlp,callback) {


    callback();
  })


  Given('original blp account of B is {originalBlp}', function (originalBlp,callback) {


    callback();
  });

  When('A want to exchange {exchangingAlp} alp for blp', function (exchangingAlp,callback) {


    callback();
  });

  Then('alp account of A should be {resultAlp}', function (resultAlp,callback) {


  callback();
  });


  Then('blp account of A should be {resultBlp}', function (resultBlp,callback) {


    callback();
  });

  Then('alp account of B should be {resultBlp}', function (resultBlp,callback) {


    callback();
  });


  Then('blp account of B should be {resultBlp}', function (resultBlp,callback) {


    callback();
  });



});
