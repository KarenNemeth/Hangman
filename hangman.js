(function() {

//Some Global Variables
    var alphabet = ["A", "B", "C", "D", "E", "F", "G", "H",
        "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S",
        "T", "U", "V", "W", "X", "Y", "Z"];
    var words = ["gandalf", "smoking", "pipeweed", "hobbits", "towelie", "password", "javascript"];
    var chosenWordDefault; //word
    var chosenWord;
    var guessedLetter; //guess
    var guessedWord;
    var guessedLetters = []; //guessesArray
    var lives;
    var correctNumberOfGuesses;
    var key;
    var message = document.getElementById("message");
    var errorFlag = true;
    var xhr = new XMLHttpRequest;
    var banner = document.getElementById("airplane");
    var userInputWord;
    var capitalized;

// initializing game
//  var initializeGame = document.getElementById("ready");
//  var opener = document.getElementById("opener");
//     initializeGame.addEventListener("click", function() {
//         opener.style.display="none";
//         play();
//     });

//Input Fields
    var input = document.getElementById("input");
    var alphabetContainer = document.getElementById("alphabetContainer");
    var alphabetList;
    var letters;
    var letterList = [];

    function inputs() {

        //letter guesses
        function lettersToSelect() {
            alphabetList = document.createElement("ul");
            alphabetList.id = "alphabetList";
            for (var i = 0; i < alphabet.length; i++) {
                letters = document.createElement("li");
                letters.className += "letters";
                letters.innerHTML = alphabet[i];
                alphabetContainer.appendChild(alphabetList);
                alphabetList.appendChild(letters);
                letterList = alphabetList.children;
            }
        }
        lettersToSelect();

        //checkLetter
        alphabetList.addEventListener("click", checkLetterClicked);
        document.addEventListener("keydown", checkLetterPressed);
    }

    function checkLetterClicked(e){
        message.innerHTML = "This city is built on wrong guesses!";
        if (e.target.id == "right" || e.target.id == "wrong"){
            message.innerHTML = "You've already guessed that letter!";
            return;
        }
        guessedLetter = e.target.innerHTML;
        for (var i = 0; i < chosenWord.length; i++){
            if (chosenWord[i] === guessedLetter) {
                guessedLetters[i].innerHTML = guessedLetter;
                e.target.id = "right";
                errorFlag = false;
                correctNumberOfGuesses += 1;
                console.log("lives = " + lives);
                console.log("correctNumberOfGuesses = " + correctNumberOfGuesses);
            }
        }
        if (errorFlag) {
            lives -=1;
            console.log("lives = " + lives);
            e.target.id = "wrong";
            animate();
        }
        endGame();
        errorFlag = true;
    }
    function checkLetterPressed(e) {
        key = e.key.toUpperCase();
        message.innerHTML = "This city is built on wrong guesses!";
        if (e.keyCode > 90 || e.keyCode < 65) {
            message.innerHTML = "Letter guesses only please!";
            console.log("non-letter guess");
            return;
        } else {
            for (var j = 0; j < alphabet.length; j++){
                if (key == letterList[j].innerHTML) {
                    if (letterList[j].id == "right" || letterList[j].id == "wrong"){
                        message.innerHTML = "You've already guessed that letter!";
                        return;
                    }
                    guessedLetter = letterList[j].innerHTML;
                    console.log(guessedLetter);
                    for (var i = 0; i < chosenWord.length; i++){
                        if (chosenWord[i] === guessedLetter) {
                            guessedLetters[i].innerHTML = guessedLetter;
                            letterList[j].id = "right";
                            errorFlag = false;
                            correctNumberOfGuesses += 1;
                            console.log("lives = " + lives);
                            console.log("correctNumberOfGuesses = " + correctNumberOfGuesses);
                        }
                    }
                    if (errorFlag) {
                        lives -= 1;
                        console.log("lives = " + lives);
                        letterList[j].id = "wrong";
                        animate();
                    }
                    endGame();
                    errorFlag = true;
                }
            }
        }
    }

//Guess whole word

    var position = 120;
    var stopFlying = false;
    var noEvent = true;

    function airplane(){
        banner.style.left = position + "%";
        position -= 0.15;

        var airplaneWidth = (Math.round(((banner.offsetWidth/document.querySelectorAll('body')[0].clientWidth)-0)*100));

        if (position < -(airplaneWidth+10)) {
            window.cancelAnimationFrame(airplane);
            position = 110;
            if (stopFlying) {
                return;
            }
        }
        if (noEvent) {
            window.requestAnimationFrame(airplane);
        }
    }
    function airplaneStop(){
        noEvent = true;
        airplane();
    }

    banner.addEventListener("mouseenter", function(){
        noEvent = false;
        window.cancelAnimationFrame(airplane);
    });
    banner.addEventListener("mouseleave", airplaneStop);
    banner.addEventListener("click", function(){
        stopFlying = true;
        userInputButtons.style.display = "block";
    });

    //Enter a Word

    guessedWord = document.getElementById("textArea");
    var buttonToGuess = document.getElementById("buttonToGuess");
    var triedWords = document.getElementById("failed");

    guessedWord.addEventListener("focusin", function(){
        document.removeEventListener("keydown", checkLetterPressed);
        document.addEventListener("keydown", function(e){
            if (e.keyCode == 13) {
                enter();
                e.preventDefault();
            }
        });

    });
    guessedWord.addEventListener("focusout", function(){
        document.addEventListener("keydown", checkLetterPressed);
    });
    buttonToGuess.addEventListener("click", function(){
        enter();
    });
    function enter(){
        userInputWord = guessedWord.value;
        if (userInputWord.length != chosenWord.length) {
            message.innerHTML = "Please make sure you have the correct number of characters";
            setTimeout(function(){message.innerHTML = "This city is built on wrong guesses!";}, 3000);
            return;
        }
        var triedWordsColumn = document.createElement("td");
        triedWordsColumn.innerHTML = userInputWord;
        triedWords.appendChild(triedWordsColumn);
        guessedWord.value = "";
        checkWord();
    }

    //Check word

    function checkWord(){
        capitalized = userInputWord.toUpperCase();
        if (capitalized != chosenWord) {
            lives -=1;
            console.log("lives = " + lives);
            animate();
        }
        endGame();
    }

//List of Guesses
    function listOfGuesses(){
        var correctGuesses = document.getElementById("word");
        var listOfGuesses = document.createElement("ul");

        for (var i = 0; i < chosenWord.length; i++) {
            guessedLetter = document.createElement("li");
            guessedLetter.innerHTML = "_";
            guessedLetters.push(guessedLetter);
            correctGuesses.appendChild(listOfGuesses);
            listOfGuesses.appendChild(guessedLetter);
        }
    }

//Animation

    //Patterns
    var pattern = document.createElement('canvas');
    var brickPattern = pattern.getContext('2d');
    pattern.width = 2;
    pattern.height = 10;

    function buildingPattern(){
        brickPattern.clearRect(0,0, pattern.width, pattern.height);
        brickPattern.fillStyle = 'hsl(' + 360 * Math.random() + ', 50%, 50%)';
        brickPattern.fillRect(0,0,12,14);
        brickPattern.lineWidth = 1;
        brickPattern.strokeStyle = 'rgb(255,255,255)';
        brickPattern.strokeRect(0,0,22,22);
        return(canvas.createPattern(pattern,'repeat'));
    }

    //Drawing
    var cityscape = document.getElementById("cityscape");
    var canvas = cityscape.getContext("2d");

    function building1(){
        canvas.fillStyle = buildingPattern();
        canvas.fillRect(0, 260 , 100,240);
        canvas.fillRect(10,470,80,30);
        canvas.fillStyle = buildingPattern();
        canvas.fillRect(100, 210, 100, 290);
        canvas.fillRect(113, 500-340, 74, 50);
        canvas.fillRect(130, 100, 40, 60);
        canvas.fillRect(140, 40, 20, 60);
    }
    function building2(){
        canvas.fillStyle = buildingPattern();
        canvas.fillRect(200, 260, 100, 240);
        canvas.moveTo(250,180);
        canvas.lineTo(200,260);
        canvas.lineTo(300,260);
        canvas.closePath();
        canvas.fill();
        canvas.fillStyle = buildingPattern();
        canvas.fillRect(340, 300, 240, 200);
    }
    function building3(){
        canvas.fillStyle = buildingPattern();
        canvas.fillRect(540, 120, 100, 380);
        canvas.moveTo(540,120);
        canvas.lineTo(540,20);
        canvas.lineTo(640, 120);
        canvas.closePath();
        canvas.fill();
        canvas.fillRect(660,220,100,280);
        canvas.moveTo(660,220);
        canvas.lineTo(660,120);
        canvas.lineTo(760, 220);
        canvas.closePath();
        canvas.fill();
    }
    function building4(){
        canvas.fillStyle = buildingPattern();
        canvas.fillRect(760, 400, 200, 100);
        canvas.fillRect(810, 100, 100, 300);
        canvas.fillRect(840,70,10,30);
        canvas.fillRect(870,70,10,30);
        canvas.moveTo(760,400);
        canvas.lineTo(810,350);
        canvas.lineTo(810,400);
        canvas.closePath();
        canvas.fill();
        canvas.moveTo(910,400);
        canvas.lineTo(960,400);
        canvas.lineTo(910,350);
        canvas.closePath();
        canvas.fillStyle = 'hsl(' + 360 * Math.random() + ', 50%, 50%)';
        canvas.fill();
        canvas.fillRect(980,480,100,20);
        canvas.fillRect(970,460,120,20);
        canvas.fillRect(980,440,100,20);
        canvas.fillRect(970,420,120,20);
        canvas.fillRect(980,400,100,20);
        canvas.fillRect(970,380,120,20);
        canvas.fillRect(980,360,100,20);
        canvas.fillRect(970,340,120,20);
        canvas.fillRect(980,320,100,20);
        canvas.fillRect(970,300,120,20);
        canvas.fillRect(980,280,100,20);
        canvas.fillRect(970,260,120,20);
        canvas.fillRect(980,240,100,20);
        canvas.fillRect(970,220,120,20);
        canvas.fillRect(1000,215,60,5);
        canvas.fillRect(1003,210,54,5);
    }
    function building5(){
        console.log("wtf");
        canvas.fillStyle = buildingPattern();
        canvas.fillRect(275,100,100,400);
        canvas.fillRect(600,300,100,200);
        canvas.fillStyle = buildingPattern();
        canvas.fillRect(435, 160, 50, 140);
    }
    function fireworks(){
        console.log("on order");
    }

    var buildingOrder = [fireworks, building5, building4, building3, building2, building1];

    //Execution
    function animate() {
        var building = lives;
        buildingOrder[building]();
    }
    function celebration() {
        building1();
        building2();
        building3();
        building4();
        building5();
        setTime = setTimeout(celebration, 300);
    }

//End Game
    var closer = document.getElementById("closer");
    var restartText = document.getElementById("restart");
    var playAgain = document.getElementById("goAgain");
    var setTime;
    var userInputButtons = document.getElementById("userInput");

    function endGame () {
        if (lives < 1){
            window.cancelAnimationFrame(airplane);
            banner.style.display = "none";
            closer.style.display = " ";
            userInputButtons.style.display = "none";
            alphabetContainer.style.display = "none";
            message.innerHTML = "The correct word was " + chosenWord;
            celebration();
    /*draw fireworks*/
            restartText.createTextNode = '"You have not failed. You’ve just found 6 ways that won’t work."';
            restartText.createTextNode = "Thankfully that's how most things have been built.";
            restartText.createTextNode = "Congratulations on completing your city! Now, time to enjoy Happy Hour.";
            document.removeEventListener("keydown", checkLetterPressed, true);
        }
        if (correctNumberOfGuesses === chosenWord.length || capitalized == chosenWord) {
            window.cancelAnimationFrame(airplane);
            banner.style.display = "none";
            closer.style.display = " ";
            input.style.display = "none";
    /* king kong video*/
            restartText.innerHTML = "The purpose of this game was to learn how to fail. You didn't seem to get that lesson, so your stalker killed himself in shame.";
            document.removeEventListener("keydown", checkLetterPressed, true);
        }
        playAgain.addEventListener("click", restart);
    }

//Restart Game
    function restart() {
        playAgain.removeEventListener("click", restart);
        input.style.display = " ";
        closer.style.display = "none";
        chosenWordDefault = "";
        position = 100;
        clearTimeout(setTime);
        canvas.clearRec(0,0,900,500);
        //number of correct, letters guessed, words guessed, and innerHTML
        play();
    }

//choosing word
    function getRandomWord(){
        var randomNumberForWord = ((Math.floor(Math.random() * 6) + 1 ) + 5);
        var url = 'http://www.setgetgo.com/randomword/get.php?len=' + randomNumberForWord;
        xhr.open('GET', url);
        xhr.send();
        xhr.addEventListener('readystatechange', function() {
            if (xhr.readyState != XMLHttpRequest.DONE) {
                console.log("not done");
                return;
            }
            var status;
            try {
                status = xhr.status;
                chosenWordDefault = xhr.responseText;
            } catch(e) {
                chosenWordDefault = words[Math.floor(Math.random() * words.length)];
                console.log("error");
                return;
            }
            chosenWord = chosenWordDefault.toUpperCase();
            play();
        });
    }

//gameplay

    function play(){

        if (typeof chosenWordDefault === 'undefined'){
            getRandomWord();
            return;
        }
        console.log(chosenWord);
        inputs();

        guessedLetters = [];
        lives = 6;
        correctNumberOfGuesses = 0;

        airplane();
        listOfGuesses();
    }

    play(); //For testing purposes
})();
