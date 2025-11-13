
export default function AgendamentosPage() {
  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-neutral-black mb-6">Meus Agendamentos</h1>
        <div className="bg-neutral-white rounded-2xl shadow-lg p-8">
          <div className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-neutral-gray-light rounded-lg">
            <p className="text-neutral-gray-dark">Você ainda não tem agendamentos.</p>
            <button className="mt-4 bg-primary text-neutral-white px-6 py-2 rounded-full font-semibold text-sm shadow-md hover:bg-primary-dark transition duration-300">
              Encontrar uma clínica
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
