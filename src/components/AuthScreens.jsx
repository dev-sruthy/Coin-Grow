import React, { useState } from 'react';
import {
  SplashPiggyCoin,
  JumpingPiggyCoins,
  StandingPiggyCoin,
  BluePigHello,
} from './Illustrations';
import { CoinGrowButton } from './BottomNav';
import { Check, X } from 'lucide-react';

/**
 * 1. Splash Screen (Row 1, Frames 1-3)
 */
export function SplashScreen({ onNavigate, buttonVisualState = 'default' }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center px-7 py-8 bg-[#FFF5F2] text-center select-none">
      {/* Playful arched/wavy CoinGrow wordmark matching Figma */}
      <h1 className="font-serif text-[27px] font-bold tracking-tight text-[#1E1E1E] mb-2 flex items-baseline justify-center">
        <span>C</span>
        <span className="-translate-y-[1.5px]">o</span>
        <span className="-translate-y-[2.5px]">i</span>
        <span className="-translate-y-[1px]">n</span>
        <span className="translate-y-[1px]">G</span>
        <span className="-translate-y-[1px]">r</span>
        <span className="-translate-y-[2px]">o</span>
        <span>w</span>
      </h1>

      <div className="my-2">
        <SplashPiggyCoin animateCoin />
      </div>

      <div className="mt-4 flex flex-col gap-3.5 items-center w-full">
        <CoinGrowButton
          forceState={buttonVisualState}
          onClick={() => onNavigate('login', true)}
        >
          Log In
        </CoinGrowButton>
        <CoinGrowButton
          forceState={buttonVisualState}
          onClick={() => onNavigate('welcome', true)}
        >
          Sign Up
        </CoinGrowButton>
      </div>
    </div>
  );
}

/**
 * 2. Coin Catch Transition Screen (Row 1 Frame 4 & Row 2 Frame 4)
 */
export function CoinTransitionScreen({ onContinue }) {
  return (
    <div
      onClick={onContinue}
      className="flex-1 flex flex-col items-center justify-center px-6 bg-[#FFF5F2] cursor-pointer select-none"
      title="Click to continue"
    >
      <div className="animate-pulse">
        <JumpingPiggyCoins />
      </div>
      <p className="mt-6 font-serif text-xs text-[#7A6B66]">
        Catching your coins...
      </p>
    </div>
  );
}

/**
 * 3. Welcome Screen (Row 2, Frames 1-3)
 */
export function WelcomeScreen({ onNavigate, buttonVisualState = 'default' }) {
  return (
    <div className="flex-1 flex flex-col items-center justify-between px-7 py-10 bg-[#FFF5F2] text-center">
      <div className="mt-2">
        <StandingPiggyCoin size={142} />
      </div>

      <div className="my-auto">
        <h2 className="font-serif text-[25px] font-bold text-[#1E1E1E] mb-4">
          Welcome!!
        </h2>
        <p className="font-serif text-[16px] leading-[1.38] text-[#2C221E] max-w-[200px] mx-auto text-left">
          Let&apos;s turn your financial goals into achievements.
        </p>
      </div>

      <div className="mb-4">
        <CoinGrowButton
          forceState={buttonVisualState}
          onClick={() => onNavigate('signup', true)}
        >
          Sign Up
        </CoinGrowButton>
      </div>
    </div>
  );
}

/**
 * 4. Sign Up Screen (Row 2, Frames 5-7)
 */
