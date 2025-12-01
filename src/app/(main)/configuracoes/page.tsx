"use client";
import Link from 'next/link';
import {
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  TrashIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';
import { useApp } from '@/context/AppContext';
import { useRouter } from 'next/navigation';

export default function SettingsPage() {
  const { user, logout } = useApp();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/login');
  };

  return (
    <div className="max-w-3xl mx-auto pb-20">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Configurações</h1>

      <div className="space-y-6">
        {/* Conta */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-50 bg-gray-50/50">
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Conta</h2>
          </div>
          <div className="divide-y divide-gray-50">
            <Link href="/perfil/editar" className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition">
              <div className="flex items-center gap-3">
                <div className="bg-blue-50 p-2 rounded-lg text-blue-600">
                  <UserCircleIcon className="h-6 w-6" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Editar Perfil</p>
                  <p className="text-sm text-gray-500">Alterar nome, foto e informações</p>
                </div>
              </div>
              <ChevronRightIcon className="h-5 w-5 text-gray-400" />
            </Link>
          </div>
        </section>

        {/* Ações da Conta */}
        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-50 bg-gray-50/50">
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider text-red-600">Zona de Perigo</h2>
          </div>
          <div className="divide-y divide-gray-50">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-6 py-4 hover:bg-red-50 transition text-left group"
            >
              <div className="bg-red-50 p-2 rounded-lg text-red-600 group-hover:bg-white">
                <ArrowRightOnRectangleIcon className="h-6 w-6" />
              </div>
              <div>
                <p className="font-medium text-red-600">Sair da Conta</p>
                <p className="text-sm text-gray-500">Encerrar sua sessão atual</p>
              </div>
            </button>

            <button
              onClick={() => alert("Para excluir sua conta, entre em contato com o suporte: suporte@cuidapet.com")}
              className="w-full flex items-center gap-3 px-6 py-4 bg-red-50 hover:bg-red-100 transition text-left group border-t border-red-100"
            >
              <div className="bg-white p-2 rounded-lg text-red-600 border border-red-200 shadow-sm">
                <TrashIcon className="h-6 w-6" />
              </div>
              <div>
                <p className="font-black text-red-600 uppercase tracking-wide text-lg">Excluir Conta</p>
                <p className="text-xs font-bold text-red-500">Ação irreversível. Cuidado.</p>
              </div>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
