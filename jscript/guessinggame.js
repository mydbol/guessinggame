
/* **** Global Variables **** */
// try to elminate these global variables in your project, these are here just to start.
var playersGuess,
    winningNumber,
    newgame=0,
    totalalloedGuesses=5,
    winningnumber=0,
    guessedArray=[],
    myinterval
    ;		



$(document).ready(function(){initGame();});

/* **** Guessing Game Functions **** */

function initGame(){
	checkGuess(0,0,totalalloedGuesses);
	generateWinningNumber,
    newgame=0;
    winningnumber=generateWinningNumber(1,100);	
    console.log('winningNumber = '+winningnumber)
    checkGuess(0,winningnumber);
		
    $("#submitguess").click(function(){
    	playersGuessSubmission();
    });
    $("#hint").click(function(){provideHint()});
    $("#replay").click(function(){console.log('replay')});
    $("#guessinput").focus(function(){starttimer(82);playAudio('theme');});
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
	
	checkGuess(playersGuess ,winningnumber,totalalloedGuesses);
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
	console.log(guessedArray);
	if((guessedArray.indexOf(currentGuess) > -1) || (currentGuess < 1) || (currentGuess > 100) || (isNaN(currentGuess) !== false)){return};
		console.log(currentGuess+' '+winningNumber+' '+totalalloedGuesses);
	if(winningNumber === currentGuess){
		var message="Lucky Guess, I'll get You next time. Scared to play again. Click I dare you!!";
		document.getElementById('hinttext').innerHTML=message;
		clearInterval(myinterval);
		pauseAudio('theme');
		return;
		}else{
		var guessString='';
		console.log(totalalloedGuesses);
		for(var i=totalalloedGuesses;i > 0 ;i--){guessString+=' '+i}
		document.getElementById('countMissestext').innerHTML=guessString;
		totalalloedGuesses--

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
		for(var i=0;i<totalalloedGuesses-1;i++){
			var tempNum=generateWinningNumber()
			if(tempNum === winningnumber){i--}else{hintArray.push(tempNum);};	
		}
		hintArray.sort();
		var message=hintArray;
		document.getElementById('hinttext').innerHTML=message;
}

// Allow the "Player" to Play Again

function playAgain(){
	// add code here
	initGame();
}
// create count down timer	
		 var starttimer=function(secondsAllowed){
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
			if(timerValue > 0){
				timerValue--;
				if(timerValue === 0){
					pauseAudio('theme');
				}
		}
			},interv);
		}



var playAudio=function(myAudio){
	document.getElementById(myAudio).play();
return
}
var pauseAudio=function(myAudio){
	document.getElementById(myAudio).pause();
return
}
//
/* **** Event Listeners/Handlers ****  */