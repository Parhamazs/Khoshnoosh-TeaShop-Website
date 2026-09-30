import { defineStore } from 'pinia';
import apiClient from '../api/client';

export interface User {
  id: number;
  email: string;
  full_name: string;
  phone_number?: string;
  avatar?: string;
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    accessToken: localStorage.getItem('khoshnoosh_access_token') || null,
    refreshToken: localStorage.getItem('khoshnoosh_refresh_token') || null,
    isLoading: false,
  }),
  getters: {
    isAuthenticated: (state) => !!state.accessToken,
  },
  actions: {
    async login(credentials: { email: string; password: string }) {
      this.isLoading = true;
      try {
        const response = await apiClient.post('/auth/login/', credentials);
        this.accessToken = response.data.access;
        this.refreshToken = response.data.refresh;
        this.user = response.data.user;
        localStorage.setItem('khoshnoosh_access_token', this.accessToken as string);
        localStorage.setItem('khoshnoosh_refresh_token', this.refreshToken as string);
        return response.data;
      } finally {
        this.isLoading = false;
      }
    },
    async register(data: { email: string; password: string; password_confirm: string; full_name?: string }) {
      this.isLoading = true;
      try {
        return await apiClient.post('/auth/register/', data);
      } finally {
        this.isLoading = false;
      }
    },
    async fetchProfile() {
      if (!this.accessToken) return;
      try {
        const res = await apiClient.get('/auth/profile/');
        this.user = res.data;
      } catch {
        this.logout();
      }
    },
    logout() {
      this.user = null;
      this.accessToken = null;
      this.refreshToken = null;
      localStorage.removeItem('khoshnoosh_access_token');
      localStorage.removeItem('khoshnoosh_refresh_token');
    },
  },
});
