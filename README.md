# SoulSync - AI-Powered Future Self Conversations

SoulSync is an innovative web application that enables users to have meaningful conversations with their future selves using AI. By combining personal memories, goals, and experiences, the app creates an authentic dialogue experience that provides guidance and wisdom.

https://soulsync-90cbg26qv-rjs-projects-185b3f2f.vercel.app

## Features

- **Memory Profile Creation**: Upload resume, goals, and journal entries to build a comprehensive personal profile
- **AI-Powered Conversations**: Chat with your future self using GPT-4 for personalized guidance
- **Real-time Chat Interface**: Smooth, responsive chat experience with message history
- **Voice Synthesis**: Optional text-to-speech for spoken responses
- **Responsive Design**: Beautiful, mobile-first interface built with Tailwind CSS
- **Local Storage**: Persistent memory profiles and conversation history

## Tech Stack

- **Frontend**: Next.js 13+ with App Router, React, TypeScript
- **Styling**: Tailwind CSS with shadcn/ui components
- **AI**: OpenAI GPT-4 API
- **Storage**: Browser localStorage for demo purposes
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18+ 
- OpenAI API key
- (Optional) ElevenLabs API key for voice synthesis

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd soulsync
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env.local
   ```
   
   Add your API keys to `.env.local`:
   ```
   OPENAI_API_KEY=your_openai_api_key_here
   ELEVENLABS_API_KEY=your_elevenlabs_api_key_here
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. **Create Memory Profile**: Start by sharing your resume, goals, and personal reflections on the setup page
2. **Start Chatting**: Navigate to the chat interface and begin your conversation with your future self
3. **Get Guidance**: Ask questions about career decisions, personal growth, or any challenges you're facing
4. **Listen to Responses**: Use the voice synthesis feature to hear your future self's advice

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

## API Endpoints

- `POST /api/chat` - Send messages and receive AI responses
- `POST /api/voice` - (Optional) Generate voice synthesis

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

For questions or support, please open an issue in the GitHub repository.
