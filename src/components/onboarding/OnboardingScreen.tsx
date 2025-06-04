import React, { useState } from 'react';
import { ChevronRight, Volume2, MapPin, Download, Users } from 'lucide-react';
import { Button } from '../ui/button';

interface OnboardingProps {
  onComplete: () => void; // Callback when onboarding finishes
}

const Onboarding = ({ onComplete }: OnboardingProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      title: "Welcome to Audio Tourism",
      subtitle: "Discover the world through immersive audio experiences",
      image: "https://images.unsplash.com/photo-1614519738232-27ba94d26403?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      highlights: [
        { icon: Volume2, text: "Narrated Exploration" },
        { icon: MapPin, text: "GPS-Enabled Tours" },
      ]
    },
    {
      title: "Explore Like Never Before",
      subtitle: "Self-guided tours with professional narration",
      image: "https://images.unsplash.com/photo-1617170220968-1ea3bceb3209?q=80&w=2067&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      highlights: [
        { icon: Download, text: "Offline Downloads" },
        { icon: Users, text: "Community Features" },
      ]
    }
  ];

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-primary/20 to-secondary/20 overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 flex flex-col justify-end min-h-screen p-6 pb-20">
        <div className="glass-card rounded-2xl p-6 mb-8 animate-fade-in">
          <h1 className="text-3xl font-bold text-white mb-3">
            {slides[currentSlide].title}
          </h1>
          <p className="text-white/90 text-lg mb-6">
            {slides[currentSlide].subtitle}
          </p>
          
          <div className="space-y-3 mb-8">
            {slides[currentSlide].highlights.map((highlight, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <highlight.icon size={16} className="text-white" />
                </div>
                <span className="text-white font-medium">{highlight.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-center space-x-2 mb-6">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'w-6 bg-white' : 'w-2 bg-white/50'
              }`}
            />
          ))}
        </div>

        <Button
          onClick={nextSlide}
          className="w-full h-12 gradient-saffron text-white font-semibold"
          size="lg"
        >
          {currentSlide === slides.length - 1 ? 'Get Started' : 'Next'}
          <ChevronRight size={20} className="ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default Onboarding;
