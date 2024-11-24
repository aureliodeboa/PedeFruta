import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Leaf, ShieldCheck, Sprout } from 'lucide-react';
import { OnboardingSlide } from '../components/onboarding/OnboardingSlide';
import { colors } from '../styles/colors';

const slides = [
  {
    id: 1,
    title: "Produtos Frescos e Naturais",
    description: "Conectamos você diretamente aos melhores produtores locais, garantindo qualidade e frescor em cada produto.",
    icon: <Leaf className="w-16 h-16" />
  },
  {
    id: 2,
    title: "Transações Seguras",
    description: "Todas as transações são protegidas por tecnologia blockchain, garantindo segurança e transparência.",
    icon: <ShieldCheck className="w-16 h-16" />
  },
  {
    id: 3,
    title: "Impacto Ambiental Positivo",
    description: "Apoie produtores que se preocupam com o meio ambiente e contribua para um futuro mais sustentável.",
    icon: <Sprout className="w-16 h-16" />
  }
];

export const OnboardingPage: React.FC = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const previousSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const goToLogin = () => {

  /// acho que faz mais sentido ir para tela de mercado
    navigate('/marketplace');
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: colors.primary.white }}>
      <div className="flex-1 flex flex-col items-center justify-center">
        {slides.map((slide, index) => (
          <OnboardingSlide
            key={slide.id}
            title={slide.title}
            description={slide.description}
            icon={slide.icon}
            isActive={index === currentSlide}
          />
        ))}
      </div>
      
      <div className="p-8">
        <div className="flex justify-center space-x-2 mb-6">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-colors`}
              style={{ 
                backgroundColor: index === currentSlide 
                  ? colors.primary.green 
                  : '#CBD5E0'
              }}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>

        <div className="flex justify-between items-center max-w-md mx-auto">
          {currentSlide > 0 ? (
            <button
              onClick={previousSlide}
              className="px-6 py-2 rounded-lg transition-colors"
              style={{ 
                color: colors.primary.green,
                border: `1px solid ${colors.primary.green}`
              }}
            >
              Anterior
            </button>
          ) : <div />}

          {currentSlide < slides.length - 1 ? (
            <button
              onClick={nextSlide}
              className="px-6 py-2 text-white rounded-lg transition-colors"
              style={{ backgroundColor: colors.primary.green }}
            >
              Próximo
            </button>
          ) : (
            <button
              onClick={goToLogin}
              className="px-6 py-2 text-white rounded-lg transition-opacity hover:opacity-90"
              style={{ backgroundColor: colors.primary.red }}
            >
              Começar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
