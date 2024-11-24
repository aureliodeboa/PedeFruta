import React, { useState } from 'react';
import { ShoppingCart, Menu, X, Home, Package, LogIn } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface NavbarProps {
  quantidadeItens: number;
  onCarrinhoClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ quantidadeItens, onCarrinhoClick }) => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const navItems = [
    { label: 'Início', path: '/', icon: Home },
    { label: 'Produtos', path: '/marketplace', icon: Package },
    { label: 'Login', path: '/login', icon: LogIn },
  ];

  return (
    <header className="sticky top-0 z-50 bg-primary-darkGreen text-primary-white shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <h1 className="text-2xl font-bold">Pe de Fruta</h1>

          {/* Navegação Desktop - Centralizada */}
          <nav className="hidden md:flex flex-1 justify-center gap-20">
            {navItems.map((item) => (
              <button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className="flex items-center gap-2 hover:text-primary-green transition-colors duration-200"
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Carrinho e Menu Hamburguer */}
          <div className="flex items-center gap-4">
            <button
              onClick={onCarrinhoClick}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary-green hover:bg-primary-red text-primary-white transition-colors duration-200"
              aria-label={`Carrinho com ${quantidadeItens} itens`}
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="font-semibold">{quantidadeItens}</span>
            </button>

            {/* Menu Hamburguer para Mobile */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 rounded-full hover:bg-primary-green transition-colors duration-200"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Navegação Mobile */}
      <div
        className={`md:hidden absolute w-full bg-primary-darkGreen overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="flex flex-col p-4">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              className="flex items-center gap-2 py-3 text-left hover:bg-primary-green rounded-lg px-3 transition-colors duration-200"
            >
              <item.icon className="h-5 w-5" />
              <span>{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
