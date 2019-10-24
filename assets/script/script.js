

/*
=================================
   On Load
=================================
*/

$(function () {

  /*
=================================
  Classes
=================================
*/

  class InfoScreen {
    constructor() {
      this.infoScreen = $("#info-screen")
      this.infoCat = $("#info-cat")
      this.allText = $(".speach-bubble p")
      this.welcomeText = $("#info-welcome-text")
      this.goldText = $("#info-gold-text")
      this.levelText = $("#info-level-text")
      this.combatText = $("#info-combat-text")
      this.okButton = $(".info-ok")
    }

    hide() {
      this.infoScreen.hide();
    }

    showWelcome() {
      this.allText.hide()
      this.infoCat.removeClass()
      this.infoCat.addClass("info-cat-sad-image")
      this.welcomeText.show()
      this.infoScreen.show()
      return this.getOkPromise()
    }

    showGold() {
      this.allText.hide()
      this.infoCat.removeClass()
      this.infoCat.addClass("info-cat-sad-image")
      this.goldText.show()
      this.infoScreen.show()
      return this.getOkPromise()
    }

    showLevel() {
      this.allText.hide()
      this.infoCat.removeClass()
      this.infoCat.addClass("info-cat-sad-image")
      this.levelText.show()
      this.infoScreen.show()
      return this.getOkPromise()
    }

    showCombat() {
      this.allText.hide()
      this.infoCat.removeClass()
      this.infoCat.addClass("info-cat-combat-image")
      this.combatText.show()
      this.infoScreen.show()
      return this.getOkPromise()
    }

    getOkPromise() {
      var promise = new Promise((resolve, reject) => {
        this.okButton.off("click")
        this.okButton.on("click", () => {
          this.hide()
          resolve()
        })
      });
      return promise;
    }

  }

  const infoScreen = new InfoScreen();

  /*
  =================================
      Global Variables
  =================================
  */

  var roundCount;
  var player;
  var currentEnemy;


  /*
  =================================
     Hooking up pages & buttons
  =================================
  */

  const gameScreen = {
    welcome: $("#welcome-screen"),
    home: $("#home-screen"),
    shop: $("#shop-screen"),
    map: $("#map-screen"),
    combat: $("#combat-screen"),
    victory: $("#victory-screen"),
    stats: $("#stat-screen"),
    menu: $("#menu-screen"),
    popupBackground: $("#pop-up-background"),
  }

  const popups = {
    spentAttack: $("#gold-spent-text-attack"),
    spentDefence: $("#gold-spent-text-defence"),
    attackLevelUp: $("#attack-level-up-text"),
    defenceLevelUp: $("#defence-level-up-text"),

    goldDrop: $("#goldDrop"),
    potionDrop: $("#potionDrop"),
    died: $("#died"),
    winFight: $("#winFight"),
  }

  const gameButton = {
    startGame: $("#startGame"),
    menu: $(".menu-button"),
    newGame: $("#new-game"),
    closeMenu: $("#close-menu"),
    toShop: $("#home-to-shop"),
    levelUpAttack: $("#upgrade-attack"),
    levelUpDefence: $("#upgrade-defence"),
    homeToMap: $("#home-to-map"),
    shopToHome: $("#shop-to-home"),
    mapToHome: $("#map-to-home"),
    startCombat: $(".start-combat"),
    enemy1Button: $("#enemy-1-button"),
    enemy2Button: $("#enemy-2-button"),
    enemy3Button: $("#enemy-3-button"),
    enemy4Button: $("#enemy-4-button"),
    fleeFight: $(".flee-fight"),
    attackButton: $(".attack-button"),
    defendButton: $(".defend-button"),
  }

  const statField = {
    shopAttackCost: $("#upgrade-attack-cost"),
    shopDefenceCost: $("#upgrade-defence-cost"),

  }

  const figures = {
    heroineSword: $("#heroine-sword"),
    heroineShield: $("#heroine-shield"),
  }




  hideAllScreens();
  gameScreen.welcome.show();


  function hideAllScreens() {
    gameScreen.welcome.hide();
    gameScreen.home.hide();
    gameScreen.shop.hide();
    gameScreen.map.hide();
    gameScreen.combat.hide();
    gameScreen.victory.hide();
    gameScreen.stats.hide();
    gameScreen.menu.hide();
    gameScreen.popupBackground.hide();

    infoScreen.hide();

    popups.goldDrop.hide();
    popups.potionDrop.hide();
    popups.died.hide();
    popups.winFight.hide();
  }


  /*
  =================================
    Button Functions
  =================================
  */


  // ----- Nagivation buttons


  gameButton.startGame.click(function () {
    player = new Player();
    combatUI.updatePlayerStats(player);
    hideAllScreens();
    gameScreen.home.show();
    gameScreen.stats.show();
    infoScreen.showWelcome();
  })

  gameButton.menu.click(function () {
    gameScreen.menu.toggle();
  });

  gameButton.newGame.click(function () {
    hideAllScreens();
    gameScreen.welcome.show();
  })

  gameButton.closeMenu.click(function () {
    gameScreen.menu.hide();
  })

  gameButton.toShop.click(function () {
    hideAllScreens();
    gameScreen.shop.show();
    gameScreen.stats.show();
    shop.updateShopText();
  })

  gameButton.homeToMap.click(function () {
    hideAllScreens();
    gameScreen.map.show();
    gameScreen.stats.show();

  })

  gameButton.shopToHome.click(function () {
    hideAllScreens();
    gameScreen.home.show();
    gameScreen.stats.show();
  })

  gameButton.mapToHome.click(function () {
    hideAllScreens();
    gameScreen.home.show();
    gameScreen.stats.show();
  })

  gameButton.startCombat.click(function () {
    hideAllScreens();
    shop.updatePlayerImage(player);
    gameScreen.combat.show();
    gameScreen.stats.show();
    combatUI.showEnemyStatContainer();
    combatUI.firstCombatPopup()
      .then(function () {
        roundCount = 0;
        combatUI.roundCounterAnimation(roundCount);
      })
  })


  // ----- Shop Buttons

  gameButton.levelUpAttack.click(function () {
    shop.levelUpAttack(player);
  })

  gameButton.levelUpDefence.click(function () {
    shop.levelUpDefence(player);
  })


  class Shop {
    constructor() {
      this.attackLevelUpCost = 25;
      this.defenceLevelUpCost = 25;

      //Binding the value of 'this'
      this.updateShopText = this.updateShopText.bind(this);
    }

    levelUpAttack(player) {
      //Check player max level
      if (player.attack >= 90) {
        infoScreen.showLevel();
        return;
      }

      //check player gold
      if (player.gold < this.attackLevelUpCost) {
        infoScreen.showGold();
        return;
      }

      //If player can level up and can afford to level up
      player.attack += 5;
      player.gold -= this.attackLevelUpCost;
      combatUI.updatePlayerStats(player);
      popups.spentAttack.text("- " + this.attackLevelUpCost);
      shop.attackLevelUpCost += 5;
      //update signs
      //update the animation

      this.animateAttackSpend()
        .then(this.animateAttackUpgrade)
        .then(this.updateShopText);
    }

    levelUpDefence(player) {
      //Check player max level
      if (player.defence >= 90) {
        infoScreen.showLevel();
        return;
      }

      //check player gold
      if (player.gold < this.defenceLevelUpCost) {
        infoScreen.showGold();
        return;
      }

      //If player can level up and can afford to level up
      player.defence += 5;
      player.gold -= this.defenceLevelUpCost;
      combatUI.updatePlayerStats(player);
      popups.spentDefence.text("- " + this.defenceLevelUpCost);
      shop.defenceLevelUpCost += 5;
      //update signs
      //update the animation

      this.animateDefenceSpend()
        .then(this.animateDefenceUpgrade)
        .then(this.updateShopText);
    }

    updateShopText() {
      statField.shopAttackCost.text(this.attackLevelUpCost);
      statField.shopDefenceCost.text(this.defenceLevelUpCost);
    }


    updatePlayerImage(player) {
      if (player.attack > 29 && player.attack < 59) {
        figures.heroineSword.removeClass("sword-wood");
        figures.heroineSword.addClass("sword-basic");
      } else if (player.attack > 59 && player.attack < 90) {
        figures.heroineSword.removeClass("sword-basic");
        figures.heroineSword.addClass("sword-fancy");
      } else if (player.attack == 90) {
        figures.heroineSword.removeClass("sword-fancy");
        figures.heroineSword.addClass("sword-magic");
      }

      if (player.defence > 29 && player.defence < 59) {
        figures.heroineShield.removeClass("shield-wood");
        figures.heroineShield.addClass("shield-basic");
      } else if (player.defence > 59 && player.defence < 90) {
        figures.heroineShield.removeClass("shield-basic");
        figures.heroineShield.addClass("shield-fancy");
      } else if (player.defence == 90) {
        figures.heroineShield.removeClass("shield-fancy");
        figures.heroineShield.addClass("shield-magic");
      }
    }

    animateAttackSpend() {



      var promise = new Promise(function (resolve, reject) {
        popups.spentAttack
          .animate({
            'opacity': 1,
            'top': '45%',
          }, 700)
          .animate({
            'opacity': 0
          }, function () {

            // remove attributes
            popups.spentAttack.removeAttr('style');
            resolve()
          })
      })
      return promise;
    }

    animateAttackUpgrade() {
      var promise = new Promise(function (resolve, reject) {
        popups.attackLevelUp
          .animate({
            'opacity': 1,
            'top': '45%',
          }, 700)
          .animate({
            'opacity': 0
          }, function () {

            // remove attributes
            popups.attackLevelUp.removeAttr('style');
            resolve()
          })
      })
      return promise;
    }

    animateDefenceSpend() {
      var promise = new Promise(function (resolve, reject) {
        popups.spentDefence
          .animate({
            'opacity': 1,
            'top': '45%',
          }, 700)
          .animate({
            'opacity': 0
          }, function () {

            // remove attributes
            popups.spentDefence.removeAttr('style');
            resolve()
          })
      })
      return promise;
    }

    animateDefenceUpgrade() {
      var promise = new Promise(function (resolve, reject) {
        popups.defenceLevelUp
          .animate({
            'opacity': 1,
            'top': '45%',
          }, 700)
          .animate({
            'opacity': 0
          }, function () {

            // remove attributes
            popups.defenceLevelUp.removeAttr('style');
            resolve()
          })
      })
      return promise;
    }



  }

  var shop = new Shop();
  // ----- Enemy Generating Buttons

  gameButton.enemy1Button.click(function () {
    currentEnemy = new Enemy1();
    combatUI.updateEnemyStats(currentEnemy);
    combatUI.updateEnemyImage(currentEnemy);
  })

  gameButton.enemy2Button.click(function () {
    currentEnemy = new Enemy2();
    combatUI.updateEnemyStats(currentEnemy);
    combatUI.updateEnemyImage(currentEnemy);
  })

  gameButton.enemy3Button.click(function () {
    currentEnemy = new Enemy3();
    combatUI.updateEnemyStats(currentEnemy);
    combatUI.updateEnemyImage(currentEnemy);
  })

  gameButton.enemy4Button.click(function () {
    currentEnemy = new Enemy4();
    combatUI.updateEnemyStats(currentEnemy);
    combatUI.updateEnemyImage(currentEnemy);
  })


  //----- COMBAT



  // Combat buttons

  gameButton.attackButton.click(function () {
    resolveCombat(true)
  })

  gameButton.defendButton.click(function () {
    resolveCombat(false)
  })

  gameButton.fleeFight.click(function () {
    hideAllScreens();
    combatUI.hideEnemyStatContainer();
    gameScreen.map.show();
    gameScreen.stats.show();
  })

  // Combat function

  //Putting animations into a class separate from the core mechanics
  class CombatUI {
    constructor() {
      this.firstCombat = true

      //Player Stats
      this.playerHealthText = $(".playerHealth")
      this.playerMaxHealthText = $(".playerMaxHealth")
      this.playerAttack = $(".playerAttack")
      this.playerDefence = $(".playerdefence")
      this.playerGold = $(".playerGold")

      //Enemy Stats
      this.enemyStatContainer = $(".enemy-stats")
      this.enemyHealthText = $(".enemyHealth")
      this.enemyMaxHealthText = $(".enemyMaxHealth")
      this.enemyAttack = $(".enemyAttack")
      this.enemyDefence = $(".enemydefence")
      this.enemyGold = $(".enemyGold")

      //Figures
      this.enemyFigure = $("#enemy")
      this.enemyLargeFigure = $("#enemy4")

      //Actions & Damage animations
      this.actionTextContainer = $(".action-text-container")
      this.damageTakenContainer = $(".damage-taken-text-container")

      this.heroineActionText = $(".heroine-action")
      this.heroineDamageTaken = $(".heroine-damage-taken")

      this.enemyActionText = $(".enemy-action")
      this.enemyDamageTaken = $(".enemy-damage-taken")

      //Round Counter
      this.roundCountText = $("#round-counter")

      //Loot drop animations
      this.goldDropText = $("#gold-drop-text")
      this.potionDropText = $("#potion-drop-text")
    }

    firstCombatPopup() {
      if (!this.firstCombat) {
        //Skip pop-up after first combat
        return Promise.resolve();
      }
      this.firstCombat = false;
      return infoScreen.showCombat();
    }

    showEnemyStatContainer() {
      this.enemyStatContainer.css("opacity", 1)
    }

    hideEnemyStatContainer() {
      this.enemyStatContainer.css("opacity", 0)
    }

    updateEnemyStats(currentEnemy) {
      this.enemyHealthText.text(currentEnemy.health + " / " + currentEnemy.maxHealth);
      this.enemyAttack.text(currentEnemy.attack);
      this.enemyDefence.text(currentEnemy.defence);
      this.enemyGold.text(currentEnemy.gold);
    }

    updatePlayerStats(player) {
      this.playerHealthText.text(player.health + " / " + player.maxHealth);
      this.playerAttack.text(player.attack);
      this.playerDefence.text(player.defence);
      this.playerGold.text(player.gold);
    }


    updateEnemyImage(currentEnemy) {
      this.enemyFigure.removeClass()
      this.enemyLargeFigure.removeClass()

      if (currentEnemy.level == 1) {
        this.enemyFigure.addClass("figure level1")
      } else if (currentEnemy.level == 2) {
        this.enemyFigure.addClass("figure level2")
      } else if (currentEnemy.level == 3) {
        this.enemyFigure.addClass("figure level3")
      } else if (currentEnemy.level == 4) {
        this.enemyFigure.addClass("figure")
        this.enemyLargeFigure.addClass("figureL level4")
      }
    }

    // Toggling buttons on the combat screen
    combatButtonsVisible(desiredVisible) {
      if (desiredVisible) {
        gameButton.defendButton.removeAttr('disabled');
        gameButton.attackButton.removeAttr('disabled');
        gameButton.fleeFight.removeAttr('disabled');
      } else {
        gameButton.defendButton.attr('disabled', 'disabled');
        gameButton.attackButton.attr('disabled', 'disabled');
        gameButton.fleeFight.attr('disabled', 'disabled');
      }
    }

    //Function for setting and animating player & enemy actions
    animateActions(isPlayerAttacking, isEnemyAttacking) {

      // Setting action text
      if (isPlayerAttacking) {
        this.heroineActionText.text("Attack!")
      } else {
        this.heroineActionText.text("Defend!")
      }
      this.heroineActionText.toggleClass('defending', !isPlayerAttacking)

      if (isEnemyAttacking) {
        this.enemyActionText.text("Attack!")
      } else {
        this.enemyActionText.text("Defend!")
      }
      this.enemyActionText.toggleClass('defending', !isEnemyAttacking)

      // Animate action text
      return this.actionTextContainer
        .animate({
          'opacity': 1,
        }, 700)
        .delay(300)
        .animate({
          'opacity': 0
        }, () => {

          // remove attributes
          this.actionTextContainer.removeAttr('style');
        })
        .promise()
    }

    // Function for setting and animating player & enemy damage taken
    animateDamage(playerDamageTaken, enemyDamageTaken) {

      // Setting damage taken text
      this.heroineDamageTaken.text("- " + playerDamageTaken)
      this.enemyDamageTaken.text("- " + enemyDamageTaken)

      // Animate damage taken text
      return this.damageTakenContainer
        .animate({
          'opacity': 1,
          'top': '35%',
        }, 700)
        .animate({
          'opacity': 0
        }, () => {

          // remove attributes
          this.damageTakenContainer.removeAttr('style');
        })
        .promise()
    }

    // Gold drop function if player wins fight
    goldDropAnimation(gold) {

      //change the game screen
      gameScreen.stats.hide();
      gameScreen.popupBackground.show();
      popups.goldDrop.show();

      //Sets the gold number for the animation
      this.goldDropText.text("+ " + gold);


      var promise = new Promise((resolve, reject) => {

        //Remove any existing event handlers and then adds one
        popups.goldDrop.off("click")
        popups.goldDrop.on("click", () => {

          //Animates the gold
          this.goldDropText
            .animate({
              'opacity': 1,
              'top': '20%',
            }, 800)
            .animate({
              'opacity': 0
            }, 200, () => {

              //reset the animation
              this.goldDropText.removeAttr('style')
              popups.goldDrop.hide();
              gameScreen.popupBackground.hide();
              resolve()
            })
        })
      })
      return promise;
    }

    potionDropAnimation(healthPotionStrength) {
      //change the game screen
      gameScreen.popupBackground.show();
      popups.potionDrop.show();

      //Sets the health number for the animation
      this.potionDropText.text("+ " + healthPotionStrength);

      var promise = new Promise((resolve, reject) => {

        //Remove any existing event handlers and then adds one
        popups.potionDrop.off("click")
        popups.potionDrop.on("click", () => {

          //Animates the health
          this.potionDropText
            .animate({
              'opacity': 1,
              'top': '20%',
            }, 800)
            .animate({
              'opacity': 0
            }, 200, () => {

              //reset the animation
              this.potionDropText.removeAttr('style')
              popups.potionDrop.hide();
              gameScreen.popupBackground.hide();
              resolve()
            })
        })
      })
      return promise;
    }

    died() {
      gameScreen.stats.hide();
      gameScreen.popupBackground.show();
      popups.died.show();

      var promise = new Promise((resolve, reject) => {
        popups.died.off("click")
        popups.died.on("click", () => {
          hideAllScreens();
          gameScreen.welcome.show();
          resolve()
        })
      })
      return promise;
    }

    roundCounterAnimation(roundCount) {
      this.roundCountText.text("Round " + (roundCount + 1));

      this.roundCountText.animate({
        'opacity': 0.7,
        'fontSize': 40,
      }, 900).animate({
        'opacity': 0,
      }, 200, () => {
        this.roundCountText.removeAttr('style')

        //eneble buttons
        this.combatButtonsVisible(true);
      })
    };

    endCombat() {
      gameScreen.combat.hide();
      gameScreen.map.show();
      gameScreen.stats.show();
    }

  }


  var combatUI = new CombatUI();

  function resolveCombat(isPlayerAttacking) {
    //To inject: combatUI / currentEnemy / player / (roundCount)

    //disabling buttons
    combatUI.combatButtonsVisible(false);

    // Using EnemyBase function to define whether enemy is attacking
    var isEnemyAttacking = currentEnemy.isEnemyAttacking(roundCount);

    // Scoped Variables
    var playerDamageTaken = 0;
    var enemyDamageTaken = 0;


    // Resolving the combat effects
    if (isPlayerAttacking) {
      if (isEnemyAttacking) {
        enemyDamageTaken = player.attack
        playerDamageTaken = currentEnemy.attack
      } else {
        enemyDamageTaken = Math.max(player.attack - currentEnemy.defence, 0);
      }
    } else {
      if (isEnemyAttacking) {
        playerDamageTaken = Math.max(currentEnemy.attack - player.defence, 0);
      }
    }

    //Player & Enemy take damage
    currentEnemy.takeDamage(enemyDamageTaken);
    player.takeDamage(playerDamageTaken);

    // Animate action text for enemy and heroine
    combatUI.animateActions(isPlayerAttacking, isEnemyAttacking)

      //Animate damage taken text
      .then(function () {
        return combatUI.animateDamage(playerDamageTaken, enemyDamageTaken)
      })

      .then(function () {

        // Update enemy / player stats after the animation
        combatUI.updateEnemyStats(currentEnemy);
        combatUI.updatePlayerStats(player);

        //If you die
        if (player.isDead()) {
          combatUI.hideEnemyStatContainer();
          combatUI.died();

          //If your enemy dies
        } else if (currentEnemy.isDead()) {

          //Gold Drop
          player.gold += currentEnemy.gold;
          combatUI.goldDropAnimation(currentEnemy.gold)
            .then(function () {
              combatUI.updatePlayerStats(player);

              // If potion
              if (currentEnemy.healthPotionStrength > 0) {
                player.drinkPotion(currentEnemy.healthPotionStrength);
                return combatUI.potionDropAnimation(currentEnemy.healthPotionStrength)
              }
            })

            //re-setting screens
            .then(function () {
              combatUI.updatePlayerStats(player);
              combatUI.hideEnemyStatContainer();
              combatUI.endCombat();
            })

          //If both alive, continue combat
        } else {
          roundCount++;
          combatUI.roundCounterAnimation(roundCount);
        };
      })
  }
  // End Combat



  // Clicking on the "you died" popup
  popups.died.click(function () {
    gameScreen.welcome.show();
    gameScreen.combat.hide();
    gameScreen.popupBackground.hide();
    popups.died.hide();
  });



});