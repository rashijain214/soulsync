"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, MessageCircle, Target, FileText, Sparkles, Shield, Lock } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen apple-hero">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 secure-nav apple-blur">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Brain className="w-8 h-8 security-accent" />
              <span className="text-xl font-bold security-accent">SoulSync</span>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#features" className="calm-text hover:text-blue-600 transition-colors font-medium">
                Features
              </Link>
              <Link href="#how-it-works" className="calm-text hover:text-blue-600 transition-colors font-medium">
                How it works
              </Link>
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-emerald-600" />
                <span className="text-sm font-medium text-emerald-600">Secure</span>
              </div>
              <Link href="/chat">
                <Button variant="outline" className="trust-border text-blue-700 hover:bg-blue-50 hover:border-blue-300">
                  Continue Chat
                </Button>
              </Link>
            </div>

            {/* Mobile Chat Button */}
            <div className="md:hidden">
              <Link href="/chat">
                <Button variant="outline" className="trust-border text-blue-700 hover:bg-blue-50 hover:border-blue-300">
                  Chat
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-32 px-6">
        <div className="container mx-auto text-center max-w-5xl">
          <div className="apple-animate-in">
            <div className="flex justify-center mb-8">
              <div className="trust-badge px-4 py-2 rounded-full flex items-center space-x-2">
                <Lock className="w-4 h-4" />
                <span className="text-sm font-semibold">Secure & Private AI Conversations</span>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-slate-800 leading-tight mb-8">
              Meet Your
              <br />
              <span className="apple-text-gradient">Future Self</span>
            </h1>
            
            <p className="text-lg md:text-2xl calm-text mb-12 max-w-3xl mx-auto leading-relaxed font-light">
              AI-powered conversations with your wiser, future self. Get personalized guidance 
              based on your experiences, goals, and aspirations in a <span className="text-blue-600 font-medium">secure environment</span>.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link href="/setup">
                <button className="apple-button text-lg px-8 py-4 relative z-10">
                  <span className="relative z-10">Start Your Journey</span>
                </button>
              </Link>
              <Link href="/chat">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="text-lg px-8 py-4 border-2 trust-border text-blue-700 hover:bg-blue-50 hover:border-blue-300 transition-all duration-300"
                >
                  Continue Conversation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-800 mb-6">
              Everything you need for
              <br />
              <span className="text-blue-600">meaningful conversations</span>
            </h2>
            <p className="text-lg md:text-xl calm-text max-w-2xl mx-auto font-light">
              Build your digital memory, engage in thoughtful dialogue, and receive personalized guidance 
              from your future self in a trusted environment.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="apple-card rounded-3xl p-8 text-center group">
              <div className="apple-icon mx-auto mb-6 group-hover:bg-blue-50">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-4">Build Your Memory</h3>
              <p className="calm-text leading-relaxed">
                Upload your resume, goals, and journal entries to create a comprehensive memory 
                profile that your future self can draw from.
              </p>
              <div className="mt-4 flex items-center justify-center space-x-2">
                <Shield className="w-4 h-4 text-emerald-500" />
                <span className="text-sm text-emerald-600 font-medium">Private & Secure</span>
              </div>
            </div>

            <div className="apple-card rounded-3xl p-8 text-center group">
              <div className="apple-icon mx-auto mb-6 group-hover:bg-blue-50">
                <MessageCircle className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-4">Meaningful Conversations</h3>
              <p className="calm-text leading-relaxed">
                Ask your future self anything — from career decisions to personal growth. 
                Get empathetic, strategic advice tailored to you.
              </p>
              <div className="mt-4 flex items-center justify-center space-x-2">
                <Sparkles className="w-4 h-4 text-blue-500" />
                <span className="text-sm text-blue-600 font-medium">AI-Powered Wisdom</span>
              </div>
            </div>

            <div className="apple-card rounded-3xl p-8 text-center group">
              <div className="apple-icon mx-auto mb-6 group-hover:bg-blue-50">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-4">Guided Growth</h3>
              <p className="calm-text leading-relaxed">
                Receive personalized insights and actionable guidance to help you navigate 
                life&apos;s challenges and achieve your goals.
              </p>
              <div className="mt-4 flex items-center justify-center space-x-2">
                <Target className="w-4 h-4 text-emerald-500" />
                <span className="text-sm text-emerald-600 font-medium">Goal-Oriented</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 px-6 bg-slate-50/50">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-800 mb-6">
              How <span className="text-blue-600">SoulSync</span> works
            </h2>
            <p className="text-lg md:text-xl calm-text max-w-2xl mx-auto font-light">
              Four simple steps to start having meaningful conversations with your future self 
              in a secure, trusted environment.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 md:gap-12">
            <div className="text-center">
              <div className="apple-step-indicator mx-auto mb-6">
                <span className="relative z-10">1</span>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-slate-800 mb-3">Share Your Story</h3>
              <p className="calm-text leading-relaxed">
                Upload your resume, goals, and journal entries to build your secure digital memory.
              </p>
            </div>

            <div className="text-center">
              <div className="apple-step-indicator mx-auto mb-6">
                <span className="relative z-10">2</span>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-slate-800 mb-3">AI Processing</h3>
              <p className="calm-text leading-relaxed">
                Our advanced AI analyzes your information and creates your future self persona.
              </p>
            </div>

            <div className="text-center">
              <div className="apple-step-indicator mx-auto mb-6">
                <span className="relative z-10">3</span>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-slate-800 mb-3">Ask Questions</h3>
              <p className="calm-text leading-relaxed">
                Start conversations with your future self about any topic or challenge.
              </p>
            </div>

            <div className="text-center">
              <div className="apple-step-indicator mx-auto mb-6">
                <span className="relative z-10">4</span>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-slate-800 mb-3">Get Guidance</h3>
              <p className="calm-text leading-relaxed">
                Receive personalized wisdom and actionable insights for your journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="apple-card rounded-3xl p-8 md:p-12 text-center">
            <div className="flex justify-center mb-6">
              <div className="trust-badge p-4 rounded-2xl">
                <Shield className="w-8 h-8 mx-auto" />
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-4">
              Privacy & Security First
            </h2>
            <p className="text-lg calm-text mb-8 max-w-2xl mx-auto leading-relaxed">
              Your conversations and personal data are encrypted and stored locally. 
              We never access, share, or sell your information. Your privacy is our priority.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-emerald-600" />
                <span className="text-sm font-medium text-emerald-600">End-to-end encryption</span>
              </div>
              <div className="flex items-center space-x-2">
                <Lock className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium text-blue-600">Local data storage</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-blue-50 to-slate-50">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
            Ready to meet your <span className="text-blue-600">future self</span>?
          </h2>
          <p className="text-lg md:text-xl calm-text mb-12 max-w-2xl mx-auto">
            Start your journey today and discover the wisdom that awaits you.
          </p>
          <Link href="/setup">
            <button className="apple-button text-lg px-8 py-4 relative z-10">
              <span className="relative z-10">Get Started Now</span>
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}