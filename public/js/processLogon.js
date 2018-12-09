function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

    // TODO:  someday send token to backend for secure sign in from server
    /*
        var id_token = googleUser.getAuthResponse().id_token;
        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'https://yourbackend.example.com/tokensignin');
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onload = function() {
            console.log('Signed in as: ' + xhr.responseText);
        };
        xhr.send('idtoken=' + id_token);
    */
    
    // call the getpersonbyemail api 
    // this will return null if the user's email does not exist
    $.ajax({
        url: "/api/person/getpersonbyemail/" + profile.getEmail(),
        type: "GET"
      }).then(function(data) {
            if (data !== null) {
                // if user exist, send to index route
                window.location.replace("/index");
            } else {
                // if user does NOT exist, send to profile route to create profile
                window.location.replace("/profile");
            }
      });
}



