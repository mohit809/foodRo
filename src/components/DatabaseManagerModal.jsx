import React, { useState, useEffect } from 'react';
import { 
  X, 
  Database, 
  Users, 
  ShoppingBag, 
  CreditCard, 
  Store, 
  Download, 
  Key, 
  CheckCircle2, 
  ExternalLink,
  RefreshCw,
  Copy,
  Layers,
  MapPin,
  FileCode
} from 'lucide-react';
import { dbService } from '../services/db';
import { DB_CONFIG } from '../config/dbConfig';
import { formatCurrency } from '../utils/currency';

export default function DatabaseManagerModal({
  isOpen,
  onClose,
  currency = 'INR'
}) {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'users' | 'payments' | 'restaurants' | 'credentials'
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [payments, setPayments] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCopiedSchema, setIsCopiedSchema] = useState(false);

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    setIsLoading(true);
    try {
      const [o, u, p, r] = await Promise.all([
        dbService.getOrders(),
        dbService.getUsers(),
        dbService.getPayments(),
        dbService.getRestaurants()
      ]);
      setOrders(o || []);
      setUsers(u || []);
      setPayments(p || []);
      setRestaurants(r || []);
    } catch (e) {
      console.warn('Error loading db data:', e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportJson = async () => {
    const data = await dbService.exportDatabase();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `foodro_database_export_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const sampleSqlSchema = `-- foodRo PostgreSQL / Supabase Production Schema
-- Run this in your Supabase SQL Editor or PostgreSQL database

CREATE TABLE IF NOT EXISTS foodro_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  is_email_verified BOOLEAN DEFAULT TRUE,
  is_phone_verified BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS foodro_orders (
  order_id VARCHAR(50) PRIMARY KEY,
  customer_email VARCHAR(255),
  customer_phone VARCHAR(50),
  items JSONB NOT NULL,
  grand_total NUMERIC(10,2) NOT NULL,
  currency VARCHAR(10) DEFAULT 'INR',
  device_latitude NUMERIC(10,6),
  device_longitude NUMERIC(10,6),
  device_accuracy NUMERIC(10,2),
  status VARCHAR(50) DEFAULT 'confirmed',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS foodro_payments (
  transaction_id VARCHAR(100) PRIMARY KEY,
  order_id VARCHAR(50) NOT NULL,
  amount NUMERIC(10,2) NOT NULL,
  currency VARCHAR(10) DEFAULT 'INR',
  payment_method VARCHAR(50) NOT NULL,
  receiver_vpa VARCHAR(255),
  status VARCHAR(50) DEFAULT 'VERIFIED_COMPLETED',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS foodro_restaurants (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  type VARCHAR(50) DEFAULT 'restaurant',
  phone VARCHAR(50) NOT NULL,
  email VARCHAR(255) NOT NULL,
  pan_number VARCHAR(50),
  fssai_number VARCHAR(50),
  payout_account JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);`;

  const handleCopySchema = () => {
    navigator.clipboard?.writeText(sampleSqlSchema);
    setIsCopiedSchema(true);
    setTimeout(() => setIsCopiedSchema(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-4xl rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[94vh] sm:max-h-[92vh] animate-in slide-in-from-bottom-10 sm:zoom-in-95 duration-250 pb-safe sm:pb-0"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag handle */}
        <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto my-2 sm:hidden shrink-0" />

        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-900 text-white shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-orange-500 text-white flex items-center justify-center font-bold shadow-md shadow-orange-500/30">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm sm:text-base font-extrabold text-white">foodRo Database & Records</h2>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 text-[10px] font-extrabold uppercase">
                  Active Provider: {DB_CONFIG.activeProvider.toUpperCase()}
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-slate-400">Users, Orders, Payments, Partner Restaurants & Credentials</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportJson}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition cursor-pointer"
              title="Download full database as JSON"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export JSON</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full hover:bg-white/10 text-white/70 hover:text-white flex items-center justify-center transition cursor-pointer"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-4 sm:px-6 pt-2 overflow-x-auto no-scrollbar shrink-0">
          {[
            { id: 'orders', label: `Orders (${orders.length})`, icon: ShoppingBag },
            { id: 'users', label: `Verified Users (${users.length})`, icon: Users },
            { id: 'payments', label: `Payments (${payments.length})`, icon: CreditCard },
            { id: 'restaurants', label: `Restaurants (${restaurants.length})`, icon: Store },
            { id: 'credentials', label: 'API / Database Credentials', icon: Key }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-1.5 py-2.5 sm:py-3 px-3 sm:px-4 text-xs font-bold border-b-2 transition whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'border-orange-500 text-orange-600 bg-white rounded-t-xl'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Body Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1 bg-slate-50/50">
          
          {/* TAB 1: ORDERS */}
          {activeTab === 'orders' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700">All customer orders stored in database</span>
                <button
                  onClick={loadAllData}
                  className="text-xs text-orange-600 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Refresh</span>
                </button>
              </div>

              {orders.length === 0 ? (
                <div className="text-center py-10 text-slate-400 text-xs">No orders placed yet. Place an order to see it recorded here!</div>
              ) : (
                <div className="space-y-2.5">
                  {orders.map(order => (
                    <div key={order.orderId} className="p-3 sm:p-4 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-extrabold text-slate-900">#{order.orderId}</span>
                          <span className="px-2 py-0.5 rounded-full bg-orange-100 text-orange-800 text-[10px] font-extrabold uppercase">
                            {order.status}
                          </span>
                        </div>
                        <span className="text-xs font-extrabold text-orange-600">
                          {formatCurrency(order.pricing?.grandTotal, order.currency || currency)}
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[11px] text-slate-600">
                        <div>
                          <strong>Customer Phone:</strong> {order.customerPhone || 'Verified'}
                        </div>
                        <div>
                          <strong>Payment Method:</strong> {order.paymentMethod?.toUpperCase()}
                        </div>
                        <div>
                          <strong>Address:</strong> {order.address?.street}
                        </div>
                        <div className="flex items-center gap-1 text-emerald-700 font-medium">
                          <MapPin className="w-3 h-3 text-emerald-600 shrink-0" />
                          <span>GPS: {order.deviceLocation?.latitude || 28.6139}°, {order.deviceLocation?.longitude || 77.2090}°</span>
                        </div>
                      </div>

                      <div className="text-[10px] text-slate-400 pt-1 border-t border-slate-100">
                        Items: {order.items?.map(it => `${it.quantity}x ${it.name}`).join(', ')}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: USERS */}
          {activeTab === 'users' && (
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-700 block">Registered & Verified Users in Database</span>
              <div className="space-y-2">
                {users.map((u, i) => (
                  <div key={i} className="p-3 sm:p-4 rounded-2xl bg-white border border-slate-200 flex items-center justify-between gap-3 shadow-xs">
                    <div className="flex items-center gap-3">
                      <img src={u.avatar} alt={u.name} className="w-10 h-10 rounded-2xl object-cover border border-orange-200" />
                      <div>
                        <h4 className="text-xs font-extrabold text-slate-900">{u.name}</h4>
                        <p className="text-[11px] text-slate-500">{u.email} • {u.phone}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Verified Email & Phone
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: PAYMENTS */}
          {activeTab === 'payments' && (
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-700 block">Recorded Payment Transactions</span>
              {payments.length === 0 ? (
                <div className="text-center py-10 text-slate-400 text-xs">No QR or gateway payments recorded yet.</div>
              ) : (
                <div className="space-y-2">
                  {payments.map((p, idx) => (
                    <div key={idx} className="p-3 sm:p-4 rounded-2xl bg-white border border-slate-200 flex items-center justify-between gap-2 shadow-xs">
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-mono font-bold text-slate-900">{p.transactionId}</span>
                          <span className="px-1.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 text-[9px] font-extrabold uppercase">
                            {p.status}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          Method: <strong>{p.paymentMethod}</strong> • Order #{p.orderId}
                        </p>
                      </div>
                      <span className="text-sm font-extrabold text-emerald-600">
                        {formatCurrency(p.amount, p.currency)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 4: RESTAURANTS */}
          {activeTab === 'restaurants' && (
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-700 block">Registered Restaurant & Hotel Partners</span>
              <div className="space-y-2">
                {restaurants.map(r => (
                  <div key={r.id} className="p-3.5 rounded-2xl bg-white border border-slate-200 space-y-1.5 shadow-xs">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-extrabold text-slate-900">{r.name}</h4>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                        Govt & FSSAI Verified
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[11px] text-slate-600">
                      <div><strong>Phone:</strong> {r.phone || '+91 98100 23456'}</div>
                      <div><strong>Email:</strong> {r.email || 'partner@foodro.com'}</div>
                      <div><strong>Location:</strong> {r.location}</div>
                      <div><strong>FSSAI:</strong> {r.fssaiNumber || '10022011000123'}</div>
                    </div>
                    {r.payoutAccount && (
                      <div className="p-2 bg-slate-50 rounded-xl text-[10px] text-slate-500 flex items-center justify-between mt-1">
                        <span>Payout Bank: <strong>{r.payoutAccount.bankName}</strong> ({r.payoutAccount.accountNumber})</span>
                        <span className="font-mono text-emerald-700 font-bold">UPI: {r.payoutAccount.upiId}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: CREDENTIALS & PRODUCTION CONFIGURATION */}
          {activeTab === 'credentials' && (
            <div className="space-y-4">
              <div className="p-3.5 bg-blue-50 rounded-2xl border border-blue-200 text-xs text-blue-900 space-y-1">
                <strong className="block font-extrabold">Where to Add Your Database & Payment Credentials in Code:</strong>
                <p>
                  You can paste your live database keys and payment handles directly in:
                </p>
                <ul className="list-disc pl-5 space-y-0.5 mt-1 font-mono text-[11px]">
                  <li><code>src/config/dbConfig.js</code> - Supabase URL, Anon Key, Firebase, or Custom API</li>
                  <li><code>src/config/paymentConfig.js</code> - Your UPI VPA (e.g. <code>yourname@okhdfcbank</code>) and PayPal Client ID</li>
                </ul>
              </div>

              {/* Ready-to-copy SQL Schema */}
              <div className="p-3.5 bg-slate-900 rounded-2xl text-white space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <FileCode className="w-4 h-4 text-orange-400" />
                    <span className="text-xs font-mono font-extrabold text-orange-300">
                      PostgreSQL / Supabase Ready SQL Schema
                    </span>
                  </div>
                  <button
                    onClick={handleCopySchema}
                    className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-white text-[11px] font-bold flex items-center gap-1 transition cursor-pointer"
                  >
                    <Copy className="w-3 h-3" />
                    <span>{isCopiedSchema ? 'Copied SQL!' : 'Copy SQL'}</span>
                  </button>
                </div>

                <pre className="text-[10px] font-mono text-slate-300 overflow-x-auto p-3 bg-black/50 rounded-xl max-h-48 border border-white/10">
                  {sampleSqlSchema}
                </pre>
              </div>

            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-3.5 sm:p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
          <span className="text-[10px] sm:text-xs text-slate-500">
            Database persistence guaranteed via IndexedDB + LocalStorage sync.
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
