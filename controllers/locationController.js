var Location = require('../models/location');
var StoreStatus = require('../models/storeStatus');
var async = require('async');
mongoose = require('mongoose');

exports.location_list = function (req, res, next) {
	Location.find({})

	.exec(function (err, list_locations) {
		if (err) {
			return next(err);
		}
		//Successful, so render!
		res.render('location_list', {
			title: 'Location List',
			location_list: list_locations
		});
	});
};

exports.location_detail = function (req, res, next) {
	async.parallel({
		loc: function (callback) {
			Location.findById(req.params.id)
			.populate('Status')
			.exec(callback);
		}
	}, function (err, results) {
		if (err) {
			return next(err);
		}
		console.log(results.loc);
		res.render('location_detail', {
			title: 'Location',
			loc: results.loc
		});
	});
};

exports.location_create_get = function (req, res, next) {
	async.parallel({
		storeStatuses: function (callback) {
			StoreStatus.find(callback)
		},
	}, function (err, results) {
		if (err) {
			return next(err);
		}
		res.render('location_form', {
			title: 'Create Location',
			Status: results.storeStatuses
		});
	});
};

exports.location_create_post = function (req, res, next) {
	//req.checkBody('Location', 'Location name required').notEmpty();
	req.checkBody('LocationID', 'LocationID must contain 4 digits').isNumeric().isLength(4);
	//req.sanitize('Location').escape();
	req.sanitize('LocationID').escape();
	//req.sanitize('Location').trim();
	req.sanitize('LocationID').trim();
	req.checkBody('City','City Name Required').notEmpty();
	req.sanitize('City').escape();
	req.sanitize('City').trim();
	req.checkBody('State','State Abbreviation Required').isLength(2);
	req.sanitize('State').escape();
	req.sanitize('State').trim();
	req.sanitize('Status').escape();
	req.sanitize('Status').trim();
	//Sanitize status array for each value individually as validator works for string value only
	if (req.body.status instanceof Array) {
		req.body.status = req.body.status.map((initialStatus) => {
				req.body.tempStatus = initialStatus;
				req.sanitize('tempStatus').escape();
				return req.body.tempStatus;
			});
		delete req.body.tempStatus;
	} else
		req.sanitize('Status').escape();

	var loc = new Location({
			State: req.body.State,
			City: req.body.City,
			LocationID: req.body.LocationID,
			Status: (typeof req.body.status === 'undefined') ? [] : req.body.status
		});
		console.log('loc: '+loc);
	var errors = req.validationErrors();
	if (errors) {
		async.parallel({
			
			statuses:function(callback) {
				StoreStatus.find(callback);
			},
		}, function(err, results) {
			if (err) {return next(err);}
			res.render('location_form',{title:'Create Location', Status:results.statuses, loc:loc, errors:errors});
		});
	} else {
		loc.save(function(err) {
			if (err) {return next(err);}
			res.redirect(loc.url);
		});
	}
};

exports.location_delete_get = function (req, res) {
	res.send('NOT IMPLEMENTED:Location delete GET');
};

exports.location_delete_post = function (req, res) {
	res.send('NOT IMPLEMENTED:Location delete POST');
};

exports.location_update_get = function (req, res) {
	res.send('NOT IMPLEMENTED:Location update GET');
};

exports.location_update_post = function (req, res) {
	res.send('NOT IMPLEMENTED:Location update POST');
};
