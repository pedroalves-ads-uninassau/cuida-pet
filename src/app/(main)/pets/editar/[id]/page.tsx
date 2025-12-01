"use client";

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeftIcon, PhotoIcon } from '@heroicons/react/24/outline';
import { useApp } from '@/context/AppContext';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export default function EditPetPage() {
    const router = useRouter();
    const params = useParams();
    const { pets, editPet, user } = useApp();

    const [loading, setLoading] = useState(false);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        name: '',
        breed: '',
        age: '',
        imageUrl: ''
    });

    // Load Pet Data
    useEffect(() => {
        if (pets.length > 0 && params.id) {
            const pet = pets.find(p => p.id === params.id);
            if (pet) {
                setFormData({
                    name: pet.name,
                    breed: pet.breed,
                    age: pet.age,
                    imageUrl: pet.imageUrl || ''
                });
                setPreviewUrl(pet.imageUrl || null);
            } else {
                // Pet not found or not yours
                router.push('/perfil');
            }
        }
    }, [pets, params.id, router]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setImageFile(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            let imageUrl = formData.imageUrl;

            // Upload new image if selected
            if (imageFile) {
                const storage = getStorage();
                const storageRef = ref(storage, `pets/${Date.now()}_${imageFile.name}`);
                await uploadBytes(storageRef, imageFile);
                imageUrl = await getDownloadURL(storageRef);
            }

            await editPet(params.id as string, {
                name: formData.name,
                breed: formData.breed,
                age: formData.age,
                imageUrl
            });

            router.push('/perfil');
        } catch (error) {
            console.error("Error updating pet:", error);
            alert("Erro ao atualizar pet.");
        } finally {
            setLoading(false);
        }
    };

    if (!user) return null;

    return (
        <div className="min-h-screen bg-gray-50 pb-20">
            <div className="bg-white shadow-sm sticky top-0 z-10">
                <div className="max-w-3xl mx-auto px-4 h-16 flex items-center gap-4">
                    <Link href="/perfil" className="p-2 hover:bg-gray-100 rounded-full transition">
                        <ArrowLeftIcon className="h-6 w-6 text-gray-600" />
                    </Link>
                    <h1 className="text-xl font-bold text-gray-900">Editar Pet</h1>
                </div>
            </div>

            <main className="max-w-md mx-auto p-4 mt-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Photo Upload */}
                    <div className="flex flex-col items-center">
                        <div className="relative w-32 h-32 mb-4 group cursor-pointer">
                            <div className="w-full h-full rounded-full overflow-hidden border-4 border-white shadow-lg bg-gray-100 relative">
                                {previewUrl ? (
                                    <Image src={previewUrl} alt="Preview" fill className="object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                        <PhotoIcon className="h-12 w-12" />
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                                    <PhotoIcon className="h-8 w-8 text-white" />
                                </div>
                            </div>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                        </div>
                        <p className="text-sm text-gray-500">Toque para alterar a foto</p>
                    </div>

                    {/* Fields */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Pet</label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                                placeholder="Ex: Rex"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Raça</label>
                            <input
                                type="text"
                                required
                                value={formData.breed}
                                onChange={e => setFormData({ ...formData, breed: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                                placeholder="Ex: Golden Retriever"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Idade</label>
                            <input
                                type="text"
                                required
                                value={formData.age}
                                onChange={e => setFormData({ ...formData, age: e.target.value })}
                                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition"
                                placeholder="Ex: 2 anos"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary text-white font-bold py-4 rounded-xl shadow-lg hover:bg-primary-dark hover:shadow-xl transition duration-300 disabled:opacity-70"
                    >
                        {loading ? 'Salvando...' : 'Salvar Alterações'}
                    </button>
                </form>
            </main>
        </div>
    );
}
