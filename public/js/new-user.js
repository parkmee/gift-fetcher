$(".new-user-submit-btn").on("click", function(){
    let email = $("#user-name").val();
    let userName = $("#user-name").val();
    let firstName = $("#first-name").val();
    let lastName = $("#last-name").val();

    let postData = {
        email: email,
        userName: userName,
        firstName: firstName,
        lastName: lastName
    };
    let newUserUrl = "/api/person/create";
    $.ajax({
        url: newUserUrl,
        type: "POST",
        data: postData
      }).then(function(data) {
        window.location.href="/index";        
      });

})