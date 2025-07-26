"use client";

import { useState } from "react";
import VoiceInput from "./components/VoiceInput";
import GoogleCalendar from "./components/GoogleCalendar";
import "./globals.css";

export default function Home() {
  const [transcript, setTranscript] = useState<string | null>(null);
  const [structuredData, setStructuredData] = useState<object | null>(null);

  const handleTranscript = async (text: string) => {
    setTranscript(`You said: "${text}"`);

    try {
      const res = await fetch("./api/claude-scheduler", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userMessage: text }),
      });

      const data = await res.json();
      setStructuredData(data);
      console.log("Claude response:", data);
    } catch (err) {
      console.error("Error calling Claude API:", err);
    }
  };

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        {/* 🧠 Title + Tagline */}
        <div className="flex flex-col items-center justify-center font-mono text-sm text-center mt-12 sm:mt-20">
          <code className="bg-black/[.05] dark:bg-white/[.06] font-semibold px-2 py-1 rounded">
            Patient Scheduler ⭐️
          </code>
          <div className="mt-4 text-xl font-mono font-semibold text-center">
            <span className="typewriter">Healthcare, Handled.</span>
          </div>

          {/* 🎙️ Voice input */}
          <div className="mt-6">
            <VoiceInput onTranscript={handleTranscript} />
            {transcript && <p className="mt-4 text-sm italic">{transcript}</p>}
          </div>

          {/* 🤖 Claude output */}
          {structuredData && (
            <div className="bg-gray-100 text-black rounded p-4 mt-4 text-sm w-full max-w-lg whitespace-pre-wrap font-mono">
              <strong>🧠 Structured Data:</strong>
              <pre className="mt-2">
                {JSON.stringify(structuredData, null, 2)}
              </pre>
            </div>
          )}

          {/* ✅ Google Calendar Integration (handles Sign In + Book) */}
          <div className="mt-10 w-full max-w-lg">
            <GoogleCalendar />
          </div>
        </div>
      </main>
    </div>
  );
}
