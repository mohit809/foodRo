import React from 'react';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { formatCurrency } from '../utils/currency';

export default function MobileCartBar({
  cart,
  cartCount,
  cartTotal,
  currency,
  onOpenCart
}) {
  if (!cart || cartCount === 0) return null;

  return (
    <div className="fixed bottom-18 left-3 right-3 z-35 md:hidden animate-in slide-in-from-bottom-5 duration-200">
      <button
        onClick={onOpenCart}
        className="w-full bg-slate-900 text-white p-3.5 rounded-2xl shadow-xl shadow-slate-900/30 flex items-center justify-between border border-slate-800 active:scale-98 transition cursor-pointer"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-orange-500 text-white flex items-center justify-center font-bold text-xs shadow-xs">
            <ShoppingBag className="w-4 h-4" />
          </div>
          <div className="text-left">
            <span className="text-[11px] uppercase font-bold tracking-wider text-orange-400 block leading-tight">
              {cartCount} {cartCount === 1 ? 'ITEM' : 'ITEMS'} IN BASKET
            </span>
            <span className="text-sm font-extrabold text-white">
              {formatCurrency(cartTotal, currency)}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-extrabold text-orange-400 bg-white/10 px-3 py-1.5 rounded-xl">
          <span>View Cart</span>
          <ArrowRight className="w-4 h-4" />
        </div>
      </button>
    </div>
  );
}
