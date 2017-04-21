# cucumberDemo


## 路徑說明
### Solidity

web Example Code : ./webExample

Solidity Code : ./Contract/Contract.sol

contract ABI , contract bytecode : ./build/

(注意：deploey前必須先產出 Contract之abi,bytecode ，即```npm run solc``` ,  則會產出abi,bytecode至 ./build/)

### cucumber

Gherkin : features/Exchange_loyalty_points_between_two_parties.feature

high level test code : features/step_definitions/Exchange_loyalty_points_between_two_parties.steps.js

features Code (import code) : script/Code.js

### mocha

unit test code : ./test/test.js , ./test/senatio/



## testrpc

1. 安裝

  ```npm install -g node-gyp```

  ```npm install -g ethereumjs-testrpc```

2. 執行

  ```testrpc -p 8545 -a 100 -l 88888888```

## compiler contract (solcjs@0.4.8)

1. ```npm run solc ```

## Unit Test (mocha)
### start unit test ###

0. ```testrpc -p 8545 -a 100 -l 88888888```
1. ```npm instll``` (one time)
1. ``` npm test```

## Cucumber.js
### start BDD test ###

0. ```testrpc -l 88888888 -p 8545``` or connect to private chain```
1. ```npm instll``` (one time)
2. ```node run cucumber```
