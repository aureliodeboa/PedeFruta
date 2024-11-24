import React, { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { Navbar } from '../components/Navbar';

const consumidorData = {
  nome: "João Silva",
  email: "joao@email.com",
  historicoCompras: [
    { produto: "Produto A", data: "2024-01-15", valor: 99.99 },
    { produto: "Produto B", data: "2024-02-10", valor: 150.50 },
  ],
  preferencias: ["Frete grátis", "Descontos exclusivos"],
};

const produtorData = {
  nome: "Empresa XYZ",
  cnpj: "00.000.000/0001-00",
  relatoriosVendas: [
    { mes: "Janeiro", vendas: 120, desempenho: "Bom" },
    { mes: "Fevereiro", vendas: 200, desempenho: "Excelente" },
  ],
};

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const { userType } = useParams<{ userType: string }>();
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    if (userType === 'consumidor') {
      setUserData(consumidorData);
    } else if (userType === 'produtor') {
      setUserData(produtorData);
    } else {
      console.error('Tipo de usuário inválido:', userType);
    }
  }, [userType]);

  if (!userData) {
    return <p>Carregando...</p>;
  }

  const handleGoBack = () => {
    navigate(-1); // Volta para a página anterior
  };

  return (
    <div className="min-h-screen bg-primary-dark flex flex-col">
      {/* Navbar */}
      <Navbar exibirCarrinho={false} />

      {/* Conteúdo centralizado */}
      <div className="flex flex-col items-center justify-center flex-grow">
        <div className="bg-[#fcfcfc] p-6 rounded-xl shadow-lg mt-6 w-full max-w-lg">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={handleGoBack}
              className="text-primary-dark hover:text-primary-red transition-colors duration-200 flex items-center"
              aria-label="Voltar para a página anterior"
            >
              <ArrowLeft size={20} className="mr-2" />
              Voltar
            </button>
            <h2 className="text-2xl font-bold text-blue-600">Perfil</h2>
          </div>

          {/* Conteúdo do perfil */}
          {userType === 'consumidor' ? (
            <div>
              <h3 className="text-xl font-semibold text-blue-600 mb-4">Histórico de Compras</h3>
              <ul className="space-y-4 mb-6">
                {userData.historicoCompras.map((compra: any, index: number) => (
                  <li key={index} className="flex justify-between text-[#1e2019]">
                    <span>{compra.produto} (x{compra.data})</span>
                    <span>R$ {compra.valor.toFixed(2)}</span>
                  </li>
                ))}
              </ul>
              <h3 className="text-xl font-semibold text-blue-600 mb-4">Preferências</h3>
              <ul className="space-y-2">
                {userData.preferencias.map((preferencia: string, index: number) => (
                  <li key={index} className="text-[#1e2019]">{preferencia}</li>
                ))}
              </ul>
            </div>
          ) : (
            <div>
              <h3 className="text-xl font-semibold text-blue-600 mb-4">Dados da Empresa</h3>
              <div className="text-lg text-[#1e2019] mb-6">
                <p><strong>Nome:</strong> {userData.nome}</p>
                <p><strong>CNPJ:</strong> {userData.cnpj}</p>
              </div>

              <h3 className="text-xl font-semibold text-blue-600 mb-4">Relatórios de Vendas</h3>
              <ul className="space-y-4">
                {userData.relatoriosVendas.map((relatorio: any, index: number) => (
                  <li key={index} className="flex justify-between text-[#1e2019]">
                    <span>{relatorio.mes}</span>
                    <span>{relatorio.vendas} vendas - {relatorio.desempenho}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Botão Editar Perfil */}
          <div className="mt-8">
            <button
              type="button"
              onClick={() => navigate('/editar-perfil')}
              className="w-full bg-[#20bf55] text-white py-3 rounded-lg font-semibold hover:bg-primary-blue-dark transition-all"
            >
              Editar Perfil
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
