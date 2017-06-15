var featureEditor
var stepDefinitionsEditor
var solidityEditor
var mochaEditor
var $output
var $mochaOutput

function runFeature() {
	$output.empty();
	$('a[href="#output-tab"]').tab('show');

	var featureSource = featureEditor.getValue();
	var feature = Cucumber.FeatureParser.parse({
		scenarioFilter: new Cucumber.ScenarioFilter({}),
		source: featureSource,
		uri: '/feature'
	});

	Cucumber.clearSupportCodeFns();
	new Function(stepDefinitionsEditor.getValue())();
	var supportCodeLibrary = Cucumber.SupportCodeLibraryBuilder.build({
		cwd: '/',
		fns: Cucumber.getSupportCodeFns()
	});

	var formatterOptions = {
		colorsEnabled: true,
		cwd: '/',
		log: function (data) {
			appendToOutput(ansiHTML(data));
		},
		supportCodeLibrary: supportCodeLibrary
	};
	var prettyFormatter = Cucumber.FormatterBuilder.build('pretty', formatterOptions);

	var runtime = new Cucumber.Runtime({
		features: [feature],
		listeners: [prettyFormatter],
		supportCodeLibrary: supportCodeLibrary
	});
	return runtime.start();
};


function appendToOutput(data) {
	$output.append(data);
	$output.scrollTop($output.prop("scrollHeight"));
}

function appendToMochaOutput(data) {
	$mochaOutput.append(data);
	$mochaOutput.scrollTop($mochaOutput.prop("scrollHeight"));
}

function displayError(error) {
	var errorContainer = $('<div>')
	errorContainer.addClass('error').text(error.stack || error);
	appendToOutput(errorContainer)
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
	$mochaOutput = $('#mochaOutput')

	window.onerror = displayError;

	$('#run-feature').click(function () {
		runFeature().then(function (success) {
			var exitStatus = success ? '0' : '1';
			var exitStatusContainer = $('<div>');
			exitStatusContainer.addClass('exit-status').text('Exit Status: ' + exitStatus);
			appendToOutput(exitStatusContainer);
		}).catch(displayError);
	});

	$('#run-mocha').click(function () {
		$.post("/mocha", {
			mocha: mochaEditor.getValue(),
			solidity: solidityEditor.getValue()
		}, (result) => {
			appendToMochaOutput(result)
		});
	});

	$('#save').click(function () {
		localStorage.setItem("feature", featureEditor.getValue());
		localStorage.setItem("stepDefinitions", stepDefinitionsEditor.getValue());
		localStorage.setItem("mocha", mochaEditor.getValue());
		localStorage.setItem("solidity", solidityEditor.getValue());
	});

	$('#download').click(function () {
		$.post("/download", {}, (result) => {
			featureEditor.setValue();
			stepDefinitionsEditor.setValue();
			solidityEditor.setValue();
			mochaEditor.setValue();
		});
	});

	$('#upload').click(function () {
		$.post("/upload", {
			feature: featureEditor.getValue(),
			stepDefinitions: stepDefinitionsEditor.getValue(),
			solidity: solidityEditor.getValue(),
			mocha: mochaEditor.getValue(),
		}, (result) => {
			appendToMochaOutput(result)
		});
	});

	$('#full').click(function () {
		$('#full span').toggleClass("glyphicon-resize-full glyphicon-resize-small");
		if ($('#full span').hasClass('glyphicon-resize-small')) {
			$('header').show();
			$('.tab-pane').css("height", "70vh");
		}
		else {
			$('header').hide();
			$('.tab-pane').css("height", "90vh");
		}
	});


});

$(window).load(function () {
	featureEditor.setValue(localStorage.getItem("feature"));
	stepDefinitionsEditor.setValue(localStorage.getItem("stepDefinitions"));
	mochaEditor.setValue(localStorage.getItem("mocha"));
	solidityEditor.setValue(localStorage.getItem("solidity"));
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

function dropHandler(evt, target) {//evt 為 DragEvent 物件
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