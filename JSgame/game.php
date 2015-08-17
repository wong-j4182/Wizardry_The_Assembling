<?php
// Load PHP game functions and routing
require 'includes/wtg-game.php';

if (isset($_GET['load'])) {
	
	// Fetch loaded game
	$row = wtg_load_game();

	// Build data attributes with game info to add to body tag

	$data = "data-playerhealth='" . $row['playerHealth'] . "' ";
	$data .= "data-computerhealth='" . $row['computerHealth'] . "' ";
	$data .= "data-playermana='" . $row['playerMana'] . "' ";
	$data .= "data-computermana='" . $row['computerMana'] . "' ";
	$data .= "data-currentmana='" . $row['currentMana'] . "' ";
	$data .= "data-playerhand='" . $row['playerHand'] . "' ";
	$data .= "data-playerdeck='" . $row['playerDeck'] . "' ";
	$data .= "data-computerhand='" . $row['computerHand'] . "' ";
	$data .= "data-computerdeck='" . $row['computerDeck'] . "' ";
}

?>

<!DOCTYPE html>
<html>

	<head>
		<title>WTA: FR</title>
		<link href='http://fonts.googleapis.com/css?family=Averia+Sans+Libre:400,700,400italic,700italic' rel='stylesheet' type='text/css'>
		<link href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet">
		<link href="css/external/jquery.growl.css" rel="stylesheet" type="text/css" />
		<link href="css/external/colorbox.css" rel="stylesheet" type="text/css" />
		<link href="css/game.css" rel="stylesheet" type="text/css" />

		<script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
		<script src="js/external/jquery.growl.js" type="text/javascript"></script>
		<script src="js/external/jquery.colorbox-min.js"></script>
		<script src="js/game.js"></script>
		<script src="js/player.js"></script>
		<script src="js/card.js"></script>
	</head>

	<body <?= isset($data) ? $data : "" ?>>
		<header>
			<h1>Wizardry: The Assembling</h1>
			<h2>Fireplace Rock</h2>
			<i class="fa fa-bars fa-3x"></i>
		</header>

		<div id="wrapper">
			<div class="computerbar">
				<ul class="hand">
				</ul>
				<div class="controls">
					<div class="health"></div>
					<ul class="mana">
					</ul>
				</div>
			</div>
			<div id="game">
				<div class="computerarena">
					<div class="minions">
					</div>
					<div class="deck">
						<img src="images/cardback.png">
						<div class="count"></div>
					</div>
				</div>
				<div class="playerarena">
					<div class="minions">
					</div>
					<div class="deck">
						<img src="images/cardback.png">
						<div class="count"></div>
					</div>
				</div>
			</div>
			<div class="playerbar">
				<ul class="hand">
				</ul>
				<div class="controls">
					<div class="health"></div>
					<ul class="mana">
						
					</ul>
					<button class="active">End Turn</button>
				</div>
			</div>
		</div>

		<footer>
			&copy; <?= date('Y'); ?> Blizzards of the Coast
		</footer>
	</body>
</html>