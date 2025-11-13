"use client";
import { ChatBubbleLeftRightIcon } from '@heroicons/react/24/solid';

export function ChatbotButton() {
  return (
    <button
      className="fixed bottom-6 right-6 bg-primary text-neutral-white p-4 rounded-full shadow-lg hover:bg-primary-dark transition-transform transform hover:scale-110"
      aria-label="Abrir chatbot"
    >
      <ChatBubbleLeftRightIcon className="h-8 w-8" />
    </button>
  );
}
