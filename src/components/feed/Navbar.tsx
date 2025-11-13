"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useOnClickOutside } from '@/utils/hooks';
import { 
  MagnifyingGlassIcon, 
  MapIcon, 
  ChatBubbleOvalLeftEllipsisIcon, 
  UserCircleIcon,
  ChatBubbleLeftRightIcon,
  CalendarIcon,
  Cog6ToothIcon,
  QuestionMarkCircleIcon,
  InformationCircleIcon,
  ArrowRightOnRectangleIcon,
} from '@heroicons/react/24/outline';

export function Navbar() {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const router = useRouter();
  
  const profileMenuRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(profileMenuRef, () => setIsProfileMenuOpen(false));

  const handleLogout = () => {
    setIsProfileMenuOpen(false);
    router.push('/login');
  };

  const profileMenuItems = [
    { name: 'Meu Perfil', href: '/perfil/tutor', icon: UserCircleIcon },
    { name: 'Agendamentos', href: '/agendamentos', icon: CalendarIcon },
    { name: 'Configurações', href: '/configuracoes', icon: Cog6ToothIcon },
    { name: 'Ajuda', href: '/help', icon: QuestionMarkCircleIcon },
    { name: 'Sobre', href: '/sobre', icon: InformationCircleIcon },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/feed" className="flex items-center gap-2">
              <Image
                src="/images/logo-cuida-pet.png"
                alt="Cuida Pet Logo"
                width={32}
                height={32}
                className="rounded-full"
              />
              <span className="text-xl font-baloo font-bold text-primary">CuidaPet</span>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="flex-1 mx-4 max-w-xs">
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-dark" />
              </div>
              <input
                id="search"
                name="search"
                className="block w-full rounded-full border-0 bg-primary-light/40 py-2 pl-10 pr-3 text-gray-dark placeholder:text-gray-dark focus:bg-white focus:text-black focus:ring-2 focus:ring-inset focus:ring-primary sm:text-sm"
                placeholder="Pesquisar por..."
                type="search"
              />
            </div>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-4">
            <Link href="/mapa" className="text-gray-dark hover:text-primary">
              <MapIcon className="h-7 w-7" />
            </Link>
            <Link href="/mensagens" className="text-gray-dark hover:text-primary">
              <ChatBubbleOvalLeftEllipsisIcon className="h-7 w-7" />
            </Link>
            <Link href="/chatbot" className="text-gray-dark hover:text-primary">
              <ChatBubbleLeftRightIcon className="h-7 w-7" />
            </Link>
            
            {/* Profile Dropdown */}
            <div className="relative" ref={profileMenuRef}>
              <button
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="text-gray-dark hover:text-primary"
              >
                <UserCircleIcon className="h-7 w-7" />
              </button>
              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    {profileMenuItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setIsProfileMenuOpen(false)}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-black hover:bg-primary-light/30"
                      >
                        <item.icon className="h-5 w-5 text-gray-dark" />
                        {item.name}
                      </Link>
                    ))}
                    <button
                      onClick={handleLogout}
                      className="w-full text-left flex items-center gap-3 px-4 py-2 text-sm text-red hover:bg-primary-light/30"
                    >
                      <ArrowRightOnRectangleIcon className="h-5 w-5" />
                      Sair
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
