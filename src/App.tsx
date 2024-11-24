import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { OnboardingPage } from './pages/OnboardingPage';
import { LoginPage } from './pages/LoginPage';
import { HomePage } from './pages/HomePage';
import { RegisterPage } from './pages/RegisterPage';
import { DashboardPage } from './pages/DashboardPage';
import { ProductDetailsPage } from './pages/ProductDetailsPage';
import { AddProductPage } from './pages/AddProductPage';
import PaymentPage from './pages/PaymentPage';
import { SmartContractsPage } from './pages/SmartContractsPage';

const App: React.FC = () => {
  const handleConfirmPayment = (paymentMethod: string) => {
    // Lógica para processar o pagamento
    console.log(`Método de pagamento selecionado: ${paymentMethod}`);
    // Exemplo de redirecionamento ou mensagem de sucesso após pagamento
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<OnboardingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/marketplace" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard/:userType" element={<DashboardPage />} />
        <Route path="/dashboard/:userType/produto/:productId" element={<ProductDetailsPage />} />
        <Route path="/dashboard/produtor/adicionar-produto" element={<AddProductPage />} />
        <Route path="/dashboard/:userType/contratos-inteligentes" element={<SmartContractsPage />} />
        <Route path="/pagamento" element={<PaymentPage onConfirmPayment={handleConfirmPayment} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
