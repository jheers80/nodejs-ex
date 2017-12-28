var TrainingData = require('../models/trainingdata');
var TrainingInstance = require('../models/traininginstance');
async = require('async');

exports.training_data_detail = function (req, res, next) {
	res.send('Training Data Detail NOT IMPLEMENTED');
};

exports.training_data_create_get = function (req, res) {
	
	//send back: 	ti_id = training instance ID
	//				ti = training Instance if one has already been passed
	//				ti_list = list of all training instances
	var ti_id="";
	var ti={};
	var ti_list=[];
	//Training Data must be tied to a training instance. so we need to check if we got a training instance ID first
	if (req.params.ti_id) {
		//Got an instance id!
		req.sanitize('ti_id').escape();
		req.sanitize('ti_id').trim();
		ti_id=req.params.ti_id;
		TrainingInstance.findById(ti_id)
		.populate('children')
		.exec(function(err, ti) {
			if (err) {return next(err);}
		
		});
	}
	res.render('training_data_form', {
		title: 'Create Training Data'
	});
};

exports.training_data_create_post = function (req, res) {
	res.send('Training Data Detail NOT IMPLEMENTED');
};

exports.training_data_delete_get = function (req, res, next) {
	res.send('DELETE DATA NOT IMPLEMENTED: GET');
};

exports.training_data_delete_post = function (req, res, next) {
	res.send('DELETE DATA NOT IMPLEMENTED: POST');
};

exports.training_data_update_get = function (req, res) {
	res.send('NOT IMPLEMENTED: Training data update get');
};

exports.training_data_update_post = function (req, res) {
	res.send('NOT IMPLEMENTED: Training Data update Post');
};

exports.training_data_list = function (req, res, next) {
	TrainingData.find({})
	.exec(function (err, list_training_data) {
		if (err) {
			return next(err);
		}
		//Successful, so render!
		res.render('training_data_list', {
			title: 'Training Data List',
			training_data_list: list_training_data
		});
	});
};
