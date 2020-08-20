const express = require('express');
const router = express.Router();
const Quiz = require('../models/quiz');

router.get('/quizzes', async (req, res) => {
	const quizzes = await Quiz.find({});
	if (!quizzes) return res.status(404).send();
	res.status(200).json(quizzes);
});

router.get('/quizzes/:id', async (req, res) => {
	try {
		const quizzes = await Quiz.findById(req.params.id);
		if (!quizzes)
			return res
				.status(404)
				.json({ error: 'Quiz with this id was not found!' });
		res.status(200).json(quizzes);
	} catch (error) {
		res.status(500).send();
	}
});

router.post('/quizzes', async (req, res) => {
	const quiz = new Quiz(req.body);
	try {
		await quiz.save();
		res.status(201).send();
	} catch (error) {
		res.status(500).send();
	}
});

module.exports = router;
