'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/Components/ui/card';
import { useUser } from '@/Context/User/UserContext';
import { useVerify } from '@/Context/Verfiy/verifyContext';
import { Button } from '@/Components/ui/button';

export default function ExplorePage() {
    const { auth } = useVerify();
    const { getAllpsot, post } = useUser();
    const [ expandedPostId, setExpandedPostId ] = useState<string | null>(null);
    const [ selectedPost, setSelectedPost ] = useState<{ title: string; description: string } | null>(null);
    useEffect(() => {
        if (auth.accessToken) {
            getAllpsot();
        }
    }, [ auth.accessToken ]);

    const toggleExpand = (postId: string) => {
        setExpandedPostId(prev => (prev === postId ? null : postId));
    };

    console.log(post)

    return (
        <div className="max-w-5xl mx-auto px-4 py-10 text-black">
            <h1 className="text-2xl font-semibold mb-6 text-center">Explore Posts</h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {post?.length > 0 ? (
                    post.map((data, idx) => {
                        const isExpanded = expandedPostId === data._id;
                        const displayText = isExpanded
                            ? data.description
                            : data.description?.slice(0, 10) + (data.description?.length > 100 ? '...' : '');

                        return (
                            <Card key={data._id || idx} className="h-auto p-4">
                                <CardContent className="space-y-2 text-muted-foreground">
                                    <div className="text-sm text-gray-600">@{data?.creator_name || 'anonymous'}</div>
                                    <h2 className="text-lg font-semibold text-black">
                                        {data.title}
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
                        );
                    })
                ) : (
                    <div className="col-span-full flex justify-center items-center h-48">
                        <h1 className="text-xl text-muted-foreground">No posts found</h1>
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