export function SignUpScreen({
  onSuccess,
  onGoToLogin,
  initialMode = 'empty', // 'empty' | 'errors' | 'valid'
  buttonVisualState = 'default',
}) {
  const [form, setForm] = useState(() => {
    if (initialMode === 'errors') {
      return {
        name: 'ABC',
        age: '12',
        email: 'abc.com',
        password: '1234',
        confirmPassword: '12345678',
      };
    }
    if (initialMode === 'valid') {
      return {
        name: 'ABC',
        age: '18',
        email: 'abc@gmail.com',
        password: 'password123',
        confirmPassword: 'password123',
      };
    }
    return {
      name: '',
      age: '',
      email: '',
      password: '',
      confirmPassword: '',
    };
  });

  const [touched, setTouched] = useState(initialMode === 'errors');

  const validate = (values) => {
    const errs = {};
    if (!values.name.trim()) {
      errs.name = 'Name is required';
    }
    const ageNum = Number(values.age);
    if (!values.age || Number.isNaN(ageNum) || ageNum < 18) {
      errs.age = 'Invalid (under age 18)';
    }
    if (!values.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      errs.email = 'Invalid email format';
    }
    if (!values.password || values.password.length < 6) {
      errs.password = 'Invalid (weak password)';
    }
    if (
      !values.confirmPassword ||
      values.confirmPassword !== values.password
    ) {
      errs.confirmPassword = 'Invalid (does not match password)';
    }
    return errs;
  };

  const errors = touched ? validate(form) : {};

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched(true);
    const currentErrors = validate(form);
    if (Object.keys(currentErrors).length === 0) {
      onSuccess({
        name: form.name.trim() || 'ABC',
        age: Number(form.age) || 18,
        email: form.email.trim(),
      });
    }
  };

  const fillPreset = (preset) => {
    if (preset === 'errors') {
      setForm({
        name: 'ABC',
        age: '12',
        email: 'abc.com',
        password: '1234',
        confirmPassword: '12345678',
      });
      setTouched(true);
    } else {
      setForm({
        name: 'ABC',
        age: '18',
        email: 'abc@gmail.com',
        password: 'password123',
        confirmPassword: 'password123',
      });
      setTouched(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col px-6 pt-5 pb-6 bg-[#FFF5F2] overflow-y-auto">
      {/* Header with Sign Up & Blue Pig "Hello!" */}
      <div className="flex items-start justify-between mb-2">
        <h2 className="font-serif text-[24px] font-bold text-[#1E1E1E] pt-3">
          Sign Up
        </h2>
        <div className="-mr-2 -mt-1">
          <BluePigHello />
        </div>
      </div>

      {/* Form Inputs */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-3 mt-1" noValidate>
        {/* Name */}
        <div>
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={`w-full px-4 py-2 rounded-full bg-white border text-[12.5px] font-serif text-[#1E1E1E] placeholder-[#C4BDB9] focus:outline-none transition-colors ${
              errors.name
                ? 'border-[#C94A4A]'
                : 'border-[#CFC8C4] focus:border-[#2E5AA7]'
            }`}
          />
          {errors.name && (
            <p className="text-[9.5px] font-serif text-[#B33939] pl-3 mt-0.5">
              {errors.name}
            </p>
          )}
        </div>

        {/* Age */}
        <div>
          <input
            type="number"
            placeholder="Age"
            value={form.age}
            onChange={(e) => setForm({ ...form, age: e.target.value })}
            className={`w-full px-4 py-2 rounded-full bg-white border text-[12.5px] font-serif text-[#1E1E1E] placeholder-[#C4BDB9] focus:outline-none transition-colors ${
              errors.age
                ? 'border-[#C94A4A]'
                : 'border-[#CFC8C4] focus:border-[#2E5AA7]'
            }`}
          />
          {errors.age && (
            <p className="text-[9.5px] font-serif text-[#B33939] pl-3 mt-0.5">
              {errors.age}
            </p>
          )}
        </div>

        {/* Email address */}
        <div>
          <input
            type="email"
            placeholder="Email address"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className={`w-full px-4 py-2 rounded-full bg-white border text-[12.5px] font-serif text-[#1E1E1E] placeholder-[#C4BDB9] focus:outline-none transition-colors ${
              errors.email
                ? 'border-[#C94A4A]'
                : 'border-[#CFC8C4] focus:border-[#2E5AA7]'
            }`}
          />
          {errors.email && (
            <p className="text-[9.5px] font-serif text-[#B33939] pl-3 mt-0.5">
              {errors.email}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className={`w-full px-4 py-2 rounded-full bg-white border text-[12.5px] font-serif text-[#1E1E1E] placeholder-[#C4BDB9] focus:outline-none transition-colors ${
              errors.password
                ? 'border-[#C94A4A]'
                : 'border-[#CFC8C4] focus:border-[#2E5AA7]'
            }`}
          />
          {errors.password && (
            <p className="text-[9.5px] font-serif text-[#B33939] pl-3 mt-0.5">
              {errors.password}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <input
            type="password"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={(e) =>
              setForm({ ...form, confirmPassword: e.target.value })
            }
            className={`w-full px-4 py-2 rounded-full bg-white border text-[12.5px] font-serif text-[#1E1E1E] placeholder-[#C4BDB9] focus:outline-none transition-colors ${
              errors.confirmPassword
                ? 'border-[#C94A4A]'
                : 'border-[#CFC8C4] focus:border-[#2E5AA7]'
            }`}
          />
          {errors.confirmPassword && (
            <p className="text-[9.5px] font-serif text-[#B33939] pl-3 mt-0.5">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        <div className="mt-3 flex justify-center">
          <CoinGrowButton type="submit" forceState={buttonVisualState}>
            Sign Up
          </CoinGrowButton>
        </div>
      </form>

      {/* Quick Demo Presets for testing Figma Validation States */}
      <div className="mt-auto pt-4 flex items-center justify-center gap-2 text-[10px]">
        <button
          type="button"
          onClick={() => fillPreset('errors')}
          className="px-2.5 py-1 rounded-full bg-[#FFE4E1] text-[#9E2A2B] border border-[#F5B7B1] hover:bg-[#FADBD8] cursor-pointer transition"
        >
          Fill Error State (Age 12)
        </button>
        <button
          type="button"
          onClick={() => fillPreset('valid')}
          className="px-2.5 py-1 rounded-full bg-[#E3F2FD] text-[#1E3A8A] border border-[#BBDEFB] hover:bg-[#BBDEFB] cursor-pointer transition"
        >
          Fill Valid (ABC, 18)
        </button>
      </div>

      <button
        type="button"
        onClick={onGoToLogin}
        className="mt-2 text-center font-serif text-[11px] text-[#5A4E4A] underline cursor-pointer"
      >
        Already have an account? Log In
      </button>
    </div>
  );
}

/**
 * 5. Status Card Screen (Used for Account Creation Success, Login Error, Login Success)
 * - Row 2 Frame 8: "Successful account creation"
 * - Row 3 Frame 3: "Invalid Username or password"
 * - Row 3 Frame 4: "Successful login"
 */
export function StatusFeedbackScreen({
  type = 'success', // 'success' | 'error'
  message = 'Successful account creation',
  buttonLabel = 'Continue',
  onAction,
}) {
  const isSuccess = type === 'success';

  return (
    <div
      onClick={onAction}
      className="flex-1 flex flex-col items-center justify-center px-7 py-8 bg-[#FFF5F2] cursor-pointer select-none"
    >
      <div className="mb-5">
        <StandingPiggyCoin size={135} />
      </div>

      {/* Rounded Feedback Card matching Figma */}
      <div
        className={`w-[215px] min-h-[210px] rounded-[18px] border-[1.5px] flex flex-col items-center justify-center px-5 py-7 text-center shadow-sm transition-transform hover:scale-[1.01] ${
          isSuccess
            ? 'bg-[#D9E9D5] border-[#66B266]'
            : 'bg-[#FFCBC9] border-[#E56B6B]'
        }`}
      >
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center mb-5 border ${
            isSuccess
              ? 'bg-[#6FC388] border-[#4E9F67] text-[#1E4620]'
              : 'bg-[#FF8E88] border-[#E05A54] text-[#7A1C18]'
          }`}
        >
          {isSuccess ? (
            <Check size={22} strokeWidth={2.4} />
          ) : (
            <X size={22} strokeWidth={2.4} />
          )}
        </div>

        <p className="font-serif text-[13.5px] font-bold leading-snug text-[#1E1E1E] max-w-[155px]">
          {message}
        </p>

        <span className="mt-6 text-[10.5px] font-serif text-[#4A4A4A] underline opacity-80">
          {buttonLabel} →
        </span>
      </div>
    </div>
  );
}

/**
 * 6. Log In Screen (Row 3, Frames 1-2)
 */
export function LoginScreen({
  onLoginSuccess,
  onLoginError,
  onGoToSignUp,
  initialFilled = false,
  buttonVisualState = 'default',
}) {
  const [username, setUsername] = useState(initialFilled ? 'Abc' : '');
  const [password, setPassword] = useState(initialFilled ? '123456' : '');
  const [resetToast, setResetToast] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim() || password === 'wrong') {
      onLoginError();
    } else {
      onLoginSuccess(username.trim());
    }
  };

  return (
    <div className="flex-1 flex flex-col items-center px-6 pt-7 pb-6 bg-[#FFF5F2]">
      <div className="mb-4">
        <StandingPiggyCoin size={132} />
      </div>

      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col items-center gap-3.5 mt-1"
      >
        <input
          type="text"
          placeholder="Username, email/phone number"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full px-4 py-2.5 rounded-full bg-white border border-[#CFC8C4] focus:border-[#2E5AA7] text-[12.5px] font-serif text-[#1E1E1E] placeholder-[#B8B0AC] focus:outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-4 py-2.5 rounded-full bg-white border border-[#CFC8C4] focus:border-[#2E5AA7] text-[12.5px] font-serif text-[#1E1E1E] placeholder-[#B8B0AC] focus:outline-none"
        />

        <div className="mt-2">
          <CoinGrowButton type="submit" forceState={buttonVisualState}>
            Log In
          </CoinGrowButton>
        </div>
      </form>

      <button
        type="button"
        onClick={() => {
          setResetToast(true);
          setTimeout(() => setResetToast(false), 2500);
        }}
        className="mt-4 font-serif text-[12px] font-bold text-[#1E1E1E] hover:text-[#2E5AA7] cursor-pointer"
      >
        Forgot Password?
      </button>

      {resetToast && (
        <p className="mt-1 text-[10.5px] font-serif text-[#2E5AA7] bg-[#DBE8FF] px-3 py-1 rounded-full">
          Password reset link sent to your email!
        </p>
      )}

      {/* Quick test pills for Valid vs Invalid Login */}
      <div className="mt-auto mb-3 flex items-center gap-2 text-[10px]">
        <button
          type="button"
          onClick={onLoginError}
          className="px-2.5 py-1 rounded-full bg-[#FFE4E1] text-[#9E2A2B] border border-[#F5B7B1] hover:bg-[#FADBD8] cursor-pointer"
        >
          Test Invalid Login
        </button>
        <button
          type="button"
          onClick={() => {
            setUsername('Abc');
            setPassword('123456');
          }}
          className="px-2.5 py-1 rounded-full bg-[#E3F2FD] text-[#1E3A8A] border border-[#BBDEFB] hover:bg-[#BBDEFB] cursor-pointer"
        >
          Fill &quot;Abc&quot;
        </button>
      </div>

      {/* Bottom Create New Account Button matching Figma */}
      <button
        type="button"
        onClick={onGoToSignUp}
        className="w-full py-2.5 px-4 rounded-full bg-[#E6E4E2] border border-[#E5988E] font-serif text-[11.5px] text-[#7A7470] hover:bg-[#DCD9D6] hover:text-[#1E1E1E] transition cursor-pointer"
      >
        Create new account. <span className="underline">Sign Up</span>
      </button>
    </div>
  );
}
