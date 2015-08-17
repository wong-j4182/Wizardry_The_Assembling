// Base Card class
function Card(id, cost) {
    this.id = id;
    this.cost = cost;
};

// Spell Card class
function SpellCard(id, cost, damage) {
    Card.call(this, id, cost);

    this.damage = damage;
    this.type = "Spell";
};

// Subclass SpellCard under Card
SpellCard.prototype = Object.create(Card.prototype);
SpellCard.prototype.constructor = SpellCard;

// Add description function to Spellcard for making card description
SpellCard.prototype.description = function() {
    return "Deal " + this.damage + " damage";
}

// Add template function to SpellCard for generating html for this card
SpellCard.prototype.template = function() {
    var template =  '<li>' +
                    '<div class="card" data-id="' + this.id + '">' +
                    '<i class="fa fa-fire"></i>' + 
                    '<header>' + this.type + '</header>' +
                    '<div class="cost">' + this.damage + '</div>' +
                    '<p class="desc">' + this.description() + '</p>' +
                    '</div>' +
                    '</li>';

    return template;
}

// Heal Card class
function HealCard(id, cost, amount) {
    Card.call(this, id, cost);

    this.amount = amount;
    this.type = "Heal";
};

// Subclass HealCard under Card
HealCard.prototype = Object.create(Card.prototype);
HealCard.prototype.constructor = HealCard;

// Add type property to HealCard
//HealCard.prototype.type = "Heal";

// Add description function to Healcard for making card description
HealCard.prototype.description = function() {
    return "Heal " + this.amount + " health";
}

// Add template function to HealCard for generating html for this card
HealCard.prototype.template = function() {
    var template =  '<li>' +
                    '<div class="card" data-id="' + this.id + '">' +
                    '<i class="fa fa-plus-square"></i>' + 
                    '<header>' + this.type + '</header>' +
                    '<div class="cost">' + this.amount + '</div>' +
                    '<p class="desc">' + this.description() + '</p>' +
                    '</div>' +
                    '</li>';

    return template;
}
