$( function() {

	index = {
	};

	index.init = function() {
        // Bind events here
        $(document).on('click', '#sign-up-link', index.toggle_sign_up); // Bind sign up link
        $(document).on('click', '#sign-in-link', index.toggle_sign_in); // Bind sign in link
        $(document).on('submit', '#sign-in-form', index.sign_in_submit); // Bind sign up submission
        $(document).on('submit', '#sign-up-form', index.sign_up_submit); // Bind sign up submission

        // Set correct form for display
        if($("body").hasClass("sign-up")) {
            index.toggle_sign_up();
        }
	};
    
    index.toggle_sign_up = function(e) {
        e.preventDefault();
        $("#sign-up-form").show();
		$("#sign-in-form").hide();
    };
    
    index.toggle_sign_in = function(e) {
        e.preventDefault();
        $("#sign-up-form").hide();
		$("#sign-in-form").show();
    };

    // Regular expressions for validation
	var signin_email = new RegExp('^[a-zA-Z0-9_\.\+-]+@[a-zA-Z0-9-]+\.([a-z\.]{2,6})([\/\w\.-]*)*\/?$');
	var signin_password = new RegExp('^[a-zA-Z0-9]+$');
	
	var signup_email = new RegExp('^[a-zA-Z0-9_\.\+-]+@[a-zA-Z0-9-]+\.([a-z\.]{2,6})([\/\w\.-]*)*\/?$');
	var signup_password = new RegExp('^[a-zA-Z0-9]+$');
	var confirm_password = new RegExp('^[a-zA-Z0-9]+$');
	var name = new RegExp('^[a-zA-Z]+$');
	var url = new RegExp('^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$');
	var twitter = new RegExp('^@([A-Za-z0-9_]{1,}$)');
    // TODO: Add valid regular expressions for these fields

    // END TODO
    index.sign_in_submit = function(e) {
        var error;

        // TODO: Add code to check various errors on client side
		if(signin_email.test($('#sign-in-email').val()) != true){
			error = 'Incorrect email';
		}
		if(signin_password.test($('#sign-in-password').val()) != true){
			error = 'Incorrect password';
		}
        // END TODO
        if (( error )){
            e.preventDefault();
            $( '.error' ).html( error );
        }
    }

    index.sign_up_submit = function(e) {
        var error;

        // TODO: Add code to check various errors on the client side
		if(signup_email.test($('#sign-up-email').val()) != true){
			error = 'Incorrect email format';
		}
		if(signup_password.test($('#sign-up-password').val()) != true){
			error = 'Incorrect password format';
		}
		if($('#sign-up-password_confirm').val() != $('#sign-up-password').val()){
			error = "Passwords do not match";
		}
		if(name.test($('#sign-up-name').val()) != true){
			error = 'Incorrect name format';
		}
		if(url.test($('#sign-up-url').val()) != true){
			error = 'Incorrect url format';
		}
		if(twitter.test($('#sign-up-twitter').val()) != true){
			error = 'Incorrect Twitter Handle format';
		}
		
        // END TODO
        if ( error ) {
            e.preventDefault();
            $( '.error' ).html( error );
        }
    }
    
    index.init();

} );