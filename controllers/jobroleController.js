var Jobrole = require('../models/jobrole.js');
async=require('async');

exports.jobrole_detail = function (req, res, next) {
	Jobrole.findById(req.params.id)
	.exec(function(err,jobrole) {
		if (err) {return next(err);}
		res.render('jobrole_detail', {title: 'Job Role',jobrole: jobrole}); 
	});
};

exports.jobrole_create_post = function (req, res) {
	req.checkBody('jobrole', 'Job Role Name required').notEmpty();
	req.sanitize('jobrole').escape();
	req.sanitize('jobrole').trim();
	var errors = req.validationErrors();
	var jobrole = new Jobrole({
			Name: req.body.jobrole
		});
	if (errors) {
		//errors are present, so send a status of false and the errors too!
		res.render('jobrole_form', {
			title: 'Create Job Role',
			jobrole: jobrole,
			errors: errors
		});
		return;
	} else {
		Jobrole.findOne({
			Name: req.body.jobrole
		})
		.exec(function (err, found_jobrole) {
			console.log('found_jobrole: ' + found_jobrole);
			if (err) {
				return next(err);
			}
			if (found_jobrole) {
				//Status exists, redirect to detail page
				res.redirect(found_jobrole.url);
			} else {
				jobrole.save(function (err) {
					if (err) {
						return next(err);
					}
					res.redirect(jobrole.url);
				});
			}
		});
	}
}

exports.jobrole_create_get = function (req, res) {
	res.render('jobrole_form', {
		title: 'Create Job Role'
	});
}

exports.jobrole_delete_get = function (req, res, next) {
	Jobrole.findById(req.params.id)
	.exec(function(err,jobrole) {
		if (err) {return next(err);}
		res.render('jobrole_delete', {title: 'Delete Job Role',jobrole: jobrole}); 
	});	
};

exports.jobrole_delete_post = function (req, res, next) {
	req.checkBody('jobroleid','Job Role ID must exist').notEmpty();
	console.log('Job Role ID: '+req.body.jobroleid);
	Jobrole.findById(req.body.jobroleid)
	.exec(function(err,jobrole) {
		if (err) {return next(err);}
		//Check for use of jobrole before deleting!
		if (1!=1) {
			console.log(jobrole);
		} else {
			Jobrole.findByIdAndRemove(req.body.jobroleid, function deleteJobrole(err) {
				if (err) {return next(err);}
				res.redirect('/train/jobroles');
			});
		}
	});
}

exports.jobrole_update_get = function (req, res) {
	res.send('NOT IMPLEMENTED: Jobrole update get');
}

exports.jobrole_update_post = function (req, res) {
	res.send('NOT IMPLEMENTED: Jobrole update Post');
}

exports.jobrole_list = function (req, res) {
	Jobrole.find({})
	.exec(function(err, list_jobroles) {
		if (err) {return next(err);}
		//Successful, so render!
		res.render('jobrole_list',{title:'Job Role List',jobrole_list:list_jobroles});
	});
}
