"use client";

import { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useApp } from '@/context/AppContext';

type BookingModalProps = {
    isOpen: boolean;
    onClose: () => void;
    clinic: { id: string; name: string; address: string } | null;
};

export default function BookingModal({ isOpen, onClose, clinic }: BookingModalProps) {
    const { pets, addAppointment, user } = useApp();
    const [selectedPetId, setSelectedPetId] = useState("");
    const [service, setService] = useState("Consulta Veterinária");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [loading, setLoading] = useState(false);

    if (!isOpen || !clinic) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedPetId || !date || !time) {
            alert("Por favor, preencha todos os campos.");
            return;
        }

        setLoading(true);
        try {
            const pet = pets.find(p => p.id === selectedPetId);
            await addAppointment({
                clinicId: clinic.id,
                clinicName: clinic.name,
                date,
                time,
                petName: pet?.name || "Pet",
                address: clinic.address,
                service
            });
            alert("Agendamento realizado com sucesso!");
            onClose();
        } catch (error) {
            console.error("Erro ao agendar:", error);
            alert("Erro ao realizar agendamento.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-scale-up">
                <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <h2 className="text-lg font-bold text-gray-800">Agendar em {clinic.name}</h2>
                    <button onClick={onClose} className="p-1 hover:bg-gray-200 rounded-full transition">
                        <XMarkIcon className="h-6 w-6 text-gray-500" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Selecione o Pet</label>
                        <select
                            value={selectedPetId}
                            onChange={(e) => setSelectedPetId(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-primary focus:border-primary"
                            required
                        >
                            <option value="">Selecione um pet...</option>
                            {pets.map(pet => (
                                <option key={pet.id} value={pet.id}>{pet.name} ({pet.breed})</option>
                            ))}
                        </select>
                        {pets.length === 0 && (
                            <p className="text-xs text-red-500 mt-1">Você precisa cadastrar um pet primeiro.</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Serviço</label>
                        <select
                            value={service}
                            onChange={(e) => setService(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-primary focus:border-primary"
                        >
                            <option>Consulta Veterinária</option>
                            <option>Vacinação</option>
                            <option>Banho e Tosa</option>
                            <option>Exames</option>
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Data</label>
                            <input
                                type="date"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-primary focus:border-primary"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Horário</label>
                            <input
                                type="time"
                                value={time}
                                onChange={(e) => setTime(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg p-2.5 focus:ring-2 focus:ring-primary focus:border-primary"
                                required
                            />
                        </div>
                    </div>

                    <div className="pt-2">
                        <button
                            type="submit"
                            disabled={loading || pets.length === 0}
                            className="w-full bg-primary text-white font-bold py-3 rounded-xl hover:bg-primary-dark transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Agendando...' : 'Confirmar Agendamento'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
