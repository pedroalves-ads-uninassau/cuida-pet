"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { MagnifyingGlassIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { useApp } from '@/context/AppContext';
import { db } from '@/services/firebase';
import { collection, query, where, onSnapshot, addDoc, orderBy, Timestamp, getDocs } from 'firebase/firestore';

type Message = {
  id: string;
  senderId: string;
  text: string;
  createdAt: any;
};

type ChatUser = {
  id: string;
  name: string;
  avatar: string;
  role: string;
};

export default function MensagensPage() {
  const { user } = useApp();
  const [availableUsers, setAvailableUsers] = useState<ChatUser[]>([]);
  const [selectedUser, setSelectedUser] = useState<ChatUser | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // 1. Fetch Users to Chat With
  useEffect(() => {
    const fetchUsers = async () => {
      if (!db || !user) return;

      try {
        const q = query(collection(db, "users"));
        const snapshot = await getDocs(q);
        const users = snapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() } as ChatUser))
          .filter(u => u.id !== user.uid); // Don't show myself

        console.log("Fetched users:", users); // Debug
        setAvailableUsers(users);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [user]);

  // Filter users based on search
  const filteredUsers = availableUsers.filter(u =>
    u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.role?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // 2. Listen to Messages when a user is selected
  useEffect(() => {
    if (!db || !user || !selectedUser) return;

    // Create a unique Chat ID based on the two User IDs (sorted so it's always the same for both)
    const chatId = [user.uid, selectedUser.id].sort().join("_");

    const q = query(
      collection(db, "chats", chatId, "messages"),
      orderBy("createdAt", "asc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Message));
      setMessages(msgs);
      // Scroll to bottom
      setTimeout(() => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
    });

    return () => unsubscribe();
  }, [user, selectedUser]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !user || !selectedUser || !db) return;

    const chatId = [user.uid, selectedUser.id].sort().join("_");

    try {
      await addDoc(collection(db, "chats", chatId, "messages"), {
        senderId: user.uid,
        text: newMessage,
        createdAt: Timestamp.now()
      });
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // ... (rest of useEffects)

  return (
    <div className="h-[calc(100vh-64px)] flex bg-gray-50">
      {/* Sidebar - User List */}
      <div className={`w-full md:w-80 bg-white border-r border-gray-200 flex flex-col ${selectedUser ? 'hidden md:flex' : 'flex'}`}>
        <div className="p-4 border-b border-gray-200">
          <h1 className="text-xl font-bold text-gray-900 mb-4">Conversas</h1>
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar usuário..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-100 border-0 rounded-lg py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary"
            />
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredUsers.length === 0 ? (
            <p className="p-4 text-center text-gray-500 text-sm">Nenhum usuário encontrado.</p>
          ) : (
            filteredUsers.map(u => (
              <button
                key={u.id}
                onClick={() => setSelectedUser(u)}
                className={`w-full flex items-center p-4 hover:bg-gray-50 transition border-b border-gray-50 ${selectedUser?.id === u.id ? 'bg-blue-50' : ''}`}
              >
                <div className="relative w-10 h-10 mr-3">
                  <Image src={u.avatar || "/images/avatar-placeholder.svg"} alt={u.name || "User"} fill className="rounded-full object-cover" />
                </div>
                <div className="text-left">
                  <p className="font-bold text-gray-900 text-sm">{u.name || "Usuário sem nome"}</p>
                  <p className="text-xs text-gray-500 capitalize">{u.role === 'clinic' ? 'Clínica' : u.role === 'tutor' ? 'Tutor' : u.role}</p>
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Chat Area */}
      <div className={`flex-1 flex flex-col ${!selectedUser ? 'hidden md:flex' : 'flex'}`}>
        {selectedUser ? (
          <>
            {/* Chat Header */}
            <div className="p-4 bg-white border-b border-gray-200 flex items-center justify-between shadow-sm z-10">
              <div className="flex items-center">
                <button onClick={() => setSelectedUser(null)} className="md:hidden mr-3 text-gray-500">
                  ←
                </button>
                <div className="relative w-8 h-8 mr-3">
                  <Image src={selectedUser.avatar || "/images/avatar-placeholder.svg"} alt={selectedUser.name} fill className="rounded-full object-cover" />
                </div>
                <span className="font-bold text-gray-900">{selectedUser.name}</span>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-100">
              {messages.length === 0 && (
                <p className="text-center text-gray-400 text-sm mt-10">Comece a conversa com {selectedUser.name}!</p>
              )}
              {messages.map(msg => {
                const isMe = msg.senderId === user?.uid;
                return (
                  <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[70%] rounded-2xl px-4 py-2 text-sm ${isMe ? 'bg-primary text-white rounded-tr-none' : 'bg-white text-gray-800 border border-gray-200 rounded-tl-none'}`}>
                      <p>{msg.text}</p>
                      <p className={`text-[10px] mt-1 text-right ${isMe ? 'text-white/70' : 'text-gray-400'}`}>
                        {msg.createdAt ? new Date(msg.createdAt.toDate()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '...'}
                      </p>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-gray-200">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Digite sua mensagem..."
                  className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <button
                  type="submit"
                  disabled={!newMessage.trim()}
                  className="bg-primary text-white p-2 rounded-full hover:bg-primary-dark disabled:opacity-50 transition"
                >
                  <PaperAirplaneIcon className="h-5 w-5" />
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50 text-gray-400">
            <div className="text-center">
              <p className="text-lg font-medium">Selecione uma clínica para conversar</p>
              <p className="text-sm">Suas conversas aparecerão aqui</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
