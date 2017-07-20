Feature: Exchange loyalty points between two parties
  In order to exchange loyalty points between company A and company B
  As a smart contract
  I want to exchange loyalty points of A (alp) for loyalty points of B (blp) or
            exchange loyalty points of B (alp) for loyalty points of A (blp)
            according to corresponding preset exchanging rate and rules.


  Scenario Outline: Company A exchanges alp for blp
    Given the exchange rate is 1alp=0.5blp
    And original alp account of A is <alp account orig>
    And original blp account of A is <blp account orig>
    And original alp account of B is <alp account orig of B>
    And original blp account of B is <blp account orig of B>
    When A want to exchange <alp to exchange> alp for blp
    Then alp account of A should be <alp account new>
    And blp account of A should be <blp account new>
    And alp account of B should be <alp account new of B>
    And blp account of B should be <blp account new of B>

    Examples:
    | alp to exchange |  alp account orig | alp account new | blp account orig | blp account new | alp account orig of B | alp account new of B | blp account orig of B | blp account new of B |
    | 100             |  100              | 0               | 100              | 150             | 100                   | 200                  | 100                   | 50                   |
    | 20              |  100              | 80              | 100              | 110             | 100                   | 120                  | 100                   | 90                   |
    | 110             |  100              | 100             | 100              | 100             | 100                   | 100                  | 100                   | 100                  |

 # do we allow floating point alp and blp?
