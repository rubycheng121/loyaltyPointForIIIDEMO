# cucumberDemo


## 路徑說明
### Solidity


Solidity Code : ./Contract/Contract.sol

contract ABI , contract bytecode : ./build/

(注意：deploey前必須先產出 Contract之abi,bytecode ，即```npm run solc``` ,  則會產出abi,bytecode至 ./build/)

### cucumber

Gherkin : features/Exchange_loyalty_points_between_two_parties.feature

high level test code : features/step_definitions/Exchange_loyalty_points_between_two_parties.steps.js

features Code (import code) : script/model/Code.js

### mocha

unit test code : ./test/test.js , ./test/senatio/

### 其他相關

cucumberWITHweb3.js sample : https://github.com/rubycheng121/cucumberWITHweb3.git

web Example Code : ./webExample

JAVA Versin : ./javaversion


## testrpc

### WINDOWS
1.到 https://nodejs.org/en/download/ 下載及安裝 Node js

2.使用管理員權限(右鍵- 以系統管理員執行) 開啟 cmd
 
3.cd 到 nodejs 目錄下(裡面有npm)

4.```npm install -g –production windows-build-tools```

5.```npm install -g ethereumjs-testrpc```  (可能會跳出是否開啟防火牆警告, 按確定)

6 cmd 下 輸入 ```testrpc``` 即可開啟

### MacOS
1.到 https://nodejs.org/en/download/ 下載及安裝 Node js

2.開啟 terminal 輸入 : ```sudo npm install -g node-gyp && sudo npm install -g ethereumjs-testrpc```

3.terminal 下輸入 ```testrpc``` 即可開啟


### 執行

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
