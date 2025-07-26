// server.js
// Optional backend to support patient info, Claude parsing, OneRecord integration, and event history storage

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

// 🧠 Route: Receive user input and call Claude (pseudo-code)
app.post('/parse', async (req, res) => {
  const { message } = req.body;
  // TODO: call Claude API with system prompt and message
  const claudeParsed = await mockClaudeParse(message); // replace with real call
  res.json(claudeParsed);
});

// 🩺 Route: Retrieve patient info from OneRecord (mocked)
app.get('/patient/:id', async (req, res) => {
  const { id } = req.params;
  // TODO: call OneRecord API securely using OAuth + FHIR
  const patientInfo = await mockFetchOneRecordData(id);
  res.json(patientInfo);
});

// 💾 Route: Log appointment metadata (optional)
app.post('/appointments', async (req, res) => {
  const appointment = req.body;
  console.log('📅 Saving appointment metadata:', appointment);
  // TODO: save to database
  res.status(200).send('Saved');
});

// 🧪 Mock helpers
async function mockClaudeParse(message) {
  return {
    intent: "schedule_appointment",
    specialty: "neurology",
    symptoms: "migraines",
    preferred_time: "next Monday morning",
    returning_patient: true,
    doctor_name: null,
    user_email: "user@example.com",
    patient_id: "1234",
    needs_insurance_verification: true
  };
}

async function mockFetchOneRecordData(patientId) {
  return {
    name: "Jane Doe",
    insurance: {
      provider: "Aetna",
      plan: "PPO 2025",
      memberId: "12345678"
    },
    doctors: [
      { id: "d1", name: "Dr. Lee", specialty: "neurology", email: "dr.lee@clinic.com" }
    ]
  };
}

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});