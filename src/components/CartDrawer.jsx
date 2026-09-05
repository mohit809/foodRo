import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  Tag, 
  ArrowRight, 
  Sparkles, 
  ShoppingBag
} from 'lucide-react';
import { VALID_COUPONS } from '../data/mockData';
import { formatCurrency } from '../utils/currency';

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  appliedCoupon,
  onApplyCoupon,
  onRemoveCoupon,
  onProceedToCheckout,
  currency = 'INR'
}) {
  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  if (!isOpen) return null;

  // Subtotal calculation in USD base
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Delivery fee
  let deliveryFee = subtotal > 20 ? 0 : 2.50;
  let discount = 0;

  if (appliedCoupon) {
    if (appliedCoupon.freeDelivery) {
      deliveryFee = 0;
    }
    if (appliedCoupon.discountPercent) {
      const calculated = (subtotal * appliedCoupon.discountPercent) / 100;
      discount = Math.min(calculated, appliedCoupon.maxDiscount || calculated);
    }
    if (appliedCoupon.flatDiscount) {
      discount = appliedCoupon.flatDiscount;
    }
  }

  const taxes = subtotal * 0.08;
  const platformFee = subtotal > 0 ? 0.60 : 0;
  const grandTotal = Math.max(0, subtotal + deliveryFee + taxes + platformFee - discount);

  const handleApplyInput = (codeToApply) => {
    const targetCode = (codeToApply || couponInput).trim().toUpperCase();
    setCouponError('');

    if (!targetCode) return;

    const coupon = VALID_COUPONS[targetCode];
    if (!coupon) {
      setCouponError('Invalid coupon code.');
      return;
    }

    if (coupon.minOrder && subtotal < coupon.minOrder) {
      setCouponError(`Min order of ${formatCurrency(coupon.minOrder, currency)} required for this code.`);
      return;
    }

    onApplyCoupon(coupon);
    setCouponInput('');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex w-full sm:w-auto sm:pl-10">
        <div className="w-full sm:w-screen sm:max-w-md bg-white shadow-2xl flex flex-col h-full pb-safe sm:pb-0">
          
          {/* Cart Header */}
          <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/70 shrink-0">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
                <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div>
                <h2 className="text-sm sm:text-base font-extrabold text-slate-900">Your Basket</h2>
                <p className="text-[11px] sm:text-xs text-slate-500 font-medium">
                  {cart.length} {cart.length === 1 ? 'item' : 'items'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {cart.length > 0 && (
                <button
                  onClick={onClearCart}
                  className="text-xs text-slate-400 hover:text-rose-600 font-medium px-2 py-1 rounded transition cursor-pointer"
                >
                  Clear all
                </button>
              )}
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full hover:bg-slate-200 flex items-center justify-center text-slate-600 transition cursor-pointer"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-orange-50 text-orange-500 flex items-center justify-center mb-3 text-3xl">
                  🥟
                </div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1">Your cart is empty</h3>
                <p className="text-xs text-slate-500 max-w-xs mb-5">
                  Explore steaming momos, artisan pizza, burgers, bowls and more to start your feast.
                </p>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 rounded-2xl bg-orange-500 text-white font-bold text-xs shadow-lg shadow-orange-500/30 hover:bg-orange-600 transition cursor-pointer"
                >
                  Browse Menu
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div 
                  key={item.cartItemId || item.id}
                  className="p-3 sm:p-3.5 rounded-2xl border border-slate-200/90 bg-white hover:border-slate-300 transition flex gap-3"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 sm:w-18 sm:h-18 rounded-xl object-cover shrink-0"
                  />

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item)}
                          className="text-slate-400 hover:text-rose-500 p-0.5 transition cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Customization details */}
                      <div className="text-[10px] sm:text-[11px] text-slate-500 mt-0.5 space-y-0.5">
                        {item.selectedSize && item.selectedSize.name !== 'Regular' && (
                          <span className="block text-slate-600 font-semibold truncate">
                            Size: {item.selectedSize.name}
                          </span>
                        )}
                        {item.selectedAddOns && item.selectedAddOns.length > 0 && (
                          <span className="block truncate text-slate-500">
                            +{item.selectedAddOns.map(a => a.name).join(', ')}
                          </span>
                        )}
                        {item.specialInstructions && (
                          <span className="block italic text-orange-600 truncate">
                            "{item.specialInstructions}"
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-1 border-t border-slate-100">
                      <span className="text-xs sm:text-sm font-extrabold text-slate-900">
                        {formatCurrency(item.price * item.quantity, currency)}
                      </span>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-1.5 sm:gap-2 bg-slate-100 rounded-xl px-2 py-0.5">
                        <button
                          onClick={() => onUpdateQuantity(item, item.quantity - 1)}
                          className="w-5 h-5 rounded hover:bg-slate-200 flex items-center justify-center text-slate-700 transition cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold w-4 text-center text-slate-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item, item.quantity + 1)}
                          className="w-5 h-5 rounded hover:bg-slate-200 flex items-center justify-center text-slate-700 transition cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}

            {/* Coupons Section */}
            {cart.length > 0 && (
              <div className="pt-1">
                <div className="p-3.5 sm:p-4 rounded-2xl bg-orange-50/60 border border-orange-200/80 space-y-2.5">
                  <div className="flex items-center gap-2 text-xs font-bold text-orange-950">
                    <Tag className="w-3.5 h-3.5 text-orange-600" />
                    <span>Apply Promo Code</span>
                  </div>

                  {appliedCoupon ? (
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-emerald-300 text-xs">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
                        <div>
                          <span className="font-extrabold text-emerald-800">
                            {appliedCoupon.code}
                          </span>
                          <p className="text-[10px] sm:text-[11px] text-emerald-600">
                            {appliedCoupon.description}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={onRemoveCoupon}
                        className="text-xs text-rose-500 font-bold hover:underline cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value.toUpperCase())}
                        placeholder="e.g. FOODRO50, MOMOLOV"
                        className="flex-1 px-3 py-2 rounded-xl bg-white border border-orange-200 text-xs font-mono font-bold uppercase outline-none focus:border-orange-500"
                      />
                      <button
                        onClick={() => handleApplyInput()}
                        className="px-3.5 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs shadow-xs transition cursor-pointer"
                      >
                        Apply
                      </button>
                    </div>
                  )}

                  {couponError && (
                    <p className="text-[10px] sm:text-[11px] font-semibold text-rose-600">
                      {couponError}
                    </p>
                  )}

                  {/* Quick coupon suggestions */}
                  {!appliedCoupon && (
                    <div className="flex flex-wrap gap-1.5 pt-0.5">
                      {Object.values(VALID_COUPONS).map(c => (
                        <button
                          key={c.code}
                          onClick={() => handleApplyInput(c.code)}
                          className="px-2.5 py-1 rounded-lg bg-white hover:bg-orange-100/70 border border-orange-200 text-[10px] font-bold text-orange-800 transition cursor-pointer"
                        >
                          {c.code}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Cart Footer / Bill Summary */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 space-y-2.5 shrink-0">
              <div className="space-y-1 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Items Subtotal</span>
                  <span className="font-semibold text-slate-800">{formatCurrency(subtotal, currency)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="flex items-center gap-1">
                    Delivery Fee
                    {subtotal > 20 && <span className="text-[10px] text-emerald-600 font-bold">(Free Promo)</span>}
                  </span>
                  <span className="font-semibold text-slate-800">
                    {deliveryFee === 0 ? <span className="text-emerald-600 font-bold">FREE</span> : formatCurrency(deliveryFee, currency)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Taxes & Charges</span>
                  <span className="font-semibold text-slate-800">{formatCurrency(taxes, currency)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Platform Fee</span>
                  <span className="font-semibold text-slate-800">{formatCurrency(platformFee, currency)}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>Coupon Discount</span>
                    <span>-{formatCurrency(discount, currency)}</span>
                  </div>
                )}

                <div className="pt-1.5 border-t border-slate-200 flex justify-between items-baseline text-slate-900 font-extrabold text-sm sm:text-base">
                  <span>To Pay</span>
                  <span className="text-lg sm:text-xl text-orange-600">{formatCurrency(grandTotal, currency)}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  onProceedToCheckout({
                    subtotal,
                    deliveryFee,
                    taxes,
                    platformFee,
                    discount,
                    grandTotal
                  });
                }}
                className="w-full py-3.5 px-5 rounded-2xl bg-orange-500 hover:bg-orange-600 active:scale-98 text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-orange-500/30 flex items-center justify-between transition cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <span className="flex items-center gap-1">
                  {formatCurrency(grandTotal, currency)}
                  <ArrowRight className="w-4 h-4" />
                </span>
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
