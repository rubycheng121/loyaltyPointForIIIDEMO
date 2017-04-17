pragma solidity ^0.4.8;
contract Exchange{
    Account private myAccount;
    Account private partnerAccount;
    string myCompanyName;
    function Exchange (address me,address partner){
        myAccount=Account(me);
        partnerAccount=Account(partner);

    }

    function to(bytes32 targerName,int amount) returns (bool){
        LoyaltyPoint target = LoyaltyPoint(myAccount.getLoyaltyPoint(targerName));
        LoyaltyPoint source = LoyaltyPoint(myAccount.getLocalLoyaltyPoint());

        //solidity VM cannot read variable-sized data from external function calls.
        LoyaltyPoint partnerSource = LoyaltyPoint(partnerAccount.getLoyaltyPoint(myAccount.getCompanyName()));
		LoyaltyPoint partnerTarget = LoyaltyPoint(partnerAccount.getLocalLoyaltyPoint());

		if (source.getPoints() - amount < 0) {
			return false;
		}

		// A to B
		source.addPoints(0 - amount);
		partnerSource.addPoints(amount);
		// B to A
		target.addPoints(amount * int(target.getRate()));
		partnerTarget.addPoints(0 - (amount * int(target.getRate())));

		return true;

    }
    function getAccount() constant returns(Account){
        return myAccount;
    }
    function getPartnerAccount() constant returns(Account){
		return partnerAccount;
	}

}

contract Account{
    bytes32 private companyName;
    mapping (bytes32 => address) private loyaltyPoints;

	function Account(bytes32 _companyName) public {

		companyName = _companyName;
		address loyaltyPointAddress = new LoyaltyPoint(companyName, 0, 1);
		loyaltyPoints[companyName]=loyaltyPointAddress;
	}

	function getLoyaltyPoint(bytes32 name) public constant returns(address) {

		return loyaltyPoints[name];
	}

	function  getLocalLoyaltyPoint() constant returns(address) {


		return loyaltyPoints[companyName];
	}

	function getCompanyName() public constant returns(bytes32) {
		return companyName;
	}

	function addLoyaltyPoint(bytes32 companyName, int points, uint rate) public returns(address) {
		LoyaltyPoint newLoyaltyPointAddress=new LoyaltyPoint(companyName,points,rate);
		loyaltyPoints[companyName]=newLoyaltyPointAddress;
		return newLoyaltyPointAddress;


	}
}

contract LoyaltyPoint {
	 bytes32 private name;
	 int private points;
	 uint private rate; // 1 local points = "rate" points of "name"

//   event getLocalLoyaltyPointAddress(address LocalLoyaltyPointAddress);
	function LoyaltyPoint(bytes32 _name, int _points, uint _rate) public {
		name = _name;
		points = _points;
		rate = _rate;
	}

	function  getName() public constant returns(bytes32) {
		return name;
	}

	function setName(bytes32 _name) public  {
		name = _name;
	}

	function getPoints() public constant returns (int) {
		return points;
	}

	function addPoints(int amount) public {
		points += amount;
	}

	function setPoints(uint points) public {
		points = points;
	}

	function  getRate() public constant returns (uint) {
		return rate;
	}

}
