import React, { createContext, useCallback, useEffect, useState } from "react";
import { SignInRequest } from "../validation/signIn";
import { User } from "../responses/user";

interface Tokens {
  access: string;
  refresh: string;
}

interface AuthContextType {
  tokens: Tokens | null;
  signIn: (data: SignInRequest) => Promise<Response>;
  signOut: () => void;
  user: User | null;
}

const REFRESH_TIME = 15 * 60000; // 15 mins in ms

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC = ({ children }) => {

  const [tokens, setTokens] = useState(() => {
    const savedTokens = localStorage.getItem("tokens");
    return savedTokens ? JSON.parse(savedTokens) as Tokens : null;
  });

  const [user, setUser] = useState<User | null>(null);

  const [hardRefresh, setHardRefresh] = useState(true);

  const loadUser = useCallback(async (tokens: Tokens) => {
    const res = await fetch("/users/", {
      headers: {
        'Authorization': `Bearer ${tokens.access}`
      }
    });

    if (res.ok) {
      setUser(await res.json());
    } else {
      console.log(await res.json());
      setTokens(null);
    }
  }, []);

  const refreshTokens = useCallback(async (tokens: Tokens) => {

    // todo: (optimization) check for token validity (api call) before renewing

    const res = await fetch("/users/token/", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ refresh: tokens.refresh })
    });

    if (res.ok) {
      const newTokens = await res.json();
      setTokens(newTokens);
    } else {
      console.log(await res.json());
      setTokens(null);
    }

  }, []);

  useEffect(() => {

    if (tokens) {

      if (hardRefresh) {
        refreshTokens(tokens).then(() => {
          loadUser(tokens);
        });
        setHardRefresh(false);
      }

      const timer = setInterval(() => {
        refreshTokens(tokens);
      }, REFRESH_TIME);

      return () => clearInterval(timer);

    }

  }, [hardRefresh, tokens, refreshTokens, loadUser]);

  useEffect(() => {
    if (!tokens) {

      setUser(null);
      localStorage.removeItem("tokens");

    } else if (!localStorage.getItem("tokens")) {

      localStorage.setItem("tokens", JSON.stringify(tokens));
      loadUser(tokens);

    }
  }, [tokens, loadUser]);

  const signIn = async (data: SignInRequest) => {

    const res = await fetch("/users/signin/", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (res.ok) {
      const newTokens = await res.json();
      setTokens(newTokens);
    }

    return res;

  }

  const signOut = () => setTokens(null);

  return (
    <AuthContext.Provider
      value={{ tokens, signIn, signOut, user }}
    >
      {children}
    </AuthContext.Provider>
  );
}