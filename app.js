// Import questions
import { animals100, animals250, animals500, animals750 } from '/questions/animal-questions.js';
import { history100, history250, history500, history750 } from '/questions/history-questions.js';
import { gaming100, gaming250, gaming500, gaming750 } from '/questions/gaming-questions.js';
import { sports100, sports250, sports500, sports750 } from '/questions/sports-questions.js';
import { science100, science250, science500, science750 } from '/questions/science-questions.js';
// ==============

// Set global variables
let score = 0;
let theQuestion;
let theAnswer;
let theValue;
let intervalId;
let timer = 15;
let ready = true;
let questionsRemain = 10;
// Global categories and values
var categoryNames = ['Animals', 'History', 'Gaming', 'Science', 'Sports'];
var priceValue = ['100', '250', '500', '750'];
// ==============

// Display score
function showScore() {
    document.getElementById('score').innerHTML = `$${score}`;
    ifNegative();
}
// ==============

// Dynamically create each category and price value
function createCategory() {
    for(let i=0; i<categoryNames.length; i++) {
        // Create a column for this section
        let column = document.createElement('div');
        column.setAttribute('class', 'column');

        // Create a title for this section
        let title = document.createElement('h2');
        title.innerHTML = categoryNames[i];

        // Display on div #categories
        let content = document.getElementById('categories');
        column.appendChild(title);
        content.appendChild(column);

        for(let u=0; u<priceValue.length; u++) {
            let allBtn = document.createElement('button');
            allBtn.innerHTML = `$${priceValue[u]}`;
            let catString = `${categoryNames[i]}${priceValue[u]}`;
            allBtn.onclick = getRandomQuestion;
            allBtn.setAttribute('class', 'value-btn');
            allBtn.setAttribute('value', catString);

            column.appendChild(allBtn);
        }
    }
}
// ==============

// Gets a random question from category
function getRandomQuestion() {
    this.disabled = true;
    let catName = this.value.toLowerCase();
    catName = eval(catName);
    clearEverything();
    let randomQuestion = Math.floor(Math.random() * catName.length);
    displayQuestion(catName[randomQuestion]);
}
// ==============

// Display questions and answer choices
function displayQuestion(category_question) {
    // assign to global values
    theQuestion = category_question.question;
    theAnswer = category_question.correctAnswer;
    theValue = category_question.value;

    let content = document.getElementById('question');
    let question = document.createElement('h3');
    question.innerHTML = category_question.question;

    for(let i=0; i<category_question.answers.length; i++) {
        let answerBtn = document.createElement('button');
        answerBtn.innerHTML = category_question.answers[i];
        answerBtn.setAttribute('value', category_question.answers[i]);
        answerBtn.onclick = checkAnswer;

        displayAnswers(answerBtn);
    }
    content.appendChild(question);

    // Start timer
    startTimer();

    // Call function to not allow anymore clicks in categories
    notReady();
}

// Displays answer buttons
function displayAnswers(answers) {
    document.getElementById('answerChoices').appendChild(answers);
}
// ==============

// Check answer to question, if correct add value, else subtract value
function checkAnswer() {
    if(this.value == theAnswer) {
        score += theValue;
        stopTimer();
        clearEverything();
        answeredCorrect();
    } else {
        score -= theValue;
        stopTimer();
        clearEverything();
        answeredWrong();
    }
}
// ==============

// Clear question and answer displays
function clearEverything() {
    document.getElementById('timer').innerHTML = '';
    document.getElementById('question').innerHTML = '';
    document.getElementById('answerChoices').innerHTML = '';
    document.getElementById('displayMsg').innerHTML = '';
}
// ==============

// Display message after answering a question
// Show a message when correct
function answeredCorrect() {
    let msg = document.createElement('p');
    msg.innerHTML = `Correct! You gained $${theValue}`;
    showScore();
    reduceRemain();
    document.getElementById('displayMsg').appendChild(msg);
}

// Show a message when wrong
function answeredWrong() {
    let msg = document.createElement('p');
    msg.innerHTML = `Wrong... You lost $${theValue}`;
    showScore();
    reduceRemain();
    document.getElementById('displayMsg').appendChild(msg);
}
// ==============

// Create a timer
function startTimer() {
    intervalId = setInterval(decrement, 1000);
}

function decrement() {
    timer--;
    document.getElementById('timer').innerHTML = `<h1>${timer}</h1>`;

    if(timer === 0) {
        score -= theValue;
        stopTimer();
        clearEverything();
        answeredWrong();
    }
}

function stopTimer() {
    timer = 15;
    clearInterval(intervalId);
}
// ==============

// If score is negative, change color to red else color is green
function ifNegative() {
    let scoreColor = document.getElementById('score');
    if(score < 0) {
        scoreColor.style.color = 'red';
    } else {
        scoreColor.style.color = 'green';
    }
}
// ==============

// To prevent clicking on multiple questions
// Check if ready for next question to be clicked
function setReady() {
    ready = true;
    if(ready) {
        document.getElementById('categories').style.pointerEvents = 'auto';
    }
}

function notReady() {
    ready = false;
    if(ready == false) {
        document.getElementById('categories').style.pointerEvents = 'none';
    }
}
// ==============

// Display questions remaining before end of game
// Reduce amount remain by 1 when user clicks on question
function questionsLeft() {
    let remainMsg = document.getElementById('questionsRemain');
    remainMsg.innerHTML = `<h2>${questionsRemain}/10 Questions Remain</h2>`;
    // If questions remain = 0, do not allow questions to be clicked
    // Show a 'Game Over' message
    if(questionsRemain == 0) {
        let gameOverMsg = document.createElement('h2');
        gameOverMsg.innerHTML = `Game Over! Your score is $${score}`;
        remainMsg.appendChild(gameOverMsg);
        notReady();
        resetBtn();
    } else {
        setReady();
    }
}

function reduceRemain() {
    questionsRemain--;
    questionsLeft();
}
// ==============

// Create a reset for the game
// Target all disabled buttons and re-enable them
function resetAll() {
    let allDisabledBtn = document.querySelectorAll('.value-btn');
    for(let i=0; i<allDisabledBtn.length; i++) {
        allDisabledBtn[i].disabled = false;
        console.log('resetting' + allDisabledBtn[i]);
    }
    score = 0;
    questionsRemain = 10;
    clearEverything();
    showScore();
    questionsLeft();
    setReady();
}

// Create a 'Play Again' button which will reset the game
function resetBtn() {
    let reset = document.createElement('button');
    reset.innerHTML = 'Play Again';
    reset.setAttribute('class', 'resetBtn');
    reset.onclick = resetAll;
    document.getElementById('questionsRemain').appendChild(reset);
}

// Calling start functions
createCategory();
showScore();
questionsLeft();