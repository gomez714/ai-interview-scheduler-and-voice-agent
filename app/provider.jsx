"use client";

import supabase from "@/services/supabaseClient";
import { useEffect, useState, useContext } from "react";
import { UserDetailContext } from "@/context/UserDetailContext";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

function Provider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    createNewUser();
  }, []);
  const createNewUser = () => {
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      let { data: users, error } = await supabase
        .from("users")
        .select("*")
        .eq("email", user?.email);

      if (users?.length === 0) {
        const { data, error } = await supabase.from("users").insert([
          {
            email: user?.email,
            name: user?.user_metadata?.name,
            image_url: user?.user_metadata?.picture,
          },
        ]);
        setUser(data);
      }

      setUser(users[0]);
    });
  };
  return (
    <PayPalScriptProvider options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID }}>
      <UserDetailContext.Provider value={{ user, setUser }}>
        {children}
      </UserDetailContext.Provider>
    </PayPalScriptProvider>
  );
}

export default Provider;

export const useUser = () => {
  const context = useContext(UserDetailContext);
  return context;
};
