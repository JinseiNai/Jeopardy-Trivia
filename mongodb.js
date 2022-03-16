// MongoDB
const mongoose = require('mongoose');
const Highscores = require('./models/highscore');

// connect to MongoDB
const dbURI = 'mongodb+srv://Jinsei:Testing123@projects.bao0e.mongodb.net/Jeopardy-Trivia?retryWrites=true&w=majority';

mongoose.connect(dbURI, () => {
    console.log('connected');
}, e => console.error(e));

// newScore();
// async function newScore() {
//     const score = await Highscores.create({ name: "Calvin", score: 250 });
//     console.log(score);
// }

seeScores();
async function seeScores() {
    try {
        const scores = await Highscores.where('score').gt(0);
        console.log(scores);
    } catch (e) {
        console.log(e.message);
    }
}