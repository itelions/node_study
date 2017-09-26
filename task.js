const log4js = require('log4js');
const path = require('path');
const request = require('superagent');
const logConfig = require('./task.static.js').log_config;

log4js.configure(logConfig);
const logger = log4js.getLogger('result');

const getDetail = () => {

	const detailHeader = require('./task.static.js').detail_header;
	const detailFormData = {
		cid: '57ee4cf926444623bcd23658',
		related_contest_count: 9,
		include_related_creator: false,
		request_sizing_chart_info: true,
		_buckets: '',
		_experiments: '',
	}
	request
		.post('https://www.wish.com/api/product/get')
		.set(detailHeader)
		.send(detailFormData)
		.end((req, res) => {
			if (res.text) {
				var { data } = JSON.parse(res.text);
				var { contest } = data;
				var { merchant_info, id } = contest;
				var { title } = merchant_info;
				logger.info('[' + title + '] [' + id + ']')
				console.log('finish')
			} else {
				console.log('fail')
			}
		})
}

// getDetail();
