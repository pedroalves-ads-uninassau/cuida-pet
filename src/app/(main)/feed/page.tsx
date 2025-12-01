"use client";

import { useState, useRef } from 'react';
import Image from 'next/image';
import { useApp } from '@/context/AppContext';
import { PostCard } from '@/components/feed/PostCard';
import { PhotoIcon, PaperAirplaneIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { storage } from '@/services/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function FeedPage() {
  const { user, posts, addPost } = useApp();
  const [newPostContent, setNewPostContent] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Convert to Base64
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setPreviewUrl(base64String);
        // We store the base64 string directly in the state to send it later
      };
      reader.readAsDataURL(file);
      setSelectedImage(file);
    }
  };

  const handlePostSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim() && !previewUrl) return;

    setIsUploading(true);

    try {
      // Use the Base64 string directly (previewUrl) as the imageUrl
      // This bypasses Firebase Storage completely
      const imageUrl = previewUrl || undefined;

      await addPost(newPostContent, imageUrl);

      // Reset form
      setNewPostContent("");
      setSelectedImage(null);
      setPreviewUrl(null);
    } catch (error) {
      console.error("Error posting:", error);
      alert("Erro ao publicar. Tente novamente.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-[calc(100vh-64px)]">
      <div className="max-w-2xl mx-auto">

        {/* Create Post Widget */}
        {user && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 mb-8">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <Image
                  src={user.avatar}
                  alt={user.name}
                  width={48}
                  height={48}
                  className="rounded-full border border-gray-200"
                />
              </div>
              <div className="flex-grow">
                <form onSubmit={handlePostSubmit}>
                  <textarea
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    placeholder={`No que você está pensando, ${user.name.split(' ')[0]}?`}
                    className="w-full border-none resize-none focus:ring-0 text-gray-900 placeholder-gray-500 text-lg h-20"
                  />

                  {/* Image Preview */}
                  {previewUrl && (
                    <div className="relative mb-4 inline-block">
                      <img src={previewUrl} alt="Preview" className="h-32 w-auto rounded-lg object-cover border border-gray-200" />
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedImage(null);
                          setPreviewUrl(null);
                        }}
                        className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md border border-gray-200 hover:bg-gray-100"
                      >
                        <XMarkIcon className="h-4 w-4 text-gray-500" />
                      </button>
                    </div>
                  )}

                  <div className="flex justify-between items-center border-t border-gray-100 pt-3 mt-2">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageSelect}
                      accept="image/*"
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="text-gray-400 hover:text-primary transition-colors flex items-center gap-2 text-sm font-medium"
                    >
                      <PhotoIcon className="h-6 w-6" />
                      Foto/Vídeo
                    </button>
                    <button
                      type="submit"
                      disabled={(!newPostContent.trim() && !selectedImage) || isUploading}
                      className="bg-primary text-white px-6 py-2 rounded-full font-bold shadow-md hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
                    >
                      {isUploading ? (
                        <span className="animate-pulse">Enviando...</span>
                      ) : (
                        <>
                          <PaperAirplaneIcon className="h-4 w-4" />
                          Publicar
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Posts Feed */}
        <div className="space-y-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
