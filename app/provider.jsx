"use client";

import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { ThemeProvider } from "next-themes";

function Provider({ children }) {
  return (
    <ThemeProvider 
      attribute="class" 
      defaultTheme="light" 
      enableSystem={false}
      disableTransitionOnChange
    >
      <PayPalScriptProvider options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID }}>
        {children}
      </PayPalScriptProvider>
    </ThemeProvider>
  );
}

export default Provider;
