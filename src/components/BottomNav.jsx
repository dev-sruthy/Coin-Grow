import React from 'react';
import { Home, Wallet, Users, Award } from 'lucide-react';

/**
 * CoinGrow Primary Pill Button matching the 3 Figma interactive states:
 * - Default: #2E5AA7 fill, white text, dark border
 * - Hover: #627FBA fill, white text, dark border
 * - Active / Pressed (or forceState="pressed"): #DBE8FF fill, #1E1E1E text, dark border
 */
export function CoinGrowButton({
  children,
  onClick,
  type = 'button',
  forceState = 'default', // 'default' | 'hover' | 'pressed'
  className = '',
}) {
  const stateClasses =
    forceState === 'pressed'
      ? 'bg-[#DBE8FF] text-[#1E1E1E]'
      : forceState === 'hover'
      ? 'bg-[#627FBA] text-white'
      : 'bg-[#2E5AA7] text-white hover:bg-[#627FBA] active:bg-[#DBE8FF] active:text-[#1E1E1E]';

  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-[205px] py-2.5 px-6 rounded-full border-[1.4px] border-[#2C221E] font-serif text-[13.5px] font-semibold tracking-wide transition-all duration-150 shadow-[0_2px_0_rgba(44,34,30,0.12)] cursor-pointer select-none ${stateClasses} ${className}`}
    >
      {children}
    </button>
  );
}

/**
 * Bottom Navigation Bar (Home, Budget, Peers, Achievements)
 */
export function BottomNav({ activeTab, onSelectTab }) {
  const tabs = [
    { id: 'home', label: 'Home', Icon: Home },
    { id: 'budget', label: 'Budget', Icon: Wallet },
    { id: 'peers', label: 'Peers', Icon: Users },
    { id: 'achievements', label: 'Achievements', Icon: Award },
  ];

  return (
    <nav className="w-full pt-2.5 pb-3 px-5 bg-[#FFF5F2] border-t border-[#F2DFD8] flex items-center justify-between shrink-0">
      {tabs.map(({ id, label, Icon }) => {
        const isActive = activeTab === id;
        return (
          <button
            key={id}
            onClick={() => onSelectTab(id)}
            className="flex flex-col items-center gap-1 cursor-pointer group min-w-[58px]"
          >
            <div
              className={`p-1 rounded-lg transition-colors ${
                isActive
                  ? 'text-[#1E1E1E]'
                  : 'text-[#2E5AA7] group-hover:text-[#1E3A8A]'
              }`}
            >
              <Icon
                size={20}
                strokeWidth={isActive ? 2.3 : 1.9}
                fill={isActive ? '#1E1E1E' : 'none'}
                className={isActive ? 'text-[#FFF5F2] stroke-[#1E1E1E]' : ''}
              />
            </div>
            <span
              className={`font-serif text-[10px] leading-none transition-colors ${
                isActive
                  ? 'text-[#1E1E1E] font-bold'
                  : 'text-[#3A3A3A] font-medium'
              }`}
            >
              {label}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
