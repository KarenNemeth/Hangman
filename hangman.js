(function() {

//Some Global Variables
    var alphabet = ["A", "B", "C", "D", "E", "F", "G", "H",
        "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S",
        "T", "U", "V", "W", "X", "Y", "Z"];
    var words = ["gandalf", "smoking", "pipeweed", "hobbits", "towelie", "password", "javascript"];
    var chosenWord; //word
    var guessedLetter; //guess
    //var guessedWord;
    var guessedLetters = []; //guessesArray
    //var guessedWords = [];
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
    var coolPattern = pattern.getContext('2d');
        pattern.width = 2;
        pattern.height = 10;

    function newPattern(){
        coolPattern.clearRect(0,0, pattern.width, pattern.height);
        coolPattern.fillStyle = 'hsl(' + 360 * Math.random() + ', 50%, 50%)';
        coolPattern.fillRect(0,0,12,14);
        coolPattern.lineWidth = 1;
        coolPattern.strokeStyle = 'rgb(255,255,255)';
        coolPattern.strokeRect(0,0,22,22);
        return(canvas.createPattern(pattern,'repeat'));
    }


    //Drawing
    var cityscape = document.getElementById("cityscape");
    var canvas = cityscape.getContext("2d");

    function cityScape() {
        canvas.fillStyle = newPattern();
        canvas.fillRect(0, 260 , 100,240);


        //
        // canvas.moveTo();
        // canvas.lineTo();
        //
        // canvas.moveTo();
        // canvas.lineTo();
        //
        // canvas.moveTo();
        // canvas.lineTo();
        //
        // canvas.moveTo();
        // canvas.lineTo();
        //
        // canvas.moveTo();
        // canvas.lineTo();
    }

    // function draw(fromX, fromY, toX, toY) {
    //     canvas.moveTo(fromX, fromY);
    //     canvas.lineTo(toX, toY);
    //     canvas.stroke();
    // }

    //Execution
    function animate() {
        var drawing = lives;
        drawingOrder[drawing]();
    }

    //Resizing Effect
    window.addEventListener('resize', resizeCityScape, false);

    function resizeCityScape() {
        cityScape();
    }

//End Game
    var closer = document.getElementById("closer");

    function endGame () {
        if (lives < 1){
            closer.style.display = " ";
            input.style.display = "none";
            restartText.innerHTML = "You didn't complete the project in time! Think about all the homeless, unemployed people!";
        }
        if (correctNumberOfGuesses === guessedLetters.length) {
            closer.style.display = " ";
            input.style.display = "none";
            restartText.innerHTML = "Yay! You finished the project! Time for happy hour.";
        }
        playAgain.addEventListener("click", restart);
    }

//Restart Game
    var restartText = document.getElementById("restart");
    var playAgain = document.getElementById("goAgain");

    function restart() {
        playAgain.removeEventListener("click", restart);
        input.style.display = " ";
        closer.style.display = "none";
        //clear rectangle, number of correct, letters guessed, words guessed, and innerHTML
        play();
    }

//gameplay
    function play(){
        chosenWord = words[Math.floor(Math.random() * words.length)];
        console.log(chosenWord);
        inputs();

        guessedLetters = [ ];
        lives = 5;
        correctNumberOfGuesses = 0;

        listOfGuesses();
        resizeCityScape();

        endGame();
    }

    play(); //For testing purposes
})();
