var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    if(req.query.callback){
        res.send(''+req.query.callback+'('+'"jsonp"'+')');
    }else{
         res.send('throw new Error("缺少callback参数")');
    };
});

module.exports = router;