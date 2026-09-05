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
  Sparkles,
  RefreshCw,
  Navigation
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
    { key: 'confirmed', title: 'Order Confirmed', desc: 'Restaurant has accepted your order', icon: CheckCircle2 },
    { key: 'preparing', title: 'Cooking with Passion', desc: 'Master chefs are preparing your dishes', icon: ChefHat },
    { key: 'out_for_delivery', title: 'Out for Delivery', desc: 'Courier Marcus is rushing to your door', icon: Bike },
    { key: 'delivered', title: 'Delivered Fresh!', desc: 'Enjoy your foodRo meal!', icon: Home }
  ];

  const currentStatusIndex = Math.max(0, statuses.findIndex(s => s.key === order.status));

  // Simulated countdown timer in minutes & seconds
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-900 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-orange-500/20 border border-orange-500/40 text-orange-400 flex items-center justify-center">
              <Navigation className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase font-extrabold tracking-wider text-orange-400">Live Delivery</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              </div>
              <h2 className="text-base font-extrabold text-white">
                Order #{order.orderId}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleAdvanceStatus}
              title="Fast-forward order simulation"
              className="text-xs px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold flex items-center gap-1 transition cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Simulate Next Step</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full hover:bg-white/10 text-white/70 hover:text-white flex items-center justify-center transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* ETA & Status Banner */}
          <div className="p-5 rounded-3xl bg-gradient-to-br from-orange-500 via-orange-600 to-amber-600 text-white shadow-lg flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-orange-100 block mb-1">
                Estimated Delivery Time
              </span>
              <div className="text-3xl font-extrabold tracking-tight">
                {order.status === 'delivered' ? (
                  <span className="text-emerald-100">Arrived at your door!</span>
                ) : (
                  <span>{minutes} mins {seconds < 10 ? `0${seconds}` : seconds}s</span>
                )}
              </div>
              <p className="text-xs text-white/80 mt-1 font-medium">
                {statuses[currentStatusIndex].desc}
              </p>
            </div>
            
            <div className="w-16 h-16 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/20 text-3xl">
              {order.status === 'confirmed' && '📋'}
              {order.status === 'preparing' && '🍳'}
              {order.status === 'out_for_delivery' && '🛵'}
              {order.status === 'delivered' && '🎉'}
            </div>
          </div>

          {/* Interactive Simulated Route Map */}
          <div className="relative h-44 rounded-3xl overflow-hidden bg-slate-800 border border-slate-700 shadow-inner flex items-center justify-center">
            <div 
              className="absolute inset-0 opacity-15"
              style={{
                backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)',
                backgroundSize: '24px 24px'
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
            <div className="absolute left-8 top-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="w-10 h-10 rounded-2xl bg-slate-900 border-2 border-orange-500 shadow-lg flex items-center justify-center text-lg">
                🍳
              </div>
              <span className="text-[10px] font-bold text-slate-300 mt-1.5 bg-slate-900/80 px-2 py-0.5 rounded">
                Kitchen
              </span>
            </div>

            {/* Live Moving Scooter */}
            <div 
              className="absolute top-1/2 -translate-y-1/2 transition-all duration-700 ease-out z-10 flex flex-col items-center"
              style={{ left: `calc(${10 + (progressPercent * 0.75)}%)` }}
            >
              <div className="w-11 h-11 rounded-2xl bg-orange-500 text-white shadow-xl shadow-orange-500/50 flex items-center justify-center border-2 border-white animate-bounce">
                <Bike className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-extrabold text-orange-400 mt-1 bg-black/80 px-2 py-0.5 rounded-full border border-orange-500/30">
                Marcus (En Route)
              </span>
            </div>

            {/* Home Pin */}
            <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col items-center">
              <div className="w-10 h-10 rounded-2xl bg-slate-900 border-2 border-emerald-500 shadow-lg flex items-center justify-center text-lg">
                🏡
              </div>
              <span className="text-[10px] font-bold text-slate-300 mt-1.5 bg-slate-900/80 px-2 py-0.5 rounded">
                Your Address
              </span>
            </div>
          </div>

          {/* Stepper Timeline */}
          <div className="p-5 rounded-3xl bg-slate-50 border border-slate-200/80">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {statuses.map((step, idx) => {
                const Icon = step.icon;
                const isPassed = idx <= currentStatusIndex;
                const isCurrent = idx === currentStatusIndex;
                return (
                  <div key={step.key} className="flex flex-col items-center text-center">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${
                      isPassed
                        ? 'bg-orange-500 text-white shadow-md shadow-orange-500/30 scale-105'
                        : 'bg-slate-200 text-slate-400'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={`text-xs font-extrabold mt-2 ${
                      isCurrent ? 'text-orange-600' : isPassed ? 'text-slate-900' : 'text-slate-400'
                    }`}>
                      {step.title}
                    </span>
                    <span className="text-[10px] text-slate-500 mt-0.5 hidden sm:block">
                      {isPassed ? 'Completed' : 'Upcoming'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Courier Driver Card */}
          <div className="p-4 rounded-3xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <img
                src={MOCK_DRIVER.avatar}
                alt={MOCK_DRIVER.name}
                className="w-13 h-13 rounded-2xl object-cover border-2 border-orange-500/30"
              />
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="text-sm font-extrabold text-slate-900">{MOCK_DRIVER.name}</h4>
                  <span className="flex items-center gap-0.5 bg-amber-100 text-amber-900 text-[10px] font-bold px-1.5 py-0.5 rounded-md">
                    <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                    {MOCK_DRIVER.rating}
                  </span>
                </div>
                <p className="text-xs text-slate-500">{MOCK_DRIVER.vehicle}</p>
                <p className="text-[11px] text-slate-400 font-mono">Plate: {MOCK_DRIVER.plate}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={() => alert(`Calling Marcus at ${MOCK_DRIVER.phone}...`)}
                className="w-10 h-10 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-600 flex items-center justify-center transition active:scale-95 cursor-pointer"
                title="Call Driver"
              >
                <Phone className="w-4 h-4" />
              </button>
              <button 
                onClick={() => alert(`Opening chat with Marcus...`)}
                className="w-10 h-10 rounded-2xl bg-orange-50 hover:bg-orange-100 text-orange-600 flex items-center justify-center transition active:scale-95 cursor-pointer"
                title="Message Driver"
              >
                <MessageSquare className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Ordered items recap with local currency */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
            <h4 className="font-extrabold text-slate-900 mb-2 uppercase tracking-wide text-[11px]">
              Order Summary ({order.items.length} items)
            </h4>
            <div className="space-y-1.5 text-slate-600">
              {order.items.map((it, i) => (
                <div key={i} className="flex justify-between items-center">
                  <span className="font-medium truncate max-w-[280px]">
                    {it.quantity}x {it.name} {it.selectedSize ? `(${it.selectedSize.name})` : ''}
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
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            Delivering to: <strong className="text-slate-800">{order.address.street}</strong>
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs transition cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
