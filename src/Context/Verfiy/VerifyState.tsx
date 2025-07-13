"use client";

import React, { useEffect, useState } from 'react';
import VerifyContext, { useAuth } from './verifyContext';
import { useRouter } from 'next/navigation'; 
import { useVerify } from '../User/UserContext';

interface AuthState {
  user: unknown;
  accessToken: string;
  refreshToken: string;
}

const VerifyState = ({ children }: { children: React.ReactNode }) => {
  const [ auth, setAuth ] = useState<AuthState>({
    user: null,
    accessToken: '',
    refreshToken: ''
  });

  const router = useRouter();

  useEffect(() => {
    if (!auth.accessToken) {
      router.push('/Login');

    } else {
      router.push('/');
    }
  }, [ auth.accessToken ]);

  return (
    <VerifyContext.Provider value={{ auth, setAuth }}>
      {children}
    </VerifyContext.Provider>
  );
};

export default VerifyState;
