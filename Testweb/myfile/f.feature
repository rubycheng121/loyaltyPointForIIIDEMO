Feature: Sum A and B
  As a user
  I want to caculate the sum of a and b

  Scenario Outline: Calculate
    Given A is <a> 
    And B is <b>
    When I want to caculate the sum of a and b
    Then the sum of A and B is <sum>

    Examples:
    |  a  |  b  |  sum  |
    | 100 | 150 |  250  |
