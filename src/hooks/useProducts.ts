import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '../api/client';
import type { Product, PaginatedResponse } from '../types';

export const useProducts = (params?: Record<string, any>) => {
  const queryClient = useQueryClient();

  const productsQuery = useQuery<PaginatedResponse<Product>>({
    queryKey: ['products', params],
    queryFn: async () => {
      const response = await apiClient.get('/api/products/', { params });
      return response.data;
    },
  });

  const createProduct = useMutation({
    mutationFn: async (data: any) => {
      const response = await apiClient.post('/api/products/', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  const deleteProduct = useMutation({
    mutationFn: async (id: number) => {
      await apiClient.delete(`/api/products/${id}/`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  return {
    ...productsQuery,
    createProduct: createProduct.mutateAsync,
    deleteProduct: deleteProduct.mutateAsync,
  };
};
