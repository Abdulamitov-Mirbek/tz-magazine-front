import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../api/client';
import type { Order, PaginatedResponse } from '../types';

export const useOrders = () => {
  const queryClient = useQueryClient();

  const ordersQuery = useQuery<PaginatedResponse<Order>>({
    queryKey: ['orders'],
    queryFn: async () => {
      const response = await apiClient.get('/api/orders/');
      return response.data;
    },
  });

  const updateStatus = useMutation({
    mutationFn: async ({ id, status }: { id: number; status: string }) => {
      const response = await apiClient.put(`/api/orders/${id}/status/`, { status });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });

  return {
    ...ordersQuery,
    updateStatus: updateStatus.mutateAsync,
  };
};
