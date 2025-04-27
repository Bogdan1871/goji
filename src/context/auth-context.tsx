import { createContext, useContext, ReactNode, useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface AuthContextType {
  token: string | null;
  login: (userData: { username: string; password: string }) => Promise<void>;
  register: (userData: { username: string; password: string }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const tokenFromLocalStorage = localStorage.getItem('token');
  const [token, setToken] = useState<string | null>(tokenFromLocalStorage);


  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, [token]);

  const { mutateAsync: login } = useMutation({
    mutationFn: async ({ username, password }: { username: string; password: string }) => {
      const response = await axios.post('/auth/login', { username, password });
      return response.data.access_token;
    },
    onSuccess: (token) => {
      toast.success('Login successful!');
      setToken(token);
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      queryClient.setQueryData(['auth'], { token });
      navigate('/');
    },
    onError: () => {
      toast.error('Login failed. Please check your credentials.');
    }
  });

  const { mutateAsync: register } = useMutation({
    mutationFn: async ({ username, password }: { username: string; password: string }) => {
      await axios.post('/auth/register', {
        username,
        password,
      });
    },
    onSuccess: () => {
      toast.success('Registration successful!');
      navigate('/login');
    },
    onError: () => {
      toast.error('Registration failed. Username may already be taken.');
    }
  });

  const logout = () => {
    localStorage.removeItem('token');
    queryClient.removeQueries({ queryKey: ['auth'], exact: true });
  };

  return (
    <AuthContext.Provider value={{ token, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
