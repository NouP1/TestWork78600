import apiClient from '../apiClient';
import type { LoginRequest } from '@/src/types/api';

type DummyLoginResponse = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token: string;
};

export async function login(request: LoginRequest, expiresInMins = 30): Promise<DummyLoginResponse> {
  const body = JSON.stringify({ ...request, expiresInMins });
  const { data } = await apiClient.post<DummyLoginResponse>('/user/login', body);
  return data;
}
