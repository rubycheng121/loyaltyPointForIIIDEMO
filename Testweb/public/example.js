var featureEditor, stepDefinitionsEditor, mochaEditor, $output, $mochaOutput;

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
    log: function(data) {
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

function runMocha(){
  $mochaOutput.empty();
  $('a[href="#mocha-output-tab"]').tab('show');
  mocha.setup('bdd');
  describe('Mocha', function() {
	  it('really runs', function(done) {
      done();
    });
  });
  describe('Mocha2', function() {
	  it('really runs_2', function(done) {
      done();
    });
  });
  console.log(mocha.reporter());
  //clean(mocha.reporter());
  mocha.run();
  //mocha.clean();
}

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

$(function() {
  featureEditor = ace.edit("feature");
  featureEditor.getSession().setMode("ace/mode/gherkin");

  stepDefinitionsEditor = ace.edit("step-definitions");
  stepDefinitionsEditor.getSession().setMode("ace/mode/javascript");

  mochaEditor = ace.edit("mocha");
  mochaEditor.getSession().setMode("ace/mode/javascript");

  $output = $('#output');
  $mochaOutput = $('mochaOutput')

  window.onerror = displayError;
  
  $('#run-feature').click(function() {
    runFeature().then(function(success) {
      var exitStatus = success ? '0' : '1';
      var exitStatusContainer = $('<div>');
      exitStatusContainer.addClass('exit-status').text('Exit Status: ' + exitStatus);
      appendToOutput(exitStatusContainer);
    }).catch(displayError);
  });
  $('#run-mocha').click(function() {
    runMocha();
  });
});
