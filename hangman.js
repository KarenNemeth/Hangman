(function() {

    play(); //For testing purposes

//Some Global Variables
    var alphabet = ["A", "B", "C", "D", "E", "F", "G", "H",
        "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S",
        "T", "U", "V", "W", "X", "Y", "Z"];
    var words = ["gandalf", "smoking", "pipeweed", "hobbits", "towelie", "password"];
    var chosenWord; //word
    var guessedLetter; //guess
    //var guessedWord;
    var guessedLetters = []; //guessesArray
    //var guessedWords = [];
    var lives;
    var correctNumberOfGuesses;

//HTML Elements
    //var initializeGame = document.getElementById("ready");
    //var opener = document.getElementById("opener");
    var closer = document.getElementById("closer");
    var restartText = document.getElementById("restart");
    var input = document.getElementById("input");


// initializing game
//     initializeGame.addEventListener("click", function() {
//         opener.style.display="none";
//         play();
//     });

//gameplay
    function play(){
        chosenWord
         = words[Math.floor(Math.random() * words.length)];
        console.log(chosenWord);
        inputs();

        guessedLetters = [ ];
        lives = 5;
        correctNumberOfGuesses = 0;

        listOfGuesses();
        cityscape();

        endGame();
    }

//Input Fields
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
    function animate() {
        var drawing = lives;
        drawingOrder[drawing]();
    }

    function cityscape() {
        
    }


//End Game
    function endGame () {
        if (lives < 1){
            closer.style.display = " ";
            input.style.display = "none";
            restartText.innerHTML = "You didn't complete the project in time! Think about all the homeless, unemployed people!";
        }
        if (correctNumberOfGuesses === guessedLetters.length) {
            closer.style.display = "block";
            input.style.display = "none";
            restartText.innerHTML = "Yay! You finished the project! Time for happy hour.";
        }
    }

//Restart Game



})();
