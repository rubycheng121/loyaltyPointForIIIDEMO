pragma solidity ^0.4.8;

contract calculate {
    
    uint a;
    uint b;
    uint total;
    
	function calculate(){}

	function setA(uint a1){
        a = a1;
	}

	function setB(uint a1){
        b = a1;
	}

	function getA() constant returns(uint){
        return a;
	}

	function getB() constant returns(uint){
        return b;
	}

	function sum(uint a1,uint a2){
        total = a1 + a2;
	}

	function getSum() constant returns(uint){
        return total;
	}
}