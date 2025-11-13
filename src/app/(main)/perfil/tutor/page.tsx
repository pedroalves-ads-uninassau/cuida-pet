import Image from 'next/image';

export default function PerfilTutorPage() {
  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-neutral-white rounded-2xl shadow-lg p-8">
          <div className="flex flex-col items-center md:flex-row md:items-start gap-8">
            <Image
              src="/images/avatar-placeholder.svg"
              alt="Avatar do Tutor"
              width={150}
              height={150}
              className="rounded-full border-4 border-primary"
            />
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-bold text-neutral-black">Nome do Tutor</h1>
              <p className="text-lg text-neutral-gray-dark mt-2">email@tutor.com</p>
              <div className="mt-4 flex justify-center md:justify-start gap-4">
                <button className="bg-primary text-neutral-white px-6 py-2 rounded-full font-semibold text-sm shadow-md hover:bg-primary-dark transition duration-300">
                  Editar Perfil
                </button>
                <button className="bg-support-blue text-neutral-white px-6 py-2 rounded-full font-semibold text-sm shadow-md hover:bg-blue-700 transition duration-300">
                  Adicionar Pet
                </button>
              </div>
            </div>
          </div>
          <hr className="my-8 border-neutral-gray-light" />
          <div>
            <h2 className="text-2xl font-bold text-neutral-black mb-4">Meus Pets</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Placeholder for pet cards */}
              <div className="bg-primary-light/20 p-4 rounded-lg text-center">
                <Image 
                  src="/images/post-placeholder.svg" 
                  width={100} 
                  height={100} 
                  alt="Foto do Pet" 
                  className="mx-auto rounded-full mb-2"
                />
                <h3 className="font-bold text-lg text-primary-dark">Nome do Pet</h3>
                <p className="text-sm text-neutral-gray-dark">Raça do Pet</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
