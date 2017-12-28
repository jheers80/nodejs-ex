var Train=require ('../models/train');
var Location=require('../models/location');
var User=require('../models/user');
var Jobrole=require('../models/jobrole');

var async=require('async');

exports.index = function(req,res) {
	async.parallel({
		jobrole_count:function(callback) {
			Jobrole.count(callback);
		},
		location_count:function(callback) {
			Location.count(callback);
		},
		user_count:function(callback) {
			User.count(callback);
		},
	}, function (err, results) {
		res.render('index',{title:'Training System Home',error:err, data:results});
	});
};

exports.admin = function(req,res) {
	
};