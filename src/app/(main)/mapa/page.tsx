"use client";

import { useState, useEffect, useMemo } from 'react';
import { MapIcon, MagnifyingGlassIcon, ListBulletIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { db } from '@/services/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import BookingModal from '@/components/map/BookingModal';
import { useApp } from '@/context/AppContext';
import dynamic from 'next/dynamic';

// Dynamically import LeafletMap with no SSR
const LeafletMap = dynamic(() => import('@/components/map/LeafletMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
      <div className="animate-pulse flex flex-col items-center">
        <div className="h-12 w-12 bg-gray-300 rounded-full mb-4"></div>
        <div className="h-4 w-32 bg-gray-300 rounded"></div>
      </div>
    </div>
  ),
});

// Default center (Caruaru, PE)
const defaultCenter = {
  lat: -8.283333,
  lng: -35.976389
};

export default function MapaPage() {
  const { user } = useApp(); // Get user from context
  const [selectedClinic, setSelectedClinic] = useState<any>(null);
  const [clinics, setClinics] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showList, setShowList] = useState(true); // Default to showing list on desktop
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  // Fetch Clinics from Firestore
  useEffect(() => {
    const fetchClinics = async () => {
      if (!db) return;
      try {
        const q = query(collection(db, "users"), where("role", "==", "clinic"));
        const querySnapshot = await getDocs(q);
        const fetchedClinics = querySnapshot.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.name,
            address: data.address || "Endereço não informado",
            phone: data.phone,
            // Mock coordinates for demo
            position: {
              lat: defaultCenter.lat + (Math.random() * 0.04 - 0.02),
              lng: defaultCenter.lng + (Math.random() * 0.04 - 0.02)
            }
          };
        });
        setClinics(fetchedClinics);
      } catch (error) {
        console.error("Error fetching clinics:", error);
      }
    };

    fetchClinics();
  }, []);

  // Filter clinics based on search
  const filteredClinics = useMemo(() => {
    return clinics.filter(clinic =>
      clinic.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      clinic.address.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [clinics, searchTerm]);

  return (
    <div className="h-[calc(100vh-64px)] relative bg-gray-100 flex overflow-hidden">

      {/* Sidebar List (Desktop: Always visible, Mobile: Toggleable) */}
      <div className={`
        absolute inset-y-0 left-0 z-20 w-full sm:w-96 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out
        ${showList ? 'translate-x-0' : '-translate-x-full'}
        sm:relative sm:translate-x-0 sm:block
      `}>
        <div className="h-full flex flex-col">
          {/* Header & Search */}
          <div className="p-4 border-b border-gray-100 bg-white z-10">
            <div className="flex items-center justify-between mb-4 sm:hidden">
              <h2 className="text-lg font-bold text-gray-800">Clínicas</h2>
              <button onClick={() => setShowList(false)} className="p-2 hover:bg-gray-100 rounded-full">
                <XMarkIcon className="h-6 w-6 text-gray-500" />
              </button>
            </div>

            <div className="relative">
              <input
                type="text"
                placeholder="Buscar clínica por nome..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-xl py-3 px-4 pl-11 text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:bg-white transition-all"
              />
              <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>

            <div className="mt-3 flex gap-2">
              <span className="text-xs font-medium text-gray-500">{filteredClinics.length} clínicas encontradas</span>
            </div>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-gray-200">
            {filteredClinics.map((clinic) => (
              <div
                key={clinic.id}
                onClick={() => {
                  setSelectedClinic(clinic);
                  if (window.innerWidth < 640) setShowList(false); // Close on mobile selection
                }}
                className={`
                  p-4 rounded-xl border cursor-pointer transition-all hover:shadow-md
                  ${selectedClinic?.id === clinic.id
                    ? 'bg-primary/5 border-primary ring-1 ring-primary'
                    : 'bg-white border-gray-100 hover:border-primary/30'}
                `}
              >
                <h3 className="font-bold text-gray-900">{clinic.name}</h3>
                <p className="text-sm text-gray-500 mt-1 flex items-start gap-1">
                  <MapIcon className="h-4 w-4 flex-shrink-0 mt-0.5" />
                  {clinic.address}
                </p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[10px] font-bold rounded-full uppercase tracking-wide">Aberto Agora</span>
                </div>
              </div>
            ))}

            {filteredClinics.length === 0 && (
              <div className="text-center py-10 text-gray-400">
                <p>Nenhuma clínica encontrada.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Map Area */}
      <div className="flex-1 relative w-full h-full">
        {/* Mobile Toggle Button */}
        <button
          onClick={() => setShowList(true)}
          className={`
            absolute top-4 left-4 z-10 bg-white p-3 rounded-full shadow-lg sm:hidden
            ${showList ? 'hidden' : 'block'}
          `}
        >
          <ListBulletIcon className="h-6 w-6 text-primary" />
        </button>

        <LeafletMap
          center={defaultCenter}
          clinics={filteredClinics}
          onSelectClinic={(clinic) => {
            setSelectedClinic(clinic);
            setShowList(true); // Open list to show details (or keep it open)
          }}
        />
      </div>

      {/* Selected Clinic Card */}
      {selectedClinic && (
        <div className="absolute bottom-8 left-4 right-4 sm:left-auto sm:right-8 sm:w-80 z-10">
          <div className="bg-white rounded-xl shadow-xl p-4 animate-slide-up">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg text-gray-900">{selectedClinic.name}</h3>
                <p className="text-gray-600 text-sm mt-1">{selectedClinic.address}</p>
                {selectedClinic.phone && (
                  <p className="text-gray-500 text-xs mt-1">{selectedClinic.phone}</p>
                )}
              </div>
              <button
                onClick={() => setSelectedClinic(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              {user?.role === 'tutor' ? (
                <button
                  onClick={() => setIsBookingOpen(true)}
                  className="bg-primary text-white py-2 rounded-lg font-medium text-sm hover:bg-primary-dark transition"
                >
                  Agendar
                </button>
              ) : (
                <button
                  disabled
                  className="bg-gray-200 text-gray-500 py-2 rounded-lg font-medium text-sm cursor-not-allowed"
                  title="Apenas tutores podem agendar"
                >
                  Agendar
                </button>
              )}
              <button className="border border-primary text-primary py-2 rounded-lg font-medium text-sm hover:bg-primary-light/10 transition">
                Como Chegar
              </button>
            </div>
          </div>
        </div>
      )}

      {user?.role === 'tutor' && (
        <BookingModal
          isOpen={isBookingOpen}
          onClose={() => setIsBookingOpen(false)}
          clinic={selectedClinic}
        />
      )}
    </div>
  );
}
