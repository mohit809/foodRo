import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  ShieldCheck, 
  Lock, 
  Smartphone, 
  KeyRound, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  RefreshCw,
  AlertCircle
} from 'lucide-react';

export default function AuthModal({
  isOpen,
  onClose,
  onLoginSuccess
}) {
  if (!isOpen) return null;

  const [step, setStep] = useState(1);
  const [phoneOrEmail, setPhoneOrEmail] = useState('+91 98765 43210');
  const [userName, setUserName] = useState('Mohit Kumar');
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const [pinDigits, setPinDigits] = useState(['', '', '', '']);
  const [simulatedOtp, setSimulatedOtp] = useState('');
  const [resendTimer, setResendTimer] = useState(30);
  const [errorMsg, setErrorMsg] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const otpInputRefs = useRef([]);
  const pinInputRefs = useRef([]);

  useEffect(() => {
    let interval;
    if (step === 2 && resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [step, resendTimer]);

  const handleSendOtp = () => {
    if (!phoneOrEmail.trim()) {
      setErrorMsg('Please enter a valid mobile number or email address');
      return;
    }
    setErrorMsg('');
    setIsProcessing(true);

    const generated = Math.floor(100000 + Math.random() * 900000).toString();
    setSimulatedOtp(generated);

    setTimeout(() => {
      setIsProcessing(false);
      setStep(2);
      setResendTimer(30);
      setOtpDigits(['', '', '', '', '', '']);
      setTimeout(() => {
        otpInputRefs.current[0]?.focus();
      }, 100);
    }, 600);
  };

  const handleOtpChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newDigits = [...otpDigits];
    newDigits[index] = value.slice(-1);
    setOtpDigits(newDigits);
    setErrorMsg('');

    if (value && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOtp = () => {
    const entered = otpDigits.join('');
    if (entered.length < 6) {
      setErrorMsg('Please enter all 6 digits of the OTP.');
      return;
    }
    if (entered !== simulatedOtp) {
      setErrorMsg(`Incorrect OTP. Please enter ${simulatedOtp} to continue.`);
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep(3);
      setTimeout(() => {
        pinInputRefs.current[0]?.focus();
      }, 100);
    }, 500);
  };

  const handlePinChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;
    const newPin = [...pinDigits];
    newPin[index] = value.slice(-1);
    setPinDigits(newPin);
    setErrorMsg('');

    if (value && index < 3) {
      pinInputRefs.current[index + 1]?.focus();
    }
  };

  const handlePinKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !pinDigits[index] && index > 0) {
      pinInputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyPin = () => {
    const entered = pinDigits.join('');
    if (entered.length < 4) {
      setErrorMsg('Please enter your 4-digit security PIN.');
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep(4);

      const userProfile = {
        name: userName || 'Foodie Member',
        phone: phoneOrEmail,
        isVerified: true,
        twoFactorEnabled: true,
        memberSince: '2026',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'
      };

      setTimeout(() => {
        onLoginSuccess(userProfile);
        onClose();
      }, 1200);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      
      {/* Simulated Live SMS Notification Banner */}
      {step === 2 && simulatedOtp && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-60 bg-slate-900/95 text-white px-4 py-3 rounded-2xl shadow-2xl border border-orange-500/40 flex items-center gap-2.5 animate-in slide-in-from-top-4 duration-300 max-w-md w-11/12">
          <div className="w-8 h-8 rounded-xl bg-orange-500 flex items-center justify-center text-white shrink-0">
            <Smartphone className="w-4 h-4" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-wider font-extrabold text-orange-400">foodRo Security SMS</span>
              <span className="text-[10px] text-slate-400">Just now</span>
            </div>
            <p className="text-xs text-slate-200 mt-0.5 truncate">
              Your verification code is <strong className="text-white font-mono text-sm tracking-wider px-1 bg-white/10 rounded">{simulatedOtp}</strong>
            </p>
          </div>
        </div>
      )}

      <div 
        className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl overflow-hidden shadow-2xl flex flex-col animate-in slide-in-from-bottom-10 sm:zoom-in-95 duration-250 pb-safe sm:pb-0"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Drag Handle */}
        <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto my-2 sm:hidden shrink-0" />

        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/80 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-orange-500 text-white flex items-center justify-center shadow-md shadow-orange-500/30">
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-extrabold text-slate-900">Secure Sign In</h2>
              <p className="text-[10px] sm:text-[11px] text-emerald-600 font-bold flex items-center gap-1">
                <Lock className="w-3 h-3" />
                256-bit 2-Step Verification
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-slate-200 flex items-center justify-center text-slate-500 transition cursor-pointer"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-4 sm:space-y-5 overflow-y-auto">
          
          {/* Stepper Progress */}
          <div className="flex items-center justify-between px-2">
            {[
              { num: 1, label: 'Identity' },
              { num: 2, label: 'OTP' },
              { num: 3, label: '2-Step PIN' }
            ].map(s => (
              <div key={s.num} className="flex items-center gap-1.5">
                <div className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-[11px] font-bold transition-all ${
                  step === s.num
                    ? 'bg-orange-500 text-white shadow-md shadow-orange-500/40 scale-105'
                    : step > s.num
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-100 text-slate-400'
                }`}>
                  {step > s.num ? <CheckCircle2 className="w-3.5 h-3.5" /> : s.num}
                </div>
                <span className={`text-[10px] sm:text-[11px] font-bold ${
                  step === s.num ? 'text-slate-900' : 'text-slate-400'
                }`}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>

          {/* STEP 1: Phone / Name */}
          {step === 1 && (
            <div className="space-y-3.5 pt-1">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wide mb-1">
                  Your Full Name
                </label>
                <input
                  type="text"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full p-2.5 sm:p-3 rounded-2xl border border-slate-200 focus:border-orange-500 text-xs sm:text-sm font-semibold text-slate-800 outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wide mb-1">
                  Mobile Number / Email Address
                </label>
                <div className="relative">
                  <Smartphone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={phoneOrEmail}
                    onChange={(e) => setPhoneOrEmail(e.target.value)}
                    placeholder="+91 98765 43210 or email@domain.com"
                    className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-2xl border border-slate-200 focus:border-orange-500 text-xs sm:text-sm font-semibold text-slate-800 outline-none"
                  />
                </div>
                <p className="text-[10px] text-slate-400 mt-1">
                  We'll send a 6-digit One Time Password (OTP) for verification.
                </p>
              </div>

              {errorMsg && (
                <div className="p-2.5 rounded-xl bg-rose-50 text-rose-600 text-xs font-medium flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <button
                onClick={handleSendOtp}
                disabled={isProcessing}
                className="w-full py-3.5 rounded-2xl bg-orange-500 hover:bg-orange-600 active:scale-98 text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-orange-500/30 flex items-center justify-center gap-2 transition disabled:opacity-50 cursor-pointer"
              >
                {isProcessing ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Send Verification OTP</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          )}

          {/* STEP 2: 6-Digit OTP */}
          {step === 2 && (
            <div className="space-y-3.5 pt-1">
              <div className="text-center">
                <h3 className="text-sm sm:text-base font-extrabold text-slate-900">Enter 6-Digit OTP</h3>
                <p className="text-[11px] text-slate-500 mt-0.5 truncate">
                  Sent to <strong className="text-slate-800">{phoneOrEmail}</strong>
                </p>
              </div>

              <div className="flex justify-center gap-1.5 sm:gap-2">
                {otpDigits.map((digit, index) => (
                  <input
                    key={index}
                    ref={el => otpInputRefs.current[index] = el}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    className="w-10 sm:w-12 h-12 sm:h-13 text-center text-lg sm:text-xl font-mono font-extrabold rounded-2xl border-2 border-slate-200 focus:border-orange-500 text-slate-900 outline-none transition"
                  />
                ))}
              </div>

              <div className="flex items-center justify-between text-[11px] px-1">
                <button
                  onClick={() => {
                    const digits = simulatedOtp.split('');
                    setOtpDigits(digits);
                    setErrorMsg('');
                  }}
                  className="text-orange-600 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Auto-fill ({simulatedOtp})</span>
                </button>

                {resendTimer > 0 ? (
                  <span className="text-slate-400">Resend in {resendTimer}s</span>
                ) : (
                  <button
                    onClick={handleSendOtp}
                    className="text-slate-700 font-bold hover:text-orange-600 flex items-center gap-1 cursor-pointer"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Resend OTP</span>
                  </button>
                )}
              </div>

              {errorMsg && (
                <div className="p-2.5 rounded-xl bg-rose-50 text-rose-600 text-xs font-medium flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <button
                onClick={handleVerifyOtp}
                disabled={isProcessing}
                className="w-full py-3.5 rounded-2xl bg-orange-500 hover:bg-orange-600 active:scale-98 text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-orange-500/30 flex items-center justify-center gap-2 transition disabled:opacity-50 cursor-pointer"
              >
                {isProcessing ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Verify OTP</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          )}

          {/* STEP 3: 2-Step PIN */}
          {step === 3 && (
            <div className="space-y-3.5 pt-1">
              <div className="text-center">
                <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto mb-1.5">
                  <KeyRound className="w-5 h-5" />
                </div>
                <h3 className="text-sm sm:text-base font-extrabold text-slate-900">Two-Step Verification</h3>
                <p className="text-[11px] text-slate-500 max-w-xs mx-auto">
                  Enter your 4-digit foodRo security PIN to unlock account.
                </p>
              </div>

              <div className="flex justify-center gap-2.5">
                {pinDigits.map((digit, index) => (
                  <input
                    key={index}
                    ref={el => pinInputRefs.current[index] = el}
                    type="password"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handlePinChange(index, e.target.value)}
                    onKeyDown={(e) => handlePinKeyDown(index, e)}
                    className="w-11 sm:w-13 h-12 sm:h-14 text-center text-xl sm:text-2xl font-mono font-extrabold rounded-2xl border-2 border-slate-200 focus:border-amber-500 text-slate-900 outline-none transition"
                  />
                ))}
              </div>

              <div className="text-center">
                <button
                  onClick={() => {
                    setPinDigits(['1', '2', '3', '4']);
                    setErrorMsg('');
                  }}
                  className="text-[11px] text-slate-500 hover:text-slate-800 underline font-medium cursor-pointer"
                >
                  Auto-fill Security PIN (1234)
                </button>
              </div>

              {errorMsg && (
                <div className="p-2.5 rounded-xl bg-rose-50 text-rose-600 text-xs font-medium flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <button
                onClick={handleVerifyPin}
                disabled={isProcessing}
                className="w-full py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 active:scale-98 text-white font-extrabold text-xs sm:text-sm shadow-xl flex items-center justify-center gap-2 transition disabled:opacity-50 cursor-pointer"
              >
                {isProcessing ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Authorize & Log In</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* STEP 4: Success */}
          {step === 4 && (
            <div className="text-center py-6 space-y-2">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-base font-extrabold text-slate-900">Verification Successful!</h3>
              <p className="text-xs text-slate-500">
                Welcome, <strong>{userName}</strong>. Redirecting...
              </p>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 text-center text-[9px] sm:text-[10px] text-slate-400 flex items-center justify-center gap-1.5 shrink-0">
          <ShieldCheck className="w-3 h-3 text-emerald-500" />
          <span>foodRo Guard: Multi-factor biometric & SMS token verification</span>
        </div>
      </div>
    </div>
  );
}
