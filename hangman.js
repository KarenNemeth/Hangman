(function() {

//Some Global Variables
    var alphabet = ["A", "B", "C", "D", "E", "F", "G", "H",
        "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S",
        "T", "U", "V", "W", "X", "Y", "Z"];
    var wordsLower = ["gandalf", "smoking", "pipeweed", "hobbits", "towelie", "password", "javascript"];
    var words = [];
    for (var w = 0; w < wordsLower.length; w++){
        words[w] = wordsLower[w].toUpperCase();
    }
    var chosenWord; //word
    var guessedLetter; //guess
    //var guessedWord;
    var guessedLetters = []; //guessesArray
    var guessedWords = [];
    var lives;
    var correctNumberOfGuesses;

// initializing game
//  var initializeGame = document.getElementById("ready");
//  var opener = document.getElementById("opener");
//     initializeGame.addEventListener("click", function() {
//         opener.style.display="none";
//         play();
//     });

//Input Fields
    var input = document.getElementById("input");
    function inputs() {

        //letter guesses
        var alphabetContainer = document.getElementById("alphabetContainer");
        var alphabetList;
        var letters;

        function lettersToSelect() {
            alphabetList = document.createElement("ul");
            alphabetList.id = "alphabetList";
            for (var i = 0; i < alphabet.length; i++) {
                letters = document.createElement("li");
                letters.className += "letters";
                letters.innerHTML = alphabet[i];
                alphabetContainer.appendChild(alphabetList);
                alphabetList.appendChild(letters);
            }
        }
        lettersToSelect();

        //checkLetter
        alphabetList.addEventListener("click", checkLetter);
        function checkLetter(e){
            guessedLetter = e.target.innerHTML;
            console.log(guessedLetter);
            var errorFlag = true;
            for (var i = 0; i < chosenWord.length; i++){
                if (chosenWord[i] === guessedLetter) {
                    guessedLetters[i].innerHTML = guessedLetter;
                    e.target.style.backgroundColor = "black";
                    e.target.style.color = "white";
                    errorFlag = false;
                    correctNumberOfGuesses += 1;
                    console.log("lives = " + lives);
                    console.log("correctNumberOfGuesses = " + correctNumberOfGuesses);
                }
            }
            if (errorFlag) {
                lives -=1;
                console.log("lives = " + lives);
                e.target.style.backgroundColor = "darkred";
                e.target.style.color = "white";
                animate();
            }
            endGame();
            errorFlag = true;
        }

        //checkWord

        // guessedWord = document.getElementById("wordInput");
        // var fullWordContainer = document.getElementById("fullWordGuesses");
        // var wordButton = document.getElementById("wordButton");
        // var word;
        //
        // wordButton.addEventListener("click", function() {
        //     var userInputWord = wordInput.value;
        //     userInputWord.push(userEnteredWords);
        //     word = document.createTextNode(userEnteredWords);
        //     word.push(fullWordContainer);
        // });
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
        canvas.fillStyle = buildingPattern();
        canvas.fillRect(1100,100,100,400);
        canvas.fillRect(1200,300,100,200);
    }
    function building6(){
        canvas.fillStyle = buildingPattern();
        canvas.fillRect(275,100,100,400);
        canvas.fillRect(600,300,100,200);
        canvas.fillStyle = buildingPattern();
        canvas.fillRect(435, 160, 50, 140);
    }
    var buildingOrder = [building6, building5, building4, building3, building2, building1];

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
        building6();
        setTime = setTimeout(celebration, 300);
    }

//End Game
    var closer = document.getElementById("closer");
    var restartText = document.getElementById("restart");
    var playAgain = document.getElementById("goAgain");
    var setTime;

    function endGame () {
        if (lives < 1){
            closer.style.display = " ";
            input.style.display = "none";
            celebration();
    /*draw fireworks*/
            restartText.createTextNode = "You have not failed. You’ve just found 6 ways that won’t work.";
            restartText.createTextNode = "Thankfully that's how most things have been built.";
            restartText.createTextNode = "Congratulations on completing your city! Now, time to enjoy Happy Hour.";
        }
        if (correctNumberOfGuesses === guessedLetters.length) {
            closer.style.display = " ";
            input.style.display = "none";
    /* animation of guy jumping from building */
            restartText.innerHTML = "Yay! You finished the project! Time for happy hour.";
        }
        playAgain.addEventListener("click", restart);
    }

//Restart Game
    function restart() {
        playAgain.removeEventListener("click", restart);
        input.style.display = " ";
        closer.style.display = "none";
        clearTimeout(setTime);
        canvas.clearRec(0,0,900,500);
        //number of correct, letters guessed, words guessed, and innerHTML
        play();
    }

//gameplay
    function play(){
        chosenWord = words[Math.floor(Math.random() * words.length)];
        console.log(chosenWord);
        inputs();

        guessedLetters = [];
        guessedWords = [];
        lives = 6;
        correctNumberOfGuesses = 0;

        listOfGuesses();
    }

    play(); //For testing purposes
})();
