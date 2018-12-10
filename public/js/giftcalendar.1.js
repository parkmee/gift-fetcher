const CLIENT_ID = "810303275752-m5egdhj3bgkra6ch90dq4tj9s0v7drep.apps.googleusercontent.com";
const SCOPES = "https://www.googleapis.com/auth/calendar";

var auth2; // The Sign-In object.
var googleUser; // The current user.

/**
 * Calls startAuth after Sign in V2 finishes setting up.
 */
var appStart = function() {
  gapi.load('auth2', initSigninV2);
};

/**
 * Initializes Signin v2 and sets up listeners.
 */
var initSigninV2 = function() {
  auth2 = gapi.auth2.init({
      client_id: CLIENT_ID,
      scope: SCOPES
  });

  // Listen for sign-in state changes.
  auth2.isSignedIn.listen(signinChanged);

  // Listen for changes to current user.
  auth2.currentUser.listen(userChanged);

  // Sign in the user if they are currently signed in.
  if (auth2.isSignedIn.get() == true) {
    auth2.signIn();
  }

  // Start with the current live values.
  refreshValues();
};

/**
 * Listener method for sign-out live value.
 *
 * @param {boolean} val the updated signed out state.
 */
var signinChanged = function (val) {
  console.log('Signin state changed to ', val);
  document.getElementById('signed-in-cell').innerText = val;
};

/**
 * Listener method for when the user changes.
 *
 * @param {GoogleUser} user the updated user.
 */
var userChanged = function (user) {
  console.log('User now: ', user);
  googleUser = user;
  updateGoogleUser();
  document.getElementById('curr-user-cell').innerText =
    JSON.stringify(user, undefined, 2);
};

/**
 * Updates the properties in the Google User table using the current user.
 */
var updateGoogleUser = function () {
  if (googleUser) {
    document.getElementById('user-id').innerText = googleUser.getId();
    document.getElementById('user-scopes').innerText =
      googleUser.getGrantedScopes();
    document.getElementById('auth-response').innerText =
      JSON.stringify(googleUser.getAuthResponse(), undefined, 2);
  } else {
    document.getElementById('user-id').innerText = '--';
    document.getElementById('user-scopes').innerText = '--';
    document.getElementById('auth-response').innerText = '--';
  }
};

/**
 * Retrieves the current user and signed in states from the GoogleAuth
 * object.
 */
var refreshValues = function() {
  if (auth2){
    console.log('Refreshing values...');

    googleUser = auth2.currentUser.get();

    document.getElementById('curr-user-cell').innerText =
      JSON.stringify(googleUser, undefined, 2);
    document.getElementById('signed-in-cell').innerText =
      auth2.isSignedIn.get();

    updateGoogleUser();
  }
}





// // TODO: add keys to dotenv later
// const CLIENT_ID = "810303275752-m5egdhj3bgkra6ch90dq4tj9s0v7drep.apps.googleusercontent.com";
// const API_KEY = "AIzaSyA19sjQUSJnmdZHmSJlXqT2-n_wSNgzTQM";

// const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
// const SCOPES = "https://www.googleapis.com/auth/calendar";
// const reminderDays = 14;

// function handleClientLoad() {
//     gapi.load('client:auth2', initClient);        
// }

// function initClient() {
//     gapi.client.init({
//       apiKey: API_KEY,
//       clientId: CLIENT_ID,
//       discoveryDocs: DISCOVERY_DOCS,
//       scope: SCOPES
//     }).then(function () {
//       // Listen for sign-in state changes.
//       gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

//       // Handle the initial sign-in state.
//       updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
//       authorizeButton.onclick = handleAuthClick;
//       signoutButton.onclick = handleSignoutClick;

//       if (gapi.auth2.isSignedIn.get()) {
//         var profile = auth2.currentUser.get().getBasicProfile();
//         console.log('ID: ' + profile.getId());
//         console.log('Full Name: ' + profile.getName());
//         console.log('Given Name: ' + profile.getGivenName());
//         console.log('Family Name: ' + profile.getFamilyName());
//         console.log('Image URL: ' + profile.getImageUrl());
//         console.log('Email: ' + profile.getEmail());
//       }
//     }, function(error) {
//       appendPre(JSON.stringify(error, null, 2));
//     });
// }

