// add an event to the calander
function addEvent(evtTitle, evtDescription, evtDate, purchased, createdBy, personId) {

    // add to google calendar
    //addGoogleEvent(evtTitle, evtDescription, evtDate)

    let cellColor = "red";
    if (purchased) {
    cellColor = "green"
    }

    // add event to the calendar UI  
    $('#calendar').fullCalendar('renderEvent', {
        title: evtTitle,
        description: evtDescription,
        start: evtDate,
        allDay: true,
        color: cellColor     
    });
}

function loadCalendarData(personId) {
    const getEventsUrl = "/api/event/geteventsbycreator"
    //console.log("getEventsUrl: ", getEventsUrl);
    $.ajax({
        url: getEventsUrl,
        type: "GET"
      }).then(function(data) {
        //console.log("data: ", data);
        for (let i=0; i < data.length; i++) {            
            addEvent(data[i].title, 
                data[i].description, 
                data[i].eventDate, 
                data[i].purchased, 
                data[i].createdBy, 
                data[i].PersonId);
        }
      });
}

$(document).ready(function () {

    /* initialize "new" calendar - Mike */
    $('#calendar').fullCalendar({
        defaultView: 'month',

        // add click event for calendar events
        eventClick: function(calEvent, jsEvent, view) {
            alert('Event: ' + calEvent.title);
            // change the border color just for fun
            //$(this).css('border-color', 'red');
            $(this).css('background-color', 'green');

        },
        
        // add hover popup for the calendar events
        eventRender: function(eventObj, $el) {
            $el.popover({
              title: eventObj.title,
              content: eventObj.description,
              trigger: 'hover',
              placement: 'top',
              container: 'body'
            });
        }


    });

    // load calendar events from the database for the PersonId
    // this would be determined by the user who is logged on but for
    // testing purposes, just use user person id = 4
    loadCalendarData(4);
  });
