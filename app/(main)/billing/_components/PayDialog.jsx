import { PayPalButtons } from "@paypal/react-paypal-js";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useUser } from "../../AuthProvider";
import supabase from "@/services/supabaseClient";
import { toast } from "sonner";
import { CreditCard, Shield, CheckCircle } from "lucide-react";

function PayDialog({ amount, credits }) {
  const { user } = useUser();
  
  const onPaymentSucess = async () => {
    const { data, error } = await supabase
      .from("users")
      .update({ credits: Number(user?.credits) + Number(credits) })
      .eq("email", user?.email)
      .select();
    if (error) {
      toast.error("Payment failed");
    } else {
      toast.success("Payment successful");
      window.location.reload();
    }
    
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          Purchase
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md max-h-[90vh] p-6 overflow-y-auto">
        <DialogHeader className="text-center space-y-4 mb-6">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <CreditCard className="w-8 h-8 text-primary" />
          </div>
          <DialogTitle className="text-2xl font-bold">
            Complete Your Purchase
          </DialogTitle>
          <DialogDescription className="text-base">
            Securely purchase {credits} interview credits for ${amount}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <div className="bg-secondary/50 rounded-lg p-4 space-y-3">
            <h3 className="font-semibold text-foreground mb-3">
              Order Summary
            </h3>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Interview Credits</span>
              <span className="font-medium">{credits} credits</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Price per credit</span>
              <span className="font-medium">
                ${(amount / credits).toFixed(2)}
              </span>
            </div>
            <div className="border-t border-border pt-3">
              <div className="flex justify-between items-center">
                <span className="font-semibold">Total</span>
                <span className="text-xl font-bold text-primary">
                  ${amount}
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Shield className="w-4 h-4 text-green-600" />
              <span>Secured by PayPal encryption</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>Credits added instantly after payment</span>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium text-foreground">
              Choose Payment Method
            </h4>
            <div className="border border-border rounded-lg bg-background p-3">
              <PayPalButtons
                style={{
                  layout: "vertical",
                  color: "blue",
                  shape: "rect",
                  label: "pay",
                  height: 45,
                  tagline: false,
                }}
                onApprove={() => onPaymentSucess()}
                onCancel={() => toast.error("Payment cancelled")}
                onError={(err) => {
                  console.error("PayPal error:", err);
                  toast.error("Payment processing error");
                }}
                createOrder={(data, actions) => {
                  return actions.order.create({
                    purchase_units: [
                      {
                        amount: {
                          value: amount.toString(),
                          currency_code: "USD",
                        },
                        description: `${credits} Interview Credits`,
                      },
                    ],
                    application_context: {
                      brand_name: "RoleCall",
                      user_action: "PAY_NOW",
                    },
                  });
                }}
              />
            </div>
          </div>
          
          <div className="text-xs text-muted-foreground text-center space-y-1">
            <p>
              By completing this purchase, you agree to our Terms of Service.
            </p>
            <p>Credits are non-refundable and do not expire.</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default PayDialog;
