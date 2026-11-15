import React from 'react';

/**
 * 1. Splash Screen Piggy Bank with Golden Rupee Coin
 */
export function SplashPiggyCoin({ animateCoin = false }) {
  return (
    <div className="flex items-center justify-center select-none">
      <img
        src="/assets/splash_piggy.png"
        alt="CoinGrow Piggy Bank catching a Rupee coin"
        className={`w-[185px] h-auto object-contain drop-shadow-[0_2px_4px_rgba(44,34,30,0.06)] ${
          animateCoin ? 'transition-transform duration-500 hover:scale-105' : ''
        }`}
      />
    </div>
  );
}

/**
 * 2. Transition Piggy Catching Golden Coins in an Arc
 */
export function JumpingPiggyCoins() {
  return (
    <div className="flex items-center justify-center select-none">
      <img
        src="/assets/jumping_piggy.png"
        alt="Jumping Piggy Bank catching golden Rupee coins"
        className="w-[215px] h-auto object-contain"
      />
    </div>
  );
}

/**
 * 3. Standing Piggy Bank Pointing at Sparkling Golden Rupee Coin
 * Used on Welcome, Log In, Sign Up Success, Login Error/Success, and Budget screens
 */
export function StandingPiggyCoin({ size = 140 }) {
  return (
    <div className="flex items-center justify-center select-none">
      <img
        src="/assets/standing_piggy.png"
        alt="Standing Piggy Bank pointing at sparkling Rupee coin"
        style={{ width: `${size}px` }}
        className="h-auto object-contain mx-auto"
      />
    </div>
  );
}

/**
 * 4. Achievements Piggy Showered with Golden Coins
 */
export function CelebratingPiggyCoins({ size = 115 }) {
  return (
    <div className="flex items-center justify-center select-none">
      <img
        src="/assets/celebrating_piggy.png"
        alt="Celebrating Piggy Bank with showering Rupee coins"
        style={{ width: `${size}px` }}
        className="h-auto object-contain"
      />
    </div>
  );
}

/**
 * 5. Peer Challenge Duo Piggies (Big Piggy + Small Friend Piggy)
 */
export function PeerPiggies({ size = 110 }) {
  return (
    <div className="flex items-center justify-center select-none">
      <img
        src="/assets/peer_piggies.png"
        alt="Peer Challenge Buddy Piggy Banks"
        style={{ width: `${size}px` }}
        className="h-auto object-contain"
      />
    </div>
  );
}

/**
 * 6. Blue Pig Mascot with "Hello!" Speech Bubble (Sign Up Screen)
 */
export function BluePigHello() {
  return (
    <div className="flex items-center justify-center select-none">
      <img
        src="/assets/blue_pig_hello.png"
        alt="Blue Pig Mascot waving Hello!"
        className="w-[105px] h-auto object-contain"
      />
    </div>
  );
}

/**
 * 7. Blue Pig Head Avatar (Home Screen Header)
 */
export function BluePigAvatar({ size = 56 }) {
  return (
    <div className="flex items-center justify-center select-none">
      <img
        src="/assets/blue_pig_avatar.png"
        alt="Blue Pig Avatar"
        style={{ width: `${size}px` }}
        className="h-auto object-contain"
      />
    </div>
  );
}

/**
 * 8. Thumbs Up & Thumbs Down Hand Icons (Home Dashboard Net Worth Card)
 */
export function ThumbsHandIcon({ positive = true }) {
  return (
    <svg
      width="56"
      height="52"
      viewBox="0 0 56 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`select-none transition-transform duration-300 ${
        positive ? '' : 'scale-y-[-1] scale-x-[-1]'
      }`}
    >
      {/* Blue Cuff */}
      <rect
        x="6"
        y="22"
        width="12"
        height="22"
        rx="2"
        fill="#5FA2DD"
        stroke="#2C221E"
        strokeWidth="1.8"
      />
      <circle cx="12" cy="39" r="1.5" fill="#FFF" />

      {/* Peach Hand & Thumb */}
      <path
        d="M18 24 C21 24, 24 16, 26 10 C27 6, 31 6, 32 10 C33 14, 31 20, 31 22 L43 22 C46 22, 48 24, 47 27 C46 29, 48 30, 47 33 C46 35, 47 37, 45 39 C44 41, 44 43, 41 43 L18 43 Z"
        fill="#FFD6BA"
        stroke="#2C221E"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      {/* Finger curl lines */}
      <line
        x1="40"
        y1="27"
        x2="46"
        y2="27"
        stroke="#2C221E"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="39"
        y1="33"
        x2="46"
        y2="33"
        stroke="#2C221E"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <line
        x1="38"
        y1="38"
        x2="44"
        y2="38"
        stroke="#2C221E"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
