//Event Handlers defined here
var timeEl = document.querySelector(".time");
var questionEl = document.querySelector("#question");

//Event Handlers for buttons defined here:
var option1El = document.querySelector("#option1");
var option2El = document.querySelector("#option2");
var option3El = document.querySelector("#option3");
var option4El = document.querySelector("#option4");

//Event handlers for screens during the game
var startGameEl = document.querySelector(".startGame");
var duringGameEl = document.querySelector(".duringGame");
var startEl = document.querySelector(".start");
var afterGameEl = document.querySelector(".afterGame");

var currentQuestionIndex = 0; // Iterated ++ after an answer chose, 
//var questionIndex = quizQuestion[currentQuestionIndex]
var initials = [];

//Event Listeners here:

duringGameEl.addEventListener("click", function(event) {

    var option = event.target; //look at activity 20 to figure this out
    //console.log(option);
    //console.log(option.matches("#option4"));

        if (quizQuestion[currentQuestionIndex] == quizQuestion[0] && option.matches("#option4")) {

            duringGameEl.setAttribute("style", "background-color:green;"); 
            
        } else if (quizQuestion[currentQuestionIndex] == quizQuestion[1] && option.matches("#option1")) {

            duringGameEl.setAttribute("style", "background-color:green;"); 
            
        } else if (quizQuestion[currentQuestionIndex] == quizQuestion[2] && option.matches("#option2")) {

            duringGameEl.setAttribute("style", "background-color:green;"); 
            
        } else if (quizQuestion[currentQuestionIndex] == quizQuestion[3] && option.matches("#option3")) {

            duringGameEl.setAttribute("style", "background-color:green;");

        } else {

            duringGameEl.setAttribute("style", "background-color:red;"); 
        }
        
        currentQuestionIndex++;

        if (currentQuestionIndex == quizQuestion.length) {

            afterGame();

        } else {

        showQuestion();
        checkAnswer(option);
        
    }

    
    
    
})

// //may be only need one event lsiterner for container, user id to determine which object is being pressed.
// option1El.addEventListener("click", function(){
//     checkAnswer();
// }); //check answer funciton here?

// option2El.addEventListener("click", function(){console.log("option2 pressed")});
// option3El.addEventListener("click", function(){console.log("option3 pressed")});
// option4El.addEventListener("click", function(){console.log("option4 pressed")});

startEl.addEventListener("click", function() {
    duringGame();
});


//Global Variables defined here
var countDownTimer = 60;
var visible;

//Defines what happens every 1 second
function setTimer() {
    var timerInterval = setInterval(function(){
        if(!countDownTimer == 0) {
            countDownTimer--;
            timeEl.textContent = "Timer: " + countDownTimer;
        } else { 
            clearInterval(timerInterval);
            afterGame(); }

    }, 1000);
}

//clear timer interval
//Create Objects with questions, answers and correct answer


var quizQuestion = [{
    question: "What is the full form of .js?",
    option1: "Java", //have answers be an array and cycle through indices to set data attribute as a button for each answer.
    option2: "JSON",
    option3: "Havascript",
    option4: "Javascript",
    correctAnswer: option4,
},
{
    question: "What does HTML create?",
    option1: "Structure",
    option2: "Styling",
    option3: "Event handling",
    option4: "Algorithms",
    correctAnswer: option1, 
},
{
    question: "What does CSS create?",
    option1: "Structure",
    option2: "Styling",
    option3: "Event handling",
    option4: "Algorithms",
    correctAnswer: option2, 
},
{
    question: "What is an API?",
    option1: "All Programming Interface",
    option2: "Active Pharmaceutical Ingredient",
    option3: "Appl Programming Interface",
    option4: "Algorithmic Program Internet",
    correctAnswer: option3, 
}];

// //Function call to start quiz
// for(var i = 0; i < quizQuestion.length; i++) { //make i increment only when a button is selected. Write a function for it?
//     showQuestion(quizQuestion, i);
// }

//Function for showing questions of the quiz:
function showQuestion() {

        questionEl.textContent = quizQuestion[currentQuestionIndex].question;
        option1El.textContent = quizQuestion[currentQuestionIndex].option1;
        option2El.textContent = quizQuestion[currentQuestionIndex].option2;
        option3El.textContent = quizQuestion[currentQuestionIndex].option3;
        option4El.textContent = quizQuestion[currentQuestionIndex].option4;
}

//Displaying the screen after loading html
function init() {

    startGameEl.setAttribute("class","visible");
    
}


//During game screen set to visible here and hide previous screen
function duringGame() {

    duringGameEl.setAttribute("class", "visible");
    startGameEl.setAttribute("class","hidden");
    setTimer();

    var i = 0;
    showQuestion(quizQuestion, i);

}

//Check Answer function
function checkAnswer(option) {}


//After game screen is set to visible
function afterGame () {
 console.log("This is the end of the game")
 duringGameEl.setAttribute("class", "hidden");
 afterGameEl.setAttribute("class", "visible");

};

function storeInitials () {
    // Stringify and set key in localStorage to Initials array
    localStorage.setItem("initials", JSON.stringify(intitials));
  }

//Initializing of the Game
init();


// current question index, every time question is asked go up again, when the

// quiz start button pressed
// <div> with start button gets hidden
// <div> with scores hidden 
// timer starts counting down
// first question appears
// button pressed
// answer checked, feedback presented, score incremented/decremented
// next question showed.
// hide question <div>
// enable saving score with user initials
//var count = localStorage.getItem("count")
//localStorage.setItem("count", count);
// consider using acitivity 6 set attribute using for loop for showing questions, answers
//use theme switcher from actitivty 11 to switch between pages