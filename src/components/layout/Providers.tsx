"use client";

import { Toaster } from "react-hot-toast";
import { MockSessionProvider } from "@/lib/mock-auth";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <MockSessionProvider>
      {children}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            borderRadius: "12px",
            padding: "12px 16px",
            fontSize: "14px",
          },
          success: {
            iconTheme: {
              primary: "#e11d48",
              secondary: "#fff",
            },
          },
        }}
      />
    </MockSessionProvider>
  );
}
