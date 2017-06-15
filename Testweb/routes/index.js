var path = require('path');
var express = require('express');
var fs = require('fs');
var Mocha = require('mocha');
var Cucumber = require('cucumber');
var solc = require('solc');
var router = express.Router();
var sql = require('../lib/SQL.js');

// 資料庫連線發生錯誤處理
sql.connection.connect(function (err) {
    if (err) {
        console.log('error when connecting to db:', err);
        // 2秒後重新連線
        setTimeout(handleDisconnect, 2000);
    }
});

/* GET home page. */
router.get('/', function (req, res, next) {
    res.sendFile(path.resolve('public', 'index.html'));
});

router.get('/editor', function (req, res, next) {
    res.sendFile(path.resolve('public', 'editor.html'));
});

router.post('/cucumber', function (req, res, next) {
    var resdata;
    var feature = Cucumber.FeatureParser.parse({
        scenarioFilter: new Cucumber.ScenarioFilter({}),
        source: req.body.featureSource,
        uri: '/feature'
    });

    Cucumber.clearSupportCodeFns();
    new Function(req.body.stepDefinitions)();
    var supportCodeLibrary = Cucumber.SupportCodeLibraryBuilder.build({
        cwd: '/',
        fns: Cucumber.getSupportCodeFns()
    });

    var formatterOptions = {
        colorsEnabled: true,
        cwd: '/',
        log: function (data) {
            console.log(data);
            resdata = data;
        },
        supportCodeLibrary: supportCodeLibrary
    };
    var prettyFormatter = Cucumber.FormatterBuilder.build('pretty', formatterOptions);
    var runtime = new Cucumber.Runtime({
        features: [feature],
        listeners: [prettyFormatter],
        supportCodeLibrary: supportCodeLibrary
    });
    runtime.start();
    res.send(resdata)
})

router.post('/mocha', function (req, res, next) {

    Object.keys(require.cache).forEach(function (file) {
        delete require.cache[file];
    });

    var mocha = new Mocha({
        ui: 'bdd',
        reporter: 'spec'
    });
    fs.writeFileSync('test.js', req.body.mocha);

    mocha.addFile('test.js');
    var write = process.stdout.write;
    var output = '';
    process.stdout.write = function (str) {
        output += str;
    };

    mocha.run(function (failures) {
        process.stdout.write = write;
        console.log(output);
        res.send(output.replace(/\[.*?[Hm]/g, ''))
    });
})

router.post('/compile', function (req, res, next) {
    var source = req.body.solidity;
    var compiledContract = solc.compile(source, 1);
    //var abi = compiledContract.contracts[].interface;
    //var bytecode = compiledContract.contracts[].bytecode;
    //fs.writeFileSync('contract.abi', abi);
    //fs.writeFileSync('contract.bin', bytecode);
    console.log(compiledContract)
    res.send('compile');
})

router.post('/upload', function (req, res, next) {

    

    res.redirect('/');
});

router.post('/registration', function (req, res, next) {

    console.log("註冊");
    console.log(req.body);

    //web3.personal.newAccount("1234");
    console.log("create a new account not work in testrpc");


    connection.query('INSERT INTO smart.account SET ?', req.body, function (error) {
        if (error) {
            console.log('寫入資料失敗！');
            throw error;
        }
    });

    res.redirect('/');
});

router.post('/login', function (req, res, next) {

    console.log("登錄");
    console.log(req.body);

    res.cookie('ID', req.body.ID);
    res.cookie('signed_ID', req.body.ID, {
        signed: true
    });
    res.redirect('/');
});

module.exports = router;