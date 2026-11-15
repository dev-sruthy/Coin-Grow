import React, { useState } from 'react';
import {
  BluePigAvatar,
  ThumbsHandIcon,
  StandingPiggyCoin,
  CelebratingPiggyCoins,
  PeerPiggies,
} from './Illustrations';
import { Calendar, Plus, Trophy, Sparkles, CheckCircle2 } from 'lucide-react';

const formatINR = (val) => `₹${Math.abs(val).toLocaleString('en-IN')}`;

/**
 * 1. HOME SCREEN (Row 4, Frames 1 & 2: Positive & Negative Net Worth States)
 */
export function HomeScreen({
  userName = 'ABC',
  netWorthMode, // 'positive' | 'negative'
  onToggleNetWorthMode,
  transactions,
  onAddTransaction,
}) {
  const [showAllModal, setShowAllModal] = useState(false);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [newType, setNewType] = useState('expense'); // 'expense' | 'saved' | 'income'

  // Base numbers from the two Figma Home frames
  const customIncome = transactions
    .filter((t) => t.isCustom && t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0);
  const customExpense = transactions
    .filter((t) => t.isCustom && t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0);
  const customSaved = transactions
    .filter((t) => t.isCustom && t.type === 'saved')
    .reduce((acc, t) => acc + t.amount, 0);

  const income =
    (netWorthMode === 'positive' ? 22000 : 2000) + customIncome;
  const expense =
    (netWorthMode === 'positive' ? 9500 : 2500) + customExpense;
  const saved =
    (netWorthMode === 'positive' ? 12500 : 500) + customSaved;
  const netWorth = income - expense;
  const isPositive = netWorth >= 0;

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const amt = Number(newAmount);
    if (!newTitle.trim() || !amt || amt <= 0) return;
    onAddTransaction({
      id: Date.now(),
      title: newTitle.trim(),
      amount: amt,
      type: newType,
      isCustom: true,
    });
    setNewTitle('');
    setNewAmount('');
    setShowAddForm(false);
  };

  const visibleActivities = showAllModal
    ? transactions
    : transactions.slice(0, 3);

  return (
    <div className="flex-1 flex flex-col px-5 pt-5 pb-3 bg-[#FFF5F2] overflow-y-auto">
      {/* Top Greeting & Blue Pig Avatar */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="font-serif text-[23px] font-bold text-[#1E1E1E] leading-tight">
            Hey, {userName}!
          </h1>
          <p className="font-serif text-[10.5px] text-[#3A322E] mt-2 leading-snug">
            Let&apos;s See,
            <br />
            <span className="ml-2 font-semibold">
              Your Money Journey This Month
            </span>
          </p>
        </div>
        <div className="-mt-0.5">
          <BluePigAvatar size={54} />
        </div>
      </div>

      {/* Net Worth Card matching Figma Positive/Negative states */}
      <div className="mt-3 bg-[#FFFDFB] rounded-[14px] border-[1.4px] border-[#E8A598] px-4 py-3 flex items-center justify-between shadow-[0_2px_6px_rgba(232,165,152,0.15)]">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-serif text-[11px] font-semibold text-[#3A322E]">
              Net Worth
            </span>
            <button
              type="button"
              onClick={onToggleNetWorthMode}
              title="Toggle between Figma Positive (+₹12,500) and Negative (-₹500) states"
              className="text-[9px] font-serif px-2 py-0.5 rounded-full bg-[#FFF0EB] text-[#8C4A3E] border border-[#E8A598] hover:bg-[#FFE2D9] cursor-pointer transition"
            >
              {isPositive ? 'Switch to -₹500' : 'Switch to +₹12,500'}
            </button>
          </div>
          <p
            className={`font-serif text-[16px] font-bold mt-1 ${
              isPositive ? 'text-[#2EB85C]' : 'text-[#E53935]'
            }`}
          >
            {isPositive ? `+ ${formatINR(netWorth)}` : `- ${formatINR(netWorth)}`}
          </p>
        </div>

        <div
          onClick={onToggleNetWorthMode}
          className="cursor-pointer"
          title="Click thumb to toggle Positive / Negative Net Worth"
        >
          <ThumbsHandIcon positive={isPositive} />
        </div>
      </div>

      {/* Monthly Summary Card (#C3D9FE blue with #4A78C2 border) */}
      <div className="mt-3.5 bg-[#C3D9FE] rounded-[14px] border-[1.4px] border-[#4A78C2] px-3.5 py-2.5">
        <h2 className="font-serif text-[11px] font-bold text-[#1E1E1E] mb-2">
          Monthly Summary
        </h2>
        <div className="grid grid-cols-3 divide-x divide-[#4A78C2] text-center py-1">
          <div className="px-1">
            <p className="font-serif text-[9.5px] text-[#3A4A68] mb-1">
              Income
            </p>
            <p className="font-serif text-[12px] font-bold text-[#2EB85C]">
              {formatINR(income)}
            </p>
          </div>
          <div className="px-1">
            <p className="font-serif text-[9.5px] text-[#3A4A68] mb-1">
              Expense
            </p>
            <p className="font-serif text-[12px] font-bold text-[#E53935]">
              {formatINR(expense)}
            </p>
          </div>
          <div className="px-1">
            <p className="font-serif text-[9.5px] text-[#3A4A68] mb-1">
              Saved
            </p>
            <p className="font-serif text-[12px] font-bold text-[#2E5AA7]">
              {formatINR(saved)}
            </p>
          </div>
        </div>
      </div>

      {/* Recent Activity Card (#C3D9FE blue with #4A78C2 border) */}
      <div className="mt-3.5 bg-[#C3D9FE] rounded-[14px] border-[1.4px] border-[#4A78C2] px-4 py-3 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-serif text-[11.5px] font-bold text-[#1E1E1E]">
              Recent Activity
            </h2>
            <button
              type="button"
              onClick={() => setShowAddForm((v) => !v)}
              className="flex items-center gap-0.5 text-[9.5px] font-serif font-semibold text-[#1E3A8A] bg-white/70 hover:bg-white px-2 py-0.5 rounded-full border border-[#4A78C2] cursor-pointer transition"
            >
              <Plus size={11} />
              {showAddForm ? 'Close' : 'Add'}
            </button>
          </div>

          {/* Inline Add Activity Form */}
          {showAddForm && (
            <form
              onSubmit={handleAddSubmit}
              className="mb-2.5 p-2 rounded-xl bg-white/90 border border-[#4A78C2] flex flex-col gap-1.5"
            >
              <div className="flex gap-1.5">
                <input
                  type="text"
                  placeholder="Item (e.g. Swiggy)"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="flex-1 px-2.5 py-1 rounded-lg border border-[#CBD5E1] text-[11px] font-serif focus:outline-none"
                />
                <input
                  type="number"
                  placeholder="₹ Amt"
                  value={newAmount}
                  onChange={(e) => setNewAmount(e.target.value)}
                  className="w-[74px] px-2 py-1 rounded-lg border border-[#CBD5E1] text-[11px] font-serif focus:outline-none"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex gap-1">
                  {[
                    { id: 'expense', label: 'Expense (-)' },
                    { id: 'saved', label: 'Saved (+)' },
                    { id: 'income', label: 'Income (+)' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setNewType(opt.id)}
                      className={`px-2 py-0.5 rounded-full text-[9px] font-serif cursor-pointer ${
                        newType === opt.id
                          ? 'bg-[#2E5AA7] text-white'
                          : 'bg-[#E2E8F0] text-[#334155]'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
                <button
                  type="submit"
                  className="px-2.5 py-0.5 rounded-full bg-[#2EB85C] text-white text-[9.5px] font-serif font-semibold cursor-pointer"
                >
                  Save
                </button>
              </div>
            </form>
          )}

          {/* Activity List */}
          <div className="divide-y divide-[#6C92CE]">
            {visibleActivities.map((item) => {
              const isExp = item.type === 'expense';
              return (
                <div
                  key={item.id}
                  className="py-2 flex items-center justify-between font-serif text-[11.5px]"
                >
                  <span className="text-[#1E1E1E] font-medium">
                    {item.title}
                  </span>
                  <span
                    className={`font-bold ${
                      isExp ? 'text-[#E53935]' : 'text-[#2E5AA7]'
                    }`}
                  >
                    {isExp ? `-${formatINR(item.amount)}` : formatINR(item.amount)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="text-right mt-1">
          <button
            type="button"
            onClick={() => setShowAllModal((v) => !v)}
            className="font-serif text-[9.5px] text-[#4A69A8] hover:text-[#1E3A8A] underline cursor-pointer"
          >
            {showAllModal
              ? 'Show less'
              : `View all (${transactions.length})`}
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * 2. BUDGET SCREEN (Row 5: Piggy Bank, May Pill, ₹5,000 / ₹10,000, 3 Vertical Category Bars)
 */
export function BudgetScreen({ budgetData, onUpdateCategory }) {
  const months = ['May', 'June', 'July'];
  const [monthIdx, setMonthIdx] = useState(0);
  const [selectedCat, setSelectedCat] = useState(null);

  const totalSpent = budgetData.categories.reduce(
    (sum, c) => sum + c.spent,
    0
  );
  const totalBudget = budgetData.limit;

  return (
    <div className="flex-1 flex flex-col px-6 pt-5 pb-3 bg-[#FFF5F2] overflow-y-auto">
      <h1 className="font-serif text-[23px] font-bold text-[#1E1E1E]">
        Budget
      </h1>

      {/* Center Standing Piggy Illustration */}
      <div className="my-1">
        <StandingPiggyCoin size={125} />
      </div>

      {/* Month Pill Selector */}
      <div className="flex justify-center mt-1">
        <button
          type="button"
          onClick={() => setMonthIdx((i) => (i + 1) % months.length)}
          className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-[#99B8F3] border border-[#6E93D6] text-[#1E1E1E] font-serif text-[11.5px] font-medium shadow-xs hover:bg-[#86ABF0] cursor-pointer transition"
          title="Click to switch month"
        >
          <Calendar size={12} className="text-[#1E1E1E]" />
          <span>{months[monthIdx]}</span>
        </button>
      </div>

      {/* Budget Summary Total: ₹5,000 / ₹10,000 */}
      <div className="text-center mt-2 mb-3">
        <span className="font-serif text-[20px] font-bold text-[#1E1E1E]">
          {formatINR(totalSpent)}
        </span>
        <span className="font-serif text-[15px] font-semibold text-[#3A322E]">
          {' '}
          / {formatINR(totalBudget)}
        </span>
      </div>

      {/* 3 Vertical Pill Bars matching Figma (Rent 50%, Food 30%, Transport 20%) */}
      <div className="flex items-end justify-center gap-5 mt-1">
        {budgetData.categories.map((cat) => {
          const pct =
            totalSpent > 0 ? Math.round((cat.spent / totalSpent) * 100) : 0;
          const barHeightPct = Math.min(100, Math.max(18, pct));
          const isSelected = selectedCat === cat.id;

          return (
            <div
              key={cat.id}
              onClick={() =>
                setSelectedCat(isSelected ? null : cat.id)
              }
              className="flex flex-col items-center cursor-pointer group"
              title="Click to adjust category spend"
            >
              {/* Vertical Pill Track */}
              <div
                className={`w-[58px] h-[126px] rounded-[13px] bg-[#E6E9ED] border transition-all flex flex-col justify-between overflow-hidden relative ${
                  isSelected
                    ? 'border-[#2E5AA7] ring-2 ring-[#C3D9FE]'
                    : 'border-[#CFD5DC] group-hover:border-[#94A3B8]'
                }`}
              >
                {/* Top Amount Label */}
                <span className="font-serif text-[10px] text-[#7A828C] text-center pt-2 z-10">
                  {formatINR(cat.spent)}
                </span>

                {/* Blue Fill Bar from Bottom */}
                <div
                  style={{ height: `${barHeightPct}%` }}
                  className="w-full bg-[#2E5AA7] rounded-b-[11px] flex items-center justify-center transition-all duration-300"
                >
                  <span className="font-serif text-[11px] font-bold text-white">
                    {pct}%
                  </span>
                </div>
              </div>

              {/* Category Name Below */}
              <span className="font-serif text-[11px] font-medium text-[#2C221E] mt-2">
                {cat.name}
              </span>
            </div>
          );
        })}
      </div>

      {/* Interactive Category Adjuster when a bar is tapped */}
      {selectedCat ? (
        <div className="mt-3 px-3 py-2 rounded-xl bg-[#C3D9FE]/70 border border-[#4A78C2] flex items-center justify-between">
          <span className="font-serif text-[11px] font-semibold text-[#1E1E1E]">
            Adjust{' '}
            {budgetData.categories.find((c) => c.id === selectedCat)?.name}:
          </span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => onUpdateCategory(selectedCat, -250)}
              className="px-2 py-0.5 rounded-full bg-white border border-[#4A78C2] font-serif text-[10px] font-bold text-[#1E3A8A] hover:bg-[#DBE8FF] cursor-pointer"
            >
              -₹250
            </button>
            <button
              type="button"
              onClick={() => onUpdateCategory(selectedCat, 250)}
              className="px-2 py-0.5 rounded-full bg-[#2E5AA7] text-white font-serif text-[10px] font-bold hover:bg-[#1E3A8A] cursor-pointer"
            >
              +₹250
            </button>
          </div>
        </div>
      ) : (
        <p className="text-center font-serif text-[9.5px] text-[#8C7B75] mt-3">
          Tap any category bar to adjust monthly spend
        </p>
      )}
    </div>
  );
}

/**
 * 3. ACHIEVEMENTS SCREEN (Row 6: Celebrating Piggy, Total Effort Points: 1250, 2x2 Peach Cards)
 */
export function AchievementsScreen({
  achievements,
  totalPoints,
  onToggleAchievement,
}) {
  return (
    <div className="flex-1 flex flex-col px-5 pt-4 pb-3 bg-[#FFF5F2] overflow-y-auto">
      {/* Header Row with Title & Celebrating Piggy with Coins */}
      <div className="flex items-start justify-between">
        <div className="pt-3">
          <h1 className="font-serif text-[23px] font-bold text-[#1E1E1E]">
            Achievements
          </h1>
          <p className="font-serif text-[10.5px] font-semibold text-[#2C221E] mt-5">
            Total Effort Points:{' '}
            <span className="text-[#2E5AA7] font-bold">{totalPoints}</span>
          </p>
        </div>
        <div className="-mr-2 -mt-1">
          <CelebratingPiggyCoins size={98} />
        </div>
      </div>

      {/* 2x2 Grid of Peach Achievement Cards matching Figma */}
      <div className="grid grid-cols-2 gap-3.5 mt-3 flex-1">
        {achievements.map((ach) => (
          <button
            key={ach.id}
            type="button"
            onClick={() => onToggleAchievement(ach.id)}
            className={`rounded-[16px] p-3.5 text-left flex flex-col justify-between transition-all cursor-pointer border ${
              ach.claimed
                ? 'bg-[#FFE0D6] border-[#F3B6A5] shadow-xs'
                : 'bg-[#FFF0EB] border-[#F5D0C5] opacity-85 hover:opacity-100'
            }`}
            title="Click to toggle claimed status and update Total Effort Points"
          >
            <div className="flex items-start justify-between gap-1">
              <p className="font-serif text-[11.5px] leading-[1.35] text-[#2C221E] font-medium">
                {ach.title}
              </p>
              {ach.claimed && (
                <CheckCircle2
                  size={14}
                  className="text-[#2EB85C] shrink-0 mt-0.5"
                />
              )}
            </div>

            <div className="mt-3 flex items-center justify-between">
              <span className="font-serif text-[10px] font-bold text-[#2E5AA7]">
                +{ach.points} Points
              </span>
              <span className="text-[8.5px] font-serif text-[#8C6D63]">
                {ach.claimed ? 'Earned' : 'Tap to claim'}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

/**
 * 4. PEER CHALLENGE SCREEN (Row 7: Duo Piggies, Weekly Challenge Blue Card, Leaderboard - Friends)
 */
export function PeersScreen({
  weeklySaved,
  onBoostWeeklySaved,
  totalPoints,
  userName = 'You',
}) {
  const target = 500;
  const pct = Math.min(100, Math.round((weeklySaved / target) * 100));

  const friendsBase = [
    {
      id: 'ritu',
      initials: 'RK',
      name: 'Ritu K',
      streak: '4 week streak',
      points: 1450,
      hasTrophy: true,
    },
    {
      id: 'aman',
      initials: 'AK',
      name: 'Aman K',
      streak: '3 week streak',
      points: 1320,
      hasTrophy: false,
    },
    {
      id: 'you',
      initials:
        userName && userName !== 'ABC'
          ? userName.slice(0, 2).toUpperCase()
          : 'YO',
      name: 'You',
      streak: '2 week streak',
      points: totalPoints,
      hasTrophy: false,
      isUser: true,
    },
    {
      id: 'meera',
      initials: 'MS',
      name: 'Meera S',
      streak: '1 week streak',
      points: 980,
      hasTrophy: false,
    },
  ];

  // Sort by points descending so the user can actually climb the leaderboard!
  const leaderboard = [...friendsBase].sort((a, b) => b.points - a.points);

  return (
    <div className="flex-1 flex flex-col px-5 pt-4 pb-3 bg-[#FFF5F2] overflow-y-auto">
      {/* Header Row with Peer Challenge & Duo Piggies */}
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-[22px] font-bold text-[#1E1E1E]">
          Peer Challenge
        </h1>
        <div className="-mr-2 -my-2">
          <PeerPiggies size={92} />
        </div>
      </div>

      {/* Weekly Challenge Dark Blue Card (#2F63B5) */}
      <div className="mt-1 bg-[#2F63B5] rounded-[14px] border-[1.4px] border-[#1E4282] px-4 py-3 text-white shadow-sm">
        <p className="font-serif text-[9px] text-[#DBE8FF] text-center tracking-wide">
          Weekly Peer Challenge
        </p>
        <h2 className="font-serif text-[13px] font-bold text-center mt-0.5">
          Save ₹500 more than last week
        </h2>

        <div className="flex items-center justify-between text-[9.5px] font-serif text-[#E2E8F0] mt-2.5 mb-1">
          <span>Your Progress</span>
          <span>
            ₹{weeklySaved}/₹{target}
          </span>
        </div>

        {/* Golden Yellow Progress Bar */}
        <div className="w-full h-2.5 rounded-full bg-[#789DD6] overflow-hidden border border-[#1E4282]/40">
          <div
            style={{ width: `${pct}%` }}
            className="h-full bg-[#F3B315] rounded-full transition-all duration-300"
          />
        </div>

        <div className="flex items-center justify-between mt-2">
          <button
            type="button"
            onClick={onBoostWeeklySaved}
            className="inline-flex items-center gap-1 text-[9px] font-serif font-semibold bg-[#F3B315] text-[#1E1E1E] px-2.5 py-0.5 rounded-full hover:bg-[#FACC15] cursor-pointer transition"
          >
            <Sparkles size={10} />
            {weeklySaved >= target
              ? 'Challenge Completed! (+₹50)'
              : '+ Save ₹50 Now'}
          </button>
          <span className="font-serif text-[9px] text-[#DBE8FF]">
            4 days left
          </span>
        </div>
      </div>

      {/* Leaderboard - Friends */}
      <h3 className="font-serif text-[12px] font-bold text-[#1E1E1E] text-center mt-3 mb-2">
        Leaderboard - Friends
      </h3>

      <div className="flex flex-col gap-2.5">
        {leaderboard.map((entry, idx) => {
          const rank = idx + 1;
          return (
            <div
              key={entry.id}
              className={`rounded-[12px] bg-[#FFFDFB] border px-3 py-2 flex items-center justify-between transition ${
                entry.isUser
                  ? 'border-[#2E5AA7] ring-1 ring-[#C3D9FE]'
                  : 'border-[#8C8581]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                {/* Orange Rank Circle */}
                <span className="w-5 h-5 rounded-full bg-[#F59E0B] text-[#1E1E1E] font-serif text-[10px] font-bold flex items-center justify-center shrink-0">
                  {rank}
                </span>

                {/* Blue Initials Circle */}
                <div className="w-8 h-8 rounded-full bg-[#2F63B5] text-white font-serif text-[10px] font-bold flex items-center justify-center shrink-0">
                  {entry.initials}
                </div>

                {/* Name & Streak */}
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-serif text-[11px] font-bold text-[#1E1E1E]">
                      {entry.name}
                    </span>
                    {rank === 1 && (
                      <Trophy
                        size={12}
                        className="text-[#D97706] fill-[#FDE68A]"
                      />
                    )}
                  </div>
                  <p className="font-serif text-[9.5px] text-[#5A524E]">
                    {entry.streak}
                  </p>
                </div>
              </div>

              {/* Points */}
              <span className="font-serif text-[11px] font-bold text-[#2E5AA7]">
                {entry.points}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
