let calculate_abi
let calculate_bytecode
let calculation_contract = web3.eth.contract(calculate_abi)
let calculation_address

defineSupportCode(function ({ Given, When, Then, And }) {

       Given('a contract', function (callback) {
         calculation_contract.new({
            from: web3.eth.accounts[0], 
            data: calculate_bytecode, 
            gas: '8888888'
         }, function (e, contract){
              if (typeof contract.address !== 'undefined') {
                  calculation_address = contract.address;
                  calculation_contract = web3.eth.contract(calculate_abi).at(calculation_address);
                  callback();
              }
         })
       });


       Given('A is {int}', function (int, callback) {
         //add to next step
         calculation_contract.setA(int);
         callback();
       });


       Given('B is {int}', function (int, callback) {
         //add to next step
         calculation_contract.setB(int);
         callback();
       });


       When('I want to caculate the sum of a and b', function (callback) {
         //add to next step
         var a = calculation_contract.getA();
         //add to next step
         var b = calculation_contract.getB();
         //add to next step
         calculation_contract.sum(a.toNumber(),b.toNumber());
         callback();
       });


       Then('the sum of A and B is {int}', function (int, callback) {
         //add to next step
         var sum = calculation_contract.getSum();
         assert(sum.toNumber() == int,"success")
         callback();
       });

});