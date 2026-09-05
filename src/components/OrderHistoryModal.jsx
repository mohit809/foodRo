import React from 'react';
import { X, Clock, RotateCcw } from 'lucide-react';
import { formatCurrency } from '../utils/currency';

export default function OrderHistoryModal({
  isOpen,
  onClose,
  orders,
  onReorder,
  onTrackOrder,
  currency = 'INR'
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-xl rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-900">Your Past Orders</h2>
              <p className="text-xs text-slate-500">{orders.length} orders placed</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-slate-200 flex items-center justify-center text-slate-600 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {orders.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-3">🧾</div>
              <h3 className="text-base font-bold text-slate-900 mb-1">No past orders yet</h3>
              <p className="text-xs text-slate-500">Your completed foodRo orders will appear here.</p>
            </div>
          ) : (
            orders.map(order => {
              const orderCurrency = order.currency || currency;
              return (
                <div 
                  key={order.orderId}
                  className="p-4 rounded-2xl border border-slate-200/90 hover:border-orange-300 bg-white transition space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-mono font-extrabold text-xs text-slate-900">
                        Order #{order.orderId}
                      </span>
                      <span className="block text-[11px] text-slate-400">
                        {new Date(order.createdAt).toLocaleString()}
                      </span>
                    </div>

                    <span className={`text-[11px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                      order.status === 'delivered'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {order.status.replace('_', ' ')}
                    </span>
                  </div>

                  <div className="text-xs text-slate-600 space-y-1 py-1 border-y border-slate-100">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center">
                        <span className="truncate max-w-[280px]">
                          {item.quantity}x {item.name}
                        </span>
                        <span className="font-semibold text-slate-800">
                          {formatCurrency(item.price * item.quantity, orderCurrency)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <div>
                      <span className="text-[11px] text-slate-400 font-medium">Total Paid</span>
                      <div className="text-sm font-extrabold text-slate-900">
                        {formatCurrency(order.pricing.grandTotal, orderCurrency)}
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          onTrackOrder(order);
                          onClose();
                        }}
                        className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs transition cursor-pointer"
                      >
                        Track
                      </button>
                      <button
                        onClick={() => {
                          onReorder(order.items);
                          onClose();
                        }}
                        className="px-3 py-1.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs flex items-center gap-1.5 transition shadow-xs cursor-pointer"
                      >
                        <RotateCcw className="w-3 h-3" />
                        <span>Reorder</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
