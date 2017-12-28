var TrainingInstance = require('../models/traininginstance');
var Location = require('../models/location');
var Jobrole = require('../models/jobrole');
var TrainingData = require('../models/trainingdata');
var sanitizeHTML=require('sanitize-html');
var async = require('async');

const mongoose = require('mongoose')
 mongoose.Promise = Promise

//** @return {Promise}
function findTrainingInstance(id) {
			return TrainingInstance.findById(id)
			.populate('Location')
			.populate('JobRole')
			.exec();
				
}

exports.training_instance_detail_JSON = function (req, res, next) {
	findTrainingInstance(req.params.id).then(function(ti) {
			res.json(ti);
	});
};

exports.training_instance_detail = function (req, res, next) {
	findTrainingInstance(req.params.id).then(function(ti) {
		res.render('traininginstance_detail', {
			title: 'Training Instance',
			ti: ti
		});
	});
	
};

exports.training_instance_create_post = function (req, res, next) {
	//Check incoming info!
	req.checkBody('location', 'Location must be chosen').notEmpty();
	req.checkBody('jobrole', 'Job Role must be chosen').notEmpty();
	req.checkBody('name', 'Name/Description must be chosen').notEmpty();
	req.sanitize('name').escape();
	req.sanitize('location').trim();
	req.sanitize('jobrole').trim();
	req.sanitize('name').trim();
	req.sanitize('location').escape();
	req.sanitize('jobrole').escape();
	var ti = new TrainingInstance({
			Name: req.body.name,
			JobRole: (typeof req.body.jobrole === undefined ? [] : req.body.jobrole),
			Location: (typeof req.body.location === undefined ? [] : req.body.location),
		});
	var errors = req.validationErrors();
	if (errors) {
		async.parallel({
			locations: function (callback) {
				Location.find(callback);
			},
			jobroles: function (callback) {
				Jobrole.find(callback);
			},
		}, function (err, results) {
			if (err) {
				return next(err);
			}
			res.render('traininginstance_form', {
				title: 'Training Instance Create',
				ti: ti,
				location: results.locations,
				jobrole: results.jobroles,
				errors: errors
			});
		});
	} else {
		ti.save(function (err) {
			if (err) {
				return next(err);
			}
			res.redirect(ti.url);
		});
	}
};

exports.training_instance_create_get = function (req, res) {
	async.parallel({
		jobrole: function (callback) {
			Jobrole.find(callback);
		},
		location: function (callback) {
			Location.find(callback);
		},
	}, function (err, results) {
		if (err) {
			return next(err);
		}
		res.render('traininginstance_form', {
			title: 'Training Instance Create',
			location: results.location,
			jobrole: results.jobrole,
		});
	});
};

exports.training_instance_delete_get = function (req, res, next) {
	res.send('DELETE TRAINING INSTANCE NOT IMPLEMENTED: GET');
};

exports.training_instance_delete_post = function (req, res, next) {
	res.send('DELETE TRAINING INSTANCE NOT IMPLEMENTED: POST');
};

exports.training_instance_update_get = function (req, res, next) {
	res.send('NOT IMPLEMENTED: Training instance update get');
};

exports.training_instance_update_post = function (req, res, next) {
	res.send('NOT IMPLEMENTED: Training Instance update Post');
};

exports.training_instance_data_list_get = function (req, res, next) {
	TrainingInstance.findById(req.params.ti_id)
	.populate('JobRole')
	.populate('Location')
	.exec(function (err, ti) {
		if (err) {
			return next(err);
		}
		//Find Children!
		TrainingData.find({
			TrainingInstance: ti._id,
			Root: true
		})
		.populate('TrainingInstance')
		.populate('Children')
		.exec(function (err2, tids) {
			if (err2) {
				return next(err);
			}
			res.render('training_instance_data_list', {
				title: 'Training Instance Data',
				edit:false,
				training_instance: ti,
				training_data: tids
			});

		});
	});
};

exports.training_instance_data_list_get_JSON = function (req, res, next) {
	TrainingInstance.findById(req.params.ti_id)
	.populate('JobRole')
	.populate('Location')
	.exec(function (err, ti) {
		if (err) {
			return next(err);
		}
		//Find Children!
		TrainingData.find({
			TrainingInstance: ti._id,
			Root: true
		})
		.populate('TrainingInstance')
		.populate('Children')
		.exec(function (err2, tids) {
			if (err2) {
				return next(err);
			}
			res.json(tids);
		});
	});
};


