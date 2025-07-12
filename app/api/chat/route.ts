import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

export async function POST(request: NextRequest) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenRouter API key not configured. Please add OPENAI_API_KEY to your .env.local file.' },
        { status: 500 }
      );
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      baseURL: 'https://openrouter.ai/api/v1',
      defaultHeaders: {
        'HTTP-Referer': process.env.NODE_ENV === 'production' 
          ? 'https://soulsync-rashijain214.vercel.app' 
          : 'http://localhost:3000',
        'X-Title': 'SoulSync',
      },
    });

    const { message, memoryProfile, conversationHistory } = await request.json();

    // Build conversation context
    const systemPrompt = `You are the user's wiser, more experienced future self - specifically, you are them 5 years from now. You have successfully navigated many of the challenges they currently face and have gained valuable perspective and wisdom.

MEMORY PROFILE:
${memoryProfile}

PERSONALITY & TONE:
- Speak as if you are literally them, but older and wiser
- Be warm, empathetic, and understanding of their current struggles
- Share insights as if from personal experience ("When I was in your position..." or "What I learned after going through that...")
- Be encouraging but realistic
- Offer specific, actionable advice when appropriate
- Reference their specific experiences, goals, and background from the memory profile
- Maintain the same core personality but with added maturity and perspective

GUIDELINES:
- Keep responses conversational and personal, as if talking to a close friend
- Draw connections between their current situation and their stated goals
- Share "memories" of overcoming similar challenges
- Be supportive but don't sugarcoat difficult truths
- Focus on growth, learning, and practical next steps
- Reference specific details from their memory profile to make responses feel authentic
- Limit responses to 2-3 paragraphs to maintain conversational flow`;

    // Format conversation history for API
    const messages = [
      { role: 'system' as const, content: systemPrompt },
      ...conversationHistory.map((msg: any) => ({
        role: msg.type === 'user' ? 'user' as const : 'assistant' as const,
        content: msg.content
      })),
      { role: 'user' as const, content: message }
    ];

    const completion = await openai.chat.completions.create({
      model: 'mistralai/devstral-small',
      messages,
      max_tokens: 500,
      temperature: 0.7,
      presence_penalty: 0.1,
      frequency_penalty: 0.1,
    });

    const assistantMessage = completion.choices[0]?.message?.content;

    if (!assistantMessage) {
      throw new Error('No response generated');
    }

    return NextResponse.json({ message: assistantMessage });

  } catch (error) {
    console.error('OpenAI API error:', error);
    
    // Return a fallback response instead of an error
    const fallbackResponse = "I'm having trouble connecting right now, but I want you to know that whatever you're facing, you have the strength to work through it. Every challenge you encounter is helping you grow into the person you're meant to become. Take a deep breath, trust in your abilities, and remember that this too shall pass. Try asking me again in a moment.";
    
    return NextResponse.json({ message: fallbackResponse });
  }
}