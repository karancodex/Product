import { UserDto } from "@/@types/user";
import React, { createContext, useEffect } from "react";

export interface AuthContextType {
  user: UserDto | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
});

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = React.useState<UserDto | null>(null);

  useEffect(() => {
    setUser(null);
  }, []);

  async function signIn(email: string, password: string) {
    // Call your API here.
  }

  async function signUp(email: string, password: string) {
    // Call your API here.
  }

  async function signOut() {
    // Call your API here.
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signOut,
        signUp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