// function updateSigninStatus(isSignedIn) {
// if (isSignedIn) {
//     // do stuff here once signed in 
// } else {
//     // we did not sign in for some reason
// }
// }

// // add an event to google calendar
// function addGoogleEvent(summary, description, eventDate) {
//     var event = {
//         'summary': summary,
//         'description': description,
//         'start': {
//             'dateTime': '2019-02-04T09:00:00-07:00',
//             'timeZone': 'America/Los_Angeles'
//         },
//         'end': {
//             'dateTime': eventDate + 'T17:00:00-07:00',
//             'timeZone': 'America/Los_Angeles'
//         },
//         'reminders': {
//             'useDefault': false,
//             'overrides': [
//             {'method': 'email', 'minutes': 60 * 24 * reminderDays},
//             {'method': 'popup', 'minutes': 10}
//             ]
//         }
//     };

//     var request = gapi.client.calendar.events.insert({
//         'calendarId': 'primary',
//         'resource': event
//     });

//     request.execute(function(event) {
//         // TODO: save the eventId eventually but for now just console log
//         eventJson = `{"googleEventId": "${event.id}"}`;
//         console.log(eventJson);
//     });
//   }

// // add an event to the calander
// function addEvent(evtTitle, evtDescription, evtDate, purchased, createdBy, personId) {

//     // add to google calendar
//     addGoogleEvent(evtTitle, evtDescription, evtDate)

//     let cellColor = "red";
//     if (purchased) {
//     cellColor = "green"
//     }

//     // add event to the calendar UI  
//     $('#calendar').fullCalendar('renderEvent', {
//         title: evtTitle,
//         description: evtDescription,
//         start: evtDate,
//         allDay: true,
//         color: cellColor     
//     });
// }

// function loadCalendarData(personId) {
//     const getEventsUrl = "/api/event/getpersonevents/" + personId
//     //console.log("getEventsUrl: ", getEventsUrl);
//     $.ajax({
//         url: getEventsUrl,
//         type: "GET"
//       }).then(function(data) {
//         //console.log("data: ", data);
//         for (let i=0; i < data.length; i++) {            
//             addEvent(data[i].title, 
//                 data[i].description, 
//                 data[i].eventDate, 
//                 data[i].purchased, 
//                 data[i].createdBy, 
//                 data[i].PersonId);
//         }
//       });
// }

// $(document).ready(function () {

//     /* initialize "new" calendar - Mike */
//     $('#calendar').fullCalendar({
//         defaultView: 'month',

//         // add click event for calendar events
//         eventClick: function(calEvent, jsEvent, view) {
//             alert('Event: ' + calEvent.title);
//             // change the border color just for fun
//             //$(this).css('border-color', 'red');
//             $(this).css('background-color', 'green');

//         },
        
//         // add hover popup for the calendar events
//         eventRender: function(eventObj, $el) {
//             $el.popover({
//               title: eventObj.title,
//               content: eventObj.description,
//               trigger: 'hover',
//               placement: 'top',
//               container: 'body'
//             });
//         }


//     });

//     // load calendar events from the database for the PersonId
//     // this would be determined by the user who is logged on but for
//     // testing purposes, just use user person id = 4
//     loadCalendarData(4);
//   });

//   // save event to caledar UI
//   $("#save-event").on("click", function(){
//     // call API to add event to the calendar
//     // create post data for the API call
//     const postData = {
//         title: $("#event-title").val(),
//         description: $("#event-description").val(),
//         eventDate: $("#event-date").val(),
//         createdBy: $("#created-by").val(),
//         PersonId: $("#person-id").val()
//     }
//     $.ajax({
//         url: "/api/event/create",
//         type: "POST",
//         data: postData
//       }).then(function(data) {
//             //console.log(data);
//       });
//     addEvent($("#event-title").val(), 
//         $("#event-description").val(), 
//         $("#event-date").val(), 
//         false, 
//         $("#created-by").val(), 
//         $("#person-id").val());
    
//     $("#event-title").val("");
//     $("#event-description").val("");
//     $("#event-date").val("");
//     $("#created-by").val("");
//     $("#person-id").val("");
//   });

    