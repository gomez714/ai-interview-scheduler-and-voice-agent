
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
  Users, 
  Clock, 
  Shield, 
  Star, 
  Zap,
  CheckCircle,
  Play,
  Calendar,
  MessageSquare,
  BarChart3,
  Sparkles,
  Target,
  TrendingUp,
  Brain,
  Award,
  Briefcase,
  GraduationCap
} from "lucide-react";
import logo from "@/public/rolecall-logo-blue.png";

export default function Home() {
  const { user, loading } = useSimpleAuth();
  const router = useRouter();
  const [selectedAudience, setSelectedAudience] = React.useState('both'); // 'recruiter', 'jobseeker', 'both'

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
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth">
                <Button size="sm" className="gap-2">
                  Get Started
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
              <Sparkles className="h-4 w-4" />
              AI-Powered Interview Platform
            </div>
            
            {/* Audience Toggle */}
            <div className="flex justify-center mb-8">
              <div className="bg-secondary border border-border rounded-lg p-1 inline-flex">
                <button
                  onClick={() => setSelectedAudience('recruiter')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    selectedAudience === 'recruiter'
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4" />
                    For Recruiters
                  </div>
                </button>
                <button
                  onClick={() => setSelectedAudience('both')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    selectedAudience === 'both'
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Both
                </button>
                <button
                  onClick={() => setSelectedAudience('jobseeker')}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    selectedAudience === 'jobseeker'
                      ? 'bg-primary text-primary-foreground shadow-sm'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <GraduationCap className="h-4 w-4" />
                    For Job Seekers
                  </div>
                </button>
              </div>
            </div>
            
            {/* Dynamic Hero Content */}
            {selectedAudience === 'recruiter' && (
              <>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                  Revolutionize Your
                  <span className="text-primary block mt-2">
                    Hiring Process
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-3xl mx-auto">
                  Create AI-powered voice interviews, schedule candidates seamlessly, and get intelligent feedback 
                  to make better hiring decisions faster than ever before.
                </p>
              </>
            )}
            
            {selectedAudience === 'jobseeker' && (
              <>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                  Master Every
                  <span className="text-primary block mt-2">
                    Interview
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-3xl mx-auto">
                  Practice with AI-powered interviews, get real-time feedback, and build confidence 
                  to land your dream job with personalized coaching.
                </p>
              </>
            )}
            
            {selectedAudience === 'both' && (
              <>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                  AI-Powered Interview
                  <span className="text-primary block mt-2">
                    Excellence
                  </span>
                </h1>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-3xl mx-auto">
                  Whether you're hiring top talent or preparing for your dream job, RoleCall's AI interviews 
                  help you succeed with intelligent feedback and realistic practice sessions.
                </p>
              </>
            )}
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/auth">
                <Button size="lg" className="gap-2 h-12 px-8">
                  Start Free Trial
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              {/* <Button variant="outline" size="lg" className="gap-2 h-12 px-8">
                <Play className="h-5 w-5" />
                Watch Demo
              </Button> */}
            </div>
            
            {/* Core Platform Features */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">AI</div>
                <div className="text-sm text-muted-foreground">Powered</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">15-60</div>
                <div className="text-sm text-muted-foreground">Min Sessions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">24/7</div>
                <div className="text-sm text-muted-foreground">Available</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-foreground">5</div>
                <div className="text-sm text-muted-foreground">Interview Types</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              {selectedAudience === 'recruiter' && 'Everything You Need for Smart Hiring'}
              {selectedAudience === 'jobseeker' && 'Master Your Interview Skills'}
              {selectedAudience === 'both' && 'Powerful Features for Every Interview Need'}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {selectedAudience === 'recruiter' && 'From AI interviews to detailed analytics, RoleCall streamlines your entire recruitment process'}
              {selectedAudience === 'jobseeker' && 'Practice with realistic AI interviews and get personalized feedback to ace your next opportunity'}
              {selectedAudience === 'both' && 'Whether you\'re hiring talent or preparing for interviews, RoleCall has the tools you need to succeed'}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Core Features - Always Visible */}
            <FeatureCard
              icon={<Bot className="h-8 w-8 text-primary" />}
              title="AI Voice Interviews"
              description={selectedAudience === 'jobseeker' 
                ? "Practice with intelligent AI that provides realistic interview conversations and natural dialogue"
                : "Conduct natural, intelligent interviews with our advanced AI that adapts to each candidate's responses"
              }
            />
            <FeatureCard
              icon={<MessageSquare className="h-8 w-8 text-primary" />}
              title="Real-time Feedback"
              description={selectedAudience === 'jobseeker'
                ? "Get instant performance insights with detailed scoring on communication, technical skills, and interview presence"
                : "Instant candidate evaluation with detailed scoring across multiple dimensions"
              }
            />
            <FeatureCard
              icon={<BarChart3 className="h-8 w-8 text-primary" />}
              title="Intelligent Analytics"
              description={selectedAudience === 'jobseeker'
                ? "Track your progress over time and identify areas for improvement with personalized insights"
                : "Get detailed insights and recommendations to make data-driven hiring decisions"
              }
            />
            
            {/* Recruiter-Specific Features */}
            {(selectedAudience === 'recruiter' || selectedAudience === 'both') && (
              <>
                <FeatureCard
                  icon={<Calendar className="h-8 w-8 text-primary" />}
                  title="Smart Scheduling"
                  description="Automated scheduling system that works across time zones with calendar integration"
                />
                <FeatureCard
                  icon={<Zap className="h-8 w-8 text-primary" />}
                  title="Lightning Fast"
                  description="Process candidates 10x faster with automated screening and instant results"
                />
              </>
            )}
            
            {/* Job Seeker-Specific Features */}
            {(selectedAudience === 'jobseeker' || selectedAudience === 'both') && (
              <>
                <FeatureCard
                  icon={<Target className="h-8 w-8 text-primary" />}
                  title="Custom Practice Sessions"
                  description="Tailored practice for specific roles, companies, and interview types including behavioral and technical"
                />
                <FeatureCard
                  icon={<TrendingUp className="h-8 w-8 text-primary" />}
                  title="Performance Tracking"
                  description="Monitor your improvement with detailed analytics and personalized coaching recommendations"
                />
              </>
            )}
            
            {/* Common Features */}
            {selectedAudience === 'both' && (
              <FeatureCard
                icon={<Brain className="h-8 w-8 text-primary" />}
                title="AI-Powered Insights"
                description="Advanced machine learning provides intelligent feedback and continuous improvement suggestions"
              />
            )}
            
            <FeatureCard
              icon={<Shield className="h-8 w-8 text-primary" />}
              title="Enterprise Security"
              description="Bank-level security with encrypted data and compliance with privacy regulations"
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              How RoleCall Works
            </h2>
            <p className="text-xl text-muted-foreground">
              {selectedAudience === 'recruiter' && 'Streamline your hiring process in 3 simple steps'}
              {selectedAudience === 'jobseeker' && 'Master your interview skills in 3 easy steps'}
              {selectedAudience === 'both' && 'Get started in minutes with our simple 3-step process'}
            </p>
          </div>
          
          {/* Recruiter Workflow */}
          {selectedAudience === 'recruiter' && (
            <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
              <StepCard
                step="1"
                title="Create Interview"
                description="Set up your AI interview with custom questions tailored to your role requirements"
                icon={<Bot className="h-6 w-6" />}
              />
              <StepCard
                step="2"
                title="Share & Schedule"
                description="Send interview links to candidates and let them schedule at their convenience"
                icon={<Calendar className="h-6 w-6" />}
              />
              <StepCard
                step="3"
                title="Review Results"
                description="Get detailed AI-generated feedback and insights to make informed hiring decisions"
                icon={<BarChart3 className="h-6 w-6" />}
              />
            </div>
          )}
          
          {/* Job Seeker Workflow */}
          {selectedAudience === 'jobseeker' && (
            <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
              <StepCard
                step="1"
                title="Choose Practice Type"
                description="Select from technical, behavioral, or role-specific interview practice sessions"
                icon={<Target className="h-6 w-6" />}
              />
              <StepCard
                step="2"
                title="Practice with AI"
                description="Engage in realistic interview conversations with intelligent AI feedback"
                icon={<MessageSquare className="h-6 w-6" />}
              />
              <StepCard
                step="3"
                title="Improve & Repeat"
                description="Review detailed feedback, track progress, and practice until you're confident"
                icon={<TrendingUp className="h-6 w-6" />}
              />
            </div>
          )}
          
          {/* Both Audiences Workflow */}
          {selectedAudience === 'both' && (
            <div className="space-y-12">
              {/* Recruiter Section */}
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-8 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Briefcase className="h-6 w-6 text-primary" />
                    For Recruiters
                  </div>
                </h3>
                <div className="grid md:grid-cols-3 gap-8">
                  <StepCard
                    step="1"
                    title="Create Interview"
                    description="Set up AI interviews with custom questions for your roles"
                    icon={<Bot className="h-5 w-5" />}
                  />
                  <StepCard
                    step="2"
                    title="Share & Schedule"
                    description="Send links to candidates for convenient scheduling"
                    icon={<Calendar className="h-5 w-5" />}
                  />
                  <StepCard
                    step="3"
                    title="Review Results"
                    description="Get AI insights to make informed hiring decisions"
                    icon={<BarChart3 className="h-5 w-5" />}
                  />
                </div>
              </div>
              
              {/* Separator */}
              <div className="flex items-center justify-center">
                <div className="border-t border-border w-full max-w-xs"></div>
                <div className="px-4 text-muted-foreground text-sm">or</div>
                <div className="border-t border-border w-full max-w-xs"></div>
              </div>
              
              {/* Job Seeker Section */}
              <div>
                <h3 className="text-2xl font-bold text-foreground mb-8 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <GraduationCap className="h-6 w-6 text-primary" />
                    For Job Seekers
                  </div>
                </h3>
                <div className="grid md:grid-cols-3 gap-8">
                  <StepCard
                    step="1"
                    title="Choose Practice"
                    description="Select interview type and difficulty level"
                    icon={<Target className="h-5 w-5" />}
                  />
                  <StepCard
                    step="2"
                    title="Practice with AI"
                    description="Engage in realistic interview conversations"
                    icon={<MessageSquare className="h-5 w-5" />}
                  />
                  <StepCard
                    step="3"
                    title="Improve Skills"
                    description="Get feedback and track your progress over time"
                    icon={<TrendingUp className="h-5 w-5" />}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Key Benefits */}
      <section className="py-20 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            {selectedAudience === 'recruiter' && 'Built for Modern Recruitment'}
            {selectedAudience === 'jobseeker' && 'Your Interview Practice Partner'}
            {selectedAudience === 'both' && 'Designed for Interview Excellence'}
          </h2>
          <p className="text-muted-foreground mb-12 max-w-2xl mx-auto">
            {selectedAudience === 'recruiter' && 'RoleCall provides AI-powered interview tools designed to streamline your recruitment workflow'}
            {selectedAudience === 'jobseeker' && 'Practice with AI-driven interviews that help you prepare for real-world scenarios'}
            {selectedAudience === 'both' && 'Whether you\'re conducting interviews or preparing for them, RoleCall provides the tools you need'}
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border border-primary/20 rounded-2xl p-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              {selectedAudience === 'recruiter' && 'Ready to Transform Your Hiring?'}
              {selectedAudience === 'jobseeker' && 'Ready to Ace Your Next Interview?'}
              {selectedAudience === 'both' && 'Ready to Transform Your Interview Experience?'}
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              {selectedAudience === 'recruiter' && 'Start using RoleCall to streamline your interview process with AI-powered tools.'}
              {selectedAudience === 'jobseeker' && 'Begin practicing with RoleCall to improve your interview skills and build confidence.'}
              {selectedAudience === 'both' && 'Whether you\'re hiring talent or preparing for interviews, RoleCall provides the tools you need.'}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth">
                <Button size="lg" className="gap-2 h-12 px-8">
                  {selectedAudience === 'jobseeker' ? 'Start Practicing Free' : 'Start Free Trial'}
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="h-12 px-8">
                {selectedAudience === 'jobseeker' ? 'View Pricing' : 'Contact Us'}
              </Button>
            </div>
            
            <p className="text-sm text-muted-foreground mt-6">
              {selectedAudience === 'recruiter' && 'No credit card required • 14-day free trial • Cancel anytime'}
              {selectedAudience === 'jobseeker' && 'No credit card required • Start with free practice credits • Upgrade anytime'}
              {selectedAudience === 'both' && 'No credit card required • Free trial available • Cancel anytime'}
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-secondary/30 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <div className="p-2 bg-background border border-border rounded-lg">
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
                <div className="text-sm text-muted-foreground">AI-Powered Interviews</div>
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
        {icon ? (
          <div className="flex items-center justify-center">
            {icon}
          </div>
        ) : (
          step
        )}
      </div>
      <h3 className="text-xl font-semibold text-foreground mb-3">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
}

function TestimonialCard({ quote, author, role, metric }) {
  return (
    <div className="bg-background border border-border rounded-xl p-6 text-left hover:shadow-lg transition-all duration-200">
      <div className="flex items-start gap-3 mb-4">
        <div className="p-2 bg-primary/10 rounded-lg shrink-0">
          <Star className="h-5 w-5 text-primary fill-current" />
        </div>
        <div className="flex-1">
          <p className="text-muted-foreground text-sm leading-relaxed mb-3">
            "{quote}"
          </p>
          <div className="space-y-1">
            <p className="font-semibold text-foreground text-sm">{author}</p>
            <p className="text-xs text-muted-foreground">{role}</p>
            {metric && (
              <div className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium mt-2">
                <CheckCircle className="h-3 w-3" />
                {metric}
              </div>
            )}
          </div>
        </div>
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
          <p className="text-muted-foreground">Setting up your experience...</p>
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
