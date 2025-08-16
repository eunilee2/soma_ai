# soma_ai

A 6?-hour (9:30AM to 7:00PM but actually used up less time) hackathon building semi-autonomous AI solutions.
Front end by Brenda \
Backend + AI integration by Eunice \

We built a new way of automating scheduling (and hopefully insurance in the future!) between patients and small family practice clinics. 
## But why is this an issue?
Zed Williamson found in a 2023 study that "7,000 calls across 22 practices in 18 states... on average, medical practices miss a staggering 42 percent of incoming calls during business hours"(from https://www.linkedin.com/pulse/shocking-truth-missed-calls-medical-practices-zed-williamson-lzxoc/). That’s nearly half of all patient calls going unanswered, which is a huge problem, especially for small clinics.

Heading into 2026, with looming Medicaid and Medicare cuts, small practices can’t afford to keep missing these touchpoints. Every missed call could mean a patient going elsewhere, a delay in care, or a loss in revenue. All of this adds up fast.

For smaller clinics with limited staff, the way scheduling is handled plays a big role in patient experience. If it’s hard to get through, patients may give up. That’s why things like smarter phone systems, online booking, or even AI-powered schedulers aren’t just “nice-to-haves”; they’re becoming essential tools to help clinics stay afloat and serve their communities better.

## The solution?
An automated scheduling system that uses VoIP technology to answer patient calls, handle scheduling, and reduce the number of missed calls especially during busy clinic hours.

Instead of leaving patients stuck in phone queues or voicemail loops, our system picks up, understands the patient’s intent (like booking or rescheduling), and gets it done **automatically**. No apps, no portals, just a regular phone call.

It’s designed for small clinics that might not have a full-time receptionist or can’t afford fancy call centers. With tools like AI voice agents, EHR access, and calendar integrations, it acts like a smart front desk, helping patients get care faster and helping clinics stay efficient.

## Limitations and Future Work
Given the limited time of the hackathon, our team didn't fully complete the project to the extent we wished for. Work still remains in connecting insurance (which has quite of bit of red tape!) and EHR records (even more red tape!) and others. However, we did accomplish building: 
* VoIP user request intake
* System prompting
* GCal + Gmail integration
* and more

quickstart guide
1. start the flask server that's hosting Anthropic API in order to access Claude
   '''
   python3 backend/src/claude_prompt.py
   '''
   if you run across port issues, make sure to kill any processes using that port.
   if the port continues to be used (and you're using mac with airreciever turned on) turn off airreciever.
2. then start up the front end! in a new terminal ofc
   '''
   python3 -m http.server 8000
   '''

