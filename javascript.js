var playing = false;
var score;
var action;
var timeremaining;
var correctanswer;
//If we click on the start/reset button
document.getElementById("startreset").onclick = function(){
    //if we are playing
    if(playing == true){
        location.reload(); // reload our page
    }else{
        score = 0;
        playing = true; //change playing mode
        
        hide("gameover");
        document.getElementById("scorevalue").innerHTML = score;
        
        show("timeremaining");
        
        timeremaining = 60;
        document.getElementById("timeremainingvalue").innerHTML = timeremaining;
        
        document.getElementById("startreset").innerHTML = "Reset Game";
        
        //start countdown
        startCountdown();
        
        //Generate question and answers
        generateQA();
    }
}
        //reload the page
    //if we are not playing
        //show score to 0
        //show countdown box
        //reduce time by 1 sec
//loops
            //time left?
                //yes -> countdown continue
                //no -> Game over message
        // change button to reset
        //generate new question and multiple answer


//if we click on answer box
    //if we are playing
        //correct -> increase score by 1
                    //show correct box
                    //generate new question/answers
        //wrong-> Try again box

//clicking on answerbox;
for(i = 1; i<5; i++){
    document.getElementById("option" + i).onclick = function(){
    if(playing == true){
        if(this.innerHTML == correctanswer){
                score++;
                document.getElementById("scorevalue").innerHTML = score;
            
                hide("wrong");
                show("correct");
            setTimeout(function(){
                hide("correct");
            }, 1000);
            
            //Generate a new question
            generateQA();
        }else{
            score--;
            document.getElementById("scorevalue").innerHTML = score;
            hide("correct");
                show("wrong");
            setTimeout(function(){
                hide("wrong");
            }, 1000);
        }
    }
}
}



function startCountdown(){
    action = setInterval(function(){
        timeremaining -= 1;
        document.getElementById("timeremainingvalue").innerHTML = timeremaining;
        if(timeremaining == 0){
            stopCountdown();
            
            show("gameover");
            
            document.getElementById('gameover').innerHTML = "<p>Game Over!</p><p>Your score is " + score + "</p>";
            
            hide("timeremaining");
            hide("correct");
            hide("wrong");
            playing = false;
            
            document.getElementById("startreset").innerHTML = "Start Game";
        }
    }, 1000);
}

function stopCountdown(){
        clearInterval(action);   
}

function hide(Id){
    document.getElementById(Id).style.display = "none";
}

function show(Id){
    document.getElementById(Id).style.display = "block";
}

function generateQA(){
    var x = 1 + Math.round(Math.random() * 9);
    var y = 1 + Math.round(Math.random() * 9);
    correctanswer = x*y;
    document.getElementById("question").innerHTML = x + "x" + y;
    var correctpos = 1 + Math.round(Math.random() * 3);
    document.getElementById("option" + correctpos).innerHTML = correctanswer; // filled one box with correct answer
    
    var answers = [correctanswer]; //so that no options match with each other
    
    //filling other boxes with wrong answer
    for(i = 1; i< 5; i++){
        if(i != correctpos){
            var wronganswer;
            
            //checking if wrong answer is equal to correct answer, then generate another value
            do{
                wronganswer = (1 + Math.round(Math.random() * 9)) * (1 + Math.round(Math.random() * 9));
            }while(answers.indexOf(wronganswer) > -1);
            
            answers.push(wronganswer);
            
            document.getElementById("option" + i).innerHTML = wronganswer;
        }
    }
}