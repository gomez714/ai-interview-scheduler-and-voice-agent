
"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useSimpleAuth } from "@/hooks/useSimpleAuth";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  ArrowRight, 
  Bot, 
  Clock, 
  Shield, 
  Star, 
  Zap,
  CheckCircle,
  Play,
  MessageSquare,
  BarChart3,
  Sparkles,
  Target,
  TrendingUp,
  Brain,
  Award,
  GraduationCap,
  Mic,
  BookOpen,
  Trophy,
  Users,
  ChevronRight
} from "lucide-react";
import logo from "@/public/rolecall-logo-blue.png";

export default function Home() {
  const { user, loading } = useSimpleAuth();
  const router = useRouter();

  // Redirect to dashboard if user is authenticated
  useEffect(() => {
    if (!loading && user) {
      router.replace('/dashboard');
    }
  }, [user, loading, router]);

  // Show loading state while checking authentication
  if (loading) {
    return <LoadingScreen />;
  }

  // Show redirecting state if user is authenticated
  if (user) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-secondary border border-border rounded-lg">
                <Image
                  src={logo}
                  alt="RoleCall Logo"
                  width={120}
                  height={60}
                  className="w-[120px] h-[60px] object-contain"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Link href="/auth">
                <Button variant="outline" size="sm" className="cursor-pointer">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth">
                <Button size="sm" className="gap-2 cursor-pointer">
                  Start Practicing
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full text-sm font-medium text-primary mb-6">
              <Brain className="h-4 w-4" />
              AI-Powered Interview Practice
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Master Your Next
              <span className="text-primary block mt-2">
                Job Interview
              </span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-3xl mx-auto">
              Practice with AI-powered mock interviews, get instant feedback, and build the confidence 
              you need to land your dream job. Available 24/7 with personalized coaching.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link href="/auth">
                <Button size="lg" className="gap-2 h-12 px-8 cursor-pointer">
                  Start Free Practice
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
            
            {/* Trust Indicators */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">AI</div>
                <div className="text-sm text-muted-foreground">Powered</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">24/7</div>
                <div className="text-sm text-muted-foreground">Available</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">5+</div>
                <div className="text-sm text-muted-foreground">Interview Types</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">Free</div>
                <div className="text-sm text-muted-foreground">To Start</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Job Description Feature Highlight - MOVED UP */}
      <section className="py-20 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border border-primary/20 rounded-2xl p-6 sm:p-8 lg:p-12">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left Content */}
              <div className="text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/20 border border-primary/30 rounded-full text-sm font-medium text-primary mb-4">
                  <Zap className="h-4 w-4" />
                  Super Easy Setup
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4 lg:mb-6">
                  Just Copy & Paste Your Job Description
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground mb-6">
                  Found your dream job? Simply paste the job description or LinkedIn job URL, 
                  and our AI will automatically create a personalized interview practice session 
                  tailored to that specific role.
                </p>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex items-center gap-3 justify-center lg:justify-start">
                    <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center shrink-0">
                      <CheckCircle className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-sm sm:text-base text-foreground">Paste any job posting URL or description</span>
                  </div>
                  <div className="flex items-center gap-3 justify-center lg:justify-start">
                    <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center shrink-0">
                      <CheckCircle className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-sm sm:text-base text-foreground">AI extracts key requirements automatically</span>
                  </div>
                  <div className="flex items-center gap-3 justify-center lg:justify-start">
                    <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center shrink-0">
                      <CheckCircle className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-sm sm:text-base text-foreground">Get role-specific interview questions instantly</span>
                  </div>
                </div>
              </div>
              
              {/* Right Content - Demo */}
              <div className="w-full max-w-md mx-auto lg:max-w-none">
                <div className="bg-background/50 backdrop-blur-sm border border-border rounded-xl p-4 sm:p-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground mb-4">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      Example: LinkedIn Job URL
                    </div>
                    
                    {/* Input Section */}
                    <div className="bg-background border border-border rounded-lg p-3 sm:p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <BookOpen className="h-4 w-4 text-primary" />
                        </div>
                        <div className="text-xs sm:text-sm font-medium text-foreground">Job Description Input</div>
                      </div>
                      <div className="bg-secondary/50 rounded-lg p-2 sm:p-3 text-xs sm:text-sm text-muted-foreground font-mono break-all">
                        https://linkedin.com/jobs/view/senior-software-engineer...
                      </div>
                    </div>
                    
                    {/* Arrow */}
                    <div className="flex justify-center py-2">
                      <div className="rotate-90 lg:rotate-0">
                        <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6 text-primary animate-pulse" />
                      </div>
                    </div>
                    
                    {/* Output Section */}
                    <div className="bg-background border border-border rounded-lg p-3 sm:p-4">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                          <Brain className="h-4 w-4 text-green-600 dark:text-green-400" />
                        </div>
                        <div className="text-xs sm:text-sm font-medium text-foreground">AI-Generated Questions</div>
                      </div>
                      <div className="space-y-2 text-xs sm:text-sm">
                        <div className="text-foreground">• "Tell me about your experience with React and Node.js"</div>
                        <div className="text-foreground">• "How do you approach system design challenges?"</div>
                        <div className="text-foreground hidden sm:block">• "Describe a time you optimized application performance"</div>
                        <div className="text-muted-foreground">+ <span className="sm:hidden">6</span><span className="hidden sm:inline">5</span> more personalized questions</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Everything You Need to Ace Interviews
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Practice with realistic AI interviews designed to help you improve and build confidence
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Bot className="h-8 w-8 text-primary" />}
              title="AI Voice Interviews"
              description="Practice with intelligent AI that provides realistic interview conversations and natural dialogue flow"
            />
            <FeatureCard
              icon={<MessageSquare className="h-8 w-8 text-primary" />}
              title="Instant Feedback"
              description="Get real-time performance insights with detailed scoring on communication skills and interview presence"
            />
            <FeatureCard
              icon={<Target className="h-8 w-8 text-primary" />}
              title="Custom Practice Sessions"
              description="Tailored practice for specific roles, companies, and interview types including behavioral and technical"
            />
            <FeatureCard
              icon={<BarChart3 className="h-8 w-8 text-primary" />}
              title="Progress Tracking"
              description="Monitor your improvement over time with detailed analytics and personalized coaching recommendations"
            />
            <FeatureCard
              icon={<Clock className="h-8 w-8 text-primary" />}
              title="Flexible Scheduling"
              description="Practice anytime, anywhere with sessions ranging from 15 to 60 minutes based on your schedule"
            />
            <FeatureCard
              icon={<Shield className="h-8 w-8 text-primary" />}
              title="Safe Practice Environment"
              description="Build confidence in a judgment-free zone with unlimited practice opportunities"
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Start Practicing in 3 Simple Steps
            </h2>
            <p className="text-xl text-muted-foreground">
              Get started in minutes and begin improving your interview skills immediately
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            <StepCard
              step="1"
              title="Paste Job Description"
              description="Simply copy and paste a job posting URL or description text - our AI handles the rest automatically"
              icon={<BookOpen className="h-6 w-6" />}
            />
            <StepCard
              step="2"
              title="Practice with AI"
              description="Engage in realistic interview conversations with our intelligent AI that adapts to your responses"
              icon={<Mic className="h-6 w-6" />}
            />
            <StepCard
              step="3"
              title="Review & Improve"
              description="Get detailed feedback, track your progress, and practice until you feel confident and prepared"
              icon={<TrendingUp className="h-6 w-6" />}
            />
          </div>
        </div>
      </section>

      {/* Interview Types */}
      <section className="py-20 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Practice Every Type of Interview
            </h2>
            <p className="text-xl text-muted-foreground">
              Comprehensive preparation for all interview scenarios you might encounter
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <InterviewTypeCard
              title="Behavioral Interviews"
              description="Master the STAR method and common behavioral questions"
              icon={<Users className="h-6 w-6 text-primary" />}
            />
            <InterviewTypeCard
              title="Technical Interviews"
              description="Practice coding challenges and technical problem-solving"
              icon={<Brain className="h-6 w-6 text-primary" />}
            />
            <InterviewTypeCard
              title="Case Study Interviews"
              description="Work through business cases and analytical problems"
              icon={<BarChart3 className="h-6 w-6 text-primary" />}
            />
            <InterviewTypeCard
              title="Leadership Interviews"
              description="Demonstrate management and leadership capabilities"
              icon={<Award className="h-6 w-6 text-primary" />}
            />
            <InterviewTypeCard
              title="Phone & Video Interviews"
              description="Practice remote interview skills and virtual presence"
              icon={<MessageSquare className="h-6 w-6 text-primary" />}
            />
            <InterviewTypeCard
              title="Industry-Specific"
              description="Tailored questions for your specific field or role"
              icon={<Target className="h-6 w-6 text-primary" />}
            />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
                Why Choose RoleCall for Interview Practice?
              </h2>
              <div className="space-y-6">
                <BenefitItem
                  icon={<Zap className="h-5 w-5 text-primary" />}
                  title="Instant Results"
                  description="Get immediate feedback after each practice session with actionable insights"
                />
                <BenefitItem
                  icon={<Trophy className="h-5 w-5 text-primary" />}
                  title="Proven Success"
                  description="Join thousands who have improved their interview performance and landed jobs"
                />
                <BenefitItem
                  icon={<BookOpen className="h-5 w-5 text-primary" />}
                  title="Continuous Learning"
                  description="Access to updated interview questions and industry-specific scenarios"
                />
                <BenefitItem
                  icon={<Shield className="h-5 w-5 text-primary" />}
                  title="Private & Secure"
                  description="Practice in complete privacy with enterprise-grade security and data protection"
                />
              </div>
            </div>
            <div className="bg-gradient-to-br from-primary/10 to-secondary/20 rounded-2xl p-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
                  <GraduationCap className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Ready to Get Started?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Join thousands of job seekers who have improved their interview skills with RoleCall
                </p>
                <Link href="/auth">
                  <Button className="gap-2 cursor-pointer">
                    Start Free Practice
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-secondary/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border border-primary/20 rounded-2xl p-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Ready to Ace Your Next Interview?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Start practicing today and build the confidence you need to land your dream job.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <Link href="/auth">
                <Button size="lg" className="gap-2 h-12 px-8 cursor-pointer">
                  Start Free Practice
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              
            </div>
            
            <p className="text-sm text-muted-foreground">
              No credit card required • Start with free practice credits • Upgrade anytime
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-background py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <div className="p-2 bg-secondary border border-border rounded-lg">
                <Image
                  src={logo}
                  alt="RoleCall Logo"
                  width={100}
                  height={50}
                  className="w-[100px] h-[50px] object-contain"
                />
              </div>
              <div>
                <div className="font-semibold text-foreground">RoleCall</div>
                <div className="text-sm text-muted-foreground">Your Interview Practice Partner</div>
              </div>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-sm text-muted-foreground">
                © 2025 RoleCall. All rights reserved.
              </p>
              <div className="flex gap-4 mt-2 justify-center md:justify-end">
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Privacy</a>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Terms</a>
                <a href="#" className="text-sm text-muted-foreground hover:text-foreground">Support</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="bg-background border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-200 group">
      <div className="p-3 bg-primary/10 rounded-lg w-fit mb-4 group-hover:bg-primary/15 transition-colors">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-3">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}

