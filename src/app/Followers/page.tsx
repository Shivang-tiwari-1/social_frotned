'use client';

import { useUser } from '@/Context/User/UserContext';
import { Card, CardContent } from '@/Components/ui/card';
import { User } from 'lucide-react'; 

export default function FollowersPage() {
    const { followers } = useUser()


    return (
        <div className="max-w-2xl mx-auto px-4 py-10 text-black">
            <h1 className="text-2xl font-semibold mb-6">Your Followers</h1>

            <div className="space-y-4">
                {followers?.length > 0 ? (
                    followers.map((follower: { id: string; username: string }) => (
                        <Card key={follower.id}>
                            <CardContent className="p-4 flex items-center gap-4">
                                <User className="text-muted-foreground" />
                                <div className="text-sm font-medium text-black">@{follower.username}</div>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <div className="text-center text-muted-foreground">
                        You have no followers yet.
                    </div>
                )}
            </div>
        </div>
    );
}
