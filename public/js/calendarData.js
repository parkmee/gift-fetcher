function loadCalendarData(personId) {
    const getEventsUrl = "/api/event/getpersonevents/" + personId
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

