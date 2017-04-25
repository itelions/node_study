var express = require('express');
var qiniu = require('qiniu');
var router = express.Router();

//需要填写你的 Access Key 和 Secret Key
qiniu.conf.ACCESS_KEY = '1D6xwfFsmvQ5OH92qE56EbXemYPkMYm9Ry6S2HaV';
qiniu.conf.SECRET_KEY = 'uJP58pLViu4tfMouFbW6H0BMT06FdtB0HSzLqFn8';
bucket = 'fortest';

//构建上传策略函数
function uptoken(bucket) {
  var putPolicy = new qiniu.rs.PutPolicy(bucket);
  return putPolicy.token();
}

router.post('/',function(req, res, next){
	
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header("Access-Control-Allow-Methods","POST,GET");
	res.header("X-Powered-By",' 3.2.1');
	res.header("Content-Type", "application/json;charset=utf-8");
	let resObj={
		"uptoken":uptoken(bucket),
		"time":new Date().getTime(),
		"user_name":req.body.name
	}

	res.send(JSON.stringify(resObj));
})

module.exports = router;