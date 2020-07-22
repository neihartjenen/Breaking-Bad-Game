$(document).ready(function (){
    
    var characters = {
        "Walter White": {
            name: "Walter White",
            health: 200,
            attack: 6,
            imageUrl: "assets/images/Walter.jpg",
            enemyAttack: 12
        },
        "Jessie Pinkman": {
            name: "Jessie Pinkman",
            health: 175,
            attack: 9,
            imageUrl: "assets/images/Jesse.jpg",
            enemyAttack: 8
        },
        "Mike Ehrmantraut": {
            name: "Mike Ehrmantraut",
            health: 300,
            attack: 5,
            imageUrl: "assets/images/Mike.jpg",
            enemyAttack: 15
        },
        "Skyler White": {
            name: "Skyler White",
            health: 350,
            attack: 2,
            imageUrl: "assets/images/Skyler.jpg",
            enemyAttack: 15
        }
    };

    // player selects attacker
    var attacker;
    // populates all charters not chosen as attacker
    var fighters = [];
    // populates when player chooses oppoenent
    var defender;
    var turnCounter = 1;
    var killCount = 0;


    var renderCharacter = function (character, renderArea) {
        var charDiv = $("<div class='chracter' data-name='" + character.name + "'>");
        var charName = $("<div class='character-name'>").text(character.name);
        var charHealth = $("<div class='character-health'>").text(character.health);
        var charImage = $("<img alt='image' class='character-image'>").attr("src", character.imageUrl);
        charDiv.append(charName).append(charImage).append(charHealth);
        $(renderArea).append(charDiv);
    };

    var initializeGame = function() {
        for (var key in characters) {
          renderCharacter(characters[key], "#characters-section");
        }
      };
     
     initializeGame();

    var updateCharacter = function(charObj, areaRender) {
        $(areaRender).empty();
        renderCharacter(charObj, areaRender);        
      };

    var renderEnemies = function(enemyArr) {
        for (var i = 0; i < enemyArr.length; i++) {
         renderCharacter(enemyArr[i], "#attack-section");
            }
        };
       
     //game message to make game more interactive
    var renderMessage = function(message) {
        var gameMessageSet = $("#game-message");
        var newMessage = $("<div>").text(message);
          gameMessageSet.append(newMessage);
        };
    var restartGame = function(resultMessage) {
        var restart = $("<button>Restart</button>").click(function() {
          location.reload();
          });

    var gameState = $("<div>").text(resultMessage);
   
     $("body").append(gameState);
     $("body").append(restart);
  };
  
  var clearMessage = function() {
    var gameMessage = $("#game-message");

    gameMessage.text("");
  };
   
       $("#characters-selection").on("click", ".character", function() {

        var name = $(this).attr("data-name")

        if (!attacker) {
            attacker = characters[name];
        for (var key in characters) {
            if (key !== name) {
                fighters.push(characters[key]);
            }
        }
       
        $("#characters-section").hide();
         updateCharacter(attacker, "#selected-character");
         renderEnemies(fighters);
      }
     });

        $("#attack-section").on("click", ".character", function() {
        var name = $(this).attr("data-name");
    
        if ($("#defender").children().length === 0) {
          defender = characters[name];
          updateCharacter(defender, "#defender");
    
        
        $(this).remove();
        clearMessage();
        }
      });    

      $("#attack-button").on("click", function() {
          if ($("#defender").children().length !== 0) {
            var attackMessage = "You hit " + defender.name + " for " + attacker.attack * turnCounter + " damage.";
            var counterAttackMessage = defender.name + " slapped you back for " + defender.enemyAttack + " damage.";
            clearMessage();
         
           defender.health -= attacker.attack * turnCounter;
    
         
           if (defender.health > 0) {
            updateCharacter(defender, "#defender");
            // combat messages
            renderMessage(attackMessage);
            renderMessage(counterAttackMessage);
            // reduces opponents health by attack
            attacker.health -= defender.enemyAttack;
          
            updateCharacter(attacker, "#selected-character");
    

            if (attacker.health <= 0) {
              clearMessage();
              restartGame("You Got Wrecked. Try Again?");
              $("#attack-button").off("click");
            }
          }
          else {
           
            $("#defender").empty();
            var gameStateMessage = "You have beaten " + defender.name + ", you can choose who to beat up next.";
              renderMessage(gameStateMessage);
              killCount++;
    
            
            if (killCount >= fighters.length) {
              clearMessage();
              $("#attack-button").off("click");
              restartGame("You Win. Fight Again?");
            }
        }
          turnCounter++;
        }
        else {
          // If there is no defender, render an error message
          clearMessage();
          renderMessage("No enemy here.");
        }  
    });
});