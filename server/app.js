var express = require('express')
var multer  = require('multer')
var upload = multer({ dest: '/Users/franzzle/uploads' })

var app = express()

app.all('/upload', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });


app.post('/upload', upload.single('file'), function (req, res, next) {
    logRequest(req);
    res.json({error_code:0,err_desc:null});
})

function logRequest(req) {
    console.log('original request url : ' + req.originalUrl);
    console.log('headers : ');
    console.log(req.headers);
    console.log('body : ' + JSON.stringify(req.body, null, 4));
}

app.listen('8877', function () {
    console.log('running on 8877...');
});