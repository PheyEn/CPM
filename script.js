function showNotification(notificationElement) {
  notificationElement.style.display = "block";
}
function hideNotification(notificationElement) {
  notificationElement.style.display = "none";
}

const notification = document.getElementById("notification"); 
const backNotification = document.getElementById("back-notification"); 

window.addEventListener('DOMContentLoaded', function() {
  showNotification(notification);
  showNotification(backNotification); 
  addNotificationClickListeners(); 
});


function addNotificationClickListeners() {
  const notification = document.getElementById("notification");
  const backNotification = document.getElementById("back-notification");
  if (notification) {
      notification.addEventListener('click', function() {
          const targetUrl = this.dataset.target;
          window.location.href = targetUrl;
      });
  }
  if (backNotification) {
      backNotification.addEventListener('click', function() {
          const targetUrl = this.dataset.target;
          window.location.href = targetUrl;
      });
  }
}

// Call the function after the DOM is ready
window.addEventListener('DOMContentLoaded', function() {
  addNotificationClickListeners();
});

// Declare variables at the top of the script
const questions = [
  {
    question: "What is the Quantum Turing Machine used for?",
    answers: [
      {text: "It is used to turn a machine quantum.", correct: false},
      {text: "It is used for traversal.", correct: false},
      {text: "It is used to skip the time intervals for machines.", correct: false},
      {text: "It is used to describe a simple computer using quantum theory.", correct: true},
    ]
  },
  {
    question: "When is a qubit in superposition?",
      answers: [
        {text: "When you are looking at it.", correct: false},
        {text: "When both α and ß are non-zero.", correct: true},
        {text: "When both α and ß are zero or below zero.", correct: false},
        {text: "When it is 4d.", correct: false},
      ]
  },
  {
    question: "Which companies had achieved quantum supremacy during 2019?",
    answers: [
      {text: "Google AI and NASA.", correct: true},
      {text: "Tesla and Microsoft AI.", correct: false},
      {text: "Apple and Amazon.", correct: false},
      {text: "Nvidia and Meta.", correct: false},
    ]
  },
  {
    question: "Shor's algorithm is used to...",
      answers: [
        {text: "...find prime factors in an integer.", correct: true},
        {text: "...find the expansion of an integer.", correct: false},
        {text: "...deduct the amount of errors in a sequence of coded instructions.", correct: false},
        {text: "...find different integers in an equation.", correct: false},
      ]
  },
  {
    question: "What is the Hidden Subgroup Problem(HSP).",
    answers: [
      {text: "It is used for graph theory, where the goal is to find hidden nodes within a network by analyzing the shortest path between nodes.", correct: false},
      {text: "It is a cryptographic encryption algorithm used to secure communication between two parties by hiding their public keys in a group structure.", correct: false},
      {text: "It is a machine learning classification problem used to find hidden subgroups in a dataset.", correct: false},
      {text: "It is a framework used to capture problems such as factorising and graph isomorphism.",  correct: true},
    ]
  },
  {
    question: "",
    answers: [
      {text: "", correct: false},
      {text: "", correct: true},
      {text: "", correct: false},
      {text: "",  correct: false},
    ]
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion(){
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState(){
  nextButton.style.display = "none";
  while(answerButtons.firstChild){
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e){
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if(isCorrect){
    selectedBtn.classList.add("correct");
    score++;
  }else{
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach(button => {
    if(button.dataset.correct === "true"){
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore(){
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton(){
  currentQuestionIndex++;
  if(currentQuestionIndex < questions.length){
    showQuestion();
  }else{
    showScore();
  }
}

nextButton.addEventListener("click", ()=>{
  if(currentQuestionIndex < questions.length){
    handleNextButton();
  }else{
    startQuiz();
  }
});

startQuiz();
