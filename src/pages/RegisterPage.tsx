import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload } from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState<'consumidor' | 'produtor'>('consumidor');
  
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    telefone: '',
    preferencias: '',
    localizacao: '',
    metodosAgricolas: '',
    documentos: null as File | null,
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
    // console.log('Dados enviados:', formData);
    // if (userType === 'consumidor') {
    //   console.log('Redirecionar para dashboard do consumidor');
    // } else {
    //   console.log('Redirecionar para tela de perfil de negócios do produtor');
    // }
    navigate('/dashboard');
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-primary-dark flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-lg bg-primary-white p-8 shadow-lg rounded-lg">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={handleGoHome}
            className="text-primary-dark hover:text-primary-red transition-colors duration-200 flex items-center"
            aria-label="Voltar para a página inicial"
          >
            <ArrowLeft size={20} className="mr-2" />
            Voltar
          </button>
          <h2 className="text-2xl font-bold text-primary-green">
            Crie sua conta
          </h2>
        </div>

        <div className="flex justify-center gap-4 mb-6">
          <button
            onClick={() => setUserType('consumidor')}
            className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
              userType === 'consumidor'
                ? 'bg-primary-green text-primary-white'
                : 'bg-gray-200 text-primary-dark hover:bg-gray-300'
            }`}
          >
            Consumidor
          </button>
          <button
            onClick={() => setUserType('produtor')}
            className={`px-4 py-2 rounded-lg transition-colors duration-200 ${
              userType === 'produtor'
                ? 'bg-primary-green text-primary-white'
                : 'bg-gray-200 text-primary-dark hover:bg-gray-300'
            }`}
          >
            Produtor
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="nome" className="block text-sm font-medium text-primary-dark">Nome</label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleInputChange}
              required
              className="w-full p-2 mt-1 border-2 rounded-lg text-black bg-white focus:outline-none focus:ring-2 focus:ring-primary-green focus:text-[#1e2019] focus:bg-primary-white transition-all duration-100"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-primary-dark">E-mail</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full p-2 mt-1 border-2 rounded-lg text-black bg-white focus:outline-none focus:ring-2 focus:ring-primary-green focus:text-[#1e2019] focus:bg-primary-white transition-all duration-100"
            />
          </div>

          <div>
            <label htmlFor="telefone" className="block text-sm font-medium text-primary-dark">Telefone</label>
            <input
              type="tel"
              id="telefone"
              name="telefone"
              value={formData.telefone}
              onChange={handleInputChange}
              required
              className="w-full p-2 mt-1 border-2 rounded-lg text-black bg-white focus:outline-none focus:ring-2 focus:ring-primary-green focus:text-[#1e2019] focus:bg-primary-white transition-all duration-100"
            />
          </div>

          {userType === 'consumidor' ? (
            <div>
              <label htmlFor="preferencias" className="block text-sm font-medium text-primary-dark">
                Preferências
              </label>
              <textarea
                id="preferencias"
                name="preferencias"
                value={formData.preferencias}
                onChange={handleInputChange}
                rows={3}
                className="w-full p-2 mt-1 border-2 rounded-lg text-black bg-white focus:outline-none focus:ring-2 focus:ring-primary-green focus:text-[#1e2019] focus:bg-primary-white transition-all duration-100"
                placeholder="Ex.: orgânico, regional, etc."
              />
            </div>
          ) : (
            <>
              <div>
                <label htmlFor="localizacao" className="block text-sm font-medium text-primary-dark">
                  Localização
                </label>
                <input
                  type="text"
                  id="localizacao"
                  name="localizacao"
                  value={formData.localizacao}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 mt-1 border-2 rounded-lg text-black bg-white focus:outline-none focus:ring-2 focus:ring-primary-green focus:text-[#1e2019] focus:bg-primary-white transition-all duration-100"
                />
              </div>

              <div>
                <label htmlFor="metodosAgricolas" className="block text-sm font-medium text-primary-dark">
                  Métodos Agrícolas
                </label>
                <textarea
                  id="metodosAgricolas"
                  name="metodosAgricolas"
                  value={formData.metodosAgricolas}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full p-2 mt-1 border-2 rounded-lg text-black bg-white focus:outline-none focus:ring-2 focus:ring-primary-green focus:text-[#1e2019] focus:bg-primary-white transition-all duration-100"
                  placeholder="Descreva os métodos utilizados na produção."
                />
              </div>

              <div>
                <label htmlFor="documentos" className="block text-sm font-medium text-primary-dark">
                  Documentos para verificação
                </label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-primary-green border-dashed rounded-lg">
                  <div className="space-y-1 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="documentos"
                        className="relative cursor-pointer bg-primary-white rounded-md font-medium text-primary-green hover:text-primary-darkGreen focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-red"
                      >
                        <span>Faça upload de um arquivo</span>
                        <input id="documentos" name="documentos" type="file" className="sr-only" onChange={handleFileUpload} />
                      </label>
                      <p className="pl-1">ou arraste e solte</p>
                    </div>
                    <p className="text-xs text-gray-500">PNG, JPG, PDF até 10MB</p>
                  </div>
                </div>
              </div>
            </>
          )}

          <button
            type="submit"
            className="w-full bg-primary-green text-primary-white py-2 rounded-lg hover:bg-primary-darkGreen transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-green"
            onClick={handleSubmit}
          >
            Registrar
          </button>
        </form>
      </div>
    </div>
  );
};

