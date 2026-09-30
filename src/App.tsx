import React, { useState, useEffect } from 'react';
import { User } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { ApiExplorerModal } from './components/ApiExplorerModal';
import { AuthModal } from './pages/AuthModal';
import { MobileBottomNav } from './components/MobileBottomNav';

import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrdersPage } from './pages/OrdersPage';
import { ProfilePage } from './pages/ProfilePage';
import { AddressesPage } from './pages/AddressesPage';
import { WishlistPage } from './pages/WishlistPage';
import { BlogPage } from './pages/BlogPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { FaqPage } from './pages/FaqPage';

import {
  mockCategories,
  mockProducts,
  mockBlogPosts,
  mockDefaultAddresses,
  mockSampleOrders,
} from './data/mockData';
import { Product, CartItem, Address, Order, User as UserType } from './types';

export default function App() {
  // Navigation State
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [selectedProductSlug, setSelectedProductSlug] = useState<string>('gol-gavzaban-sonboltieb');
  const [selectedBlogSlug, setSelectedBlogSlug] = useState<string>('temperament-herbal-tea-guide');
  const [shopCategoryFilter, setShopCategoryFilter] = useState<string>('');
  const [shopSearchQuery, setShopSearchQuery] = useState<string>('');

  // Cart State (persisted)
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('khoshnoosh_cart');
      return saved ? JSON.parse(saved) : [
        {
          id: 1,
          product: mockProducts[0],
          quantity: 1,
          unit_price: mockProducts[0].discount_price || mockProducts[0].price,
          subtotal: mockProducts[0].discount_price || mockProducts[0].price,
        }
      ];
    } catch {
      return [];
    }
  });

  // Wishlist State (persisted)
  const [wishlistIds, setWishlistIds] = useState<number[]>(() => {
    try {
      const saved = localStorage.getItem('khoshnoosh_wishlist');
      return saved ? JSON.parse(saved) : [1, 3];
    } catch {
      return [1, 3];
    }
  });

  // User & Auth State
  const [currentUser, setCurrentUser] = useState<UserType | null>(() => {
    try {
      const saved = localStorage.getItem('khoshnoosh_user');
      return saved ? JSON.parse(saved) : {
        id: 2,
        email: 'sara@example.com',
        full_name: 'سارا احمدی',
        phone_number: '۰۹۳۵۱۲۳۴۵۶۷',
      };
    } catch {
      return null;
    }
  });

  // Orders State
  const [orders, setOrders] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem('khoshnoosh_orders');
      return saved ? JSON.parse(saved) : mockSampleOrders;
    } catch {
      return mockSampleOrders;
    }
  });

  // Addresses State
  const [addresses, setAddresses] = useState<Address[]>(() => {
    try {
      const saved = localStorage.getItem('khoshnoosh_addresses');
      return saved ? JSON.parse(saved) : mockDefaultAddresses;
    } catch {
      return mockDefaultAddresses;
    }
  });

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isApiInspectorOpen, setIsApiInspectorOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('khoshnoosh_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem('khoshnoosh_wishlist', JSON.stringify(wishlistIds));
  }, [wishlistIds]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('khoshnoosh_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('khoshnoosh_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('khoshnoosh_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('khoshnoosh_addresses', JSON.stringify(addresses));
  }, [addresses]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Cart operations
  const handleAddToCart = (product: Product, quantity = 1, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    const unitPrice = product.discount_price || product.price;

    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? {
                ...item,
                quantity: item.quantity + quantity,
                subtotal: (item.quantity + quantity) * unitPrice,
              }
            : item
        );
      } else {
        return [
          ...prev,
          {
            id: Date.now(),
            product,
            quantity,
            unit_price: unitPrice,
            subtotal: unitPrice * quantity,
          },
        ];
      }
    });

    showToast(`«${product.name}» به سبد خرید اضافه شد.`);
    setIsCartOpen(true);
  };

  const handleQuickAddToCart = (product: Product, e: React.MouseEvent) => {
    handleAddToCart(product, 1, e);
  };

  const handleUpdateCartQuantity = (id: number, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0
              ? { ...item, quantity: newQty, subtotal: newQty * item.unit_price }
              : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Wishlist toggle
  const handleToggleWishlist = (product: Product, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (wishlistIds.includes(product.id)) {
      setWishlistIds((prev) => prev.filter((id) => id !== product.id));
      showToast(`«${product.name}» از لیست علاقه‌مندی‌ها حذف شد.`);
    } else {
      setWishlistIds((prev) => [...prev, product.id]);
      showToast(`«${product.name}» به لیست علاقه‌مندی‌ها اضافه شد.`);
    }
  };

  // Navigation router
  const handleNavigate = (tab: string, slug?: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (tab === 'product-detail' && slug) {
      setSelectedProductSlug(slug);
    } else if (tab === 'blog-post' && slug) {
      setSelectedBlogSlug(slug);
    }
    setCurrentTab(tab);
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProductSlug(product.slug);
    setCurrentTab('product-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCategory = (catSlug: string) => {
    setShopCategoryFilter(catSlug);
    setCurrentTab('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = (q: string) => {
    setShopSearchQuery(q);
    setCurrentTab('shop');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('khoshnoosh_user');
    setCurrentTab('home');
    setIsAuthModalOpen(false);
    setIsCartOpen(false);
    setIsApiInspectorOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    showToast('با موفقیت از حساب کاربری خارج شدید.');
  };

  const handleOrderCompleted = (newOrder: Order) => {
    setOrders([newOrder, ...orders]);
    setCartItems([]);
    showToast(`سفارش شماره ${newOrder.order_number} با موفقیت ثبت شد.`);
  };

  const currentProduct =
    mockProducts.find((p) => p.slug === selectedProductSlug) || mockProducts[0];

  const currentBlogPost =
    mockBlogPosts.find((b) => b.slug === selectedBlogSlug) || mockBlogPosts[0];

  const relatedProducts = mockProducts.filter(
    (p) => p.id !== currentProduct.id && p.category.id === currentProduct.category.id
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#FBFBFA] text-[#1E2721] font-sans antialiased selection:bg-[#A9B388]/30 selection:text-[#2A3E2D]">
      
      {/* Top Banner (Optional slim, trust announcement - WCAG AA compliant) */}
      <div className="bg-[#4F6F52] text-[#FEFAE0] text-center text-xs py-2 px-4 font-medium flex items-center justify-center gap-2">
        <span>ارسال رایگان سراسری برای خرید بالای ۳۰۰ هزار تومان</span>
        <span aria-hidden="true">·</span>
        <button
          onClick={() => handleNavigate('shop')}
          className="underline font-bold hover:text-white cursor-pointer"
        >
          خرید دمنوش‌های تازه بهاره
        </button>
      </div>

      {/* Navigation Top Bar */}
      <Navbar
        currentTab={currentTab}
        onNavigate={handleNavigate}
        cartCount={cartItems.reduce((sum, i) => sum + i.quantity, 0)}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenApiInspector={() => setIsApiInspectorOpen(true)}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        isLoggedIn={!!currentUser}
        userName={currentUser?.full_name}
        userEmail={currentUser?.email}
        onLogout={handleLogout}
        onSearch={handleSearch}
      />

      {/* Main Page Content */}
      <main className="flex-1 pb-16 md:pb-0">
        {currentTab === 'home' && (
          <HomePage
            categories={mockCategories}
            featuredProducts={mockProducts}
            blogPosts={mockBlogPosts}
            onSelectProduct={handleSelectProduct}
            onAddToCart={handleQuickAddToCart}
            onSelectCategory={handleSelectCategory}
            onNavigate={handleNavigate}
            wishlist={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
          />
        )}

        {currentTab === 'shop' && (
          <ShopPage
            products={mockProducts}
            categories={mockCategories}
            initialCategory={shopCategoryFilter}
            initialSearch={shopSearchQuery}
            onSelectProduct={handleSelectProduct}
            onAddToCart={handleQuickAddToCart}
            wishlist={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
          />
        )}

        {currentTab === 'product-detail' && (
          <ProductDetailPage
            product={currentProduct}
            onAddToCart={(p, q) => handleAddToCart(p, q)}
            onBack={() => handleNavigate('shop')}
            isWishlisted={wishlistIds.includes(currentProduct.id)}
            onToggleWishlist={handleToggleWishlist}
            relatedProducts={relatedProducts}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {currentTab === 'checkout' && (
          <CheckoutPage
            cartItems={cartItems}
            addresses={addresses}
            onOrderCompleted={handleOrderCompleted}
            onBackToCart={() => setIsCartOpen(true)}
            onNavigateToShop={() => handleNavigate('shop')}
          />
        )}

        {currentTab === 'orders' && (
          currentUser ? (
            <OrdersPage
              orders={orders}
              onNavigateToShop={() => handleNavigate('shop')}
            />
          ) : (
            <div className="max-w-md mx-auto px-4 py-16 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-stone-400">
                <User className="w-8 h-8 text-[#4F6F52]" />
              </div>
              <h2 className="text-lg font-bold text-stone-900">شما وارد حساب کاربری نشده‌اید</h2>
              <p className="text-xs text-stone-500">
                برای مشاهده تاریخچه و پیگیری سفارش‌های خود، لطفاً وارد حساب شوید.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAuthModalOpen(true)}
                  className="w-full sm:w-auto px-5 py-2.5 bg-[#4F6F52] hover:bg-[#3D5640] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                >
                  ورود / ثبت‌نام
                </button>
                <button
                  type="button"
                  onClick={() => handleNavigate('home')}
                  className="w-full sm:w-auto px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  بازگشت به خانه
                </button>
              </div>
            </div>
          )
        )}

        {currentTab === 'profile' && (
          currentUser ? (
            <ProfilePage
              user={currentUser}
              onUpdateProfile={(updated) => {
                setCurrentUser({ ...currentUser, ...updated });
                showToast('پروفایل بروزرسانی شد.');
              }}
              onLogout={handleLogout}
              onNavigate={handleNavigate}
            />
          ) : (
            <div className="max-w-md mx-auto px-4 py-16 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-stone-400">
                <User className="w-8 h-8 text-[#4F6F52]" />
              </div>
              <h2 className="text-lg font-bold text-stone-900">شما وارد حساب کاربری نشده‌اید</h2>
              <p className="text-xs text-stone-500">
                برای مشاهده و ویرایش اطلاعات حساب کاربری یا پیگیری سفارش‌ها، لطفاً وارد شوید.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAuthModalOpen(true)}
                  className="w-full sm:w-auto px-5 py-2.5 bg-[#4F6F52] hover:bg-[#3D5640] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                >
                  ورود / ثبت‌نام
                </button>
                <button
                  type="button"
                  onClick={() => handleNavigate('home')}
                  className="w-full sm:w-auto px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  بازگشت به خانه
                </button>
              </div>
            </div>
          )
        )}

        {currentTab === 'addresses' && (
          currentUser ? (
            <AddressesPage
              addresses={addresses}
              onAddAddress={(addr) => {
                setAddresses([...addresses, addr]);
                showToast('آدرس جدید ثبت شد.');
              }}
              onDeleteAddress={(id) => {
                setAddresses(addresses.filter((a) => a.id !== id));
                showToast('آدرس حذف گردید.');
              }}
              onSetDefault={(id) => {
                setAddresses(
                  addresses.map((a) => ({ ...a, is_default: a.id === id }))
                );
                showToast('آدرس پیش‌فرض تغییر یافت.');
              }}
            />
          ) : (
            <div className="max-w-md mx-auto px-4 py-16 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mx-auto text-stone-400">
                <User className="w-8 h-8 text-[#4F6F52]" />
              </div>
              <h2 className="text-lg font-bold text-stone-900">شما وارد حساب کاربری نشده‌اید</h2>
              <p className="text-xs text-stone-500">
                برای مدیریت آدرس‌های ارسال دمنوش، لطفاً وارد حساب کاربری شوید.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAuthModalOpen(true)}
                  className="w-full sm:w-auto px-5 py-2.5 bg-[#4F6F52] hover:bg-[#3D5640] text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
                >
                  ورود / ثبت‌نام
                </button>
                <button
                  type="button"
                  onClick={() => handleNavigate('home')}
                  className="w-full sm:w-auto px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                >
                  بازگشت به خانه
                </button>
              </div>
            </div>
          )
        )}

        {currentTab === 'wishlist' && (
          <WishlistPage
            wishlistIds={wishlistIds}
            allProducts={mockProducts}
            onSelectProduct={handleSelectProduct}
            onAddToCart={handleQuickAddToCart}
            onToggleWishlist={handleToggleWishlist}
            onNavigateToShop={() => handleNavigate('shop')}
          />
        )}

        {currentTab === 'blog' && (
          <BlogPage
            posts={mockBlogPosts}
            onSelectPost={(slug) => handleNavigate('blog-post', slug)}
          />
        )}

        {currentTab === 'blog-post' && (
          <BlogPostPage
            post={currentBlogPost}
            onBack={() => handleNavigate('blog')}
            recommendedProducts={mockProducts.slice(0, 2)}
            onSelectProduct={handleSelectProduct}
          />
        )}

        {currentTab === 'about' && <AboutPage />}
        {currentTab === 'contact' && <ContactPage />}
        {currentTab === 'faq' && <FaqPage />}
      </main>

      {/* Global Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Mobile Bottom Navigation Bar (app-like experience) */}
      <MobileBottomNav
        currentTab={currentTab}
        onNavigate={handleNavigate}
        cartCount={cartItems.reduce((sum, i) => sum + i.quantity, 0)}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        isLoggedIn={!!currentUser}
        onOpenAuth={() => setIsAuthModalOpen(true)}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={() => handleNavigate('checkout')}
        onViewShop={() => handleNavigate('shop')}
      />

      {/* Django Architecture & Swagger API Inspector Modal */}
      <ApiExplorerModal
        isOpen={isApiInspectorOpen}
        onClose={() => setIsApiInspectorOpen(false)}
      />

      {/* Authentication Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={(user) => {
          setCurrentUser(user);
          showToast(`خوش آمدید، ${user.full_name}!`);
        }}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#2A3E2D] text-[#FEFAE0] px-4 py-3 rounded-xl shadow-xl text-xs font-semibold flex items-center gap-2 animate-bounce border border-[#4F6F52]">
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
