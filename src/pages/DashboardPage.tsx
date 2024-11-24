import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Importando useNavigate
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar'; 
import { colors } from '../styles/colors';
import { ItemCarrinho } from '../types/types';
import { CartModal } from '../components/CartModal';

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
  const navigate = useNavigate(); // Usando o hook useNavigate
  const [carrinho, setCarrinho] = useState<ItemCarrinho[]>([]);
  const userTypeFromURL = location.pathname.split('/')[2];
  const [mostrarCarrinho, setMostrarCarrinho] = useState(false);
  const [products, setProducts] = useState<Product[]>([
    {
      id: 1,
      name: 'Melancia',
      price: 15.0,
      origin: 'Sobradinho, Brasil',
      environmentalImpact: 'Baixo',
      image: 'https://static.itdg.com.br/images/622-auto/8e94f29683bd0812f6aceb29764b284a/como-aproveitar-todas-as-partes-da-melancia.jpg',
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

  // Função para redirecionar para a página de adicionar produto
  const handleAddProduct = () => {
    navigate('/dashboard/produtor/adicionar-produto'); // Redireciona para a página de adicionar produto
  };

  // Função para remover item do carrinho
  const handleRemoveItem = (id: number) => {
    setCarrinho(carrinho.filter(item => item.id !== id));
  };

  const handleSmartContracts = () => {
    navigate(`/dashboard/${userTypeFromURL}/contratos-inteligentes`); 
  };  

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.primary.white }}>
      {/* Chamando a Navbar antes de todo o conteúdo */}
      <Navbar
        quantidadeItens={carrinho.length}
        onCarrinhoClick={() => setMostrarCarrinho(false)}
      />

      {/* Condicionalmente exibe o carrinho se mostrarCarrinho for true */}
        {/* Modal do Carrinho */}
        <CartModal
            isOpen={mostrarCarrinho}
            onClose={() => setMostrarCarrinho(false)} // Fecha o carrinho
            cartItems={carrinho}
            onRemoveItem={handleRemoveItem} // Passa a função de remoção de item
        />
      
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

            <div className="flex gap-4 mt-6">
              <button
                onClick={handleFilter}
                className="w-full bg-[#20bf55] text-[#fcfcfc] py-3 rounded-lg font-semibold hover:bg-[#09814a] transition-all"
              >
                Aplicar Filtros
              </button>

              {userType === 'produtor' && (
                <button
                  className="w-full bg-[#e71d36] text-[#fcfcfc] py-3 rounded-lg font-semibold hover:bg-[#bf1a2d] transition-all"
                  onClick={handleAddProduct} // Redireciona ao clicar
                >
                  Adicionar Novo Produto
                </button>
              )}
                <button
                  onClick={handleSmartContracts}
                  className="w-full bg-blue-600 text-[#fcfcfc] py-3 rounded-lg font-semibold hover:bg-[#076c38] transition-all"
                >
                  Contratos Inteligentes
                </button>
            </div>
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
                      <Link
                        to={`/dashboard/${userType}/produto/${product.id}`}
                        className="mt-4 inline-block w-full bg-[#20bf55] text-[#fcfcfc] py-2 rounded-lg text-center font-semibold hover:bg-[#09814a] transition-all"
                      >
                        Ver Detalhes
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Para o Produtor */}
          {userType === 'produtor' && (
            <div>
              <h2 className="text-2xl font-semibold text-[#20bf55] mb-6">Produtos no Estoque</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {products.map((product) => (
                  <div key={product.id} className="bg-[#fcfcfc] border-2 border-[#20bf55] rounded-xl shadow-lg overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-[#1e2019]">{product.name}</h3>
                      <p className="text-sm text-[#09814a]">Origem: {product.origin}</p>
                      <p className="text-sm text-[#1e2019]">Impacto Ambiental: {product.environmentalImpact}</p>
                      <p className="text-xl font-bold text-[#20bf55]">R$ {product.price}</p>
                      <Link
                        to={`/dashboard/produtor/produto/${product.id}`}
                        className="mt-4 inline-block w-full bg-[#20bf55] text-[#fcfcfc] py-2 rounded-lg text-center font-semibold hover:bg-[#09814a] transition-all"
                      >
                        Ver Detalhes
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
