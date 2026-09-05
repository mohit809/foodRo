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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-900">Your Favorites</h2>
              <p className="text-xs text-slate-500">{favorites.length} saved dishes</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-slate-200 flex items-center justify-center text-slate-600 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-3 flex-1">
          {favorites.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-3">❤️</div>
              <h3 className="text-base font-bold text-slate-900 mb-1">No favorites saved yet</h3>
              <p className="text-xs text-slate-500">Tap the heart icon on any dish to save it here for quick ordering.</p>
            </div>
          ) : (
            favorites.map(food => (
              <div 
                key={food.id}
                className="p-3.5 rounded-2xl border border-slate-200/90 hover:border-slate-300 bg-white transition flex items-center gap-3.5"
              >
                <img
                  src={food.image}
                  alt={food.name}
                  className="w-16 h-16 rounded-xl object-cover shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-slate-900 truncate">{food.name}</h4>
                  <p className="text-xs text-slate-400 truncate">{food.restaurant.name}</p>
                  <span className="text-xs font-extrabold text-slate-900 mt-1 block">
                    {formatCurrency(food.price, currency)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onRemoveFavorite(food)}
                    className="p-2 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-50 transition cursor-pointer"
                    title="Remove from favorites"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => {
                      onAddToCart(food);
                    }}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-xs transition active:scale-95 cursor-pointer"
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
