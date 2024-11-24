import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';


interface Contract {
  id: number;
  title: string;
  status: 'Ativo' | 'Concluído';
  parties: string[];
  value: string;
  deadline: string;
}

export const SmartContractsPage: React.FC = () => {
  const contractsData: Contract[] = [
    {
      id: 1,
      title: 'Contrato de Venda',
      status: 'Ativo',
      parties: ['Alice', 'Bob'],
      value: 'R$ 5.000,00',
      deadline: '2024-12-31',
    },
    {
      id: 2,
      title: 'Contrato de Serviço',
      status: 'Concluído',
      parties: ['Empresa X', 'João'],
      value: 'R$ 10.000,00',
      deadline: '2024-06-15',
    },
  ];
  const userTypeFromURL = location.pathname.split('/')[2];
  const navigate = useNavigate();
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);

  const handleGoHome = () => {
    // Ajuste "userType" conforme sua lógica de navegação
    navigate(`/dashboard/${userTypeFromURL}`);
  };

  return (
    <div className="relative min-h-screen bg-gray-100 text-gray-800 p-6">
      {/* Botão Voltar */}
      <button
        onClick={handleGoHome}
        className="absolute top-6 left-6 text-primary-dark hover:text-primary-red transition-colors duration-200 flex items-center"
        aria-label="Voltar para a página inicial"
      >
        <ArrowLeft size={20} className="mr-2" />
        Voltar
      </button>

      {/* Título Principal */}
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
        Contratos Inteligentes
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Histórico de Contratos */}
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-xl font-bold text-orange-600 mb-4">Histórico de Contratos</h2>
          <ul className="space-y-3">
            {contractsData.map((contract) => (
              <li
                key={contract.id}
                onClick={() => setSelectedContract(contract)}
                className="flex justify-between items-center p-3 bg-gray-50 hover:bg-gray-100 cursor-pointer rounded-lg transition"
              >
                <span className="font-medium">{contract.title}</span>
                <span
                  className={`text-sm font-semibold px-2 py-1 rounded ${
                    contract.status === 'Ativo'
                      ? 'bg-blue-200 text-blue-800'
                      : 'bg-orange-200 text-orange-800'
                  }`}
                >
                  {contract.status}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Detalhes do Contrato */}
        <div className="bg-white shadow-lg rounded-lg p-4">
          <h2 className="text-xl font-bold text-blue-600 mb-4">Detalhes do Contrato</h2>
          {selectedContract ? (
            <div className="space-y-3">
              <div>
                <h3 className="font-bold text-gray-700">Título</h3>
                <p>{selectedContract.title}</p>
              </div>
              <div>
                <h3 className="font-bold text-gray-700">Status</h3>
                <span
                  className={`text-sm font-semibold px-2 py-1 rounded ${
                    selectedContract.status === 'Ativo'
                      ? 'bg-blue-200 text-blue-800'
                      : 'bg-orange-200 text-orange-800'
                  }`}
                >
                  {selectedContract.status}
                </span>
              </div>
              <div>
                <h3 className="font-bold text-gray-700">Partes Envolvidas</h3>
                <ul className="list-disc list-inside">
                  {selectedContract.parties.map((party, index) => (
                    <li key={index}>{party}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-gray-700">Valor</h3>
                <p>{selectedContract.value}</p>
              </div>
              <div>
                <h3 className="font-bold text-gray-700">Prazo</h3>
                <p>{selectedContract.deadline}</p>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">Selecione um contrato para ver os detalhes.</p>
          )}
        </div>
      </div>
    </div>
  );
};
