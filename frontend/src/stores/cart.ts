import { defineStore } from 'pinia';
import apiClient from '../api/client';

export interface CartItem {
  id: number;
  product: any;
  quantity: number;
  unit_price: number;
  subtotal: number;
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItem[],
    totalItems: 0,
    totalPrice: 0,
    isDrawerOpen: false,
    isLoading: false,
  }),
  actions: {
    async fetchCart() {
      this.isLoading = true;
      try {
        const res = await apiClient.get('/cart/');
        this.items = res.data.items || [];
        this.totalItems = res.data.total_items || 0;
        this.totalPrice = res.data.total_price || 0;
      } catch (err) {
        console.error('Failed to load cart', err);
      } finally {
        this.isLoading = false;
      }
    },
    async addToCart(productId: number, quantity = 1) {
      try {
        const res = await apiClient.post('/cart/items/', { product_id: productId, quantity });
        this.items = res.data.items || [];
        this.totalItems = res.data.total_items || 0;
        this.totalPrice = res.data.total_price || 0;
        this.isDrawerOpen = true;
      } catch (err) {
        console.error('Failed to add to cart', err);
      }
    },
    async updateQuantity(itemId: number, quantity: number) {
      try {
        const res = await apiClient.patch(`/cart/items/${itemId}/`, { quantity });
        this.items = res.data.items || [];
        this.totalItems = res.data.total_items || 0;
        this.totalPrice = res.data.total_price || 0;
      } catch (err) {
        console.error('Failed to update quantity', err);
      }
    },
    async removeItem(itemId: number) {
      try {
        const res = await apiClient.delete(`/cart/items/${itemId}/`);
        this.items = res.data.items || [];
        this.totalItems = res.data.total_items || 0;
        this.totalPrice = res.data.total_price || 0;
      } catch (err) {
        console.error('Failed to remove item', err);
      }
    },
    toggleDrawer(open?: boolean) {
      this.isDrawerOpen = open !== undefined ? open : !this.isDrawerOpen;
    },
  },
});
