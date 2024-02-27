const mongoose = require('mongoose');

const URL = 'mongodb://localhost:27017/task-manager-api';

mongoose
    .connect(URL)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log(`DB connection error: ${err}`));
