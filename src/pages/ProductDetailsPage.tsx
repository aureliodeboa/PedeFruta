import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

interface User {
  role: 'consumidor' | 'produtor';
}

interface HistoryStep {
  step: string;
  description: string;
  date: string;
}

interface ProductDetailsProps {
  id: number;
  name: string;
  price: number;
  origin: string;
  environmentalImpact: string;
  carbonEmission: number; // Emissão de carbono, em kg CO2
  image: string;
  history: HistoryStep[];
  qrCode: string;
  mapUrl: string; // URL para o mapa
}

export const ProductDetailsPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [product, setProduct] = useState<ProductDetailsProps | null>(null);
  const [user] = useState<User>({ role: 'consumidor' }); // Exemplo de usuário (consumidor ou produtor)
  const [isEditing, setIsEditing] = useState(false); // Para alternar entre visualização e edição

  useEffect(() => {
    // Simulação de busca dos detalhes do produto
    const fetchProductDetails = async () => {
      const mockProduct: ProductDetailsProps = {
        id: 1,
        name: 'Melancia',
        price: 15.0,
        origin: 'Sobradinho, Brasil',
        environmentalImpact: 'Baixo',
        carbonEmission: 2.3,
        image:
          'https://static.itdg.com.br/images/622-auto/8e94f29683bd0812f6aceb29764b284a/como-aproveitar-todas-as-partes-da-melancia.jpg',
        history: [
          {
            step: 'Plantio',
            description: 'Sementes plantadas em Sobradinho, utilizando irrigação do Rio São Francisco.',
            date: '2024-01-15',
          },
          {
            step: 'Crescimento',
            description: 'Monitoramento da plantação e aplicação de adubo orgânico.',
            date: '2024-02-15',
          },
          {
            step: 'Colheita',
            description: 'Colheita realizada manualmente com seleção das melancias mais maduras.',
            date: '2024-03-20',
          },
          {
            step: 'Transporte',
            description: 'Melancias transportadas para o centro de distribuição em caminhões refrigerados.',
            date: '2024-03-25',
          },
          {
            step: 'Armazenamento',
            description: 'Produto armazenado em câmara fria para garantir frescor.',
            date: '2024-03-26',
          },
          {
            step: 'Distribuição',
            description: 'Enviadas para mercados locais e feiras na região de Sobradinho.',
            date: '2024-03-27',
          },
        ],
        qrCode: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Link_pra_pagina_principal_da_Wikipedia-PT_em_codigo_QR_b.svg/1200px-Link_pra_pagina_principal_da_Wikipedia-PT_em_codigo_QR_b.svg.png',
        mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15741.67926376387!2d-40.80941852178228!3d-9.472164483819878!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x7739797837b02a9%3A0xf3f0369bca364f72!2sSobradinho%2C%20BA%2C%2048925-000!5e0!3m2!1spt-BR!2sbr!4v1732465594384!5m2!1spt-BR!2sbr',
      };

      setProduct(mockProduct);
    };

    fetchProductDetails();
  }, [productId]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Carregando...</p>
      </div>
    );
  }

  // Extrair o tipo de usuário a partir da URL
  const userTypeFromURL = location.pathname.split('/')[2];

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Salvar as mudanças (simulação)
    console.log('Produto editado', product);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fcfcfc] to-[#e8e8e8] p-8">
      <div className="max-w-screen-lg mx-auto bg-[#fcfcfc] p-6 rounded-xl shadow-lg">
        {/* Botão de Voltar */}
        <button
          onClick={() => navigate(`/dashboard/${userTypeFromURL}`)} // Usar o tipo de usuário extraído da URL
          className="flex items-center text-[#20bf55] font-semibold mb-6"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6 mr-2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Voltar
        </button>

        {/* Informações do Produto */}
        <div className="flex flex-col md:flex-row gap-8">
          <img
            src={product.image}
            alt={product.name}
            className="w-full md:w-1/2 h-64 object-cover rounded-lg"
          />
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-[#20bf55] mb-4">{product.name}</h1>
            <p className="text-lg text-[#1e2019] mb-2">
              <strong>Origem:</strong> {product.origin}
            </p>
            <p className="text-lg text-[#1e2019] mb-2">
              <strong>Impacto Ambiental:</strong> {product.environmentalImpact}
            </p>
            <p className="text-lg text-[#1e2019] mb-2">
              <strong>Emissão de Carbono:</strong> {product.carbonEmission} kg CO2
            </p>
          </div>
        </div>

        {/* Mapa e QR Code */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <iframe
            src={product.mapUrl}
            title="Mapa"
            className="w-full h-[150px] rounded-lg border"
            loading="lazy"
          ></iframe>
          <img
            src={product.qrCode}
            alt="QR Code"
            className="w-full h-[150px] object-contain rounded-lg border"
          />
        </div>

        {/* Histórico */}
        <h2 className="text-xl font-semibold text-[#20bf55] mt-6 mb-4">Histórico</h2>
        <ul className="list-disc list-inside text-[#1e2019]">
          {product.history.map((step, index) => (
            <li key={index} className="mb-2">
              <strong>{step.step}:</strong> {step.description} <br />
              <span className="text-sm text-[#1e2019]">Data: {step.date}</span>
            </li>
          ))}
        </ul>

        {/* Botões */}
        <div className="mt-6 flex gap-4">
          {user.role === 'produtor' && isEditing && (
            <div className="flex-1 bg-[#f4f4f4] p-4 rounded-lg">
              {/* Formulário de Edição */}
              <h2 className="text-xl font-semibold text-[#20bf55] mb-4">Editar Produto</h2>
              <div className="mb-4">
                <label className="block text-[#1e2019] mb-2">Nome</label>
                <input
                  type="text"
                  value={product.name}
                  onChange={(e) => setProduct({ ...product, name: e.target.value })}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-[#1e2019] mb-2">Preço</label>
                <input
                  type="number"
                  value={product.price}
                  onChange={(e) => setProduct({ ...product, price: parseFloat(e.target.value) })}
                  className="w-full p-2 border rounded"
                />
              </div>
              {/* Mais campos de edição */}
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-[#20bf55] text-white rounded-lg mt-4"
              >
                Salvar alterações
              </button>
            </div>
          )}

          {userTypeFromURL === 'consumidor' && (
            <button className="px-6 py-2 bg-[#20bf55] text-white rounded-lg mt-4">
              Comprar
            </button>
          )}

          {userTypeFromURL === 'produtor' && !isEditing && (
            <button
              onClick={handleEdit}
              className="px-6 py-2 bg-[#20bf55] text-white rounded-lg mt-4"
            >
              Editar Produto
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
