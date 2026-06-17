import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../api/client';
import type { User } from '../types';

export const useUsers = () => {
  const queryClient = useQueryClient();

  const usersQuery = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: async () => {
      const response = await apiClient.get('/api/users/');
      return response.data;
    },
  });

  const deleteUser = useMutation({
    mutationFn: async (id: number) => {
      await apiClient.delete(`/api/users/${id}/`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  return {
    ...usersQuery,
    deleteUser: deleteUser.mutateAsync,
  };
};
