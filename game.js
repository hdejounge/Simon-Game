var gameStarted = false;
var level = 0;

$(document).keydown(function () {
    if (!gameStarted) {
        $("h1").text("Level " + level);
        gameStarted = true;
        nextSequence();
    }
});


// Array of pattern created
var gamePattern = [];

// Array of user game pattern clicked
var userClickedPattern = [];

// Array of button colors
var buttonColors = ["red", "blue", "green", "yellow"];

// Event listener for button press
$(".btn").click(function () {
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);

    animatePress(userChosenColor);

    var audioFile = "sounds/" + userChosenColor + ".mp3";
    playSound(audioFile);

    checkAnswer(userClickedPattern.length - 1);
})

// Determine next btn in sequence and play sound
function nextSequence() {
    userClickedPattern = [];

    ++level;
    $("h1").text("Level " + level);

    // Random number between 0 -3
    var randomNumber = Math.random() * 4;
    randomNumber = Math.floor(randomNumber);

    var randomChosenColor = buttonColors[randomNumber];

    gamePattern.push(randomChosenColor);

    var btn = $("#" + randomChosenColor);
    $(btn).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    // Sound file name to play
    var audioFile = "sounds/" + randomChosenColor + ".mp3";

    // Call playSound funct.
    playSound(audioFile);
}

// Function to play sound of correct color
function playSound(name) {
    var audio = new Audio(name);
    audio.play();
}

// Flash button pressed
function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");

    // Delay added
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);

}


function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        // User enters correct sequence
        console.log("success");
        if (userClickedPattern.length === gamePattern.length) {
            // call next sequence after delay
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        console.log("wrong");
        var audioFile = "sounds/wrong.mp3";
        playSound(audioFile);

        $("body").addClass("game-over");

        setTimeout(function () {
            $("body").removeClass("game-over");
            $("h1").text("Game Over, Press Any Key to Restart");
        }, 200);
        startOver();
    }
}

function startOver() {
    // User can restart from beginning
    level = 0;
    gamePattern = [];
    gameStarted = false;
}
