var featureEditor
var stepDefinitionsEditor
var solidityEditor
var mochaEditor
var $output
var $mochaOutput
var $solidityOutput

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

function displayError(error) {
	var errorContainer = $('<div>')
	errorContainer.addClass('error').text(error.stack || error);
	appendToOutput(errorContainer)
}

function getUrlVars() {
	var vars = [], hash;
	var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
	for (var i = 0; i < hashes.length; i++) {
		hash = hashes[i].split('=');
		vars.push(hash[0]);
		vars[hash[0]] = hash[1];
	}
	return vars;
}

$(function () {
	featureEditor = ace.edit("feature");
	featureEditor.getSession().setMode("ace/mode/gherkin");

	stepDefinitionsEditor = ace.edit("step-definitions");
	stepDefinitionsEditor.getSession().setMode("ace/mode/javascript");

	mochaEditor = ace.edit("mocha");
	mochaEditor.getSession().setMode("ace/mode/javascript");

	solidityEditor = ace.edit("solidity");
	solidityEditor.getSession().setMode("ace/mode/solidity");

	$output = $('#output');
	$mochaOutput = $('#mochaOutput');
	$solidityOutput = $('#solidityOutput');

	window.onerror = displayError;

	$('#run-feature').click(function () {
		$output.empty();
		$('a[href="#step-definitions-tab"]').tab('show');
		$.post('/cucumber', {
			featureSource: featureEditor.getValue(),
			stepDefinitions: stepDefinitionsEditor.getValue()
		}, (result) => {
			appendToOutput(ansiHTML(result.output))
			if (stepDefinitionsEditor.getValue().length == 0) {
				appendToStepDefinitionsEditor("const { defineSupportCode } = require('cucumber');\ndefineSupportCode(function ({ Given, When, Then, And }) {\n" + result.setinput.replace(//g, "") + "});")
			}

		})
	});

	$('#run-mocha').click(function () {
		$mochaOutput.empty();
		$('a[href="#mocha-tab"]').tab('show');
		$.post("/mocha", {
			mocha: mochaEditor.getValue()
		}, (result) => {
			appendToMochaOutput(ansiHTML(result))
		});
	});

	$('#compile').click(function () {
		$solidityOutput.empty();
		$('a[href="#solidity-tab"]').tab('show');
		$.post("/compile", {
			solidity: solidityEditor.getValue()
		}, (result) => {
			for (var index in result) {
				appendToSolidityOutput("" + result[index].name.slice(1) + '\n' + 'abi : ' + result[index].abi + '\n' + 'bytecode : ' + result[index].bytecode + '\n\n');
			}
			console.log(result);
		});
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
	$.post("get_project", {project: project}, (data) => {
		featureEditor.setValue(data[0].feature);
		stepDefinitionsEditor.setValue(data[0].stepDefinitions);
		mochaEditor.setValue(data[0].mocha);
		solidityEditor.setValue(data[0].solidity);
	});
})

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

