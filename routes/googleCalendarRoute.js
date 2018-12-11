module.exports = function(app) {
  // push event to google calendar
  app.get("/api/googlecalendar/getevents", function(req, res) {
    gapi.client.calendar.events
      .list({
        calendarId: "primary",
        timeMin: new Date().toISOString(),
        showDeleted: false,
        singleEvents: true,
        maxResults: 10,
        orderBy: "startTime"
      })
      .then(function(response) {
        var events = response.result.items;
        res.json(events);

        // if (events.length > 0) {
        //   for (i = 0; i < events.length; i++) {
        //     var event = events[i];
        //     var when = event.start.dateTime;
        //     if (!when) {
        //       when = event.start.date;
        //     }
        //     appendPre(event.summary + " (" + when + ")");
        //   }
        // } else {
        //   appendPre("No upcoming events found.");
        // }
      });

    //res.send(200);
  });
};
