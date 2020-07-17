$(document).ready(function (){
    

    var characters = {
        "Walter White": {
            name: "Walter White",
            health: 200,
            attack: 6,
            imageUrl: "assets/images/Walter.jpg",
            enemyAttackBack: 12
        },
        "Jessie Pinkman": {
            name: "Walter White",
            health: 175,
            attack: 9,
            imageUrl: "assets/images/Jesse.jpg",
            enemyAttackBack: 8
        },
        "Mike Ehrmantraut": {
            name: "Mike Ehrmantraut",
            health: 300,
            attack: 5,
            imageUrl: "assets/images/Mike.jpg",
            enemyAttackBack: 15
        }

    };

    var attacker;
    var fighters = [];
    var defender;
    var turnCounter = 1;
    var killCount = 0;


    var renderCharacter = function (character, renderArea) {

        var charDiv = $("<div class='chracter' data-name='" + character.name + "'>");
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




    })