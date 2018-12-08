function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
    
    $.ajax({
        url: "/api/person/getpersonbyemail/" + profile.getEmail(),
        type: "GET"
      }).then(function(data) {
            if (data !== null) {
                // if user exist, send to index page
                console.log("user exist!");
                window.location.replace("/index");
            } else {
                // if user does NOT exist, send to profile page to create profile
                console.log("user does NOT exist!");
                window.location.replace("/profile");
            }
      });
}



