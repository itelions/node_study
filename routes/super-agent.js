var express = require('express');
var router = express.Router();
var Q = require('q');
var request = require('superagent')
var cheerio = require('cheerio');

/* GET home page. */
router.get('/', function(req, res, next) {

	const headers = {
		'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
		Cookie: 'IR_PI=1499130698470-fpo2f6u9h1w; __utmt=1; IR_EV=1500021539545%7C4953%7C0%7C1500021539545; _xsrf=2|8697a38f|9b8256800afcc97eb32d3903d1dc3061|1500021719; __utma=96128154.1737208339.1491805693.1499130654.1500018480.4; __utmb=96128154.6.10.1500018480; __utmc=96128154; __utmz=96128154.1500018480.4.4.utmcsr=baidu|utmccn=(organic)|utmcmd=organic; sweeper_uuid=ede63c7807b24ed1a72bfd4b22680320; bsid=c9c5db7b543c4d55a8b496e7c9fd28fa; sweeper_session="2|1:0|10:1500021750|15:sweeper_session|84:NmFiMGIyZTQtMjg3NC00ZDgzLTgwMDEtYzI1OWQ2ZWI0OGQxMjAxNy0wNy0xNCAwODo0MjozMC44OTg5OTY=|6b68ebfdd72ad90a61d1af44ed27734f09027e1a1adf6b043b8945d72b42a949"',
		Host: 'www.wish.com',
		Origin: 'https://www.wish.com',
		Referer: 'https://www.wish.com/',
		'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36',
		'X-Requested-With': 'XMLHttpRequest',
		'X-XSRFToken': '2|8697a38f|9b8256800afcc97eb32d3903d1dc3061|1500021719'
	}

	const formData = {
		cid:'57ee4cf926444623bcd23658',
		related_contest_count:9,
		include_related_creator:false,
		request_sizing_chart_info:true,
		_buckets:'',
		_experiments:'',
	}
	
	request
		.post('https://www.wish.com/api/product/get')
		.set(headers)
		.send(formData)
		.end((req_s, res_s) => {
			// console.log(req_s,res_s)
			res.send(JSON.parse(res_s.text));
			//res.send(res_s);
		})
});

module.exports = router;
