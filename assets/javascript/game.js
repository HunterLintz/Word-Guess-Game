var monsters = ["BALOR","BEHOLDER","DRAGON","ELEMENTAL","GHOST","GIANT","GNOLL","GOBLIN","LICH","MIMIC","MINDFLAYER","MUMMY","OOZE","ORC","OWLBEAR","SKELETON","VAMPIRE","ZOMBIE"];
var guesses = [];
var currentMon;
var randomMonsterLower;
var monImage;
var guessesLeft = 10;
var letterGenStr;
var currentGenLetter;
var currentLetter;
var letGenVar;
var letVar;
var guessWrong = false;
var win = false;
var gameEnd = false;
var nameLength;
var guessRight = 0;
var randomMonster;
//generates monster for hangman word
function monsterGen(){
    randomMonster = monsters[Math.floor(Math.random()*monsters.length)];
    currentMon = randomMonster.split("");
    nameLength = currentMon.length;
    randomMonsterLower = randomMonster.toLowerCase()
    monImage = "assets/images/monsterImages/"+randomMonsterLower+".png"
    for(i = 0; i < currentMon.length; i++){
        letterGenStr = currentMon[i];
        currentGenLetter = ("letter" + i);
        letGenVar = document.getElementById(currentGenLetter);
        letGenVar.innerHTML = (letterGenStr);
        letGenVar.style.visibility = "hidden";
        }
};
//reloads page
function reload(){
    location.reload(); 
}
//checks if you won or not
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

//found this online when i searched how to find every instance of a value in an array 
Array.prototype.multiIndexOf = function (el) { 
    var idxs = [];
    for (var c = this.length - 1; c >= 0; c--) {
        if (this[c] === el) {
            idxs.unshift(c);
        }
    }
    return idxs;
};
// on each key press checks if its right or not and does logic accordingly
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
//waits for html to load before starting
document.addEventListener('DOMContentLoaded', (event) => {
    monsterGen();
  })


