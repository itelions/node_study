var express = require('express');
var router = express.Router();
var Q = require('q');
var cheerio = require('cheerio');
var nodegrass = require('nodegrass');
var MongoClient = require('mongodb').MongoClient;
var respond=null,
	datalist = [],
	DB_CONN_STR = 'mongodb://someone:123456@192.168.1.165:27017/test';

// 爬取数据的方法
router.post('/',function(req, res, next){
	//设置跨域
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header("Access-Control-Allow-Methods","POST");
	res.header("X-Powered-By",' 3.2.1');
	res.header("Content-Type", "application/json;charset=utf-8");

	//爬取的网页
	var targetUrl='https://ruby-china.org/topics/excellent';
	//初始化页码
	var nowPage=1;
	respond=res;
	getInfoByPage(targetUrl,nowPage)
	
})

//分页获取数据的方法
router.get('/get-item',function(req, res, next){
	//设置跨域
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header("Access-Control-Allow-Methods","GET");
	res.header("X-Powered-By",' 3.2.1');
	res.header("Content-Type", "application/json;charset=utf-8");

	connectDatabase().then(function(db){
		var collection = db.collection('exellent');
		//排序类型
		var sort_type=req.query.sort_type,
		//当前页码
		page=parseInt(req.query.page)||1,
		//一次请求的数量
		size=parseInt(req.query.size)||12;
		//升降序显示 大于0降序 小于0升序
		sort=req.query.sort&&req.query.sort>0? -1:1;
		// 创建查询条件
		var find_params={};
		
		var filter_params={};
		filter_params.sort={};
		if(sort_type)filter_params.sort[sort_type]=sort;
		filter_params.skip=(page-1)*size;
		filter_params.limit=size;
		// 查询数据库
		// 返回信息总数
		collection.find({}).toArray(function(err,result){
			if(!err){
				var total=result.length;
				collection.find(find_params,filter_params).toArray(function(err,result){
					if(!err){
						//返回数据
						res.send(JSON.stringify({data:result,total:total,msg:'success'}));
					}else{
						console.log(err)
						res.send(JSON.stringify({msg:'error'}));
					}
					db.close();
				})
			}else{
				console.log(err)
				res.send(JSON.stringify({msg:'error'}));
				db.close();
			}
		});
	})

})

//连接数据库的方法
function connectDatabase(){
	var defer=Q.defer();
	MongoClient.connect(DB_CONN_STR,function(err, db) {
		if(!err){
			console.log('connect success');
			defer.resolve(db);
		}else{
			defer.reject('connect fail')
		}
	})
	return defer.promise
}

//爬取数据
var getInfoByPage=function(url,page){
	console.log(url+'?page='+page)
	nodegrass.get(url+'?page='+page,function(data,status,headers){
		var $ = cheerio.load(data);

		if($('.topic').length==0){
			connectDatabase().then(function(db){
			    insertData(db,datalist,function(result) {
			        db.close();
			    });
			});

			return respond.send('all done');
		}

		$('.topic').each(function(){
			var item={};
			var $this=$(this);
			item.avatar=$this.find('.avatar img').eq(0).attr('src');
			item.topic=$this.find('span.node').eq(0).text();
			item.title=$this.find('.title a').eq(0).text();
			item.link='https://ruby-china.org/'+$this.find('.title a').eq(0).attr('href');
			item.user_name=$this.find('a.user-name').eq(0).text();
			item.topic_size=parseInt($this.find('div.count a.state-false').eq(0).text())||0;
			datalist.push(item);
		})
		
		page++;
		getInfoByPage(url,page);
	})
}
//插入数据
var insertData = function(db,data,callback) {  
    //连接到表 site
    var collection = db.collection('exellent');
    //清空数据
	collection.remove({}, function(err, result) {
		if(err){
			console.log('Error:'+ err);
			return;
		}     
		//插入数据
	    collection.insert(data, function(err, result) { 
	        if(err){
	            console.log('Error:'+ err);
	            return;
	        }     
	        callback(result);
	    });
	});
    
}

module.exports = router;