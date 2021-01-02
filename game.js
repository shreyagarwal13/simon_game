var gamePattern = [];
var btnColors = ["red","blue","green","yellow"];
var colorChosen;
var userPattern =[];
var level =0;

function nextColor(){
  var c = Math.floor(Math.random()*4);
  colorChosen = btnColors[c];
  gamePattern.push(colorChosen);
  userPattern=[];
  pressed(colorChosen);
  level++;
  $("#level-title").text("Level "+level);
  $("#start-button").fadeOut(100);
}

function pressed(cc){
  $("#"+cc).fadeIn(50).fadeOut(50).fadeIn(50);
  $("#"+cc).addClass("pressed");
  setTimeout(function(){
    $("#"+cc).removeClass("pressed");
  }, 20);

  var audio = new Audio('sounds/'+cc+'.mp3');
  audio.play();

  console.log(userPattern);
  console.log(gamePattern);
}

function check(cl){
  if(userPattern[cl]===gamePattern[cl]){
    console.log("SUCCESS");
    if(userPattern.length===gamePattern.length){
      setTimeout(function(){
        nextColor();
      }, 800);
    }
  }
  else{
    console.log("FAIL");
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");

    setTimeout(function(){
      $("body").removeClass("game-over");

      setTimeout(function(){
        $("body").addClass("game-over");

        setTimeout(function(){
          $("body").removeClass("game-over");
        }, 50);
      }, 50);
    },50);
    startOver();
  }
}

function startOver(){
  gamePattern=[];
  userPattern=[];
  $("#level-title").text("Game Over at Level "+level + "! Try again");
  level=0;
  $("#start-button").fadeIn(100);
}

$("#start-button").click(function(){
  $("#start-button").addClass("pressed");
  setTimeout(function(){
    $("#start-button").removeClass("pressed");
  }, 20);
  nextColor();

});

$(".game-btn").click(function(){
  userChosenColor= this.id;
  userPattern.push(userChosenColor);
  pressed(userChosenColor);
  check(userPattern.length-1);
});
