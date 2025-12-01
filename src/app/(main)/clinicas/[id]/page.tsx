import Image from 'next/image';
import { MapPinIcon, ClockIcon, PhoneIcon, StarIcon } from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';

export default function ClinicaProfilePage({ params }: { params: { id: string } }) {
    // Mock data - in a real app, fetch based on params.id
    const clinica = {
        id: params.id,
        nome: "Clínica Veterinária Pet Care",
        endereco: "Rua dos Animais, 123 - Centro",
        telefone: "(81) 99999-9999",
        horario: "Seg - Sex: 08:00 - 18:00",
        avaliacao: 4.8,
        descricao: "Oferecemos o melhor cuidado para o seu pet com profissionais qualificados e equipamentos de última geração.",
        servicos: ["Consulta", "Vacinação", "Cirurgia", "Banho e Tosa", "Exames"]
    };

    return (
        <div className="py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="bg-neutral-white rounded-2xl shadow-lg overflow-hidden">
                    <div className="h-48 bg-primary-light/30 relative">
                        {/* Cover Image Placeholder */}
                        <div className="absolute inset-0 flex items-center justify-center text-primary/20">
                            <Image src="/images/logo-cuida-pet.png" width={100} height={100} alt="Cover" className="opacity-20" />
                        </div>
                    </div>
                    <div className="px-8 pb-8">
                        <div className="relative flex justify-between items-end -mt-12 mb-6">
                            <div className="bg-white p-1 rounded-xl shadow-md">
                                <Image
                                    src="/images/logo-cuida-pet.png"
                                    width={100}
                                    height={100}
                                    alt="Logo Clínica"
                                    className="rounded-lg bg-primary-light/20"
                                />
                            </div>
                            <button className="bg-primary text-white px-6 py-2 rounded-full font-semibold shadow-md hover:bg-primary-dark transition">
                                Agendar Consulta
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="md:col-span-2">
                                <h1 className="text-3xl font-bold text-neutral-black mb-2">{clinica.nome}</h1>
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="flex text-yellow-400">
                                        <StarIconSolid className="h-5 w-5" />
                                        <StarIconSolid className="h-5 w-5" />
                                        <StarIconSolid className="h-5 w-5" />
                                        <StarIconSolid className="h-5 w-5" />
                                        <StarIcon className="h-5 w-5" />
                                    </div>
                                    <span className="text-gray-600">({clinica.avaliacao}) • Veterinária</span>
                                </div>

                                <h2 className="text-xl font-semibold mb-3">Sobre</h2>
                                <p className="text-gray-600 mb-6 leading-relaxed">
                                    {clinica.descricao}
                                </p>

                                <h2 className="text-xl font-semibold mb-3">Serviços</h2>
                                <div className="flex flex-wrap gap-2">
                                    {clinica.servicos.map((servico) => (
                                        <span key={servico} className="bg-primary-light/30 text-primary-dark px-3 py-1 rounded-full text-sm font-medium">
                                            {servico}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="bg-gray-50 p-6 rounded-xl">
                                    <h3 className="font-semibold mb-4">Informações</h3>
                                    <div className="space-y-4">
                                        <div className="flex items-start gap-3 text-gray-600">
                                            <MapPinIcon className="h-5 w-5 mt-0.5 flex-shrink-0" />
                                            <span>{clinica.endereco}</span>
                                        </div>
                                        <div className="flex items-start gap-3 text-gray-600">
                                            <ClockIcon className="h-5 w-5 mt-0.5 flex-shrink-0" />
                                            <span>{clinica.horario}</span>
                                        </div>
                                        <div className="flex items-start gap-3 text-gray-600">
                                            <PhoneIcon className="h-5 w-5 mt-0.5 flex-shrink-0" />
                                            <span>{clinica.telefone}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
