'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/Components/ui/button';
import { Card, CardContent } from '@/Components/ui/card';
import { useUser } from '@/Context/User/UserContext';
import { useVerify } from '@/Context/Verfiy/verifyContext';

export default function ProfilePage() {

  const router = useRouter();
  const { fetching_user, user, fetching_post, userPost, fetch_user_post } = useUser();
  const { auth } = useVerify();

  const [ selectedPost, setSelectedPost ] = useState<{ title: string; description: string } | null>(null);

  useEffect(() => {
    if (auth.accessToken) {
      fetching_user();
      fetching_post();
      fetch_user_post()
    }
  }, [ auth.accessToken ]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 text-black relative">
      <div className="pb-6 border-b border-gray-300">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h1 className="text-2xl font-semibold">{user?.username}</h1>
          <Button onClick={() => router.push('/CreatePost')}>Create Post</Button>
        </div>
        <div className="flex gap-8 text-sm sm:text-base mb-4">
          <Button onClick={() => router.push('/Followers')} className='cursor-pointer'><strong>{user?.follwers?.length ?? 0}</strong> followers</Button>
          <Button onClick={() => router.push('/Following')} className='cursor-pointer' ><strong>{user?.following?.length ?? 0}</strong> following</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-8">
        {userPost.length > 0 ? (
          userPost.map((data, idx) => (
            <Card key={data._id || idx} className="h-auto p-4">
              <CardContent className="space-y-2 text-muted-foreground">
                <h2 className="text-lg font-semibold text-black">
                  Post #{idx + 1}: {data.title}
                </h2>
                <p className="text-sm">
                  {data.description.length > 10
                    ? `${data.description.slice(0, 10)}...`
                    : data.description}
                </p>
                {data.description.length > 10 && (
                  <button
                    onClick={() => setSelectedPost({ title: data.title, description: data.description })}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    View More
                  </button>
                )}
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full flex justify-center items-center h-48">
            <h1 className="text-xl text-muted-foreground">No posts available</h1>
          </div>
        )}
      </div>

      {selectedPost && (
        <div className="fixed inset-0 bg-white bg-opacity-95 z-50 flex flex-col items-center justify-center px-6 text-center">
          <h2 className="text-2xl font-bold mb-4">{selectedPost.title}</h2>
          <p className="text-base text-gray-700 max-w-xl">{selectedPost.description}</p>
          <Button className="mt-6" onClick={() => setSelectedPost(null)}>Close</Button>
        </div>
      )}
    </div>
  );
}
