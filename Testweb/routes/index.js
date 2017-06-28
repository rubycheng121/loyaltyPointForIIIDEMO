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

router.post('/cucumber',async function (req, res, next) {
	var exec = require('child_process').exec;
	var cmd = 'cucumberjs features/test.feature';
	await fs.writeFileSync('features/step_definitions/test.js', req.body.stepDefinitions);
	await fs.writeFileSync('features/test.feature', req.body.featureSource);
	exec(cmd, function (error, stdout, stderr) {
		console.log(error);
		console.log(stdout);
		console.log(stderr);
        res.send({
            output: stdout,
            setinput: stdout.slice(stdout.indexOf('1) Scenario: '))
			.replace(/\[.*?[Hm]/g, '')
			.replace(/\d+\) Scenario(.*\n)(.*\n)(.*\n)(.*\n)/mg,'')
			.replace(/\d+ scenarios \((.*\n)/,'')
			.replace(/\d+ steps \((.*\n)/,'')
			.replace(/\d+m\d+\.\d+s/,'')
			.replace(/       /mg,'    ')
        })
	});
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
	sql.upload(req.body, req.session.user, (success, result) => {
		res.json({
			success: success,
			result: result
		});
	})
});

router.post('/download', function (req, res, next) {




});

router.post('/sign_in', function (req, res, next) {

	console.log("登錄");
	console.log(req.body);
	/*
	sql.sing_in(req.body.user, req.body.password, (success, result) => {
		if (success) {
			req.session.sing_in = true;
			req.session.user = req.body.user;
		}
		res.json({
			success: success,
			result: result
		});
	})
	*/
});

router.post('/sign_up', function (req, res, next) {

	console.log("註冊");
	console.log(req.body);
	/*
	sql.sing_up(req.body.user, req.body.email, req.body.password, (success, result) => {
		res.json({
			success: success,
			result: result
		});
	});
	*/
});

router.post('/sign_out', function (req, res, next) {

	console.log("登出");
	
	req.session.destroy();
	res.sendFile(path.resolve('public', 'index.html'));
});

module.exports = router;