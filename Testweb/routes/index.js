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
  
  Object.keys( require.cache ).forEach( function( file ) {
        delete require.cache[ file ];
    } );
  
  var mocha = new Mocha({ui : 'bdd',reporter :　'spec'});
  fs.writeFileSync('test.js',req.body.mocha);
  
  mocha.addFile('test.js');
  var write = process.stdout.write;
  var output = '';
  process.stdout.write = function(str) {
    output += str;
  };

  mocha.run(function(failures) {
    process.stdout.write = write;
    console.log(output);
    res.send(output.replace(/\[.*?[Hm]/g, ''))
  });
})
module.exports = router;
