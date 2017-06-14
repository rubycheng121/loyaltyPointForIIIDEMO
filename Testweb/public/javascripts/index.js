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
});

function read_file(fileinfo) {
	var file = fileinfo.files[0];
	var fReader = new FileReader();
	fReader.onload = function (event) {
		featureEditor.setValue(event.target.result);
	};
	fReader.readAsText(file);
}