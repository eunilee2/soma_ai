// gcal.js

import { CONFIG } from './config.js';

const CLIENT_ID = CONFIG.GCAL_CLIENT_ID;
const SCOPES = 'https://www.googleapis.com/auth/calendar.events';

// Load and initialize Google API client
export async function initGoogleClient() {
  return new Promise((resolve) => {
    gapi.load('client:auth2', async () => {
      await gapi.client.init({
        apiKey: CONFIG.GCAL_CLIENT_KEY,
        clientId: CLIENT_ID,
        discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"],
        scope: SCOPES
      });
      resolve();
    });
  });
}

// Trigger Google Sign-in
export async function signInWithGoogle() {
  const auth = gapi.auth2.getAuthInstance();
  const user = await auth.signIn();
  const profile = user.getBasicProfile();
  return profile.getEmail();
}

// Schedule an appointment event
export async function createAppointmentEvent({ summary, description, startTime, endTime, doctorEmail }) {
  const event = {
    summary,
    description,
    start: {
      dateTime: startTime,
      timeZone: 'America/New_York'
    },
    end: {
      dateTime: endTime,
      timeZone: 'America/New_York'
    },
    attendees: doctorEmail ? [{ email: doctorEmail }] : [],
    reminders: { useDefault: true }
  };

  const response = await gapi.client.calendar.events.insert({
    calendarId: 'primary',
    resource: event
  });

  return response.result; // contains htmlLink and other metadata
}

// store the event metadata
const result = await response.json();

const savedDoctorEvent = {
id: result.id,
summary: result.summary,
start: result.start.dateTime,
end: result.end.dateTime,
doctorEmail: result.attendees?.[0]?.email || null,
htmlLink: result.htmlLink
};

console.log("✅ Doctor appointment created:", savedDoctorEvent);