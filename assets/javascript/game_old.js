// Variables
var numOfChar = 4;

//=============char attribute ===========
//Each character in the game has 3 attributes: `Health Points`, `Attack Power` and `Counter Attack Power`.
//  var gameChar = {
//    charName: "chewbacca",
//    healthPoints: 0,
//    attackPower: 0,
//    counterAttackPower: 0
//  };

var gameImg = [
    "assets/images/lukeskywalker.jfif",
    "assets/images/palpatine.jfif",
    "assets/images/obiwankenobi.jfif",
    "assets/images/darthvader.jfif"
];
var gameCharName = [
    "lukeskywalker",
    "palpatine",
    "obiwankenobi",
    "darthvader"
];
var gameCharHealthPoints = [
    "40",
    "60",
    "50",
    "80"
];
var gameCharAttackPower = [
    "40",
    "60",
    "50",
    "80"
];
var gameCharCounterAttackPower = [
    "40",
    "60",
    "50",
    "80"
];
// 
//     console.log(gameImg.chewbacca);
//     console.log(Object.keys(gameImg).length);  for (var i = 0; i < Object.keys(gameImg).length; i++)
//     $("p").show();  $("p").toggle();  $("p").hide();

// ===========create a for loop to create character.
for (var i = 0; i < gameImg.length; i++) {
    var imageChar = $("<img>");
    imageChar.addClass("char-image" + " game-id" + i);
    console.log(gameImg[i]);
    imageChar.attr("src", gameImg[i]);
    imageChar.attr("char-name", gameCharName[i]);
    imageChar.attr("health-points", gameCharHealthPoints[i]);
    imageChar.attr("attack-power", gameCharAttackPower[i]);
    imageChar.attr("couter-attack-power", gameCharCounterAttackPower[i]);
    $("#char-box").append(imageChar);
};

//console.log("imagechar arrt : " + imageChar.attr("id"));
//$('div')[0].className
for (var i = 0; i < gameImg.length; i++) {
    console.log("img child: " + $('img')[i].className);
};

$(".char-image").on("click", function () {
    var selectedCharName = ($(this).attr("char-name"));
    console.log("char name: " + selectedCharName);
    imageChar
    // move the game unsleected character into Enmies
        $("#enemies-box").append(imageChar);

});

//  $(".char-image").on("click", function () {
//    var charName = ($(this).attr("char-name"));
//    var healthPoints = ($(this).attr("health-points"));
//    var attackPower = ($(this).attr("attack-power"));
//    var counterAttackPower = ($(this).attr("couter-attack-power"));
//    healthPoints = parseInt(healthPoints);
//    // We then add the crystalValue to the user's "counter" which is a global variable.
//    // Every click, from every crystal adds to the global counter.
//    counter += healthPoints;

//    // All of the same game win-lose logic applies. So the rest remains unchanged.
//    alert("New score: " + counter);

//    if (counter === targetNumber) {
//      alert("You win!");
//    }

//    else if (counter >= targetNumber) {
//      alert("You lose!!");
//    }

//  });
