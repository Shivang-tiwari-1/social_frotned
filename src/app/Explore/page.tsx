'use client';


import { useEffect } from 'react';
import { useVerify } from '@/Context/Verfiy/verifyContext';
import { useUser } from '@/Context/User/UserContext';
import { Button } from '@/Components/ui/button';
import { Card, CardContent } from '@/Components/ui/card';


export default function TimelinePage() {
  const { auth } = useVerify();
  const { find_to_follow, people, follow_request } = useUser(); // Ensure this is exposed in your context

  useEffect(() => {
    if (auth?.accessToken) {
      find_to_follow();
    }
  }, [ auth?.accessToken ]);

  const handleFollow = async (userId: string) => {
    try {
      await follow_request(userId);
      console.log(people)
      console.log(`Follow request sent to user ID: `);
      console.log(people)
    } catch (err) {
      console.error(`Error sending follow request to user ID: ${userId}`, err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold mb-6">Suggested People</h1>

      <div className="space-y-4">
        {people?.map((person: any) => (
          <Card key={person._id}>
            <CardContent className="p-4 flex justify-between items-center">
              {/* User Info */}
              <div>
                <p className="font-semibold text-black text-sm">@{person.username}</p>
                <p className="text-xs text-muted-foreground">{person.email}</p>
              </div>

              {/* Follow Button */}
              <Button onClick={() => handleFollow(person._id)} className="text-sm">
                Follow
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
