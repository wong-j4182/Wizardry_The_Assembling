var	game = {
	COMPUTER_DELAY: 2000,
	player: null,
	computer: null,
	playerTurn: true,
	paused: false 
};

$( function() {

	"use strict";
	
	// Initial event bindings and game initialization
	game.init = function() {

		$(document).on("keyup", game.check_menu); // Check key presses for ESC key
		$(document).on("click", ".fa-bars", game.show_menu); // Bind pause button
		$(document).on("click", "#reset", game.reset); // Bind reset button
		$(document).on("click", "#save", game.save); // Bind save button
		$(document).on("click", "#load", game.load); // Bind load button
		$(document).on('click', '#logout', game.logout); // Bind logout button
		$(document).on("click", ".playerbar button", game.end_turn); // Bind end turn button
		$(document).on("click", ".card", game.card_click); // Bind clicking on player cards

		// Initialize both players
		game.player = new Player(30);
		game.computer = new Player(30);

		// If there is a game to load, pull the data and update the player
		var load = false;
		if ($("body").attr("data-playerhealth")) {
			load = true;

			game.player.health = $("body").data("playerhealth");
			game.computer.health = $("body").data("computerhealth");
			game.player.mana = $("body").data("playermana");
			game.computer.mana = $("body").data("computermana");
			game.player.currentMana = $("body").data("currentmana");

			game.player.hand = game.process_array($("body").data("playerhand"));
			game.player.deck = game.process_array($("body").data("playerdeck"));
			game.computer.hand = game.process_array($("body").data("computerhand"));
			game.computer.deck = game.process_array($("body").data("computerdeck"));
		}

		// Start player's turn
		game.begin_turn(load);		  
	};

	// Function to process JSON cards back into proper card objects and return their array
	game.process_array = function(items) {
		var processed = [];

		items.forEach(function(item) {
			if (item.type === "Spell") {
				processed.push(new SpellCard(item.id, item.cost, item.damage));
			} else {
				processed.push(new HealCard(item.id, item.cost, item.amount));
			}
		});

		return processed;
	};

	// Game save function
	game.save = function() {
		if (game.playerTurn) {
			$('#form_playerHealth').val(game.player.health);
			$('#form_computerHealth').val(game.computer.health);
			$('#form_playerMana').val(game.player.mana);
			$('#form_computerMana').val(game.computer.mana);
			$('#form_currentMana').val(game.player.currentMana);
			$('#form_playerHand').val(JSON.stringify(game.player.hand));
			$('#form_playerDeck').val(JSON.stringify(game.player.deck));
			$('#form_computerHand').val(JSON.stringify(game.computer.hand));
			$('#form_computerDeck').val(JSON.stringify(game.computer.deck));

			$('#save_form').submit();
		}
	};

	// Game load function
	game.load = function() {
		// Reload page with load flag
		window.location.href = "game.php?load";
	}

	game.logout = function() {
    	// Reload page to process logout
		window.location.href = "index.php?logout";
    }

	// Game reset function
	game.reset = function() {
        // Reset game variables
        game.player = new Player(30);
		game.computer = new Player(30);
        game.paused = false;

        // Update display
        game.update_display();

        // Start player turn
        game.begin_turn(false);
	};

	// Check pressed key and process appropriately
	game.check_menu = function(e) {
        if (e.keyCode === 27 && !game.paused)
            game.show_menu();
    };

    // Load the colorbox menu
    game.show_menu = function() {
        if(game.playerTurn == true){
			game.paused = true;
			$.colorbox({
				href:"menu.php",
				onClosed: game.hide_menu,
				title:"Game is paused."
			});
		}	
	};

	// Handle anything tied to the closing of the lightbox as needed
	game.hide_menu = function() {
        game.paused = false;
	}

	// Handle any click on player cards
	game.card_click = function() {

		if (!$(this).hasClass("selected")) {
			// Card isn't selected, deselect any previously selected cards and select this one
			$(".card").removeClass("selected");
			$(this).addClass("selected");
			//$(this).css({'animation-name: example'})
			$(this).css({transform: 'perspective(500px) rotateY(360deg)', transition: 'transform 1s linear 0s'});
			
		} else {
			//$(this).addClass("animation");
			// Card is already selected, attempt to play it
			if (game.playerTurn) {
				var id = $(this).data("id");
				var card = game.player.playCard(id);
				
				if (card) {
					// Card was played, apply it to correct player and update
					if (card.type === "Spell") {
						game.computer.applyCard(card);
					} else if (card.type === "Heal") {
						game.player.applyCard(card);
					}

					// Update the displays
					game.update_display();

					// Show status update
					if (card.type === "Spell") {
						$.growl({ title: "Spell", message: "You attack for " + card.damage + " damage", location: "br" });
					} else if (card.type === "Heal") {
						$.growl({ title: "Heal", message: "You heal for " + card.amount + " health", location: "br" });
					}
					
					// Check for winner
					var status = game.check_win();

					if (status === "WIN") {
						$.colorbox({
							href:"images/win.jpg",
							onClosed: game.reset,
				            title:"FRAWRESS VICTORY!!"
						});
					}
				}
				else{
					$(this).css({transform: 'perspective(500px) rotateZ(360deg)', transition: 'transform 1s linear 0s'});
				}
			}
		}		
	};

	// Handle beginning of player's turn
	game.begin_turn = function(load) {
		// Growl it is the player's turn
		$.growl.notice({ title: "Your Turn", message: "It is your turn to play", location: "br" });

		// Make the button active
		$("button").removeClass("inactive").addClass("active");

		// If not a loaded save, handle normal begin turn stuff
		if (!load) {
			// Update mana
			game.player.updateMana();

			// Draw a card, if unsuccessful apply fatigue and if card 
			var handSize = game.player.handSize();
			var cardDrawn = game.player.drawCard();

			if (!cardDrawn) {
				// Fatigue
				$.growl.error({ title: "Bleeding Out", message: "Take 1 damage from card fatigue", location: "br" });
				player.takeDamage(1);

				// Check for winner
				var status = game.check_win();

				if (status === "LOSE") {
					$.colorbox({
						href:"images/lose.jpg",
						onClosed: game.reset,
			            title:"YOU RUSE!!"
					});
				}
			} else if (handSize === game.player.handSize()) {
				// Card was burned
				$.growl.error({ title: "Overload", message: "Your card was discarded", location: "br" });
			}
		}

		// Update display
		game.update_display();

		game.playerTurn = true;

	};

	// Handle click on end turn button
	game.end_turn = function() {
		// Ignore clicks when not your turn
		if ($("button").hasClass("active")) {

			// Make button inactive
			$("button").removeClass("active").addClass("inactive");

			// Call computer player's turn
			game.playerTurn = false;
			game.computer_turn();
		}
	};

	// Begin initial setup of computer player's turn
	game.computer_turn = function() {
		// Update mana
		game.computer.updateMana();

		// Draw a card, if unsuccessful apply fatigue and if card 
		var handSize = game.computer.handSize();
		var cardDrawn = game.computer.drawCard();

		if (!cardDrawn) {
			// Fatigue
			$.growl.error({ title: "Bleeding Out", message: "Computer takes 1 damage from card fatigue", location: "br" });
			computer.takeDamage(1);

			// Check for winner
			var status = game.check_win();

			if (status === "WIN") {
				$.colorbox({
					href:"images/win.jpg",
					onClosed: game.reset,
		            title:"FRAWRESS VICTORY!!"
				});
			}
		} else if (handSize === game.computer.handSize()) {
			// Card was burned
			$.growl.error({ title: "Overload", message: "Computer's card was discarded", location: "br" });
		}

		// Update display
		game.update_display();

		// Attempt to move
		setTimeout(game.computer_move, game.COMPUTER_DELAY);
	};

	// This function will attempt to make one move. If is can, it calls itself with a 2 second delay for "thinking". If not it lets the player go
	game.computer_move = function() {

		var currentMana = game.computer.currentMana;
		var hand = game.computer.hand;
		var card = false;

		// Attempt to heal if can fully use heal card
		for (i = 0; i < hand.length; i++) {
			if (hand[i].type === "Heal") {
				if (hand[i].cost <= currentMana && hand[i].amount + game.computer.health <= 30) {
					if (!card) {
						card = hand[i];
					} else if (card.cost < hand[i].cost) {
						card = hand[i];
					}
				}
			}
		}

		// Try to find biggest card possible to play with current mana
		if (!card) {
			for (i = 0; i < hand.length; i++) {
				if (hand[i].cost <= currentMana) {
					if (!card) {
						card = hand[i];
					} else if (card.cost < hand[i].cost) {
						card = hand[i];
					}
				}
			}
		}

		// If playable card, play it
		if (card) {
			// Attack and move
			game.computer.playCard(card.id);

			// Card was played, apply it to computer and update
			if (card.type === "Spell") {
				game.player.applyCard(card);	
			} else if (card.type === "Heal"){
				game.computer.applyCard(card);
			}

			// Update the displays
			game.update_display();

			// Show status update
			if (card.type === "Spell") {
				$.growl.error({ title: "Spell", message: "You are attacked for " + card.damage + " damage", location: "br" });	
			} else if (card.type === "Heal"){
				$.growl.error({ title: "Heal", message: "Computer is healed " + card.amount + " health", location: "br" });
			}			

			// Check for winner
			var status = game.check_win();

			if (status === "LOSE") {
				$.colorbox({
					href:"images/lose.jpg",
					onClosed: game.reset,
		            title:"YOU RUSE!!"
				});
			}

			// Attempt to move again if possible
			setTimeout(game.computer_move, game.COMPUTER_DELAY);

		} else {
			// Let player go
			game.begin_turn(false);	
		}
	};

	// Check to see if a player has won or if the game continues and return an appropriate value
	game.check_win = function() {
		if (game.computer.health <= 0) {
			return "WIN";
		} else if (game.player.health <= 0) {
			return "LOSE";
		} else {
			return false;
		}
	};

	// Update the mana for the computer or the player
	game.display_mana = function(who){
		// Update mana page elements
		
		var $manaList = $("." + who + "bar .mana");
		$manaList.empty();

		var currentMana = (who === "player") ? game.player.currentMana : game.computer.currentMana;
		
		for (i = 0; i < ((who === "player") ? game.player.mana : game.computer.mana); i++) {
			$manaList.append('<li><i class="fa fa-circle' + ((i >= currentMana) ? '-o' : '') + '" fa-lg"></i></li>');
		}
	};

	// Update the health for the computer or the player
	game.display_health = function(who) {
		var health = (who === "player") ? game.player.health : game.computer.health;
		$("." + who + "bar .health").text(health);
	};

	// Update the deck size for the computer or the player
	game.display_decksize = function(who) {
		var deckSize = (who === "player") ? game.player.deckSize() : game.computer.deckSize();

		$("." + who + "arena .count").text(deckSize);
	};

	// Update the hand for the computer or the player
	game.display_hand = function(who) {
		if (who === "computer") {
			var handSize = game.computer.handSize();
			$hand = $(".computerbar .hand");
			$hand.empty();

			for (i = 0; i < handSize; i++) {
				$hand.append('<li><img src="images/cardback.png" alt="Card Back" class="oppCard"/></li>');
			}
		} else {
			var $hand = $(".playerbar .hand");
			var hand = game.player.hand;
			$hand.empty();

			for (i = 0; i < hand.length; i++) {
				$hand.append(hand[i].template());
			}
		}
	};

	// Update all display components
	game.update_display = function(){
		// Update mana page elements
		
		game.display_mana("player");
		game.display_mana("computer");

		// Update health
		game.display_health("player");
		game.display_health("computer");

		// Update deck size
		game.display_decksize("player");
		game.display_decksize("computer");

		// Update hands
		game.display_hand("player");
		game.display_hand("computer");
	};

	game.init();
});