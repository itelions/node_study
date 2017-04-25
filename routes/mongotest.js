var express = require('express');
var router = express.Router();
var Q = require('q');
var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://root:123456@192.168.1.165:27017';

router.get('/', (req, res, next)=> {
    rootDbConnect('test','exellent')
    .then((targetCollection)=>{
       return collectionOperate(targetCollection);
    },(err)=>{
        res.send(err)
    })
    .then((result)=>{
        res.send(result);
    },(err)=>{
        res.send(err);
    })
	
});
//连接数据库
var rootDbConnect=(dbName,collectionName)=>{
    var defer=Q.defer();
    MongoClient.connect(DB_CONN_STR,(err, db)=> {
        var targetDb=db.db(dbName);
        var collection=targetDb.collection(collectionName);
		if(!err){
            defer.resolve(collection);
		}else{
            defer.reject(JSON.stringify(err))
		}
	})
    return defer.promise;
}
//操作表格
var collectionOperate=(collection,find_params)=>{
    var defer=Q.defer();
    var query_params={};
    if(find_params)query_params=find_params;
    collection.find({}).toArray((err,result)=>{
         if(!err){
             defer.resolve(JSON.stringify(result));
         }else{
             defer.reject(JSON.stringify(err));
         }
    })
    return defer.promise;
}

module.exports = router;
