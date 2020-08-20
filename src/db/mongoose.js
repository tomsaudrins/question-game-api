const mongoose = require('mongoose');
const dbUrl = process.env.DB_URL;
const options = {
	useNewUrlParser: true,
	useCreateIndex: true,
	useUnifiedTopology: true
};

mongoose.connect(dbUrl, options);