exports.training_instance_data_list_get_edit = function (req, res, next) {
	var cmd=req.params.command;
	var san_cmd="";
	switch (cmd) {
		case "add":
			san_cmd="add";
		case "delete":
			san_cmd="delete";
		case "move":
			san_cmd="move";
		default:
			san_cmd="";
	}
	TrainingInstance.findById(req.params.ti_id)
	.populate('JobRole')
	.populate('Location')
	.exec(function (err, ti) {
		if (err) {
			return next(err);
		}
		//Find Children!
		TrainingData.find({
			TrainingInstance: ti._id,
			Root: true
		})
		.populate('TrainingInstance')
		.populate('children')
		.exec(function (err2, tids) {
			if (err2) {
				return next(err);
			}
			res.render('training_instance_data_list', {
				title: 'Training Instance Data',
				training_instance: ti,
				edit:true,
				add:(san_cmd=="add"),
				move:(san_cmd=="move"),
				del:(san_cmd=="delete"),
				training_data: tids
			});

		});
	});
};

exports.training_instance_data_list_post = function (req, res, next) {
	req.checkBody('data', 'Data must contain some information').notEmpty();
	req.body.data=sanitizeHTML(req.body.data,{allowedAttributes:false,allowedTags:sanitizeHTML.defaults.allowedTags.concat(['img','span'])});
	req.sanitize('data').trim();
	req.sanitize('parID').escape();
	req.sanitize('parID').trim();
	var ti_id = req.params.ti_id;
	var errors = req.validationErrors();
	if (errors) {
		TrainingInstance.findById(ti_id)
		.populate('Location')
		.populate('JobRole')
		.populate('children')
		.exec(function (err, ti) {
			if (err) {
				return next(err);
			}
			res.render('training_instance_data_list', {
				title: 'Training Instance Data',
				training_instance: ti,
				errors: errors
			});
		});
	} else {
		//No Errors in form, so let's continue

		//Get the Training Instance
		TrainingInstance.findById(ti_id)
		.populate('Location')
		.populate('JobRole')
		.exec(function (err, ti) {
			if (err) {
				return next(err);
			}
			if (req.body.parID == 0) {
				//no parent!
				var ti_d = new TrainingData({
						Text: req.body.data,
						TrainingInstance: ti,
						Children: [],
						Order: 0,
						Root: true,
					});
				ti_d.save(function (err) {
					if (err) {
						return next(err);
					}
					res.redirect(ti.url + '/trainingdata');
				});
			} else {
				//Parent
				// Get Parent Data, Create new Training Instance, Save Training Data to DB, insert Training data into parent & update
				async.waterfall([
						function (callback) {
							//get parent data - return as td_parent in callback
							TrainingData.findOne({
								TrainingInstance: ti,
								_id: req.body.parID
							})
							.populate('Children')
							.populate('TrainingInstance')
							.exec(function (err, td_parent) {
								if (err) {
									return next(err);
								}
								callback(null, td_parent);
							});
						},
						function (td_parent, callback) {
							//Create new training data with the data we have, return td_new and td_parent
							td_new = new TrainingData({
									Text: req.body.data,
									TrainingInstance: ti,
									Children: [],
									Order: td_parent.numChildren,
								});
							callback(null, td_parent, td_new);
						},
						function (td_parent, td_new, callback) {
							//Save td_new in DB, pass back td_parent and td_new
							td_new.save(function (err) {
								if (err) {
									return next(err);
								}
								callback(null, td_parent, td_new);
							});
						},
						function (td_parent, td_new, callback) {
							//Update parent with the new child
							//Save parent with the added child, pass back td_parent
							td_parent.Children.push(td_new);

							td_parent.save(function (err) {
								if (err) {
									return next(err);
								}
								callback(null, td_parent);
							});
						}
					], function (err_cb, results) {
					//render the page with the whole training instance including the newly inserted data
					if (err_cb) {
						return next(err);
					}
					res.redirect(results.TrainingInstance.url + '/trainingdata');
				});
			}
		});
		if (req.body.parID == 0) {
			//no parent!

		}
	}
}

exports.copy_training_instance_get = function(req, res, next) {
	TrainingInstance.find({})
	.populate('JobRole')
	.populate('Location')
	.exec(function (err, list_training_instance) {
		if (err) {
			return next(err);
		}
		//Successful, so render!
		res.render('ti_copy',{title:'Copy Training Instance',ti_list:list_training_instance});
	});
	
}

exports.copy_training_instance_post = function(req, res, next) {
	res.send("Training Instance Copy not implemented");
}

exports.training_instance_list = function (req, res, next) {
	TrainingInstance.find({})
	.populate('JobRole')
	.populate('Location')
	.exec(function (err, list_training_instance) {
		if (err) {
			return next(err);
		}
		//Successful, so render!
		res.render('training_instance_list', {
			title: 'Training Instance List',
			list_training_instance: list_training_instance
		});
	});
};
