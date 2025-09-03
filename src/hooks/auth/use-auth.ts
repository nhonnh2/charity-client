'use client';
import authApiRequest from '@/apiRequests/auth';
import { useMutation } from '@tanstack/react-query';
import { createContext, useContext, useEffect, useState } from 'react';
import { useAccount, useDisconnect } from 'wagmi';

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: authApiRequest.login,
  });
};

export const useLogoutMutation = () => {
  return useMutation({
    mutationFn: authApiRequest.logout,
  });
};

interface User {
  id: string;
  fullName: string;
  email?: string;
  phone?: string;
  walletAddress?: string;
  authType: 'email' | 'web3';
  reputation: number;
  avatar?: string;
  isVerified: boolean;
  createdAt: Date;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithWeb3: (address: string, signature: string) => Promise<void>;
  register: (userData: Partial<User>) => Promise<void>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Hook để sử dụng trong components
export function useAuthState() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  const isAuthenticated = !!user;

  // Simulate checking localStorage for saved auth state
  useEffect(() => {
    const checkAuthState = async () => {
      try {
        const savedUser = localStorage.getItem('trustcharity_user');
        if (savedUser) {
          const userData = JSON.parse(savedUser);
          setUser(userData);
        }
      } catch (error) {
        console.error('Error loading auth state:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthState();
  }, []);

  // Handle Web3 wallet disconnection
  useEffect(() => {
    if (!isConnected && user?.authType === 'web3') {
      logout();
    }
  }, [isConnected, user]);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const mockUser: User = {
        id: '1',
        fullName: 'Người dùng Email',
        email,
        authType: 'email',
        reputation: 75,
        isVerified: true,
        createdAt: new Date(),
      };

      setUser(mockUser);
      localStorage.setItem('trustcharity_user', JSON.stringify(mockUser));
    } catch (error) {
      throw new Error('Đăng nhập thất bại');
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithWeb3 = async (address: string, signature: string) => {
    setIsLoading(true);
    try {
      // Simulate API call to verify signature and get user data
      await new Promise(resolve => setTimeout(resolve, 1000));

      const mockUser: User = {
        id: address.toLowerCase(),
        fullName: 'Người dùng Web3',
        walletAddress: address,
        authType: 'web3',
        reputation: 90,
        isVerified: true,
        createdAt: new Date(),
      };

      setUser(mockUser);
      localStorage.setItem('trustcharity_user', JSON.stringify(mockUser));
    } catch (error) {
      throw new Error('Đăng nhập Web3 thất bại');
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: Partial<User>) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      const newUser: User = {
        id: userData.walletAddress || Math.random().toString(36).substr(2, 9),
        fullName: userData.fullName || '',
        email: userData.email,
        phone: userData.phone,
        walletAddress: userData.walletAddress,
        authType: userData.authType || 'email',
        reputation: 0,
        isVerified: false,
        createdAt: new Date(),
      };

      setUser(newUser);
      localStorage.setItem('trustcharity_user', JSON.stringify(newUser));
    } catch (error) {
      throw new Error('Đăng ký thất bại');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('trustcharity_user');

    // Disconnect wallet if using Web3 auth
    if (isConnected && user?.authType === 'web3') {
      disconnect();
    }
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('trustcharity_user', JSON.stringify(updatedUser));
    }
  };

  return {
    user,
    isLoading,
    isAuthenticated,
    login,
    loginWithWeb3,
    register,
    logout,
    updateUser,
  };
}
