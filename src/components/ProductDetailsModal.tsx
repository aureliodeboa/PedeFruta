import React from 'react';
import { Fruta } from '../types/types';

interface ProductDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  produto: Fruta;
}

export const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({ isOpen, onClose, produto }) => {
  if (!isOpen) return null; // Não renderiza se o modal não estiver aberto

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-11/12 md:w-1/2">
        <button onClick={onClose} className="text-xl font-semibold text-[#20bf55] mb-4">
          Fechar
        </button>
        
        <div className="flex flex-col md:flex-row gap-8">
          <img
            src={produto.imagem}
            alt={produto.nome}
            className="w-full md:w-1/2 h-64 object-cover rounded-lg"
          />
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-[#20bf55] mb-4">{produto.nome}</h1>
            <p className="text-lg text-[#1e2019] mb-2"><strong>Descrição:</strong> {produto.descricao}</p>
            <p className="text-lg text-[#1e2019] mb-2"><strong>Preço:</strong> R${produto.preco}</p>
            <p className="text-lg text-[#1e2019] mb-2"><strong>Categoria:</strong> {produto.categoria}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
