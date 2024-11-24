import React, { useState } from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  origin: string;
  environmentalImpact: string;
  image: string;
}

interface DashboardPage {
  userType: 'consumidor' | 'produtor';
}

export const DashboardPage: React.FC<DashboardPage> = ({ userType }) => {
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

  // Filtros
  const [filterOrigin, setFilterOrigin] = useState('');
  const [filterImpact, setFilterImpact] = useState('');
  const [filterPrice, setFilterPrice] = useState(0);

  const handleAddProduct = () => {
    console.log('Adicionar novo produto');
  };

  const handleFilter = () => {
    // Aplique os filtros nos produtos
    const filteredProducts = products.filter((product) => {
      if (filterOrigin && product.origin !== filterOrigin) return false;
      if (filterImpact && product.environmentalImpact !== filterImpact) return false;
      if (filterPrice && product.price > filterPrice) return false;
      return true;
    });
    setProducts(filteredProducts);
    console.log('Filtrando...');
  };

  return (
    <div className="min-h-screen bg-[#fcfcfc] p-6">
      <div className="max-w-screen-lg mx-auto">
        <h1 className="text-3xl font-bold text-[#20bf55] mb-8 text-center">
          {userType === 'consumidor' ? 'Dashboard do Consumidor' : 'Dashboard do Produtor'}
        </h1>

        {/* Filtros para consumidores */}
        {userType === 'consumidor' && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-[#20bf55] mb-4">Filtros de Produtos</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-[#1e2019]">Origem</label>
                <select
                  value={filterOrigin}
                  onChange={(e) => setFilterOrigin(e.target.value)}
                  className="w-full p-2 border-2 border-[#20bf55] rounded-lg"
                >
                  <option value="">Selecione a origem</option>
                  <option value="Brasil">Brasil</option>
                  <option value="Argentina">Argentina</option>
                </select>
              </div>

              <div>
                <label className="block text-[#1e2019]">Impacto Ambiental</label>
                <select
                  value={filterImpact}
                  onChange={(e) => setFilterImpact(e.target.value)}
                  className="w-full p-2 border-2 border-[#20bf55] rounded-lg"
                >
                  <option value="">Selecione o impacto</option>
                  <option value="Baixo">Baixo</option>
                  <option value="Médio">Médio</option>
                  <option value="Alto">Alto</option>
                </select>
              </div>

              <div>
                <label className="block text-[#1e2019]">Preço</label>
                <input
                  type="number"
                  value={filterPrice}
                  onChange={(e) => setFilterPrice(Number(e.target.value))}
                  className="w-full p-2 border-2 border-[#20bf55] rounded-lg"
                  placeholder="Digite o preço máximo"
                />
              </div>

              <button
                onClick={handleFilter}
                className="w-full bg-[#20bf55] text-[#fcfcfc] py-2 rounded-lg hover:bg-[#09814a] transition-colors"
              >
                Aplicar Filtros
              </button>
            </div>
          </div>
        )}

        {/* Produtos em destaque (para consumidores) ou Resumo de estoque (para produtores) */}
        {userType === 'consumidor' && (
          <div>
            <h2 className="text-xl font-semibold text-[#20bf55] mb-4">Produtos em Destaque</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div key={product.id} className="border-2 border-[#20bf55] p-4 rounded-lg shadow-md">
                  <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4" />
                  <h3 className="text-lg font-semibold text-[#1e2019]">{product.name}</h3>
                  <p className="text-sm text-[#09814a]">Origem: {product.origin}</p>
                  <p className="text-sm text-[#1e2019]">Impacto Ambiental: {product.environmentalImpact}</p>
                  <p className="text-lg font-bold text-[#20bf55]">R$ {product.price}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {userType === 'produtor' && (
          <div>
            <h2 className="text-xl font-semibold text-[#20bf55] mb-4">Resumo de Estoque e Vendas</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="border-2 border-[#20bf55] p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-[#1e2019]">Estoque Atual</h3>
                <p className="text-sm text-[#09814a]">Total de produtos: 150</p>
              </div>

              <div className="border-2 border-[#20bf55] p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold text-[#1e2019]">Vendas Recentes</h3>
                <p className="text-sm text-[#09814a]">Produtos vendidos: 120</p>
              </div>
            </div>

            <button
              onClick={handleAddProduct}
              className="mt-6 bg-[#e71d36] text-[#fcfcfc] py-2 px-6 rounded-lg hover:bg-[#bf1a2d] transition-colors"
            >
              Adicionar Novo Produto
            </button>

            <div className="mt-8 border-2 border-[#20bf55] p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-[#1e2019]">Impacto Ambiental Gerado</h3>
              <p className="text-sm text-[#09814a]">Impacto: Baixo</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
