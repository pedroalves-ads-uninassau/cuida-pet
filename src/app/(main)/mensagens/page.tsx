
export default function MensagensPage() {
  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-neutral-black">Mensagens</h1>
        <p className="mt-4 text-neutral-gray-dark">
          Esta página exibirá a lista de conversas com clínicas e outros tutores.
        </p>
        <div className="mt-8 w-full h-96 bg-neutral-gray-light rounded-lg flex items-center justify-center">
          <p className="text-neutral-gray-dark">[Componente de Chat]</p>
        </div>
      </div>
    </div>
  );
}
