"use client";
import { useApp } from '@/context/AppContext';
import Link from 'next/link';
import { CalendarIcon, MapPinIcon, ClockIcon } from '@heroicons/react/24/outline';

export default function AgendamentosPage() {
  const { appointments, user, cancelAppointment, updateAppointmentStatus } = useApp();

  const isClinic = user?.role === 'clinic';

  const getMonthName = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('pt-BR', { month: 'short' }).toUpperCase().replace('.', '');
    } catch {
      return 'MÊS';
    }
  };

  const getDay = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.getDate(); // Note: This might be off due to timezone if string is YYYY-MM-DD. 
      // Better to split string if it's YYYY-MM-DD
    } catch {
      return '00';
    }
  };

  // Helper to parse YYYY-MM-DD correctly without timezone issues
  const parseDate = (dateString: string) => {
    const parts = dateString.split('-');
    if (parts.length === 3) {
      const year = parseInt(parts[0]);
      const month = parseInt(parts[1]) - 1;
      const day = parseInt(parts[2]);
      const date = new Date(year, month, day);
      return {
        day: day,
        month: date.toLocaleDateString('pt-BR', { month: 'short' }).toUpperCase().replace('.', '')
      };
    }
    return { day: '??', month: '???' };
  };

  return (
    <div className="max-w-3xl mx-auto pb-20">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-baloo font-bold text-gray-900">
            {isClinic ? 'Agenda da Clínica' : 'Meus Agendamentos'}
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Gerencie suas consultas e compromissos
          </p>
        </div>
        {!isClinic && (
          <Link
            href="/mapa"
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl font-bold hover:bg-primary-dark transition shadow-lg shadow-primary/30"
          >
            <span>+ Novo</span>
          </Link>
        )}
      </div>

      {appointments.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-xl flex flex-col items-center">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
            <CalendarIcon className="h-10 w-10 text-primary" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Nenhum agendamento</h2>
          <p className="text-gray-500 mb-8 max-w-xs mx-auto">
            {isClinic ? 'Sua clínica ainda não tem consultas marcadas.' : 'Você ainda não tem consultas marcadas. Que tal encontrar uma clínica?'}
          </p>
          {!isClinic && (
            <Link
              href="/mapa"
              className="px-8 py-3 bg-primary text-white rounded-xl font-bold shadow-lg hover:bg-primary-dark hover:scale-105 transition transform"
            >
              Encontrar Clínica
            </Link>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {appointments.map((appt) => {
            const dateInfo = parseDate(appt.date);
            return (
              <div key={appt.id} className="group bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all flex flex-col sm:flex-row gap-5">
                {/* Date Box */}
                <div className="flex-shrink-0 flex flex-col items-center justify-center bg-gray-50 rounded-xl w-full sm:w-20 h-20 border border-gray-100 group-hover:border-primary/30 group-hover:bg-primary/5 transition-colors">
                  <span className="text-2xl font-black text-gray-800 group-hover:text-primary">{dateInfo.day}</span>
                  <span className="text-[10px] font-bold uppercase text-gray-400 tracking-wider group-hover:text-primary/70">{dateInfo.month}</span>
                </div>

                {/* Details */}
                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 leading-tight">{appt.service}</h3>
                      <p className="text-gray-500 text-sm font-medium mt-0.5">
                        {isClinic ? `Tutor: ${appt.ownerName || 'Tutor'} (Pet: ${appt.petName})` : appt.clinicName}
                      </p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide border ${appt.status === 'Confirmado' ? 'bg-green-50 text-green-700 border-green-200' :
                      appt.status === 'Pendente' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' :
                        'bg-red-50 text-red-700 border-red-200'
                      }`}>
                      {appt.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm text-gray-500 mt-4">
                    <div className="flex items-center gap-2">
                      <ClockIcon className="h-4 w-4 text-gray-400" />
                      <span>{appt.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-gray-400 text-xs uppercase">Pet:</span>
                      <span className="text-gray-700 font-medium">{appt.petName}</span>
                    </div>
                    {!isClinic && (
                      <div className="col-span-2 flex items-center gap-2 mt-1">
                        <MapPinIcon className="h-4 w-4 text-gray-400" />
                        <span className="truncate">{appt.address}</span>
                      </div>
                    )}
                  </div>

                  {appt.status !== 'Cancelado' && (
                    <div className="mt-4 pt-4 border-t border-gray-50 flex justify-end gap-3">
                      <button
                        onClick={() => {
                          if (confirm('Tem certeza que deseja cancelar?')) cancelAppointment(appt.id);
                        }}
                        className="text-xs font-bold text-red-500 hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded-lg transition"
                      >
                        Cancelar
                      </button>

                      {isClinic && appt.status === 'Pendente' && (
                        <button
                          onClick={() => updateAppointmentStatus(appt.id, 'Confirmado', appt.ownerId)}
                          className="text-xs font-bold text-green-600 hover:text-green-800 hover:bg-green-50 px-3 py-1.5 rounded-lg transition"
                        >
                          Confirmar
                        </button>
                      )}

                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
