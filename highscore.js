
//Using parse to change the string into parse
var highScore = JSON.parse(localStorage.getItem('highScore')) || [];
 console.log('highScore', highScore);
 //Declaring variables
var ulEl = document.getElementById('list');
var backBtn = document.getElementById('goBack');
var clearBtn = document.getElementById('clear');
var hscores = document.getElementById('hScores');
//for loop to add scores in array
for(var i = 0; i < highScore.length; i++){
    var liEl = document.createElement('li')
    console.log('highScore', highScore[i])
    liEl.textContent = "User initial:"+highScore[i].userInitial+ " & "+"Score:"+highScore[i].userScore;
    ulEl.append(liEl)
}
//buttons to restart quiz and clear the scores
backBtn.addEventListener("click",function(){
    console.log('open')
    window.location.href = "quiz.html";
})
clear.addEventListener("click",function(){
    console.log('open');
   ulEl.style.display="none";
})
