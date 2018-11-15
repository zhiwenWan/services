var express = require('express');
var router = express.Router();

var fs = require('fs');
var path = require ('path');
var location = path.join(__dirname, '../public/crx');

//multer object creation
var multer  = require('multer')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/crx/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
  }
})

var upload = multer({ storage: storage })

/* GET edit page. */
router.get('/', function(req, res, next) {

  fs.readdir(location, function(err, files) {
    if (err) {
      res.status(err.status || 500);
      res.render('error');
    }
    else {
      res.render('edit', { title: 'Files', files: files});
    }
   });
});

// upload the file to the server
router.post('/', upload.single('uploadFile'), function(req, res) {
  res.send("File upload sucessfully.");
});

// delete the file, pass file name with query string
router.delete('/', function(req, res, next) {
  var filename = req.query.filename;
  var filepath = "./public/crx/" + filename;
  
  fs.unlink(filepath, function(err) {
    if (err) {
      res.status(err.status || 500);
      res.render('error');
    }
    else {
      console.log('File deleted.');
      res.send('File deleted!!!');
    }
  });
});

// delete the file, pass file name with req.params
router.delete('/:name', function(req, res, next) {
  var filename = req.params.name;
  var filepath = "./public/crx/" + filename;
  
  fs.unlink(filepath, function(err) {
    if (err) {
      res.status(err.status || 500);
      res.render('error');
    }
    else {
      console.log('File deleted.');
      res.send('File deleted!!!');
    }
  });
});

module.exports = router;