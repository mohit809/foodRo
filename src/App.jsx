import React, { useState, useEffect, useMemo, useRef } from 'react';
import Navbar from './components/Navbar';
import PromoCarousel from './components/PromoCarousel';
import CategoryFilter from './components/CategoryFilter';
import FoodCard from './components/FoodCard';
import CustomizeModal from './components/CustomizeModal';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import OrderTrackingModal from './components/OrderTrackingModal';
import OrderHistoryModal from './components/OrderHistoryModal';
import FavoritesModal from './components/FavoritesModal';
import AuthModal from './components/AuthModal';
import RestaurantPortalModal from './components/RestaurantPortalModal';
import MobileBottomNav from './components/MobileBottomNav';
import MobileCartBar from './components/MobileCartBar';
import { INITIAL_FOOD_ITEMS, INITIAL_RESTAURANTS, VALID_COUPONS } from './data/mockData';
import { detectUserCurrency, formatCurrency } from './utils/currency';
import { 
  UtensilsCrossed, 
  ArrowUpDown, 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Store 
} from 'lucide-react';

export default function App() {
  const searchInputRef = useRef(null);

  // Currency & Region State
  const [currency, setCurrency] = useState(() => {
    try {
      return localStorage.getItem('foodro_currency') || detectUserCurrency();
    } catch {
      return 'INR';
    }
  });

  // User Authentication State
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('foodro_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Food items catalog
  const [foodItems, setFoodItems] = useState(() => {
    try {
      const saved = localStorage.getItem('foodro_food_items');
      return saved ? JSON.parse(saved) : INITIAL_FOOD_ITEMS;
    } catch {
      return INITIAL_FOOD_ITEMS;
    }
  });

  // Restaurants catalog
  const [restaurants, setRestaurants] = useState(() => {
    try {
      const saved = localStorage.getItem('foodro_restaurants');
      return saved ? JSON.parse(saved) : INITIAL_RESTAURANTS;
    } catch {
      return INITIAL_RESTAURANTS;
    }
  });

  // Cart, Favorites, Orders
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('foodro_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('foodro_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem('foodro_orders');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [activeOrderId, setActiveOrderId] = useState(() => {
    try {
      return localStorage.getItem('foodro_active_order_id') || null;
    } catch {
      return null;
    }
  });

  // UI state
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isVegOnly, setIsVegOnly] = useState(false);
  const [sortBy, setSortBy] = useState('popular');
  const [filterBestsellerOnly, setFilterBestsellerOnly] = useState(false);

  // Modals & Drawers
  const [customizingFood, setCustomizingFood] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isTrackingOpen, setIsTrackingOpen] = useState(false);
  const [isOrdersOpen, setIsOrdersOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isPartnerPortalOpen, setIsPartnerPortalOpen] = useState(false);
  const [checkoutPricing, setCheckoutPricing] = useState(null);

  // Coupon state
  const [appliedCoupon, setAppliedCoupon] = useState(VALID_COUPONS.FOODRO50);

  // Toast notification
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('foodro_currency', currency);
  }, [currency]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('foodro_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('foodro_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('foodro_food_items', JSON.stringify(foodItems));
  }, [foodItems]);

  useEffect(() => {
    localStorage.setItem('foodro_restaurants', JSON.stringify(restaurants));
  }, [restaurants]);

  useEffect(() => {
    localStorage.setItem('foodro_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('foodro_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('foodro_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    if (activeOrderId) {
      localStorage.setItem('foodro_active_order_id', activeOrderId);
    } else {
      localStorage.removeItem('foodro_active_order_id');
    }
  }, [activeOrderId]);

  // Cart calculations
  const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);
  const cartTotal = useMemo(() => cart.reduce((sum, item) => sum + (item.price * item.quantity), 0), [cart]);

  // Active order lookup
  const activeOrder = useMemo(() => {
    return orders.find(o => o.orderId === activeOrderId) || null;
  }, [orders, activeOrderId]);

  // Add to cart handler
  const handleAddToCart = (foodItem, quantity = 1) => {
    setCart(prevCart => {
      const itemKey = foodItem.customizationKey || foodItem.id;
      const existingIdx = prevCart.findIndex(i => (i.customizationKey || i.id) === itemKey);

      if (existingIdx > -1) {
        const updated = [...prevCart];
        updated[existingIdx].quantity += quantity;
        return updated;
      } else {
        return [...prevCart, {
          ...foodItem,
          cartItemId: itemKey,
          quantity
        }];
      }
    });

    showToast(`Added "${foodItem.name}" to basket!`);
  };

  // Quick remove from cart
  const handleQuickRemoveFromCart = (food) => {
    setCart(prevCart => {
      const existingIdx = prevCart.findIndex(i => i.id === food.id);
      if (existingIdx === -1) return prevCart;
      
      const updated = [...prevCart];
      if (updated[existingIdx].quantity > 1) {
        updated[existingIdx].quantity -= 1;
        return updated;
      } else {
        return updated.filter((_, idx) => idx !== existingIdx);
      }
    });
  };

  const handleUpdateCartQuantity = (cartItem, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveCartItem(cartItem);
      return;
    }
    setCart(prev => prev.map(item => 
      (item.cartItemId || item.id) === (cartItem.cartItemId || cartItem.id)
        ? { ...item, quantity: newQuantity }
        : item
    ));
  };

  const handleRemoveCartItem = (cartItem) => {
    setCart(prev => prev.filter(item => 
      (item.cartItemId || item.id) !== (cartItem.cartItemId || cartItem.id)
    ));
  };

  const handleClearCart = () => {
    setCart([]);
    showToast('Cart cleared');
  };

  const handleToggleFavorite = (food) => {
    const exists = favorites.some(f => f.id === food.id);
    if (exists) {
      setFavorites(favorites.filter(f => f.id !== food.id));
      showToast(`Removed from favorites`);
    } else {
      setFavorites([...favorites, food]);
      showToast(`Saved to favorites! ❤️`);
    }
  };

  const handleOrderPlaced = (newOrder) => {
    setOrders([newOrder, ...orders]);
    setActiveOrderId(newOrder.orderId);
    setCart([]);
    setIsTrackingOpen(true);
    showToast(`Order #${newOrder.orderId} placed successfully! 🚀`);
  };

  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(o => o.orderId === orderId ? { ...o, status: newStatus } : o));
    showToast(`Order #${orderId} status: ${newStatus.replace('_', ' ').toUpperCase()}`);
  };

  const handleReorder = (items) => {
    setCart(items);
    setIsCartOpen(true);
    showToast('Items added to cart from past order!');
  };

  const handleAddFoodItem = (newFood) => {
    setFoodItems([newFood, ...foodItems]);
    showToast(`"${newFood.name}" listed in the foodRo catalog!`);
  };

  const handleDeleteFoodItem = (foodId) => {
    setFoodItems(foodItems.filter(f => f.id !== foodId));
    showToast('Food item removed from menu.');
  };

  const handleAddRestaurant = (newRest) => {
    setRestaurants([newRest, ...restaurants]);
    showToast(`"${newRest.name}" registered successfully!`);
  };

  const handleLoginSuccess = (userProfile) => {
    setUser(userProfile);
    showToast(`Welcome back, ${userProfile.name}! 2FA Verified.`);
  };

  const handleLogout = () => {
    setUser(null);
    showToast('Logged out securely.');
  };

  const handleFocusSearch = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      const el = document.querySelector('input[type="text"]');
      if (el) el.focus();
    }, 200);
  };

  // Filtered & Sorted Food Items
  const filteredFoods = useMemo(() => {
    return foodItems.filter(item => {
      if (selectedCategory !== 'all' && item.category !== selectedCategory) {
        return false;
      }
      if (isVegOnly && !item.isVeg) {
        return false;
      }
      if (filterBestsellerOnly && !item.isBestseller) {
        return false;
      }
      if (searchTerm.trim()) {
        const query = searchTerm.toLowerCase();
        const matchName = item.name.toLowerCase().includes(query);
        const matchDesc = item.description.toLowerCase().includes(query);
        const matchRest = item.restaurant?.name?.toLowerCase().includes(query);
        const matchCategory = item.category.toLowerCase().includes(query);
        if (!matchName && !matchDesc && !matchRest && !matchCategory) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'price_low') return a.price - b.price;
      if (sortBy === 'price_high') return b.price - a.price;
      return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0);
    });
  }, [foodItems, selectedCategory, isVegOnly, filterBestsellerOnly, searchTerm, sortBy]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 selection:bg-orange-500 selection:text-white">
      
      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-60 bg-slate-900/95 backdrop-blur-md text-white px-4 sm:px-5 py-3 rounded-2xl shadow-2xl border border-slate-800 flex items-center gap-2.5 sm:gap-3 animate-in fade-in slide-in-from-bottom-4 duration-200 max-w-[90vw] sm:max-w-md">
          <Sparkles className="w-4 h-4 text-orange-400 shrink-0" />
          <span className="text-xs font-bold truncate">{toastMessage}</span>
        </div>
      )}

      {/* Main Top Navbar */}
      <Navbar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        isVegOnly={isVegOnly}
        setIsVegOnly={setIsVegOnly}
        cartCount={cartCount}
        cartTotal={cartTotal}
        onOpenCart={() => setIsCartOpen(true)}
        favoritesCount={favorites.length}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
        ordersCount={orders.length}
        onOpenOrders={() => setIsOrdersOpen(true)}
        activeOrder={activeOrder}
        onOpenTracking={() => setIsTrackingOpen(true)}
        onOpenPartnerPortal={() => setIsPartnerPortalOpen(true)}
        user={user}
        onOpenLogin={() => setIsAuthOpen(true)}
        onLogout={handleLogout}
        currency={currency}
        onSelectCurrency={(newCur) => {
          setCurrency(newCur);
          showToast(`Switched currency to ${newCur}`);
        }}
      />

      {/* Main Container - with extra bottom padding on mobile for floating bar + bottom nav */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-3.5 sm:px-6 lg:px-8 pb-32 md:pb-16">
        
        {/* Promotional Banner Carousel */}
        <PromoCarousel onApplyPromo={(code) => {
          const c = VALID_COUPONS[code];
          if (c) {
            setAppliedCoupon(c);
            showToast(`Promo code ${code} applied!`);
          }
        }} />

        {/* Cuisine & Category Filter */}
        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* Filter and Sorting Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 py-3 sm:py-4 my-2 border-y border-slate-200/80">
          <div className="flex items-center gap-2">
            <h2 className="text-base sm:text-xl font-extrabold text-slate-900 tracking-tight">
              {selectedCategory === 'all' 
                ? 'Featured Dishes & Menus' 
                : selectedCategory === 'momos'
                ? '🥟 Himalayan Momos & Dimsums'
                : selectedCategory === 'pizza'
                ? '🍕 Artisan Pizza'
                : selectedCategory === 'burger'
                ? '🍔 Gourmet Burgers'
                : `${selectedCategory.toUpperCase()} Selection`}
            </h2>
            <span className="text-xs font-bold text-slate-400 bg-slate-200/70 px-2 py-0.5 rounded-full">
              {filteredFoods.length}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setIsPartnerPortalOpen(true)}
              className="px-2.5 sm:px-3 py-1.5 rounded-xl text-[11px] sm:text-xs font-bold bg-orange-50 hover:bg-orange-100 text-orange-700 border border-orange-200 transition cursor-pointer flex items-center gap-1"
            >
              <Store className="w-3.5 h-3.5 text-orange-600" />
              <span>+ List Food</span>
            </button>

            <button
              onClick={() => setFilterBestsellerOnly(!filterBestsellerOnly)}
              className={`px-2.5 sm:px-3 py-1.5 rounded-xl text-[11px] sm:text-xs font-bold border transition cursor-pointer ${
                filterBestsellerOnly
                  ? 'bg-orange-500 border-orange-500 text-white shadow-xs'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              ★ Bestsellers
            </button>

            <div className="flex items-center gap-1.5 bg-white border border-slate-200 px-2.5 sm:px-3 py-1.5 rounded-xl text-[11px] sm:text-xs font-semibold text-slate-700 shadow-xs">
              <ArrowUpDown className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-slate-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent outline-none cursor-pointer text-slate-800 font-bold"
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Top Rated (4.8+)</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Food Items Grid - 1 col on small phones, 2 col on tablet, 3 on desktop, 4 on wide */}
        {filteredFoods.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 pt-2">
            {filteredFoods.map((food) => {
              const inCartItem = cart.find(i => i.id === food.id);
              const inCartQty = inCartItem ? inCartItem.quantity : 0;
              const isFav = favorites.some(f => f.id === food.id);

              return (
                <FoodCard
                  key={food.id}
                  food={food}
                  quantityInCart={inCartQty}
                  onAddToCart={() => handleAddToCart(food, 1)}
                  onRemoveFromCart={() => handleQuickRemoveFromCart(food)}
                  onOpenCustomize={(f) => setCustomizingFood(f)}
                  isFavorite={isFav}
                  onToggleFavorite={handleToggleFavorite}
                  currency={currency}
                />
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 sm:py-16 bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 my-4">
            <div className="text-4xl sm:text-5xl mb-3">🔍</div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1">No dishes match your filters</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mb-4">
              Try adjusting your search query, switching category, or toggling off the Veg-only filter.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setIsVegOnly(false);
                setFilterBestsellerOnly(false);
              }}
              className="px-4 py-2 sm:px-5 sm:py-2.5 rounded-2xl bg-orange-500 text-white font-bold text-xs shadow-md hover:bg-orange-600 transition cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

      </main>

      {/* Mobile Floating Sticky Cart Bar */}
      <MobileCartBar
        cart={cart}
        cartCount={cartCount}
        cartTotal={cartTotal}
        currency={currency}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Mobile Native App Bottom Navigation Bar */}
      <MobileBottomNav
        ordersCount={orders.length}
        activeOrder={activeOrder}
        favoritesCount={favorites.length}
        user={user}
        onOpenLogin={() => (user ? setIsOrdersOpen(true) : setIsAuthOpen(true))}
        onOpenOrders={() => setIsOrdersOpen(true)}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
        onFocusSearch={handleFocusSearch}
      />

      {/* Desktop / Global Footer */}
      <footer className="bg-slate-900 text-white mt-auto border-t border-slate-800 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-orange-500 flex items-center justify-center text-white font-bold shadow-md">
                  <UtensilsCrossed className="w-5 h-5" />
                </div>
                <span className="text-xl font-extrabold tracking-tight">food<span className="text-orange-500">Ro</span></span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Superfast, chef-crafted gourmet food delivery from premier local kitchens, hotels & restaurants right to your doorstep.
              </p>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">Popular Cuisines</h4>
              <ul className="space-y-2 text-xs text-slate-400 font-medium">
                <li>🥟 Darjeeling & Kurkure Momos</li>
                <li>🍕 Woodfired Neapolitan Pizza</li>
                <li>🍔 Truffle Wagyu Cheeseburgers</li>
                <li>🍛 Royal Dum Chicken Biryani</li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">Guarantees & Security</h4>
              <ul className="space-y-2 text-xs text-slate-400 font-medium">
                <li className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>2-Step Verification & OTP Auth</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-orange-400" />
                  <span>30-Minute Lightning Delivery</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                  <span>No-Questions-Asked Refunds</span>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">Partner With Us</h4>
              <p className="text-xs text-slate-400 mb-3">
                Own a restaurant or cloud kitchen? List your dishes and grow your revenue with foodRo.
              </p>
              <button
                onClick={() => setIsPartnerPortalOpen(true)}
                className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs flex items-center gap-2 shadow-md transition cursor-pointer"
              >
                <Store className="w-4 h-4" />
                <span>Partner Portal</span>
              </button>
            </div>
          </div>

          <div className="pt-8 mt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500 gap-4">
            <p>© 2026 foodRo Inc. Supporting multi-currency worldwide (INR ₹, USD $, EUR €, JPY ¥, GBP £).</p>
            <div className="flex items-center gap-4">
              <span>Privacy Policy</span>
              <span>Terms of Service</span>
              <span>Security Standards</span>
            </div>
          </div>
        </div>
      </footer>

      {/* MODALS & DRAWERS */}
      
      {/* 1. Item Customization Modal */}
      <CustomizeModal
        food={customizingFood}
        isOpen={Boolean(customizingFood)}
        onClose={() => setCustomizingFood(null)}
        onAddToCart={handleAddToCart}
        currency={currency}
      />

      {/* 2. Cart Slide-over Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        appliedCoupon={appliedCoupon}
        onApplyCoupon={(c) => {
          setAppliedCoupon(c);
          showToast(`Coupon ${c.code} applied!`);
        }}
        onRemoveCoupon={() => {
          setAppliedCoupon(null);
          showToast('Coupon removed');
        }}
        onProceedToCheckout={(pricing) => {
          setCheckoutPricing(pricing);
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        currency={currency}
      />

      {/* 3. Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        pricing={checkoutPricing}
        onOrderPlaced={handleOrderPlaced}
        currency={currency}
        user={user}
        onUpdateUser={(updated) => setUser(updated)}
        onOpenLogin={() => {
          setIsCheckoutOpen(false);
          setIsAuthOpen(true);
        }}
      />

      {/* 4. Live Order Tracking Modal */}
      {activeOrder && (
        <OrderTrackingModal
          order={activeOrder}
          isOpen={isTrackingOpen}
          onClose={() => setIsTrackingOpen(false)}
          onUpdateOrderStatus={handleUpdateOrderStatus}
          currency={currency}
        />
      )}

      {/* 5. Past Order History Modal */}
      <OrderHistoryModal
        isOpen={isOrdersOpen}
        onClose={() => setIsOrdersOpen(false)}
        orders={orders}
        onReorder={handleReorder}
        onTrackOrder={(o) => {
          setActiveOrderId(o.orderId);
          setIsTrackingOpen(true);
        }}
        currency={currency}
      />

      {/* 6. Favorites Wishlist Modal */}
      <FavoritesModal
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        favorites={favorites}
        onAddToCart={(item) => handleAddToCart(item, 1)}
        onRemoveFavorite={handleToggleFavorite}
        currency={currency}
      />

      {/* 7. Dedicated High-Security Login & 2-Step Verification Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* 8. Restaurant & Hotel Partner Portal Modal */}
      <RestaurantPortalModal
        isOpen={isPartnerPortalOpen}
        onClose={() => setIsPartnerPortalOpen(false)}
        restaurants={restaurants}
        onAddRestaurant={handleAddRestaurant}
        onAddFoodItem={handleAddFoodItem}
        onDeleteFoodItem={handleDeleteFoodItem}
        foodItems={foodItems}
        currency={currency}
      />

    </div>
  );
}
