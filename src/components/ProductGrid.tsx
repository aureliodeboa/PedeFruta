import React from 'react';
import { ProductCard } from './ProductCard';
import { Fruta } from '../types/types';

interface ProductGridProps {
  produtos: Fruta[];
  onAddToCart: (fruta: Fruta) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ produtos, onAddToCart }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {produtos.map((fruta) => (
        <ProductCard
          key={fruta.id}
          fruta={fruta}
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
};