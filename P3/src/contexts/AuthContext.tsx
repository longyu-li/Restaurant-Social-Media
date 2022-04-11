import React, { createContext, useCallback, useEffect, useState } from "react";
import { SignInRequest } from "../validation/signIn";
import { User } from "../responses/user";
import { useLocation, useNavigate } from "react-router-dom";
import jwtDecode, { JwtPayload } from "jwt-decode";

interface Tokens {
  access: string;
  refresh: string;
}

interface AuthContextType {
  tokens: Tokens | null;
  signIn: (data: SignInRequest) => Promise<Response>;
  signOut: () => void;
  user: User | null | undefined;
}

const REFRESH_TIME = 15 * 60000; // 15 mins in ms

export const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider: React.FC = ({ children }) => {

  const [tokens, setTokens] = useState<Tokens | null>(null);

  const [user, setUser] = useState<User | null>();

  const [hardRefresh, setHardRefresh] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

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

    const savedTokenStr = localStorage.getItem("tokens");
    localStorage.removeItem("tokens"); // in case token is invalid etc

    if (savedTokenStr) {

      const savedTokens = JSON.parse(savedTokenStr) as Tokens;
      const accessPayload = jwtDecode<JwtPayload>(savedTokens.access);

      if (accessPayload.exp! * 1000 <= Date.now()) {

        refreshTokens(savedTokens);

      } else {

        setTokens(savedTokens);

      }
    }
    setHardRefresh(false);

  }, [refreshTokens, loadUser]);

  useEffect(() => {

    if (!hardRefresh) {

      if (tokens) {

        localStorage.setItem("tokens", JSON.stringify(tokens));

        const timer = setInterval(() => {
          refreshTokens(tokens);
        }, REFRESH_TIME);

        return () => clearInterval(timer);

      } else {

        setUser(null);
        localStorage.removeItem("tokens");

      }

    }

  }, [hardRefresh, tokens, refreshTokens]);

  useEffect(() => {

    if (!hardRefresh && tokens && !user) {
      loadUser(tokens);
    }

  }, [hardRefresh, tokens, user, loadUser])

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

      const locationState = location.state as { from: { pathname: string } | null } | null;
      navigate(locationState?.from?.pathname || "/", { replace: true });
    }

    return res;
  }

  const signOut = () => {
    setTokens(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{ tokens, signIn, signOut, user }}
    >
      {children}
    </AuthContext.Provider>
  );
}