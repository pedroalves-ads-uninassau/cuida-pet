"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { ArrowLeftIcon, PhotoIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function AddPetPage() {
    const router = useRouter();
    const { addPet } = useApp();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        breed: '',
        age: '',
        type: 'Cachorro'
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await addPet({
                name: formData.name,
                breed: formData.breed,
                age: formData.age,
                imageUrl: '/images/pet-placeholder.svg' // Placeholder for now until we have storage
            });
            router.push('/perfil/tutor');
        } catch (error) {
            console.error("Error adding pet:", error);
            alert("Erro ao adicionar pet.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto pb-20">
            <div className="flex items-center gap-4 mb-6">
                <Link href="/perfil/tutor" className="p-2 hover:bg-gray-100 rounded-full transition">
                    <ArrowLeftIcon className="h-6 w-6 text-gray-600" />
                </Link>
                <h1 className="text-2xl font-bold text-gray-900">Adicionar Pet</h1>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Photo Upload Placeholder */}
                    <div className="flex justify-center">
                        <div className="w-32 h-32 bg-gray-50 rounded-full border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-400 cursor-pointer hover:bg-gray-100 transition">
                            <PhotoIcon className="h-8 w-8 mb-1" />
                            <span className="text-xs font-medium">Adicionar Foto</span>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Pet</label>
                        <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="Ex: Rex"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Espécie</label>
                            <select
                                value={formData.type}
                                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                            >
                                <option>Cachorro</option>
                                <option>Gato</option>
                                <option>Pássaro</option>
                                <option>Outro</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Idade</label>
                            <input
                                type="text"
                                required
                                value={formData.age}
                                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                                className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
                                placeholder="Ex: 2 anos"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Raça</label>
                        <input
                            type="text"
                            required
                            value={formData.breed}
                            onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
                            className="w-full px-4 py-2 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
                            placeholder="Ex: Golden Retriever"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary text-white font-bold py-3 rounded-xl shadow-md hover:bg-primary-dark transition disabled:opacity-50"
                    >
                        {loading ? 'Salvando...' : 'Salvar Pet'}
                    </button>
                </form>
            </div>
        </div>
    );
}
