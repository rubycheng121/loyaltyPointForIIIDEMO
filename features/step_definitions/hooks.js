// features/step_definitions/hooks.js s
var {defineSupportCode} = require('cucumber');
var exchangRequest = require(process.cwd() + '/script/model/exchangRequest');
const web3 = require('web3')


defineSupportCode(function({Before,After}) {
  Before(function() {
    //return this.driver.quit();
    
  });
  After(function() {
    //return this.driver.quit();
  });
});
