// features/step_definitions/browser_steps.js 1s
//var seleniumWebdriver = require('selenium-webdriver');
const path = require('path')
const {defineSupportCode} = require('cucumber');
var assert = require('assert');

defineSupportCode(function({Given, When, Then, And}) {
  //let request=exchangRequest.newRequest();
  Given('the exchange rate is {alp}alp={blp}blp', function (alp, blp,callback) {
  // Write code here that turns the phrase above into concrete actions
  /*deploey.init(2,function(result){
    console.log(result);
  })*/

  myAccount=new Account('Company A')



  callback();
  });

  Given('original alp account of A is {originalAlp}', function (originalAlp) {
  // Write code here that turns the phrase above into concrete actions
  //callback(null, 'pending');
  console.log('originalAlp:'+originalAlp);
  });

  Given('original blp account of A is {originalBlp}', function (originalBlp) {
    // Write code here that turns the phrase above into concrete actions

    console.log('originalAlp:'+originalBlp);
    //callback(null, 'pending');
  });

  Given('original alp account of B is {originalAlp}', function (originalAlp) {
    // Write code here that turns the phrase above into concrete actions

    console.log('originalAlp:'+originalAlp);
    //callback(null, 'pending');
  })


  Given('original blp account of B is {originalBlp}', function (originalBlp) {
    // Write code here that turns the phrase above into concrete actions

    console.log('originalAlp:'+originalBlp);
    //callback(null, 'pending');
  });

  When('A want to exchange {exchangingAlp} alp for blp', function (exchangingAlp) {
    // Write code here that turns the phrase above into concrete actions

    console.log('originalAlp:'+exchangingAlp);
    //callback(null, 'pending');
  });

  Then('alp account of A should be {resultAlp}', function (resultAlp) {
  // Write code here that turns the phrase above into concrete actions

  console.log('originalAlp:'+resultAlp);
  //callback(null, 'pending');
  });


  Then('blp account of A should be {resultBlp}', function (resultBlp) {
    // Write code here that turns the phrase above into concrete actions

    console.log('originalAlp:'+resultBlp);
    //callback(null, 'pending');
  });

  Then('alp account of B should be {resultBlp}', function (resultBlp) {
    // Write code here that turns the phrase above into concrete actions

    console.log('originalAlp:'+resultBlp);
    //callback(null, 'pending');
  });


  Then('blp account of B should be {resultBlp}', function (resultBlp) {
    // Write code here that turns the phrase above into concrete actions

    console.log('originalAlp:'+resultBlp);
    //callback(null, 'pending');
  });



});
