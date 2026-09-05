import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Search, 
  MapPin, 
  Heart, 
  Clock, 
  UtensilsCrossed, 
  Sparkles,
  Store,
  User,
  ShieldCheck,
  ChevronDown,
  LogOut,
  Menu,
  X,
  SlidersHorizontal,
  Check
} from 'lucide-react';
import { CURRENCIES, formatCurrency } from '../utils/currency';

export default function Navbar({
  searchTerm,
  setSearchTerm,
  isVegOnly,
  setIsVegOnly,
  cartCount,
  cartTotal,
  onOpenCart,
  favoritesCount,
  onOpenFavorites,
  ordersCount,
  onOpenOrders,
  activeOrder,
  onOpenTracking,
  onOpenPartnerPortal,
  user,
  onOpenLogin,
  onLogout,
  currency,
  onSelectCurrency
}) {
  const [isCurrencyDropdownOpen, setIsCurrencyDropdownOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const currentCurrencyConfig = CURRENCIES[currency] || CURRENCIES.INR;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* TOP ROW: Brand & Actions */}
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-4">
          
          {/* Left: Brand Logo & Delivery Location */}
          <div className="flex items-center gap-2.5 sm:gap-4 min-w-0">
            <a href="#" className="flex items-center gap-2 group shrink-0">
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-orange-600 via-orange-500 to-amber-400 flex items-center justify-center text-white shadow-md shadow-orange-500/30 group-hover:scale-105 transition-transform">
                <UtensilsCrossed className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 flex items-center gap-0.5">
                  food<span className="text-orange-500">Ro</span>
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-orange-500 inline-block"></span>
                </span>
                <p className="hidden sm:block text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider -mt-1">
                  Fast • Fresh • Global
                </p>
              </div>
            </a>

            {/* Location indicator (Desktop) */}
            <div className="hidden lg:flex items-center gap-2 py-1.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200/70 cursor-pointer text-xs font-medium text-slate-700 transition">
              <MapPin className="w-4 h-4 text-orange-500 shrink-0" />
              <div className="truncate max-w-[140px]">
                <span className="font-bold text-slate-900 block truncate">Downtown West</span>
                <span className="text-slate-500 text-[10px] truncate">42 Gourmet Avenue</span>
              </div>
            </div>
          </div>

          {/* Center: Desktop Search Bar (Hidden on mobile, mobile has row 2) */}
          <div className="flex-1 max-w-md hidden md:block mx-2">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search momos, artisan pizza, burgers, biryani..."
                className="w-full pl-10 pr-4 py-2.5 rounded-full bg-slate-100/90 border border-transparent focus:border-orange-500 focus:bg-white text-xs sm:text-sm text-slate-900 placeholder-slate-400 outline-none transition shadow-inner"
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-bold px-1 cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            
            {/* Currency Switcher Dropdown (Compact on Mobile, Full on Desktop) */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen);
                  setIsUserMenuOpen(false);
                }}
                className="flex items-center gap-1 py-1.5 px-2 sm:px-2.5 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-xs font-bold text-slate-700 transition cursor-pointer border border-slate-200/60"
                title="Change Country & Currency"
              >
                <span className="text-sm">{currentCurrencyConfig.flag}</span>
                <span className="font-mono font-extrabold text-[11px] sm:text-xs">{currentCurrencyConfig.symbol}</span>
                <ChevronDown className="w-3 h-3 text-slate-400 hidden sm:inline" />
              </button>

              {isCurrencyDropdownOpen && (
                <div 
                  className="absolute right-0 sm:left-0 mt-2 w-52 bg-white rounded-2xl shadow-2xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-150"
                  onClick={() => setIsCurrencyDropdownOpen(false)}
                >
                  <div className="px-3 py-1.5 text-[10px] font-extrabold text-slate-400 uppercase tracking-wider border-b border-slate-100 mb-1">
                    Select Region & Currency
                  </div>
                  {Object.values(CURRENCIES).map(c => (
                    <button
                      key={c.code}
                      onClick={() => onSelectCurrency(c.code)}
                      className={`w-full text-left px-3.5 py-2 text-xs flex items-center justify-between hover:bg-orange-50 transition cursor-pointer ${
                        c.code === currency ? 'bg-orange-50 font-bold text-orange-600' : 'text-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span>{c.flag}</span>
                        <span>{c.name}</span>
                      </div>
                      <span className="font-mono font-bold text-slate-500">
                        {c.code} ({c.symbol})
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Desktop Only: Partner Portal Button */}
            <button
              onClick={onOpenPartnerPortal}
              className="hidden md:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-xs transition cursor-pointer"
              title="Add your restaurant, hotel or food items"
            >
              <Store className="w-3.5 h-3.5 text-orange-400" />
              <span>Partner Portal</span>
            </button>

            {/* Desktop Only: Veg Filter */}
            <button
              onClick={() => setIsVegOnly(!isVegOnly)}
              className={`hidden md:flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold border transition cursor-pointer ${
                isVegOnly 
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-700 shadow-xs' 
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
              title="Filter Vegetarian dishes only"
            >
              <span className={`w-3 h-3 rounded-xs border flex items-center justify-center p-0.5 ${
                isVegOnly ? 'border-emerald-600' : 'border-slate-400'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${
                  isVegOnly ? 'bg-emerald-600' : 'bg-slate-400'
                }`}></span>
              </span>
              <span className="font-bold">Pure Veg</span>
            </button>

            {/* Active Live Order Pill (Desktop & Mobile) */}
            {activeOrder && (
              <button
                onClick={onOpenTracking}
                className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl bg-amber-500 text-white text-[11px] sm:text-xs font-bold shadow-md shadow-amber-500/25 animate-pulse-subtle hover:bg-amber-600 transition cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 animate-spin" />
                <span className="hidden sm:inline">Tracking</span>
              </button>
            )}

            {/* Desktop Only: Order History */}
            <button
              onClick={onOpenOrders}
              className="hidden md:block relative p-2.5 rounded-xl hover:bg-slate-100 text-slate-700 transition cursor-pointer"
              title="Order History"
            >
              <Clock className="w-5 h-5" />
              {ordersCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-slate-900 text-white text-[10px] font-bold flex items-center justify-center">
                  {ordersCount}
                </span>
              )}
            </button>

            {/* Desktop Only: Wishlist / Favorites */}
            <button
              onClick={onOpenFavorites}
              className="hidden md:block relative p-2.5 rounded-xl hover:bg-slate-100 text-slate-700 transition cursor-pointer"
              title="Favorites"
            >
              <Heart className={`w-5 h-5 ${favoritesCount > 0 ? 'text-rose-500 fill-rose-500' : ''}`} />
              {favoritesCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* Desktop Only: User Profile / Sign In */}
            <div className="hidden md:block">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => {
                      setIsUserMenuOpen(!isUserMenuOpen);
                      setIsCurrencyDropdownOpen(false);
                    }}
                    className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-orange-50 hover:bg-orange-100/80 border border-orange-200 transition cursor-pointer"
                  >
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-7 h-7 rounded-xl object-cover border border-orange-500/50"
                    />
                    <div className="text-left pr-1">
                      <span className="text-xs font-extrabold text-slate-900 block leading-tight truncate max-w-[90px]">
                        {user.name.split(' ')[0]}
                      </span>
                      <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5">
                        <ShieldCheck className="w-2.5 h-2.5" />
                        2FA
                      </span>
                    </div>
                  </button>

                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-slate-200 p-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                      <div className="p-3 border-b border-slate-100">
                        <p className="text-xs font-extrabold text-slate-900">{user.name}</p>
                        <p className="text-[11px] text-slate-500 truncate">{user.phone}</p>
                        <span className="inline-flex items-center gap-1 mt-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          <ShieldCheck className="w-3 h-3" />
                          2-Step Verified User
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          onLogout();
                        }}
                        className="w-full text-left px-3 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-xl flex items-center gap-2 mt-1 cursor-pointer transition"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Log Out</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={onOpenLogin}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-orange-50 hover:bg-orange-100 text-orange-600 border border-orange-200 text-xs font-extrabold transition cursor-pointer"
                  title="Sign In with 2FA"
                >
                  <ShieldCheck className="w-4 h-4 text-orange-600" />
                  <span>Sign In</span>
                </button>
              )}
            </div>

            {/* Cart Button (Always visible on all screens) */}
            <button
              onClick={onOpenCart}
              className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-2xl bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-orange-500/30 transition duration-200 cursor-pointer"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-white text-orange-600 text-[10px] font-extrabold flex items-center justify-center shadow-xs">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline">
                {cartCount > 0 ? formatCurrency(cartTotal, currency) : 'Cart'}
              </span>
            </button>

            {/* Mobile Hamburger Menu Toggle (< md) */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100 transition cursor-pointer"
              title="Open Navigation Menu"
            >
              <Menu className="w-5 h-5" />
            </button>

          </div>
        </div>

        {/* ROW 2: Mobile Search Bar & Veg Filter (< md) */}
        <div className="md:hidden pb-3 pt-1">
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search momos, pizza, burgers, biryani..."
                className="w-full pl-9 pr-7 py-2 rounded-2xl bg-slate-100/90 border border-transparent focus:border-orange-500 focus:bg-white text-xs text-slate-900 placeholder-slate-400 outline-none transition"
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-bold px-1"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Compact Veg Toggle on Mobile Search Row */}
            <button
              onClick={() => setIsVegOnly(!isVegOnly)}
              className={`p-2 rounded-2xl border transition shrink-0 cursor-pointer flex items-center justify-center ${
                isVegOnly 
                  ? 'bg-emerald-50 border-emerald-400 text-emerald-700 shadow-xs' 
                  : 'bg-white border-slate-200 text-slate-500'
              }`}
              title={isVegOnly ? "Show All (Veg + Non-Veg)" : "Filter Pure Veg"}
            >
              <span className={`w-3.5 h-3.5 rounded-xs border flex items-center justify-center p-0.5 ${
                isVegOnly ? 'border-emerald-600' : 'border-slate-400'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${
                  isVegOnly ? 'bg-emerald-600' : 'bg-slate-400'
                }`}></span>
              </span>
            </button>
          </div>
        </div>

      </div>

      {/* MOBILE SLIDE-OUT DRAWER MENU (< md) */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden md:hidden animate-in fade-in duration-200">
          {/* Backdrop */}
          <div 
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-16">
            <div className="w-screen max-w-xs bg-white shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-250 pb-safe">
              
              {/* Drawer Header */}
              <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-xl bg-orange-500 text-white flex items-center justify-center font-bold">
                    <UtensilsCrossed className="w-4 h-4" />
                  </div>
                  <span className="font-extrabold text-slate-900 text-base">foodRo Menu</span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-8 h-8 rounded-full hover:bg-slate-200 flex items-center justify-center text-slate-600 transition cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Drawer Links */}
              <div className="p-4 space-y-3 overflow-y-auto flex-1">
                
                {/* User Section in Drawer */}
                {user ? (
                  <div className="p-3.5 rounded-2xl bg-orange-50 border border-orange-200">
                    <div className="flex items-center gap-3">
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-10 h-10 rounded-2xl object-cover border border-orange-500"
                      />
                      <div className="min-w-0">
                        <h4 className="text-xs font-extrabold text-slate-900 truncate">{user.name}</h4>
                        <p className="text-[11px] text-slate-500 truncate">{user.phone}</p>
                        <span className="text-[9px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded-full mt-1 inline-flex items-center gap-0.5">
                          <ShieldCheck className="w-2.5 h-2.5" />
                          2FA Verified
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        onLogout();
                      }}
                      className="w-full mt-3 py-2 text-xs font-bold text-rose-600 bg-white border border-rose-200 rounded-xl flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Log Out</span>
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onOpenLogin();
                    }}
                    className="w-full p-3.5 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs flex items-center justify-center gap-2 shadow-md shadow-orange-500/20 cursor-pointer"
                  >
                    <ShieldCheck className="w-4 h-4" />
                    <span>Sign In with 2-Step OTP</span>
                  </button>
                )}

                <div className="pt-2 space-y-1">
                  {/* List Food / Partner Portal */}
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onOpenPartnerPortal();
                    }}
                    className="w-full p-3 rounded-2xl text-left text-xs font-bold text-slate-800 hover:bg-slate-100 flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <Store className="w-4 h-4 text-orange-500" />
                      <span>Partner Portal (List Food/Hotel)</span>
                    </div>
                    <span className="text-[10px] bg-orange-100 text-orange-800 font-extrabold px-2 py-0.5 rounded-full">New</span>
                  </button>

                  {/* Pure Veg Filter Toggle */}
                  <button
                    onClick={() => {
                      setIsVegOnly(!isVegOnly);
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full p-3 rounded-2xl text-left text-xs font-bold text-slate-800 hover:bg-slate-100 flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="w-4 h-4 rounded-xs border border-emerald-600 flex items-center justify-center p-0.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                      </span>
                      <span>Pure Veg Mode</span>
                    </div>
                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full ${
                      isVegOnly ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'
                    }`}>
                      {isVegOnly ? 'ON' : 'OFF'}
                    </span>
                  </button>

                  {/* Past Orders */}
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onOpenOrders();
                    }}
                    className="w-full p-3 rounded-2xl text-left text-xs font-bold text-slate-800 hover:bg-slate-100 flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <Clock className="w-4 h-4 text-slate-600" />
                      <span>Order History</span>
                    </div>
                    {ordersCount > 0 && (
                      <span className="text-[10px] bg-slate-900 text-white font-extrabold px-2 py-0.5 rounded-full">
                        {ordersCount}
                      </span>
                    )}
                  </button>

                  {/* Favorites */}
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      onOpenFavorites();
                    }}
                    className="w-full p-3 rounded-2xl text-left text-xs font-bold text-slate-800 hover:bg-slate-100 flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center gap-2.5">
                      <Heart className="w-4 h-4 text-rose-500" />
                      <span>Saved Favorites</span>
                    </div>
                    {favoritesCount > 0 && (
                      <span className="text-[10px] bg-rose-500 text-white font-extrabold px-2 py-0.5 rounded-full">
                        {favoritesCount}
                      </span>
                    )}
                  </button>
                </div>

                {/* Currency Selection in Drawer */}
                <div className="pt-3 border-t border-slate-200">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-2 px-1">
                    Select Currency ({currency})
                  </span>
                  <div className="grid grid-cols-2 gap-1.5">
                    {Object.values(CURRENCIES).map(c => (
                      <button
                        key={c.code}
                        onClick={() => {
                          onSelectCurrency(c.code);
                          setIsMobileMenuOpen(false);
                        }}
                        className={`p-2 rounded-xl text-xs font-bold flex items-center justify-between border cursor-pointer ${
                          c.code === currency
                            ? 'bg-orange-500 border-orange-500 text-white'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <span className="flex items-center gap-1.5">
                          <span>{c.flag}</span>
                          <span>{c.code}</span>
                        </span>
                        <span className="font-mono text-[11px]">{c.symbol}</span>
                      </button>
                    ))}
                  </div>
                </div>

              </div>

              {/* Drawer Footer */}
              <div className="p-4 bg-slate-50 border-t border-slate-200 text-[10px] text-slate-400 text-center">
                foodRo v1.0.0 • Mobile & Android Ready
              </div>

            </div>
          </div>
        </div>
      )}

    </header>
  );
}
