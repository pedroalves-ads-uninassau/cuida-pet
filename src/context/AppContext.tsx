"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, db } from '@/services/firebase';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { collection, addDoc, query, orderBy, onSnapshot, Timestamp, where, deleteDoc, doc, updateDoc, setDoc } from 'firebase/firestore';

type UserRole = 'admin' | 'tutor' | 'clinic';

type User = {
    name: string;
    email: string;
    avatar: string;
    uid: string;
    role: UserRole;
    address?: string; // For clinics
    phone?: string;   // For clinics
    cnpj?: string;    // For clinics
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

type Pet = {
    id: string;
    name: string;
    breed: string;
    age: string;
    imageUrl?: string;
    ownerId: string;
};

type Appointment = {
    id: string;
    clinicId: string;
    clinicName: string;
    date: string;
    time: string;
    status: 'Confirmado' | 'Pendente' | 'Cancelado';
    petName: string;
    address: string;
    service: string;
    ownerId: string;
};

type Notification = {
    id: string;
    userId: string;
    text: string;
    read: boolean;
    createdAt: any;
    type: 'appointment' | 'info';
};

type AppContextType = {
    user: User | null;
    login: (email: string, password?: string) => Promise<void>;
    register: (email: string, password: string, name: string, role?: UserRole, extraData?: any) => Promise<void>;
    logout: () => Promise<void>;
    posts: Post[];
    addPost: (content: string, imageUrl?: string) => Promise<void>;
    deletePost: (postId: string) => Promise<void>;
    editPost: (postId: string, newContent: string) => Promise<void>;
    pets: Pet[];
    addPet: (pet: Omit<Pet, 'id' | 'ownerId'>) => Promise<void>;
    deletePet: (petId: string) => Promise<void>;
    editPet: (petId: string, petData: Partial<Pet>) => Promise<void>;
    likePost: (postId: string) => Promise<void>;
    addComment: (postId: string, text: string) => Promise<void>;
    appointments: Appointment[];
    addAppointment: (appt: Omit<Appointment, 'id' | 'ownerId' | 'status' | 'ownerName'>) => Promise<void>;
    cancelAppointment: (apptId: string) => Promise<void>;
    updateAppointmentStatus: (apptId: string, status: 'Confirmado' | 'Cancelado', ownerId: string) => Promise<void>;
    notifications: Notification[];
    markAsRead: (notifId: string) => Promise<void>;
    isAdmin: boolean;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [posts, setPosts] = useState<Post[]>([]);
    const [pets, setPets] = useState<Pet[]>([]);
    const [appointments, setAppointments] = useState<Appointment[]>([]);

    const isAdmin = user?.role === 'admin';

    // Auth Listener
    useEffect(() => {
        if (auth) {
            const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
                if (firebaseUser) {
                    let role: UserRole = 'tutor';
                    let extraData: any = {};

                    if (db) {
                        try {
                            const userDocRef = doc(db, "users", firebaseUser.uid);
                            // We need to import getDoc
                            const { getDoc } = await import("firebase/firestore");
                            const userDoc = await getDoc(userDocRef);

                            if (userDoc.exists()) {
                                const data = userDoc.data();
                                role = data.role as UserRole;
                                extraData = {
                                    address: data.address,
                                    phone: data.phone,
                                    cnpj: data.cnpj
                                };
                            }
                        } catch (error) {
                            console.error("Error fetching user data:", error);
                        }
                    }

                    if (firebaseUser.email === 'admin@cuidapet.com') role = 'admin';

                    setUser({
                        name: firebaseUser.displayName || 'Usuário',
                        email: firebaseUser.email || '',
                        avatar: firebaseUser.photoURL || '/images/avatar-placeholder.svg',
                        uid: firebaseUser.uid,
                        role: role,
                        ...extraData
                    });
                } else {
                    setUser(null);
                    setPets([]);
                    setAppointments([]);
                }
            });
            return () => unsubscribe();
        }
    }, []);

    // Posts Listener (Global)
    useEffect(() => {
        if (db) {
            const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
            const unsubscribe = onSnapshot(q, (snapshot) => {
                const newPosts = snapshot.docs.map(doc => {
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
                setPosts(newPosts);
            });
            return () => unsubscribe();
        }
    }, []);

    // User Data Listener (Pets & Appointments)
    useEffect(() => {
        if (db && user) {
            // Pets (Only for Tutors)
            let unsubPets = () => { };
            if (user.role === 'tutor') {
                const petsQuery = query(collection(db, "pets"), where("ownerId", "==", user.uid));
                unsubPets = onSnapshot(petsQuery, (snapshot) => {
                    const newPets = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Pet));
                    setPets(newPets);
                });
            }

            // Appointments (Tutor: by ownerId, Clinic: by clinicId)
            let apptQuery;
            if (user.role === 'clinic') {
                apptQuery = query(collection(db, "appointments"), where("clinicId", "==", user.uid));
            } else {
                apptQuery = query(collection(db, "appointments"), where("ownerId", "==", user.uid));
            }

            const unsubAppt = onSnapshot(apptQuery, (snapshot) => {
                const newAppts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Appointment));
                setAppointments(newAppts);
            });

            return () => { unsubPets(); unsubAppt(); };
        }
    }, [user]);

    const login = async (email: string, password?: string) => {
        if (auth && password) await signInWithEmailAndPassword(auth, email, password);
    };

    const register = async (email: string, password: string, name: string, role: UserRole = 'tutor', extraData: any = {}) => {
        if (auth && db) {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, {
                displayName: name,
                photoURL: '/images/avatar-placeholder.svg'
            });

            // Save full user data to Firestore
            await setDoc(doc(db, "users", userCredential.user.uid), {
                name,
                email,
                role,
                createdAt: Timestamp.now(),
                ...extraData
            });
        }
    };

    const logout = async () => { if (auth) await signOut(auth); };

    const addPost = async (content: string, imageUrl?: string) => {
        if (!user || !db) return;
        await addDoc(collection(db, "posts"), {
            author: { name: user.name, avatarUrl: user.avatar, uid: user.uid },
            content,
            imageUrl: imageUrl || null,
            likes: 0,
            comments: 0,
            createdAt: Timestamp.now()
        });
    };

    const deletePost = async (postId: string) => {
        if (!user || !db) return;
        await deleteDoc(doc(db, "posts", postId));
    };

    const editPost = async (postId: string, newContent: string) => {
        if (!user || !db) return;
        await updateDoc(doc(db, "posts", postId), { content: newContent });
    };

    const addPet = async (petData: Omit<Pet, 'id' | 'ownerId'>) => {
        if (!user || !db) return;
        await addDoc(collection(db, "pets"), {
            ...petData,
            ownerId: user.uid,
            createdAt: Timestamp.now()
        });
    };

    const deletePet = async (petId: string) => {
        if (!user || !db) return;
        await deleteDoc(doc(db, "pets", petId));
    };

    const editPet = async (petId: string, petData: Partial<Pet>) => {
        if (!user || !db) return;
        await updateDoc(doc(db, "pets", petId), petData);
    };

    const likePost = async (postId: string) => {
        if (!user || !db) return;
        // In a real app, we would track *who* liked to prevent double likes.
        // For this student project, we just increment the counter.
        const postRef = doc(db, "posts", postId);
        const { increment, updateDoc } = await import("firebase/firestore");
        await updateDoc(postRef, { likes: increment(1) });
    };

    const addComment = async (postId: string, commentText: string) => {
        if (!user || !db) return;
        const postRef = doc(db, "posts", postId);
        const { increment, updateDoc, collection, addDoc } = await import("firebase/firestore");

        // Add comment to subcollection
        await addDoc(collection(db, "posts", postId, "comments"), {
            text: commentText,
            authorName: user.name,
            authorId: user.uid,
            createdAt: Timestamp.now()
        });

        // Increment comment count on post
        await updateDoc(postRef, { comments: increment(1) });
    };

    const addAppointment = async (apptData: Omit<Appointment, 'id' | 'ownerId' | 'status' | 'ownerName'>) => {
        if (!user || !db) return;

        // 1. Create Appointment
        const docRef = await addDoc(collection(db, "appointments"), {
            ...apptData,
            ownerId: user.uid,
            ownerName: user.name,
            status: 'Pendente',
            createdAt: Timestamp.now()
        });

        // 2. Create Notification for Clinic
        await addDoc(collection(db, "notifications"), {
            userId: apptData.clinicId,
            text: `Novo agendamento de ${user.name} para ${apptData.date} às ${apptData.time}`,
            read: false,
            createdAt: Timestamp.now(),
            type: 'appointment'
        });
    };

    const cancelAppointment = async (apptId: string) => {
        if (!user || !db) return;
        await updateDoc(doc(db, "appointments", apptId), { status: 'Cancelado' });
    };

    const updateAppointmentStatus = async (apptId: string, status: 'Confirmado' | 'Cancelado', ownerId: string) => {
        if (!user || !db) return;
        await updateDoc(doc(db, "appointments", apptId), { status });

        // Notify Tutor
        if (status === 'Confirmado') {
            await addDoc(collection(db, "notifications"), {
                userId: ownerId,
                text: `Seu agendamento na ${user.name} foi CONFIRMADO!`,
                read: false,
                createdAt: Timestamp.now(),
                type: 'info'
            });
        }
    };

    // Notifications Logic
    const [notifications, setNotifications] = useState<Notification[]>([]);

    useEffect(() => {
        if (db && user) {
            const q = query(collection(db, "notifications"), where("userId", "==", user.uid), orderBy("createdAt", "desc"));
            const unsubscribe = onSnapshot(q, (snapshot) => {
                const notifs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Notification));
                setNotifications(notifs);
            });
            return () => unsubscribe();
        }
    }, [user]);

    const markAsRead = async (notifId: string) => {
        if (!db) return;
        await updateDoc(doc(db, "notifications", notifId), { read: true });
    };

    return (
        <AppContext.Provider value={{
            user, login, register, logout,
            posts, addPost, deletePost, editPost, likePost, addComment,
            pets, addPet, deletePet, editPet,
            appointments, addAppointment, cancelAppointment, updateAppointmentStatus,
            notifications, markAsRead,
            isAdmin
        }}>
            {children}
        </AppContext.Provider>
    );
}

export function useApp() {
    const context = useContext(AppContext);
    if (context === undefined) throw new Error('useApp must be used within an AppProvider');
    return context;
}
