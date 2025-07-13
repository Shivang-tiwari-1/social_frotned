'use client';

import { useUser } from '@/Context/User/UserContext';
import { Button } from '@/Components/ui/button';
import { Card, CardContent } from '@/Components/ui/card';

export default function FollowersPage() {

    const { following } = useUser()
    const { unfollow } = useUser()
    interface FollowUser {
        accessToken: string,
        refreshToken: string,
        user: {
            _id: string,
            username: string,
            password: string,
            follwers: [
                {
                    id: string,
                    username: string
                }
            ]
            following: [
                {
                    id: string,
                    username: string
                }
            ]
        }
    }
    const handleUnfollow = (id: string) => {
        console.log(id)
        unfollow(id);
    };

    return (
        <div className="max-w-2xl mx-auto px-4 py-10 text-black">
            <h1 className="text-2xl font-semibold mb-6">Your Followers</h1>

            <div className="space-y-4">
                {following.length > 0 ? (
                    following.map((follower: FollowUser) => (
                        <Card key={follower.id}>
                            <CardContent className="p-4 flex items-center justify-between">
                                <div className="text-sm font-medium">@{follower.username}</div>
                                <Button variant="destructive" onClick={() => handleUnfollow(follower.id)}>
                                    Unfollow
                                </Button>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <div className="text-muted-foreground text-center">No followers found.</div>
                )}
            </div>
        </div>
    );
}
