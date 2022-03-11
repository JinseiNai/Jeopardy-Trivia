// MongoDB
const mongoose = require("mongoose");

// connect to MongoDB
const dbURI = 'mongodb+srv://Jinsei:Testing123@projects.bao0e.mongodb.net/Jeopardy-Trivia?retryWrites=true&w=majority';

mongoose.connect(dbURI, () => {
    console.log('connected');
}, e => console.error(e));