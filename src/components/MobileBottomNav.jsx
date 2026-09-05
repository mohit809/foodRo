import React from 'react';
import { 
  UtensilsCrossed, 
  Search, 
  Clock, 
  Heart, 
  User, 
  Sparkles,
  ShieldCheck 
} from 'lucide-react';

export default function MobileBottomNav({
  activeTab = 'home',
  onSelectTab,
  ordersCount,
  activeOrder,
  favoritesCount,
  user,
  onOpenLogin,
  onOpenOrders,
  onOpenFavorites,
  onFocusSearch
}) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-slate-200/90 md:hidden pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
      <div className="grid grid-cols-5 h-16 max-w-lg mx-auto items-center">
        
        {/* 1. Home */}
        <button
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            if (onSelectTab) onSelectTab('home');
          }}
          className="flex flex-col items-center justify-center gap-1 text-slate-500 hover:text-orange-600 transition active:scale-95 cursor-pointer"
        >
          <UtensilsCrossed className="w-5 h-5" />
          <span className="text-[10px] font-bold">Explore</span>
        </button>

        {/* 2. Search / Cuisines */}
        <button
          onClick={() => {
            if (onFocusSearch) onFocusSearch();
          }}
          className="flex flex-col items-center justify-center gap-1 text-slate-500 hover:text-orange-600 transition active:scale-95 cursor-pointer"
        >
          <Search className="w-5 h-5" />
          <span className="text-[10px] font-bold">Search</span>
        </button>

        {/* 3. Orders / Live Tracking */}
        <button
          onClick={onOpenOrders}
          className="flex flex-col items-center justify-center gap-1 text-slate-500 hover:text-orange-600 relative transition active:scale-95 cursor-pointer"
        >
          <div className="relative">
            {activeOrder ? (
              <div className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center animate-pulse">
                <Sparkles className="w-3.5 h-3.5" />
              </div>
            ) : (
              <Clock className="w-5 h-5" />
            )}
            
            {ordersCount > 0 && !activeOrder && (
              <span className="absolute -top-1 -right-2 w-3.5 h-3.5 rounded-full bg-slate-900 text-white text-[9px] font-bold flex items-center justify-center">
                {ordersCount}
              </span>
            )}
            {activeOrder && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white animate-ping" />
            )}
          </div>
          <span className={`text-[10px] font-bold ${activeOrder ? 'text-amber-600' : ''}`}>
            {activeOrder ? 'Tracking' : 'Orders'}
          </span>
        </button>

        {/* 4. Favorites */}
        <button
          onClick={onOpenFavorites}
          className="flex flex-col items-center justify-center gap-1 text-slate-500 hover:text-orange-600 relative transition active:scale-95 cursor-pointer"
        >
          <div className="relative">
            <Heart className={`w-5 h-5 ${favoritesCount > 0 ? 'text-rose-500 fill-rose-500' : ''}`} />
            {favoritesCount > 0 && (
              <span className="absolute -top-1 -right-2 w-3.5 h-3.5 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center">
                {favoritesCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-bold">Saved</span>
        </button>

        {/* 5. Profile / Sign In */}
        <button
          onClick={onOpenLogin}
          className="flex flex-col items-center justify-center gap-1 text-slate-500 hover:text-orange-600 transition active:scale-95 cursor-pointer"
        >
          {user ? (
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-5 h-5 rounded-full object-cover border border-orange-500"
              />
              <ShieldCheck className="w-2.5 h-2.5 text-emerald-500 absolute -bottom-0.5 -right-1 bg-white rounded-full" />
            </div>
          ) : (
            <User className="w-5 h-5" />
          )}
          <span className="text-[10px] font-bold truncate max-w-[50px]">
            {user ? user.name.split(' ')[0] : 'Sign In'}
          </span>
        </button>

      </div>
    </nav>
  );
}
