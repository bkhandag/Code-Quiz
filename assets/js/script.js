//Event Handlers defined here
var timeEl = document.querySelector(".time");
var questionEl = document.querySelector("#question");
var option1El = document.querySelector("#option1");
var option2El = document.querySelector("#option2");
var option3El = document.querySelector("#option3");
var option4El = document.querySelector("#option4");

//Event handlers for progressing screens during the game defined here:
var startGameEl = document.querySelector(".startGame");
var duringGameEl = document.querySelector(".duringGame");
var startEl = document.querySelector(".start");
var afterGameEl = document.querySelector(".afterGame");
var submitEl = document.querySelector("#submitInitials")

//Global Variables defined here
var countDownTimer = 60;
var visible;
var currentQuestionIndex = 0; // Iterated ++ after an answer chosen  
var initials;
var timerInterval;

//Displaying the screen after loading html
function init() {
    startGameEl.setAttribute("class","visible");
}

//Event Listener for start button to start the game:
startEl.addEventListener("click", function() {
    duringGame();
});

//Event Listener for answer choice during the game:
duringGameEl.addEventListener("click", function(event) {

    var option = event.target; 

        if ((quizQuestion[currentQuestionIndex] == quizQuestion[0] && option.matches("#option4")) 
        || (quizQuestion[currentQuestionIndex] == quizQuestion[1] && option.matches("#option1"))
        || (quizQuestion[currentQuestionIndex] == quizQuestion[2] && option.matches("#option2"))
        || (quizQuestion[currentQuestionIndex] == quizQuestion[3] && option.matches("#option3"))) {

            duringGameEl.setAttribute("style", "background-color:green;"); 

        } else {

            duringGameEl.setAttribute("style", "background-color:red;"); 
            countDownTimer -= 5;

        }
        
        currentQuestionIndex++;

        if (currentQuestionIndex == quizQuestion.length) {

            afterGame();
            

        } else {

        showQuestion();
        //checkAnswer(option);
        
    }    
})

submitEl.addEventListener("click", function() {
    event.preventDefault();
    storeInitials();
});

//Timer of interval 1 second defined here:
function setTimer() {

    timerInterval = setInterval(function() {

        if(!countDownTimer == 0) {

            countDownTimer--;
            timeEl.textContent = "Timer: " + countDownTimer;

        } else { 

            //clear timer interval
            clearInterval(timerInterval);
            afterGame(); 
        }

    }, 1000);
}


//Create Objects with questions, answers and correct answer
var quizQuestion = [{
    question: "What is the full form of .js?",
    option1: "Java",
    option2: "JSON",
    option3: "Havascript",
    option4: "Javascript",
},
{
    question: "What does HTML create?",
    option1: "Structure",
    option2: "Styling",
    option3: "Event handling",
    option4: "Algorithms",
},
{
    question: "What does CSS create?",
    option1: "Structure",
    option2: "Styling",
    option3: "Event handling",
    option4: "Algorithms", 
},
{
    question: "What is an API?",
    option1: "All Programming Interface",
    option2: "Active Pharmaceutical Ingredient",
    option3: "Appl Programming Interface",
    option4: "Algorithmic Program Internet",
}];


//Function for showing questions of the quiz:
function showQuestion() {

        questionEl.textContent = quizQuestion[currentQuestionIndex].question;
        option1El.textContent = quizQuestion[currentQuestionIndex].option1;
        option2El.textContent = quizQuestion[currentQuestionIndex].option2;
        option3El.textContent = quizQuestion[currentQuestionIndex].option3;
        option4El.textContent = quizQuestion[currentQuestionIndex].option4;
}


//During game screen set to visible here and hide previous screen
function duringGame() {

    duringGameEl.setAttribute("class", "visible");
    startGameEl.setAttribute("class","hidden");
    setTimer();
    showQuestion();

}

//Check Answer function
function checkAnswer(option) {

}


//After game screen is set to visible
function afterGame () {
    
    clearInterval(timerInterval);
    duringGameEl.setAttribute("class", "hidden");
    afterGameEl.setAttribute("class", "visible");

};

function storeInitials() {

    // Stringify and set key in localStorage to Initials array
    localStorage.setItem("initials", initials);
    
    var x = localStorage.getItem("initials");
    document.getElementById("initials-list").innerHTML = x;
    console.log(document.getElementById("initials-list").innerHTML);

  }

//   function createItem() {
//     localStorage.setItem("mytime", Date.now());
//   }
  
//   function readValue() {
//     var x = localStorage.getItem("mytime");
//     document.getElementById("demo").innerHTML = x;
//   }

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