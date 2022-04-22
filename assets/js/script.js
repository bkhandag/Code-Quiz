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
var highScoresEl = document.querySelector(".highScores");
var submitEl = document.querySelector("#submitInitials");
var initialsListEl = document.querySelector("#initials-list");
var restartEl = document.querySelector(".restart");
var clearScoresEl = document.querySelector("#clearScores");
var viewHighScoresEl = document.querySelector(".viewHighScores");

//Global Variables defined here
var countDownTimer = 60;
var visible;
var currentQuestionIndex = 0; // Iterated ++ after an answer chosen  
var timerInterval;
var correctScore = 0; //Count up everytime a correct answer is reached

//Displaying the screen after loading html
function init() {

    startGameEl.setAttribute("class","visible");

    //Reinitialize global variables
    currentQuestionIndex = 0;
    countDownTimer = 60;
    correctScore = 0; 

    //Show timer and re initialize it
    timeEl.setAttribute("class", "visible");
    timeEl.textContent = "Timer: " + countDownTimer;

    //Clears form submission
    initials.value = "";
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
            correctScore += 10; //increment score by 10 points everytime a correct answer is selected

        } else {

            duringGameEl.setAttribute("style", "background-color:red;"); 
            countDownTimer -= 5;
        }
        
        currentQuestionIndex++;

        if (currentQuestionIndex == quizQuestion.length) {

            afterGame();

        } else {
            
            showQuestion();
    }    
})

//Initials Submission after game has ended
submitEl.addEventListener("click", function(event) {

    event.preventDefault();
    storeInitials();

    afterGameEl.setAttribute("class", "hidden");
    highScoresEl.setAttribute("class", "visible");
    timeEl.setAttribute("class", "hidden");
});

//View High Scores at top left takes you to highscores container
viewHighScoresEl.addEventListener("click", function(event) {
    highScoresEl.setAttribute("class", "visible");
    startGameEl.setAttribute("class", "hidden");
    removeList();
    showList();
})

//Restarts game after storing score
restartEl.addEventListener("click", function(event) {

    init();
    highScoresEl.setAttribute("class", "hidden");
    duringGameEl.setAttribute("style", "background-color:none;");  //TODO remove this if too much

    //Remove the list from the highscores page
    removeList();  
});

//Clears all highscores stored in local storage and variable used to store it
clearScoresEl.addEventListener("click", function(event) {

    localStorage.clear();
    arrayScores=[];

    //Remove the list from the highscores page
    removeList();
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

//After game screen is set to visible
function afterGame () {
    
    clearInterval(timerInterval);
    duringGameEl.setAttribute("class", "hidden");
    afterGameEl.setAttribute("class", "visible");

};

//Checking to see if arrayScores has something in it before reinitializing so we dont lose scores

if (JSON.parse(localStorage.getItem("arrayScores")) == null) {
    var arrayScores = [];
} else {
    //If array is not empty, initialize it to whats stored in localStorage.
    var arrayScores = JSON.parse(localStorage.getItem("arrayScores"));
}

function storeInitials() {

    // Creating score object to store input value
        var score = {
            initialsGot: initials.value.trim(),
            currentScore: correctScore,
        };

        //Adding newest score to array
        arrayScores.push(score);

        //Stringify array so it can be stored to localStorage with new score
        localStorage.setItem("arrayScores", JSON.stringify(arrayScores));
        
        //Populating the ordered list with scores from local storage and newest score
        showList();
  }

  //Looping through all of the entries in local storage for scores and adding it to ordered list
  function showList() {
    for (var i = 0; i < arrayScores.length; i++) {

        var li = document.createElement("li");
        li.textContent = "Initials: " + arrayScores[i].initialsGot + " - Score: " + arrayScores[i].currentScore;
        initialsListEl.appendChild(li);
    }
  };

 //Remove the list from the highscores page
  function removeList() {
      while (initialsListEl.firstChild) {
        initialsListEl.removeChild(initialsListEl.firstChild);
      }
    };
  
//Initializing of the Game
init();