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
		//setTimeout(handleDisconnect, 2000);
	}
});

/* GET home page. */
router.get('/', function (req, res, next) {
	if (req.session.user) {
		res.render('project', {
			user: req.session.user
		});
	} else {
		res.render('index');
	}
});

router.get('/editor', function (req, res, next) {
	if (req.session.user) {
		sql.get_project(req.session.user, req.query.project, (result) => {
			if (result == "") {
				res.send("找不到");
			} else {
				res.render('editor', {
					user: req.session.user,
					project: req.query.project,
					contract: result[0].contract
				});
			}
		});
	} else {
		res.render('index');
	}
});

router.post('/cucumber', async function (req, res, next) {
	var exec = require('child_process').exec;
	var cmd = 'start cmd.exe /c "cucumberjs features/test.feature > r.txt"';// /k "nodevars.bat" /k cucumberjs features/test.feature'
	await fs.writeFileSync('features/step_definitions/test.js', req.body.stepDefinitions);
	await fs.writeFileSync('features/test.feature', req.body.featureSource);
	await fs.writeFileSync('features/code.js', req.body.code);
	var stepdef = await fs.readFileSync('features/step_definitions/test.js').toString();
	var next = [];
	var findfunc = () => {
		if (stepdef.length != 0) {
			var func = stepdef.match(/\/\/add to next step(.*\r\n|.*\n)(.*)/mg);
			if (func != null) {
				func.forEach(function (element) {
					var a = [];
					element = element.replace(/\/\/add to next step(.*\r\n|.*\n)/, "")
						.replace(/(.*)\=( *)/mg, "")
						.replace(/\;/mg, "")
						.replace(/( *)/, "")
					if (element.match(/\,/mg) != null) {
						a.push(element.match(/\,/mg).length + 1);
					}
					else if (element.match(/\(\)/) != null) {
						a.push(0);
					}
					else {
						a.push(1);
					}
					element = element.replace(/\((.*)\)/mg, "")
					a.push(element);
					next.push(a);
				}, this);
				console.log(next);
			}
		}
	}
	await findfunc();
	//sql.get_contract(req.session.user, req.query.project, (result) => {
	//	console.log(result);
	//})
	exec(cmd, function (error, stdout, stderr) {
		if(error){
			throw error;
		}
		var r = fs.readFileSync('r.txt').toString();
		var a = r.match(/\d+ scenarios /)[0].match(/\d+/)[0]
		var b = r.match(/\d+ steps /)[0].match(/\d+/)[0]
		var c = b / a;
		res.send({
			next: next,
			output: r,
			setinput: r.slice(r.indexOf('1) Scenario: '), r.indexOf('' + (c + 1) + ') Scenario: '))
				.replace(/\[.*?[Hm]/g, '')
				.replace(/\d+\) Scenario(.*\n)(.*\n)(.*\n)(.*\n)/mg, '')
		})
	});
})

router.post('/mocha', async function (req, res, next) {
	var exec = require('child_process').exec;
	var cmd = 'start cmd.exe /c "mocha -c > mr.txt"'
	await fs.writeFileSync('test/test.js', req.body.mocha);
	await fs.writeFileSync('test/code.js', req.body.code);
	exec(cmd, function (error, stdout, stderr) {
		if(error){
			throw error;
		}
		var mr = fs.readFileSync('mr.txt').toString();
		res.send(mr);
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
	console.log("upload");
	console.log(req.body);
	sql.set_project(req.session.user, unescape(req.body.project), req.body.feature, req.body.stepDefinitions, req.body.solidity, req.body.mocha, (result) => {
		console.log(result);
		res.json({
			result: "Save successfully"
		})
	})
});

router.post('/download', function (req, res, next) {

});

router.post('/sign_in', function (req, res, next) {
	console.log("sign_in");
	console.log(req.body);

	sql.sing_in(req.body.user, req.body.password, (success, result) => {
		if (success) {
			req.session.user = req.body.user;
			res.redirect('/');
		} else {
			res.json({
				success: success,
				result: result
			});
		}
	})
});

router.post('/sign_up', function (req, res, next) {
	console.log("sign_up");
	console.log(req.body);

	sql.sing_up(req.body.user, req.body.email, req.body.password, (success, result) => {
		res.json({
			success: success,
			result: result
		});
	});
});

router.get('/sign_out', function (req, res, next) {
	console.log("sign_out");

	req.session.destroy();
	res.redirect('/');
});

router.post('/new_project', function (req, res, next) {
	console.log("new_project");
	console.log(req.body);
	console.log(req.body.contract);

	sql.new_project(req.session.user, req.body.project_name, req.body.contract, (success, result) => {
		if (success) {
			res.json(result);
		}
	});
});

router.post('/get_project_list', function (req, res, next) {
	console.log("get_project_list");
	sql.get_project_list(req.session.user, (result) => {
		res.json(result);
	});
});

router.post('/get_project', function (req, res, next) {
	console.log("get_project");
	sql.get_project(req.session.user, unescape(req.body.project), (result) => {
		res.json(result);
	});
});

router.post('/delete_project', function (req, res, next) {
	console.log("delete_project");
	console.log(req.body.project_name);
	sql.delete_project(req.session.user, unescape(req.body.project_name), (result) => {
		res.json(result);
	});
});

module.exports = router;