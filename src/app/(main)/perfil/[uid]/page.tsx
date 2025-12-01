"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { db } from '@/services/firebase';
import { doc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import Image from 'next/image';
import { MapPinIcon, EnvelopeIcon, PhoneIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline';

import { PostCard } from '@/components/feed/PostCard';
import { orderBy } from 'firebase/firestore';

type UserProfile = {
    name: string;
    avatar: string;
    role: 'tutor' | 'clinic' | 'admin';
    email: string;
    address?: string;
    phone?: string;
    cnpj?: string;
};

type Pet = {
    id: string;
    name: string;
    breed: string;
    age: string;
    imageUrl?: string;
};

type Post = {
    id: string;
    author: {
        name: string;
        avatarUrl: string;
        uid?: string;
    };
    time: string;
    content: string;
    imageUrl?: string;
    likes: number;
    comments: number;
    createdAt: any;
};

export default function PublicProfilePage() {
    const params = useParams();
    const uid = params.uid as string;
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [pets, setPets] = useState<Pet[]>([]);
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            if (!db || !uid) return;

            try {
                // Fetch User Data
                const userDoc = await getDoc(doc(db, "users", uid));
                if (userDoc.exists()) {
                    const data = userDoc.data();
                    setProfile({
                        name: data.name,
                        avatar: data.photoURL || '/images/avatar-placeholder.svg',
                        role: data.role,
                        email: data.email,
                        address: data.address,
                        phone: data.phone,
                        cnpj: data.cnpj
                    } as UserProfile);

                    // Fetch Pets if Tutor
                    if (data.role === 'tutor') {
                        const q = query(collection(db, "pets"), where("ownerId", "==", uid));
                        const snapshot = await getDocs(q);
                        const fetchedPets = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Pet));
                        setPets(fetchedPets);
                    }

                    // Fetch Posts
                    // Note: We removed orderBy from the query to avoid needing a composite index in Firestore
                    const postsQuery = query(collection(db, "posts"), where("author.uid", "==", uid));
                    const postsSnapshot = await getDocs(postsQuery);
                    const fetchedPosts = postsSnapshot.docs.map(doc => {
                        const data = doc.data();
                        let timeString = 'agora';
                        if (data.createdAt) {
                            const date = data.createdAt.toDate();
                            timeString = date.toLocaleDateString('pt-BR', {
                                day: '2-digit', month: '2-digit', year: 'numeric',
                                hour: '2-digit', minute: '2-digit'
                            });
                        }
                        return { id: doc.id, ...data, time: timeString } as Post;
                    });

                    // Sort by date descending (client-side)
                    fetchedPosts.sort((a, b) => {
                        const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(0);
                        const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(0);
                        return dateB.getTime() - dateA.getTime();
                    });

                    setPosts(fetchedPosts);
                }
            } catch (error) {
                console.error("Error fetching profile:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [uid]);

    if (loading) return <div className="p-8 text-center text-gray-500">Carregando perfil...</div>;
    if (!profile) return <div className="p-8 text-center text-gray-500">Usuário não encontrado.</div>;

    return (
        <div className="max-w-4xl mx-auto pb-20 px-4 sm:px-6 lg:px-8 py-8">
            {/* Header Card */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-8">
                <div className="p-8">
                    <div className="relative flex justify-between items-center mb-6">
                        <div className="relative w-24 h-24 rounded-full border-4 border-white shadow-md bg-white">
                            <Image
                                src={profile.avatar}
                                alt={profile.name}
                                fill
                                className="rounded-full object-cover"
                            />
                        </div>
                        <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide border ${profile.role === 'clinic' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-green-50 text-green-700 border-green-200'
                            }`}>
                            {profile.role === 'clinic' ? 'Clínica Veterinária' : 'Tutor'}
                        </span>
                    </div>

                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{profile.name}</h1>

                    <div className="space-y-2 text-gray-600">
                        {profile.address && (
                            <div className="flex items-center gap-2">
                                <MapPinIcon className="h-5 w-5 text-gray-400" />
                                <span>{profile.address}</span>
                            </div>
                        )}
                        {profile.phone && (
                            <div className="flex items-center gap-2">
                                <PhoneIcon className="h-5 w-5 text-gray-400" />
                                <span>{profile.phone}</span>
                            </div>
                        )}
                        {profile.role === 'clinic' && profile.cnpj && (
                            <div className="flex items-center gap-2">
                                <BuildingOfficeIcon className="h-5 w-5 text-gray-400" />
                                <span className="text-sm">CNPJ: {profile.cnpj}</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Pets Section (Only for Tutors) */}
            {profile.role === 'tutor' && pets.length > 0 && (
                <div className="mb-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Pets de {profile.name.split(' ')[0]}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {pets.map(pet => (
                            <div key={pet.id} className="bg-white p-4 rounded-2xl border border-gray-100 flex items-center gap-4">
                                <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                                    <Image
                                        src={pet.imageUrl || "/images/pet-placeholder.svg"}
                                        alt={pet.name}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-900">{pet.name}</h3>
                                    <p className="text-sm text-gray-500">{pet.breed}, {pet.age} anos</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Posts Section */}
            <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">Publicações</h2>
                {posts.length > 0 ? (
                    <div className="space-y-6">
                        {posts.map(post => (
                            <PostCard key={post.id} post={post} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-10 bg-white rounded-2xl border border-gray-100">
                        <p className="text-gray-500">Nenhuma publicação ainda.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
