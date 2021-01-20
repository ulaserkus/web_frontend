function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

Question.prototype.checkAnswer = function (answer) {
    return this.answer === answer;
}

function Quiz(question) {
    this.question = question;
    this.score = 0;
    this.questionIndex = 0;
}
Quiz.prototype.getQuestion = function () {

    return this.question[this.questionIndex];
}
Quiz.prototype.isFinish = function () {
    return this.question.length === this.questionIndex;
}
Quiz.prototype.guess = function (answer) {
    var question = this.getQuestion();
    if (question.checkAnswer(answer)) {
        this.score++;
    }
    this.questionIndex++;
}



var q1 = new Question("What's the best language", ["c#", "javascript", "python", "asp.net"], "javascript");
var q2 = new Question("What's the most popular language", ["c#", "javascript", "c", "asp.net"], "javascript");
var q3 = new Question("What's the most popular language", ["c#", "visual basic", "python", "node.js"], "javascript");
var question = [q1, q2, q3];

var quiz = new Quiz(question);

loadQuestion();
function loadQuestion() {

    if (quiz.isFinish()) {
        showScore();
    }
    else {

        var question = quiz.getQuestion();
        var choices = question.choices;
        document.querySelector('#question').textContent = question.text;
        for (var i = 0; i < choices.length; i++) {
            var element = document.querySelector('#choice' + i);
            element.innerHTML = choices[i];

            guess('btn' + i, choices[i]);


        }
    }

}

function guess(id, guess) {
    var btn = document.getElementById(id);
    btn.onclick = function () {
         quiz.guess(guess);
         loadQuestion();
    }

}


function showScore() {

 var html =`<h2>Score</h2><h4>${quiz.score}</h4> `
 document.querySelector('.card-body').innerHTML= html;

}