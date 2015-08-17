<?php

// Load PHP game functions and routing
require 'includes/wtg-game.php';

// Attempt to save game and examine the result
$result = wtg_save_game( $_POST );

// If the attempt to save failed, show the error
if ( TRUE !== $result ) {
	echo $result;
	exit;
}

// If the game saved, reload the game page and load the current state back in
header( 'Location: game.php?load' );
exit;