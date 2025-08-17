"use client";

import { PayPalScriptProvider } from "@paypal/react-paypal-js";

function Provider({ children }) {
  return (
    <PayPalScriptProvider options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID }}>
      {children}
    </PayPalScriptProvider>
  );
}

export default Provider;
