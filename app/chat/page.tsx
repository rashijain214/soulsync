"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Send, Brain, User, Volume2, VolumeX, Shield } from "lucide-react";
import Link from "next/link";
import { formatMemoryProfile } from "@/lib/memory-formatter";

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [memoryProfile, setMemoryProfile] = useState<any>(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load memory profile from localStorage
    const savedMemory = localStorage.getItem("soulSyncMemory");
    if (savedMemory) {
      setMemoryProfile(JSON.parse(savedMemory));
    }

    // Load chat history
    const savedMessages = localStorage.getItem("soulSyncMessages");
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages).map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      })));
    } else {
      // Add welcome message
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        type: 'assistant',
        content: "Hello! I'm your future self — wiser, more experienced, and here to help guide you. I've been reflecting on everything you've shared about your journey so far. What would you like to talk about today?",
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    // Save messages to localStorage whenever they change
    if (messages.length > 0) {
      localStorage.setItem("soulSyncMessages", JSON.stringify(messages));
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage.content,
          memoryProfile: formatMemoryProfile(memoryProfile),
          conversationHistory: messages.slice(-10) // Last 10 messages for context
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: data.message,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const speakMessage = (text: string) => {
    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        return;
      }

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!memoryProfile) {
    return (
      <div className="min-h-screen apple-hero flex items-center justify-center">
        <div className="apple-card max-w-md mx-auto rounded-3xl p-8 text-center">
          <div className="apple-icon mx-auto mb-6">
            <Brain className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-4">No Memory Profile Found</h2>
          <p className="calm-text mb-8 leading-relaxed">
            You need to create your memory profile before you can chat with your future self.
          </p>
          <Link href="/setup">
            <button className="apple-button px-6 py-3 relative z-10">
              <span className="relative z-10">Create Memory Profile</span>
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen apple-hero">
      {/* Header */}
      <header className="sticky top-0 z-50 secure-nav apple-blur">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Button variant="ghost" className="flex items-center gap-2 calm-text hover:text-blue-600 transition-colors">
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <div className="apple-icon">
                <Brain className="w-5 h-5 text-blue-600" />
              </div>
              <div className="text-center">
                <h1 className="text-lg font-bold security-accent">Chat with Future Self</h1>
                <div className="flex items-center justify-center space-x-2">
                  <Shield className="w-3 h-3 text-emerald-600" />
                  <p className="text-xs text-emerald-600 font-medium">Secure & Private</p>
                </div>
              </div>
            </div>
            <Link href="/setup">
              <Button variant="outline" className="trust-border text-blue-700 hover:bg-blue-50 hover:border-blue-300">
                Update Memory
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Chat Container */}
      <div className="container mx-auto px-6 py-8 max-w-4xl">
        {/* Messages */}
        <div className="space-y-6 mb-8">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex items-start gap-4 max-w-[85%] ${message.type === 'user' ? 'flex-row-reverse' : ''}`}>
                {/* Avatar */}
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                  message.type === 'user' 
                    ? 'bg-slate-700' 
                    : 'bg-gradient-to-br from-blue-600 to-blue-700'
                }`}>
                  {message.type === 'user' ? (
                    <User className="w-5 h-5 text-white" />
                  ) : (
                    <Brain className="w-5 h-5 text-white" />
                  )}
                </div>

                {/* Message Content */}
                <div className={`flex-1 ${message.type === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`apple-card rounded-3xl p-6 ${
                    message.type === 'user' 
                      ? 'bg-gradient-to-br from-slate-700 to-slate-800 text-white border-slate-600' 
                      : 'bg-white text-slate-800'
                  }`}>
                    <p className="text-base leading-relaxed whitespace-pre-wrap">
                      {message.content}
                    </p>
                    
                    {/* Timestamp and Actions */}
                    <div className={`flex items-center gap-2 mt-4 ${
                      message.type === 'user' ? 'justify-end' : 'justify-between'
                    }`}>
                      <time className={`text-xs ${
                        message.type === 'user' ? 'text-slate-300' : 'text-slate-500'
                      }`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </time>
                      
                      {message.type === 'assistant' && (
                        <button
                          onClick={() => speakMessage(message.content)}
                          className="p-1 rounded-full hover:bg-blue-50 transition-colors"
                        >
                          {isSpeaking ? (
                            <VolumeX className="w-4 h-4 text-blue-600" />
                          ) : (
                            <Volume2 className="w-4 h-4 text-blue-600" />
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex items-start gap-4 max-w-[85%]">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <div className="apple-card rounded-3xl p-6 bg-white">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                    <span className="text-sm calm-text ml-2">Your future self is thinking...</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <div className="sticky bottom-0 z-40 secure-nav apple-blur px-6 py-4 -mx-6 rounded-2xl">
          <div className="flex gap-4 items-end">
            <div className="flex-1">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask your future self anything..."
                className="min-h-[60px] max-h-[120px] resize-none trust-border focus:border-blue-500 focus:ring-blue-500 rounded-2xl px-4 py-3 text-base bg-white/90"
                disabled={isLoading}
              />
            </div>
            <Button
              onClick={sendMessage}
              disabled={!input.trim() || isLoading}
              className="apple-button w-12 h-12 rounded-full p-0 flex items-center justify-center"
            >
              <Send className="w-5 h-5 text-white" />
            </Button>
          </div>
          
          {/* Security Note */}
          <div className="flex items-center justify-center mt-3 space-x-2">
            <Shield className="w-3 h-3 text-emerald-600" />
            <span className="text-xs text-emerald-600 font-medium">Your conversations are private and secure</span>
          </div>
        </div>
      </div>
    </div>
  );
}