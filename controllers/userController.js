var User = require('../models/user');
var Location = require('../models/location');
var async = require('async');
var config=require('../config.js');

var crypto=require('crypto');

/**
 * check if password given matches user given
 * @function
 * @param {User} user - user object of potential user
 * @param {string} password - password to check
 */
 var checkPasswordForUser = function(password, user) {
	 if (!user || !user.passwordSalt) {
		 return false;
	 }
	 if (user)
	 var salt=user.passwordSalt.toString();
	 var passwordData=sha512(password, salt);
	 return passwordData.passwordHash===user.passwordHash;
 }

/**
 * generates random string of characters i.e salt
 * @function
 * @param {number} length - Length of the random string.
 */
var genRandomString=function(length) {
	return crypto.randomBytes(Math.ceil(length/2))
	.toString('hex').slice(0,length);
};

/**
 * hash password with sha512.
 * @function
 * @param {string} password - List of required fields.
 * @param {string} salt - Data to be validated.
 */
var sha512=function(password, salt) {
	var hash=crypto.createHmac('sha512', salt);
	hash.update(password);
	var value=hash.digest('hex');
	return {salt:salt,passwordHash:value};
};

function saltHashPassword(userpassword) {
    var salt = genRandomString(16); /** Gives us salt of length 16 */
    var passwordData = sha512(userpassword, salt);
	return passwordData;
    console.log('UserPassword = '+userpassword);
    console.log('Passwordhash = '+passwordData.passwordHash);
    console.log('nSalt = '+passwordData.salt);
}

exports.user_list = function (req, res) {

	User.find()
	.populate('Location')
	.exec(function (err, users) {
		if (err) {
			return next(err);
		}
		//Successful, so render!
		res.render('user_list', {
			title: 'User List',
			user_list: users,
		});
	});
};

exports.user_detail = function (req, res, next) {
	User.findById(req.params.id)
	.populate('Location')
	.exec(function(err,user) {
		if (err) {return next(err);}
		res.render('user_detail', {title:'User Detail', user:user});
	});
};

exports.user_create_get = function (req, res, next) {
	async.parallel({
		locations: function (callback) {
			Location.find(callback);
		},
	},
		function (err, results) {
		if (err) {
			return next(err);
		}
		res.render('user_form', {
			title: 'Create User',
			locations: results.locations,
		});
	});
};

exports.user_create_post = function (req, res) {
	req.checkBody('firstname','First Name must be entered.').notEmpty();
	req.sanitize('firstname').escape();
	req.sanitize('firstname').trim();
	req.checkBody('lastname','Last Name must be entered.').notEmpty();
	req.sanitize('lastname').escape();
	req.sanitize('lastname').trim();
	req.checkBody('password1','Password must be entered.').exists().notEmpty();
	req.sanitize('password1').escape();
	req.sanitize('password1').trim();
	req.checkBody('password2','Please Confirm Password.').exists().notEmpty();
	req.sanitize('password2').escape();
	req.sanitize('password2').trim();
	req.checkBody('password1','Passwords must match').isEqual(req.body.password2);
	var hsp=saltHashPassword(req.body.password1);

	var user=new User({
		firstName:req.body.firstname,
		lastName:req.body.lastname,
		Location:req.body.location,
		email:req.body.email,
		passwordHash:hsp.passwordHash,
		passwordSalt:hsp.salt,
	});
	var errors = req.validationErrors();
	if (errors) {
		async.parallel({
			locations:function(callback) {
				Location.find(callback);
			},
		}, function(err, results) {
			if (err) {return next(err);}
			res.render('user_form',{title:'Create User', locations:results.locations, user:user, errors:errors});
		});
	} else {
		User.find({email:req.body.email}).
		exec(function(err,user) {
			if (err) {return next(err);}
			if (!user) {
				user.save(function(err) {
					if (err) {return next(err);}
					var token=jwt.sign({id:user._id},config.secret,{expiresIn:86400 //24 hours
					});
					res.status(200).send({auth:true,token:token});
					res.redirect(user.url);
				});
			}
		});
	}
};

exports.user_login_post = function(req, res, next) {
	var loginError=false;
	errors=[];
	User.findOne({email:req.body.email})
		.exec(function(err, user) {
		if (err) {
			//Error
			return next(err);
		}
		if (!user) {
			loginError=true;
			errors.push({msg:'Username Invalid'});
		}
		var validLogin = checkPasswordForUser(req.body.password, user);
		if (validLogin) {
			//Valid login, now what we do?
			var token=jwt.sign({id:user._id},config.secret,{expiresIn:86400 //24 hours
			});
			res.send("User is Valid");

		} else {
			loginError=true;
		  errors.push({msg:'Username and Password Combination Invalid'});
		}
		if (loginError) {
			res.render('user_login',{title:'User Login',user:user,errors:errors});
		}
	});
}

exports.user_login_get = function(req, res) {
	res.render('user_login',{title:"User Login", errors:{}});
}

exports.user_delete_get = function (req, res) {
	res.send('NOT IMPLEMENTED:User delete GET');
};

exports.user_delete_post = function (req, res) {
	res.send('NOT IMPLEMENTED:User delete POST');
};

exports.user_update_get = function (req, res) {
	res.send('NOT IMPLEMENTED:User update GET');
};

exports.user_update_post = function (req, res) {
	res.send('NOT IMPLEMENTED:User update POST');
};

exports.user_logout=function(req,res) {
	var token=null;

}
