// features/step_definitions/browser_steps.js 1s
const path = require('path')
const {defineSupportCode} = require('cucumber');
var assert = require('assert');
var Code = require(process.cwd() + '/script/model/Code');

defineSupportCode(function({Given, When, Then, And}) {
  //let request=exchangRequest.newRequest();
  Given('the exchange rate is {alp}alp={blp}blp', function (alp, blp,callback) {
  // Write code here that turns the phrase above into concrete actions
  Code.the_exchange_rate_is_alp_blp(alp,blp);
  callback();
  });

  Given('original alp account of A is {originalAlp}', function (originalAlp,callback) {
  // Write code here that turns the phrase above into concrete actions
  //  console.log('originalAlp:'+originalAlp);
  Code.original_alp_account_of_A_is(originalAlp);
  callback();
  });

  Given('original blp account of A is {originalBlp}', function (originalBlp,callback) {
    // Write code here that turns the phrase above into concrete actions

    Code.original_blp_account_of_A_is(originalBlp)
    //console.log('originalAlp:'+originalBlp);
    callback();
  });

  Given('original alp account of B is {originalAlp}', function (originalAlp,callback) {
    // Write code here that turns the phrase above into concrete actions
    Code.original_alp_account_of_B_is(originalAlp)
    //console.log('originalAlp:'+originalAlp);
    callback();
  })


  Given('original blp account of B is {originalBlp}', function (originalBlp,callback) {
    // Write code here that turns the phrase above into concrete actions
    Code.original_blp_account_of_B_is(originalBlp)
    //console.log('originalAlp:'+originalBlp);
    callback();
  });

  When('A want to exchange {exchangingAlp} alp for blp', function (exchangingAlp,callback) {
    // Write code here that turns the phrase above into concrete actions
    Code.a_want_to_exchange_alp_for_blp(exchangingAlp)
    //console.log('originalAlp:'+exchangingAlp);
    callback();
  });

  Then('alp account of A should be {resultAlp}', function (resultAlp,callback) {
  // Write code here that turns the phrase above into concrete actions
  Code.alp_account_of_A_should_be(resultAlp)

  //console.log('originalAlp:'+resultAlp);
  callback();
  });


  Then('blp account of A should be {resultBlp}', function (resultBlp,callback) {
    // Write code here that turns the phrase above into concrete actions
    Code.blp_account_of_A_should_be(resultBlp)

    //console.log('originalAlp:'+resultBlp);
    callback();
  });

  Then('alp account of B should be {resultBlp}', function (resultBlp,callback) {
    // Write code here that turns the phrase above into concrete actions
    Code.alp_account_of_B_should_be(resultBlp)

    //console.log('originalAlp:'+resultBlp);
    callback();
  });


  Then('blp account of B should be {resultBlp}', function (resultBlp,callback) {
    // Write code here that turns the phrase above into concrete actions
    Code.blp_account_of_B_should_be(resultBlp)
    //console.log('originalAlp:'+resultBlp);
    callback();
  });



});
