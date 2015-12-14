
/* **** Global Variables **** */
// try to elminate these global variables in your project, these are here just to start.
//TODO: 1.the guesses are not initing correctly.
// 2. the box needs to disabled when the game is over
// 3. replay
//

var playersGuess,
    winningNumber,
    newgame=0,
    totalalloedGuesses=5,
    winningnumber=0,
    guessedArray=[],
    myinterval
    gameover=false
    ;		



$(document).ready(function(){
	$("#submitguess").click(function(){
    	playersGuessSubmission();
    });
    $("#hintbut").click(function(){provideHint()});
    $("#replaybut").click(function(){initGame()});
    $("#guessinput").focus(function(){starttimer(82);playAudio('theme');});
 $('#guessinput').keypress(function(event){
    if (event.keyCode == 10 || event.keyCode == 13){playersGuessSubmission();
    event.preventDefault();
    
    } 
    	

  });
	initGame();});

/* **** Guessing Game Functions **** */

function initGame(){
	endGame();
	playersGuess='',
    newgame=0,
    gameover=false,
    totalalloedGuesses=5,
    winningnumber=0,
    guessedArray=[],
    myinterval={};
	checkGuess(0,0);
	generateWinningNumber
    winningnumber=generateWinningNumber(1,100);	

    console.log('winningNumber = '+winningnumber)
    checkGuess(0,winningnumber);
    document.getElementById('countdownText').innerHTML='00-00-00';
	document.getElementById('hinttext').innerHTML='';

    //  $("#replay").click(function(){console.log('replay')});
   
}

// Generate the Winning Number

function generateWinningNumber(min,max){
	// add code here
 return Math.floor((Math.random() * 100) + 1);
}

// Fetch the Players Guess

function playersGuessSubmission(){
	// add code here
   playersGuess =parseInt(document.getElementById('guessinput').value);
	
	checkGuess(playersGuess ,winningnumber);
  	document.getElementById('guessinput').value='';
   
}

function guessMessage (currentGuess,winningNumber){
	var guessInfo=lowerOrHigher(currentGuess,winningNumber);
    var relativepostion=guessInfo[0];
    var rangDistance=guessInfo[1];
	var message="Your Guess  is "+relativepostion+" and within "+rangDistance+" of the number that will save your life";
	console.log(message);
	document.getElementById('hinttext').innerHTML=message;
}
// Determine if the next guess should be a lower or higher number

function lowerOrHigher(currentGuess,winningNumber){
	// add code here
	if(currentGuess > winningNumber){var distance=currentGuess-winningNumber;var relativepostion='larger'}
	if(currentGuess < winningNumber){var distance=winningNumber-currentGuess;var relativepostion='smaller'}
	var rangDistance=(Math.ceil(distance / 10) * 10);
		return [relativepostion,rangDistance];

}
// Check if the Player's Guess is the winning number 

function checkGuess(currentGuess,winningNumber ){
	// add code here
	if((guessedArray.indexOf(currentGuess) > -1) || (currentGuess < 1) || (currentGuess > 100) || (isNaN(currentGuess) !== false)){
		var guessString='';
		for(var i=totalalloedGuesses;i > 0 ;i--){guessString+=' '+i}
		document.getElementById('countMissestext').innerHTML=guessString;
		return
	};
		console.log(currentGuess+' '+winningNumber+' '+totalalloedGuesses);
	if(winningNumber === currentGuess){
			var message="Lucky Guess, I'll get You next time. Scared to play again. Click I dare you!!";
			document.getElementById('hinttext').innerHTML=message;
			endGame();
			return;
	}else{
			var guessString='';
			console.log(totalalloedGuesses);
			totalalloedGuesses--
			if(totalalloedGuesses === 0){endGame();}
			for(var i=totalalloedGuesses;i > 0 ;i--){guessString+=' '+i}
			document.getElementById('countMissestext').innerHTML=guessString;
	}
		guessedArray.push(currentGuess);
		if(guessedArray.length !== 0){guessMessage(currentGuess,winningNumber)};		
}

// Create a provide hint button that provides additional clues to the "Player"

function provideHint(){
	// add code here
		var guessesLeft=totalalloedGuesses-guessedArray.length;
		console.log('guessesLeft'+totalalloedGuesses);
		var hintArray=[];
		hintArray.push(winningnumber);
		for(var i=0;i<totalalloedGuesses*2;i++){
			var tempNum=generateWinningNumber()
			if(tempNum === winningnumber){i--}else{hintArray.push(tempNum);};	
		}
		hintArray.sort();
		var message='One of these number will save you '+hintArray+'. Pick one Chicken!!';
		document.getElementById('hinttext').innerHTML=message;
}

// Allow the "Player" to Play Again

function playAgain(){
	// add code here
	initGame();
}
// create count down timer	
		 var starttimer=function(secondsAllowed){
		 	var intervalPassed=0;
 		 	if(newgame > 0 ){return}
		 	var multiplerFortime=100 		
		 	var timerValue=secondsAllowed*multiplerFortime; // NUMBER OF SEC IN MILLISECONDS
		 	var interv=10; // countdown interval
			myinterval=setInterval(function(){
				//var hundreths=timeallowed%10;
			newgame++
			var minutesDisplay='';
			var secondsDisplay='';
			var minutes=Math.floor((timerValue/multiplerFortime)/60);
			if(minutes < 10){minutesDisplay='0'+minutes}else{minutesDisplay=minutes};
			//var secons=0+Math.floor((timerValue-(minutes*multiplerFortime)/60)/multiplerFortime);
				//var seconds=Math.floor(((timerValue-(minutes*multiplerFortime))/multiplerFortime)); // the number of milliseconds left for seconds
				var seconds=(Math.floor(timerValue/multiplerFortime)-(minutes*60));
				if(seconds < 10){secondsDisplay='0'+seconds}else{secondsDisplay=seconds};
				var milliseconds=(Math.floor((timerValue%10)));
				document.getElementById('countdownText').innerHTML=minutesDisplay+'-'+secondsDisplay+'-0'+milliseconds;
			intervalPassed++;
			
			if(timerValue > 0){
				timerValue--;
				if(timerValue === 0){
					endGame();
				}
		}
			},interv);
		}



var playAudio=function(myAudio){
	if(gameover===true){return;}
	document.getElementById(myAudio).play();
return
}
var pauseAudio=function(myAudio){
	document.getElementById(myAudio).pause();
return
}
var resetAudio=function(myAudio){
	document.getElementById(myAudio).currentTime=9.7;
return
}
//
var endGame = function(){
	pauseAudio('theme');
	resetAudio('theme');
	clearInterval(myinterval);
	gameover=true;
}
/* **** Event Listeners/Handlers ****  */