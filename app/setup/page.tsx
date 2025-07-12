"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Brain } from "lucide-react";
import Link from "next/link";

export default function Setup() {
  const router = useRouter();
  const [resume, setResume] = useState("");
  const [goals, setGoals] = useState("");
  const [journals, setJournals] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    
    // Save to localStorage
    const memoryProfile = {
      resume,
      goals,
      journals,
      createdAt: new Date().toISOString()
    };
    
    localStorage.setItem("soulSyncMemory", JSON.stringify(memoryProfile));
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsLoading(false);
    router.push("/chat");
  };

  const isFormComplete = resume.trim() && goals.trim() && journals.trim();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/">
            <Button variant="ghost" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
          <div className="flex items-center gap-2">
            <Brain className="w-6 h-6 text-indigo-600" />
            <span className="font-semibold text-gray-900">SoulSync</span>
          </div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Create Your <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Memory Profile</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Share your experiences, aspirations, and thoughts. This information helps create a more authentic conversation with your future self.
            </p>
          </div>

          <div className="grid gap-8">
            {/* Resume Section */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <span className="text-indigo-600 font-bold">1</span>
                  </div>
                  Professional Background
                </CardTitle>
                <CardDescription>
                  Share your resume, work experience, skills, and professional achievements. This helps your future self understand your career journey.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Paste your resume or describe your professional background, skills, education, and work experience..."
                  value={resume}
                  onChange={(e) => setResume(e.target.value)}
                  className="min-h-[120px] resize-none border-gray-200 focus:border-indigo-300 focus:ring-indigo-200"
                />
              </CardContent>
            </Card>

            {/* Goals Section */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <span className="text-purple-600 font-bold">2</span>
                  </div>
                  Goals & Aspirations
                </CardTitle>
                <CardDescription>
                  What are your short-term and long-term goals? Include career objectives, personal growth targets, and life aspirations.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Describe your goals, dreams, and aspirations. What do you want to achieve in the next 1-5 years?"
                  value={goals}
                  onChange={(e) => setGoals(e.target.value)}
                  className="min-h-[120px] resize-none border-gray-200 focus:border-purple-300 focus:ring-purple-200"
                />
              </CardContent>
            </Card>

            {/* Journals Section */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl">
                  <div className="w-8 h-8 bg-pink-100 rounded-lg flex items-center justify-center">
                    <span className="text-pink-600 font-bold">3</span>
                  </div>
                  Personal Reflections
                </CardTitle>
                <CardDescription>
                  Share your thoughts, journal entries, challenges you've faced, and lessons you've learned. This adds depth to your future self's wisdom.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Share your thoughts, journal entries, challenges, victories, and personal reflections..."
                  value={journals}
                  onChange={(e) => setJournals(e.target.value)}
                  className="min-h-[120px] resize-none border-gray-200 focus:border-pink-300 focus:ring-pink-200"
                />
              </CardContent>
            </Card>
          </div>

          {/* Save Button */}
          <div className="flex justify-center mt-12">
            <Button 
              onClick={handleSave}
              disabled={!isFormComplete || isLoading}
              size="lg"
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-12 py-3 text-lg"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Creating Your Future Self...
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Save className="w-5 h-5" />
                  Save & Continue to Chat
                </div>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}