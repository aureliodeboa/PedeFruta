import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

interface Product {
  id: number;
  name: string;
  price: number;
  origin: string;
  environmentalImpact: string;
  image: string;
}

export const DashboardPage: React.FC = () => {
  const { userType } = useParams<{ userType: 'consumidor' | 'produtor' }>();
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: 'Produto Orgânico',
      price: 15.0,
      origin: 'Brasil',
      environmentalImpact: 'Baixo',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 2,
      name: 'Produto Sustentável',
      price: 30.0,
      origin: 'Argentina',
      environmentalImpact: 'Médio',
      image: 'https://via.placeholder.com/150',
    },
  ]);

  const [filterOrigin, setFilterOrigin] = useState('');
  const [filterImpact, setFilterImpact] = useState('');
  const [filterPrice, setFilterPrice] = useState(0);

  const handleFilter = () => {
    const filteredProducts = products.filter((product) => {
      if (filterOrigin && product.origin !== filterOrigin) return false;
      if (filterImpact && product.environmentalImpact !== filterImpact) return false;
      if (filterPrice && product.price > filterPrice) return false;
      return true;
    });
    setProducts(filteredProducts);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fcfcfc] to-[#e8e8e8] p-8">
      <div className="max-w-screen-lg mx-auto">
        <h1 className="text-4xl font-bold text-[#20bf55] mb-12 text-center">
          {userType === 'consumidor' ? 'Dashboard do Consumidor' : 'Dashboard do Produtor'}
        </h1>

        {/* Filtros */}
        <div className="bg-[#fcfcfc] p-6 rounded-xl shadow-lg mb-12">
          <h2 className="text-2xl font-semibold text-[#20bf55] mb-6">Filtros de Produtos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <label className="block text-[#1e2019] font-medium mb-2">Origem</label>
              <select
                value={filterOrigin}
                onChange={(e) => setFilterOrigin(e.target.value)}
                className="w-full p-3 border-2 border-[#20bf55] rounded-lg bg-[#fcfcfc] text-[#1e2019] focus:ring-2 focus:ring-[#09814a]"
              >
                <option value="">Selecione a origem</option>
                <option value="Brasil">Brasil</option>
                <option value="Argentina">Argentina</option>
              </select>
            </div>

            <div>
              <label className="block text-[#1e2019] font-medium mb-2">Impacto Ambiental</label>
              <select
                value={filterImpact}
                onChange={(e) => setFilterImpact(e.target.value)}
                className="w-full p-3 border-2 border-[#20bf55] rounded-lg bg-[#fcfcfc] text-[#1e2019] focus:ring-2 focus:ring-[#09814a]"
              >
                <option value="">Selecione o impacto</option>
                <option value="Baixo">Baixo</option>
                <option value="Médio">Médio</option>
                <option value="Alto">Alto</option>
              </select>
            </div>

            <div>
              <label className="block text-[#1e2019] font-medium mb-2">Preço Máximo</label>
              <input
                type="number"
                value={filterPrice}
                onChange={(e) => setFilterPrice(Number(e.target.value))}
                className="w-full p-3 border-2 border-[#20bf55] rounded-lg bg-[#fcfcfc] text-[#1e2019] focus:ring-2 focus:ring-[#09814a]"
                placeholder="Digite o preço máximo"
              />
            </div>
          </div>

          <button
            onClick={handleFilter}
            className="mt-6 w-full bg-[#20bf55] text-[#fcfcfc] py-3 rounded-lg font-semibold hover:bg-[#09814a] transition-all"
          >
            Aplicar Filtros
          </button>
        </div>

        {/* Conteúdo principal */}
        {userType === 'consumidor' && (
          <div>
            <h2 className="text-2xl font-semibold text-[#20bf55] mb-6">Produtos em Destaque</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <div key={product.id} className="bg-[#fcfcfc] border-2 border-[#20bf55] rounded-xl shadow-lg overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="text-lg font-bold text-[#1e2019]">{product.name}</h3>
                    <p className="text-sm text-[#09814a]">Origem: {product.origin}</p>
                    <p className="text-sm text-[#1e2019]">Impacto Ambiental: {product.environmentalImpact}</p>
                    <p className="text-xl font-bold text-[#20bf55]">R$ {product.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {userType === 'produtor' && (
          <div>
            <h2 className="text-2xl font-semibold text-[#20bf55] mb-6">Resumo de Estoque e Vendas</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="bg-[#fcfcfc] border-2 border-[#20bf55] rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-[#1e2019]">Estoque Atual</h3>
                <p className="text-sm text-[#09814a]">Total de produtos: 150</p>
              </div>
              <div className="bg-[#fcfcfc] border-2 border-[#20bf55] rounded-xl shadow-lg p-6">
                <h3 className="text-lg font-semibold text-[#1e2019]">Vendas Recentes</h3>
                <p className="text-sm text-[#09814a]">Produtos vendidos: 120</p>
              </div>
            </div>
            <button
              className="mt-8 bg-[#e71d36] text-[#fcfcfc] py-3 px-6 rounded-lg font-semibold hover:bg-[#bf1a2d] transition-all"
            >
              Adicionar Novo Produto
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
