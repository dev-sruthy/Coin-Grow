import React, { useState, useEffect } from 'react';
import {
  SplashScreen,
  CoinTransitionScreen,
  WelcomeScreen,
  SignUpScreen,
  StatusFeedbackScreen,
  LoginScreen,
} from './components/AuthScreens';
import {
  HomeScreen,
  BudgetScreen,
  AchievementsScreen,
  PeersScreen,
} from './components/DashboardScreens';
import { BottomNav } from './components/BottomNav';
import {
  Smartphone,
  LayoutGrid,
  Sparkles,
  RotateCcw,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';

const INITIAL_TRANSACTIONS = [
  { id: 1, title: 'Movie', amount: 500, type: 'expense' },
  { id: 2, title: 'Zudio', amount: 900, type: 'expense' },
  { id: 3, title: 'Saved/FD', amount: 500, type: 'saved' },
];

const INITIAL_BUDGET = {
  limit: 10000,
  categories: [
    { id: 'rent', name: 'Rent', spent: 2500 },
    { id: 'food', name: 'Food', spent: 1500 },
    { id: 'transport', name: 'Transport', spent: 1000 },
  ],
};

const INITIAL_ACHIEVEMENTS = [
  {
    id: 'ach1',
    title: 'Consistent Saver: Save 20% budget for 3 months',
    points: 500,
    claimed: true,
  },
  {
    id: 'ach2',
    title: 'Reduced expense of food for 1 month',
    points: 250,
    claimed: true,
  },
  {
    id: 'ach3',
    title: 'Consistent investment for 3 months',
    points: 300,
    claimed: true,
  },
  {
    id: 'ach4',
    title: 'Consistent Saver: Save 10% budget for 1 month',
    points: 200,
    claimed: true,
  },
];

export default function App() {
  // Current screen id:
  // 'splash' | 'coin-transition' | 'welcome' | 'signup' | 'signup-errors' | 'signup-valid' | 'signup-success'
  // | 'login' | 'login-filled' | 'login-error' | 'login-success'
  // | 'home' | 'budget' | 'achievements' | 'peers'
  const [screen, setScreen] = useState('splash');
  const [nextTargetAfterTransition, setNextTargetAfterTransition] =
    useState('welcome');
  const [buttonVisualState, setButtonVisualState] = useState('default'); // 'default' | 'hover' | 'pressed'
  const [viewMode, setViewMode] = useState('interactive'); // 'interactive' | 'storyboard'

  // App state
  const [userName, setUserName] = useState('ABC');
  const [netWorthMode, setNetWorthMode] = useState('positive'); // 'positive' | 'negative'
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);
  const [budgetData, setBudgetData] = useState(INITIAL_BUDGET);
  const [achievements, setAchievements] = useState(INITIAL_ACHIEVEMENTS);
  const [weeklySaved, setWeeklySaved] = useState(350);
  const [bonusPeerPoints, setBonusPeerPoints] = useState(0);

  // Auto-advance coin-catching transition screen after 850ms
  useEffect(() => {
    if (screen === 'coin-transition') {
      const timer = setTimeout(() => {
        setScreen(nextTargetAfterTransition);
      }, 850);
      return () => clearTimeout(timer);
    }
  }, [screen, nextTargetAfterTransition]);

  const navigateWithTransition = (targetScreen, useCoinTransition = false) => {
    if (useCoinTransition) {
      setNextTargetAfterTransition(targetScreen);
      setScreen('coin-transition');
    } else {
      setScreen(targetScreen);
    }
  };

  const totalPoints =
    achievements
      .filter((a) => a.claimed)
      .reduce((sum, a) => sum + a.points, 0) + bonusPeerPoints;

  const handleAddTransaction = (tx) => {
    setTransactions((prev) => [tx, ...prev]);
  };

  const handleUpdateBudgetCategory = (catId, delta) => {
    setBudgetData((prev) => ({
      ...prev,
      categories: prev.categories.map((c) =>
        c.id === catId ? { ...c, spent: Math.max(0, c.spent + delta) } : c
      ),
    }));
  };

  const handleToggleAchievement = (achId) => {
    setAchievements((prev) =>
      prev.map((a) => (a.id === achId ? { ...a, claimed: !a.claimed } : a))
    );
  };

  const handleBoostWeeklySaved = () => {
    setWeeklySaved((prev) => {
      const next = Math.min(500, prev + 50);
      if (next === 500 && prev < 500) {
        setBonusPeerPoints((b) => b + 150);
      }
      return next;
    });
  };

  const resetDemoData = () => {
    setUserName('ABC');
    setNetWorthMode('positive');
    setTransactions(INITIAL_TRANSACTIONS);
    setBudgetData(INITIAL_BUDGET);
    setAchievements(INITIAL_ACHIEVEMENTS);
    setWeeklySaved(350);
    setBonusPeerPoints(0);
    setButtonVisualState('default');
  };

  const isDashboardTab = ['home', 'budget', 'peers', 'achievements'].includes(
    screen
  );

  const renderPhoneScreen = (activeScreenKey = screen) => {
    switch (activeScreenKey) {
      case 'splash':
        return (
          <SplashScreen
            onNavigate={navigateWithTransition}
            buttonVisualState={buttonVisualState}
          />
        );
      case 'coin-transition':
        return (
          <CoinTransitionScreen
            onContinue={() => setScreen(nextTargetAfterTransition)}
          />
        );
      case 'welcome':
        return (
          <WelcomeScreen
            onNavigate={navigateWithTransition}
            buttonVisualState={buttonVisualState}
          />
        );
      case 'signup':
        return (
          <SignUpScreen
            key="signup-empty"
            initialMode="empty"
            buttonVisualState={buttonVisualState}
            onSuccess={(user) => {
              setUserName(user.name || 'ABC');
              setScreen('signup-success');
            }}
            onGoToLogin={() => setScreen('login')}
          />
        );
      case 'signup-errors':
        return (
          <SignUpScreen
            key="signup-errors"
            initialMode="errors"
            buttonVisualState={buttonVisualState}
            onSuccess={(user) => {
              setUserName(user.name || 'ABC');
              setScreen('signup-success');
            }}
            onGoToLogin={() => setScreen('login')}
          />
        );
      case 'signup-valid':
        return (
          <SignUpScreen
            key="signup-valid"
            initialMode="valid"
            buttonVisualState={buttonVisualState}
            onSuccess={(user) => {
              setUserName(user.name || 'ABC');
              setScreen('signup-success');
            }}
            onGoToLogin={() => setScreen('login')}
          />
        );
      case 'signup-success':
        return (
          <StatusFeedbackScreen
            type="success"
            message="Successful account creation"
            buttonLabel="Continue to Log In"
            onAction={() => setScreen('login-filled')}
          />
        );
      case 'login':
        return (
          <LoginScreen
            key="login-empty"
            initialFilled={false}
            buttonVisualState={buttonVisualState}
            onLoginSuccess={(name) => {
              setUserName(name || 'ABC');
              setScreen('login-success');
            }}
            onLoginError={() => setScreen('login-error')}
            onGoToSignUp={() => setScreen('signup')}
          />
        );
      case 'login-filled':
        return (
          <LoginScreen
            key="login-filled"
            initialFilled={true}
            buttonVisualState={buttonVisualState}
            onLoginSuccess={(name) => {
              setUserName(name || 'ABC');
              setScreen('login-success');
            }}
            onLoginError={() => setScreen('login-error')}
            onGoToSignUp={() => setScreen('signup')}
          />
        );
      case 'login-error':
        return (
          <StatusFeedbackScreen
            type="error"
            message="Invalid Username or password"
            buttonLabel="Try Again"
            onAction={() => setScreen('login')}
          />
        );
      case 'login-success':
        return (
          <StatusFeedbackScreen
            type="success"
            message="Successful login"
            buttonLabel="Open Dashboard"
            onAction={() => setScreen('home')}
          />
        );
      case 'home':
      case 'home-negative': {
        const effectiveMode =
          activeScreenKey === 'home-negative' ? 'negative' : netWorthMode;
        return (
          <>
            <HomeScreen
              userName={userName}
              netWorthMode={effectiveMode}
              onToggleNetWorthMode={() =>
                setNetWorthMode((m) =>
                  m === 'positive' ? 'negative' : 'positive'
                )
              }
              transactions={transactions}
              onAddTransaction={handleAddTransaction}
            />
            <BottomNav activeTab="home" onSelectTab={(t) => setScreen(t)} />
          </>
        );
      }
      case 'budget':
        return (
          <>
            <BudgetScreen
              budgetData={budgetData}
              onUpdateCategory={handleUpdateBudgetCategory}
            />
            <BottomNav activeTab="budget" onSelectTab={(t) => setScreen(t)} />
          </>
        );
      case 'achievements':
        return (
          <>
            <AchievementsScreen
              achievements={achievements}
              totalPoints={totalPoints}
              onToggleAchievement={handleToggleAchievement}
            />
            <BottomNav
              activeTab="achievements"
              onSelectTab={(t) => setScreen(t)}
            />
          </>
        );
      case 'peers':
        return (
          <>
            <PeersScreen
              weeklySaved={weeklySaved}
              onBoostWeeklySaved={handleBoostWeeklySaved}
              totalPoints={totalPoints}
              userName={userName}
            />
            <BottomNav activeTab="peers" onSelectTab={(t) => setScreen(t)} />
          </>
        );
      default:
        return null;
    }
  };

  const screenGroups = [
    {
      group: 'Onboarding & Welcome',
      items: [
        { id: 'splash', label: '1. Splash (CoinGrow)' },
        { id: 'coin-transition', label: '2. Coin Catch Transition' },
        { id: 'welcome', label: '3. Welcome Screen' },
      ],
    },
    {
      group: 'Sign Up Flow',
      items: [
        { id: 'signup', label: '4. Sign Up (Empty)' },
        { id: 'signup-errors', label: '5. Sign Up (Age 12 Errors)' },
        { id: 'signup-valid', label: '6. Sign Up (Valid Filled)' },
        { id: 'signup-success', label: '7. Account Created Success' },
      ],
    },
    {
      group: 'Log In Flow',
      items: [
        { id: 'login', label: '8. Log In (Empty)' },
        { id: 'login-filled', label: '9. Log In (Filled "Abc")' },
        { id: 'login-error', label: '10. Invalid Login Error' },
        { id: 'login-success', label: '11. Successful Login' },
      ],
    },
    {
      group: 'Main App Tabs',
      items: [
        {
          id: 'home-positive',
          label: '12. Home (+₹12,500 👍)',
          action: () => {
            setNetWorthMode('positive');
            setScreen('home');
          },
        },
        {
          id: 'home-negative',
          label: '13. Home (-₹500 👎)',
          action: () => {
            setNetWorthMode('negative');
            setScreen('home');
          },
        },
        { id: 'budget', label: '14. Budget (May ₹5k/₹10k)' },
        { id: 'achievements', label: '15. Achievements (1250 pts)' },
        { id: 'peers', label: '16. Peer Challenge & Ranks' },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#ECE7E2] text-[#1E1E1E] flex flex-col">
      {/* Top App Bar */}
      <header className="w-full bg-[#FFF5F2]/90 backdrop-blur-md border-b border-[#E5D8D2] px-6 py-3 flex flex-wrap items-center justify-between gap-3 sticky top-0 z-30">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-[#EED202] border-[1.5px] border-[#2C221E] flex items-center justify-center font-serif font-bold text-[15px] shadow-xs">
            ₹
          </div>
          <div>
            <span className="font-serif text-[18px] font-bold tracking-tight text-[#1E1E1E]">
              CoinGrow
            </span>
            <span className="ml-2 text-[11px] px-2 py-0.5 rounded-full bg-[#C3D9FE] text-[#1E3A8A] font-medium">
              Interactive Fintech Prototype
            </span>
          </div>
        </div>

        {/* View Mode Switcher: Single Interactive Phone vs Full Figma Storyboard Grid */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setViewMode('interactive')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium cursor-pointer transition ${
              viewMode === 'interactive'
                ? 'bg-[#2E5AA7] text-white shadow-xs'
                : 'bg-white text-[#3A322E] border border-[#D8CFCB] hover:bg-[#FFF5F2]'
            }`}
          >
            <Smartphone size={14} />
            Interactive Phone
          </button>
          <button
            type="button"
            onClick={() => setViewMode('storyboard')}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium cursor-pointer transition ${
              viewMode === 'storyboard'
                ? 'bg-[#2E5AA7] text-white shadow-xs'
                : 'bg-white text-[#3A322E] border border-[#D8CFCB] hover:bg-[#FFF5F2]'
            }`}
          >
            <LayoutGrid size={14} />
            All Figma Frames Grid
          </button>
          <button
            type="button"
            onClick={resetDemoData}
            title="Reset all demo data to initial Figma values"
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium bg-white text-[#5A4E4A] border border-[#D8CFCB] hover:bg-[#FFF5F2] cursor-pointer transition"
          >
            <RotateCcw size={13} />
            Reset
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      {viewMode === 'interactive' ? (
        <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6 flex flex-col lg:flex-row items-center lg:items-start justify-center gap-8">
          {/* Interactive Mobile Device Frame (320 x 610 matching Figma proportions) */}
          <div className="relative shrink-0">
            <div className="w-[325px] h-[615px] rounded-[34px] bg-[#1E1E1E] p-[9px] shadow-[0_20px_50px_rgba(44,34,30,0.22)] ring-1 ring-black/10">
              {/* Top Speaker Notch */}
              <div className="w-full h-full rounded-[26px] bg-[#FFF5F2] overflow-hidden flex flex-col relative">
                <div className="w-full pt-2 pb-1 px-5 flex items-center justify-between text-[10px] font-serif text-[#7A6B66] bg-[#FFF5F2] shrink-0 select-none">
                  <span>9:41</span>
                  <div className="w-14 h-1.5 rounded-full bg-[#E5D5CE]" />
                  <span>100%</span>
                </div>

                {/* Screen Content */}
                {renderPhoneScreen(screen)}
              </div>
            </div>
          </div>

          {/* Right Side Screen Explorer & Interactive Controls */}
          <aside className="w-full max-w-md bg-[#FFF5F2] rounded-2xl border border-[#E5D8D2] p-5 shadow-xs">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-serif text-[16px] font-bold text-[#1E1E1E] flex items-center gap-1.5">
                <Sparkles size={16} className="text-[#2E5AA7]" />
                Figma Screen &amp; Flow Switcher
              </h2>
              <span className="text-[11px] font-serif text-[#6E5D57]">
                16 States
              </span>
            </div>

            <p className="text-xs text-[#5A4E4A] mb-4 leading-relaxed">
              Use the phone directly (including live form validation, expense
              tracking, budget bars, and peer challenges) or jump to any frame
              from your Figma design below:
            </p>

            {/* Button State Inspector (Row 1 & Row 2 Figma Button States) */}
            <div className="mb-4 p-3 rounded-xl bg-white border border-[#E5D8D2]">
              <div className="text-[11px] font-serif font-bold text-[#2C221E] mb-2">
                Button Interaction State Preview (Row 1 &amp; 2):
              </div>
              <div className="flex gap-2">
                {[
                  {
                    id: 'default',
                    label: 'Default (#2E5AA7)',
                    dot: 'bg-[#2E5AA7]',
                  },
                  {
                    id: 'hover',
                    label: 'Hover (#627FBA)',
                    dot: 'bg-[#627FBA]',
                  },
                  {
                    id: 'pressed',
                    label: 'Pressed (#DBE8FF)',
                    dot: 'bg-[#DBE8FF] border border-[#1E1E1E]',
                  },
                ].map((st) => (
                  <button
                    key={st.id}
                    type="button"
                    onClick={() => setButtonVisualState(st.id)}
                    className={`flex-1 py-1.5 px-2 rounded-lg text-[10.5px] font-serif flex items-center justify-center gap-1.5 border cursor-pointer transition ${
                      buttonVisualState === st.id
                        ? 'bg-[#DBE8FF]/60 border-[#2E5AA7] font-bold text-[#1E3A8A]'
                        : 'bg-[#FAF7F5] border-[#E5D8D2] text-[#4A4A4A]'
                    }`}
                  >
                    <span className={`w-2.5 h-2.5 rounded-full ${st.dot}`} />
                    {st.id.charAt(0).toUpperCase() + st.id.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Grouped Screen Buttons */}
            <div className="space-y-3.5">
              {screenGroups.map((grp) => (
                <div key={grp.group}>
                  <h3 className="text-[11px] font-bold uppercase tracking-wider text-[#8C7A72] mb-1.5">
                    {grp.group}
                  </h3>
                  <div className="grid grid-cols-2 gap-1.5">
                    {grp.items.map((item) => {
                      const isActive =
                        screen === item.id ||
                        (item.id === 'home-positive' &&
                          screen === 'home' &&
                          netWorthMode === 'positive') ||
                        (item.id === 'home-negative' &&
                          screen === 'home' &&
                          netWorthMode === 'negative');
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() =>
                            item.action ? item.action() : setScreen(item.id)
                          }
                          className={`text-left px-3 py-2 rounded-xl font-serif text-[11.5px] border transition cursor-pointer ${
                            isActive
                              ? 'bg-[#2E5AA7] text-white border-[#1E3A8A] font-semibold shadow-xs'
                              : 'bg-white text-[#2C221E] border-[#E5D8D2] hover:bg-[#DBE8FF]/40 hover:border-[#627FBA]'
                          }`}
                        >
                          {item.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </main>
      ) : (
        /* Full Figma Storyboard Grid View showing all screens side by side */
        <main className="flex-1 max-w-[1400px] w-full mx-auto px-6 py-8 space-y-10">
          {[
            {
              title: 'Row 1 — Splash Screen States & Coin Transition',
              frames: [
                {
                  label: 'Splash (Default)',
                  render: () => (
                    <SplashScreen
                      onNavigate={navigateWithTransition}
                      buttonVisualState="default"
                    />
                  ),
                },
                {
                  label: 'Splash (Hover)',
                  render: () => (
                    <SplashScreen
                      onNavigate={navigateWithTransition}
                      buttonVisualState="hover"
                    />
                  ),
                },
                {
                  label: 'Splash (Pressed)',
                  render: () => (
                    <SplashScreen
                      onNavigate={navigateWithTransition}
                      buttonVisualState="pressed"
                    />
                  ),
                },
                {
                  label: 'Coin Catch Transition',
                  render: () => <CoinTransitionScreen onContinue={() => {}} />,
                },
              ],
            },
            {
              title: 'Row 2 — Welcome & Sign Up Flow (Empty, Validation Errors, Valid, Success)',
              frames: [
                {
                  label: 'Welcome (Default)',
                  render: () => (
                    <WelcomeScreen
                      onNavigate={navigateWithTransition}
                      buttonVisualState="default"
                    />
                  ),
                },
                {
                  label: 'Sign Up (Empty)',
                  render: () => (
                    <SignUpScreen
                      initialMode="empty"
                      onSuccess={() => {}}
                      onGoToLogin={() => {}}
                    />
                  ),
                },
                {
                  label: 'Sign Up (Validation Errors)',
                  render: () => (
                    <SignUpScreen
                      initialMode="errors"
                      onSuccess={() => {}}
                      onGoToLogin={() => {}}
                    />
                  ),
                },
                {
                  label: 'Account Created',
                  render: () => (
                    <StatusFeedbackScreen
                      type="success"
                      message="Successful account creation"
                      buttonLabel="Continue"
                      onAction={() => {}}
                    />
                  ),
                },
              ],
            },
            {
              title: 'Row 3 — Log In Flow (Empty, Filled, Invalid Error, Success)',
              frames: [
                {
                  label: 'Log In (Empty)',
                  render: () => (
                    <LoginScreen
                      initialFilled={false}
                      onLoginSuccess={() => {}}
                      onLoginError={() => {}}
                      onGoToSignUp={() => {}}
                    />
                  ),
                },
                {
                  label: 'Log In (Filled & Pressed)',
                  render: () => (
                    <LoginScreen
                      initialFilled={true}
                      buttonVisualState="pressed"
                      onLoginSuccess={() => {}}
                      onLoginError={() => {}}
                      onGoToSignUp={() => {}}
                    />
                  ),
                },
                {
                  label: 'Invalid Username/Password',
                  render: () => (
                    <StatusFeedbackScreen
                      type="error"
                      message="Invalid Username or password"
                      buttonLabel="Try Again"
                      onAction={() => {}}
                    />
                  ),
                },
                {
                  label: 'Successful Login',
                  render: () => (
                    <StatusFeedbackScreen
                      type="success"
                      message="Successful login"
                      buttonLabel="Dashboard"
                      onAction={() => {}}
                    />
                  ),
                },
              ],
            },
            {
              title: 'Rows 4–7 — Home (+₹12,500 & -₹500), Budget, Achievements & Peer Challenge',
              frames: [
                {
                  label: 'Home (Positive +₹12,500)',
                  render: () => renderPhoneScreen('home'),
                },
                {
                  label: 'Home (Negative -₹500)',
                  render: () => renderPhoneScreen('home-negative'),
                },
                {
                  label: 'Budget (May ₹5,000/₹10,000)',
                  render: () => renderPhoneScreen('budget'),
                },
                {
                  label: 'Achievements (1250 pts)',
                  render: () => renderPhoneScreen('achievements'),
                },
                {
                  label: 'Peer Challenge',
                  render: () => renderPhoneScreen('peers'),
                },
              ],
            },
          ].map((row) => (
            <section key={row.title}>
              <h2 className="font-serif text-[16px] font-bold text-[#2C221E] mb-4">
                {row.title}
              </h2>
              <div className="flex flex-wrap gap-6">
                {row.frames.map((frame) => (
                  <div key={frame.label} className="flex flex-col items-center">
                    <span className="text-xs font-serif text-[#5A4E4A] mb-2">
                      {frame.label}
                    </span>
                    <div className="w-[290px] h-[565px] rounded-[24px] bg-[#FFF5F2] border border-[#DFCFC8] shadow-md overflow-hidden flex flex-col">
                      {frame.render()}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </main>
      )}
    </div>
  );
}
