import React, { useState, useEffect } from 'react';
import { 
  X, 
  CheckCircle2, 
  Clock, 
  ChefHat, 
  Bike, 
  Home, 
  Phone, 
  MessageSquare, 
  Star, 
  RefreshCw,
  Navigation,
  Radio,
  ShieldCheck,
  MapPin,
  Smartphone
} from 'lucide-react';
import { MOCK_DRIVER } from '../data/mockData';
import { formatCurrency } from '../utils/currency';

export default function OrderTrackingModal({
  order,
  isOpen,
  onClose,
  onUpdateOrderStatus,
  currency = 'INR'
}) {
  if (!isOpen || !order) return null;

  const statuses = [
    { key: 'confirmed', title: 'Order Confirmed', desc: 'Partner restaurant verified order', icon: CheckCircle2 },
    { key: 'preparing', title: 'Cooking with Passion', desc: 'Chefs preparing gourmet food', icon: ChefHat },
    { key: 'out_for_delivery', title: 'Out for Delivery', desc: 'Courier Marcus navigating via Live GPS', icon: Bike },
    { key: 'delivered', title: 'Delivered Fresh!', desc: 'Handed over at verified coordinates', icon: Home }
  ];

  const currentStatusIndex = Math.max(0, statuses.findIndex(s => s.key === order.status));

  const [timeLeftSec, setTimeLeftSec] = useState(order.etaMinutes * 60);

  useEffect(() => {
    if (order.status === 'delivered') return;
    const interval = setInterval(() => {
      setTimeLeftSec(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [order.status]);

  const minutes = Math.floor(timeLeftSec / 60);
  const seconds = timeLeftSec % 60;

  const handleAdvanceStatus = () => {
    const nextIndex = (currentStatusIndex + 1) % statuses.length;
    onUpdateOrderStatus(order.orderId, statuses[nextIndex].key);
  };

  const progressPercent = (currentStatusIndex / (statuses.length - 1)) * 100;
  const orderCurrency = order.currency || currency;
  const deviceLoc = order.deviceLocation || {
    latitude: 28.6139,
    longitude: 77.2090,
    accuracy: 4,
    isLiveShared: true
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/65 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-2xl rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[94vh] sm:max-h-[92vh] animate-in slide-in-from-bottom-10 sm:zoom-in-95 duration-250 pb-safe sm:pb-0"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Drag Handle */}
        <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto my-2 sm:hidden shrink-0" />

        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-900 text-white shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-orange-500/20 border border-orange-500/40 text-orange-400 flex items-center justify-center">
              <Navigation className="w-4 h-4 sm:w-5 sm:h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] sm:text-xs uppercase font-extrabold tracking-wider text-orange-400">Live GPS Tracking</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              </div>
              <h2 className="text-sm sm:text-base font-extrabold text-white">
                Order #{order.orderId}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={handleAdvanceStatus}
              title="Fast-forward order simulation"
              className="text-[11px] sm:text-xs px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold flex items-center gap-1 transition cursor-pointer"
            >
              <RefreshCw className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <span className="hidden sm:inline">Simulate Next</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full hover:bg-white/10 text-white/70 hover:text-white flex items-center justify-center transition cursor-pointer"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 sm:space-y-6 flex-1">
          
          {/* Anti-Fraud Live Device Location Banner */}
          <div className="p-3 sm:p-3.5 rounded-2xl bg-slate-900 border border-orange-500/30 text-white flex items-center justify-between gap-3 shadow-md">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center shrink-0">
                <Radio className="w-4 h-4 animate-pulse" />
              </div>
              <div className="min-w-0">
                <span className="text-[10px] font-extrabold text-orange-400 uppercase tracking-wide block">
                  Live Device GPS Broadcast to Courier Marcus
                </span>
                <p className="text-[11px] text-slate-200 truncate font-mono">
                  {deviceLoc.latitude}° N, {deviceLoc.longitude}° E • ±{deviceLoc.accuracy}m Accuracy
                </p>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-[10px] font-extrabold shrink-0">
              Anti-Fraud Active
            </span>
          </div>

          {/* ETA & Status Banner */}
          <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-br from-orange-500 via-orange-600 to-amber-600 text-white shadow-lg flex items-center justify-between">
            <div>
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-orange-100 block mb-0.5">
                Estimated Delivery
              </span>
              <div className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                {order.status === 'delivered' ? (
                  <span className="text-emerald-100">Arrived! Enjoy!</span>
                ) : (
                  <span>{minutes} mins {seconds < 10 ? `0${seconds}` : seconds}s</span>
                )}
              </div>
              <p className="text-[11px] sm:text-xs text-white/80 mt-1 font-medium">
                {statuses[currentStatusIndex].desc}
              </p>
            </div>
            
            <div className="w-13 h-13 sm:w-16 sm:h-16 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/20 text-2xl sm:text-3xl">
              {order.status === 'confirmed' && '📋'}
              {order.status === 'preparing' && '🍳'}
              {order.status === 'out_for_delivery' && '🛵'}
              {order.status === 'delivered' && '🎉'}
            </div>
          </div>

          {/* Interactive Simulated Route Map with Live Customer GPS Pin */}
          <div className="relative h-40 sm:h-48 rounded-3xl overflow-hidden bg-slate-800 border border-slate-700 shadow-inner flex items-center justify-center">
            <div 
              className="absolute inset-0 opacity-15"
              style={{
                backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
                backgroundSize: '20px 20px'
              }}
            />

            <svg className="w-full h-full absolute inset-0" viewBox="0 0 600 180" preserveAspectRatio="none">
              <path
                d="M 60 90 Q 200 40, 320 100 T 540 90"
                fill="transparent"
                stroke="#334155"
                strokeWidth="14"
                strokeLinecap="round"
              />
              <path
                d="M 60 90 Q 200 40, 320 100 T 540 90"
                fill="transparent"
                stroke="#f97316"
                strokeWidth="8"
                strokeDasharray="600"
                strokeDashoffset={600 - (600 * (progressPercent / 100))}
                strokeLinecap="round"
                className="transition-all duration-700 ease-out"
              />
            </svg>

            {/* Kitchen Pin */}
            <div className="absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-2xl bg-slate-900 border-2 border-orange-500 shadow-lg flex items-center justify-center text-sm sm:text-lg">
                🍳
              </div>
              <span className="text-[9px] sm:text-[10px] font-bold text-slate-300 mt-1 bg-slate-900/80 px-1.5 py-0.5 rounded">
                Restaurant
              </span>
            </div>

            {/* Live Moving Scooter */}
            <div 
              className="absolute top-1/2 -translate-y-1/2 transition-all duration-700 ease-out z-10 flex flex-col items-center"
              style={{ left: `calc(${8 + (progressPercent * 0.74)}%)` }}
            >
              <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-2xl bg-orange-500 text-white shadow-xl shadow-orange-500/50 flex items-center justify-center border-2 border-white animate-bounce">
                <Bike className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <span className="text-[9px] sm:text-[10px] font-extrabold text-orange-400 mt-0.5 bg-black/80 px-1.5 py-0.5 rounded-full border border-orange-500/30 whitespace-nowrap">
                Marcus (En Route)
              </span>
            </div>

            {/* Verified Device Customer GPS Pin with Radar Ping */}
            <div className="absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 flex flex-col items-center z-10">
              <div className="relative flex items-center justify-center">
                <span className="w-10 h-10 rounded-full bg-emerald-500/30 animate-ping absolute" />
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-2xl bg-slate-900 border-2 border-emerald-400 shadow-lg flex items-center justify-center text-sm sm:text-lg text-emerald-400 relative z-10">
                  <Smartphone className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
              </div>
              <span className="text-[9px] sm:text-[10px] font-extrabold text-emerald-300 mt-1 bg-slate-900/90 px-2 py-0.5 rounded-full border border-emerald-500/40 whitespace-nowrap flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Verified Device GPS
              </span>
            </div>
          </div>

          {/* Stepper Timeline */}
          <div className="p-3.5 sm:p-5 rounded-3xl bg-slate-50 border border-slate-200/80">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-3">
              {statuses.map((step, idx) => {
                const Icon = step.icon;
                const isPassed = idx <= currentStatusIndex;
                const isCurrent = idx === currentStatusIndex;
                return (
                  <div key={step.key} className="flex flex-col items-center text-center">
                    <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-2xl flex items-center justify-center transition-all ${
                      isPassed
                        ? 'bg-orange-500 text-white shadow-md shadow-orange-500/30 scale-105'
                        : 'bg-slate-200 text-slate-400'
                    }`}>
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <span className={`text-[11px] sm:text-xs font-extrabold mt-1.5 ${
                      isCurrent ? 'text-orange-600' : isPassed ? 'text-slate-900' : 'text-slate-400'
                    }`}>
                      {step.title}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Courier Driver Card with Anti-Fraud Nav info */}
          <div className="p-3.5 sm:p-4 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-3">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
                <img
                  src={MOCK_DRIVER.avatar}
                  alt={MOCK_DRIVER.name}
                  className="w-11 h-11 sm:w-13 sm:h-13 rounded-2xl object-cover border-2 border-orange-500/30 shrink-0"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 truncate">{MOCK_DRIVER.name}</h4>
                    <span className="flex items-center gap-0.5 bg-amber-100 text-amber-900 text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded-md shrink-0">
                      <Star className="w-2.5 h-2.5 fill-amber-500 text-amber-500" />
                      {MOCK_DRIVER.rating}
                    </span>
                  </div>
                  <p className="text-[11px] sm:text-xs text-slate-500 truncate">{MOCK_DRIVER.vehicle}</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5 shrink-0">
                <button 
                  onClick={() => alert(`Calling Marcus at ${MOCK_DRIVER.phone}...`)}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-600 flex items-center justify-center transition active:scale-95 cursor-pointer"
                  title="Call Driver"
                >
                  <Phone className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => alert(`Opening live chat with Marcus...`)}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-orange-50 hover:bg-orange-100 text-orange-600 flex items-center justify-center transition active:scale-95 cursor-pointer"
                  title="Message Driver"
                >
                  <MessageSquare className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200/70 text-[11px] text-slate-600 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>
                <strong>Zero-Fraud Guarantee:</strong> Marcus receives your encrypted device GPS coordinates directly, eliminating fake delivery disputes.
              </span>
            </div>
          </div>

          {/* Ordered items recap */}
          <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
            <div className="flex items-center justify-between mb-1.5">
              <h4 className="font-extrabold text-slate-900 uppercase tracking-wide text-[10px] sm:text-[11px]">
                Order Items ({order.items.length})
              </h4>
              {order.customerPhone && (
                <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Verified: {order.customerPhone}
                </span>
              )}
            </div>
            <div className="space-y-1 text-slate-600">
              {order.items.map((it, i) => (
                <div key={i} className="flex justify-between items-center text-[11px] sm:text-xs">
                  <span className="font-medium truncate max-w-[220px] sm:max-w-[280px]">
                    {it.quantity}x {it.name}
                  </span>
                  <span className="font-bold text-slate-900">
                    {formatCurrency(it.price * it.quantity, orderCurrency)}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-3.5 sm:p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
          <span className="text-[11px] sm:text-xs text-slate-500 truncate max-w-[200px] sm:max-w-none">
            Delivery to: <strong className="text-slate-800">{order.address.street}</strong>
          </span>
          <button
            onClick={onClose}
            className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
