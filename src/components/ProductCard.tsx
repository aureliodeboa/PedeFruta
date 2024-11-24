import React from 'react';
import { Fruta } from '../types/types';
import { ShoppingCart, Info } from 'lucide-react';

interface ProductCardProps {
  fruta: Fruta;
  onAddToCart: (fruta: Fruta) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ fruta, onAddToCart }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <div className="relative">
        <img
          src={fruta.imagem}
          alt={fruta.nome}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-0 right-0 bg-primary-red text-primary-white px-2 py-1 rounded-bl-lg font-semibold text-sm">
          {fruta.categoria}
        </div>
      </div>
      <div className="p-4">
        <h2 className="text-xl font-semibold text-primary-dark mb-2">
          {fruta.nome}
        </h2>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{fruta.descricao}</p>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold text-primary-darkGreen">
            R$ {fruta.preco.toFixed(2)}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => onAddToCart(fruta)}
              className="bg-primary-green hover:bg-primary-darkGreen text-primary-white px-3 py-2 rounded-full transition-colors duration-200 flex items-center gap-1"
              aria-label={`Adicionar ${fruta.nome} ao carrinho`}
            >
              <ShoppingCart size={18} />
            </button>
            <button
              className="bg-primary-dark hover:bg-primary-darkGreen text-primary-white p-2 rounded-full transition-colors duration-200"
              aria-label={`Mais informações sobre ${fruta.nome}`}
            >
              <Info size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

