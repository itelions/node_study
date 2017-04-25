var express = require('express');
var router = express.Router();
var Q =require('q');
//使用promise来解决回调金字塔
router.get('/', function(req, res, next) {
	sendMsg(res);

	var arr=[
		doingNothing(1),
		doingNothing(2)
	]

	Q.all(arr).then(function(text){
		var defer=Q.defer();
		defer.resolve(text);
		return defer.promise;
	}).then(function(text){
		console.log(text)
	});
});
var sendMsg=(res)=>{
	res.send('ass');
}

var doingNothing=(num)=>{
	var defer=Q.defer();
	setTimeout(function(){
		defer.resolve('doing'+num)
	})
	return defer.promise
}

module.exports = router;