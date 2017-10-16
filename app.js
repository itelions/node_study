var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ExtraParams = require('./utils/ExtraParams');
var app = express();

var argv=ExtraParams();
if(argv.env)process.env.NODE_ENV=argv.env;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public',express.static(path.join(__dirname, 'public')));
// app.use('/static',express.static(path.join(__dirname, 'static')));

//restc插件 
// import restc
console.log(process.env.NODE_ENV)
if(process.env.NODE_ENV=='development'){
	const restc = require('restc');
	// use restc middleware
	app.use(restc.express());
}

//路由
const Routers = [
	{ path: '/index', route: './routes/index' },
	{ path: '/users', route: './routes/users' },
	{ path: '/promise', route: './routes/promise' },
	{ path: '/new_router', route: './routes/new_router' },
	{ path: '/mongotest', route: './routes/mongotest' },
	{ path: '/jsonp', route: './routes/jsonp' },
	{ path: '/file', route: './routes/file' },
	{ path: '/super-agent', route: './routes/super-agent' },
	{ path: '/id-analysis', route: './routes/id-analysis' },
	{ path: '/crowler', route: './routes/crowler' },
	{ path: '/puppeteer', route: './routes/puppeteer' },
]

Routers.map(item => app.use(item.path, require(item.route)));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	var err = new Error('Not Founds');
	err.status = 404;
	//next(err);
	res.sendFile('./public/404.html');
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.send('error');
});

module.exports = app;
