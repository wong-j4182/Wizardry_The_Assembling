<?php
// Begin session for this page
session_start();

// Attempt to connect to the database
wtg_database_connect();

// Basic URL routing code

if ( 'index.php' == wtg_get_script() && 'POST' == $_SERVER['REQUEST_METHOD'] ) {
	
	$error = FALSE;

	// Attempt to handle sign up vs. sign in
	if ( isset( $_POST['password_confirm'] ) ) 	{
		$result = wtg_sign_up( $_POST['email'], $_POST['password'], $_POST['password_confirm'], $_POST['name'], $_POST['url'], $_POST['twitter'] );
	} else 	{
		$result = wtg_authenticate( $_POST['email'], $_POST['password'] );
	}

	// Successful database code, redirect to game
	if ( TRUE === $result ) {
		header( 'Location: game.php' );
		exit;
	}

	$error = $result;
} elseif ( isset( $_GET['logout'] ) ) {
    // Process call to log out
	wtg_logout();
	header( 'Location: index.php' );
	exit;
} elseif ( 'index.php' != wtg_get_script() ) {
    // If attempting to access any page besides the log-in page, check for logged in status and redirect if needed
	if ( ! isset($_SESSION['id']) ) {
		header( 'Location: index.php' );
		exit;
	}
}

// Database connection function

function wtg_database_connect() {
	global $db;

	$db = new mysqli( 'localhost', 'jwong', '2Fast4u1', 'jwong' );

	if ( $db->connect_errno > 0 ) {
		die( 'Unable to connect to database [' . $db->connect_error . ']' );
	}
} //end wtg_database_connect

// Script name determination function

function wtg_get_script() {
	$arr = explode( '/', $_SERVER['SCRIPT_NAME'] );
	return array_pop( $arr );
} //end wtg_get_script

// Script load game from database function

function wtg_load_game() {
	global $db;

	$sql = 'SELECT * FROM game WHERE gameID = 1';
	if ( ! $result = $db->query( $sql ) ) 	{
		die( 'There was an error running the query [' . $db->error . ']' );
	}

	return $result->fetch_assoc();
} //end wtg_load_game

// Save game to database function

function wtg_save_game( $state )
{
	global $db;

	// Prepare SQL statement
	$stmt = $db->prepare(
		'UPDATE game SET
			playerHealth = ?,
			computerHealth = ?,
			playerMana = ?,
			computerMana = ?,
			currentMana = ?,
			playerHand = ?,
			playerDeck = ?,
			computerHand = ?,
			computerDeck = ?
		WHERE gameID = 1' );

	// Bind parameters
	$stmt->bind_param( 'iiiiissss',
		$state['playerHealth'],
		$state['computerHealth'],
		$state['playerMana'],
		$state['computerMana'],
		$state['currentMana'],
		$state['playerHand'],
		$state['playerDeck'],
		$state['computerHand'],
		$state['computerDeck']
	);

	$stmt->execute();
	$stmt->close();

	return TRUE;
} //end wtg_save_game

// Create new account function

function wtg_sign_up( $email, $password, $password_confirm, $name, $url, $twitter ) {
	global $db;

	if ( $password_confirm !== $password ) {
		return 'Passwords do not match';
	}

	// First check if the user already exists
	$sql = 'SELECT * FROM user WHERE email = ?';
	$stmt = $db->prepare( $sql );
	$stmt->bind_param( 's', $email );
	$stmt->execute();
	
	// get_result does not work on turing, must use bind_result and fetch
	//$res = $stmt->get_result();
	$stmt->bind_result($id, $db_email, $db_hash, $db_name, $db_url, $db_twitter);
    $stmt->fetch();
    $count = $stmt->num_rows();
	$stmt->close();

	if ($count > 0) { // Email already in db
        return 'This account already exists';
    }
    else if ($email == '') {
        return 'Please enter an email address';
    }
    else if ($password == '') {
        return 'Please enter a password';
    }
    else if ($password != $password_confirm) { // Password doesn't match confirmation
        return 'Password and confirm password do not match';
    }
    else { // Not an account, add to db
        $stmt = $db->prepare("INSERT INTO user (email, password, name, url, twitter) VALUES (?, ?, ?, ?, ?)");
        $stmt->bind_param('sssss', $email, password_hash($password, PASSWORD_DEFAULT), $name, $url, $twitter); // Store hashed password

        $stmt->execute();
        $stmt->close();

		return TRUE;
	}
} //end wtg_sign_up

// Authentication function for log in

function wtg_authenticate( $email, $password ) {
	global $db;
	
	// See if username is listed in db
    $stmt = $db->prepare("SELECT * FROM user WHERE email = ?");
    $stmt->bind_param('s', $email);

    $stmt->execute();
    $stmt->store_result();
    $stmt->bind_result($id, $db_email, $db_hash, $db_name, $db_url, $db_twitter);
    $stmt->fetch();
    $count = $stmt->num_rows();
    

    if ($email == '') {
        return 'Please enter an email address';
    }
    else if ($count == 0) { // Email not already in db
        return 'Username/password combination is invalid';
    }
    else if (!password_verify($password, $db_hash)) {
        return 'Username/password combination is invalid';
    }
    else { // Valid login
        $_SESSION['id'] = $id;
        header("Location: game.php"); // Send to game
        exit;
    }

    $stmt->close();

	return TRUE;
} //end wtg_authenticate

// Process log out function

function wtg_logout() {
	$_SESSION['user_id'] = FALSE;
	unset( $_SESSION['user_id'] );
	session_destroy();
}//end wtg_logout

function wtg_profile( $user_id ) {
    if ( ! $user_id ) {
        return FALSE;
    }
	
    global $db;
	
    $stmt = $db->prepare("SELECT * FROM user WHERE id = ?");
    $stmt->bind_param('s', $user_id);
    $stmt->execute();
    $stmt->store_result();
    $stmt->bind_result($id, $db_email, $db_hash, $db_name, $db_url, $db_twitter);
    $stmt->fetch();
    $count = $stmt->num_rows();

    // TODO: Pull user data from database

    if ($count == 0) {
        return FALSE;
    }
    // TODO: Build associative array for profile and return it
    $profile = array();
	
	$profile[0] = $id;
	$profile[1] = $db_email;
	$profile[2] = $db_hash;
	$profile[3] = $db_name;
	$profile[4] = $db_url;
	$profile[5] = $db_twitter;
	
    return $profile;
}// end wtg_profile