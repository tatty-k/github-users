var express = require('express');
var router = express.Router();
var request = require('request');
var rootURL = "http://api.github.com/";

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {userData: null});
});

router.post('/',function(req, res){
  request(
    rootURL + 'users/' + req.body.username + 
    '?access_token=' + process.env.GITHUB_TOKEN,
    function(err, response, body){
      res.render('index', {userData: body});
    }
  )
})

module.exports = router;
