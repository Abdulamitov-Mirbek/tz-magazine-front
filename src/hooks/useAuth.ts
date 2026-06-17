import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../api/client';
import type { User, AuthResponse } from '../types';

export const useAuth = () => {
  const queryClient = useQueryClient();

  const { data: user, isLoading, isError } = useQuery<User>({
    queryKey: ['me'],
    queryFn: async () => {
      const response = await apiClient.get('/api/auth/me/');
      return response.data;
    },
    retry: false,
    enabled: !!localStorage.getItem('access_token'),
  });

  const loginMutation = useMutation({
    mutationFn: async (credentials: any) => {
      const response = await apiClient.post<AuthResponse>('/api/auth/login/', credentials);
      return response.data;
    },
    onSuccess: (data) => {
      localStorage.setItem('access_token', data.access);
      localStorage.setItem('refresh_token', data.refresh);
      queryClient.setQueryData(['me'], data.user);
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (userData: any) => {
      const response = await apiClient.post<AuthResponse>('/api/auth/register/', userData);
      return response.data;
    },
    onSuccess: (data) => {
      localStorage.setItem('access_token', data.access);
      localStorage.setItem('refresh_token', data.refresh);
      queryClient.setQueryData(['me'], data.user);
    },
  });

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    queryClient.setQueryData(['me'], null);
    window.location.href = '/login';
  };

  return {
    user,
    isLoading,
    isError,
    login: loginMutation.mutateAsync,
    isLoggingIn: loginMutation.isPending,
    register: registerMutation.mutateAsync,
    isRegistering: registerMutation.isPending,
    logout,
  };
};
