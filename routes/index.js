var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	let type = 0;
	if (req.query.type) {
		type = req.query.type;
	} else {
		res.send('404 not found')
		return
	}
	res.render('index', {
		title: 'Expresses',
		message: type,
		list: [
			{ name: '张三', age: '13' },
			{ name: '李四', age: '14' },
			{ name: '王五', age: '15' }
		]
	});
});

module.exports = router;
