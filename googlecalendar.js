metadata = {
    "systemName": "com.k2.sample.google.calendar",
    "displayName": "Sample - Google Calendar API",
    "description": "An example broker that uses the Google Calendar API to obtain user calendar information."
};
ondescribe = function () {
    postSchema({
        objects: {
            "com.k2.sample.google.calendar.calendarList": {
                displayName: "CalendarList",
                description: "The collection of calendars in the user's calendar list",
                properties: {
                    "com.k2.sample.google.calendar.calendarList.kind": {
                        displayName: "Kind",
                        type: "string"
                    },
                    "com.k2.sample.google.calendar.calendarList.etag": {
                        displayName: "ETag",
                        type: "string"
                    },
                    "com.k2.sample.google.calendar.calendarList.id": {
                        displayName: "ID",
                        type: "string"
                    },
                    "com.k2.sample.google.calendar.calendarList.summary": {
                        displayName: "Summary",
                        type: "string"
                    },
                    "com.k2.sample.google.calendar.calendarList.description": {
                        displayName: "Description",
                        type: "string"
                    },
                    "com.k2.sample.google.calendar.calendarList.location": {
                        displayName: "Location",
                        type: "string"
                    },
                    "com.k2.sample.google.calendar.calendarList.timeZone": {
                        displayName: "TimeZone",
                        type: "string"
                    }
                },
                methods: {
                    "com.k2.sample.google.calendar.calendarList.get": {
                        displayName: "CalendarList: get",
                        type: "read",
                        parameters: {
                            "com.k2.sample.google.calendar.calendarList.get.calendarId": {
                                displayName: "Calendar ID",
                                type: "string"
                            }
                        },
                        requiredParameters: ["com.k2.sample.google.calendar.calendarList.get.calendarId"],
                        outputs: [
                            "com.k2.sample.google.calendar.calendarList.kind",
                            "com.k2.sample.google.calendar.calendarList.etag",
                            "com.k2.sample.google.calendar.calendarList.id",
                            "com.k2.sample.google.calendar.calendarList.summary",
                            "com.k2.sample.google.calendar.calendarList.description",
                            "com.k2.sample.google.calendar.calendarList.location",
                            "com.k2.sample.google.calendar.calendarList.timeZone",
                        ]
                    }
                }
            }
        }
    });
};
onexecute = function (objectName, methodName, parameters, properties) {
    switch (objectName) {
        case "com.k2.sample.google.calendar.calendarList":
            calendarList(methodName, parameters, properties);
            break;
        default:
            throw new Error("The object " + objectName + " is not supported.");
    }
};
function calendarList(methodName, parameters, properties) {
    switch (methodName) {
        case "com.k2.sample.google.calendar.calendarList.get":
            getCalendarList(parameters);
            break;
        default:
            throw new Error("The method " + methodName + " is not supported.");
    }
}
function getCalendarList(parameters) {
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4)
            return;
        if (xhr.status !== 200)
            throw new Error("Failed with status " + xhr.status);
        console.log(xhr.responseText);
        var obj = JSON.parse(xhr.responseText);
        postResult({
            "com.k2.sample.google.calendar.calendarList.kind": obj.kind,
            "com.k2.sample.google.calendar.calendarList.etag": obj.etag,
            "com.k2.sample.google.calendar.calendarList.id": obj.id,
            "com.k2.sample.google.calendar.calendarList.summary": obj.summary,
            "com.k2.sample.google.calendar.calendarList.description": obj.description,
            "com.k2.sample.google.calendar.calendarList.location": obj.location,
            "com.k2.sample.google.calendar.calendarList.timeZone": obj.timeZone
        });
    };
    var calendarId = String(parameters["com.k2.sample.google.calendar.calendarList.get.calendarId"]);
    var baseurl = "https://www.googleapis.com/calendar/v3/users/me/calendarList/";
    var url = baseurl.concat(calendarId);
    console.log(url);
    xhr.withCredentials = true;
    xhr.open("GET", url);
    xhr.send();
}
