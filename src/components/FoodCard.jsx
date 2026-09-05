import React from 'react';
import { Star, Clock, Heart, Plus, Minus, Flame, Sparkles, ShieldCheck } from 'lucide-react';
import { formatCurrency } from '../utils/currency';

export default function FoodCard({
  food,
  quantityInCart,
  onAddToCart,
  onRemoveFromCart,
  onOpenCustomize,
  isFavorite,
  onToggleFavorite,
  currency = 'INR'
}) {
  const discountPercent = food.originalPrice 
    ? Math.round(((food.originalPrice - food.price) / food.originalPrice) * 100) 
    : 0;

  return (
    <div className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col group">
      {/* Image container */}
      <div 
        className="relative h-44 sm:h-52 w-full overflow-hidden bg-slate-100 cursor-pointer"
        onClick={() => onOpenCustomize(food)}
      >
        <img
          src={food.image}
          alt={food.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />

        {/* Top badges */}
        <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 flex items-center gap-1.5 sm:gap-2">
          {/* Veg / Non-Veg icon */}
          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-lg bg-white/90 backdrop-blur-xs flex items-center justify-center shadow-xs">
            <span className={`w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-xs border flex items-center justify-center p-0.5 ${
              food.isVeg ? 'border-emerald-600' : 'border-rose-600'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${
                food.isVeg ? 'bg-emerald-600' : 'bg-rose-600'
              }`}></span>
            </span>
          </div>

          {/* Bestseller badge */}
          {food.isBestseller && (
            <span className="px-2 sm:px-2.5 py-0.5 rounded-full bg-orange-500 text-white text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider flex items-center gap-1 shadow-xs">
              <Sparkles className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
              Bestseller
            </span>
          )}

          {discountPercent > 0 && (
            <span className="px-1.5 sm:px-2 py-0.5 rounded-full bg-emerald-600 text-white text-[9px] sm:text-[10px] font-extrabold uppercase tracking-wider">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Favorite button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(food);
          }}
          className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs hover:bg-white flex items-center justify-center text-slate-700 shadow-md transition hover:scale-110 active:scale-95 cursor-pointer"
          title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'text-rose-500 fill-rose-500' : 'text-slate-600'}`} />
        </button>

        {/* Bottom image overlay: prep time & calories */}
        <div className="absolute bottom-2.5 left-2.5 right-2.5 sm:bottom-3 sm:left-3 sm:right-3 flex items-center justify-between text-white text-[11px] sm:text-xs font-semibold">
          <span className="flex items-center gap-1 bg-black/40 backdrop-blur-xs px-2 py-0.5 sm:py-1 rounded-full">
            <Clock className="w-3 h-3 text-orange-400" />
            {food.prepTime}
          </span>
          <span className="flex items-center gap-1 bg-black/40 backdrop-blur-xs px-2 py-0.5 sm:py-1 rounded-full text-slate-200">
            <Flame className="w-3 h-3 text-amber-400" />
            {food.calories}
          </span>
        </div>
      </div>

      {/* Details Container */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
        <div>
          {/* Restaurant & Rating */}
          <div className="flex items-center justify-between gap-2 mb-1">
            <span className="text-[11px] sm:text-xs font-bold text-orange-600 tracking-wide uppercase truncate flex items-center gap-1">
              <span className="truncate">{food.restaurant.name}</span>
              {food.restaurant.isGovtVerified !== false && (
                <ShieldCheck className="w-3 h-3 text-emerald-600 shrink-0" title="Govt & FSSAI Verified Partner" />
              )}
            </span>
            <div className="flex items-center gap-1 bg-amber-50 text-amber-800 px-1.5 sm:px-2 py-0.5 rounded-lg text-[11px] sm:text-xs font-bold shrink-0">
              <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
              <span>{food.rating}</span>
              <span className="text-slate-400 font-normal">({food.reviewsCount})</span>
            </div>
          </div>

          {/* Dish Name */}
          <h3 
            onClick={() => onOpenCustomize(food)}
            className="font-bold text-slate-900 text-sm sm:text-base leading-snug mb-1.5 group-hover:text-orange-600 transition cursor-pointer line-clamp-1"
          >
            {food.name}
          </h3>

          {/* Description */}
          <p className="text-[11px] sm:text-xs text-slate-500 line-clamp-2 leading-relaxed mb-3 sm:mb-4">
            {food.description}
          </p>
        </div>

        {/* Price & Action */}
        <div className="pt-2.5 sm:pt-3 border-t border-slate-100 flex items-center justify-between">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1 sm:gap-1.5">
              <span className="text-base sm:text-lg font-extrabold text-slate-900">
                {formatCurrency(food.price, currency)}
              </span>
              {food.originalPrice && (
                <span className="text-[11px] sm:text-xs text-slate-400 line-through">
                  {formatCurrency(food.originalPrice, currency)}
                </span>
              )}
            </div>
            <span className="text-[9px] sm:text-[10px] text-slate-400 font-medium">Customizable</span>
          </div>

          {/* Quantity Controls or Add Button */}
          {quantityInCart > 0 ? (
            <div className="flex items-center gap-1.5 sm:gap-2 bg-orange-500 text-white rounded-2xl px-2 py-1 shadow-md shadow-orange-500/30">
              <button
                onClick={() => onRemoveFromCart(food)}
                className="w-6 h-6 rounded-xl hover:bg-orange-600 flex items-center justify-center font-bold transition active:scale-90 cursor-pointer"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <span className="text-xs font-extrabold w-4 text-center">
                {quantityInCart}
              </span>
              <button
                onClick={() => onAddToCart(food)}
                className="w-6 h-6 rounded-xl hover:bg-orange-600 flex items-center justify-center font-bold transition active:scale-90 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => onOpenCustomize(food)}
              className="flex items-center gap-1 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-2xl bg-orange-50 hover:bg-orange-500 text-orange-600 hover:text-white font-bold text-xs border border-orange-200 hover:border-orange-500 shadow-xs transition duration-200 active:scale-95 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>ADD</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
