// Variables
var charIsSelected = false;
var defenderIsSelected = false;
var attackStarted = false;
var selectedCharName = "";
var selectedDefender = "";
var selectedAttackPower = 0;
var selectedHealthPoints = 0;
var DefenderCounterAttackPower = 0;
var DefenderHealthPoints = 0;
$("#reset-btn").hide();


//=============char attribute ===========
//Each character in the game has 3 attributes: `Health Points`, `Attack Power` and `Counter Attack Power`.

var gameChar = [
    ["Luke Skywalker",
        "assets/images/lukeskywalker.jfif",
        "100", //health-points
        "6", //attack-power
        "4"   //counter-attack-power
    ],
    ["Palpatine",
        "assets/images/palpatine.jfif",
        "100",
        "8",
        "6"
    ],
    ["Obiwan Kenobi",
        "assets/images/obiwankenobi.jfif",
        "100",
        "7",
        "5"
    ],
    ["Darth Vader",
        "assets/images/darthvader.jfif",
        "100",
        "9",
        "7"
    ],
];

function fReload() {
    location.reload();
}

function continueGame() {
    attackStarted = false;
    selectedDefender = "";
    selectedAttackPower = 0;
    selectedHealthPoints = 0;
    DefenderCounterAttackPower = 0;
    DefenderHealthPoints = 0;

    $("#attack-msg").text("");
    $("#attack-msg").hide();
    $("#reset-btn").hide();
}

//     console.log(Object.keys(gameImg).length);  for (var i = 0; i < Object.keys(gameImg).length; i++)
//     $("p").show();  $("p").toggle();  $("p").hide();

// create a for loop to create character.
for (var i = 0; i < gameChar.length; i++) {
    var imageChar = $("<img>");
    imageChar.addClass("char-image");
    // console.log(gameChar[i][1]);
    imageChar.attr("src", gameChar[i][1]);
    imageChar.attr("title", gameChar[i][0]);
    imageChar.attr("char-name", gameChar[i][0]);
    imageChar.attr("health-points", gameChar[i][2]);
    imageChar.attr("attack-power", gameChar[i][3]);
    imageChar.attr("counter-attack-power", gameChar[i][4]);
    $("#char-box").append(imageChar);
};

// select attack character and move the unselected character into Enmies
$(".char-image").on("click", function () {

    // if user selected the character then select the defender
    if (charIsSelected) {

        if (defenderIsSelected) {
            console.log("both character and defender selected");
        }
        else {
            continueGame();
            selectedDefender = ($(this).attr("char-name"));
            console.log("selected defender: " + selectedDefender);

            $("#enemies-box > img").each(function (index, element) {
                if ($(this).attr("char-name") == selectedDefender) {
                    console.log("selected defender goes to defender box: " + $(this).attr("char-name"));
                    $("#defender-box").append($(this));
                }
            });
            defenderIsSelected = true;
        }
    }
    // first click : select the main character
    else {
        selectedCharName = ($(this).attr("char-name"));
        console.log("char name: " + selectedCharName);

        $("img").each(function (index, element) {
            if ($(this).attr("char-name") != selectedCharName) {
                console.log("defender list: " + $(this).attr("char-name"));
                $("#enemies-box").append($(this));
            }
        });
        charIsSelected = true;
    }

});


// =====================start the attack
$("#attack-btn").on("click", function () {

    console.log("number of images in enemies-box : " + $("#enemies-box > img").length);
    if ($("#defender-box > img").length == 0) {
        $("#attack-msg").text("No enemy here. Select the enemy from 'Enemies Available To Attack'");
    }
    else {
        // $("#char-box  > img")  selectedCharName
        // $("#defender-box > img")  selectedDefender
        // var charName = $("#char-box > img").attr("char-name");
        // console.log("attack char: " + charName);
        if (attackStarted == false) {
            console.log("attack : selectedCharName : " + selectedCharName);
            console.log("attack : selectedDefender : " + selectedDefender);
            selectedAttackPower = parseInt(($("#char-box  > img").attr("attack-power")));
            selectedHealthPoints = parseInt(($("#char-box  > img").attr("health-points")));
            console.log("selectedAttackPower: " + selectedAttackPower);
            console.log("selectedHealthPoints: " + selectedHealthPoints);
            DefenderCounterAttackPower = parseInt(($("#defender-box > img").attr("counter-attack-power")));
            DefenderHealthPoints = parseInt(($("#defender-box > img").attr("health-points")));
            console.log("DefenderCounterAttackPower: " + DefenderCounterAttackPower);
            console.log("DefenderHealthPoints: " + DefenderHealthPoints);
            $("#attack-msg").show();
            $("#attack-msg").text("You attacked " + selectedDefender + " for " + selectedAttackPower + " damage. " + selectedDefender + " attacked you back for " + DefenderCounterAttackPower + " damage.");
            // DefenderHealthPoints = DefenderHealthPoints - selectedAttackPower;
            // selectedHealthPoints = selectedHealthPoints - DefenderCounterAttackPower;
            // console.log("first attack DefenderHealthPoints: " + DefenderHealthPoints);
            // console.log("first attack selectedHealthPoints: " + selectedHealthPoints);
            attackStarted = true;
        }
        else {
            selectedAttackPower += selectedAttackPower;
            DefenderCounterAttackPower += DefenderCounterAttackPower;
            console.log("22222 selectedAttackPower: " + selectedAttackPower);
            console.log("22222 DefenderCounterAttackPower: " + DefenderCounterAttackPower);
            DefenderHealthPoints = DefenderHealthPoints - selectedAttackPower;
            selectedHealthPoints = selectedHealthPoints - DefenderCounterAttackPower;
            console.log("22222 DefenderHealthPoints: " + DefenderHealthPoints);
            console.log("22222 selectedHealthPoints: " + selectedHealthPoints);
            $("#attack-msg").text("You attacked " + selectedDefender + " for " + selectedAttackPower + " damage. " + selectedDefender + " attacked you back for " + DefenderCounterAttackPower + " damage.");
        }

        // All of the same game win-lose logic applies. So the rest remains unchanged.
        // Tie == win
        if (((selectedHealthPoints >= 0) && (DefenderHealthPoints < 0)) ||
            ((selectedHealthPoints <= 0) && (DefenderHealthPoints <= 0)) && (selectedHealthPoints >= DefenderHealthPoints)) {
            $("#attack-msg").text("You have defeated " + selectedDefender + ". You can choose to fight another enemy.");
            $("#defender-box > img").remove();
            defenderIsSelected = false;
            if ($("#enemies-box > img").length == 0) {
                $("#attack-msg").text("You Won!!!! GAME OVER!!!");
                $("#reset-btn").show();
                $("#reset-btn").text("restart");
            }
        }
        else if (((selectedHealthPoints < 0) && (DefenderHealthPoints >= 0)) ||
            ((selectedHealthPoints < 0) && (DefenderHealthPoints <= 0)) && (selectedHealthPoints < DefenderHealthPoints)) {
            $("#attack-msg").text("You been defeated. GAME OVER");
            $("#reset-btn").show();
            $("#reset-btn").text("restart");
        }
    }
});

$("#reset-btn").on("click", function () {
    fReload();
});