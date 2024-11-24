import React from 'react';
import { ItemCarrinho } from '../types/types';
import { colors } from '../styles/colors';
import { X, Trash2 } from 'lucide-react';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: ItemCarrinho[];
  onRemoveItem: (id: number) => void;
}

export const CartModal: React.FC<CartModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onRemoveItem,
}) => {
  if (!isOpen) return null;

  const totalCarrinho = cartItems.reduce(
    (total, item) => total + item.preco * item.quantidade,
    0
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md overflow-hidden shadow-xl">
        <div className="bg-primary-dark text-primary-white p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold">Seu Carrinho</h2>
          <button
            onClick={onClose}
            className="text-primary-white hover:text-primary-red transition-colors"
            aria-label="Fechar carrinho"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6">
          {cartItems.length === 0 ? (
            <p className="text-center text-gray-500">Seu carrinho está vazio</p>
          ) : (
            <>
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between items-center py-2 border-b border-gray-200">
                    <div>
                      <h3 className="font-semibold text-primary-dark">{item.nome}</h3>
                      <p className="text-sm text-gray-600">
                        {item.quantidade}x R$ {item.preco.toFixed(2)}
                      </p>
                    </div>
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-primary-red hover:text-primary-darkGreen transition-colors"
                      aria-label={`Remover ${item.nome} do carrinho`}
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-primary-dark">Total:</span>
                  <span className="text-2xl font-bold text-primary-green">
                    R$ {totalCarrinho.toFixed(2)}
                  </span>
                </div>
                <button className="mt-4 w-full bg-primary-green hover:bg-primary-darkGreen text-primary-white font-bold py-2 px-4 rounded transition-colors">
                  Finalizar Compra
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

