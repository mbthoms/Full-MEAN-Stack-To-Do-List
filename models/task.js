var mongoose = require('mongoose');
var TaskSchema = new mongoose.Schema({
	title: String,
	completed: {
		type: Boolean,
		default: false
	}
});

module.exports = mongoose.model('Task', TaskSchema);