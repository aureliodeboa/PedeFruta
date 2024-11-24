
import React from 'react';
import { LoginForm } from '../components/auth/LoginForm';

export const LoginPage: React.FC = () => {
  const handleLogin = (email: string, password: string) => {
    console.log('Login:', email, password);
  };

  const handleForgotPassword = () => {
    console.log('Esqueceu a senha');
  };

  const handleCreateAccount = () => {
    console.log('Criar conta');
  };

  return (
    <div className="min-h-screen bg-primary-white flex items-center justify-center p-4">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="hidden md:block">
          <img
            src="/api/placeholder/400/400"
            alt="Login"
            className="w-full h-auto rounded-lg"
          />
        </div>
        <LoginForm
          onSubmit={handleLogin}
          onForgotPassword={handleForgotPassword}
          onCreateAccount={handleCreateAccount}
        />
      </div>
    </div>
  );
};