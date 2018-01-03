var jwt=require('jsonwebtoken');
var config=require('../config');

function verifyToken(req, res, next) {
  var token=req.headers['x-access-token'];
  if (!token) {
    //no token, go to login
    res.render('user_login',{title:'User Login', msg:'Login Required to view page requested', req_init:req.toString()});
  }
  jwt.verify(token, config.secret, function(err, decoded) {
    if (err) {return next(err);}
    //we are good!
    req.userID=decoded.id;
    next();
  });
};

module.exports=verifyToken;
