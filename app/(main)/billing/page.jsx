"use client";
import React from "react";
import { useUser } from "@/app/provider";
import { CreditCard, Plus, Star, Crown, Building2, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import PayDialog from "./_components/PayDialog";
function BillingPage() {
  const user = useUser();
  return (
    <div className="mt-5 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-foreground">Billing & Credits</h2>
        <p className="text-muted-foreground mt-2">Manage your payment methods and interview credits</p>
      </div>
      
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
        <div className="xl:col-span-1">
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm h-full flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <CreditCard className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-card-foreground">Your Credits</h3>
                <p className="text-sm text-muted-foreground">Current balance</p>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20 rounded-lg p-4 mb-4 flex-grow flex items-center">
              <div className="flex items-center justify-between w-full">
                <div>
                  <p className="text-2xl font-bold text-primary">{user?.user?.credits || 0}</p>
                  <p className="text-sm text-muted-foreground">Available credits</p>
                </div>
                <div className="p-2 bg-primary/20 rounded-full">
                  <Zap className="h-5 w-5 text-primary" />
                </div>
              </div>
            </div>
            
            <Button className="w-full" size="lg">
              <Plus className="h-4 w-4 mr-2" />
              Add More Credits
            </Button>
          </div>
        </div>

        <div className="xl:col-span-2">
          <div className="bg-card border border-border rounded-xl p-6 shadow-sm h-full flex flex-col">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-card-foreground mb-2">Purchase Credits</h2>
              <p className="text-muted-foreground">Choose a plan that fits your interviewing needs</p>
            </div>
            
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 flex-grow">
              <div className="bg-background border border-border rounded-lg p-5 hover:border-primary/50 transition-all duration-200 hover:shadow-md group">
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                    <Star className="h-5 w-5 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-foreground">Basic</h3>
                </div>
                <div className="border-t border-border pt-3 mb-4">
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-2xl font-bold text-foreground">$10</span>
                    <span className="text-sm text-muted-foreground">/pack</span>
                  </div>
                  <p className="text-sm text-muted-foreground">5 interview credits</p>
                  <p className="text-xs text-muted-foreground mt-1">$2.00 per credit</p>
                </div>
                <PayDialog amount={10} credits={5} />
              </div>

              <div className="bg-background border-2 border-primary rounded-lg p-5 relative hover:shadow-lg transition-all duration-200 group">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap">
                    Most Popular
                  </span>
                </div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <Crown className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground">Pro</h3>
                </div>
                <div className="border-t border-border pt-3 mb-4">
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-2xl font-bold text-foreground">$20</span>
                    <span className="text-sm text-muted-foreground">/pack</span>
                  </div>
                  <p className="text-sm text-muted-foreground">12 interview credits</p>
                  <p className="text-xs text-green-600 mt-1 font-medium">$1.67 per credit - Save 16%</p>
                </div>
                <PayDialog amount={20} credits={12} />
              </div>

              <div className="bg-background border border-border rounded-lg p-5 hover:border-primary/50 transition-all duration-200 hover:shadow-md group">
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                    <Building2 className="h-5 w-5 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-foreground">Enterprise</h3>
                </div>
                <div className="border-t border-border pt-3 mb-4">
                  <div className="mb-1">
                    <span className="text-lg font-semibold text-foreground">Custom Pricing</span>
                  </div>
                  <p className="text-sm text-muted-foreground">Unlimited interviews</p>
                  <p className="text-xs text-muted-foreground mt-1">Volume discounts available</p>
                </div>
                <Button variant="secondary" className="w-full">
                  Contact Sales
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BillingPage;
