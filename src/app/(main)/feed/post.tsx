import React, { useState, ChangeEvent, FormEvent } from "react";
import { PostCard } from "@/components/feed/PostCard";

type Comment = {
  id: number;
  text: string;
};

type Post = {
  id: number;
  content: string;
  image?: string;
  comments: Comment[];
};

export default function FeedPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [text, setText] = useState("");
  const [image, setImage] = useState<string | undefined>(undefined);
  const [commentText, setCommentText] = useState<{ [key: number]: string }>({});

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handlePost = (e: FormEvent) => {
    e.preventDefault();
    if (!text.trim() && !image) return;

    const newPost: Post = {
      id: Date.now(),
      content: text,
      image,
      comments: [],
    };

    setPosts([newPost, ...posts]);
    setText("");
    setImage(undefined);
  };

  return (
    <div className="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:px-8 bg-gray-100">
      <form onSubmit={handlePost} className="mb-6 space-y-3">
        <textarea
          placeholder="Compartilhe algo..."
          value={text}
          onChange={handleTextChange}
          rows={3}
          className="w-full p-2 border rounded"
        />
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {image && (
          <div className="mt-2">
            <img src={image} alt="preview" className="w-full rounded-lg" />
          </div>
        )}
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Postar
        </button>
      </form>

      <div className="space-y-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
