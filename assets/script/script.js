//On load function
$(function () {


  /*
  =================================
      Global Variables
  =================================
  */

  const playerMaxHealth = 100;
  var roundCount;
  var player;


  /*
 =================================
     Classes
 =================================
 */

  class Enemy1 {
    constructor() {
      this.health = Math.floor((Math.random() * (40 - 30) + 30));
      this.attack = Math.floor((Math.random() * (15 - 10) + 10));
      this.defense = Math.floor((Math.random() * (15 - 10) + 10));
      this.gold = Math.floor((Math.random() * (10 - 5) + 5));
      this.attackPattern = [true, false, true];

      var potionDrop = Math.floor((Math.random() * 2 + 0));
      if (potionDrop == 0) {
        this.healthPotionStrength = 10;
      } else {
        this.healthPotionStrength = 0;
      }
    }

    takeDamage(damageTaken) {
      this.health = Math.max(this.health - damageTaken, 0);
    }

    isEnemyAttacking(roundCount) {
      return this.attackPattern[roundCount % this.attackPattern.length];
    }

  };

  class Enemy2 {
    constructor() {
      this.health = Math.floor((Math.random() * (50 - 45) + 45));
      this.attack = Math.floor((Math.random() * (30 - 25) + 25));
      this.defense = Math.floor((Math.random() * (40 - 35) + 35));
      this.gold = Math.floor((Math.random() * (30 - 25) + 25));
      this.attackPattern = [true, false, true, false];

      var potionDrop = Math.floor((Math.random() * 3 + 0));
      if (potionDrop == 0) {
        this.healthPotionStrength = 20;
      } else {
        this.healthPotionStrength = 0;
      }
    }

    takeDamage(damageTaken) {
      this.health = Math.max(this.health - damageTaken, 0);
    }

    isEnemyAttacking(roundCount) {
      return this.attackPattern[roundCount % this.attackPattern.length];
    }
  }

  class Enemy3 {
    constructor() {
      this.health = Math.floor((Math.random() * (60 - 55) + 55));
      this.attack = Math.floor((Math.random() * (55 - 50) + 50));
      this.defense = Math.floor((Math.random() * (45 - 40) + 40));
      this.gold = Math.floor((Math.random() * (50 - 45) + 45));
      this.attackPattern = [true, false, true, true, false];

      var potionDrop = Math.floor((Math.random() * 4 + 0));
      if (potionDrop == 0) {
        this.healthPotionStrength = 30;
      } else {
        this.healthPotionStrength = 0;
      }

    }
    takeDamage(damageTaken) {
      this.health = Math.max(this.health - damageTaken, 0);
    }

    isEnemyAttacking(roundCount) {
      return this.attackPattern[roundCount % this.attackPattern.length];
    }
  }

  class Enemy4 {
    constructor() {
      this.health = 100;
      this.attack = 80;
      this.defense = 80;
      this.gold = 0;
      this.attackPattern = [true, false, true, true, true, false];
      this.healthPotionStrength = 0;
    }

    takeDamage(damageTaken) {
      this.health = Math.max(this.health - damageTaken, 0);
    }

    isEnemyAttacking(roundCount) {
      return this.attackPattern[roundCount % this.attackPattern.length];
    }
  }



  function initializePlayer() {
    player = {
      health: playerMaxHealth,
      maxHealth: playerMaxHealth,
      attack: 10,
      defense: 10,
      gold: 0,
    }
  }

  initializePlayer();

  //Fetching screens & elements
  const gameScreen = {
    welcome: $("#welcome-screen"),
    home: $("#home-screen"),
    combat: $("#combat-screen"),
    victory: $("#victory-screen"),
    map: $("#map-screen"),
    shop: $("#shop-screen"),
    menu: $("#menu-screen"),
    popup: $("#pop-up-container"),
  }

  const popups = {
    winFight: $("#winFight"),
    died: $("#died"),
    potionDrop: $("#potionDrop"),
    goldDrop: $("#goldDrop"),
    menu: $("#menu-container"),
  }

  const statContainer = {
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
    $("#playerMaxHealth").text(player.maxHealth);
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
    $("#round-counter-span").text(roundCount + 1);

    roundCounterAnimation($(".pop-text"));

  })


  $(".menuButton").click(function () {
    console.log("menu button clicked")
    $("#menu-container").toggle();
  });

  // ----- SHOP

  $(".levelUpAttack").click(function () {
    if (player.gold > 25) {
      if (player.attack < 90) {
        player.attack += 5;
        player.gold -= 10;
        $("#playerAttack").text(player.attack);
        $("#playerGold").text(player.gold);
      } else {
        alert("You have reached manimum attack level")
      }
    } else {
      alert("You do not have enough gold to level up")
    }
  })

  $(".levelUpDefence").click(function () {
    if (player.gold > 25) {
      if (player.defense < 75) {
        player.defense += 5;
        player.gold -= 10;
        $("#playerDefense").text(player.defense);
        $("#playerGold").text(player.gold);
      } else {
        alert("You have reached maximum defense level")
      }
    } else {
      alert("You do not have enough gold to level up")
    }


  })


  //----- COMBAT



  //Enemy variables & objects





  //Enemy generation

  $(".enemy1Button").click(function () {
    currentEnemy = new Enemy1();
    updateEnemyStats(currentEnemy);
  })

  $(".enemy2Button").click(function () {
    currentEnemy = new Enemy2();
    updateEnemyStats(currentEnemy);
  })

  $(".enemy3Button").click(function () {
    currentEnemy = new Enemy3();
    updateEnemyStats(currentEnemy);
  })

  $(".enemy4Button").click(function () {
    currentEnemy = new Enemy4();
    updateEnemyStats(currentEnemy);
  })

  function updateEnemyStats(enemy) {
    $("#enemyHealth").text(enemy.health);
    $("#enemyHealthMax").text(enemy.health);
    $("#enemyAttack").text(enemy.attack);
    $("#enemyDefense").text(enemy.defense);
    $("#enemyGold").text(enemy.gold);
  }





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
    //disabling buttons
    $('.defenceButton').attr('disabled', 'disabled');
    $('.attackButton').attr('disabled', 'disabled');
    $('.fleeButton').attr('disabled', 'disabled');

    console.log(currentEnemy.potionDrop)

    // Picking enemy action from pre-set pattern
    const isEnemyAttacking = currentEnemy.isEnemyAttacking(roundCount);

    var playerDamageTaken = 0;
    var enemyDamageTaken = 0;


    // Resolving the combat effects
    if (isPlayerAttacking) {
      if (isEnemyAttacking) {
        enemyDamageTaken = player.attack
        playerDamageTaken = currentEnemy.attack
      } else {
        enemyDamageTaken = Math.max(player.attack - currentEnemy.defense, 0);
      }
    } else {
      if (isEnemyAttacking) {
        playerDamageTaken = Math.max(currentEnemy.attack - player.defense, 0);
      }
    }


    currentEnemy.takeDamage(enemyDamageTaken);
    player.health = Math.max(player.health - playerDamageTaken, 0);



    // Setting action text for enemy and heroine
    if (isPlayerAttacking) {
      $(".heroine-action").text("Attack!")
    } else {
      $(".heroine-action").text("Defend!")
    }
    if (isEnemyAttacking) {
      $(".enemy-action").text("Attack!")
    } else {
      $(".enemy-action").text("Defend!")
    }
    $(".heroine-damage-taken").text("- " + playerDamageTaken)
    $(".enemy-damage-taken").text("- " + enemyDamageTaken)



    // Animate action text for enemy and heroine
    $(".action-text-container")
      .animate({
        'opacity': 1,
      }, 700)
      .delay(300)
      .animate({
        'opacity': 0
      }, function () {
        $("#enemyHealth").text(currentEnemy.health);
        $("#playerHealth").text(player.health);
        $(".action-text-container").removeAttr('style');

        $(".damage-taken-text-container")
          .animate({
            'opacity': 1,
            'top': '20%',
          }, 700)
          .animate({
            'opacity': 0
          }, function () {
            $(".damage-taken-text-container").removeAttr('style')

            //If you die
            if (player.health < 1) {
              statContainer.roundCounter.hide();
              gameScreen.popup.show();
              popups.died.show();
              player.health = 0;
              $('#playerHealth').val(player.health);

            } else if (currentEnemy.health < 1) {
              statContainer.roundCounter.hide();
              gameScreen.popup.show();
              popups.goldDrop.show();
              currentEnemy.health = 0;
              player.gold += currentEnemy.gold;
              $("#playerGold").text(player.gold);
              $(".gold-drop-text").text("+ " + currentEnemy.gold);
              $(".gold-drop-text")
                .animate({
                  'opacity': 1,
                  'top': '30%',
                }, 800)
                .animate({
                  'opacity': 0
                }, 200, function () {
                  $(".gold-drop-text").removeAttr('style')
                })
            } else {
              // Incrementing and updating round counter
              roundCount++;
              $("#round-counter-span").text(roundCount + 1);
              roundCounterAnimation($(".pop-text"));

            };
          })


        //Combat end


      })

    // End battle
    console.log($("#goldDrop"))
  }

  $("#goldDrop").click(function () {
    if (currentEnemy.healthPotionStrength > 0) {
      popups.goldDrop.hide();
      popups.potionDrop.show();

      player.health = Math.min(player.health + currentEnemy.healthPotionStrength, playerMaxHealth);

      $("#playerHealth").text(player.health)
      $("#playerGold").text(player.gold);
      $(".potion-drop-text").text("+ " + currentEnemy.healthPotionStrength);
      $(".potion-drop-text")
        .animate({
          'opacity': 1,
          'top': '30%',
        }, 800)
        .animate({
          'opacity': 0
        }, 200, function () {
          $(".potion-drop-text").removeAttr('style')
        })

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
    initializePlayer();
  });

  $("#potionDrop").click(function () {
    statContainer.enemy.hide();
    gameScreen.popup.hide();
    popups.potionDrop.hide();
    gameScreen.combat.hide();
    gameScreen.map.show();
  });

  function roundCounterAnimation(targetElement) {
    targetElement.animate({
      'opacity': 0.7,
      'fontSize': 40,
    }, 900).animate({
      'opacity': 0,
    }, 200, function () {
      targetElement.removeAttr('style')

      //eneble buttons
      $('.defenceButton').removeAttr('disabled');
      $('.attackButton').removeAttr('disabled');
      $('.fleeButton').removeAttr('disabled');
    })
  };

  // TEXT POPS








});