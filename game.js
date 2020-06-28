var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];
var started = false;
var level = 0;
var highestLevel = 0;
var guessed = false;
$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " +level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1)
  //console.log(userClickedPattern);
});
function checkAnswer(currentLevel){
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    console.log("success");
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
    if (level > highestLevel){
      highestLevel = level;
      $("#level-info").text("Highest Level: " + highestLevel);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    console.log("wrong");
    startOver();

  }
}

function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " +level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

}

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
function animatePress(currentColour){
  $("#"+currentColour).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColour).removeClass("pressed");
  }, 100);

}

$("#clickHere").click(function(){
  if ( $(".helpInfo").is(":hidden") ) {
    $(".helpInfo").slideDown("slow");
    $(".howto").removeClass("fa fa-angle-double-down fa-lg").addClass("fa fa-angle-double-up fa-lg");
} else {
  $(".helpInfo").slideUp("slow");
  $(".howto").removeClass("fa fa-angle-double-up fa-lg").addClass("fa fa-angle-double-down fa-lg");
}
});
