'use client';

import { Button } from "@/Components/ui/button";
import { Card, CardContent } from "@/Components/ui/card";
import { useUser } from "@/Context/User/UserContext";
import { useVerify } from "@/Context/Verfiy/verifyContext";
import { useEffect, useState } from "react";

export default function NotificationPage() {
  const { fetch_all_Follow_request, requests, accept_follow } = useUser();
  const { auth } = useVerify();

  const [followAccepted, setFollowAccepted] = useState(false);

  useEffect(() => {
    if (auth.accessToken) {
      fetch_all_Follow_request();
    }
  }, [auth.accessToken]);

  const handleAccept = async (id: string) => {
    await accept_follow(id);
    setFollowAccepted(true);

    // Refresh request list after accepting
    fetch_all_Follow_request();

    // Show success message temporarily
    setTimeout(() => {
      setFollowAccepted(false);
    }, 2000);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-semibold mb-6">Notifications</h1>

      {followAccepted ? (
        <Card className="p-6 text-center text-green-600 text-lg font-medium">
          ✅ Follow request accepted!
        </Card>
      ) : requests.length > 0 ? (
        <div className="space-y-4">
          {requests.map((req: Record<string, any>) => (
            <Card key={req._id}>
              <CardContent className="p-4 space-y-2">
                <div className="text-sm font-medium text-black">
                  @{req.username}
                </div>
                <div className="text-xs text-gray-500">
                  {new Date(req.createdAt).toLocaleString()}
                </div>
                <Button
                  onClick={() => handleAccept(req._id)}
                  className="mt-2"
                >
                  Accept Request
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="col-span-full flex justify-center items-center h-48">
          <h1 className="text-xl text-muted-foreground">No notifications found</h1>
        </div>
      )}
    </div>
  );
}
