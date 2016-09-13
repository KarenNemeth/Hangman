(function() {

//initializing game
    // var initializeGame = document.getElementById("ready");
    // var opener = document.getElementById("opener");
    //
    // initializeGame.addEventListener("click", function() {
    //     opener.style.display="none";
    // });

    //Add in starting the game

//input fields
    function inputs() {

        //letter guesses
        var alphabet = ["A", "B", "C", "D", "E", "F", "G", "H",
            "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S",
            "T", "U", "V", "W", "X", "Y", "Z"];
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

        //full word guesses
        var userEnteredWords = [];
        var wordInput = document.getElementById("wordInput");
        var fullWordContainer = document.getElementById("fullWordGuesses");
        var wordButton = document.getElementById("wordButton");
        var word;

        wordButton.addEventListener("click", function() {
            var userInputWord = wordInput.value;
            userInputWord.push(userEnteredWords);
            word = document.createTextNode(userEnteredWords);
            word.push(fullWordContainer);
        });
    }

    inputs();


//gameplay

    var words = ["gandalf", "likes", "smoking", "pipeweed", "with", "hobbits"];

    function chooseWord() {
        var chosenWord = words[Math.floor(Math.random() * words.length)];
    }



})();
