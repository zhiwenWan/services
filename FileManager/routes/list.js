var express = require('express');
var router = express.Router();

var path = require('path');
var fs = require('fs');
var location = path.join(__dirname, '../public/crx');


/* GET list page. */
router.get('/', function(req, res, next) {

    fs.readdir(location, function(err, files) {
      if (err) {
        res.status(err.status || 500);
        res.render('error');
      }
      else {
        res.render('list', { title: 'Files', files: files});
      }
     });
  });