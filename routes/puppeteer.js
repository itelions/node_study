var express = require('express');
var router = express.Router();
const puppeteer = require('puppeteer');

router.get('/', function(req, res, next) {
	var page, borwser;
	if (!req.query.target) return res.send({
		msg: 'no target',
		code: 404
	})
	puppeteer.launch()
	.then(_borwser => {
			borwser = _borwser;
			return borwser.newPage();
		})
		.then(_page => {
			page = _page;
			page.setViewport({
				width: 1280,
				height: 720
			})
			return page.goto(req.query.target);
		})
		.then(_ => {
			return page.waitFor(2000)
		})
		// 保存pdf和网页快照
		// .then(_ => {
		// 	var randomName = parseInt(Math.random() * 10000) + new Date().getTime();
		// 	return Promise.all([
		// 		page.screenshot({ path: './public/screenshot/' + randomName + '.png' }),
		// 		page.pdf({ path: './public/pdf/' + randomName + '.pdf', format: 'A4' })
		// 	])
		// })
		.then(_ => {
			return page.content()
		})
		.then(_text=>{
			res.send({
				msg: 'ok',
				text:_text,
				code: 200
			})
			borwser.close();	
		})
		.catch(_err => {
			console.log(_err)
			res.send({
				msg: 'error',
				code: 200
			})
		})
})

module.exports = router;
