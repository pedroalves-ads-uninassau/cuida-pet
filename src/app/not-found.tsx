import Link from 'next/link';
import { HomeIcon } from '@heroicons/react/24/outline';

export default function NotFound() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
            <div className="text-center">
                <h1 className="text-9xl font-bold text-primary">404</h1>
                <h2 className="text-2xl font-bold text-gray-900 mt-4">Página não encontrada</h2>
                <p className="text-gray-500 mt-2 mb-8">
                    Ops! Parece que a página que você está procurando não existe ou foi movida.
                </p>
                <Link
                    href="/feed"
                    className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-bold shadow-lg hover:bg-primary-dark transition"
                >
                    <HomeIcon className="h-5 w-5" />
                    Voltar para o Início
                </Link>
            </div>
        </div>
    );
}
