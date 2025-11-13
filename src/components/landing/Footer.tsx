import Link from "next/link";
import {
  FaInstagram,
} from "react-icons/fa"; // Assuming these are installed or will be

export function Footer() {
  return (
    <footer className="bg-neutral-black text-neutral-white py-10 mt-auto border-t-4 border-primary">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
        {/* Brand Info */}
        <div>
          <h4 className="text-2xl font-extrabold mb-2 text-primary">
            Cuida Pet
          </h4>
          <p className="text-neutral-gray-light text-sm">
            Conectando Pessoas e Pets com Amor e Tecnologia.
          </p>
          <p className="text-neutral-gray-light text-sm mt-2">
            © {new Date().getFullYear()} Cuida Pet — Feito com ❤️ por alunos da
            UNINASSAU.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h5 className="font-bold text-lg mb-3 text-primary-light">Navegação</h5>
          <ul className="space-y-2">
            <li>
              <a href="#funcionalidades" className="hover:text-primary transition">
                Funcionalidades
              </a>
            </li>
            <li>
              <a href="#sobre" className="hover:text-primary transition">
                Sobre Nós
              </a>
            </li>
            <li>
              <a href="#equipe" className="hover:text-primary transition">
                Nossa Equipe
              </a>
            </li>
            <li>
              <Link href="/legal" className="hover:text-primary transition">
                Política de Privacidade
              </Link>
            </li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h5 className="font-bold text-lg mb-3 text-primary-light">Social</h5>
          <div className="flex justify-center md:justify-start space-x-4 text-2xl">
            <a href="https://www.instagram.com/aplicativocuidapet" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition flex items-center space-x-2">
              <FaInstagram /> <span>Instagram</span>
            </a>
            <a href="mailto:aplicativocuidapet@gmail.com" className="hover:text-primary transition text-sm">
              aplicativocuidapet@gmail.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}