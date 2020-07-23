$(document).ready(function() {
 
  var characters = {
    "Walter White": {
      name: "Walter White",
      health: 180,
      attack: 7,
      imageUrl: "assets/images/walter.jpg",
      enemyAttackBack: 15
    },
    "Jessie Pinkman": {
      name: "Jessie Pinkman",
      health: 120,
      attack: 19,
      imageUrl: "assets/images/jesse.jpg",
      enemyAttackBack: 3
    },
    "Mike Ehrmantraut": {
      name: "Mike Ehrmantraut",
      health: 350,
      attack: 12,
      imageUrl: "assets/images/mike.jpg",
      enemyAttackBack: 20
    },
    "Skylar White": {
      name: "Skylar White",
      health: 250,
      attack: 4,
      imageUrl: "assets/images/skyler.jpg",
      enemyAttackBack: 10
    }
  };

  var attacker;
  var fighters = [];
  var defender;
  var turnCounter = 1;
  // number of kills
  var killCount = 0;

  // area where the character should render
  var renderCharacter = function(character, renderArea) {
    var charDiv = $("<div class='character' data-name='" + character.name + "'>");
    var charName = $("<div class='character-name'>").text(character.name);
    var charImage = $("<img alt='image' class='character-image'>").attr("src", character.imageUrl);
    var charHealth = $("<div class='character-health'>").text(character.health);
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

  $("#characters-section").on("click", ".character", function() {
    // Saving the chosen fighters name
    var name = $(this).attr("data-name");
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
    // Saves opponents name
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
  
      var attackMessage = "You punched " + defender.name + " for " + attacker.attack * turnCounter + " damage.";
      var counterAttackMessage = defender.name + " hit you back " + defender.enemyAttackBack + " damage.";
      clearMessage();

      defender.health -= attacker.attack * turnCounter;

      // If the enemy still has health
      if (defender.health > 0) {
        updateCharacter(defender, "#defender");

        // Combat Messages
        renderMessage(attackMessage);
        renderMessage(counterAttackMessage);

        attacker.health -= defender.enemyAttackBack;
        
        updateCharacter(attacker, "#selected-character");
      
        if (attacker.health <= 0) {
          clearMessage();
          restartGame("You Beat the Fight Club. Game Over.");
          $("#attack-button").off("click");
        }
      }
      else {
        $("#defender").empty();
        var gameStateMessage = "You have beaten " + defender.name + ", pick another opponent to brawl.";
        renderMessage(gameStateMessage);

        killCount++;

        if (killCount >= fighters.length) {
          clearMessage();
          $("#attack-button").off("click");
          restartGame("You Beat the Rest of the Fight Club. Game Over.");
        }
      }
      turnCounter++;
    }
    else {
      clearMessage();
      renderMessage("Nobody's home");
    }
  });
});
