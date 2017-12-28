var StoreStatus=require('../models/storeStatus');

exports.status_list = function(req,res,next) {
	StoreStatus.find({})
	.populate('storeStatus')
	.exec(function(err, list_statuses) {
		if (err) {return next(err);}
		//Successful, so render!
		res.render('status_list',{title:'Store Status List',status_list:list_statuses});
	});
};

exports.status_detail = function(req, res) {
	res.send('NOT IMPLEMENTED:StoreStatus Detail: '+req.params.id);
};

exports.status_create_get = function(req, res) {
	res.render('storeStatus_form',{title:'Create Status'});
};

exports.status_create_post = function(req, res) {
	req.checkBody('storeStatus','Status required').notEmpty();
	req.sanitize('storeStatus').escape();
	req.sanitize('storeStatus').trim();
	var errors=req.validationErrors();
	var status=new StoreStatus({Status:req.body.storeStatus});
	if (errors) {
		//errors are present, so send a status of false and the errors too!
		res.render('storeStatus_form', {title:'Create Location',storeStatus:status,errors:errors});
		return;
	}
	else {
		StoreStatus.findOne({Status:req.body.storeStatus})
		.exec(function(err,found_status) {
			console.log('found_status: '+found_status);
			if (err) {return next(err);}
			if (found_status) {
				//Status exists, redirect to detail page
				res.redirect(found_status.url);
			}
			else {
				status.save(function(err) {
					if (err) {return next(err); }
						res.redirect(status.url);
					});
			}
		});
	}
};

exports.status_delete_get = function(req, res) {
	res.send('NOT IMPLEMENTED:StoreStatus delete GET');
};

exports.status_delete_post = function(req, res) {
	res.send('NOT IMPLEMENTED:StoreStatus delete POST');
};

exports.status_update_get = function(req, res) {
	res.send('NOT IMPLEMENTED:StoreStatus update GET');
};

exports.status_update_post = function(req, res) {
	res.send('NOT IMPLEMENTED:StoreStatus update POST');
};