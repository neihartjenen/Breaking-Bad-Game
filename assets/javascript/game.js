
const fighterNames = [{
    "name": "Walter",
}, {
    "name": "Mike"
}, {
    "name": "Jesse",
}];
$(document).ready(function() {
showDialog("Welcome to Breaking Bad",
        "Today you will face some challenging opponents." +
        "Your objective is to fight each opponent until you are the victor or die trying " +
        "Let's Play", 
}
function showDialog(title) {
    let message = "<div id='dialog-message' title='" + title + "'><p>" + showDialog + "</p></div>"
    $("#gameboard").append(message);
    $("#dialog-message").dialog({
            text: btnText,
            click: function() {
                action();

     function (showAttackButton).clickfunction() {
        var attackButton = $("<button>").addClass("btn btn-attack");
         attackButton.html("Attack!!")   },  
        
         assignAttacker function(Attacker) {
            gameBattle.currentAttacker = attacker;
            $("#" + gameBattle.currentAttacker._id).removeClass("fighter").addClass("Attacker");  },

         assignDefender function(defender) {
            gameBattle.currentDefender = defender;
            $("#" + gameBattle.currentDefender._id).removeClass("fighter").addClass("defender");  },     
         