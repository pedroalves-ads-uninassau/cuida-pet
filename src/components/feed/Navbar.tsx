"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useOnClickOutside } from '@/utils/hooks';
import { useApp } from '@/context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MagnifyingGlassIcon,
  MapIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  UserCircleIcon,
  SparklesIcon,
  CalendarIcon,
  Cog6ToothIcon,
  QuestionMarkCircleIcon,
  InformationCircleIcon,
  ArrowRightOnRectangleIcon,
  HomeIcon,
  Bars3Icon,
  XMarkIcon,
  ShieldCheckIcon,
  EnvelopeIcon,
  BellIcon
} from '@heroicons/react/24/outline';
import {
  HomeIcon as HomeIconSolid,
  MapIcon as MapIconSolid,
  ChatBubbleOvalLeftEllipsisIcon as ChatIconSolid,
  UserCircleIcon as UserIconSolid,
  EnvelopeIcon as EnvelopeIconSolid,
  SparklesIcon as SparklesIconSolid
} from '@heroicons/react/24/solid';

export function Navbar() {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout, isAdmin, notifications, markAsRead } = useApp();

  const profileMenuRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(profileMenuRef, () => setIsProfileMenuOpen(false));
  useOnClickOutside(notificationRef, () => setIsNotificationsOpen(false));

  const unreadCount = notifications?.filter(n => !n.read).length || 0;

  const handleMarkAsRead = (id: string) => {
    markAsRead(id);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logout();
    setIsProfileMenuOpen(false);
    router.push('/login');
  };

  const profileMenuItems = [
    { name: 'Configurações', href: '/configuracoes', icon: Cog6ToothIcon },
    { name: 'Ajuda', href: '/help', icon: QuestionMarkCircleIcon },
    { name: 'Sobre', href: '/sobre', icon: InformationCircleIcon },
  ];

  const navLinks = [
    { name: 'Feed', href: '/feed', icon: HomeIcon, activeIcon: HomeIconSolid },
    { name: 'Mapa', href: '/mapa', icon: MapIcon, activeIcon: MapIconSolid },
    { name: 'Agenda', href: '/agendamentos', icon: CalendarIcon, activeIcon: CalendarIcon },
    { name: 'Chat', href: '/mensagens', icon: EnvelopeIcon, activeIcon: EnvelopeIconSolid },
    { name: 'Jarvis', href: '/chatbot', icon: SparklesIcon, activeIcon: SparklesIconSolid },
    { name: 'Perfil', href: '/perfil/tutor', icon: UserCircleIcon, activeIcon: UserIconSolid },
  ];

  if (isAdmin) {
    navLinks.push({
      name: 'Admin',
      href: '/admin',
      icon: ShieldCheckIcon,
      activeIcon: ShieldCheckIcon
    });
  }

  return (
    <>
      {/* Desktop Navbar */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-sm py-2' : 'bg-white py-3'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/feed" className="flex items-center gap-3 group">
                <div className="relative w-10 h-10 transition-transform duration-300 group-hover:rotate-12">
                  <Image
                    src="/images/logo-cuida-pet.png"
                    alt="Cuida Pet Logo"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="rounded-full object-cover shadow-sm"
                  />
                </div>
                <span className="text-2xl font-baloo font-extrabold bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent tracking-tight">
                  CuidaPet
                </span>
              </Link>
            </div>

            {/* Desktop Navigation - Centered & Enhanced */}
            <nav className="hidden md:flex items-center gap-2 bg-gray-50/50 p-1.5 rounded-full border border-gray-100">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                const Icon = isActive ? link.activeIcon : link.icon;

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`relative flex items-center gap-2 px-5 py-2.5 rounded-full transition-all duration-300 ${isActive
                      ? 'bg-white text-primary shadow-sm ring-1 ring-gray-200/50'
                      : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100/50'
                      }`}
                  >
                    <Icon className={`h-5 w-5 transition-transform duration-300 ${isActive ? 'scale-110' : ''}`} />
                    <span className={`text-sm font-bold tracking-wide ${isActive ? 'font-extrabold' : 'font-medium'}`}>
                      {link.name}
                    </span>
                  </Link>
                );
              })}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
              {/* Notifications */}
              {user && (
                <div className="relative" ref={notificationRef}>
                  <button
                    onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                    className="relative p-2 rounded-full text-gray-500 hover:bg-gray-100 transition-all"
                  >
                    <BellIcon className="h-6 w-6" />
                    {unreadCount > 0 && (
                      <span className="absolute top-1 right-1 h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                    )}
                  </button>

                  <AnimatePresence>
                    {isNotificationsOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        className="absolute right-0 mt-4 w-80 origin-top-right rounded-2xl bg-white shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden z-50"
                      >
                        <div className="px-4 py-3 border-b border-gray-50 flex justify-between items-center">
                          <p className="text-sm font-bold text-gray-900">Notificações</p>
                          {unreadCount > 0 && (
                            <span className="text-[10px] font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                              {unreadCount} nova(s)
                            </span>
                          )}
                        </div>
                        <div className="max-h-[300px] overflow-y-auto">
                          {notifications.length === 0 ? (
                            <p className="p-4 text-center text-gray-500 text-xs">Nenhuma notificação.</p>
                          ) : (
                            notifications.map((notif) => (
                              <div
                                key={notif.id}
                                onClick={() => handleMarkAsRead(notif.id)}
                                className={`p-4 border-b border-gray-50 hover:bg-gray-50 transition cursor-pointer ${!notif.read ? 'bg-blue-50/50' : ''}`}
                              >
                                <p className={`text-sm ${!notif.read ? 'font-bold text-gray-900' : 'text-gray-600'}`}>
                                  {notif.text}
                                </p>
                                <p className="text-[10px] text-gray-400 mt-1">
                                  {notif.createdAt ? new Date(notif.createdAt.toDate()).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }) : 'Agora'}
                                </p>
                              </div>
                            ))
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}

              {/* Profile Dropdown */}
              <div className="relative" ref={profileMenuRef}>
                <button
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center gap-3 focus:outline-none group pl-2 pr-1 py-1 rounded-full hover:bg-gray-50 transition-all border border-transparent hover:border-gray-100"
                >
                  <div className="text-right hidden lg:block">
                    <p className="text-sm font-bold text-gray-700 leading-none group-hover:text-primary transition-colors">
                      {user?.name?.split(' ')[0] || 'Bem-vindo'}
                    </p>
                    <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider mt-0.5">
                      {user ? (user.role === 'admin' ? 'Administrador' : user.role === 'clinic' ? 'Clínica' : 'Tutor') : 'Faça Login'}
                    </p>
                  </div>
                  <div className={`relative w-10 h-10 rounded-full border-2 p-0.5 transition-all duration-300 ${isProfileMenuOpen ? 'border-primary scale-105' : 'border-transparent group-hover:border-gray-200'}`}>
                    <div className="relative w-full h-full rounded-full overflow-hidden bg-gray-100">
                      <Image
                        src={user?.avatar || "/images/avatar-placeholder.svg"}
                        alt="Profile"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                </button>

                <AnimatePresence>
                  {isProfileMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-4 w-72 origin-top-right rounded-2xl bg-white shadow-xl ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden z-50"
                    >
                      <div className="px-6 py-4 border-b border-gray-50 bg-gradient-to-r from-primary/5 to-transparent">
                        <p className="text-sm font-bold text-gray-900 truncate">{user?.name || 'Bem-vindo'}</p>
                        <p className="text-xs text-gray-500 truncate">{user?.email || 'Acesse sua conta'}</p>
                      </div>
                      <div className="p-2">
                        {user ? (
                          <>
                            {profileMenuItems.map((item) => (
                              <Link
                                key={item.name}
                                href={item.href}
                                onClick={() => setIsProfileMenuOpen(false)}
                                className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-gray-700 rounded-xl hover:bg-gray-50 hover:text-primary transition-all"
                              >
                                <item.icon className="h-5 w-5" />
                                {item.name}
                              </Link>
                            ))}
                            <div className="h-px bg-gray-100 my-2 mx-4" />
                            <button
                              onClick={handleLogout}
                              className="w-full text-left flex items-center gap-3 px-4 py-3 text-sm font-medium text-red-600 rounded-xl hover:bg-red-50 transition-all"
                            >
                              <ArrowRightOnRectangleIcon className="h-5 w-5" />
                              Sair
                            </button>
                          </>
                        ) : (
                          <Link
                            href="/login"
                            onClick={() => setIsProfileMenuOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-primary rounded-xl hover:bg-primary/5 transition-all"
                          >
                            <ArrowRightOnRectangleIcon className="h-5 w-5" />
                            Fazer Login
                          </Link>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer for fixed header */}
      <div className="h-20 hidden md:block" />

      {/* Mobile Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-gray-200 pb-safe z-50 md:hidden shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <div className="flex justify-around items-center h-16 px-2">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const Icon = isActive ? link.activeIcon : link.icon;
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`relative flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${isActive ? 'text-primary' : 'text-gray-400'}`}
              >
                {isActive && (
                  <motion.div
                    layoutId="mobile-nav-indicator"
                    className="absolute top-0 w-12 h-1 bg-primary rounded-b-xl shadow-[0_0_10px_rgba(255,163,51,0.5)]"
                  />
                )}
                <Icon className={`h-6 w-6 transition-transform ${isActive ? 'scale-110' : ''}`} />
                <span className="text-[10px] font-medium">{link.name}</span>
              </Link>
            )
          })}
        </div>
      </nav>
    </>
  );
}
