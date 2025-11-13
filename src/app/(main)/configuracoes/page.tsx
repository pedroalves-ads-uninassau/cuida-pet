"use client";
import { useRouter } from 'next/navigation';
import {
  KeyIcon,
  EnvelopeIcon,
  UserIcon,
  ArrowRightOnRectangleIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';

export default function ConfiguracoesPage() {
  const router = useRouter();

  const handleLogout = () => {
    // In a real app, you'd clear the user's session here
    router.push('/login');
  };

  const settingsOptions = [
    { name: 'Alterar Nome de Usuário', icon: UserIcon, action: () => {} },
    { name: 'Alterar E-mail', icon: EnvelopeIcon, action: () => {} },
    { name: 'Alterar Senha', icon: KeyIcon, action: () => {} },
  ];

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-neutral-black mb-6">Configurações</h1>
        <div className="bg-neutral-white rounded-2xl shadow-lg overflow-hidden">
          <ul className="divide-y divide-neutral-gray-light">
            {settingsOptions.map((option) => (
              <li key={option.name}>
                <button
                  onClick={option.action}
                  className="w-full flex items-center justify-between p-4 text-left hover:bg-primary-light/20 transition"
                >
                  <div className="flex items-center gap-4">
                    <option.icon className="h-6 w-6 text-neutral-gray-dark" />
                    <span className="text-neutral-black font-medium">{option.name}</span>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 bg-neutral-white rounded-2xl shadow-lg overflow-hidden">
          <ul className="divide-y divide-neutral-gray-light">
            <li>
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-primary-light/20 transition"
              >
                <div className="flex items-center gap-4">
                  <ArrowRightOnRectangleIcon className="h-6 w-6 text-support-blue" />
                  <span className="text-support-blue font-medium">Sair da Conta</span>
                </div>
              </button>
            </li>
            <li>
              <button
                onClick={() => { alert('Esta ação é permanente e não pode ser desfeita.'); }}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-red-50 transition"
              >
                <div className="flex items-center gap-4">
                  <TrashIcon className="h-6 w-6 text-support-red" />
                  <span className="text-support-red font-medium">Excluir Conta</span>
                </div>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
