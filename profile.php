<?php
// Load PHP game functions and routing
require 'includes/wtg-game.php';

if(isset($_GET['user_id'])){
	$user_id = $_GET['user_id'];
}
// See if user id is provided, if not check for logged in user
else{
	$user_id = isset( $_REQUEST['id'] ) ? $_REQUEST['id'] : $_SESSION['id'];
}
// Lookup profile data for this user
$profile = wtg_profile( $user_id );

// TODO: Calculate gravitar hash


?>

<html>
    <head>
        <title>WTA: FR</title>
        <link href='http://fonts.googleapis.com/css?family=Averia+Sans+Libre:400,700,400italic,700italic' rel='stylesheet' type='text/css'>
        <link href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet">
        <link href="css/external/jquery.growl.css" rel="stylesheet" type="text/css" />
        <link rel="stylesheet" type="text/css" href="css/game.css"/>
        
        <script src="//ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
    </head>

    <body>
        <header>
            <h1>Wizardry: The Assembling</h1>
            <h2>Fireplace Rock</h2>
            <i class="fa fa-bars fa-3x"></i>
        </header>

        <div id="wrapper">
            <!-- TODO: Dynamically load data here for the loaded profile -->
            <div id="profile">
            	<?php
				$email = $profile[1];
				$default = "http://turing.plymouth.edu/~jwong/AdvancedWebProgramming/proj6starter/images/Gravitar_Default.jpg";
				$size = 40;
				$grav_url = "http://www.gravatar.com/avatar/" . md5( strtolower( trim( $email ) ) ) . "?d=" . urlencode( $default ) . "&s=" . $size;
				print_r('<img src="'.$grav_url.'" />
            	<div>
            		<h3>'.$profile[3].'</h3>
            		<a href="" >'.$profile[4].'</a><br/>
            		<a href="" >'.$profile[1].'</a><br/>
            		<a href="" >'.$profile[5].'</a><br/>
            	</div>');
				?>
            </div>
            <!-- END TODO -->
        </div>
        <footer>
            &copy; <?php echo date('Y'); ?> Blizzards of the Coast
        </footer>
    </body>
</html>