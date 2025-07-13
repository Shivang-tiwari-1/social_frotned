'use client';

import { Button } from '@/Components/ui/button';
import { Card } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { useAuth } from '@/Context/Auth/AuthContext';
import { useState } from 'react';

export default function SignupPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { signup } = useAuth();
  const [isSignedUp, setIsSignedUp] = useState(false);

  const handleSignup = async () => {
    if (!username || !password) {
      // optional error UI instead of alert
      return;
    }

    try {
      await signup(username, password);
      setUsername('');
      setPassword('');
      setIsSignedUp(true);

      // Show success message for 2 seconds, then return to form
      setTimeout(() => {
        setIsSignedUp(false);
      }, 2000);
    } catch (err) {
      console.error(err);
      // You can also show error UI here
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      {isSignedUp ? (
        <Card className="w-full max-w-sm p-8 text-center bg-white shadow-md text-green-600 text-xl font-semibold">
          ✅ User signed up successfully!
        </Card>
      ) : (
        <Card className="w-full max-w-sm p-6 space-y-4 bg-white shadow-md">
          <h2 className="text-xl font-semibold text-center">Sign Up</h2>

          <Input
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button className="w-full" onClick={handleSignup}>
            Sign Up
          </Button>
        </Card>
      )}
    </div>
  );
}
