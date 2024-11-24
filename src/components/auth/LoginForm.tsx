import React, { useState } from 'react';
import { Lock, Mail } from 'lucide-react';

interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
  onForgotPassword: () => void;
  onCreateAccount: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  onSubmit,
  onForgotPassword,
  onCreateAccount,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(email, password);
  };

  return (
    <div className="w-full max-w-md">
      <h2 className="text-3xl font-bold text-primary-dark mb-8 text-center">
        Bem-vindo de volta!
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Campo de e-mail */}
        <div className="relative">
          <Mail className="absolute left-3 top-3 text-[#1e2019]" size={20} />
          <input
            type="email"
            placeholder="Seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-[#f0f0f0] focus:outline-none focus:border-primary-green text-[#1e2019]"
            required
          />
        </div>

        {/* Campo de senha */}
        <div className="relative">
          <Lock className="absolute left-3 top-3 text-[#1e2019]" size={20} />
          <input
            type="password"
            placeholder="Sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-[#f0f0f0] focus:outline-none focus:border-primary-green text-[#1e2019]"
            required
          />
        </div>

        {/* Botão Entrar */}
        <button
          type="submit"
          className="w-full bg-primary-green text-white py-2 rounded-lg hover:bg-primary-darkGreen transition-colors"
        >
          Entrar
        </button>

        {/* Links adicionais */}
        <div className="flex justify-between text-sm">
          <button
            type="button"
            onClick={onForgotPassword}
            className="text-primary-green hover:text-primary-darkGreen"
          >
            Esqueceu a senha?
          </button>
          <button
            type="button"
            onClick={onCreateAccount} // Aqui é chamado o onCreateAccount
            className="text-primary-green hover:text-primary-darkGreen"
          >
            Criar conta
          </button>
        </div>

        {/* Separador */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              Ou continue com
            </span>
          </div>
        </div>

        {/* Botões de login com Google e Apple */}
        <div className="grid grid-cols-2 gap-4">
          {/* Botão Google */}
          <button
            type="button"
            className="flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2 px-4 hover:bg-gray-50"
          >
            <img
              src="https://storage.googleapis.com/gd-prod/images/a910d418-7123-4bc4-aa3b-ef7e25e74ae6.60c498c559810aa0.webp"
              alt="Google"
              className="h-12"
            />
          </button>

          {/* Botão Apple */}
          <button
            type="button"
            className="flex items-center justify-center gap-2 border border-gray-300 rounded-lg py-2 px-4 hover:bg-gray-50"
          >
            <img
              src="https://img.icons8.com/?size=150&id=30840&format=png"
              alt="Apple"
              className="h-9"
            />
          </button>
        </div>
      </form>
    </div>
  );
};
