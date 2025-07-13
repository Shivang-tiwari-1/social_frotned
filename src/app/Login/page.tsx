'use client';

import { Button } from '@/Components/ui/button';
import { Card } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { useAuth } from '@/Context/Auth/AuthContext';
import { useState } from 'react';

export default function LoginPage() {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const { login } = useAuth()
    const handleLogin = () => {
        if (!username || !password) {
            alert('Please enter both fields');
            return;
        }

        login(username, password)

        console.log({ username, password });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
            <Card className="w-full max-w-sm p-6 space-y-4 bg-white shadow-md">
                <h2 className="text-xl font-semibold text-center">Login</h2>

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

                <Button className="w-full" onClick={handleLogin}>
                    Login
                </Button>
            </Card>
        </div>
    );
}
