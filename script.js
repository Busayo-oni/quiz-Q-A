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
    let timer;
    let remainingTime = 60;

    const questions = [
        { 
            question: "Who wrote 'Hamlet'?", 
            answers: ["Shakespeare", "Hemingway", "Austen", "Dickens"],
            correct: "Shakespeare" 
        },
        { 
            question: "In which year did World War I start?", 
            answers: ["1914", "1918", "1939", "1945"], 
            correct: "1914" 
        },
        { 
            question: "Who painted the Mona Lisa?", 
            answers: ["Van Gogh", "Picasso", "Da Vinci", "Rembrandt"], 
            correct: "Da Vinci" 
        },
        { 
            question: "What is the hardest natural substance on Earth?", 
            answers: ["Gold", "Iron", "Diamond", "Platinum"], 
            correct: "Diamond" 
        },
        { 
            question: "Which gas do plants absorb from the atmosphere?",
            answers: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"], 
            correct: "Carbon Dioxide" 
        },
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

    shuffle(questions);

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
            } 
            else {
                showResult();
            }
        }
    });

    restartBtn.addEventListener('click', () => {
        currentQuestionIndex = 0;
        score = 0;
        shuffle(questions);
        resultScreen.style.display = 'none';
        startScreen.style.display = 'block';
    });

        function startTimer() {
        remainingTime = 30;
        timer = setInterval(() => {
            remainingTime--;
            if (remainingTime <= 0) {
                clearInterval(timer);
                nextQuestion();
            }
        }, 500);
    }

    function showQuestion() {
        const question = questions[currentQuestionIndex];
        questionNumberElement.textContent = `0${currentQuestionIndex + 1}`;
        questionTextElement.textContent = question.question;

        answerListElement.innerHTML = '';
        question.answers.forEach(answer => {
            const button = document.createElement('button');
            button.classList.add('answer-btn');
            button.textContent = answer;
            answerListElement.appendChild(button);
        });
    }

    function showResult() {
        questionScreen.style.display = 'none';
        resultScreen.style.display = 'block';
        if (score >= 7) {
            document.getElementById('result-title').textContent = "GREAT!";
            document.getElementById('result-text').textContent = `YOU WIN! Score: ${score}/15`;
        } else {
            document.getElementById('result-title').textContent = "Oh no!";
            document.getElementById('result-text').textContent = `YOU LOST! Score: ${score}/15`;
        }
    }
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }
});
