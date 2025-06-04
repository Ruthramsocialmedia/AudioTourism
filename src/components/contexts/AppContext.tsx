
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
  showOnboarding: boolean;
  setShowOnboarding: (show: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [showOnboarding, setShowOnboarding] = useState(true);

  const isAuthenticated = !!user;

  return (
    <AppContext.Provider value={{
      user,
      setUser,
      isAuthenticated,
      showOnboarding,
      setShowOnboarding,
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};