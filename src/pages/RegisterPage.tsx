import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState<'consumidor' | 'produtor'>('consumidor');
  
  const [formData, setFormData] = useState<{
    nome: string;
    email: string;
    telefone: string;
    preferencias: string;
    localizacao: string;
    metodosAgricolas: string;
    documentos: File | null;
  }>({
    nome: '',
    email: '',
    telefone: '',
    preferencias: '',
    localizacao: '',
    metodosAgricolas: '',
    documentos: null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setFormData((prev) => ({ ...prev, documentos: file }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Dados enviados:', formData);
    if (userType === 'consumidor') {
      console.log('Redirecionar para dashboard do consumidor');
    } else {
      console.log('Redirecionar para tela de perfil de negócios do produtor');
    }
  };

  // Função para voltar à HomePage
  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#FCFCFC] flex items-center justify-center p-4">
      <div className="absolute top-4 left-4">
        <button
            onClick={handleGoHome}
            className="px-4 py-2 rounded-lg bg-[#e71d36] text-[#FCFCFC] hover:bg-[#bf1a2d] transition-colors"
        >
            Voltar
        </button>
        </div>
      <div className="w-full max-w-lg bg-[#FCFCFC] p-8 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center text-[#20bf55] mb-6">
          Crie sua conta
        </h2>

        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => setUserType('consumidor')}
            className={`px-4 py-2 rounded-lg ${
              userType === 'consumidor'
                ? 'bg-[#20bf55] text-[#FCFCFC]'
                : 'bg-gray-200 text-[#1E2019]'
            }`}
          >
            Consumidor
          </button>
          <button
            onClick={() => setUserType('produtor')}
            className={`px-4 py-2 rounded-lg ${
              userType === 'produtor'
                ? 'bg-[#20bf55] text-[#FCFCFC]'
                : 'bg-gray-200 text-[#1E2019]'
            }`}
          >
            Produtor
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-[#20bf55]">Nome</label>
            <input
              type="text"
              name="nome"
              value={formData.nome}
              onChange={handleInputChange}
              required
              className="w-full p-2 border-2 border-[#20bf55] rounded-lg focus:outline-none focus:ring focus:ring-[#e71d36]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#20bf55]">E-mail</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full p-2 border-2 border-[#20bf55] rounded-lg focus:outline-none focus:ring focus:ring-[#e71d36]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#20bf55]">Telefone</label>
            <input
              type="tel"
              name="telefone"
              value={formData.telefone}
              onChange={handleInputChange}
              required
              className="w-full p-2 border-2 border-[#20bf55] rounded-lg focus:outline-none focus:ring focus:ring-[#e71d36]"
            />
          </div>

          {userType === 'consumidor' ? (
            <div>
              <label className="block text-sm font-medium text-[#20bf55]">
                Preferências
              </label>
              <textarea
                name="preferencias"
                value={formData.preferencias}
                onChange={handleInputChange}
                rows={3}
                className="w-full p-2 border-2 border-[#20bf55] rounded-lg focus:outline-none focus:ring focus:ring-[#e71d36]"
                placeholder="Ex.: orgânico, regional, etc."
              />
            </div>
          ) : (
            <>
              <div>
                <label className="block text-sm font-medium text-[#20bf55]">
                  Localização
                </label>
                <input
                  type="text"
                  name="localizacao"
                  value={formData.localizacao}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border-2 border-[#20bf55] rounded-lg focus:outline-none focus:ring focus:ring-[#e71d36]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#20bf55]">
                  Métodos Agrícolas
                </label>
                <textarea
                  name="metodosAgricolas"
                  value={formData.metodosAgricolas}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full p-2 border-2 border-[#20bf55] rounded-lg focus:outline-none focus:ring focus:ring-[#e71d36]"
                  placeholder="Descreva os métodos utilizados na produção."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#20bf55]">
                  Documentos para verificação
                </label>
                <input
                  type="file"
                  onChange={handleFileUpload}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#20bf55] file:text-[#FCFCFC] hover:file:bg-[#20bf55]"
                />
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full bg-[#20bf55] text-[#FCFCFC] py-2 rounded-lg hover:bg-[#20bf55] transition-colors"
          >
            Registrar
          </button>
        </form>
      </div>
    </div>
  );
};
