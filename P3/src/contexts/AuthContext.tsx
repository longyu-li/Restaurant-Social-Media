import React, {createContext, useCallback, useEffect, useState} from "react";
import { SignInRequest } from "../validation/signIn";
import {User} from "../responses/user";

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

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC = ({ children }) => {

  const [tokens, setTokens] = useState(() => {
    const savedTokens = localStorage.getItem("tokens");
    return savedTokens ? JSON.parse(savedTokens) as Tokens : null;
  });

  const [user, setUser] = useState<User | null>(null);

  const loadUser = useCallback(async () => {
    if (tokens) {
      const res = await fetch("/users/", {
        headers: {
          'Authorization': `Bearer ${tokens.access}`
        }
      });

      if (res.ok) {
        setUser(await res.json());
      } else {
        console.log(await res.json());
      }
    } else {
      setUser(null);
    }
  }, [tokens]);

  useEffect(() => {
    loadUser();
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
      localStorage.setItem("tokens", JSON.stringify(newTokens));
    }

    return res;

  }

  const signOut = () => {
    setTokens(null);
    localStorage.removeItem("tokens");
  }

  useEffect(() => {
    // const timer = setInterval()
  }, []);

  return (
    <AuthContext.Provider
      value={{ tokens, signIn, signOut, user }}
    >
      {children}
    </AuthContext.Provider>
  );
}