const express = require('express');
const Question = require('../models/question');
const shuffle = require('../utils/shuffle');
const router = express.Router();

router.get('/questions', async (req, res) => {
	const limit = req.query.limit ? { limit: parseInt(req.query.limit) } : {};
	const questions = await Question.find({}, null, limit);
	if (eval(req.query.shuffle)) return res.json(shuffle(questions));
	res.json(questions);
});

router.get('/questions/:id', async (req, res) => {
	try {
		const question = await Question.findById(req.params.id);
		if (!question)
			return res
				.status(404)
				.json({ error: 'Question with that ID was not found' });
		res.json(question);
	} catch (error) {
		return res.status(500).send();
	}
});

router.post('/questions', async (req, res) => {
	const question = new Question(req.body);
	try {
		await question.save();
		res.status(201).send();
	} catch (error) {
		console.log(error);
		res.status(500).send();
	}
});

router.patch('/questions/:id', async (req, res) => {
	const canBeUpdated = ['title', 'answers', 'points', 'correct'];
	const updates = Object.keys(req.body);
	try {
		const question = await Question.findOne({ _id: req.params.id });
		if (!question) return res.status(404).send();

		const isValidUpdate = updates.every(update =>
			canBeUpdated.includes(update)
		);
		if (!isValidUpdate) return res.status(400).json({ error: 'Invalid update arguments!' });
		updates.forEach(update => (question[update] = req.body[update]));
		await question.save();
		res.status(204).send();
	} catch (error) {
		res.status(500).send();
	}
});

router.delete('/questions/:id', async (req, res) => {
	try {
		const question = await Question.findByIdAndDelete(req.params.id);
		if (!question) return res.status(404).send();
		res.status(204).json();
	} catch (error) {
		res.status(500).send();
	}
});

module.exports = router;
