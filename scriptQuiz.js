


//Defining the variables
var start = document.getElementById("start");
var quiz = document.getElementById("quiz");
var question = document.getElementById("question");
var qImg = document.getElementById("qImg");
var choiceA = document.getElementById("A");
var choiceB = document.getElementById("B");
var choiceC = document.getElementById("C");
var choiceD = document.getElementById("D");
var counter = document.getElementById("counter");
var timeGauge = document.getElementById("timeGauge");
var progress = document.getElementById("progress");
var scoreDiv = document.getElementById("scoreContainer");
var overDiv = document.getElementById("over");
var highscoreDiv = document.getElementById("highScores");
var scoreList = document.querySelector("#score-list");
var scoresbtn = document.getElementById("showScores");
var hscoresbtn = document.getElementById("hScores");

//Inserting sound clip
var bleep= new Audio();
bleep.src="bleep-sound.mp3";
function loadContent(){
bleep.play();}

// create 5 questions Quiz
let questions = [
    {
        question : "Select the appropriate HTML tag used for thr largets heading?",
        imgSrc : "img/q1.png",
        choiceA : "h1",
        choiceB : "h6",
        choiceC : "Header",
        choiceD : "h3",
        correct : "A"
    },{
        question : "in CSS, choose the correct option to select this image by its ID",
        imgSrc : "img/q2.png",
        choiceA : "img{}",
        choiceB : "#mainpic{}",
        choiceC : "mainpic{}",
        choiceD : "None",
        correct : "A"
    },{
        question : "Which one of these is a JavaScript package manager?",
        imgSrc : "img/q3.png",
        choiceA : "Type Script",
        choiceB : "Node.JS",
        choiceC : "npm",
        choiceD : "jQuery",
        correct : "C"
    },{
        question : "What is the HTML tag under which one can write the JavaScript code?",
        imgSrc : "img/q4.png",
        choiceA : "scripted",
        choiceB : "script",
        choiceC : "js",
        choiceD : "None",
        correct : "B"
    },{
        question : " What is the correct syntax for referring to an external script called 'sc.js'?",
        imgSrc : "img/q5.png",
        choiceA : "script src=sc.js",
        choiceB : "script href=sc.js",
        choiceC : "script ref=sc.js",
        choiceD : "script url=sc.js",
        correct : "A"
    },
    ];
// create some variables
var lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 30;
var quizTime = 0; // 10s
var gaugeWidth = 150; // 150px
var gaugeUnit = gaugeWidth / quizTime;
let TIMER;
let score = 0;
// render a question
function renderQuestion(){
    let q = questions[runningQuestion];
    question.innerHTML = "<p>"+ q.question +"</p>";
    qImg.innerHTML = "<img src="+ q.imgSrc +">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;
    choiceD.innerHTML = q.choiceD;
}
start.addEventListener("click",startQuiz);
// start quiz at the click
function startQuiz(){
    start.style.display = "none";
    renderQuestion();
    quiz.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}
function time(){
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1s
}
// render progress of the quiz
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}
// counter render
function renderCounter(answer){
    if(count >= quizTime){
        counter.innerHTML = count;
        timeGauge.style.width = count * gaugeUnit + "px";
        
        count--
            
    }
    else{
        // change progress color to red
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            // end the quiz and show the score
            clearInterval(TIMER);
            scoreRender();
        }
    }
}
// checkAnwer for correct response
function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        // answer is correct
        score++;
        // change progress color to green
        answerIsCorrect();
    }else{
        // answer is wrong
        // change progress color to red
        answerIsWrong();
        count-=5
        bleep.play();
       
    }
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        // end the quiz and show the score
        clearInterval(TIMER);
        scoreRender();
    }
}
// answer is correct
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}
// answer is Wrong
function answerIsWrong(count){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}
// score is displayed in % with appropriate icons
function scoreRender(){
    scoreDiv.style.display = "block";
    // calculate the amount of question percent answered by the user
    var scorePerCent = Math.round(100 * score/questions.length);
    // choose the image based on the scorePerCent
    let img = (scorePerCent >= 80) ? "img/5.png" :
              (scorePerCent >= 60) ? "img/4.png" :
              (scorePerCent >= 40) ? "img/3.png" :
              (scorePerCent >= 20) ? "img/2.png" :
              "img/1.png";

   
    scoreDiv.innerHTML+= "<img src="+ img +">";
    scoreDiv.innerHTML += "<li>"+'Quiz is Over. Your Score:'+ scorePerCent +"%</li>";
    var submitbtn = document.getElementById("test");
    console.log('submitbtn', submitbtn)
    submitbtn.addEventListener("click", saveScore);

    
    function saveScore(){

          scoreDiv.style.display ="none";
          highscoreDiv.style.display = "block";
          scoreList.innerHTML = "Score"
          var initial = document.getElementById("initial").value;
                  var p = document.createElement("p");
           p.textContent = initial + (": " + score);
        //saving the score in an array 
              var highScore = JSON.parse(localStorage.getItem("highScore")) || [];
              console.log("highScore", highScore)
              var newHighScore = {
                  userInitial: initial,
                  userScore: score
                  }
        //pushing the array to local storage
              highScore.push(newHighScore);
              console.log("highScore", highScore)
              localStorage.setItem("highScore",JSON.stringify(highScore));
        //directing to another html
              window.location.href = "highscore.html";
      }
         
}

