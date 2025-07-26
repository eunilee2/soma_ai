import anthropic
import os
from dotenv import load_dotenv

load_dotenv()

client = anthropic.Anthropic(
    api_key=os.getenv("ANTHROPIC_API_KEY")
)

user_message = "I would like to schedule an appointment with Dr. Smith next week for a check-up. I have been experiencing some headaches and would prefer a morning slot if possible. Also, I am a returning patient and my insurance needs verification."

# Replace the placeholder with actual user message
prompt_text = """You are a scheduling assistant for a healthcare provider. Your task is to extract structured information from a user's message and format it as JSON. Here's the user's message:

<user_message>
{user_message}
</user_message>

Carefully analyze the user's message and extract the following information:

1. intent: Determine the primary purpose of the message (e.g., "schedule_appointment", "cancel_appointment", "check_insurance", "reschedule")
2. doctor_name: Extract the name of the doctor if mentioned
3. specialty: Identify any medical specialty mentioned
4. symptoms: Note any symptoms or health concerns described
5. preferred_time: Capture any preferred appointment time or date
6. location: Extract any mentioned location for the appointment
7. returning_patient: Determine if the user is a returning patient (true) or new patient (false)
8. needs_insurance_verification: Assess if insurance verification is needed (true) or not (false)
9. additional_notes: Include any other relevant information not covered by the above fields

If you cannot confidently extract information for any field, set its value to null. For the "returning_patient" and "needs_insurance_verification" fields, use a boolean value (true or false) based on the information provided or implied in the message.

Format your response as a JSON object with the following structure:

<output>
{{
  "intent": string,
  "doctor_name": string or null,
  "specialty": string or null,
  "symptoms": string or null,
  "preferred_time": string or null,
  "location": string or null,
  "returning_patient": boolean,
  "needs_insurance_verification": boolean,
  "additional_notes": string or null
}}
</output>

Ensure that your response contains only the JSON object, with no additional text or explanations.""".format(user_message=user_message)

# Replace placeholders like {{USER_MESSAGE}} with real values,
# because the SDK does not support variables.
message = client.messages.create(
    model="claude-3-5-sonnet-20241022",  # Updated to correct model name
    max_tokens=1000,
    temperature=0.1,
    messages=[
        {
            "role": "user",
            "content": prompt_text
        }
    ]
)
print(message.content[0].text)