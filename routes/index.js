var express = require('express');
var router = express.Router();
var request = require('request');
var rootURL = "http://api.github.com/";

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {userData: null});
});

router.post('/',function(req, res){
  var options = {
    url: rootURL + 'users/' + req.body.username,
    headers: {
      'User-Agent': 'tatty-k', 
      'Authorization': 'token ' + process.env.GITHUB_TOKEN
    } 
  };
  request( options, function(err, response, body){
    var userData = JSON.parse(body);  
    console.log(userData)
    res.render('index', {userData});
    });
});

module.exports = router;
