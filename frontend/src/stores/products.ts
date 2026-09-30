import { defineStore } from 'pinia';
import apiClient from '../api/client';

export const useProductStore = defineStore('products', {
  state: () => ({
    products: [] as any[],
    categories: [] as any[],
    tags: [] as any[],
    currentProduct: null as any,
    selectedCategory: '',
    searchQuery: '',
    temperament: '',
    caffeineFree: null as boolean | null,
    ordering: '-created_at',
    isLoading: false,
    totalCount: 0,
  }),
  actions: {
    async fetchCategories() {
      try {
        const res = await apiClient.get('/products/categories/');
        this.categories = res.data;
      } catch (err) {
        console.error('Failed to load categories', err);
      }
    },
    async fetchTags() {
      try {
        const res = await apiClient.get('/products/tags/');
        this.tags = res.data;
      } catch (err) {
        console.error('Failed to load tags', err);
      }
    },
    async fetchProducts(params = {}) {
      this.isLoading = true;
      try {
        const res = await apiClient.get('/products/', {
          params: {
            category: this.selectedCategory || undefined,
            search: this.searchQuery || undefined,
            temperament: this.temperament || undefined,
            caffeine_free: this.caffeineFree !== null ? this.caffeineFree : undefined,
            ordering: this.ordering,
            ...params,
          },
        });
        if (res.data.results) {
          this.products = res.data.results;
          this.totalCount = res.data.count;
        } else {
          this.products = res.data;
          this.totalCount = res.data.length;
        }
      } catch (err) {
        console.error('Failed to load products', err);
      } finally {
        this.isLoading = false;
      }
    },
    async fetchProductBySlug(slug: string) {
      this.isLoading = true;
      try {
        const res = await apiClient.get(`/products/${slug}/`);
        this.currentProduct = res.data;
        return res.data;
      } finally {
        this.isLoading = false;
      }
    },
  },
});
