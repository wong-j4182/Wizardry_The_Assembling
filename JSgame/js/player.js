
function Player(health) {
    this.health = health;
    this.mana = 0;
    this.currentMana = 0;
    this.hand = [];
    this.deck = [];

    // Initial player setup and deck setup
    this.init = function() {
        // Set up initial decks and such
        var spells = [0,0,1,1,2,2,2,3,3,3,3,4,4,4,5,5,6,6,7,8];
        var heals = [1,2,4,5,8];

        for (i = 0; i < spells.length; i++) {
            this.deck.push(new SpellCard(i+1, spells[i], spells[i])); // Spell cards currently cost the same as the damage they deal
        }

        for (i = 0; i < heals.length; i++) {
            this.deck.push(new HealCard(i+21, heals[i], heals[i])); // Heal cards currently cost the same as the health they heal
        }

        // Shuffle the deck
        this.shuffle();

        // Deal three cards from deck into hand
        this.hand = this.deck.splice(0, 3);
    };

    // Update mana
    this.updateMana = function() {
        this.mana = (this.mana > 10) ? 10 : (this.mana + 1);
        this.currentMana = this.mana;
    };

    // Take damage
    this.takeDamage = function(dmg) {
        this.health -= dmg;

        if (this.health > 30) {
            this.health = 30; // Cannot heal above full
        }
    }

    // Draw a card, return true if successful and false if no cards to draw
    this.drawCard = function() {
        if (this.deck.length === 0) {
            return false; // Deck empty, cannot draw
        } else {
            var card = this.deck.shift(); // Remove card

            if (this.hand.length < 5) {
                this.hand.push(card); // Add card if less than 5 cards in hand
            }

            return true; // Card successfully drawn
        }
    };

    // Get player deck size
    this.deckSize = function() {
        return this.deck.length;
    }

    // Get player hand size
    this.handSize = function() {
        return this.hand.length;
    }

    // Play a card, return card if successful and false if not
    this.playCard = function(id) {
        var idx = -1;
        // Find index of card, if in hand
        for (i = 0; i < this.hand.length; i++) {
            if (this.hand[i].id === id) {
                idx = i;
                break;
            }
        }

        // If not found return false
        if (idx === -1) {
            return false;
        } else {
            var card = this.hand[idx];

            if (card.cost > this.currentMana) {
                return false; // Card can't be played, it is too expensive
            } else {
                this.hand.splice(idx, 1); // Remove card from hand
                this.currentMana -= card.cost; // Spend mana
                return card;
            }
        }
    };

    // Apply card to player
    this.applyCard = function(card) {
        // Take card and apply it depending on type
        if (card.type === "Spell") {
            // Spell card, apply dmg
            this.takeDamage(card.damage);
        } else if (card.type === "Heal") {
            // Heal card, heal dmg
            this.takeDamage(-1 * card.amount);
        }
    };

    // Shuffle deck
    this.shuffle = function() {  
      var currentIndex = this.deck.length, temporaryValue, randomIndex ;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = this.deck[currentIndex];
        this.deck[currentIndex] = this.deck[randomIndex];
        this.deck[randomIndex] = temporaryValue;
      }
    };


    this.init();
};

