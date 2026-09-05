import React from 'react';
import { X, Heart, Plus, Trash2 } from 'lucide-react';
import { formatCurrency } from '../utils/currency';

export default function FavoritesModal({
  isOpen,
  onClose,
  favorites,
  onAddToCart,
  onRemoveFavorite,
  currency = 'INR'
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-lg rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh] sm:max-h-[85vh] animate-in slide-in-from-bottom-10 sm:zoom-in-95 duration-250 pb-safe sm:pb-0"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Drag Handle */}
        <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto my-2 sm:hidden shrink-0" />

        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <Heart className="w-4 h-4 sm:w-5 sm:h-5 fill-rose-500 text-rose-500" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-extrabold text-slate-900">Your Favorites</h2>
              <p className="text-[10px] sm:text-xs text-slate-500">{favorites.length} saved dishes</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-slate-200 flex items-center justify-center text-slate-600 transition cursor-pointer"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        <div className="p-4 sm:p-6 overflow-y-auto space-y-2.5 sm:space-y-3 flex-1">
          {favorites.length === 0 ? (
            <div className="text-center py-10 sm:py-12">
              <div className="text-4xl mb-2 sm:mb-3">❤️</div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-1">No favorites saved yet</h3>
              <p className="text-xs text-slate-500">Tap the heart icon on any dish to save it here for quick ordering.</p>
            </div>
          ) : (
            favorites.map(food => (
              <div 
                key={food.id}
                className="p-3 rounded-2xl border border-slate-200/90 hover:border-slate-300 bg-white transition flex items-center gap-3"
              >
                <img
                  src={food.image}
                  alt={food.name}
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate">{food.name}</h4>
                  <p className="text-[11px] text-slate-400 truncate">{food.restaurant.name}</p>
                  <span className="text-xs font-extrabold text-slate-900 mt-0.5 block">
                    {formatCurrency(food.price, currency)}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => onRemoveFavorite(food)}
                    className="p-1.5 sm:p-2 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition cursor-pointer"
                    title="Remove from favorites"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      onAddToCart(food);
                    }}
                    className="flex items-center gap-1 px-2.5 sm:px-3 py-1.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-xs transition active:scale-95 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
