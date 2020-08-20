require('./db/mongoose');
const express = require('express');
const questionsRouter = require('./routes/question');
const quizRouter = require('./routes/quiz');
const app = express();
const port = process.env.PORT;

app.use(express.json());

app.use('', questionsRouter);
app.use('', quizRouter);

app.listen(port, () => console.log(`Running on localhost:${port}`));
