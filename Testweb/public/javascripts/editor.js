var featureEditor
var stepDefinitionsEditor
var solidityEditor
var mochaEditor
var auxiliaryCodeEditor
var $output
var $mochaOutput
var $solidityOutput
var step;
var functionName;

function appendToOutput(data) {
	$output.append(data);
	$output.scrollTop($output.prop("scrollHeight"));
}

function appendToMochaOutput(data) {
	$mochaOutput.append(data);
	$mochaOutput.scrollTop($mochaOutput.prop("scrollHeight"));
}

function appendToSolidityOutput(data) {
	$solidityOutput.append(data);
	$solidityOutput.scrollTop($solidityOutput.prop("scrollHeight"));
}

function appendToStepDefinitionsEditor(data) {
	stepDefinitionsEditor.setValue(data);
}

function appendToMochaEditor(data) {
	mochaEditor.setValue(data);
}

function appendToSolidityEditor(data) {
	solidityEditor.setValue(data);
}

function displayError(error) {
	var errorContainer = $('<div>')
	errorContainer.addClass('error').text(error.stack || error);
	appendToOutput(errorContainer)
}

$(function () {

	step = checkstep(0);

	featureEditor = ace.edit("feature");
	featureEditor.getSession().setMode("ace/mode/gherkin");

	stepDefinitionsEditor = ace.edit("step-definitions");
	stepDefinitionsEditor.getSession().setMode("ace/mode/javascript");

	mochaEditor = ace.edit("mocha");
	mochaEditor.getSession().setMode("ace/mode/javascript");

	solidityEditor = ace.edit("solidity");
	solidityEditor.getSession().setMode("ace/mode/solidity");

	auxiliaryCodeEditor = ace.edit("auxiliaryCode");
	auxiliaryCodeEditor.getSession().setMode("ace/mode/javascript");

	$output = $('#output');
	$mochaOutput = $('#mochaOutput');
	$solidityOutput = $('#solidityOutput');

	window.onerror = displayError;

	$('#run-feature').click(function () {
		$output.empty();
		$('a[href="#step-definitions-tab"]').tab('show');

		if (step == 0) step = checkstep(1);
		else if (step == 1) step = checkstep(2);
		else if (step == 5) step = checkstep(6);

		$.post('/cucumber', {
			featureSource: featureEditor.getValue(),
			stepDefinitions: stepDefinitionsEditor.getValue(),
			code: auxiliaryCodeEditor.getValue()
		}, (result) => {
			appendToOutput(ansiHTML(result.output))

			if (stepDefinitionsEditor.getValue().trim().length == 0) {
				let head = "const { defineSupportCode } = require('cucumber');\nconst assert = require('assert');\nconst Web3 = require('web3');\nconst web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));\n\n";
				let contract_arr = JSON.parse($('#contract_name').text());
				let contract = "";
				$.each(contract_arr, function (i, item) {
					contract += 'let ' + i + '_abi\n'
					contract += 'let ' + i + '_bytecode\n'
					item.forEach((element, index, array) => {
						contract += 'let ' + element + '_contract\n'
						contract += 'let ' + element + '_address\n'
					});
					contract += '\n'
				});
				console.log(contract_arr);
				appendToStepDefinitionsEditor(head + contract + "defineSupportCode(function ({ Given, When, Then, And }) {\n" + result.setinput.replace(//g, "") + "});")
			}
			else if (mochaEditor.getValue().trim().length == 0) {

				functionName = stepDefinitionsEditor.getValue().match(/[.][\w]+[(]/g);
				functionName = functionName.filter((el, i, arr) => arr.indexOf(el) === i);
				functionName = functionName.filter(isFunction)

				let head = "const assert = require('assert');\nconst Web3 = require('web3');\nconst web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));\n\n";
				let contract_arr = JSON.parse($('#contract_name').text());
				let contract = "";
				$.each(contract_arr, function (i, item) {
					contract += 'let ' + i + '_abi\n'
					contract += 'let ' + i + '_bytecode\n'
					item.forEach((element, index, array) => {
						contract += 'let ' + element + '_contract\n'
						contract += 'let ' + element + '_address\n'
					});
					contract += '\n'
				});
				let body = "describe('Scenario 0 : XXXXX', function () {\n\tthis.timeout(0)\n\n\tdescribe('XXXX', function () {\n\n\t})\n})";
				appendToMochaEditor(head + contract + body);
			}
		})
	})

	$('#run-mocha').click(function () {
		$mochaOutput.empty();
		$.post("/mocha", {
			mocha: mochaEditor.getValue(),
			code: auxiliaryCodeEditor.getValue()
		}, (result) => {
			appendToMochaOutput(ansiHTML(result))
			if (solidityEditor.getValue().trim().length == 0) {
				var obj = JSON.parse($('#contract_name').text());
				console.log(obj);
				let head = "pragma solidity ^0.4.8;\n\n";
				let contract = ""
				$.each(obj, function (index, value) {
					contract += 'contract ' + index + ' {\n\n}\n\n'
				});
				let body = functionName.toString();
				appendToSolidityEditor(head + contract + body);
			}
		});
		if (step == 2) step = checkstep(3);
		else if (step == 4) step = checkstep(5);
	});

	$('#compile').click(function () {
		$('a[href="#solidity-tab"]').tab('show');
		$solidityOutput.empty();
		$.post("/compile", {
			solidity: solidityEditor.getValue()
		}, (result) => {

			let abi = '';
			let bytecode = '';
			for (var index in result) {
				abi = 'let ' + result[index].name.slice(1) + '_abi = ' + result[index].abi;
				bytecode = 'let ' + result[index].name.slice(1) + "_bytecode = '0x" + result[index].bytecode + "'";

				appendToStepDefinitionsEditor(stepDefinitionsEditor.getValue().replace('let ' + result[index].name.slice(1) + '_abi', abi));
				appendToStepDefinitionsEditor(stepDefinitionsEditor.getValue().replace('let ' + result[index].name.slice(1) + '_bytecode', bytecode));
				appendToMochaEditor(mochaEditor.getValue().replace('let ' + result[index].name.slice(1) + '_abi', abi));
				appendToMochaEditor(mochaEditor.getValue().replace('let ' + result[index].name.slice(1) + '_bytecode', bytecode));

				appendToSolidityOutput('<h3>' + result[index].name.slice(1) + '\n');
				appendToSolidityOutput(abi + '\n');
				appendToSolidityOutput(bytecode + '\n');
			}
			console.log(result);
		});
		if (step == 3) step = checkstep(4);
	});

	$('#download').click(function () {
		$.post("/download", {}, (result) => {
			console.log(result);
			featureEditor.setValue();
			stepDefinitionsEditor.setValue();
			solidityEditor.setValue();
			mochaEditor.setValue();
		});
	});

	$('#upload').click(function () {
		$.post("/upload", {
			project: getUrlVars().project,
			feature: featureEditor.getValue(),
			stepDefinitions: stepDefinitionsEditor.getValue(),
			solidity: solidityEditor.getValue(),
			mocha: mochaEditor.getValue()
		}, (result) => {
			alert(result.result);
		});
	});

	$('#full').click(function () {
		$('#full span').toggleClass("glyphicon-resize-full glyphicon-resize-small");
		if ($('#full span').hasClass('glyphicon-resize-small')) {
			$('header').show();
			$('.tab-pane').css("height", "80vh");
		} else {
			$('header').hide();
			$('.tab-pane').css("height", "90vh");
		}
	});

});

$(window).load(function () {

	let project = getUrlVars().project;
	$.post("get_project", {
		project: project
	}, (data) => {
		featureEditor.setValue(data[0].feature);
		stepDefinitionsEditor.setValue(data[0].stepDefinitions);
		mochaEditor.setValue(data[0].mocha);
		solidityEditor.setValue(data[0].solidity);
	});
})

function checkstep(status) {
	console.log(status)
	switch (status) {
		case 0:
			break;
		case 1:
			$('#feature-span').attr('class', 'glyphicon glyphicon-ok');
			break;
		case 2:
			$('#step_definitions-span').attr('class', 'glyphicon glyphicon-warning-sign');
			$('#run-feature span').attr('class', 'glyphicon');
			$('#run-mocha span').attr('class', 'glyphicon glyphicon-screenshot');
			break;
		case 3:
			$('#unit_test-span').attr('class', 'glyphicon glyphicon-warning-sign');
			$('#run-mocha span').attr('class', 'glyphicon');
			$('#compile span').attr('class', 'glyphicon glyphicon-screenshot');
			break;
		case 4:
			$('#contract-span').attr('class', 'glyphicon glyphicon glyphicon-ok');
			$('#compile span').attr('class', 'glyphicon');
			$('#run-mocha span').attr('class', 'glyphicon glyphicon-screenshot');
			break;
		case 5:
			$('#unit_test-span').attr('class', 'glyphicon glyphicon-ok');
			$('#run-mocha span').attr('class', 'glyphicon');
			$('#run-feature span').attr('class', 'glyphicon glyphicon-screenshot');
			break;
		case 6:
			$('#step_definitions-span').attr('class', 'glyphicon glyphicon-ok');
			$('#run-feature span').attr('class', 'glyphicon');
			break;
	}
	return status;
}

function read_file(fileinfo) {
	var file = fileinfo.files[0];
	var fReader = new FileReader();
	fReader.onload = function (event) {
		featureEditor.setValue(event.target.result);
	};
	fReader.readAsText(file);
}

function dragoverHandler(evt) {
	evt.preventDefault();
}

function dropHandler(evt, target) { //evt 為 DragEvent 物件
	evt.preventDefault();
	var file = evt.dataTransfer.files[0];
	var reader = new FileReader();
	var editor;

	switch (target) {
		case 'feature':
			editor = featureEditor;
			reader.readAsText(file);
			break;
		case 'step-definitions':
			editor = stepDefinitionsEditor;
			reader.readAsText(file);
			break;
		case 'mocha':
			editor = mochaEditor;
			reader.readAsText(file);
			break;
		case 'solidity':
			editor = solidityEditor;
			reader.readAsText(file);
			break;
	}

	reader.onload = function (event) {
		editor.setValue(event.target.result);
	};
}

function dragEnter(evt, target) { //evt 為 DragEvent 物件
	evt.preventDefault();

	$("#tool-bar li").removeClass("active");
	$(".tab-pane").removeClass("active");

	switch (target) {
		case 'feature':
			$("#tool-bar li:eq(0)").addClass("active");
			$(".tab-pane:eq(0)").addClass("active");
			break;
		case 'step-definitions':
			$("#tool-bar li:eq(1)").addClass("active");
			$(".tab-pane:eq(1)").addClass("active");
			break;
		case 'mocha':
			$("#tool-bar li:eq(2)").addClass("active");
			$(".tab-pane:eq(2)").addClass("active");
			break;
		case 'solidity':
			$("#tool-bar li:eq(3)").addClass("active");
			$(".tab-pane:eq(3)").addClass("active");
			break;
	}
}

function getUrlVars() {
	var vars = [],
		hash;
	var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
	for (var i = 0; i < hashes.length; i++) {
		hash = hashes[i].split('=');
		vars.push(hash[0]);
		vars[hash[0]] = hash[1];
	}
	return vars;
}

function isFunction(value) {

	switch (value) {
		case '.HttpProvider(':
		case '.newRequest(':
		case '.ok(':
		case '.writeFile(':
		case '.ifError(':
		case '.at(':
		case '.cwd(':
		case '.stringify(':
		case '.resolve(':
		case '.contract(':
			return false;
		default:
			return true;
	}

	return value >= 10;
}