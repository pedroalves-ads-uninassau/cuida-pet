"use client";
import Image from 'next/image';
import { 
  HeartIcon, 
  ChatBubbleOvalLeftIcon, 
  ShareIcon 
} from '@heroicons/react/24/outline';

export function PostCard({ post }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Post Header */}
      <div className="p-4 flex items-center gap-3">
        <Image
          src={post.author.avatarUrl}
          alt={`${post.author.name}'s avatar`}
          width={40}
          height={40}
          className="rounded-full"
        />
        <div>
          <p className="font-baloo font-bold text-black">{post.author.name}</p>
          <p className="font-baloo text-sm text-gray-dark">{post.time}</p>
        </div>
      </div>

      {/* Post Content */}
      <div className="px-4 pb-4">
        <p className="font-baloo text-black">{post.content}</p>
      </div>

      {/* Post Image */}
      {post.imageUrl && (
        <div className="w-full h-96 relative">
          <Image
            src={post.imageUrl}
            alt="Post image"
            layout="fill"
            objectFit="cover"
          />
        </div>
      )}

      {/* Post Actions */}
      <div className="p-4 flex justify-around border-t border-gray-light">
        <button className="flex items-center gap-2 text-gray-dark hover:text-red">
          <HeartIcon className="h-6 w-6" />
          <span className="font-baloo font-semibold">Curtir</span>
        </button>
        <button className="flex items-center gap-2 text-gray-dark hover:text-primary">
          <ChatBubbleOvalLeftIcon className="h-6 w-6" />
          <span className="font-baloo font-semibold">Comentar</span>
        </button>
        <button className="flex items-center gap-2 text-gray-dark hover:text-blue">
          <ShareIcon className="h-6 w-6" />
          <span className="font-baloo font-semibold">Compartilhar</span>
        </button>
      </div>
    </div>
  );
}
