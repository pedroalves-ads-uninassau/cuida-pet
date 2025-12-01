"use client";
import Link from 'next/link';
import {
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  QuestionMarkCircleIcon,
  ChevronRightIcon,
  TrashIcon
} from '@heroicons/react/24/outline';
import { useApp } from '@/context/AppContext';
import { useRouter } from 'next/navigation';

export default function SettingsPage() {
  const { logout } = useApp();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  return (
    <div className="max-w-2xl mx-auto pb-20 px-4">
      <h1 className="text-2xl font-bold text-gray-900 mb-6 mt-8">Configurações</h1>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-50">
        <Link href="/perfil/editar" className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition group">
          <div className="flex items-center gap-4">
            <div className="bg-blue-50 p-2 rounded-xl text-blue-600 group-hover:bg-blue-100 transition">
              <UserCircleIcon className="h-6 w-6" />
            </div>
            <span className="font-medium text-gray-900">Editar Perfil</span>
          </div>
          <ChevronRightIcon className="h-5 w-5 text-gray-400" />
        </Link>

        <Link href="/help" className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition group">
          <div className="flex items-center gap-4">
            <div className="bg-purple-50 p-2 rounded-xl text-purple-600 group-hover:bg-purple-100 transition">
              <QuestionMarkCircleIcon className="h-6 w-6" />
            </div>
            <span className="font-medium text-gray-900">Central de Ajuda</span>
          </div>
          <ChevronRightIcon className="h-5 w-5 text-gray-400" />
        </Link>

        <button
          onClick={() => {
            if (confirm("Tem certeza? Essa ação não pode ser desfeita e você perderá todos os seus dados.")) {
              alert("Para segurança dos seus dados, o processo de exclusão deve ser solicitado ao suporte.\n\nEnvie um e-mail para: suporte@cuidapet.com");
            }
          }}
          className="w-full flex items-center justify-between px-6 py-4 hover:bg-red-50 transition group text-left"
        >
          <div className="flex items-center gap-4">
            <div className="bg-red-50 p-2 rounded-xl text-red-600 group-hover:bg-red-100 transition">
              <TrashIcon className="h-6 w-6" />
            </div>
            <span className="font-medium text-red-600">Excluir Conta</span>
          </div>
        </button>

        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition group text-left"
        >
          <div className="flex items-center gap-4">
            <div className="bg-gray-100 p-2 rounded-xl text-gray-600 group-hover:bg-gray-200 transition">
              <ArrowRightOnRectangleIcon className="h-6 w-6" />
            </div>
            <span className="font-medium text-gray-900">Sair da Conta</span>
          </div>
        </button>
      </div>

      <p className="text-center text-gray-400 text-xs mt-8">
        Cuida Pet v1.0.0
      </p>
    </div>
  );
}
