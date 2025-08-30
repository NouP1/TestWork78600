import apiClient from '../apiClient';
import type { ProductsResponse } from '@/src/types/api';

export async function fetchProducts(limit = 12): Promise<ProductsResponse> {
  const { data } = await apiClient.get<ProductsResponse>(`/products?limit=${limit}`);
  return data;
}


