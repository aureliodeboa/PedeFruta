import React, { useEffect, useState } from 'react';
import { Navbar } from '../components/Navbar'; 
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PaymentScreenProps {
  onConfirmPayment: (paymentMethod: string) => void;
}

const PaymentPage: React.FC<PaymentScreenProps> = ({ onConfirmPayment }) => {
    const navigate = useNavigate();
    const [pedidoResumo, setPedidoResumo] = useState<{
    produtos: { nome: string; preco: number; quantidade: number }[];
    total: number;
  }>({ produtos: [], total: 0 });

  useEffect(() => {
    // Recuperar os itens do carrinho do localStorage
    const carrinho = localStorage.getItem('carrinho');
    if (carrinho) {
      const parsedCarrinho = JSON.parse(carrinho);
      const total = parsedCarrinho.reduce((acc: number, item: { preco: number; quantidade: number }) => acc + item.preco * item.quantidade, 0);
      setPedidoResumo({ produtos: parsedCarrinho, total });
    }
  }, []);

  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('');

  const handlePaymentMethodChange = (method: string) => {
    setSelectedPaymentMethod(method);
  };
  const handleGoHome = () => {
    navigate('/marketplace');
  };

  return (
    <div className="min-h-screen bg-primary-dark flex flex-col">
      {/* Navbar no topo */}
      <Navbar exibirCarrinho={false} />

      {/* Conteúdo centralizado */}
      <div className="flex flex-col items-center justify-center flex-grow">
        <form className="bg-[#fcfcfc] p-6 rounded-xl shadow-lg mt-6 w-full max-w-lg">
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={handleGoHome}
              className="text-primary-dark hover:text-primary-red transition-colors duration-200 flex items-center"
              aria-label="Voltar para a página anterior"
            >
              <ArrowLeft size={20} className="mr-2" />
              Voltar
            </button>
            <h2 className="text-2xl font-bold text-blue-600">Tela de Pagamento</h2>
          </div>

          {/* Resumo do pedido */}
          <div className="mb-6 p-4 bg-gray-100 rounded-lg shadow-sm">
            <h3 className="text-xl font-semibold text-blue-600 mb-4">Resumo do Pedido</h3>
            <ul className="space-y-4">
              {pedidoResumo.produtos.map((produto, index) => (
                <li key={index} className="flex justify-between text-[#1e2019]">
                  <span>{produto.nome} (x{produto.quantidade})</span>
                  <span>R$ {produto.preco.toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <div className="flex justify-between mt-4 text-xl font-bold">
              <strong className="text-[#20bf55]">Total:</strong>
              <strong className="text-[#20bf55]">R$ {pedidoResumo.total.toFixed(2)}</strong>
            </div>
          </div>

          {/* Métodos de pagamento */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-blue-600 mb-4">Escolha o Método de Pagamento</h3>
            <div className="space-y-4">
              <label className="flex items-center space-x-2 text-[#1e2019]">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="Cartão de Crédito"
                  checked={selectedPaymentMethod === 'Cartão de Crédito'}
                  onChange={() => handlePaymentMethodChange('Cartão de Crédito')}
                  className="text-primary-blue"
                />
                <span>Cartão de Crédito</span>
              </label>

              <label className="flex items-center space-x-2 text-[#1e2019]">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="Pix"
                  checked={selectedPaymentMethod === 'Pix'}
                  onChange={() => handlePaymentMethodChange('Pix')}
                  className="text-primary-blue"
                />
                <span>Pix</span>
              </label>

              <label className="flex items-center space-x-2 text-[#1e2019]">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="Criptomoeda"
                  checked={selectedPaymentMethod === 'Criptomoeda'}
                  onChange={() => handlePaymentMethodChange('Criptomoeda')}
                  className="text-primary-blue"
                />
                <span>Criptomoeda</span>
              </label>
            </div>
          </div>

          {/* Botão de confirmar pagamento */}
          <div className="mt-8">
            <button
              type="button"
              onClick={() => onConfirmPayment(selectedPaymentMethod)}
              disabled={!selectedPaymentMethod}
              className="w-full bg-[#20bf55] text-[#fffff] py-3 rounded-lg font-semibold hover:bg-primary-blue-dark transition-all"
            >
              Confirmar Pagamento
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentPage;
