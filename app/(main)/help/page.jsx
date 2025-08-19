"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { 
  BookOpen, 
  CreditCard, 
  Mic, 
  BarChart3, 
  RefreshCw,
  Code,
  TrendingUp,
  Palette,
  Heart,
  GraduationCap,
  Calculator,
  PlayCircle,
  ArrowRight,
  ExternalLink
} from "lucide-react";
import Link from "next/link";

const HelpPage = () => {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState("getting-started");

  // Check for tab parameter in URL and set active tab
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  const tabs = [
    { id: "getting-started", label: "Getting Started", mobileLabel: "Start", icon: BookOpen },
    { id: "industries", label: "Industry Examples", mobileLabel: "Examples", icon: Code },
    { id: "interview-tips", label: "Interview Tips", mobileLabel: "Tips", icon: Mic },
    { id: "feedback", label: "Understanding Feedback", mobileLabel: "Feedback", icon: BarChart3 },
    { id: "best-practices", label: "Best Practices", mobileLabel: "Strategies", icon: RefreshCw }
  ];

  const industries = [
    { id: "tech", name: "Tech", icon: Code, color: "text-blue-600" },
    { id: "sales", name: "Sales", icon: TrendingUp, color: "text-green-600" },
    { id: "marketing", name: "Marketing", icon: Palette, color: "text-purple-600" },
    { id: "healthcare", name: "Healthcare", icon: Heart, color: "text-red-600" },
    { id: "education", name: "Education", icon: GraduationCap, color: "text-orange-600" },
    { id: "finance", name: "Finance", icon: Calculator, color: "text-emerald-600" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            RoleCall Help & Tutorial
          </h1>
          <p className="text-muted-foreground">
            Learn how to master AI-powered mock interviews and improve your interview skills
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Link 
            href="/dashboard/create-interview"
            className="bg-primary text-primary-foreground p-6 rounded-lg hover:bg-primary/90 transition-colors group"
          >
            <PlayCircle className="w-8 h-8 mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="font-semibold mb-1">Create Your First Interview</h3>
            <p className="text-sm opacity-90">Start practicing right now</p>
          </Link>
          
          <button 
            onClick={() => setActiveTab("industries")}
            className="bg-secondary text-secondary-foreground p-6 rounded-lg hover:bg-secondary/80 hover:shadow-md transition-all duration-200 group border text-left cursor-pointer transform hover:scale-[1.02]"
          >
            <div className="flex items-center justify-between mb-3">
              <Code className="w-8 h-8 group-hover:scale-110 transition-transform text-primary" />
              <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">Choose Your Industry</h3>
            <p className="text-sm text-muted-foreground">See tailored examples</p>
          </button>
          
          <button 
            onClick={() => setActiveTab("interview-tips")}
            className="bg-secondary text-secondary-foreground p-6 rounded-lg hover:bg-secondary/80 hover:shadow-md transition-all duration-200 group border text-left cursor-pointer transform hover:scale-[1.02]"
          >
            <div className="flex items-center justify-between mb-3">
              <Mic className="w-8 h-8 group-hover:scale-110 transition-transform text-primary" />
              <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </div>
            <h3 className="font-semibold mb-1 group-hover:text-primary transition-colors">Interview Best Practices</h3>
            <p className="text-sm text-muted-foreground">Tips for success</p>
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="border-b border-border mb-8">
          <nav className="flex space-x-1 md:space-x-8 overflow-x-auto pb-px" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}}>
            {tabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex flex-col md:flex-row items-center gap-1 md:gap-2 py-2 md:py-4 px-2 md:px-1 border-b-2 font-medium text-xs md:text-sm transition-colors whitespace-nowrap flex-shrink-0 min-w-0 ${
                    activeTab === tab.id
                      ? "border-primary text-primary"
                      : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                  }`}
                  title={tab.label} // Add tooltip for mobile users
                >
                  <IconComponent className="w-4 h-4 md:w-4 md:h-4" />
                  <span className="hidden md:inline">{tab.label}</span>
                  <span className="md:hidden text-xs leading-tight text-center">
                    {tab.mobileLabel}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="prose prose-gray dark:prose-invert max-w-none">
          {activeTab === "getting-started" && (
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-bold mb-4">🚀 Getting Started</h2>
                
                <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-6">
                  <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">
                    What You'll Learn
                  </h3>
                  <ul className="text-blue-800 dark:text-blue-200 space-y-1">
                    <li>✅ Create your RoleCall account</li>
                    <li>✅ Set up your first mock interview</li>
                    <li>✅ Complete an AI-powered voice interview</li>
                    <li>✅ Receive detailed feedback and recommendations</li>
                  </ul>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-secondary rounded-lg p-6 border">
                    <h3 className="font-semibold mb-3">Step 1: Create Your Interview</h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      Fill out job details and let our AI generate personalized questions for your role. You have 3 free credits to start practicing.
                    </p>
                    <Link 
                      href="/dashboard/create-interview"
                      className="inline-flex items-center gap-2 text-primary hover:text-primary/80 text-sm font-medium"
                    >
                      Create Interview
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>

                  <div className="bg-secondary rounded-lg p-6 border">
                    <h3 className="font-semibold mb-3">Step 2: Take Voice Interview</h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      Complete your AI-powered voice interview and practice answering questions in real-time.
                    </p>
                    <Link 
                      href="/dashboard"
                      className="inline-flex items-center gap-2 text-primary hover:text-primary/80 text-sm font-medium"
                    >
                      View Dashboard
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </section>

              <section>
                <h3 className="text-xl font-semibold mb-4">💳 Understanding Credits</h3>
                <div className="bg-secondary rounded-lg p-6 border">
                  <ul className="space-y-2 text-sm">
                    <li>• New users start with <strong>3 free credits</strong></li>
                    <li>• Each interview costs <strong>1 credit</strong></li>
                    <li>• Purchase additional credits: 5 and 12 credit packages available</li>
                    <li>• Credits never expire</li>
                  </ul>
                </div>
              </section>
            </div>
          )}

          {activeTab === "industries" && (
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-bold mb-4">🌟 Industry Examples</h2>
                <p className="text-muted-foreground mb-6">
                  RoleCall adapts to your specific industry. Choose your field to see tailored examples:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {industries.map((industry) => {
                    const IconComponent = industry.icon;
                    return (
                      <div key={industry.id} className="bg-secondary rounded-lg p-6 border">
                        <div className="flex items-center gap-3 mb-4">
                          <div className={`p-2 rounded-lg bg-background ${industry.color}`}>
                            <IconComponent className="w-5 h-5" />
                          </div>
                          <h3 className="font-semibold">{industry.name}</h3>
                        </div>
                        
                        {industry.id === "tech" && (
                          <div className="space-y-3 text-sm">
                            <div>
                              <p className="font-medium mb-1">Sample Questions:</p>
                              <ul className="text-muted-foreground space-y-1">
                                <li>• "Explain React hooks and state management"</li>
                                <li>• "How do you optimize application performance?"</li>
                              </ul>
                            </div>
                            <div>
                              <p className="font-medium mb-1">Interview Types:</p>
                              <p className="text-muted-foreground">Technical, Problem Solving, System Design</p>
                            </div>
                          </div>
                        )}

                        {industry.id === "sales" && (
                          <div className="space-y-3 text-sm">
                            <div>
                              <p className="font-medium mb-1">Sample Questions:</p>
                              <ul className="text-muted-foreground space-y-1">
                                <li>• "Walk me through your sales process"</li>
                                <li>• "How do you handle difficult objections?"</li>
                              </ul>
                            </div>
                            <div>
                              <p className="font-medium mb-1">Interview Types:</p>
                              <p className="text-muted-foreground">Behavioral, Experience, Problem Solving</p>
                            </div>
                          </div>
                        )}

                        {industry.id === "marketing" && (
                          <div className="space-y-3 text-sm">
                            <div>
                              <p className="font-medium mb-1">Sample Questions:</p>
                              <ul className="text-muted-foreground space-y-1">
                                <li>• "How do you measure campaign ROI?"</li>
                                <li>• "Describe your A/B testing approach"</li>
                              </ul>
                            </div>
                            <div>
                              <p className="font-medium mb-1">Interview Types:</p>
                              <p className="text-muted-foreground">Technical, Behavioral, Experience</p>
                            </div>
                          </div>
                        )}

                        {industry.id === "healthcare" && (
                          <div className="space-y-3 text-sm">
                            <div>
                              <p className="font-medium mb-1">Sample Questions:</p>
                              <ul className="text-muted-foreground space-y-1">
                                <li>• "How do you prioritize patient care?"</li>
                                <li>• "Describe your approach to patient advocacy"</li>
                              </ul>
                            </div>
                            <div>
                              <p className="font-medium mb-1">Interview Types:</p>
                              <p className="text-muted-foreground">Behavioral, Experience, Problem Solving</p>
                            </div>
                          </div>
                        )}

                        {industry.id === "education" && (
                          <div className="space-y-3 text-sm">
                            <div>
                              <p className="font-medium mb-1">Sample Questions:</p>
                              <ul className="text-muted-foreground space-y-1">
                                <li>• "How do you handle diverse learning styles?"</li>
                                <li>• "Describe your classroom management strategy"</li>
                              </ul>
                            </div>
                            <div>
                              <p className="font-medium mb-1">Interview Types:</p>
                              <p className="text-muted-foreground">Behavioral, Experience, Leadership</p>
                            </div>
                          </div>
                        )}

                        {industry.id === "finance" && (
                          <div className="space-y-3 text-sm">
                            <div>
                              <p className="font-medium mb-1">Sample Questions:</p>
                              <ul className="text-muted-foreground space-y-1">
                                <li>• "Explain your financial modeling approach"</li>
                                <li>• "How do you analyze investment risks?"</li>
                              </ul>
                            </div>
                            <div>
                              <p className="font-medium mb-1">Interview Types:</p>
                              <p className="text-muted-foreground">Technical, Problem Solving, Experience</p>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            </div>
          )}

          {activeTab === "interview-tips" && (
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-bold mb-4">🎤 Interview Tips & Best Practices</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
                      <h3 className="font-semibold text-green-900 dark:text-green-100 mb-3">
                        🎯 Speaking Tips
                      </h3>
                      <ul className="text-green-800 dark:text-green-200 space-y-2 text-sm">
                        <li>• Speak clearly and at a normal pace</li>
                        <li>• Pause briefly after each answer</li>
                        <li>• Use the mute button for coughs or sips</li>
                        <li>• Don't end the interview early unless certain</li>
                      </ul>
                    </div>

                    <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
                      <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-3">
                        📝 STAR Method
                      </h3>
                      <ul className="text-blue-800 dark:text-blue-200 space-y-2 text-sm">
                        <li><strong>Situation:</strong> Set the context</li>
                        <li><strong>Task:</strong> Explain what needed to be done</li>
                        <li><strong>Action:</strong> Describe what you did</li>
                        <li><strong>Result:</strong> Share the outcome</li>
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 rounded-lg p-6">
                      <h3 className="font-semibold text-orange-900 dark:text-orange-100 mb-3">
                        ⚠️ Common Mistakes
                      </h3>
                      <ul className="text-orange-800 dark:text-orange-200 space-y-2 text-sm">
                        <li>• Saying "um" excessively</li>
                        <li>• Giving one-word answers</li>
                        <li>• Interrupting the AI interviewer</li>
                        <li>• Not providing specific examples</li>
                      </ul>
                    </div>

                    <div className="bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 rounded-lg p-6">
                      <h3 className="font-semibold text-purple-900 dark:text-purple-100 mb-3">
                        🔧 Technical Setup
                      </h3>
                      <ul className="text-purple-800 dark:text-purple-200 space-y-2 text-sm">
                        <li>• Use headphones for better audio</li>
                        <li>• Find a quiet space</li>
                        <li>• Test microphone permissions</li>
                        <li>• Close unnecessary browser tabs</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          )}

          {activeTab === "feedback" && (
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-bold mb-4">📊 Understanding Your Feedback</h2>
                
                <div className="bg-secondary rounded-lg p-6 border mb-6">
                  <h3 className="font-semibold mb-3">RoleCall uses a 1-10 scale across 6 dimensions:</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-blue-600">🔧 Technical Skills (1-10)</h4>
                        <p className="text-sm text-muted-foreground">Job-specific knowledge and expertise</p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-green-600">💬 Communication (1-10)</h4>
                        <p className="text-sm text-muted-foreground">Clarity, structure, listening skills</p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-purple-600">🧩 Problem Solving (1-10)</h4>
                        <p className="text-sm text-muted-foreground">Analytical thinking and approach</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium text-orange-600">💼 Experience (1-10)</h4>
                        <p className="text-sm text-muted-foreground">Relevant background and impact</p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-red-600">👑 Leadership (1-10)</h4>
                        <p className="text-sm text-muted-foreground">Influence, teamwork, initiative</p>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-600">🎯 Overall (1-10)</h4>
                        <p className="text-sm text-muted-foreground">Comprehensive assessment</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                    <h4 className="font-semibold text-red-900 dark:text-red-100 mb-2">1-4: Needs Improvement</h4>
                    <ul className="text-red-800 dark:text-red-200 text-sm space-y-1">
                      <li>• Study fundamentals</li>
                      <li>• Practice basic questions</li>
                      <li>• Work on clarity</li>
                    </ul>
                  </div>
                  
                  <div className="bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
                    <h4 className="font-semibold text-orange-900 dark:text-orange-100 mb-2">5-6: Average</h4>
                    <ul className="text-orange-800 dark:text-orange-200 text-sm space-y-1">
                      <li>• Add specific examples</li>
                      <li>• Quantify achievements</li>
                      <li>• Practice storytelling</li>
                    </ul>
                  </div>
                  
                  <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                    <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">7-8: Strong</h4>
                    <ul className="text-green-800 dark:text-green-200 text-sm space-y-1">
                      <li>• Add technical depth</li>
                      <li>• Include leadership</li>
                      <li>• Show business impact</li>
                    </ul>
                  </div>
                  
                  <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">9-10: Excellent</h4>
                    <ul className="text-blue-800 dark:text-blue-200 text-sm space-y-1">
                      <li>• Maintain level</li>
                      <li>• Show mentoring</li>
                      <li>• Strategic thinking</li>
                    </ul>
                  </div>
                </div>
              </section>
            </div>
          )}

          {activeTab === "best-practices" && (
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-bold mb-4">🔄 Best Practices & Next Steps</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <div className="bg-secondary rounded-lg p-6 border">
                      <h3 className="font-semibold mb-3">📈 Track Your Progress</h3>
                      <ul className="text-muted-foreground space-y-2 text-sm">
                        <li>• Review all interviews in "Interview Results"</li>
                        <li>• Compare scores over time</li>
                        <li>• Focus on consistently weak areas</li>
                        <li>• Celebrate improvements</li>
                      </ul>
                    </div>

                    <div className="bg-secondary rounded-lg p-6 border">
                      <h3 className="font-semibold mb-3">🎯 Practice Strategies</h3>
                      <ul className="text-muted-foreground space-y-2 text-sm">
                        <li>• Same role, different questions for consistency</li>
                        <li>• Different interview types for variety</li>
                        <li>• Longer durations for senior roles</li>
                        <li>• Different industries for versatility</li>
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-secondary rounded-lg p-6 border">
                      <h3 className="font-semibold mb-3">🛠️ Technical Troubleshooting</h3>
                      <ul className="text-muted-foreground space-y-2 text-sm">
                        <li>• <strong>Microphone issues:</strong> Check browser permissions</li>
                        <li>• <strong>Poor audio:</strong> Use headphones, quiet space</li>
                        <li>• <strong>AI not responding:</strong> Wait, speak clearly</li>
                        <li>• <strong>Page issues:</strong> Refresh, progress is saved</li>
                      </ul>
                    </div>

                    <div className="bg-secondary rounded-lg p-6 border">
                      <h3 className="font-semibold mb-3">💡 Pro Tips</h3>
                      <ul className="text-muted-foreground space-y-2 text-sm">
                        <li>• Practice during different times of day</li>
                        <li>• Record yourself separately for review</li>
                        <li>• Research company-specific questions</li>
                        <li>• Practice with friends or colleagues</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div className="mt-12 bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-lg border border-primary/20 p-8 text-center">
          <h3 className="text-xl font-semibold mb-2">Ready to Start Practicing? 🚀</h3>
          <p className="text-muted-foreground mb-6">
            Create your first AI-powered mock interview and start improving your skills today.
          </p>
          <Link 
            href="/dashboard/create-interview"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            <PlayCircle className="w-5 h-5" />
            Create Your First Interview
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HelpPage;