require('./db/mongoose');
const express = require('express');
const helmet = require('helmet');
const questionsRouter = require('./routes/question');
const quizRouter = require('./routes/quiz');
const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(helmet());

app.use('', questionsRouter);
app.use('', quizRouter);

app.listen(port, () => console.log(`Listening on localhost:${port}`));
