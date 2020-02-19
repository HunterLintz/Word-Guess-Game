//array of Monsters
var monsters = ["BALOR","BEHOLDER","DRAGON","ELEMENTAL","GHOST","GIANT","GNOLL","GOBLIN","LICH","MIMIC","MINDFLAYER","MUMMY","OOZE","ORC","OWLBEAR","SKELETON","VAMPIRE","ZOMBIE"];
//array of guessed letters
var guesses = [];
//array of current monsters letters
var currentMon;
//monsters name in lowercase
var randomMonsterLower;
//path for monster
var monImage;
//guesses left
var guessesLeft = 10;
//current letter in generation function
var letterGenStr;
//sets current letters id 
var currentGenLetter;
//current letter being checked
var currentLetter;
//document.get for gen function
var letGenVar;
//document.get for check function
var letVar;
//boolean for if user guesses wrong
var guessWrong = false;
//boolean for if user wins game
var win = false;
//boolean for if game is over
var gameEnd = false;
//set to length of current monster string
var nameLength;
//number of times user guesses right
var guessRight = 0;
//var used to generate random monster
var randomMonster;
//function used to generate monster
function monsterGen(){
    //setting random monster
    randomMonster = monsters[Math.floor(Math.random()*monsters.length)];
    //splits randomMonster into array
    currentMon = randomMonster.split("");
    //sets to currentMon length
    nameLength = currentMon.length;
    //sets to randomMonster but lowercase
    randomMonsterLower = randomMonster.toLowerCase()
    //sets file path for the current monsters image
    monImage = "assets/images/monsterImages/"+randomMonsterLower+".png"
    //runs for every item in currentMon array
    for(i = 0; i < currentMon.length; i++){
        letterGenStr = currentMon[i];
        currentGenLetter = ("letter" + i);
        letGenVar = document.getElementById(currentGenLetter);
        letGenVar.innerHTML = (letterGenStr);
        letGenVar.style.visibility = "hidden";
        }
};
function reload(){
    location.reload();
}
function endGame(){
    gameEnd = true;
    if (win == false){
        document.getElementById("end").style.visibility = "visible";
        document.getElementById("lose").style.display = "block";
    }else{
        document.getElementById("monsterImage").src = (monImage);
        document.getElementById("end").style.visibility = "visible";
        document.getElementById("win").style.display = "block";
    }
};
Array.prototype.multiIndexOf = function (el) { 
    var idxs = [];
    for (var c = this.length - 1; c >= 0; c--) {
        if (this[c] === el) {
            idxs.unshift(c);
        }
    }
    return idxs;
};
document.onkeyup = function(event){
    if (event.keyCode >= 65 && event.keyCode <= 90){
        if (gameEnd === false){
            var userG = event.key;
            var userGuess = userG.toUpperCase();
            if (guesses.includes(userGuess) == false){
                guesses.push(userGuess)
                document.getElementById("guesses").innerHTML = guesses
                guessCheck = currentMon.multiIndexOf(userGuess);
                if( guessCheck.length == 0){
                    guessesLeft -= 1;
                    document.getElementById("guessesLeft").innerHTML = (guessesLeft);
                    if (guessesLeft <= 0){
                        win = false;
                        endGame();
                    }
                }else{
                    for(v = 0; v < guessCheck.length;v++){
                        currentLetter = ("letter" + guessCheck[v]);
                        letVar = document.getElementById(currentLetter);
                        console.log(currentLetter);
                        letVar.style.visibility = "visible";
                        guessRight += 1;
                    };
                    if(guessRight == nameLength){
                        win = true;
                        endGame();
                    }
                };
            };
        }
    };
};
document.addEventListener('DOMContentLoaded', (event) => {
    monsterGen();
  })


