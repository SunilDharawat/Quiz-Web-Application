const questions = [
    {
        question: "Inside which HTML element do we put the JavaScript?",
        answers: [
            { text: "scripting", correct: "false" },
            { text: "javascript", correct: "false" },
            { text: "script", correct: "true" },
            { text: "js", correct: "false" },
        ]
    },
    {
        question: "Where is the correct place to insert a JavaScript?",
        answers: [
            { text: "body", correct: "false" },
            { text: "head and body", correct: "true" },
            { text: "head", correct: "false" },

        ]
    },
    {
        question: "What is the correct syntax for referring to an external script called 'xxx.js'?",
        answers: [
            { text: "script href = 'xxx.js'", correct: "false" },
            { text: "script name = 'xxx.js'", correct: "false" },
            { text: "script src = 'xxx.js'", correct: "true" },
            { text: "none of the above", correct: "false" },
        ]
    },
    {
        question: "How do you write 'Hello World' in an alert box?",
        answers: [
            { text: "msg('hello world')", correct: "false" },
            { text: "alertBox('hello world')", correct: "false" },
            { text: "alert('hello world')", correct: "true" },
            { text: "msgBox('hello world')", correct: "false" },
        ]
    },
    {
        question: "How to write an IF statement in JavaScript?",
        answers: [
            { text: "if i = 5 then", correct: "false" },
            { text: "if(i==5)", correct: "true" },
            { text: "if i = 5", correct: "false" },
            { text: "if i == 5 then", correct: "false" },
        ]
    },
    {
        question: "JavaScript is a side programming language.",
        answers: [
            { text: "Client", correct: "false" },
            { text: "Server", correct: "false" },
            { text: "Both", correct: "true" },
            { text: "None", correct: "false" },
        ]
    },
    {
        question: "How do you find the minimum of x and y using JavaScript?",
        answers: [
            { text: "min(x,y);", correct: "false" },
            { text: "Math.min(x,y)", correct: "true" },
            { text: " Math.min(xy)", correct: "false" },
            { text: "min(xy);", correct: "false" },
        ]
    },
]

const questionId = document.getElementById('question');
const answerId = document.getElementById('answer');
const nextBtn = document.getElementById('next-btn');


let currentQuestionIdx = 0;
let score = 0;

function startQuiz() {
    currentQuestionIdx = 0;
    score = 0;
    nextBtn.innerHTML = 'Next Question <i class="fa-solid fa-arrow-right-long"></i>';
    showQuestions();
}
function showQuestions() {
    resetState();
    let currentQuestion = questions[currentQuestionIdx];
    let questionNo = currentQuestionIdx + 1;
    questionId.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach((answer) => {
        const ans = document.createElement("li");
        ans.innerHTML = answer.text;
        answerId.appendChild(ans);
        if (answer.correct) {
            ans.dataset.correct = answer.correct;
        }
        ans.addEventListener('click', selectAns);

    });
}
function resetState() {
    nextBtn.style.display = "none";
    while (answerId.firstChild) {
        answerId.removeChild(answerId.firstChild);
    }
}

function selectAns(e) {
    const selectans = e.target;
    const isCorrect = selectans.dataset.correct === "true";
    if (isCorrect) {
        selectans.classList.add("correct");
        score++;
    }
    else {
        selectans.classList.add("incorrect");
    }
    Array.from(answerId.children).forEach((ans) => {
        if (ans.dataset.correct === "true") {
            ans.classList.add("correct");
        }
        // ans.disabled = true; not working
    })
    nextBtn.style.display = "inline";

}
function showScore() {
    resetState();
    questionId.innerHTML = `You scored ${score} out of ${questions.length} !`;
    nextBtn.innerHTML = "Play Again...";
    nextBtn.style.display = "inline";
}
function handleNextButton() {
    currentQuestionIdx++;
    if (currentQuestionIdx < questions.length) {
        showQuestions();
    }
    else {
        showScore();
    }
}
nextBtn.addEventListener('click', () => {
    if (currentQuestionIdx < questions.length) {
        handleNextButton();
    }
    else {
        startQuiz();
    }
})

startQuiz();