function StepCard({ step, title, description, icon }) {
  return (
    <div className="text-center">
      <div className="inline-flex items-center justify-center w-12 h-12 bg-primary text-primary-foreground rounded-full text-xl font-bold mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-3">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}

function InterviewTypeCard({ title, description, icon }) {
  return (
    <div className="bg-background border border-border rounded-lg p-6 hover:shadow-md transition-all duration-200 group">
      <div className="flex items-start gap-4">
        <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/15 transition-colors">
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

function BenefitItem({ icon, title, description }) {
  return (
    <div className="flex items-start gap-4">
      <div className="p-2 bg-primary/10 rounded-lg shrink-0">
        {icon}
      </div>
      <div>
        <h4 className="font-semibold text-foreground mb-1">{title}</h4>
        <p className="text-muted-foreground text-sm">{description}</p>
      </div>
    </div>
  );
}

function LoadingScreen() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="max-w-md mx-auto text-center space-y-6">
        {/* Logo Loading */}
        <div className="flex justify-center">
          <div className="p-4 bg-secondary border border-border rounded-xl">
            <Image
              src={logo}
              alt="RoleCall Logo"
              width={120}
              height={60}
              className="w-[120px] h-[60px] object-contain"
            />
          </div>
        </div>
        
        {/* Loading Text */}
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-foreground">Loading RoleCall</h2>
          <p className="text-muted-foreground">Setting up your interview practice...</p>
        </div>
        
        {/* Loading Skeletons */}
        <div className="space-y-3">
          <Skeleton className="h-4 w-3/4 mx-auto" />
          <Skeleton className="h-4 w-1/2 mx-auto" />
          <Skeleton className="h-4 w-2/3 mx-auto" />
        </div>
        
        {/* Loading Spinner */}
        <div className="flex justify-center">
          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
  );
}
