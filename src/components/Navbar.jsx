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
  Globe,
  ChevronDown,
  LogOut
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

  const currentCurrencyConfig = CURRENCIES[currency] || CURRENCIES.INR;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-3 sm:gap-4">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-4 sm:gap-6">
            <a href="#" className="flex items-center gap-2 group">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-tr from-orange-600 via-orange-500 to-amber-400 flex items-center justify-center text-white shadow-md shadow-orange-500/30 group-hover:scale-105 transition-transform">
                <UtensilsCrossed className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-slate-900 flex items-center gap-1">
                  food<span className="text-orange-500">Ro</span>
                  <span className="w-2 h-2 rounded-full bg-orange-500 inline-block"></span>
                </span>
                <p className="text-[9px] sm:text-[10px] font-bold text-slate-400 uppercase tracking-wider -mt-1">Fast • Fresh • Global</p>
              </div>
            </a>

            {/* Region / Currency Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setIsCurrencyDropdownOpen(!isCurrencyDropdownOpen);
                  setIsUserMenuOpen(false);
                }}
                className="flex items-center gap-1.5 py-1.5 px-2.5 sm:px-3 rounded-xl bg-slate-100 hover:bg-slate-200/80 text-xs font-bold text-slate-700 transition cursor-pointer border border-slate-200/60"
                title="Change Country & Currency"
              >
                <span className="text-sm">{currentCurrencyConfig.flag}</span>
                <span className="font-extrabold">{currentCurrencyConfig.code} ({currentCurrencyConfig.symbol})</span>
                <ChevronDown className="w-3 h-3 text-slate-500" />
              </button>

              {isCurrencyDropdownOpen && (
                <div 
                  className="absolute left-0 mt-2 w-52 bg-white rounded-2xl shadow-2xl border border-slate-200 py-2 z-50 animate-in fade-in zoom-in-95 duration-150"
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
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search momos, pizza, burgers, biryani..."
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

          {/* Right Action Icons & Buttons */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            
            {/* Restaurant / Hotel Partner Portal Button */}
            <button
              onClick={onOpenPartnerPortal}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-xs transition cursor-pointer"
              title="Add your restaurant, hotel or food items"
            >
              <Store className="w-3.5 h-3.5 text-orange-400" />
              <span className="hidden lg:inline">Partner Portal</span>
            </button>

            {/* Veg Only Toggle */}
            <button
              onClick={() => setIsVegOnly(!isVegOnly)}
              className={`flex items-center gap-1 px-2.5 py-2 rounded-xl text-xs font-semibold border transition cursor-pointer ${
                isVegOnly 
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-700 shadow-xs' 
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
              title="Filter Vegetarian dishes only"
            >
              <span className={`w-3.5 h-3.5 rounded-xs border flex items-center justify-center p-0.5 ${
                isVegOnly ? 'border-emerald-600' : 'border-slate-400'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${
                  isVegOnly ? 'bg-emerald-600' : 'bg-slate-400'
                }`}></span>
              </span>
              <span className="hidden xl:inline font-bold">Pure Veg</span>
            </button>

            {/* Active Live Order Pill */}
            {activeOrder && (
              <button
                onClick={onOpenTracking}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500 text-white text-xs font-bold shadow-md shadow-amber-500/25 animate-pulse-subtle hover:bg-amber-600 transition cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 animate-spin" />
                <span className="hidden sm:inline">Tracking</span>
              </button>
            )}

            {/* Order History */}
            <button
              onClick={onOpenOrders}
              className="relative p-2.5 rounded-xl hover:bg-slate-100 text-slate-700 transition cursor-pointer"
              title="Order History"
            >
              <Clock className="w-5 h-5" />
              {ordersCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-slate-900 text-white text-[10px] font-bold flex items-center justify-center">
                  {ordersCount}
                </span>
              )}
            </button>

            {/* Wishlist / Favorites */}
            <button
              onClick={onOpenFavorites}
              className="relative p-2.5 rounded-xl hover:bg-slate-100 text-slate-700 transition cursor-pointer"
              title="Favorites"
            >
              <Heart className={`w-5 h-5 ${favoritesCount > 0 ? 'text-rose-500 fill-rose-500' : ''}`} />
              {favoritesCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {favoritesCount}
                </span>
              )}
            </button>

            {/* Dedicated High-Security User Login / Profile */}
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
                  <div className="text-left hidden md:block pr-1">
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
                title="Log In with OTP & 2-Step Verification"
              >
                <ShieldCheck className="w-4 h-4 text-orange-600" />
                <span className="hidden sm:inline">Sign In</span>
              </button>
            )}

            {/* Cart Button with converted currency */}
            <button
              onClick={onOpenCart}
              className="flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-2xl bg-orange-500 hover:bg-orange-600 active:scale-95 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-orange-500/30 transition duration-200 cursor-pointer"
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

          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search momos, pizza, burgers, sushi..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-100 border border-transparent focus:border-orange-500 focus:bg-white text-xs outline-none"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
