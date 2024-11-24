import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { colors } from '../styles/colors';
import { Navbar } from '../components/Navbar'; 
import { ArrowLeft } from 'lucide-react';

export const AddProductPage: React.FC = () => {
  const navigate = useNavigate();

  // Estados para o formulário
  const [nome, setNome] = useState('');
  const [descricao, setDescricao] = useState('');
  const [preco, setPreco] = useState<number>(0);
  const [validade, setValidade] = useState('');
  const [imagem, setImagem] = useState<File | null>(null);
  const [origem, setOrigem] = useState('');

  // Função para lidar com o envio do formulário
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você pode salvar o produto no banco de dados ou API
    console.log({
      nome,
      descricao,
      preco,
      validade,
      imagem,
      origem,
    });
    navigate('/dashboard/produtor');
  };

  // Função para lidar com o upload da imagem
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImagem(e.target.files[0]);
    }
  };

  const handleGoHome = () => {
    navigate('/dashboard/produtor');
  };

  return (
    <div className="min-h-screen bg-primary-dark flex flex-col">
      {/* Navbar no topo */}
      <Navbar exibirCarrinho={false} />
  
      {/* Conteúdo centralizado */}
      <div className="flex flex-col items-center justify-center flex-grow">
  
        <form onSubmit={handleSubmit} className="bg-[#fcfcfc] p-6 rounded-xl shadow-lg mt-6">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={handleGoHome}
            className="text-primary-dark hover:text-primary-red transition-colors duration-200 flex items-center"
            aria-label="Voltar para a página inicial"
          >
            <ArrowLeft size={20} className="mr-2" />
            Voltar
          </button>
          <h2
            className="text-2xl font-bold"
            style={{ color: colors.primary.green }}
            >
            Adicionar Produto
            </h2>

        </div>
          <div className="mb-6">
            <label className="block text-[#1e2019] font-medium mb-2">Nome do Produto</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full p-2 mt-1 border-2 rounded-lg text-black bg-white focus:outline-none focus:ring-2 focus:ring-primary-green focus:text-[#1e2019] focus:bg-primary-white transition-all duration-100"
              placeholder="Digite o nome do produto"
              required
            />
          </div>
  
          <div className="mb-6">
            <label className="block text-[#1e2019] font-medium mb-2">Descrição</label>
            <textarea
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              className="w-full p-2 mt-1 border-2 rounded-lg text-black bg-white focus:outline-none focus:ring-2 focus:ring-primary-green focus:text-[#1e2019] focus:bg-primary-white transition-all duration-100"
              placeholder="Digite a descrição do produto"
              required
            />
          </div>
  
          <div className="mb-6">
            <label className="block text-[#1e2019] font-medium mb-2">Preço</label>
            <input
              type="number"
              value={preco}
              onChange={(e) => setPreco(Number(e.target.value))}
              className="w-full p-2 mt-1 border-2 rounded-lg text-black bg-white focus:outline-none focus:ring-2 focus:ring-primary-green focus:text-[#1e2019] focus:bg-primary-white transition-all duration-100"
              placeholder="Digite o preço do produto"
              required
            />
          </div>
  
          <div className="mb-6">
            <label className="block text-[#1e2019] font-medium mb-2">Validade</label>
            <input
              type="date"
              value={validade}
              onChange={(e) => setValidade(e.target.value)}
              className="w-full p-2 mt-1 border-2 rounded-lg text-black bg-white focus:outline-none focus:ring-2 focus:ring-primary-green focus:text-[#1e2019] focus:bg-primary-white transition-all duration-100"
              required
            />
          </div>
  
          <div className="mb-6">
            <label className="block text-[#1e2019] font-medium mb-2">Imagem do Produto</label>
            <input
              type="file"
              onChange={handleImageChange}
              className="w-full p-3 border-2 border-[#20bf55] rounded-lg bg-[#fcfcfc] text-[#1e2019]"
            />
          </div>
  
          <div className="mb-6">
            <label className="block text-[#1e2019] font-medium mb-2">Origem do Produto</label>
            <input
              type="text"
              value={origem}
              onChange={(e) => setOrigem(e.target.value)}
              className="w-full p-2 mt-1 border-2 rounded-lg text-black bg-white focus:outline-none focus:ring-2 focus:ring-primary-green focus:text-[#1e2019] focus:bg-primary-white transition-all duration-100"
              placeholder="Digite a origem do produto"
              required
            />
          </div>
  
          <div className="mt-8">
            <button
              type="submit"
              className="w-full bg-[#20bf55] text-[#fcfcfc] py-3 rounded-lg font-semibold hover:bg-[#09814a] transition-all"
            >
              Confirmar Cadastro
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};