"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface MockUser {
  id: string;
  name: string;
  email: string;
  role: string;
  photo: string | null;
  onboardingComplete: boolean;
  membership: string;
}

interface MockSession {
  user: MockUser;
  expires: string;
}

interface MockAuthContext {
  session: MockSession | null;
  status: "loading" | "authenticated" | "unauthenticated";
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  update: () => Promise<void>;
}

const defaultUser: MockUser = {
  id: "1",
  name: "John Doe",
  email: "john@example.com",
  role: "ADMIN",
  photo: null,
  onboardingComplete: true,
  membership: "PREMIUM",
};

const MockAuthCtx = createContext<MockAuthContext>({
  session: { user: defaultUser, expires: "2099-12-31T23:59:59.000Z" },
  status: "authenticated",
  signIn: async () => {},
  signOut: async () => {},
  update: async () => {},
});

type UseSessionResult = {
  data: MockSession | null;
  status: "loading" | "authenticated" | "unauthenticated";
  update: () => Promise<void>;
};

export function MockSessionProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<MockSession | null>({
    user: defaultUser,
    expires: "2099-12-31T23:59:59.000Z",
  });

  const signIn = useCallback(async () => {
    setSession({ user: defaultUser, expires: "2099-12-31T23:59:59.000Z" });
  }, []);

  const signOut = useCallback(async () => {
    setSession(null);
  }, []);

  const update = useCallback(async () => {}, []);

  return (
    <MockAuthCtx.Provider value={{ session, status: session ? "authenticated" : "unauthenticated", signIn, signOut, update }}>
      {children}
    </MockAuthCtx.Provider>
  );
}

export function useSession(): UseSessionResult {
  const ctx = useContext(MockAuthCtx);
  return { data: ctx.session, status: ctx.status, update: ctx.update };
}

export async function signIn() {
  window.location.href = "/dashboard";
}

export async function signOut() {
  window.location.href = "/login";
}

export { MockSessionProvider as SessionProvider };
export type { MockSession as Session, MockUser as User };
