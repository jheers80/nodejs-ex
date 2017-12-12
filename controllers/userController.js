var User=require('../models/user');

exports.user_list = function(req,res) {
	res.send('NOT IMPLEMENTED:User List');
};

exports.user_detail = function(req, res) {
	res.send('NOT IMPLEMENTED:User Detail:'+req.params.id);
};

exports.user_create_get = function(req, res) {
	res.send('NOT IMPLEMENTED:User create GET');
};

exports.user_create_post = function(req, res) {
	res.send('NOT IMPLEMENTED:User create POST');
};

exports.user_delete_get = function(req, res) {
	res.send('NOT IMPLEMENTED:User delete GET');
};

exports.user_delete_post = function(req, res) {
	res.send('NOT IMPLEMENTED:User delete POST');
};

exports.user_update_get = function(req, res) {
	res.send('NOT IMPLEMENTED:User update GET');
};

exports.user_update_post = function(req, res) {
	res.send('NOT IMPLEMENTED:User update POST');
};