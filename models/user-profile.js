var UserProfileModel = function(cnf) {
    this.email = cnf.email,
    this.firstName = cnf.firstName,
    this.lastName = cnf.lastName,
	this.location =cnf.location
};

module.exports = UserProfileModel;