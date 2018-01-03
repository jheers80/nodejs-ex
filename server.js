//  OpenShift sample Node application
var express = require('express'),
app = express(),
morgan = require('morgan'),
mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var path=require('path');
var cors=require('cors');

app.use(express.static('public'));
app.set('views', path.join(__dirname,'views'));
app.set('view engine','pug');

Object.assign = require('object-assign')

	app.engine('html', require('ejs').renderFile);
//app.use(morgan('combined'))
app.use(morgan('dev'));

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
ip = process.env.IP || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0',
mongoURL = process.env.OPENSHIFT_MONGODB_DB_URL || process.env.MONGO_URL,
mongoURLLabel = "";

if (mongoURL == null && process.env.DATABASE_SERVICE_NAME) {
var mongoServiceName = process.env.DATABASE_SERVICE_NAME.toUpperCase(),
mongoHost = process.env[mongoServiceName + '_SERVICE_HOST'],
mongoPort = process.env[mongoServiceName + '_SERVICE_PORT'],
mongoDatabase = process.env[mongoServiceName + '_DATABASE'],
mongoPassword = process.env[mongoServiceName + '_PASSWORD']
mongoUser = process.env[mongoServiceName + '_USER'];

if (mongoHost && mongoPort && mongoDatabase) {
mongoURLLabel = mongoURL = 'mongodb://';
if (mongoUser && mongoPassword) {
mongoURL += mongoUser + ':' + mongoPassword + '@';
}
// Provide UI label that excludes user id and pw
mongoURLLabel += mongoHost + ':' + mongoPort + '/' + mongoDatabase;
mongoURL += mongoHost + ':' + mongoPort + '/' + mongoDatabase;

}
}
var db = null,
dbDetails = new Object();

var initDb = function (callback) {
if (mongoURL == null)
return;

var mongodb = require('mongodb');
if (mongodb == null)
return;

mongodb.connect(mongoURL, function (err, conn) {
if (err) {
callback(err);
return;
}

db = conn;
dbDetails.databaseName = db.databaseName;
dbDetails.url = mongoURLLabel;
dbDetails.type = 'MongoDB';

console.log('Connected to MongoDB at: %s', mongoURL);
});
};


var mongoDB = 'mongodb://dbuser_master:supersecurepassword@ds137256.mlab.com:37256/jheers80-training-test';
mongoose.connect(mongoDB, {
	useMongoClient: true
});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
var port=8080;


app.get('/', function (req, res) {
	// try to initialize the db on every request if it's not already
	// initialized.
	if (!db) {
		initDb(function (err) {});
	}
	if (db) {
		var col = db.collection('counts');
		// Create a document with request IP and current time of request
		col.insert({
			ip: req.ip,
			date: Date.now()
		});
		col.count(function (err, count) {
			res.render('index.html', {
				pageCountMessage: count,
				dbInfo: dbDetails
			});
		});
	} else {
		res.render('index.html', {
			pageCountMessage: null
		});
	}
});
app.get('/pagecount', function (req, res) {
	res.json({status:false,message:'Not implemented'});
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(expressValidator({
	customValidators:{
		isEqual:(value1,value2)=> {
			return value1===value2;
		}
	}
})); // Add this after the bodyParser middlewares!
var user = require('./routes/user');
var location = require('./routes/location');
var train = require('./routes/train');



app.use('/user/', user);
app.use('/location', location);
app.use('/train', train);

// error handling
app.use(function (err, req, res, next) {
	console.error(err.stack);
	res.status(err.status || 500);
	res.render('error',{
		message:err.message,
		error:err
	});
});

initDb(function (err) {
	console.log('Error connecting to Mongo. Message:\n' + err);
});

app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);

module.exports = app;
