var express = require('express');
var router = express.Router();
var cheerio = require('cheerio');
var nodegrass = require('nodegrass');

router.get('/', function(req, res, next) {
	nodegrass.get('http://localhost:8080',function(data,status,headers){
		console.log(data);
		res.send(data);
	})
	
});

module.exports = router;
