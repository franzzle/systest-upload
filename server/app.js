var express = require('express')
var multer  = require('multer')
var path = require('path')
var mkdirp = require('mkdirp');
var uuid = require('uuid');

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    var dest = path.join('/Users/franzzle/uploads/' + uuid.v4());
    mkdirp.sync(dest);
    cb(null, dest);
   },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

var upload = multer({ storage: storage })

//If the filename should be unique, the diskstorage should not be used.
//var upload = multer({ dest: '/Users/franzzle/uploads' })

var app = express()

app.all('/upload', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });

// uploads the file to the multer diskstorage
app.post('/upload', upload.single('file'), function (req, res, next) {
    //file details
    console.log(req.file.originalname); 
    console.log(req.body);

    res.json({error_code:0,err_desc:null});
})

app.listen('8877', function () {
    console.log('running on 8877...');
});