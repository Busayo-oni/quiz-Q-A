document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('start-btn');
    const restartBtn = document.getElementById('restart-btn');
    const questionScreen = document.getElementById('question-screen');
    const startScreen = document.getElementById('start-screen');
    const resultScreen = document.getElementById('result-screen');
    const questionNumberElement = document.querySelector('.question-number');
    const questionTextElement = document.querySelector('.question-text');
    const answerListElement = document.querySelector('.answer-list');

    let currentQuestionIndex = 0;
    let score = 0;

    const questions = [
        {
            question: "Which planet in the Solar System is the smallest?",
            answers: ["Pluto", "Earth", "Mercury", "Mars"],
            correctAnswer: "Mercury"
        },
        {
            question: "What is the capital of France?",
            answers: ["Berlin", "Madrid", "Paris", "Lisbon"],
            correctAnswer: "Paris"
        },
        {
            question: "Which element has the chemical symbol 'O'?",
            answers: ["Oxygen", "Gold", "Osmium", "Hydrogen"],
            correctAnswer: "Oxygen"
        },
        {
            question: "What is the largest mammal?",
            answers: ["Elephant", "Blue Whale", "Great White Shark", "Giraffe"],
            correctAnswer: "Blue Whale"
        },
        {
            question: "Which is the longest river in the world?",
            answers: ["Amazon", "Nile", "Yangtze", "Mississippi"],
            correctAnswer: "Nile"
        },
        {
            question: "Who wrote 'Romeo and Juliet'?",
            answers: ["Shakespeare", "Dickens", "Hemingway", "Twain"],
            correctAnswer: "Shakespeare"
        },
        {
            question: "Which planet is known as the Red Planet?",
            answers: ["Mars", "Jupiter", "Saturn", "Venus"],
            correctAnswer: "Mars"
        },
        {
            question: "What is the square root of 64?",
            answers: ["6", "7", "8", "9"],
            correctAnswer: "8"
        },
        {
            question: "Which ocean is the largest?",
            answers: ["Atlantic", "Indian", "Pacific", "Arctic"],
            correctAnswer: "Pacific"
        },
        {
            question: "Which year did World War II end?",
            answers: ["1945", "1939", "1940", "1950"],
            correctAnswer: "1945"
        }
    ];

    startBtn.addEventListener('click', () => {
        startScreen.style.display = 'none';
        questionScreen.style.display = 'block';
        showQuestion();
    });

    answerListElement.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            const selectedAnswer = e.target.textContent;
            const correctAnswer = questions[currentQuestionIndex].correctAnswer;
            if (selectedAnswer === correctAnswer) {
                score++;
            }
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                showQuestion();
            } else {
                showResult();
            }
        }
    });

    restartBtn.addEventListener('click', () => {
        currentQuestionIndex = 0;
        score = 0;
        resultScreen.style.display = 'none';
        startScreen.style.display = 'block';
    });

    function showQuestion(question) {
        questionNumber.textContent = `0${currentQuestionIndex + 1}`;
        questionText.textContent = question.question;
        answerList.innerHTML = '';
        question.answers.forEach(answer => {
            const button = document.createElement('button');
            button.textContent = answer;
            button.classList.add('answer-btn');
            button.addEventListener('click', () => selectAnswer(answer, question.correct));
            answerList.appendChild(button);
        });
    }

    function showResult() {
        questionScreen.style.display = 'none';
        resultScreen.style.display = 'block';
        if (score >= 7) {
            document.getElementById('result-title').textContent = "GREAT!";
            document.getElementById('result-text').textContent = `YOU WIN! Score: ${score}/10`;
        } else {
            document.getElementById('result-title').textContent = "Oh no!";
            document.getElementById('result-text').textContent = `YOU LOST! Score: ${score}/10`;
        }
    }
});
