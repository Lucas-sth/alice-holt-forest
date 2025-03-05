const questionContainer = document.getElementById('question-container');
const answerButtonsElement = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-button');

let currentQuestionIndex, shuffledQuestions, score;

const questions = [
  {
    question: 'What is the capital of France?',
    answers: [
      { text: 'Berlin', correct: false },
      { text: 'Madrid', correct: false },
      { text: 'Paris', correct: true },
      { text: 'Lisbon', correct: false }
    ]
  },
  {
    question: 'What is 2 + 2?',
    answers: [
      { text: '3', correct: false },
      { text: '4', correct: true },
      { text: '5', correct: false },
      { text: '6', correct: false }
    ]
  },
  {
    question: 'What is the largest planet in our solar system?',
    answers: [
      { text: 'Earth', correct: false },
      { text: 'Mars', correct: false },
      { text: 'Jupiter', correct: true },
      { text: 'Venus', correct: false }
    ]
  },
  {
    question: 'What is the smallest prime number?',
    answers: [
      { text: '0', correct: false },
      { text: '1', correct: false },
      { text: '2', correct: true },
      { text: '3', correct: false }
    ]
  },
  {
    question: 'Who wrote "To Kill a Mockingbird"?',
    answers: [
      { text: 'Harper Lee', correct: true },
      { text: 'Mark Twain', correct: false },
      { text: 'Jane Austen', correct: false },
      { text: 'Ernest Hemingway', correct: false }
    ]
  },
  {
    question: 'What is the chemical symbol for water?',
    answers: [
      { text: 'H2O', correct: true },
      { text: 'CO2', correct: false },
      { text: 'O2', correct: false },
      { text: 'H2', correct: false }
    ]
  },
  {
    question: 'What is the currency of Japan?',
    answers: [
      { text: 'Yen', correct: true },
      { text: 'Won', correct: false },
      { text: 'Dollar', correct: false },
      { text: 'Euro', correct: false }
    ]
  },
  {
    question: 'What is the largest ocean on Earth?',
    answers: [
      { text: 'Atlantic Ocean', correct: false },
      { text: 'Indian Ocean', correct: false },
      { text: 'Southern Ocean', correct: false },
      { text: 'Pacific Ocean', correct: true }
    ]
  },
  {
    question: 'What is the speed of light?',
    answers: [
      { text: '300,000 km/s', correct: true },
      { text: '150,000 km/s', correct: false },
      { text: '600,000 km/s', correct: false },
      { text: '450,000 km/s', correct: false }
    ]
  },
  {
    question: 'Who painted the Mona Lisa?',
    answers: [
      { text: 'Vincent van Gogh', correct: false },
      { text: 'Leonardo da Vinci', correct: true },
      { text: 'Pablo Picasso', correct: false },
      { text: 'Claude Monet', correct: false }
    ]
  }
];

startGame();

function startGame() {
  nextButton.classList.add('hide');
  nextButton.removeEventListener('click', handleNextButtonClick);
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  score = 0;
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionContainer.textContent = question.question;
  question.answers.forEach(answer => {
    const button = document.createElement('button');
    button.textContent = answer.text;
    button.classList.add('btn');
    button.addEventListener('click', () => selectAnswer(answer));
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  nextButton.classList.add('hide');
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(answer) {
  const correct = answer.correct;
  if (correct) {
    score++;
  }
  // Disable all answer buttons and highlight selection
  answerButtonsElement.querySelectorAll('button').forEach(button => {
    button.disabled = true;
    if (button.textContent === answer.text) {
      button.style.backgroundColor = correct ? 'green' : 'red';
    }
  });
  nextButton.classList.remove('hide');
  nextButton.addEventListener('click', handleNextButtonClick);
}

function handleNextButtonClick() {
  currentQuestionIndex++;
  if (currentQuestionIndex < shuffledQuestions.length) {
    setNextQuestion();
  } else {
    showScore();
  }
}

function showScore() {
  resetState();
  questionContainer.textContent = `Quiz Finished! Your Score: ${score}/${questions.length}`;
  const playAgainButton = document.createElement('button');
  playAgainButton.textContent = 'Play Again';
  playAgainButton.classList.add('btn');
  playAgainButton.addEventListener('click', startGame);
  answerButtonsElement.appendChild(playAgainButton);
}
