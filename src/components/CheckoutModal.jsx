import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  CreditCard, 
  Banknote, 
  Smartphone, 
  ShieldCheck, 
  Sparkles
} from 'lucide-react';
import { formatCurrency } from '../utils/currency';

export default function CheckoutModal({
  isOpen,
  onClose,
  cart,
  pricing,
  onOrderPlaced,
  currency = 'INR',
  user = null,
  onOpenLogin = null
}) {
  if (!isOpen) return null;

  const [addressType, setAddressType] = useState('home');
  const [streetAddress, setStreetAddress] = useState('42 Gourmet Avenue, Sector 14');
  const [deliveryNote, setDeliveryNote] = useState('Please ring bell or leave at door');
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePlaceOrder = () => {
    if (!user && onOpenLogin) {
      onOpenLogin();
      return;
    }

    setIsSubmitting(true);
    
    const newOrder = {
      orderId: 'RO-' + Math.floor(100000 + Math.random() * 900000),
      createdAt: new Date().toISOString(),
      items: [...cart],
      pricing,
      currency,
      address: {
        type: addressType,
        street: streetAddress,
        notes: deliveryNote
      },
      paymentMethod,
      status: 'confirmed',
      etaMinutes: 24
    };

    setTimeout(() => {
      setIsSubmitting(false);
      onOrderPlaced(newOrder);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-xl rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh] sm:max-h-[90vh] animate-in slide-in-from-bottom-10 sm:zoom-in-95 duration-250 pb-safe sm:pb-0"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Drag Handle */}
        <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto my-2 sm:hidden shrink-0" />

        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-orange-500 text-white flex items-center justify-center font-bold">
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-extrabold text-slate-900">Checkout</h2>
              <p className="text-[11px] sm:text-xs text-slate-500">
                {user ? `Logged in as ${user.name}` : 'Instant 2-Step Verified Checkout'}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-slate-200 flex items-center justify-center text-slate-600 transition cursor-pointer"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 sm:space-y-6 flex-1">
          
          {/* User login prompt if not logged in */}
          {!user && (
            <div className="p-3 sm:p-3.5 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-between gap-2">
              <div>
                <span className="text-xs font-bold text-amber-900 block">Fast 2-Step Verification</span>
                <span className="text-[10px] sm:text-[11px] text-amber-700">Sign in with OTP to save addresses.</span>
              </div>
              <button
                onClick={onOpenLogin}
                className="px-3 py-1.5 rounded-xl bg-orange-500 text-white font-bold text-xs shadow-xs hover:bg-orange-600 cursor-pointer shrink-0"
              >
                Log In
              </button>
            </div>
          )}

          {/* Section 1: Delivery Address */}
          <div>
            <div className="flex items-center justify-between mb-2 sm:mb-3">
              <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-500" />
                Delivery Address
              </h3>
            </div>

            {/* Address Type Tabs */}
            <div className="flex gap-2 mb-2.5">
              {[
                { id: 'home', label: '🏠 Home' },
                { id: 'work', label: '🏢 Work' },
                { id: 'other', label: '📍 Other' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setAddressType(tab.id)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold border transition cursor-pointer ${
                    addressType === tab.id
                      ? 'bg-orange-50 border-orange-500 text-orange-600 shadow-xs'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="space-y-2">
              <input
                type="text"
                value={streetAddress}
                onChange={(e) => setStreetAddress(e.target.value)}
                placeholder="Street address & Flat / Suite number"
                className="w-full p-2.5 sm:p-3 rounded-2xl border border-slate-200 focus:border-orange-500 text-xs font-semibold text-slate-800 outline-none"
              />
              <input
                type="text"
                value={deliveryNote}
                onChange={(e) => setDeliveryNote(e.target.value)}
                placeholder="Delivery instructions (e.g. Leave with security)"
                className="w-full p-2 rounded-2xl border border-slate-200 focus:border-orange-500 text-xs text-slate-600 outline-none"
              />
            </div>
          </div>

          {/* Section 2: Payment Method */}
          <div>
            <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider mb-2 sm:mb-3 flex items-center gap-1.5">
              <CreditCard className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-500" />
              Payment Method ({currency})
            </h3>

            <div className="space-y-2">
              {[
                { id: 'upi', name: 'Instant UPI / GPay / Apple Pay', icon: Smartphone, subtitle: 'One-click instant payment' },
                { id: 'card', name: 'Credit / Debit Card', icon: CreditCard, subtitle: 'Visa, Mastercard, RuPay' },
                { id: 'cod', name: 'Cash on Delivery (COD)', icon: Banknote, subtitle: 'Pay when your food arrives' }
              ].map(method => {
                const Icon = method.icon;
                const isSelected = paymentMethod === method.id;
                return (
                  <div
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id)}
                    className={`flex items-center justify-between p-3 rounded-2xl border cursor-pointer transition ${
                      isSelected
                        ? 'border-orange-500 bg-orange-50/50 shadow-xs'
                        : 'border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center ${
                        isSelected ? 'bg-orange-500 text-white' : 'bg-slate-100 text-slate-600'
                      }`}>
                        <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </div>
                      <div>
                        <span className="text-xs font-extrabold text-slate-900 block">{method.name}</span>
                        <span className="text-[10px] text-slate-500">{method.subtitle}</span>
                      </div>
                    </div>
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      isSelected ? 'border-orange-500 bg-orange-500 text-white' : 'border-slate-300'
                    }`}>
                      {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 3: Summary breakdown */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
            <div className="flex justify-between text-slate-600">
              <span>Items Total ({cart.reduce((s, i) => s + i.quantity, 0)} items)</span>
              <span className="font-bold text-slate-800">{formatCurrency(pricing?.subtotal, currency)}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Delivery & Handling</span>
              <span className="font-bold text-slate-800">
                {pricing?.deliveryFee === 0 ? <span className="text-emerald-600 font-bold">FREE</span> : formatCurrency(pricing?.deliveryFee, currency)}
              </span>
            </div>
            {pricing?.discount > 0 && (
              <div className="flex justify-between text-emerald-600 font-bold">
                <span>Discount Applied</span>
                <span>-{formatCurrency(pricing?.discount, currency)}</span>
              </div>
            )}
            <div className="pt-2 border-t border-slate-200 flex justify-between font-extrabold text-slate-900 text-sm">
              <span>Total Payable</span>
              <span className="text-orange-600 text-base">{formatCurrency(pricing?.grandTotal, currency)}</span>
            </div>
          </div>
        </div>

        {/* Footer with Place Order Button */}
        <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 shrink-0">
          <button
            onClick={handlePlaceOrder}
            disabled={isSubmitting}
            className="w-full py-3.5 sm:py-4 rounded-2xl bg-orange-500 hover:bg-orange-600 active:scale-98 text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-orange-500/30 flex items-center justify-center gap-2 transition disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Confirming Order...</span>
              </div>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Place Order • {formatCurrency(pricing?.grandTotal, currency)}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
