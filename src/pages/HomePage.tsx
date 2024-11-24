import React, { useState } from 'react';
import { Navbar } from '../components/Navbar';
import { ProductGrid } from '../components/ProductGrid';
import { CartModal } from '../components/CartModal';
import { ProductDetailsModal } from '../components/ProductDetailsModal'; // Novo Modal
import { Fruta, ItemCarrinho } from '../types/types';
import { colors } from '../styles/colors';

const produtos: Fruta[] = [
  {
    id: 1,
    nome: "Maçã",
    categoria: "Frutas",
    preco: 2.50,
    imagem: "https://superpao.vtexassets.com/unsafe/fit-in/720x720/center/middle/https%3A%2F%2Fsuperpao.vtexassets.com%2Farquivos%2Fids%2F458379%2FMaca-Fuji-kg.jpg%3Fv%3D638548369382400000",
    descricao: "Maçã fresca e suculenta"
  },
  {
    id: 2,
    nome: "Banana",
    categoria: "Frutas",
    preco: 3.00,
    imagem: "https://bretas.vtexassets.com/arquivos/ids/184735/6571bfb4558925a4e8898241.jpg?v=638375502639230000",
    descricao: "Banana prata madura"
  },
  {
    id: 3,
    nome: "Manga",
    categoria: "Frutas",
    preco: 4.50,
    imagem: "https://revistacampoenegocios.com.br/wp-content/uploads/2020/09/Foto-02-2.jpg",
    descricao: "Manga tommy madura"
  },
  {
    id: 4,
    nome: "Morango",
    categoria: "Frutas",
    preco: 5.00,
    imagem: "https://d26lpennugtm8s.cloudfront.net/stores/304/048/rte/Morango2.png",
    descricao: "Morango fresco"
  }
];

export const HomePage: React.FC = () => {
  const [carrinho, setCarrinho] = useState<ItemCarrinho[]>([]);
  const [mostrarCarrinho, setMostrarCarrinho] = useState(false);
  const [mostrarDetalhesProduto, setMostrarDetalhesProduto] = useState(false); // Estado para controlar o modal de detalhes
  const [produtoSelecionado, setProdutoSelecionado] = useState<Fruta | null>(null); // Produto selecionado para detalhes

  const adicionarAoCarrinho = (fruta: Fruta) => {
    setCarrinho(carrinhoAtual => {
      const itemExistente = carrinhoAtual.find(item => item.id === fruta.id);

      if (itemExistente) {
        return carrinhoAtual.map(item =>
          item.id === fruta.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      }

      return [...carrinhoAtual, { ...fruta, quantidade: 1 }];
    });
  };

  const removerDoCarrinho = (id: number) => {
    setCarrinho(carrinhoAtual =>
      carrinhoAtual.filter(item => item.id !== id)
    );
  };

  const mostrarDetalhes = (produto: Fruta) => {
    setProdutoSelecionado(produto);
    setMostrarDetalhesProduto(true);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.primary.white }}>
      <Navbar
        quantidadeItens={carrinho.length}
        onCarrinhoClick={() => setMostrarCarrinho(true)}
      />
      
      <main className="container mx-auto p-4">
        <ProductGrid
          produtos={produtos}
          onAddToCart={adicionarAoCarrinho}
          onViewDetails={mostrarDetalhes} // Passar a função para visualizar os detalhes
        />
      </main>

      <CartModal
        isOpen={mostrarCarrinho}
        onClose={() => setMostrarCarrinho(false)}
        cartItems={carrinho}
        onRemoveItem={removerDoCarrinho}
      />
      
      {/* Modal de Detalhes do Produto */}
      {produtoSelecionado && (
        <ProductDetailsModal
          isOpen={mostrarDetalhesProduto}
          onClose={() => setMostrarDetalhesProduto(false)}
          produto={produtoSelecionado}
        />
      )}
    </div>
  );
};
