let calculate_abi
let calculate_bytecode
let calculation_contract = web3.eth.contract(calculate_abi)
let calculation_address

describe('Scenario 0 : Successfully Use Functions', function () {
	this.timeout(0)

	before(function (done) {
        calculation_contract.new({
            from: web3.eth.accounts[0], 
            data: calculate_bytecode, 
            gas: '8888888'
        }, function (e, contract){
            if (typeof contract.address !== 'undefined') {
              calculation_address = contract.address;
              calculation_contract = web3.eth.contract(calculate_abi).at(calculation_address);
              done()
            }
        })
	})

	describe('Successfully Use setA', function(){
		it('should work', function(done){
			//add to next step
			calculation_contract.setA(1);
			done()
		})
	})

	describe('Successfully Use setB', function(){
		it('should work', function(done){
			//add to next step
			calculation_contract.setB(2);
			done()
		})
	})

	describe('Successfully Use getA', function(){
		it('should work', function(done){
			//add to next step
			calculation_contract.getA();
			done()
		})
	})

	describe('Successfully Use getB', function(){
		it('should work', function(done){
			//add to next step
			calculation_contract.getB();
			done()
		})
	})

	describe('Successfully Use sum', function(){
		it('should work', function(done){
             var a = calculation_contract.getA();
             var b = calculation_contract.getB();
			//add to next step
			calculation_contract.sum(a.toNumber(),b.toNumber());
			done()
		})
	})

	describe('Successfully Use getSum', function(){
		it('should work', function(done){
			//add to next step
			calculation_contract.getSum();
			done()
		})
	})

	
})