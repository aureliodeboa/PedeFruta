import React from 'react';
import { LoginForm } from '../components/auth/LoginForm';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useNavigate } from 'react-router-dom'; // Importar o hook de navegação

export const LoginPage: React.FC = () => {
  const navigate = useNavigate(); // Hook para navegação

  const handleLogin = (email: string, password: string) => {
    console.log('Login:', email, password);
  };

  const handleForgotPassword = () => {
    console.log('Esqueceu a senha');
  };

  const handleCreateAccount = () => {
    navigate('/register'); // Redirecionar para a página de registro
  };

  return (
    <div className="min-h-screen bg-primary-white flex items-center justify-center p-4">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="hidden md:block">
          <DotLottieReact
            src="https://lottie.host/dacf3125-a0f7-4792-bc1f-48689c9ca9fc/LS7uXoW6D8.lottie"
            loop
            autoplay
          />
        </div>
        <LoginForm
          onSubmit={handleLogin}
          onForgotPassword={handleForgotPassword}
          onCreateAccount={handleCreateAccount} // Passando o handler para o componente LoginForm
        />
      </div>
    </div>
  );
};
