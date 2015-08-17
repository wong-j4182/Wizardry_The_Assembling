<?php
// Load PHP game functions and routing
require 'includes/wtg-game.php';
?>

<html>
	<head>
		<title>WTA: FR</title>
		<link href='http://fonts.googleapis.com/css?family=Averia+Sans+Libre:400,700,400italic,700italic' rel='stylesheet' type='text/css'>
        <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet">
        <link href="css/external/jquery.growl.css" rel="stylesheet" type="text/css" />
        <link rel="stylesheet" type="text/css" href="css/game.css"/>
		
        <script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
        <script src="js/index.js"></script>
	</head>

	<body class="<?= (isset($_POST['password_confirm'])) ? 'sign-up' : 'sign-in' ?>">
		<header>
			<h1>Wizardry: The Assembling</h1>
            <h2>Fireplace Rock</h2>
            <i class="fa fa-bars fa-3x"></i>
		</header>

		<div id="wrapper">
			<div id="forms">
				<p class="error"><?= (isset($error)) ? $error : "" ?></p>

				<form method="post" id="sign-in-form">
					<h3>Sign In:</h3>

					<fieldset>
						<label for="sign-in-email">Email:</label><input type="email" name="email" id="sign-in-email"/>
						<label for="sign-in-password">Password:</label><input type="password" name="password" id="sign-in-password"/>
						<div><button id="sign-in" class="active">Sign In</button></div>

						<a href="#" id="sign-up-link">Need an account?</a>
					</fieldset>
				</form>

				<form method="post" id="sign-up-form" display="none">
					<h3>Sign Up:</h3>
					<fieldset>
						<label for="sign-up-email">Email:</label><input type="email" name="email" id="sign-up-email"/>
						<label for="sign-up-password">Password:</label><input type="password" name="password" id="sign-up-password"/>
						<label for="sign-up-password_confirm">Confirm Password:</label><input type="password" name="password_confirm" id="sign-up-password_confirm"/>
						
						<!-- TODO: Add additional account sign up fields here -->

						<label for="sign-up-name">Name:</label><input type="text" name="name" id="sign-up-name"/>
						<label for="sign-up-url">URL:</label><input type="url" name="url" id="sign-up-url"/>
						<label for="sign-up-twitter">Twitter Handle:</label><input type="text" name="twitter" id="sign-up-twitter"/>

						<!-- End TODO -->

						<div><button class="active">Sign Up</button></div>
						<a href="#" id="sign-in-link">Have an account? Sign in!</a>
					</fieldset>
				</form>

			</div>
		</div>

		<footer>
			&copy; <?php echo date('Y'); ?> Blizzards of the Coast
		</footer>
	</body>
</html>