"use client";

import { useEffect, useState } from "react";
import { CONFIG } from "../../../config";

declare global {
  interface Window {
    google?: any;
  }
}

export default function GoogleCalendar() {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [status, setStatus] = useState("");

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
  }, []);

  const handleAuth = () => {
    const tokenClient = window.google?.accounts.oauth2.initTokenClient({
      client_id: CONFIG.GCAL_CLIENT_ID,
      scope: "https://www.googleapis.com/auth/calendar.events",
      callback: (tokenResponse: any) => {
        setAccessToken(tokenResponse.access_token);
        setStatus("✅ Access token acquired.");
      },
    });

    tokenClient?.requestAccessToken();
  };

  const scheduleAppointment = async () => {
    // 👇 Open tab immediately on click (to prevent browser blocking)
    const newTab = window.open("about:blank", "_blank");
  
    if (!newTab) {
      setStatus("🚫 Popup blocked! Please allow popups and try again.");
      return;
    }
  
    setStatus("⏳ Booking appointment...");
  
    const event = {
      summary: "Appointment with Dr. Lee",
      description: "Follow-up for migraines",
      start: {
        dateTime: "2025-08-04T09:00:00-04:00",
        timeZone: "America/New_York",
      },
      end: {
        dateTime: "2025-08-04T09:30:00-04:00",
        timeZone: "America/New_York",
      },
      attendees: [{ email: "dr.lee@healthclinic.com" }],
      reminders: { useDefault: true },
    };
  
    try {
      const response = await fetch(
        "https://www.googleapis.com/calendar/v3/calendars/primary/events",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(event),
        }
      );
  
      const result = await response.json();
  
      localStorage.setItem(
        "savedDoctorEvent",
        JSON.stringify({
          id: result.id,
          summary: result.summary,
          start: result.start.dateTime,
          end: result.end.dateTime,
          doctorEmail: result.attendees?.[0]?.email || null,
          htmlLink: result.htmlLink,
        })
      );
  
      setStatus(`✅ Event created: ${result.htmlLink}`);
  
      // ✅ Redirect the placeholder tab to Google Calendar event
      newTab.location.href = result.htmlLink;
  
      console.log("📌 Saved doctor appointment:", result);
    } catch (err) {
      setStatus("❌ Failed to create event.");
      console.error("Error creating event:", err);
      newTab.close(); // cleanup bad tab
    }
  };

  return (
    <div className="flex flex-col gap-4 mt-6">
      {/* 🔐 Sign in Button - BLUE */}
      <button
        className="border border-blue-500 text-blue-500 px-4 py-2 rounded-full hover:bg-blue-500 hover:text-white transition"
        onClick={handleAuth}
      >
        Sign In with Google
      </button>
  
      {/* 📅 Schedule Appointment - CALM TEAL */}
      <button
        disabled={!accessToken}
        onClick={scheduleAppointment}
        className={`px-4 py-2 rounded-full border transition ${
          accessToken
            ? "border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white"
            : "border-gray-400 text-gray-400 cursor-not-allowed"
        }`}
      >
        Schedule Appointment
      </button>
  
      {/* ✅ Google Calendar event link */}
      {status.startsWith("✅ Event created:") ? (
        <a
          href={status.replace("✅ Event created: ", "")}
          target="_blank"
          rel="noopener noreferrer"
          className="text-teal-500 underline mt-2"
        >
          ✅ View your Google Calendar event
        </a>
      ) : (
        <p className="text-sm">{status}</p>
      )}
    </div>
  );
}
