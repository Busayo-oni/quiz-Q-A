document.addEventListener('DOMContentLoaded', () => {
    const startBtn = document.getElementById('start-btn');
    const restartBtn = document.getElementById('restart-btn');
    const leaderboardBtn = document.getElementById('leaderboard-btn');
    const backBtn = document.getElementById('back-btn');
    const questionScreen = document.getElementById('question-screen');
    const startScreen = document.getElementById('start-screen');
    const resultScreen = document.getElementById('result-screen');
    const leaderboardScreen = document.getElementById('leaderboard-screen');
    const questionNumberEl = document.querySelector('.question-number');
    const questionTextEl = document.querySelector('.question-text');
    const answerListEl = document.querySelector('.answer-list');
    const timerEl = document.getElementById('timer');
    const leaderboardList = document.getElementById('leaderboard-list');

    let currentQuestionIndex = 0;
    let score = 0;
    let timer;
    let participants = [];

    const questions = [
        { question: "Which planet in the Solar System is the smallest?", answers: ["Pluto", "Earth", "Mercury", "Mars"], correct: "Mercury" },
        { question: "What is the capital of France?", answers: ["Berlin", "Madrid", "Paris", "Rome"], correct: "Paris" },
        { question: "What is the largest ocean on Earth?", answers: ["Indian Ocean", "Pacific Ocean", "Atlantic Ocean", "Arctic Ocean"], correct: "Pacific Ocean" },
        { question: "Which planet is known as the Red Planet?", answers: ["Jupiter", "Mars", "Saturn", "Venus"], correct: "Mars" },
        { question: "What is the chemical symbol for water?", answers: ["O2", "H2O", "CO2", "NaCl"], correct: "H2O" },
        { question: "Which country is known as the Land of the Rising Sun?", answers: ["China", "Japan", "South Korea", "Thailand"], correct: "Japan" },
        { question: "Who wrote 'Hamlet'?", answers: ["Charles Dickens", "J.K. Rowling", "Mark Twain", "William Shakespeare"], correct: "William Shakespeare" },
        { question: "Which element has the chemical symbol 'O'?", answers: ["Gold", "Oxygen", "Hydrogen", "Iron"], correct: "Oxygen" },
        { question: "What is the smallest unit of matter?", answers: ["Atom", "Molecule", "Proton", "Electron"], correct: "Atom" },
        { question: "What is the tallest mountain in the world?", answers: ["K2", "Kangchenjunga", "Mount Everest", "Makalu"], correct: "Mount Everest" }
    ];

    function startQuiz() {
        score = 0;
        currentQuestionIndex = 0;
        shuffleQuestions();
        startScreen.style.display = 'none';
        resultScreen.style.display = 'none';
        leaderboardScreen.style.display = 'none';
        questionScreen.style.display = 'block';
        startTimer(300);
        displayQuestion();
    }

    function shuffleQuestions() {
        questions.sort(() => Math.random() - 0.5);
    }

    function displayQuestion() {
        const currentQuestion = questions[currentQuestionIndex];
        questionNumberEl.textContent = `${currentQuestionIndex + 1}`;
        questionTextEl.textContent = currentQuestion.question;
        answerListEl.innerHTML = '';

        currentQuestion.answers.forEach(answer => {
            const li = document.createElement('li');
            const button = document.createElement('button');
            button.textContent = answer;
            button.classList.add('answer-btn');
            button.addEventListener('click', () => checkAnswer(button.textContent));
            li.appendChild(button);
            answerListEl.appendChild(li);
        });

        // Add fade-in animation
        questionScreen.classList.add('fade-in');
        setTimeout(() => questionScreen.classList.remove('fade-in'), 500);
    }

    function checkAnswer(answer) {
        const currentQuestion = questions[currentQuestionIndex];
        if (answer === currentQuestion.correct) {
            score++;
        }
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            displayQuestion();
        } else {
            endQuiz();
        }
    }

    function startTimer(duration) {
        let time = duration;
        timer = setInterval(() => {
            const minutes = Math.floor(time / 60);
            const seconds = time % 60;
            timerEl.textContent = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
            if (--time < 0) {
                clearInterval(timer);
                endQuiz();
            }
        }, 1000);
    }

    function endQuiz() {
        clearInterval(timer);
        questionScreen.style.display = 'none';
        resultScreen.style.display = 'block';
        if (score > 7) {
            document.getElementById('result-title').textContent = "GREAT!";
            document.getElementById('result-text').textContent = `YOU WIN! Your score: ${score}`;
        } else {
            document.getElementById('result-title').textContent = "Oh no!";
            document.getElementById('result-text').textContent = `YOU LOST! Your score: ${score}`;
        }
        saveScore();
    }

    function saveScore() {
        const participant = {
            score: score,
            time: new Date().toLocaleString()
        };
        participants.push(participant);
        updateLeaderboard();
    }

    function updateLeaderboard() {
        leaderboardList.innerHTML = '';
        participants.forEach((participant, index) => {
            const li = document.createElement('li');
            li.textContent = `Participant ${index + 1}: ${participant.score} - ${participant.time}`;
            leaderboardList.appendChild(li);
        });
    }

    startBtn.addEventListener('click', startQuiz);
    restartBtn.addEventListener('click', startQuiz);
    leaderboardBtn.addEventListener('click', () => {
        resultScreen.style.display = 'none';
        leaderboardScreen.style.display = 'block';
    });
    backBtn.addEventListener('click', () => {
        leaderboardScreen.style.display = 'none';
        startScreen.style.display = 'block';
    });
});
