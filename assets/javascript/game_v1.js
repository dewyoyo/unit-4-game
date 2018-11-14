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
$("#selectdefenderbtn").hide();


//=============char attribute ===========
//Each character in the game has 3 attributes: `Health Points`, `Attack Power` and `Counter Attack Power`.

var gameChar = [
    ["lukeskywalker",
        "assets/images/lukeskywalker.jfif",
        "100", //health-points
        "6", //attack-power
        "4"   //counter-attack-power
    ],
    ["palpatine",
        "assets/images/palpatine.jfif",
        "100",
        "8",
        "6"
    ],
    ["obiwankenobi",
        "assets/images/obiwankenobi.jfif",
        "100",
        "7",
        "5"
    ],
    ["darthvader",
        "assets/images/darthvader.jfif",
        "100",
        "9",
        "7"
    ],
];

//     console.log(Object.keys(gameImg).length);  for (var i = 0; i < Object.keys(gameImg).length; i++)
//     $("p").show();  $("p").toggle();  $("p").hide();

// create a for loop to create character.
for (var i = 0; i < gameChar.length; i++) {
    var imageChar = $("<img>");
    imageChar.addClass("char-image");
    // console.log(gameChar[i][1]);
    imageChar.attr("src", gameChar[i][1]);
    imageChar.attr("char-name", gameChar[i][0]);
    imageChar.attr("health-points", gameChar[i][2]);
    imageChar.attr("attack-power", gameChar[i][3]);
    imageChar.attr("counter-attack-power", gameChar[i][4]);
    $("#char-box").append(imageChar);
};

// select attack character and move the unselected character into Enmies
$(".char-image").on("click", function () {

    // if user select the character
    if (charIsSelected) {
        selectedDefender = ($(this).attr("char-name"));
        console.log("defender name: " + selectedDefender);
        if (defenderIsSelected) {
            console.log("both character and defender selected");
        }
        else {
            $("#enemies-box > img").each(function (index, element) {
                if ($(this).attr("char-name") != selectedDefender) {
                    console.log("not selected defender: " + $(this).attr("char-name"));
                    $(this).fadeTo("slow", 0.33);
                }
                else {
                    console.log("selected defender: " + $(this).attr("char-name"));
                    $(this).fadeTo("slow", 1);
                }
            });
        }
    }
    else {
        selectedCharName = ($(this).attr("char-name"));
        console.log("char name: " + selectedCharName);

        $("img").each(function (index, element) {
            if ($(this).attr("char-name") != selectedCharName) {
                console.log("defender list: " + $(this).attr("char-name"));
                $("#enemies-box").append($(this));
            }
            else {
                console.log("char name222222: " + $(this).attr("char-name"));
                $("#char-box").append($(this));
            }
        });
    }


});

$("#selectcharbtn").on("click", function () {
    charIsSelected = true;
    // create the button for select defender
    var btnDefender = $("#selectdefenderbtn");
    $("#selectdefenderbtn").show();
    btnDefender.text("select");
    // $("#enemies-box").prepend(btnDefender);
});
$("#selectdefenderbtn").on("click", function () {
    console.log("selectdefenderbtn is clicked");
    defenderIsSelected = true;
});

// =====================start the attack
$("#attackBtn").on("click", function () {

    // var charName = $("#char-box > img").attr("char-name");
    // console.log("attack char: " + charName);
    console.log("attack : selectedCharName : " + selectedCharName);
    console.log("attack : selectedDefender : " + selectedDefender);
    if (attackStarted) {
        selectedAttackPower += selectedAttackPower;
        // selectedHealthPoints -= selectedHealthPoints;
        console.log("22222 selectedAttackPower: " + selectedAttackPower);
        console.log("22222 selectedHealthPoints: " + selectedHealthPoints);
        // DefenderCounterAttackPower += DefenderCounterAttackPower;
        DefenderHealthPoints = DefenderHealthPoints - selectedAttackPower;
        console.log("22222 DefenderCounterAttackPower: " + DefenderCounterAttackPower);
        console.log("22222 DefenderHealthPoints: " + DefenderHealthPoints);

    }
    else {

        $("img").each(function (index, element) {
            if ($(this).attr("char-name") === selectedCharName) {
                selectedAttackPower = parseInt(($(this).attr("attack-power")));
                selectedHealthPoints = parseInt(($(this).attr("health-points")));
                console.log("11111selectedAttackPower: " + selectedAttackPower);
                console.log("11111selectedHealthPoints: " + selectedHealthPoints);
            }
            else if ($(this).attr("char-name") === selectedDefender) {
                DefenderCounterAttackPower = parseInt(($(this).attr("counter-attack-power")));
                DefenderHealthPoints = parseInt(($(this).attr("health-points")));
                console.log("11111DefenderCounterAttackPower: " + DefenderCounterAttackPower);
                console.log("11111DefenderHealthPoints: " + DefenderHealthPoints);
            }
        });
        attackStarted = true;
        alert("ready to attack.");
    }


        // All of the same game win-lose logic applies. So the rest remains unchanged.
        if ( (DefenderHealthPoints < selectedHealthPoints) && (selectedHealthPoints>=0) && (DefenderHealthPoints<=0) ) {
            alert("You win!");
        }
        else if ( (DefenderHealthPoints >= selectedHealthPoints) && (selectedHealthPoints<=0) && (DefenderHealthPoints>=0) ){
            alert("You lose!!");
        }
});
