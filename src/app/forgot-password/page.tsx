import Link from 'next/link';

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-[#FFA333] to-[#E27B00]">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-baloo font-bold text-black">
            Esqueceu a senha?
          </h1>
          <p className="mt-2 font-baloo text-gray-dark">
            Digite abaixo seu e-mail que enviaremos um código para redefinição
            de senha.
          </p>
        </div>
        <form>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-baloo font-medium text-gray-dark"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              className="w-full rounded-md border border-gray-light px-3 py-2 focus:border-primary focus:outline-none"
              placeholder="seu@email.com"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-primary py-2 font-baloo font-bold text-white hover:bg-primary-dark"
          >
            RECUPERAR SENHA
          </button>
        </form>
        <div className="mt-6 text-center">
          <Link
            href="/login"
            className="font-baloo font-medium text-primary hover:text-primary-dark"
          >
            VOLTAR
          </Link>
        </div>
      </div>
    </div>
  );
}
