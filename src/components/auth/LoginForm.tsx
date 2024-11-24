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
  onCreateAccount
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
        <div className="relative">
          <Mail className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="email"
            placeholder="Seu e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-green"
            required
          />
        </div>

        <div className="relative">
          <Lock className="absolute left-3 top-3 text-gray-400" size={20} />
          <input
            type="password"
            placeholder="Sua senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary-green"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-primary-green text-white py-2 rounded-lg hover:bg-primary-darkGreen transition-colors"
        >
          Entrar
        </button>

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
            onClick={onCreateAccount}
            className="text-primary-green hover:text-primary-darkGreen"
          >
            Criar conta
          </button>
        </div>

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

        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            className="flex items-center justify-center  border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <img
              src="https://storage.googleapis.com/gd-prod/images/a910d418-7123-4bc4-aa3b-ef7e25e74ae6.60c498c559810aa0.webp"
              alt="Google"
              className="w-15 h-10 ml-2"
            />
            Google
          </button>
          <button
            type="button"
            className="flex items-center justify-center px-2 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <img
              src="https://logospng.org/wp-content/uploads/apple.jpg"
              alt="Apple"
              className="h-8 ml-3"
            />
            Apple
          </button>
        </div>
      </form>
    </div>
  );
};