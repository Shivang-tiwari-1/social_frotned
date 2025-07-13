'use client';

import { Button } from '@/Components/ui/button';
import { Card } from '@/Components/ui/card';
import { Input } from '@/Components/ui/input';
import { Textarea } from '@/Components/ui/textarea';
import { useUser } from '@/Context/User/UserContext';
import { useState } from 'react';

export default function CreatePostPage() {
  const { create_post } = useUser();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!title || !description) {
      alert('Please fill in both fields');
      return;
    }

    create_post(title, description);
    console.log({ title, description });

    setIsSubmitted(true);

    setTimeout(() => {
      setTitle('');
      setDescription('');
      setIsSubmitted(false);
    }, 2000); 
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      {isSubmitted ? (
        <Card className="w-full max-w-md p-10 text-center text-green-600 text-xl font-semibold bg-white">
          ✅ Post Created Successfully
        </Card>
      ) : (
        <Card className="w-full max-w-xl p-6 space-y-4 bg-white">
          <h2 className="text-xl font-semibold text-center">Create New Post</h2>

          <Input
            placeholder="Post Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <Textarea
            placeholder="Write your description here..."
            rows={5}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <Button className="w-full" onClick={handleSubmit}>
            Post
          </Button>
        </Card>
      )}
    </div>
  );
}
