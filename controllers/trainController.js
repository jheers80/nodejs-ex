var Train=require ('../models/train');
var Location=require('../models/location');
var User=require('../models/user');
var Jobrole=require('../models/jobrole');
var Training_instance=require('../models/traininginstance');

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

exports.json_traininginstance_by_location_jobrole = function(req, res, next) {
	var loc_id=req.params.loc_id;
	var jr_id=req.params.jr_id;
	async.parallel({
		location:function(callback) {
			Location.findById(loc_id)
			.exec();
		},
		jobrole:function(callback) {
			Jobrole.findById(jr_id)
			.exec();
		},
		training_instance(callback) {
			Training_instance.find({Location:loc_id, JobRole:jr_id})
			.populate("Location")
			.populate("JobRole")
			.exec();
		}
	}, function(err, results) {
		if (err) {return next(err);}
		var loc=results.location;
		var jr= results.jobrole;
		if (!jr || !loc ) {
			//no jobrole or location... somethings wrong
			res.json({status:false, error:'No jobrole or location found for given ids.'});
		} else if (!training_instance) {
			res.json({status:false, error:'No data found for location/jobrole pair.'});
		} else {
			//got a jobrole, location, and a training_instance
			//Get full data
			TrainingData.find({TrainingInstance:training_instance._id, Root:true})
			.populate('TrainingInstance')
			.populate('Children')
			.exec(function(err,td) {
				if (err) {return next(err);}
				res.json(td);
			});
		}
	});
}

exports.admin = function(req,res) {

};
