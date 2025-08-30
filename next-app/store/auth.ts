import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { login as apiLogin } from '@/lib/services/auth';
import { isAxiosError } from 'axios';

export type AuthUser = {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  image?: string;
};

type AuthState = {
  user: AuthUser | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      loading: false,
      error: null,
      async login(username: string, password: string) {
        try {
          set({ loading: true, error: null });
          const res = await apiLogin({ username, password });
          const user = {
            id: res.id,
            username: res.username,
            email: res.email,
            firstName: res.firstName,
            lastName: res.lastName,
            image: res.image,
          } satisfies AuthUser;
          set({ user, token: res.token, loading: false });
          if (typeof window !== 'undefined') {
            localStorage.setItem('auth_token', res.token);
          }
        } catch (e: unknown) {
            if (isAxiosError(e)) {
              console.error('Login error response:', e.response?.data);
            }
            const message = isAxiosError(e)
              ? e.response?.data?.message || 'Invalid username or password.'
              : 'Login failed. Check credentials.';
            set({ error: message, loading: false });
            throw e;
          }
      },
      logout() {
        set({ user: null, token: null });
        if (typeof window !== 'undefined') {
          localStorage.removeItem('auth_token');
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user, token: state.token }),
    },
  ),
);


