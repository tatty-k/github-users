var express = require('express');
var router = express.Router();
var request = require('request');
var rootURL = "http://api.github.com/";

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {userData: null});
});

router.post('/',function(req, res){
  //set up the options url with headers
  var options = {
    url: rootURL + 'users/' + req.body.username,
    headers: {
      'User-Agent': 'tatty-k', 
      'Authorization': 'token ' + process.env.GITHUB_TOKEN
    } 
  };
  request( options, function(err, response, body){
    // update options url to fetch user's repos
    var userData = JSON.parse(body);  
    options.url = userData.repos_url;
    request(options, function(err, response, body){
      // add a repos property
      userData.repos = JSON.parse(body);
      console.log(userData.repos[0].name);
      res.render('index', {userData})
      });
  });
});

module.exports = router;
