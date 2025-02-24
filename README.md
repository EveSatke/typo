# Typo - Test Your Typing Speed

A modern, web-based typing speed test application that helps users measure and improve their typing skills.

## Features

- Real-time typing speed measurement (WPM - Words Per Minute)
- Accuracy tracking
- Dynamic text fetching from Poetry API
- Test history tracking
- Personal best records
- Clean and intuitive interface

## Features in Detail

### Text Generation

- Primary source: Poetry API
- Fallback to default text if API unavailable
- Text sanitization for consistent testing

### Performance Metrics

- WPM calculation based on standard word length (5 characters)
- Real-time accuracy tracking
- Personal best tracking
- Historical results storage

### User Interface

- Clean, minimalist design
- Responsive layout
- Visual feedback for typing progress
- Animated cursor and word highlighting

## Technologies Used

- Vanilla JavaScript (ES6+)
- HTML5
- CSS3
- Poetry API for text generation

## How It Works

1. Start typing to begin the 60-second test
2. Real-time feedback on typing accuracy
3. Words are highlighted as you type
4. Results show:
   - Words per minute (WPM)
   - Accuracy percentage
   - Comparison with personal best

## Key Components

- Dynamic text window that moves as you type
- Real-time error highlighting
- Progress tracking
- Test history storage using localStorage
- Responsive modal for test results

## Getting Started

1. Clone the repository
2. Open `index.html` in your browser
3. Start typing to begin the test

## Controls

- `Enter` - Get new text
- `Escape` - Reset current test
- Click restart button or finish test to try again

## Project Structure

├── js/
│ ├── components/ # UI components
│ ├── modules/ # Core typing logic
│ ├── services/ # API and storage
│ └── utils/ # Helper functions
├── styles/ # CSS styling
├── index.html # Main entry point
└── README.md
