var express = require('express');
var router = express.Router();
var Q = require('q');
var fs = require('fs');

router.get('/', function(req, res, next) {
	console.log(req.cookies)
	if (!req.query.id)return res.send({
		message: 'id is undefined',
		code: 404
	})
	const id = req.query.id;
	res.cookie('setCookie','text', { httpOnly: true,});
	const rep = new RegExp(/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/);

	if (id.length != 18 || !rep.test(id))return res.send({
		message: 'Invalid identity',
		code: 404
	});
	const readingArr = [
		readFileQ('./public/json/cn.province.json'),
		readFileQ('./public/json/cn.city.json'),
		readFileQ('./public/json/cn.district.json')
	];
	Q.all(readingArr)
		.then((resolve) => {
			const areaCodeArr = resolve;
			for (var i = 0; i < areaCodeArr.length; i++) {
				areaCodeArr[i] = JSON.parse(areaCodeArr[i]);
			}

			const results = {};

			const areaCode = id.slice(0, 6);
			results.province = areaCodeArr[0][areaCode.slice(0, 2) + '0000'] || '',
			results.city = areaCodeArr[1][areaCode.slice(0, 4) + '00'] || '';
			results.district = areaCodeArr[2][areaCode] || '';

			results.sex = id.charAt(16) % 2 == 0 ? '女' : '男';

			results.date = id.slice(6, 14);

			res.send({
				message:'success',
				code:'200',
				data:results
			})
		}, (reject) => {
			res.send(reject)
		})
});

function readFileQ(path) {
	var defer = Q.defer();
	fs.readFile(path, 'utf8', (err, data) => {
		if (err) defer.reject('err');
		defer.resolve(data)
	})
	return defer.promise;
}

module.exports = router;
