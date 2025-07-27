# Study Buddy

An AI-powered lecture summarizer that helps students understand complex topics by providing summaries, explanations, and interactive quiz questions.

## Features

- **Lecture Summarization**: Upload lecture images or paste text content
- **Concept Explanations**: Get detailed explanations of difficult concepts
- **Real-world Examples**: Understand concepts through practical applications
- **Interactive Quizzes**: Test your knowledge with multiple-choice questions
- **Image Support**: Upload lecture slides, notes, or diagrams for analysis

## Prerequisites

- Node.js (version 14 or higher)
- npm or yarn
- Google Gemini API key

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd study-buddy
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
   - Create a `.env` file in the root directory
   - Add your Google Gemini API key:
```
REACT_APP_GEMINI_API_KEY=your_api_key_here
```

## Running the Project

### Development Mode
```bash
npm start
```
Open [http://localhost:3000](http://localhost:3000) to view the app in your browser.

### Production Build
```bash
npm run build
```
This creates an optimized production build in the `build` folder.

## Usage

1. **Text Input Mode**: Paste your lecture text content
2. **Image Upload Mode**: Upload lecture slides, notes, or diagrams
3. Click "Summarize Lecture" to generate:
   - Summary of the content
   - Explanations of difficult concepts
   - Real-world examples
   - Interactive quiz questions
4. Answer quiz questions to test your understanding
5. Generate more questions if needed

## Technologies Used

- React.js
- Tailwind CSS
- Google Gemini AI API
- Lottie animations

## Project Structure

```
src/
├── components/          # React components
├── hooks/              # Custom React hooks
├── services/           # API services
├── utils/              # Utility functions
├── constants/          # App constants
├── styles/             # Global styles
└── assets/             # Images and animations
```

