import Navbar from '@/Components/Navabr'
import AuthState from '@/Context/Auth/AuthState'
import UserState from '@/Context/User/UserState'
import VerifyState from '@/Context/Verfiy/VerifyState'
import React from 'react'

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <VerifyState>
      <AuthState>
        <UserState>
          <Navbar />
          {children}
        </UserState>
      </AuthState >
    </VerifyState>
  )
}

export default Providers
