var path = require('path');
var express = require('express');
var fs = require('fs');
var Mocha = require('mocha');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile(path.resolve('public', 'index.html'));
});
router.post('/mocha',function(req, res, next){
  fs.writeFileSync('test.js',req.body.mocha);
  var mocha = new Mocha({ui : 'bdd',reporter :　'list'});
  mocha.addFile('test.js');
  mocha.reporter().run();
  console.log(mocha.reporter()._reporter)
  //console.log(req.body.mocha);
})
module.exports = router;
