var express = require('express')
var multer  = require('multer')
var path = require('path')
var mkdirp = require('mkdirp');
var uuid = require('uuid');
var fs=require('fs');

const UPLOAD_PATH='/Users/franzzle/uploads/';

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(req.body);
    var dest = path.join(UPLOAD_PATH  + uuid.v4());
    mkdirp.sync(dest);
    cb(null, dest);
   },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

var upload = multer({ storage: storage });

//If the filename should be unique, the diskstorage should not be used.
// var upload = multer({ dest: UPLOAD_PATH })

var app = express()

app.all('/upload', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });

// uploads the file to the multer diskstorage
app.post('/upload',upload.any(), function (req, res, next) {
    
    console.log(req.files);

    var testDataFile = path.join(UPLOAD_PATH  + 'testData.json');
    fs.writeFile(testDataFile, JSON.stringify(req.body), (err) => {
      if (err) throw err;
      console.log('It\'s saved!');
    });

    //file details
    // console.log(req.file.originalname); 
    // console.log(req.body);

    res.json({error_code:0,err_desc:null});
})

app.listen('8877', function () {
    console.log('running on 8877...');
});