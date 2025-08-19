"use client";
import { 
  Code, 
  TrendingUp, 
  Palette, 
  Heart, 
  GraduationCap, 
  Calculator,
  Settings,
  ArrowRight 
} from "lucide-react";
import Link from "next/link";
import { useUser } from "../../AuthProvider";

const IndustryQuickStart = () => {
  const { user } = useUser();

  // Check if user is still considered "new" (less than 4 days since signup)
  const isNewUser = () => {
    if (!user?.created_at) return true; // Show for users without timestamp
    
    const accountAge = Date.now() - new Date(user.created_at).getTime();
    const daysSinceSignup = accountAge / (1000 * 60 * 60 * 24);
    
    return daysSinceSignup < 4; // Hide after 4 days
  };

  // Don't render if user is no longer new
  if (!isNewUser()) {
    return null;
  }
  const industries = [
    {
      name: "Tech",
      icon: Code,
      color: "text-blue-600 bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400",
      description: "Software, Engineering, IT",
      href: "/help?tab=industries#tech-example"
    },
    {
      name: "Sales",
      icon: TrendingUp,
      color: "text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-400",
      description: "Account Executive, BDR",
      href: "/help?tab=industries#sales-example"
    },
    {
      name: "Marketing",
      icon: Palette,
      color: "text-purple-600 bg-purple-100 dark:bg-purple-900/20 dark:text-purple-400",
      description: "Digital, Content, Growth",
      href: "/help?tab=industries#marketing-example"
    },
    {
      name: "Healthcare",
      icon: Heart,
      color: "text-red-600 bg-red-100 dark:bg-red-900/20 dark:text-red-400",
      description: "Nursing, Medical, Clinical",
      href: "/help?tab=industries#healthcare-example"
    },
    {
      name: "Education",
      icon: GraduationCap,
      color: "text-orange-600 bg-orange-100 dark:bg-orange-900/20 dark:text-orange-400",
      description: "Teaching, Administration",
      href: "/help?tab=industries#education-example"
    },
    {
      name: "Finance",
      icon: Calculator,
      color: "text-emerald-600 bg-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400",
      description: "Analysis, Accounting, Banking",
      href: "/help?tab=industries#finance-example"
    }
  ];

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">
          Get Started by Industry
        </h3>
        <Link 
          href="/help"
          className="text-sm text-primary hover:text-primary/80 inline-flex items-center gap-1 transition-colors"
        >
          View All
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
      
      <p className="text-muted-foreground text-sm mb-4">
        See examples and tips tailored to your field
      </p>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        {industries.map((industry) => {
          const IconComponent = industry.icon;
          
          return (
            <Link
              key={industry.name}
              href={industry.href}
              className="group bg-secondary hover:bg-secondary/80 rounded-lg p-4 transition-all duration-200 hover:shadow-sm border hover:border-primary/20"
            >
              <div className="flex flex-col items-center text-center space-y-2">
                <div className={`p-2 rounded-lg ${industry.color} transition-transform group-hover:scale-110`}>
                  <IconComponent className="w-5 h-5" />
                </div>
                
                <div>
                  <h4 className="font-medium text-sm text-foreground group-hover:text-primary transition-colors">
                    {industry.name}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1 leading-tight">
                    {industry.description}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default IndustryQuickStart;