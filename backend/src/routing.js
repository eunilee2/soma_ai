// intentRouter.js
// import claudeParsed from "./claude_prompt.py"; // Importing the parsed data from Claude
// import { handleScheduling, handleInsuranceCheck, handleCancelAppointment, handleReschedule } from "./handlers"; // Importing handler functions

// 🧠 This is Step 2: Route Claude's parsed JSON to the right function

import fs from 'fs';

// ✅ Main routing function
async function routeParsedIntent(parsedData) {
  console.log(`🔍 Detected intent: ${parsedData.intent}`);

  switch (parsedData.intent) {
    case "schedule_appointment":
      await handleScheduling(parsedData);
      break;

    case "check_insurance":
      await handleInsuranceCheck(parsedData);
      break;

    case "cancel_appointment":
      await handleCancelAppointment(parsedData);
      break;

    case "reschedule":
      await handleReschedule(parsedData);
      break;

    default:
      throw new Error(`Unknown intent: ${parsedData.intent}`);
  }
}

// ✅ Handler stubs (to implement later)
async function handleScheduling(data) {
  console.log("📅 Scheduling appointment for:", data.symptoms);
  // TODO: Match doctor → Check insurance → Estimate cost → Schedule
}

async function handleInsuranceCheck(data) {
  console.log("🧾 Checking insurance for:", data.specialty);
  // TODO: Query OneRecord or third-party API
}

async function handleCancelAppointment(data) {
  console.log("❌ Canceling appointment for doctor:", data.doctor_name);
  // TODO: Use Google Calendar API or internal scheduler
}

async function handleReschedule(data) {
  console.log("🔁 Rescheduling appointment to:", data.preferred_time);
  // TODO: Cancel existing → rebook
}

// // ✅ Example usage with mocked Claude output
// const claudeParsed = {
//   intent: "schedule_appointment",
//   doctor_name: null,
//   specialty: "neurology",
//   symptoms: "migraines",
//   preferred_time: "next Monday morning",
//   location: null,
//   returning_patient: true,
//   needs_insurance_verification: true,
//   additional_notes: null
// };

// // 🔁 Run router
// routeParsedIntent(claudeParsed);

// Read Claude output and route it
async function processClaudeOutput() {
  try {
    const data = fs.readFileSync('claude_output.json', 'utf8');
    const claudeParsed = JSON.parse(data);
    
    console.log("📥 Received from Claude:", claudeParsed);
    await routeParsedIntent(claudeParsed);
  } catch (error) {
    console.error("❌ Error reading Claude output:", error);
  }
}

// Run the process
processClaudeOutput();
