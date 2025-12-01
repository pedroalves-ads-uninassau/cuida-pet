"use client";
import Image from 'next/image';
import Link from 'next/link';
import {
  HeartIcon,
  ChatBubbleLeftIcon,
  ShareIcon,
  EllipsisHorizontalIcon,
  PencilIcon,
  TrashIcon
} from '@heroicons/react/24/outline';
import { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { collection, getDocs, query, orderBy, doc, updateDoc, increment, addDoc, deleteDoc } from 'firebase/firestore';
import { db } from '@/services/firebase';
import { Menu, Transition } from '@headlessui/react';
import { Fragment } from 'react';

type Post = {
  id: string;
  author: {
    name: string;
    avatarUrl: string;
    uid?: string;
  };
  time: string;
  content: string;
  imageUrl?: string;
  likes: number;
  comments: number;
  createdAt?: any;
};

export function PostCard({ post }: { post: Post }) {
  const { user, deletePost, editPost, likePost, addComment } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(post.content);
  const [showComments, setShowComments] = useState(false);
  const [commentsList, setCommentsList] = useState<any[]>([]);

  const isAuthor = user?.uid === post.author.uid;

  const handleSaveEdit = async () => {
    if (editContent.trim() !== post.content) {
      await editPost(post.id, editContent);
    }
    setIsEditing(false);
  };

  const toggleComments = async () => {
    if (!showComments) {
      try {
        if (db) {
          const q = query(collection(db, "posts", post.id, "comments"), orderBy("createdAt", "asc"));
          const snapshot = await getDocs(q);
          const loadedComments = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setCommentsList(loadedComments);
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    }
    setShowComments(!showComments);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10">
              <Image
                src={post.author.avatarUrl}
                alt={post.author.name}
                fill
                className="rounded-full object-cover border border-gray-100"
              />
            </div>
            <div>
              <Link href={`/perfil/${post.author.uid}`} className="hover:underline">
                <h3 className="font-bold text-gray-900 text-sm">{post.author.name}</h3>
              </Link>
              <p className="text-xs text-gray-500">{post.time}</p>
            </div>
          </div>

          {isAuthor && (
            <Menu as="div" className="relative inline-block text-left">
              <Menu.Button className="p-1 rounded-full hover:bg-gray-100 transition">
                <EllipsisHorizontalIcon className="h-6 w-6 text-gray-400" />
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 mt-2 w-36 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                  <div className="px-1 py-1">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => setIsEditing(true)}
                          className={`${active ? 'bg-primary text-white' : 'text-gray-900'
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                          <PencilIcon className="mr-2 h-4 w-4" />
                          Editar
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => deletePost(post.id)}
                          className={`${active ? 'bg-red-500 text-white' : 'text-gray-900'
                            } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                        >
                          <TrashIcon className="mr-2 h-4 w-4" />
                          Excluir
                        </button>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          )}
        </div>

        {isEditing ? (
          <div className="mb-3">
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-2 focus:ring-primary focus:border-primary"
              rows={3}
            />
            <div className="flex justify-end gap-2 mt-2">
              <button
                onClick={() => setIsEditing(false)}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Cancelar
              </button>
              <button
                onClick={handleSaveEdit}
                className="text-sm bg-primary text-white px-3 py-1 rounded-full font-bold"
              >
                Salvar
              </button>
            </div>
          </div>
        ) : (
          <p className="text-gray-800 mb-3 whitespace-pre-wrap">{post.content}</p>
        )}

        {post.imageUrl && (
          <div className="relative w-full h-64 mb-3 rounded-xl overflow-hidden bg-gray-100">
            <Image
              src={post.imageUrl}
              alt="Post content"
              fill
              className="object-cover"
            />
          </div>
        )}

        <div className="flex items-center gap-6 pt-3 border-t border-gray-50">
          <button
            onClick={() => likePost(post.id)}
            className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition group"
          >
            <HeartIcon className="h-5 w-5 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium">{post.likes}</span>
          </button>

          <div className="flex gap-4">
            <button
              onClick={() => {
                const text = prompt("Escreva seu comentário:");
                if (text) addComment(post.id, text);
              }}
              className="flex items-center gap-2 text-gray-500 hover:text-primary transition group"
            >
              <ChatBubbleLeftIcon className="h-5 w-5 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium">Comentar</span>
            </button>

            <button
              onClick={toggleComments}
              className="text-sm text-gray-500 hover:text-primary hover:underline"
            >
              Ver comentários ({post.comments || 0})
            </button>
          </div>


        </div>

        {/* Comments Section */}
        {showComments && (
          <div className="mt-4 pt-4 border-t border-gray-50 space-y-3 bg-gray-50/50 p-3 rounded-xl">
            {commentsList.length > 0 ? (
              commentsList.map((comment) => (
                <div key={comment.id} className="text-sm">
                  <span className="font-bold text-gray-900">{comment.authorName}: </span>
                  <span className="text-gray-700">{comment.text}</span>
                </div>
              ))
            ) : (
              <p className="text-xs text-gray-500 text-center">Nenhum comentário ainda.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
