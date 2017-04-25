var express = require('express');
var router = express.Router();
// var mongodb=require('mongodb');
// var db=mongodb.Db;
var MongoClient = require('mongodb').MongoClient;
//数据库为 runoob
var DB_CONN_STR = 'mongodb://127.0.0.1:27017/test';

/* GET users listing. */
router.get('/:tableName', function(req, res, next) {
	MongoClient.connect(DB_CONN_STR, function(err, db) {
	    if(!err){
	    	res.send(req.params.tableName);
	    }
	});
});

router.get('/', function(req, res, next) {
	MongoClient.connect(DB_CONN_STR, function(err, db) {
	    if(!err){
	    	res.send('连接成功！');
	    }
	});
	
});

module.exports = router;
