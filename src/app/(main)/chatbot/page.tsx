"use client";

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { PaperAirplaneIcon, UserCircleIcon } from '@heroicons/react/24/solid';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Olá! Eu sou o Jarvis. Como posso ajudar você e seu pet hoje? 🐾' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();

      if (data.reply) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: 'Desculpe, não consegui processar sua mensagem. Tente novamente.' }]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Ocorreu um erro ao conectar com o servidor. Por favor, tente mais tarde.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[calc(100vh-64px)] bg-gray-50 flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
        <div className="max-w-3xl mx-auto space-y-6">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex max-w-[80%] sm:max-w-[70%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'} items-end gap-2`}>
                <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${msg.role === 'user' ? 'bg-primary-light' : 'bg-blue-100'}`}>
                  {msg.role === 'user' ? (
                    <UserCircleIcon className="h-6 w-6 text-primary-dark" />
                  ) : (
                    <Image src="/images/logo-cuida-pet.png" width={24} height={24} alt="Jarvis" />
                  )}
                </div>
                <div
                  className={`px-4 py-3 rounded-2xl shadow-sm ${msg.role === 'user'
                      ? 'bg-primary text-white rounded-br-none'
                      : 'bg-white text-gray-800 rounded-bl-none'
                    }`}
                >
                  <p className="text-sm sm:text-base leading-relaxed">{msg.content}</p>
                </div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex items-center gap-2 bg-white px-4 py-3 rounded-2xl rounded-bl-none shadow-sm">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="bg-white border-t border-gray-200 p-4">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Digite sua mensagem para o Jarvis..."
              className="w-full bg-gray-100 text-gray-900 placeholder-gray-500 border-0 rounded-full py-3 pl-5 pr-12 focus:ring-2 focus:ring-primary focus:bg-white transition-all shadow-sm"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              className="absolute right-2 p-2 bg-primary text-white rounded-full hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
            >
              <PaperAirplaneIcon className="h-5 w-5" />
            </button>
          </form>
          <p className="text-center text-xs text-gray-400 mt-2">
            O Jarvis pode cometer erros. Verifique as informações importantes.
          </p>
        </div>
      </div>
    </div>
  );
}
