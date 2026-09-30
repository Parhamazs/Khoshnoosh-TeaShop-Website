import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import ShopView from '../views/ShopView.vue';
import ProductDetailView from '../views/ProductDetailView.vue';
import CartView from '../views/CartView.vue';
import CheckoutView from '../views/CheckoutView.vue';
import ProfileView from '../views/ProfileView.vue';
import OrdersView from '../views/OrdersView.vue';
import AddressesView from '../views/AddressesView.vue';
import WishlistView from '../views/WishlistView.vue';
import BlogListView from '../views/BlogListView.vue';
import BlogDetailView from '../views/BlogDetailView.vue';
import AboutView from '../views/AboutView.vue';
import ContactView from '../views/ContactView.vue';
import FaqView from '../views/FaqView.vue';
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';

const router = createRouter({
  history: createWebHistory(),
  scrollBehavior() {
    return { top: 0 };
  },
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/shop', name: 'shop', component: ShopView },
    { path: '/products/:slug', name: 'product-detail', component: ProductDetailView },
    { path: '/cart', name: 'cart', component: CartView },
    { path: '/checkout', name: 'checkout', component: CheckoutView },
    { path: '/blog', name: 'blog', component: BlogListView },
    { path: '/blog/:slug', name: 'blog-detail', component: BlogDetailView },
    { path: '/about', name: 'about', component: AboutView },
    { path: '/contact', name: 'contact', component: ContactView },
    { path: '/faq', name: 'faq', component: FaqView },
    { path: '/login', name: 'login', component: LoginView },
    { path: '/register', name: 'register', component: RegisterView },
    { path: '/profile', name: 'profile', component: ProfileView, meta: { requiresAuth: true } },
    { path: '/orders', name: 'orders', component: OrdersView, meta: { requiresAuth: true } },
    { path: '/addresses', name: 'addresses', component: AddressesView, meta: { requiresAuth: true } },
    { path: '/wishlist', name: 'wishlist', component: WishlistView },
  ],
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('khoshnoosh_access_token');
  if (to.meta.requiresAuth && !token) {
    next({ name: 'login', query: { redirect: to.fullPath } });
  } else {
    next();
  }
});

export default router;
