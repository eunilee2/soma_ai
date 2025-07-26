// VoiceInput.tsx
'use client';

import { useState } from "react";

export default function VoiceInput({ onTranscript }: { onTranscript: (text: string) => void }) {
  const [listening, setListening] = useState(false);
  let recognition: any;

  if (typeof window !== "undefined" && 'webkitSpeechRecognition' in window) {
    const SpeechRecognition = (window as any).webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';
  }

  const startListening = () => {
    if (!recognition) return;
    setListening(true);
    recognition.start();
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      onTranscript(transcript);
      setListening(false);
    };
    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event);
      setListening(false);
    };
  };

  return (
    <button onClick={startListening} className="px-4 py-2 bg-blue-600 text-white rounded">
      {listening ? "Listening..." : "🎙️ Speak"}
    </button>
  );
}
