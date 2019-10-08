//Global objects and variables
var player = {
  health: 1000,
  attack: 5,
  defense: 5,
  gold: 100
}

 var roundCount = 0;
 var healthPotionStrength =0;

//On load function
$(function () {

  //Fetching screens & elements
  var gameScreen = {
    welcome: $("#welcome-screen"),
    home: $("#home-screen"),
    combat: $("#combat-screen"),
    victory: $("#victory-screen"),
    map: $("#map-screen"),
    shop: $("#shop-screen"),
    menu: $("#menu-screen"),
    popup: $("#pop-up-container"),
  }

  var popups = {
    winFight: $("#winFight"),
    died: $("#died"),
    potionDrop: $("#potionDrop"),
    goldDrop: $("#goldDrop"),
    menu: $("#menu-container"),
  }



  var statContainer = {
    player: $(".player-stats-container"),
    enemy: $(".enemy-stats-container"),
    roundCounter: $(".round-counter-container")
  }

  //Hiding / Showing
  gameScreen.welcome.show();
  gameScreen.home.hide();
  gameScreen.combat.hide();
  gameScreen.victory.hide();
  gameScreen.map.hide();
  gameScreen.shop.hide();
  gameScreen.menu.hide();
  gameScreen.popup.hide();

  statContainer.player.hide();
  statContainer.enemy.hide();
  statContainer.roundCounter.hide();

  popups.menu.hide();
  popups.winFight.hide();
  popups.died.hide();
  popups.potionDrop.hide();
  popups.goldDrop.hide();

  //Nagivation buttons

  $("#welcome-screen .toHomeButton").click(function () {
    $("#playerHealth").text(player.health);
    $("#playerAttack").text(player.attack);
    $("#playerDefense").text(player.defense);
    $("#playerGold").text(player.gold);
  })

  $(".toHomeButton").click(function () {
    $(this).parents(".game-screen").hide();
    gameScreen.home.show();
    statContainer.player.show();
  })

  $(".toShopButton").click(function () {
    $(this).parents(".game-screen").hide();
    gameScreen.shop.show();
  })

  $(".toMapButton").click(function () {
    $(this).parents(".game-screen").hide();
    gameScreen.map.show();
  })

  $(".toCombatButton").click(function () {
    $(this).parents(".game-screen").hide();
    gameScreen.combat.show();
    statContainer.enemy.show();
    statContainer.roundCounter.show();
    roundCount = 0;
    $("#round-counter-span").text(roundCount);

  })


  $("#menuButton").click(function() {
    console.log("menu button clicked")
   $("#menu-container").toggle();
  });

  // ----- SHOP

  $(".levelUpAttack").click(function () {
    if (player.gold > 9) {
      player.attack += 10;
      player.gold -= 10;
      $("#playerAttack").text(player.attack);
      $("#playerGold").text(player.gold);

    }
  })

  $(".levelUpDefence").click(function () {
    if (player.gold > 9) {
      player.defense += 10;
      player.gold -= 10;
      $("#playerDefense").text(player.defense);
      $("#playerGold").text(player.gold);

    }
  })


  //----- COMBAT



  //Enemy variables & objects
  class Enemy {
    constructor(health, attack, defense, gold) {
      this.health = health;
      this.attack = attack;
      this.defense = defense;
      this.gold = gold;
    }
  };

  var enemyPotionDrop;
  var enemyAttackState;


  //Enemy generation

  $(".enemy1Button").click(function () {
    enemyPotionDrop = 0;
    healthPotionStrength = 10;

    enemyPotionDrop = Math.floor((Math.random() * 2 + 0));
    enemyAttackState = [true, false, true];

    currentEnemy = new Enemy(
      Math.floor((Math.random() * (10 - 5) + 5)),
      Math.floor((Math.random() * (10 - 5) + 5)),
      Math.floor((Math.random() * (10 - 5) + 5)),
      Math.floor((Math.random() * (10 - 5) + 5))
    );

    $("#enemyHealth").text(currentEnemy.health);
    $("#enemyHealthMax").text(currentEnemy.health);
    $("#enemyAttack").text(currentEnemy.attack);
    $("#enemyDefense").text(currentEnemy.defense);
    $("#enemyGold").text(currentEnemy.gold);


  })

  $(".enemy2Button").click(function () {
    enemyPotionDrop = 0;
    healthPotionStrength = 20;

    enemyPotionDrop = Math.floor((Math.random() * 3 + 0));
    enemyAttackState = [true, false, true, false];

    currentEnemy = new Enemy(
      Math.floor((Math.random() * (20 - 10) + 10)),
      Math.floor((Math.random() * (20 - 10) + 10)),
      Math.floor((Math.random() * (20 - 10) + 10)),
      Math.floor((Math.random() * (20 - 10) + 10))
    );

    $("#enemyHealth").text(currentEnemy.health);
    $("#enemyHealthMax").text(currentEnemy.health);
    $("#enemyAttack").text(currentEnemy.attack);
    $("#enemyDefense").text(currentEnemy.defense);
    $("#enemyGold").text(currentEnemy.gold);
  })

  $(".enemy3Button").click(function () {
    enemyPotionDrop = 0;
    healthPotionStrength = 30;

    enemyPotionDrop = Math.floor((Math.random() * 4 + 0));
    enemyAttackState = [true, false, true, true, false];

    currentEnemy = new Enemy(
      Math.floor((Math.random() * (30 - 20) + 20)),
      Math.floor((Math.random() * (30 - 20) + 20)),
      Math.floor((Math.random() * (30 - 20) + 20)),
      Math.floor((Math.random() * (30 - 20) + 20))
    );

    $("#enemyHealth").text(currentEnemy.health);
    $("#enemyHealthMax").text(currentEnemy.health);
    $("#enemyAttack").text(currentEnemy.attack);
    $("#enemyDefense").text(currentEnemy.defense);
    $("#enemyGold").text(currentEnemy.gold);
  })

  $(".enemy4Button").click(function () {
    enemyPotionDrop = 0;

    enemyPotionDrop = Math.floor((Math.random() * 5 + 0));
    enemyAttackState = [true, false, true, true, true, false];

    currentEnemy = new Enemy(
      Math.floor((Math.random() * (50 - 40) + 40)),
      Math.floor((Math.random() * (50 - 40) + 40)),
      Math.floor((Math.random() * (50 - 40) + 40)),
      Math.floor((Math.random() * (50 - 40) + 40))
    );

    $("#enemyHealth").text(currentEnemy.health);
    $("#enemyHealthMax").text(currentEnemy.health);
    $("#enemyAttack").text(currentEnemy.attack);
    $("#enemyDefense").text(currentEnemy.defense);
    $("#enemyGold").text(currentEnemy.gold);
  })

  // Combat buttons

  $(".fleeButton").click(function () {
    alert("Are you sure?")
    statContainer.enemy.hide();
    statContainer.roundCounter.hide();
  })

  $(".attackButton").click(function () {
    resolveCombat(true)
  })

  $('.defenceButton').click(function () {
    resolveCombat(false)
  })

  // Combat function



  function resolveCombat(isPlayerAttacking) {

    var isEnemyAttacking = enemyAttackState[roundCount % enemyAttackState.length];
    roundCount++;
    $("#round-counter-span").text(roundCount);

    console.log(roundCount);
    console.log(isEnemyAttacking);


    if (isPlayerAttacking) {
      if (isEnemyAttacking) {

        currentEnemy.health -= player.attack
        $("#enemyHealth").text(currentEnemy.health);

        player.health -= currentEnemy.attack
        $("#playerHealth").text(player.health);

      } else {
        var damage = player.attack - currentEnemy.defense
        if (damage > 0) {
          currentEnemy.health -= damage
          $("#enemyHealth").text(currentEnemy.health);
        }
      }

    } else {
      if (isEnemyAttacking) {
        var damage = currentEnemy.attack - player.defense
        if (damage > 0) {
          player.health -= damage
          $("#playerHealth").text(player.health);
        }
      }
    }


    // End battle

    //If you die
    if (player.health < 1) {
      statContainer.roundCounter.hide();
      gameScreen.popup.show();
      popups.died.show();
      player.health = 0;
      $('#playerHealth').val(player.health);

    }

    //If you win
    if (currentEnemy.health < 1) {
      statContainer.roundCounter.hide();
      gameScreen.popup.show();
      popups.goldDrop.show();
      currentEnemy.health = 0;
      player.gold += currentEnemy.gold;
      $("#playerGold").text(player.gold);
      console.log("potion drop number = " + enemyPotionDrop)
      console.log("old health =  " + player.health);

    }

    //write combat outcome
    $('#enemyHealth').val(currentEnemy.health);
  }

  console.log($("#goldDrop"))

  $("#goldDrop").click(function () {
    if (enemyPotionDrop == 1) {
      popups.goldDrop.hide();
      popups.potionDrop.show();

      player.health += healthPotionStrength;
      console.log("potion");
      console.log(player.health);

    } else {
      popups.goldDrop.hide();
      statContainer.enemy.hide();
      gameScreen.popup.hide();
      popups.goldDrop.hide();
      gameScreen.combat.hide();
      gameScreen.map.show();
    }
  });

  $("#died").click(function () {
    gameScreen.welcome.show();
    gameScreen.combat.hide();
    statContainer.enemy.hide();
    statContainer.player.hide();
    gameScreen.popup.hide();
    popups.died.hide();
  });

  $("#potionDrop").click(function () {
    statContainer.enemy.hide();
    gameScreen.popup.hide();
    popups.potionDrop.hide();
    gameScreen.combat.hide();
    gameScreen.map.show();
  });



})



/*
function menuButton() {
 var menu = $("#menu-screen")
 if (menu === "shown") {
   menu.show();
 } else {
   menu.hide();
 }
}*/




