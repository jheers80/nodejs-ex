var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Jobrole = require('./jobrole');
var Location = require('./location');
var TrainingData = require('./trainingdata');

var TrainingInstanceSchema = new Schema({
		Name: String,
		JobRole: {
			type: Schema.ObjectId,
			ref: 'Jobrole'
		},
		Location: {
			type: Schema.ObjectId,
			ref: 'Location'
		},
	});

TrainingInstanceSchema.virtual('url').get(function () {
	return '/train/traininginstance/' + this._id;
});




module.exports = mongoose.model('TrainingInstance', TrainingInstanceSchema);
