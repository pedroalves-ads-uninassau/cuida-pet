"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { db } from '@/services/firebase';
import { collection, query, where, getCountFromServer, getDocs, orderBy, limit } from 'firebase/firestore';
import {
    UsersIcon,
    BuildingStorefrontIcon,
    ChatBubbleLeftRightIcon,
    ExclamationTriangleIcon,
    ShieldCheckIcon,
    ChartBarIcon
} from '@heroicons/react/24/outline';
import { Navbar } from '@/components/feed/Navbar';

export default function AdminPage() {
    const { user, isAdmin } = useApp();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        users: 0,
        clinics: 0,
        posts: 0
    });
    const [recentUsers, setRecentUsers] = useState<any[]>([]);

    useEffect(() => {
        // Simple route protection
        if (user && !isAdmin) {
            router.push('/feed');
        } else if (!user) {
            router.push('/login');
        }
    }, [user, isAdmin, router]);

    useEffect(() => {
        const fetchStats = async () => {
            if (!db || !isAdmin) return;

            try {
                // 1. Get Counts
                const usersColl = collection(db, "users");
                const postsColl = collection(db, "posts");
                const clinicsQuery = query(collection(db, "users"), where("role", "==", "clinic"));

                const [usersSnapshot, clinicsSnapshot, postsSnapshot] = await Promise.all([
                    getCountFromServer(usersColl),
                    getCountFromServer(clinicsQuery),
                    getCountFromServer(postsColl)
                ]);

                setStats({
                    users: usersSnapshot.data().count,
                    clinics: clinicsSnapshot.data().count,
                    posts: postsSnapshot.data().count
                });

                // 2. Get Recent Users
                const recentQuery = query(collection(db, "users"), orderBy("createdAt", "desc"), limit(5));
                const recentSnapshot = await getDocs(recentQuery);
                const users = recentSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                    createdAt: doc.data().createdAt?.toDate()
                }));
                setRecentUsers(users);

            } catch (error) {
                console.error("Error fetching admin stats:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, [isAdmin]);

    if (!user || !isAdmin) return null;

    const statCards = [
        { name: 'Total de Usuários', value: stats.users, icon: UsersIcon, color: 'text-blue-600', bg: 'bg-blue-100' },
        { name: 'Clínicas Ativas', value: stats.clinics, icon: BuildingStorefrontIcon, color: 'text-green-600', bg: 'bg-green-100' },
        { name: 'Posts na Plataforma', value: stats.posts, icon: ChatBubbleLeftRightIcon, color: 'text-purple-600', bg: 'bg-purple-100' },
        { name: 'Denúncias (Mock)', value: '0', icon: ExclamationTriangleIcon, color: 'text-red-600', bg: 'bg-red-100' },
    ];

    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            {/* Admin Header */}
            <div className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex items-center justify-between">
                        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                            <ShieldCheckIcon className="h-8 w-8 text-primary" />
                            Painel Administrativo
                        </h1>
                        <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                            v1.0.0 (Real Data)
                        </span>
                    </div>
                </div>
            </div>

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
                    {statCards.map((item) => (
                        <div key={item.name} className="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition">
                            <div className="p-5">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <div className={`rounded-md p-3 ${item.bg}`}>
                                            <item.icon className={`h-6 w-6 ${item.color}`} aria-hidden="true" />
                                        </div>
                                    </div>
                                    <div className="ml-5 w-0 flex-1">
                                        <dl>
                                            <dt className="text-sm font-medium text-gray-500 truncate">{item.name}</dt>
                                            <dd>
                                                <div className="text-2xl font-bold text-gray-900">
                                                    {loading ? '...' : item.value}
                                                </div>
                                            </dd>
                                        </dl>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Recent Activity */}
                    <div className="bg-white shadow rounded-lg p-6">
                        <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                            <ChartBarIcon className="h-5 w-5 text-gray-500" />
                            Últimos Usuários Cadastrados
                        </h2>
                        <div className="flow-root">
                            <ul className="-my-5 divide-y divide-gray-200">
                                {loading ? (
                                    <p className="py-4 text-center text-gray-500">Carregando...</p>
                                ) : recentUsers.length === 0 ? (
                                    <p className="py-4 text-center text-gray-500">Nenhum usuário encontrado.</p>
                                ) : (
                                    recentUsers.map((u) => (
                                        <li key={u.id} className="py-4">
                                            <div className="flex items-center space-x-4">
                                                <div className="flex-shrink-0">
                                                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                                                        {u.name.charAt(0).toUpperCase()}
                                                    </div>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm font-medium text-gray-900 truncate">
                                                        {u.name}
                                                    </p>
                                                    <p className="text-xs text-gray-500 truncate">
                                                        {u.email} • {u.role}
                                                    </p>
                                                </div>
                                                <div className="text-xs text-gray-400">
                                                    {u.createdAt ? u.createdAt.toLocaleDateString() : 'Data desc.'}
                                                </div>
                                            </div>
                                        </li>
                                    ))
                                )}
                            </ul>
                        </div>
                    </div>

                    {/* System Health / Alerts */}
                    <div className="bg-white shadow rounded-lg p-6">
                        <h2 className="text-lg font-medium text-gray-900 mb-4 flex items-center gap-2">
                            <ExclamationTriangleIcon className="h-5 w-5 text-gray-500" />
                            Status do Sistema
                        </h2>
                        <div className="space-y-4">
                            <div className="bg-green-50 border-l-4 border-green-400 p-4">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <ShieldCheckIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm text-green-700">
                                            Banco de Dados Conectado (Firestore)
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <ChartBarIcon className="h-5 w-5 text-blue-400" aria-hidden="true" />
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm text-blue-700">
                                            Monitoramento de Performance Ativo
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
