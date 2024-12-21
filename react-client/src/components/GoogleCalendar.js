import { gapi } from "gapi-script";

// Your Client ID from Google Cloud Console
const CLIENT_ID = process.env.CLIENT_ID;

// Discovery Docs for Google Calendar API
const DISCOVERY_DOCS = [
  "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
];

// Authorization scopes required
const SCOPES = "https://www.googleapis.com/auth/calendar.events";

export const initGoogleCalendar = () => {
  return new Promise((resolve, reject) => {
    gapi.load("client:auth2", () => {
      gapi.client
        .init({
          clientId: CLIENT_ID,
          discoveryDocs: DISCOVERY_DOCS,
          scope: SCOPES,
        })
        .then(() => {
          resolve(gapi);
        })
        .catch((error) => reject(error));
    });
  });
};

export const signInWithGoogle = () => {
  return gapi.auth2.getAuthInstance().signIn();
};

export const signOutGoogle = () => {
  return gapi.auth2.getAuthInstance().signOut();
};

export const createEvent = (event) => {
  return gapi.client.calendar.events.insert({
    calendarId: "primary",
    resource: event,
  });
};
