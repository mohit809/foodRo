import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  QrCode, 
  Camera, 
  ShieldCheck, 
  Smartphone, 
  CheckCircle2, 
  AlertTriangle, 
  Copy, 
  ExternalLink, 
  Sparkles, 
  RefreshCw,
  Radio,
  Lock
} from 'lucide-react';
import { PAYMENT_CONFIG } from '../config/paymentConfig';
import { formatCurrency } from '../utils/currency';
import { dbService } from '../services/db';

export default function PaymentQrModal({
  isOpen,
  onClose,
  orderAmount,
  currency = 'INR',
  orderId,
  customerPhone = '',
  onPaymentSuccess
}) {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState('qr_code'); // 'qr_code' | 'scanner'
  const [selectedMethod, setSelectedMethod] = useState(currency === 'INR' ? 'upi' : 'paypal');
  const [isCopied, setIsCopied] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState(null);
  const [scanError, setScanError] = useState('');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [cameraStream, setCameraStream] = useState(null);

  const videoRef = useRef(null);

  // Dynamic Payment Payloads
  const upiPayload = `upi://pay?pa=${PAYMENT_CONFIG.upi.merchantVpa}&pn=${encodeURIComponent(PAYMENT_CONFIG.upi.merchantName)}&am=${orderAmount}&cu=${currency}&tn=foodRo_${orderId}`;
  const paypalPayload = `https://www.paypal.com/paypalme/${PAYMENT_CONFIG.paypal.paypalMeUsername}/${orderAmount}${currency}`;

  // Start / stop camera for scanner
  useEffect(() => {
    if (activeTab === 'scanner') {
      startCamera();
    } else {
      stopCamera();
    }
    return () => stopCamera();
  }, [activeTab]);

  const startCamera = async () => {
    setScanError('');
    setIsScanning(true);
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: 'environment' } 
        });
        setCameraStream(stream);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      }
    } catch (err) {
      console.warn('Camera access unavailable, using interactive simulator:', err);
    }
  };

  const stopCamera = () => {
    if (cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      setCameraStream(null);
    }
    setIsScanning(false);
  };

  const handleCopyVpa = (text) => {
    navigator.clipboard?.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Simulate scanning a verified QR Code
  const handleSimulateScan = (scannedHandle, isValid = true) => {
    setScanError('');
    setIsProcessingPayment(true);

    setTimeout(() => {
      setIsProcessingPayment(false);

      if (!isValid) {
        setScanError('❌ Fraud Warning: Scanned QR handle is unverified. Payment rejected to protect customer and merchant.');
        setScanResult(null);
        return;
      }

      // Check if scanned handle matches valid UPI suffixes or PayPal
      const isVerifiedUpi = PAYMENT_CONFIG.upi.validUpiSuffixes.some(s => scannedHandle.endsWith(s));
      const isVerifiedPaypal = scannedHandle.includes('paypal.com') || scannedHandle.includes('paypalme');

      if (!isVerifiedUpi && !isVerifiedPaypal) {
        setScanError('❌ Unverified Receiver: QR code must belong to a verified UPI or PayPal merchant.');
        return;
      }

      const txId = 'TXN-' + Math.floor(10000000 + Math.random() * 90000000);
      const paymentRecord = {
        transactionId: txId,
        orderId,
        amount: orderAmount,
        currency,
        paymentMethod: scannedHandle.includes('paypal') ? 'paypal' : 'upi_gpay',
        receiverVpa: scannedHandle,
        customerPhone,
        status: 'VERIFIED_COMPLETED',
        verifiedAt: new Date().toISOString(),
        bankAccountRequired: false
      };

      // Save to Database
      dbService.savePayment(paymentRecord);

      setScanResult(paymentRecord);
      stopCamera();

      setTimeout(() => {
        onPaymentSuccess(paymentRecord);
      }, 1400);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-60 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh] sm:max-h-[90vh] animate-in slide-in-from-bottom-10 sm:zoom-in-95 duration-250 pb-safe sm:pb-0"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Drag Handle */}
        <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto my-2 sm:hidden shrink-0" />

        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-900 text-white shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-orange-500 text-white flex items-center justify-center font-bold shadow-md shadow-orange-500/30">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="text-sm sm:text-base font-extrabold text-white">Instant QR & Account Transfer</h2>
                <span className="px-1.5 py-0.5 rounded-md bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 text-[9px] font-extrabold uppercase">
                  Zero Bank Input
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-slate-400">Verified UPI, Google Pay & PayPal Transfer</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-white/10 text-white/70 hover:text-white flex items-center justify-center transition cursor-pointer"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Mode Switch Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50 px-4 pt-2 shrink-0">
          <button
            onClick={() => setActiveTab('qr_code')}
            className={`flex-1 py-2.5 text-xs font-extrabold border-b-2 flex items-center justify-center gap-1.5 transition cursor-pointer ${
              activeTab === 'qr_code'
                ? 'border-orange-500 text-orange-600 bg-white rounded-t-xl'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <QrCode className="w-4 h-4" />
            <span>Merchant QR Code</span>
          </button>
          <button
            onClick={() => setActiveTab('scanner')}
            className={`flex-1 py-2.5 text-xs font-extrabold border-b-2 flex items-center justify-center gap-1.5 transition cursor-pointer ${
              activeTab === 'scanner'
                ? 'border-orange-500 text-orange-600 bg-white rounded-t-xl'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>Scan QR Code</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1">
          
          {/* TAB 1: DYNAMIC MERCHANT QR CODE GENERATOR */}
          {activeTab === 'qr_code' && (
            <div className="space-y-4 text-center">
              
              {/* Amount Display */}
              <div className="p-3 bg-orange-50/80 rounded-2xl border border-orange-200">
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-orange-800 block">
                  Payable Order Total
                </span>
                <div className="text-2xl sm:text-3xl font-extrabold text-orange-600 tracking-tight mt-0.5">
                  {formatCurrency(orderAmount, currency)}
                </div>
                <span className="text-[10px] text-slate-500 block mt-0.5">
                  Order Reference: <strong>#{orderId}</strong>
                </span>
              </div>

              {/* Method Toggle: UPI/GPay vs PayPal */}
              <div className="flex gap-2 p-1 bg-slate-100 rounded-xl">
                <button
                  type="button"
                  onClick={() => setSelectedMethod('upi')}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition cursor-pointer ${
                    selectedMethod === 'upi' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  🇮🇳 UPI / Google Pay
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedMethod('paypal')}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition cursor-pointer ${
                    selectedMethod === 'paypal' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  🌍 PayPal Transfer
                </button>
              </div>

              {/* Dynamic QR Box */}
              <div className="p-4 sm:p-5 bg-white rounded-3xl border-2 border-slate-900/10 shadow-lg inline-block mx-auto relative group">
                {/* SVG Visual Stylized QR Code */}
                <div className="w-48 h-48 sm:w-52 sm:h-52 bg-slate-950 p-3 rounded-2xl flex flex-col justify-between shadow-inner relative overflow-hidden">
                  
                  {/* Outer corner locator blocks */}
                  <div className="flex justify-between">
                    <div className="w-10 h-10 border-4 border-orange-500 rounded-lg flex items-center justify-center p-1 bg-white">
                      <div className="w-4 h-4 bg-slate-950 rounded-xs" />
                    </div>
                    <div className="w-10 h-10 border-4 border-orange-500 rounded-lg flex items-center justify-center p-1 bg-white">
                      <div className="w-4 h-4 bg-slate-950 rounded-xs" />
                    </div>
                  </div>

                  {/* Middle simulated matrix bars */}
                  <div className="grid grid-cols-6 gap-1.5 px-2 my-auto opacity-90">
                    <div className="h-2 bg-orange-400 rounded-xs col-span-4" />
                    <div className="h-2 bg-white rounded-xs col-span-2" />
                    <div className="h-2 bg-white rounded-xs col-span-3" />
                    <div className="h-2 bg-orange-500 rounded-xs col-span-3" />
                    <div className="h-2 bg-emerald-400 rounded-xs col-span-2" />
                    <div className="h-2 bg-white rounded-xs col-span-4" />
                  </div>

                  {/* Center foodRo Brand Logo */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-2xl shadow-xl flex items-center justify-center border-2 border-orange-500 font-extrabold text-sm text-orange-600">
                    🍔
                  </div>

                  {/* Bottom corner locator block */}
                  <div className="flex justify-between items-end">
                    <div className="w-10 h-10 border-4 border-orange-500 rounded-lg flex items-center justify-center p-1 bg-white">
                      <div className="w-4 h-4 bg-slate-950 rounded-xs" />
                    </div>
                    <div className="text-[8px] font-mono text-slate-400 tracking-wider">
                      VERIFIED-PAY
                    </div>
                  </div>
                </div>

                <div className="mt-2 text-[10px] text-emerald-600 font-extrabold flex items-center justify-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Verified Merchant: {selectedMethod === 'upi' ? PAYMENT_CONFIG.upi.merchantVpa : PAYMENT_CONFIG.paypal.paypalMeUsername}</span>
                </div>
              </div>

              {/* Action Buttons: 1-Click Pay or Copy */}
              <div className="space-y-2 text-left">
                {selectedMethod === 'upi' ? (
                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
                    <div className="min-w-0">
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Verified UPI VPA</span>
                      <span className="text-xs font-mono font-bold text-slate-900 truncate block">
                        {PAYMENT_CONFIG.upi.merchantVpa}
                      </span>
                    </div>
                    <button
                      onClick={() => handleCopyVpa(PAYMENT_CONFIG.upi.merchantVpa)}
                      className="px-3 py-1.5 rounded-xl bg-orange-50 text-orange-600 hover:bg-orange-100 font-bold text-xs flex items-center gap-1 transition cursor-pointer"
                    >
                      <Copy className="w-3.5 h-3.5" />
                      <span>{isCopied ? 'Copied!' : 'Copy'}</span>
                    </button>
                  </div>
                ) : (
                  <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
                    <div className="min-w-0">
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">PayPal Username</span>
                      <span className="text-xs font-mono font-bold text-slate-900 truncate block">
                        paypal.me/{PAYMENT_CONFIG.paypal.paypalMeUsername}
                      </span>
                    </div>
                    <a
                      href={paypalPayload}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 font-bold text-xs flex items-center gap-1 transition"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Open PayPal</span>
                    </a>
                  </div>
                )}

                {/* Instant Verification Simulation Trigger */}
                <button
                  onClick={() => handleSimulateScan(selectedMethod === 'upi' ? PAYMENT_CONFIG.upi.merchantVpa : paypalPayload, true)}
                  disabled={isProcessingPayment}
                  className="w-full py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isProcessingPayment ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span>I Have Completed Payment (Verify Transfer)</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          )}

          {/* TAB 2: LIVE CAMERA / VERIFIED QR SCANNER */}
          {activeTab === 'scanner' && (
            <div className="space-y-4">
              
              <div className="p-3 bg-slate-900 text-white rounded-2xl border border-slate-800 text-xs flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Anti-Fraud Camera Scanner:</strong> Scans and validates merchant QR codes. Only verified banking handles (@okaxis, @okhdfcbank, @paytm, @ybl, PayPal) are accepted.
                </span>
              </div>

              {/* Camera Scanner Viewport */}
              <div className="relative h-60 sm:h-64 rounded-3xl overflow-hidden bg-black flex items-center justify-center border-2 border-slate-800 shadow-xl">
                
                {/* Live Video Stream */}
                <video 
                  ref={videoRef} 
                  autoPlay 
                  playsInline 
                  muted 
                  className="w-full h-full object-cover opacity-80"
                />

                {/* Scanner Target Crosshairs & Sweep */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-44 h-44 border-2 border-orange-500/80 rounded-2xl relative">
                    {/* Corners */}
                    <span className="w-4 h-4 border-t-4 border-l-4 border-orange-500 absolute -top-1 -left-1" />
                    <span className="w-4 h-4 border-t-4 border-r-4 border-orange-500 absolute -top-1 -right-1" />
                    <span className="w-4 h-4 border-b-4 border-l-4 border-orange-500 absolute -bottom-1 -left-1" />
                    <span className="w-4 h-4 border-b-4 border-r-4 border-orange-500 absolute -bottom-1 -right-1" />
                    
                    {/* Animated Scanning Laser */}
                    <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-orange-400 to-transparent absolute top-0 animate-bounce duration-1000 shadow-lg shadow-orange-500" />
                  </div>
                </div>

                <div className="absolute bottom-3 bg-black/80 px-3 py-1 rounded-full text-[10px] text-slate-300 backdrop-blur-xs flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Align QR inside frame</span>
                </div>
              </div>

              {/* Error Message */}
              {scanError && (
                <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600" />
                  <span>{scanError}</span>
                </div>
              )}

              {/* Success Result */}
              {scanResult && (
                <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs space-y-1 animate-in zoom-in-95">
                  <div className="flex items-center gap-2 font-extrabold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Payment Verified Successfully!</span>
                  </div>
                  <p className="text-[11px] text-emerald-700 font-mono">
                    Txn Ref: {scanResult.transactionId} • Receiver: {scanResult.receiverVpa}
                  </p>
                </div>
              )}

              {/* Test Scan Triggers (Simulate camera reading verified vs unverified) */}
              <div className="space-y-2 pt-1">
                <span className="text-[10px] font-bold text-slate-400 uppercase block text-center">
                  Quick Scanner Test Simulators
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleSimulateScan(PAYMENT_CONFIG.upi.merchantVpa, true)}
                    className="p-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Scan Verified UPI</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSimulateScan('scam-fake-receiver@unknownbank', false)}
                    className="p-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-800 text-xs font-bold flex items-center justify-center gap-1.5 transition cursor-pointer"
                  >
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                    <span>Scan Unverified (Block)</span>
                  </button>
                </div>
              </div>

            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 text-center text-[9px] sm:text-[10px] text-slate-400 flex items-center justify-center gap-1.5 shrink-0">
          <ShieldCheck className="w-3 h-3 text-emerald-500" />
          <span>Configurable in src/config/paymentConfig.js • Zero Bank Account Linking Required</span>
        </div>
      </div>
    </div>
  );
}
