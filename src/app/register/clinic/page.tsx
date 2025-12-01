"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useApp } from "@/context/AppContext";

export default function RegisterClinicPage() {
  const router = useRouter();
  const { register } = useApp();
  const [formData, setFormData] = useState({
    name: "", // Added Name
    cnpj: "",
    phone: "",
    address: "", // Added Address
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }

    setLoading(true);
    try {
      await register(formData.email, formData.password, formData.name, 'clinic', {
        cnpj: formData.cnpj,
        phone: formData.phone,
        address: formData.address
      });
      alert("Clínica cadastrada com sucesso!");
      router.push('/feed'); // Or redirect to a specific clinic dashboard
    } catch (error: any) {
      console.error(error);
      alert("Erro ao cadastrar: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-primary-light/30">
      <main className="flex-grow flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="bg-white rounded-2xl shadow-2xl p-8 border border-white/50 backdrop-blur-sm">
            <div className="flex flex-col items-center mb-6">
              <div className="relative w-16 h-16 mb-4">
                <Image
                  src="/images/logo-cuida-pet.png"
                  alt="Cuida Pet Logo"
                  fill
                  className="rounded-full object-cover shadow-md"
                />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">
                Cadastro de Clínica
              </h1>
              <p className="text-gray-500 mt-1 text-center">
                Junte-se à nossa rede de parceiros
              </p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nome da Clínica</label>
                <input
                  type="text"
                  id="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="block w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition"
                  placeholder="Ex: Clínica Pet Care"
                />
              </div>
              <div>
                <label htmlFor="cnpj" className="block text-sm font-medium text-gray-700 mb-1">CNPJ</label>
                <input
                  type="text"
                  id="cnpj"
                  required
                  value={formData.cnpj}
                  onChange={handleChange}
                  className="block w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition"
                  placeholder="00.000.000/0000-00"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Telefone</label>
                <input
                  type="tel"
                  id="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="block w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition"
                  placeholder="(00) 00000-0000"
                />
              </div>
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Endereço Completo</label>
                <input
                  type="text"
                  id="address"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  className="block w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition"
                  placeholder="Rua, Número, Bairro, Cidade"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Corporativo</label>
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition"
                  placeholder="contato@suaclinica.com"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
                <input
                  type="password"
                  id="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="block w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition"
                  placeholder="********"
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">Confirmar Senha</label>
                <input
                  type="password"
                  id="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="block w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition"
                  placeholder="********"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white font-bold py-3 px-4 rounded-xl shadow-lg hover:bg-primary-dark hover:shadow-xl transition duration-300 mt-2 disabled:opacity-50"
              >
                {loading ? 'Cadastrando...' : 'Cadastrar Clínica'}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Já tem uma conta?{" "}
                <Link
                  href="/login"
                  className="font-bold text-primary hover:text-primary-dark transition"
                >
                  Faça login
                </Link>
              </p>
            </div>
          </div>
          <div className="text-center mt-6">
            <Link href="/register" className="text-gray-500 hover:text-primary transition inline-flex items-center gap-2 text-sm font-medium">
              <ArrowLeftIcon className="w-4 h-4" />
              Voltar
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
}