// features/step_definitions/browser_steps.js 1s
const path = require('path')
const {defineSupportCode} = require('cucumber');
var assert = require('assert');
const fs = require('fs')
var Code = require(process.cwd() + '/script/model/Code');
let addressData={}

defineSupportCode(function({Given, When, Then, And}) {
  //let request=exchangRequest.newRequest();
  Given('the exchange rate is {alp}alp={blp}blp', function (alp, blp,callback) {
  // Write code here that turns the phrase above into concrete actions

  Code.deploeyAccountContract('Company A',(name,address)=>{
    if (address){
      addressData.company={
        companyName:name,
        companyAddress:address
      }
      console.log(name);
      console.log(address);

      fs.writeFile(path.resolve(__dirname, '..', '..','build', 'contract.address'), JSON.stringify(addressData, null, 4), (err) => {
        if (err) throw err;
      });
      callback();
    }
    else {
      throw new Error('accuontAddress is null')
    }
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
