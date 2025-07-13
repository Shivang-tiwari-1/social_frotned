
'use client';

import { axiosPrivate } from "@/Api/Axios";
import AuthContext, { AuthContextType } from "./AuthContext";
import React from "react";
import { useVerify } from "../Verfiy/verifyContext";

const AuthState = ({ children }: { children: React.ReactNode }) => {

  const { setAuth } = useVerify()
  const signup: AuthContextType[ "signup" ] = async (
    username,
    password
  ) => {
    try {
      const response = await axiosPrivate.post("/auth/signup", {
        username,
        password,
      });
      console.log(response.data)
      return { data: response.data };
    } catch (error) {
      console.error("Signup error:", error);
      return undefined;
    }
  };

  const login: AuthContextType[ "login" ] = async (
    username,
    password
  ) => {
    try {
      const response = await axiosPrivate.post("/auth/login", {
        username,
        password,
      });
      console.log(response.data)
      if (response) {
        setAuth({ user: response.data.data.user, accessToken: response.data.data.accessToken, refreshToken: response.data.data.refreshtoken })
        return { data: response.data };

      }
    } catch (error) {
      console.error("Login error:", error);
      return undefined;
    }
  };

  return (
    <AuthContext.Provider value={{ signup, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthState;
