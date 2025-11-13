
export default function ChatbotPage() {
  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-neutral-black">Jarvis, seu assistente virtual</h1>
        <p className="mt-4 text-lg text-neutral-gray-dark">
          Olá! Eu sou o Jarvis. Estou aqui para ajudar você a encontrar informações, agendar serviços e muito mais.
        </p>
        <div className="mt-8 w-full h-[60vh] bg-neutral-white rounded-2xl shadow-lg flex flex-col">
          <div className="flex-grow p-4 overflow-y-auto">
            {/* Chat messages will go here */}
            <div className="flex justify-start mb-4">
              <div className="bg-primary-light/50 rounded-lg p-3 max-w-xs">
                <p className="text-neutral-black">Olá! Como posso ajudar você hoje?</p>
              </div>
            </div>
          </div>
          <div className="p-4 border-t border-neutral-gray-light">
            <input
              type="text"
              placeholder="Digite sua mensagem..."
              className="w-full rounded-full border-neutral-gray-light px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
