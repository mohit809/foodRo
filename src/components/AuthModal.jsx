import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  ShieldCheck, 
  Lock, 
  Smartphone, 
  Mail, 
  KeyRound, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  RefreshCw,
  AlertCircle,
  UserCheck,
  UserPlus
} from 'lucide-react';

export default function AuthModal({
  isOpen,
  onClose,
  onLoginSuccess
}) {
  if (!isOpen) return null;

  // Mode: 'signin' or 'register'
  const [authMode, setAuthMode] = useState('register');
  const [step, setStep] = useState(1);
  
  // Registration fields
  const [userName, setUserName] = useState('Mohit Kumar');
  const [userEmail, setUserEmail] = useState('mohit.kumar@foodro.com');
  const [userPhone, setUserPhone] = useState('+91 98765 43210');
  
  // Sign-in identifier
  const [signInIdentifier, setSignInIdentifier] = useState('+91 98765 43210');

  // Verification & PIN state
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const [pinDigits, setPinDigits] = useState(['', '', '', '']);
  const [simulatedEmailCode, setSimulatedEmailCode] = useState('');
  const [simulatedSmsCode, setSimulatedSmsCode] = useState('');
  const [activeBanner, setActiveBanner] = useState(null); // { type: 'email' | 'sms', code, target }
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

  const switchMode = (mode) => {
    setAuthMode(mode);
    setStep(1);
    setErrorMsg('');
    setOtpDigits(['', '', '', '', '', '']);
    setPinDigits(['', '', '', '']);
    setActiveBanner(null);
  };

  // STEP 1 -> STEP 2: Send Email verification code (Register) or SMS OTP (Sign In)
  const handleInitiateVerification = () => {
    setErrorMsg('');

    if (authMode === 'register') {
      if (!userName.trim()) {
        setErrorMsg('Please enter your full name.');
        return;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!userEmail.trim() || !emailRegex.test(userEmail.trim())) {
        setErrorMsg('Valid email address is strictly required to register.');
        return;
      }
      if (!userPhone.trim() || userPhone.trim().length < 8) {
        setErrorMsg('Valid mobile number is required for 2-step verification.');
        return;
      }

      setIsProcessing(true);
      const generatedCode = Math.floor(100000 + Math.random() * 900000).toString();
      setSimulatedEmailCode(generatedCode);

      setTimeout(() => {
        setIsProcessing(false);
        setStep(2);
        setResendTimer(30);
        setOtpDigits(['', '', '', '', '', '']);
        setActiveBanner({
          type: 'email',
          code: generatedCode,
          target: userEmail.trim()
        });
        setTimeout(() => {
          otpInputRefs.current[0]?.focus();
        }, 100);
      }, 600);

    } else {
      // Sign In mode
      if (!signInIdentifier.trim()) {
        setErrorMsg('Please enter your verified email or mobile number.');
        return;
      }

      setIsProcessing(true);
      const generatedCode = Math.floor(100000 + Math.random() * 900000).toString();
      setSimulatedSmsCode(generatedCode);

      setTimeout(() => {
        setIsProcessing(false);
        setStep(2);
        setResendTimer(30);
        setOtpDigits(['', '', '', '', '', '']);
        setActiveBanner({
          type: signInIdentifier.includes('@') ? 'email' : 'sms',
          code: generatedCode,
          target: signInIdentifier.trim()
        });
        setTimeout(() => {
          otpInputRefs.current[0]?.focus();
        }, 100);
      }, 600);
    }
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

  // STEP 2 -> STEP 3: Verify OTP
  const handleVerifyOtp = () => {
    const entered = otpDigits.join('');
    if (entered.length < 6) {
      setErrorMsg('Please enter all 6 digits of the verification code.');
      return;
    }

    const expected = authMode === 'register' ? simulatedEmailCode : (simulatedSmsCode || simulatedEmailCode);
    if (entered !== expected) {
      setErrorMsg(`Invalid verification code. Please enter ${expected} to verify.`);
      return;
    }

    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep(3);
      setActiveBanner(null);
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

  // STEP 3 -> STEP 4: Verify PIN & Complete Login/Registration
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

      const finalEmail = authMode === 'register' ? userEmail : (signInIdentifier.includes('@') ? signInIdentifier : 'verified.user@foodro.com');
      const finalPhone = authMode === 'register' ? userPhone : (signInIdentifier.includes('@') ? '+91 98765 43210' : signInIdentifier);

      const userProfile = {
        name: userName || 'Foodie Member',
        email: finalEmail,
        phone: finalPhone,
        isVerified: true,
        isEmailVerified: true,
        isPhoneVerified: true,
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
      
      {/* Simulated Live Email / SMS Security Notification Banner */}
      {step === 2 && activeBanner && (
        <div className="fixed top-3 sm:top-5 left-1/2 -translate-x-1/2 z-60 bg-slate-900/95 text-white px-4 py-3 rounded-2xl shadow-2xl border border-orange-500/40 flex items-center gap-3 animate-in slide-in-from-top-4 duration-300 max-w-md w-11/12">
          <div className="w-9 h-9 rounded-xl bg-orange-500 flex items-center justify-center text-white shrink-0 shadow-md">
            {activeBanner.type === 'email' ? <Mail className="w-5 h-5" /> : <Smartphone className="w-5 h-5" />}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase tracking-wider font-extrabold text-orange-400">
                {activeBanner.type === 'email' ? 'foodRo Email Security Verification' : 'foodRo SMS OTP Service'}
              </span>
              <span className="text-[10px] text-slate-400">Just now</span>
            </div>
            <p className="text-xs text-slate-200 mt-0.5 truncate">
              Code for <strong className="text-white">{activeBanner.target}</strong>: <strong className="text-white font-mono text-sm tracking-wider px-1.5 py-0.5 bg-orange-500/30 rounded border border-orange-400/40">{activeBanner.code}</strong>
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
        <div className="p-4 sm:p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/90 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-orange-500 text-white flex items-center justify-center shadow-md shadow-orange-500/30">
              <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-extrabold text-slate-900">
                {authMode === 'register' ? 'Verified Account Registration' : 'Secure Sign In'}
              </h2>
              <p className="text-[10px] sm:text-[11px] text-emerald-600 font-bold flex items-center gap-1">
                <Lock className="w-3 h-3" />
                Anti-Fraud Verified Identity
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

        {/* Mode Switch Tabs (Register vs Sign In) */}
        {step === 1 && (
          <div className="flex border-b border-slate-200 bg-slate-50/50 px-4 pt-2 shrink-0">
            <button
              onClick={() => switchMode('register')}
              className={`flex-1 py-2.5 text-xs font-extrabold border-b-2 flex items-center justify-center gap-1.5 transition cursor-pointer ${
                authMode === 'register'
                  ? 'border-orange-500 text-orange-600 bg-white rounded-t-xl'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Register (Verified Email)</span>
            </button>
            <button
              onClick={() => switchMode('signin')}
              className={`flex-1 py-2.5 text-xs font-extrabold border-b-2 flex items-center justify-center gap-1.5 transition cursor-pointer ${
                authMode === 'signin'
                  ? 'border-orange-500 text-orange-600 bg-white rounded-t-xl'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Sign In (2-Step)</span>
            </button>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-4 sm:space-y-5 overflow-y-auto">
          
          {/* Stepper Progress */}
          <div className="flex items-center justify-between px-2">
            {[
              { num: 1, label: authMode === 'register' ? 'Details' : 'Identity' },
              { num: 2, label: authMode === 'register' ? 'Email OTP' : 'SMS OTP' },
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

          {/* STEP 1: REGISTRATION OR SIGN IN INPUTS */}
          {step === 1 && (
            <div className="space-y-3.5 pt-1">
              
              {authMode === 'register' ? (
                <>
                  <div className="p-3 bg-orange-50 rounded-2xl border border-orange-200 text-xs text-orange-950 flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                    <span>
                      <strong>Strict Security Policy:</strong> Only verified email addresses are permitted to register. A 6-digit confirmation code will be sent to verify identity.
                    </span>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wide mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="e.g. Mohit Kumar"
                      className="w-full p-2.5 sm:p-3 rounded-2xl border border-slate-200 focus:border-orange-500 text-xs sm:text-sm font-semibold text-slate-800 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wide mb-1 flex items-center justify-between">
                      <span>Email Address (Must be Verified) *</span>
                      <span className="text-[10px] text-orange-600 font-bold">Requires Verification</span>
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        placeholder="yourname@domain.com"
                        className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-2xl border border-slate-200 focus:border-orange-500 text-xs sm:text-sm font-semibold text-slate-800 outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wide mb-1">
                      Mobile Number (For Order Verification) *
                    </label>
                    <div className="relative">
                      <Smartphone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={userPhone}
                        onChange={(e) => setUserPhone(e.target.value)}
                        placeholder="+91 98765 43210"
                        className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-2xl border border-slate-200 focus:border-orange-500 text-xs sm:text-sm font-semibold text-slate-800 outline-none"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 uppercase tracking-wide mb-1">
                      Verified Email or Mobile Number *
                    </label>
                    <div className="relative">
                      <Smartphone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={signInIdentifier}
                        onChange={(e) => setSignInIdentifier(e.target.value)}
                        placeholder="+91 98765 43210 or email@domain.com"
                        className="w-full pl-10 pr-4 py-2.5 sm:py-3 rounded-2xl border border-slate-200 focus:border-orange-500 text-xs sm:text-sm font-semibold text-slate-800 outline-none"
                      />
                    </div>
                    <p className="text-[10px] text-slate-400 mt-1">
                      We'll send a high-security OTP code for 2-step authentication.
                    </p>
                  </div>
                </>
              )}

              {errorMsg && (
                <div className="p-2.5 rounded-xl bg-rose-50 text-rose-600 text-xs font-medium flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <button
                onClick={handleInitiateVerification}
                disabled={isProcessing}
                className="w-full py-3.5 rounded-2xl bg-orange-500 hover:bg-orange-600 active:scale-98 text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-orange-500/30 flex items-center justify-center gap-2 transition disabled:opacity-50 cursor-pointer"
              >
                {isProcessing ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>{authMode === 'register' ? 'Verify Email with Security Code' : 'Send 2-Step OTP'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          )}

          {/* STEP 2: VERIFICATION OTP (Email for Register, SMS/Email for Sign In) */}
          {step === 2 && (
            <div className="space-y-3.5 pt-1">
              <div className="text-center">
                <div className="w-10 h-10 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center mx-auto mb-1.5">
                  {authMode === 'register' ? <Mail className="w-5 h-5" /> : <Smartphone className="w-5 h-5" />}
                </div>
                <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
                  {authMode === 'register' ? 'Verify Email Address' : 'Enter 6-Digit OTP'}
                </h3>
                <p className="text-[11px] text-slate-500 mt-0.5 truncate">
                  Sent security code to <strong className="text-slate-800">{authMode === 'register' ? userEmail : signInIdentifier}</strong>
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
                    const code = authMode === 'register' ? simulatedEmailCode : (simulatedSmsCode || simulatedEmailCode);
                    setOtpDigits(code.split(''));
                    setErrorMsg('');
                  }}
                  className="text-orange-600 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <Sparkles className="w-3 h-3" />
                  <span>Auto-fill ({authMode === 'register' ? simulatedEmailCode : simulatedSmsCode})</span>
                </button>

                {resendTimer > 0 ? (
                  <span className="text-slate-400">Resend in {resendTimer}s</span>
                ) : (
                  <button
                    onClick={handleInitiateVerification}
                    className="text-slate-700 font-bold hover:text-orange-600 flex items-center gap-1 cursor-pointer"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Resend Code</span>
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
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{authMode === 'register' ? 'Verify Email & Proceed' : 'Verify OTP'}</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* STEP 3: 2-STEP SECURITY PIN SETUP / VERIFICATION */}
          {step === 3 && (
            <div className="space-y-3.5 pt-1">
              <div className="text-center">
                <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto mb-1.5">
                  <KeyRound className="w-5 h-5" />
                </div>
                <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
                  {authMode === 'register' ? 'Set Up 4-Digit Security PIN' : 'Enter 2-Step PIN'}
                </h3>
                <p className="text-[11px] text-slate-500 max-w-xs mx-auto">
                  {authMode === 'register' 
                    ? 'Create your permanent 4-digit foodRo security PIN for future logins & payments.'
                    : 'Enter your 4-digit foodRo security PIN to unlock your account.'}
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
                    <span>{authMode === 'register' ? 'Complete Verified Registration' : 'Authorize & Log In'}</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* STEP 4: SUCCESS */}
          {step === 4 && (
            <div className="text-center py-6 space-y-2">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto animate-bounce">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-base font-extrabold text-slate-900">
                {authMode === 'register' ? 'Registration & Email Verified!' : 'Verification Successful!'}
              </h3>
              <p className="text-xs text-slate-500">
                Welcome, <strong>{userName}</strong>. Your account is verified and ready.
              </p>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 text-center text-[9px] sm:text-[10px] text-slate-400 flex items-center justify-center gap-1.5 shrink-0">
          <ShieldCheck className="w-3 h-3 text-emerald-500" />
          <span>foodRo Guard: Strict Email & Phone Identity Verification</span>
        </div>
      </div>
    </div>
  );
}
