import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

interface AuthScreenProps {
  onComplete: () => void;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ onComplete }) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you can add your real auth logic
    setTimeout(() => {
      onComplete(); // Notify that auth is complete and navigate forward
    }, 500);
  };

  const handleSocialLogin = (provider: string) => {
    console.log(`${provider} login`);
    // Simulate async social login and navigate on success
    setTimeout(() => {
      onComplete();
    }, 500);
  };

  const handleToggleMode = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <div className="relative min-h-screen image_bg bg-cover bg-center flex items-center justify-center p-6">
      {/* 40% Black Overlay */}
      <div className="absolute inset-0 bg-black/40 z-0" />

      <div className="relative z-10 w-full max-w-md">
        <Card className="w-full p-8 elevation-8 rounded-2xl glass-card">
          <div className="text-center mb-2">
            <h1 className="text-2xl font-bold text-white mb-1">
              {isSignUp ? 'Create Account' : 'Welcome Back'}
            </h1>
            <p className="text-white/80">
              {isSignUp
                ? 'Join the Audio Tourism community'
                : 'Sign in to continue your journey'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {isSignUp && (
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="pl-12 py-3 rounded-xl border-gray-200"
                  required
                />
                <Mail
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
              </div>
            )}

            <div className="relative">
              <Input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-12 py-3 rounded-xl border-gray-200"
                required
              />
              <Mail
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
            </div>

            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-12 pr-12 py-3 rounded-xl border-gray-200"
                required
              />
              <Lock
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-4 rounded-xl gradient-saffron"
            >
              {isSignUp ? 'Create Account' : 'Sign In'}
            </Button>
          </form>

          {/* Social Login */}
          <div className="mt-6">
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                className="py-3 rounded-xl border-gray-200 hover:bg-gray-50"
                onClick={() => handleSocialLogin('Google')}
              >
                <img
                  src="https://www.google.com/favicon.ico"
                  alt="Google"
                  className="w-5 h-5 mr-2"
                />
                Google
              </Button>
              <Button
                variant="outline"
                className="py-3 rounded-xl border-gray-200 hover:bg-gray-50"
                onClick={() => handleSocialLogin('Facebook')}
              >
                <img
                  src="https://www.facebook.com/favicon.ico"
                  alt="Facebook"
                  className="w-5 h-5 mr-2"
                />
                Facebook
              </Button>
            </div>
          </div>

          <div className="text-center mt-7">
            <button
              type="button"
              onClick={handleToggleMode}
              className="text-white hover:text-white/80 font-medium"
            >
              {isSignUp
                ? 'Already have an account? Sign In'
                : "Don't have an account? Sign Up"}
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AuthScreen;
