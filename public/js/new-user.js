$(".new-user-submit-btn").on("click", function(){
    const email = $("#user-name").val();
    const userName = $("#user-name").val();
    const firstName = $("#first-name").val();
    const lastName = $("#last-name").val();

    const postData = {
        email: email,
        userName: userName,
        firstName: firstName,
        lastName: lastName
    };
    const newUserUrl = "/api/person/create";
    $.ajax({
        url: newUserUrl,
        type: "POST",
        data: postData
      }).then(function(data) {
        window.location.href="/index";        
      });

})