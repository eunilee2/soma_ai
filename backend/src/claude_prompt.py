import anthropic

client = anthropic.Anthropic(
    # defaults to os.environ.get("ANTHROPIC_API_KEY")
    # api_key="ANTHROPIC_API_KEY"  # Replace with your actual API key
)

# Replace placeholders like {{USER_MESSAGE}} with real values,
# because the SDK does not support variables.
message = client.messages.create(
    model="claude-sonnet-4-20250514",
    max_tokens=20000,
    temperature=1,
    messages=[
        {
            "role": "user",
            "content": [
                {
                    "type": "text",
                    "text": "You are a scheduling assistant for a healthcare provider. Your task is to extract structured information from a user's message and format it as JSON. Here's the user's message:\n\n<user_message>\n{{USER_MESSAGE}}\n</user_message>\n\nCarefully analyze the user's message and extract the following information:\n\n1. intent: Determine the primary purpose of the message (e.g., \"schedule_appointment\", \"cancel_appointment\", \"check_insurance\", \"reschedule\")\n2. doctor_name: Extract the name of the doctor if mentioned\n3. specialty: Identify any medical specialty mentioned\n4. symptoms: Note any symptoms or health concerns described\n5. preferred_time: Capture any preferred appointment time or date\n6. location: Extract any mentioned location for the appointment\n7. returning_patient: Determine if the user is a returning patient (true) or new patient (false)\n8. needs_insurance_verification: Assess if insurance verification is needed (true) or not (false)\n9. additional_notes: Include any other relevant information not covered by the above fields\n\nIf you cannot confidently extract information for any field, set its value to null. For the \"returning_patient\" and \"needs_insurance_verification\" fields, use a boolean value (true or false) based on the information provided or implied in the message.\n\nFormat your response as a JSON object with the following structure:\n\n<output>\n{\n  \"intent\": string,\n  \"doctor_name\": string or null,\n  \"specialty\": string or null,\n  \"symptoms\": string or null,\n  \"preferred_time\": string or null,\n  \"location\": string or null,\n  \"returning_patient\": boolean,\n  \"needs_insurance_verification\": boolean,\n  \"additional_notes\": string or null\n}\n</output>\n\nEnsure that your response contains only the JSON object, with no additional text or explanations."
                }
            ]
        }
    ]
)
print(message.content)