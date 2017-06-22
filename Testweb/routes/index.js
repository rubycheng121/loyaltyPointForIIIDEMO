var path = require('path');
var express = require('express');
var fs = require('fs');
var Mocha = require('mocha');
var Cucumber = require('cucumber');
var solc = require('solc');
var router = express.Router();
var session = require('express-session');
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

router.get('/project', function (req, res, next) {
	res.sendFile(path.resolve('public', 'project.html'));
});

router.get('/editor', function (req, res, next) {
	res.sendFile(path.resolve('public', 'editor.html'));
});



router.get('/', function (req, res, next) {
	res.sendFile(path.resolve('public', 'index.html'));
});

router.post('/cucumber', async function (req, res, next) {
	var resdata = "";
	var undofunc = "";
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
			if (data.includes('Undefined. Implement with the following snippet:')) {
				undofunc += data.slice(data.indexOf('Undefined. Implement with the following snippet:') + 50).replace(/     /g, "")
			}
			resdata += data;
		},
		supportCodeLibrary: supportCodeLibrary
	};
	var prettyFormatter = Cucumber.FormatterBuilder.build('pretty', formatterOptions);
	var runtime = new Cucumber.Runtime({
		features: [feature],
		listeners: [prettyFormatter],
		supportCodeLibrary: supportCodeLibrary
	});
	await runtime.start()
	res.send({
		output: resdata,
		setinput: undofunc.replace(/\[.*?[Hm]/g, '')
	})
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
	var info = [];
	var source = req.body.solidity;
	var compiledContract = solc.compile(source, 1);
	//console.log(compiledContract)
	for (var index in compiledContract.contracts) {
		var contractinfo = {
			'name': index,
			'abi': compiledContract.contracts[index].interface,
			'bytecode': compiledContract.contracts[index].bytecode
		}
		info.push(contractinfo);
	}
	res.send(info);
})

router.post('/upload', function (req, res, next) {

	




});

router.post('/download', function (req, res, next) {

	



	
});

router.post('/sign_in', function (req, res, next) {

	console.log("登錄");

	sql.sing_in(req.body.user, req.body.password, (success, result) => {
		if (success) {
			req.session.sing_in = true;
			req.session.name = req.body.user;
		}
		res.json({
			success: success,
			result: result
		});
	})
});

router.post('/sign_up', function (req, res, next) {

	console.log("註冊");

	sql.sing_up(req.body.user, req.body.email, req.body.password, (success, result) => {
		res.json({
			success: success,
			result: result
		});
	});
});

router.post('/sign_out', function (req, res, next) {

	console.log("登出");

	req.session.destroy();
	res.sendFile(path.resolve('public', 'index.html'));
});

module.exports = router;