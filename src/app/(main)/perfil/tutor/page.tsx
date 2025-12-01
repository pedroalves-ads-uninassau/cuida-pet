"use client";
import { useApp } from '@/context/AppContext';
import { PostCard } from '@/components/feed/PostCard';
import Image from 'next/image';
import Link from 'next/link';
import { PlusIcon } from '@heroicons/react/24/outline';

export default function ProfilePage() {
  const { user, posts, pets, deletePet } = useApp();

  const myPosts = posts.filter(post => post.author.name === user?.name);

  return (
    <div className="max-w-3xl mx-auto pb-20">
      {/* Profile Header */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-6">
        <div className="h-32 bg-gradient-to-r from-primary to-primary-dark"></div>
        <div className="px-6 pb-6">
          <div className="relative flex justify-between items-end -mt-12 mb-4">
            <div className="relative w-24 h-24 rounded-full border-4 border-white shadow-md bg-white">
              <Image
                src={user?.avatar || "/images/avatar-placeholder.svg"}
                alt="Profile"
                fill
                className="rounded-full object-cover"
              />
            </div>
            <Link
              href="/perfil/editar"
              className="mb-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full text-sm font-bold transition"
            >
              Editar Perfil
            </Link>
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-900">{user?.name}</h1>
            <p className="text-gray-500">{user?.email}</p>
            <p className="text-sm text-gray-400 mt-1 capitalize">
              {user?.role === 'admin' ? 'Administrador' : user?.role === 'clinic' ? 'Clínica Veterinária' : 'Tutor'}
            </p>
          </div>
        </div>
      </div>

      {/* Meus Pets (Only for Tutors) */}
      {user?.role !== 'clinic' && (
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4 px-2">
            <h2 className="text-xl font-bold text-gray-900">Meus Pets 🐶</h2>
            <Link
              href="/pets/novo"
              className="flex items-center gap-1 text-sm font-bold text-primary hover:text-primary-dark"
            >
              <PlusIcon className="h-4 w-4" />
              Adicionar Pet
            </Link>
          </div>

          {pets.length === 0 ? (
            <div className="bg-white rounded-2xl p-8 text-center border border-gray-100 border-dashed">
              <p className="text-gray-500 mb-4">Você ainda não cadastrou nenhum pet.</p>
              <Link
                href="/pets/novo"
                className="inline-block px-6 py-2 bg-primary text-white rounded-full font-bold shadow-md hover:bg-primary-dark transition"
              >
                Cadastrar Pet Agora
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {pets.map((pet) => (
                <div key={pet.id} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
                  <div className="relative w-16 h-16 bg-gray-100 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={pet.imageUrl || "/images/pet-placeholder.svg"}
                      alt={pet.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{pet.name}</h3>
                    <p className="text-sm text-gray-500">{pet.breed} • {pet.age}</p>
                    <div className="flex gap-3 mt-2">
                      <Link href={`/pets/editar/${pet.id}`} className="text-xs font-bold text-primary hover:underline">
                        Editar
                      </Link>
                      <button
                        onClick={async () => {
                          if (confirm('Tem certeza que deseja excluir este pet?')) {
                            await deletePet(pet.id);
                          }
                        }}
                        className="text-xs font-bold text-red-500 hover:underline"
                      >
                        Excluir
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Clinic Details (Only for Clinics) */}
      {user?.role === 'clinic' && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4 px-2">Dados da Clínica 🏥</h2>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
            <div>
              <p className="text-sm text-gray-500">Endereço</p>
              <p className="font-medium text-gray-900">{user.address || 'Não informado'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Telefone</p>
              <p className="font-medium text-gray-900">{user.phone || 'Não informado'}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">CNPJ</p>
              <p className="font-medium text-gray-900">{user.cnpj || 'Não informado'}</p>
            </div>
          </div>
        </div>
      )}

      {/* Meus Posts */}
      <div>
        <h2 className="text-xl font-bold text-gray-900 mb-4 px-2">Minhas Publicações</h2>
        <div className="space-y-6">
          {myPosts.length > 0 ? (
            myPosts.map(post => (
              <PostCard key={post.id} post={post} />
            ))
          ) : (
            <p className="text-gray-500 text-center py-8">Você ainda não fez nenhuma publicação.</p>
          )}
        </div>
      </div>
    </div>
  );
}
