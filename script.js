// QUIZ QUESTIONS DATA
const questions = [
    {
        question: "What does HTML stand for?",
        options: ["Hyper Text Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlinks Text Mark Language"],
        correctIndex: 0
    },
    {
        question: "Which language runs in a web browser?",
        options: ["Java", "C", "Python", "JavaScript"],
        correctIndex: 3
    },
    {
        question: "What does CSS stand for?",
        options: ["Cascading Style Sheets", "Computer Style Sheets", "Creative Style System", "Colorful Style Sheets"],
        correctIndex: 0
    },
    {
        question: "Which HTML tag is used for the largest heading?",
        options: ["<h6>", "<heading>", "<h1>", "<head>"],
        correctIndex: 2
    },
    {
        question: "Which company developed AWS?",
        options: ["Microsoft", "Google", "Amazon", "IBM"],
        correctIndex: 2
    },
    {
        question: "What does API stand for?",
        options: ["Application Programming Interface", "Automated Program Instructions", "Application Process Integration", "Advanced Programming Index"],
        correctIndex: 0
    },
    {
        question: "Which symbol is used for comments in JavaScript?",
        options: ["<!-- -->", "//", "**", "##"],
        correctIndex: 1
    },
    {
        question: "What does IAM stand for in cloud security?",
        options: ["Internet Access Management", "Identity and Access Management", "Internal Application Monitor", "Integrated Access Method"],
        correctIndex: 1
    },
    {
        question: "Which storage service does AWS provide for files?",
        options: ["EC2", "S3", "IAM", "VPC"],
        correctIndex: 1
    },
    {
        question: "What is Git used for?",
        options: ["Designing websites", "Version control", "Playing games", "Sending emails"],
        correctIndex: 1
    }
]

// STATE VARIABLES
let currentQuestion = 0
let score = 0

// GET ELEMENTS
const questionText = document.getElementById('questionText')
const optionsContainer = document.getElementById('optionsContainer')
const questionCount = document.getElementById('questionCount')
const scoreDisplay = document.getElementById('scoreDisplay')
const progressFill = document.getElementById('progressFill')
const nextBtn = document.getElementById('nextBtn')
const quizScreen = document.getElementById('quizScreen')
const resultsScreen = document.getElementById('resultsScreen')
const finalScore = document.getElementById('finalScore')
const performanceMsg = document.getElementById('performanceMsg')
const restartBtn = document.getElementById('restartBtn')

// DISPLAY CURRENT QUESTION
function displayQuestion() {
    const question = questions[currentQuestion]

    questionText.textContent = question.question
    questionCount.textContent = `Question ${currentQuestion + 1} of ${questions.length}`
    scoreDisplay.textContent = `Score: ${score}`

    const progressPercent = ((currentQuestion) / questions.length) * 100
    progressFill.style.width = progressPercent + '%'

    optionsContainer.innerHTML = ''

    question.options.forEach(function(option, index) {
        const btn = document.createElement('button')
        btn.className = 'option-btn'
        btn.textContent = option
        btn.addEventListener('click', function() {
            selectAnswer(index)
        })
        optionsContainer.appendChild(btn)
    })

    nextBtn.classList.add('hidden')
}

// HANDLE ANSWER SELECTION
function selectAnswer(selectedIndex) {
    const question = questions[currentQuestion]
    const buttons = optionsContainer.querySelectorAll('.option-btn')

    // Disable all buttons after answering
    buttons.forEach(function(btn) {
        btn.disabled = true
    })

    // Highlight correct answer green
    buttons[question.correctIndex].classList.add('correct')

    // If wrong, highlight selected as red
    if (selectedIndex !== question.correctIndex) {
        buttons[selectedIndex].classList.add('wrong')
    } else {
        score++
        scoreDisplay.textContent = `Score: ${score}`
    }

    nextBtn.classList.remove('hidden')
}

// MOVE TO NEXT QUESTION
function nextQuestion() {
    currentQuestion++

    if (currentQuestion < questions.length) {
        displayQuestion()
    } else {
        showResults()
    }
}

// SHOW FINAL RESULTS
function showResults() {
    quizScreen.classList.add('hidden')
    resultsScreen.classList.remove('hidden')

    finalScore.textContent = `${score} / ${questions.length}`

    const percentage = (score / questions.length) * 100

    if (percentage >= 80) {
        performanceMsg.textContent = 'Excellent! You know your stuff!'
    } else if (percentage >= 50) {
        performanceMsg.textContent = 'Good job! Keep learning!'
    } else {
        performanceMsg.textContent = 'Keep practicing, you will improve!'
    }
}

// RESTART QUIZ
function restartQuiz() {
    currentQuestion = 0
    score = 0
    quizScreen.classList.remove('hidden')
    resultsScreen.classList.add('hidden')
    displayQuestion()
}

// EVENT LISTENERS
nextBtn.addEventListener('click', nextQuestion)
restartBtn.addEventListener('click', restartQuiz)

// START QUIZ
displayQuestion()