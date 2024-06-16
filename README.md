# Recall AI Demo Application

This is a Next.js application developed to showcase the capabilities of the Recall AI APIs. The app demonstrates a simple user flow where users can invite a bot to join a call using a URL and an API key, interact with the call, and then retrieve processed data including a video recording, transcript, and AI-generated summary.

## Features

- **Join Call**: Users can enter a meeting URL and an API key to send a bot to a call.
- **Leave Call**: Users can disconnect the bot from the call.
- **Data Retrieval**: Post-call, the application provides a video recording, the call's transcript, and an AI-generated summary.

## Technologies Used

- **Next.js**
- **TypeScript**
- **Tailwind CSS**
- **Recall AI APIs**: Utilized for processing and analyzing call data.

## Recall AI's APIs Used

- `/bot`: Makes bot join the call for analysis and processing.
- `/leave-call`: Forces bot to leave the call.
- `/analyze`: Starts a analysis job which is essential for /intelligence.
- `/intelligence`: Fetches an AI-generated summary of the call.
- `/transcript`: Retrieves the transcription of the call.

## Getting Started

### Prerequisites

- Node.js
- npm (Node Package Manager)

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/jackretterer/recallAIExample.git
cd recall
npm install
```

## Running the Application
Start the development server:
```
npm run dev
```

You can view the web application by navigating to http://localhost:3000 in your browser.

## Future Enhancements
- Enhance UI/UX design for a more engaging, responsive and accurate user experience.
- Implement additional API features.
- Increase the robustness of error handling and data validation.
- Probably not have the user input an API-Key. Also wouldn't want to pass that API key across the application. Better to save in process.env. 