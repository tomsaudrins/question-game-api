const mongoose = require('mongoose');

const questionShema = new mongoose.Schema({
	title: {
		type: String,
		required: true
	},
	answers: [String],
	correct: {
		type: Number,
		required: true
	},
	points: {
		type: Number,
		default: 0
	}
});

const Question = mongoose.model('Question', questionShema);
module.exports = Question;
