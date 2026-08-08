import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Home, Compass, Activity, Heart, MessageSquare, Bell, Calendar, MapPin, Users, Check, Mail, Lock } from 'lucide-react';

const TreeLogo: React.FC = () => (
  <div className="flex justify-center items-center py-1">
    <svg width="42" height="48" viewBox="0 0 36 42" fill="none" className="text-[#3E6B48]">
      <path
        d="M18 3C13.5 3 10.5 6 10.5 10C10.5 10.8 10.7 11.5 11 12.2C8 13.5 6 16.5 6 20C6 24 9.5 27.5 14 27.5C14.7 27.5 15.3 27.4 16 27.2C16.8 29.2 18.5 30.5 20.5 30.5C22.5 30.5 24.2 29.2 25 27.2C25.7 27.4 26.3 27.5 27 27.5C31.5 27.5 35 24 35 20C35 16.5 33 13.5 30 12.2C30.3 11.5 30.5 10.8 30.5 10C30.5 6 27.5 3 23 3H18Z"
        fill="#2E543A"
      />
      <rect x="16.5" y="27" width="3" height="11" rx="1" fill="#4B382A" />
    </svg>
  </div>
);

export const WalkForPlasticMotionClip: React.FC = () => {
  // Local active states for the automated walkthrough animation
  const [activeScreen, setActiveScreen] = useState<'login' | 'home' | 'explore'>('login');
  const [chartTab, setChartTab] = useState<'week' | 'month' | 'year'>('week');
  const [pointer, setPointer] = useState({ x: 134, y: 150, opacity: 0, scale: 1 });
  const [clickActive, setClickActive] = useState(false);
  const [isJoined, setIsJoined] = useState(false);
  const [loopProgress, setLoopProgress] = useState(0);

  const [emailText, setEmailText] = useState('');
  const [passwordText, setPasswordText] = useState('');

  // High-fidelity touch simulation timeline
  useEffect(() => {
    let active = true;
    let step = 0;

    const timeline = [
      // Step 0: Reset state (Login Screen, empty fields, not joined)
      {
        action: () => {
          setActiveScreen('login');
          setChartTab('week');
          setIsJoined(false);
          setEmailText('');
          setPasswordText('');
          setPointer({ x: 134, y: 150, opacity: 0, scale: 1 });
          setLoopProgress(0);
        },
        delay: 1000
      },
      // Step 1: Pointer fades in and moves to Email input field
      {
        action: () => {
          setPointer({ x: 134, y: 224, opacity: 0.8, scale: 1 });
          setLoopProgress(5);
        },
        delay: 1000
      },
      // Step 2: Touch down on Email field & simulate typing
      {
        action: () => {
          setPointer(prev => ({ ...prev, scale: 0.8 }));
          setClickActive(true);
          
          // Type out "volunteer@cc.org" dynamically
          const email = "volunteer@cc.org";
          let i = 0;
          const typingInterval = setInterval(() => {
            if (i < email.length) {
              setEmailText(email.substring(0, i + 1));
              i++;
            } else {
              clearInterval(typingInterval);
            }
          }, 60);
        },
        delay: 200
      },
      // Step 3: Release Touch on Email field
      {
        action: () => {
          setPointer(prev => ({ ...prev, scale: 1 }));
          setClickActive(false);
          setLoopProgress(15);
        },
        delay: 1200
      },
      // Step 4: Pointer moves to Password input field
      {
        action: () => {
          setPointer({ x: 134, y: 294, opacity: 0.8, scale: 1 });
          setLoopProgress(20);
        },
        delay: 1000
      },
      // Step 5: Touch down on Password field & simulate typing
      {
        action: () => {
          setPointer(prev => ({ ...prev, scale: 0.8 }));
          setClickActive(true);
          
          // Type out password bullet characters
          const pass = "••••••••";
          let i = 0;
          const typingInterval = setInterval(() => {
            if (i < pass.length) {
              setPasswordText(pass.substring(0, i + 1));
              i++;
            } else {
              clearInterval(typingInterval);
            }
          }, 80);
        },
        delay: 200
      },
      // Step 6: Release Touch on Password field
      {
        action: () => {
          setPointer(prev => ({ ...prev, scale: 1 }));
          setClickActive(false);
          setLoopProgress(30);
        },
        delay: 1000
      },
      // Step 7: Pointer moves to SIGN IN button
      {
        action: () => {
          setPointer({ x: 134, y: 366, opacity: 0.8, scale: 1 });
          setLoopProgress(35);
        },
        delay: 1000
      },
      // Step 8: Touch down on SIGN IN button & transition to Home
      {
        action: () => {
          setPointer(prev => ({ ...prev, scale: 0.8 }));
          setClickActive(true);
          setActiveScreen('home');
          setLoopProgress(45);
        },
        delay: 200
      },
      // Step 9: Release Touch on SIGN IN and pointer moves to MONTH tab
      {
        action: () => {
          setPointer({ x: 134, y: 195, opacity: 0.8, scale: 1 });
          setClickActive(false);
          setLoopProgress(50);
        },
        delay: 1200
      },
      // Step 10: Touch down on MONTH
      {
        action: () => {
          setPointer(prev => ({ ...prev, scale: 0.8 }));
          setClickActive(true);
          setChartTab('month');
          setLoopProgress(55);
        },
        delay: 200
      },
      // Step 11: Release Touch on MONTH & pointer moves to YEAR tab
      {
        action: () => {
          setPointer({ x: 223, y: 195, opacity: 0.8, scale: 1 });
          setClickActive(false);
          setLoopProgress(60);
        },
        delay: 800
      },
      // Step 12: Touch down on YEAR
      {
        action: () => {
          setPointer(prev => ({ ...prev, scale: 0.8 }));
          setClickActive(true);
          setChartTab('year');
          setLoopProgress(65);
        },
        delay: 200
      },
      // Step 13: Release Touch on YEAR & pointer moves to Bottom EXPLORE tab
      {
        action: () => {
          setPointer({ x: 107, y: 490, opacity: 0.8, scale: 1 });
          setClickActive(false);
          setLoopProgress(70);
        },
        delay: 800
      },
      // Step 14: Touch down on EXPLORE
      {
        action: () => {
          setPointer(prev => ({ ...prev, scale: 0.8 }));
          setClickActive(true);
          setActiveScreen('explore');
          setLoopProgress(75);
        },
        delay: 200
      },
      // Step 15: Release Touch on EXPLORE & pointer moves to Join/Details Marina Beach
      {
        action: () => {
          setPointer({ x: 220, y: 145, opacity: 0.8, scale: 1 });
          setClickActive(false);
          setLoopProgress(80);
        },
        delay: 800
      },
      // Step 16: Touch down to Join Event
      {
        action: () => {
          setPointer(prev => ({ ...prev, scale: 0.8 }));
          setClickActive(true);
          setIsJoined(true);
          setLoopProgress(90);
        },
        delay: 200
      },
      // Step 17: Release Touch on Join & pointer moves back to HOME tab
      {
        action: () => {
          setPointer({ x: 27, y: 490, opacity: 0.8, scale: 1 });
          setClickActive(false);
          setLoopProgress(95);
        },
        delay: 1500
      },
      // Step 18: Touch down on HOME tab & reset views
      {
        action: () => {
          setPointer(prev => ({ ...prev, scale: 0.8 }));
          setClickActive(true);
          setActiveScreen('home');
          setChartTab('week');
          setIsJoined(false);
          setLoopProgress(100);
        },
        delay: 200
      },
      // Step 19: Release Touch on HOME, fade out pointer, logout to login
      {
        action: () => {
          setPointer({ x: 134, y: 150, opacity: 0, scale: 1 });
          setClickActive(false);
          setActiveScreen('login');
          setEmailText('');
          setPasswordText('');
        },
        delay: 1000
      }
    ];

    const runNextStep = () => {
      if (!active) return;
      const current = timeline[step];
      current.action();
      step = (step + 1) % timeline.length;
      setTimeout(runNextStep, current.delay);
    };

    runNextStep();

    return () => {
      active = false;
    };
  }, []);

  // Custom datasets matching screenshots
  const weekData = [
    { label: 'Mon', value: 50, active: false },
    { label: 'Tue', value: 58, active: false },
    { label: 'Wed', value: 42, active: false },
    { label: 'Thu', value: 68, active: false },
    { label: 'Fri', value: 52, active: false },
    { label: 'Sat', value: 84, active: true },
    { label: 'Sun', value: 74, active: false }
  ];

  const monthData = [
    { label: 'W1', value: 65, active: false },
    { label: 'W2', value: 78, active: false },
    { label: 'W3', value: 55, active: false },
    { label: 'W4', value: 88, active: true }
  ];

  const yearData = [
    { label: 'Jul', value: 70, active: false },
    { label: 'Aug', value: 62, active: false },
    { label: 'Sep', value: 55, active: false },
    { label: 'Oct', value: 66, active: false },
    { label: 'Nov', value: 72, active: false },
    { label: 'Dec', value: 82, active: true }
  ];

  const currentChartData = chartTab === 'week' ? weekData : chartTab === 'month' ? monthData : yearData;

  return (
    <div className="relative w-[280px] h-[520px] rounded-[16px] bg-slate-100 border-[3px] border-slate-800 shadow-2xl overflow-hidden font-sans select-none text-slate-800 flex flex-col">
      {/* Touch Interaction Gesture Pointer */}
      <motion.div
        animate={{
          x: pointer.x,
          y: pointer.y,
          opacity: pointer.opacity,
          scale: pointer.scale
        }}
        transition={{
          type: "spring",
          stiffness: 140,
          damping: 18,
          opacity: { duration: 0.3 }
        }}
        className="absolute w-5 h-5 rounded-full border-2 border-white bg-[#3E6B48]/30 shadow-[0_2px_10px_rgba(0,0,0,0.15)] z-50 pointer-events-none -ml-2.5 -mt-2.5 flex items-center justify-center"
      >
        <AnimatePresence>
          {clickActive && (
            <motion.span
              initial={{ scale: 0.6, opacity: 0.9 }}
              animate={{ scale: 2.5, opacity: 0 }}
              exit={{ opacity: 0 }}
              className="absolute w-full h-full rounded-full bg-[#3E6B48]/40 border border-[#3E6B48]"
              transition={{ duration: 0.4 }}
            />
          )}
        </AnimatePresence>
      </motion.div>

      {/* Sliding Viewport Container */}
      <div className="flex-1 overflow-hidden pt-6 bg-slate-50 flex flex-col relative">
        <motion.div
          animate={{ 
            x: activeScreen === 'login' ? 0 : activeScreen === 'home' ? -268 : -536 
          }}
          transition={{ type: "spring", stiffness: 220, damping: 25 }}
          className="flex h-full w-[804px]"
        >
          {/* LOGIN SCREEN VIEW */}
          <div className="w-[268px] h-full flex-shrink-0 px-3.5 py-4 flex flex-col justify-center bg-[#F8FAFC] relative">
            <div className="w-full bg-white border border-[#E2E8F0] rounded-[32px] px-5 py-6 shadow-[0_4px_24px_rgba(0,0,0,0.02)] flex flex-col justify-center space-y-5">
              {/* Tree Logo */}
              <TreeLogo />
              
              {/* Welcome Back Header */}
              <div className="text-center">
                <h3 className="text-[21px] font-bold text-slate-900 tracking-tight leading-none">
                  Welcome Back
                </h3>
                <p className="text-[11.5px] text-slate-500 font-medium leading-normal mt-1.5">
                  Sign in to continue your impact
                </p>
              </div>

              {/* Form Fields */}
              <div className="space-y-4">
                {/* Email input */}
                <div className="text-left">
                  <label className="text-[11px] font-semibold text-slate-500 block mb-1 ml-1">Email</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300">
                      <Mail className="w-4 h-4" />
                    </span>
                    <div className="w-full h-[42px] pl-9.5 pr-3 rounded-[16px] border border-[#E2E8F0] bg-white flex items-center text-xs font-normal text-slate-800 shadow-[0_1px_2px_rgba(0,0,0,0.01)]">
                      {emailText}
                      {emailText === '' && <span className="text-slate-300">example@gmail.com</span>}
                    </div>
                  </div>
                </div>

                {/* Password input */}
                <div className="text-left">
                  <label className="text-[11px] font-semibold text-slate-500 block mb-1 ml-1">Password</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-300">
                      <Lock className="w-4 h-4" />
                    </span>
                    <div className="w-full h-[42px] pl-9.5 pr-3 rounded-[16px] border border-[#E2E8F0] bg-white flex items-center text-xs font-normal text-slate-800 shadow-[0_1px_2px_rgba(0,0,0,0.01)]">
                      {passwordText}
                      {passwordText === '' && <span className="text-slate-300">••••••••</span>}
                    </div>
                  </div>
                </div>
              </div>

              {/* Sign In Button */}
              <div className="pt-1.5">
                <motion.div
                  animate={{
                    scale: clickActive && pointer.y > 340 && pointer.y < 380 ? 0.95 : 1
                  }}
                  className="w-full h-[44px] bg-[#558564] hover:bg-[#477053] text-white rounded-2xl flex items-center justify-center gap-2 font-bold text-[12px] tracking-wider shadow-sm transition-colors duration-150 cursor-pointer"
                >
                  <svg viewBox="0 0 24 24" className="w-4 h-4 stroke-[2.5]" fill="none" stroke="currentColor">
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                    <polyline points="10 17 15 12 10 7" />
                    <line x1="15" y1="12" x2="3" y2="12" />
                  </svg>
                  SIGN IN
                </motion.div>
              </div>

              {/* Bottom text link */}
              <div className="text-center pt-0.5">
                <p className="text-[11px] text-slate-500 font-semibold">
                  Don't have an account? <span className="text-[#558564] font-bold">Join us</span>
                </p>
              </div>
            </div>
          </div>

          {/* HOME SCREEN VIEW */}
          <div className="w-[268px] h-full flex-shrink-0 px-3.5 pt-3 pb-4 space-y-3.5 flex flex-col overflow-y-auto no-scrollbar bg-slate-50">
            {/* Header Greeting */}
            <div className="flex items-center justify-between flex-shrink-0">
              <div>
                <span className="text-[9px] font-bold uppercase tracking-wider text-[#3E6B48]">
                  WELCOME BACK
                </span>
                <h3 className="text-lg font-black text-slate-900 tracking-tight leading-tight">
                  Hello, volunteer! 👋
                </h3>
              </div>
              <div className="relative w-8 h-8 rounded-xl bg-white border border-slate-100 shadow-sm flex items-center justify-center text-slate-600">
                <Bell className="w-3.5 h-3.5" />
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
              </div>
            </div>

            {/* Community Impact Grid */}
            <div className="space-y-1 flex-shrink-0">
              <h4 className="text-[13px] font-extrabold text-slate-900 tracking-tight">Community Impact</h4>
              <div className="grid grid-cols-2 gap-2 pt-1">
                <div className="p-2.5 rounded-[18px] bg-[#FDF2F0] flex flex-col justify-between h-[64px] border border-[#fbe9e6]">
                  <span className="text-[7px] font-bold uppercase tracking-wider text-[#B25E52]">VOLUNTEERS</span>
                  <h2 className="text-sm font-black text-[#80382F] tracking-tight">24K MEMBERS</h2>
                </div>
                <div className="p-2.5 rounded-[18px] bg-[#EDF3F5] flex flex-col justify-between h-[64px] border border-[#e2ecef]">
                  <span className="text-[7px] font-bold uppercase tracking-wider text-[#617B87]">COLLECTED</span>
                  <h2 className="text-sm font-black text-[#38525F] tracking-tight">2.7M TONS</h2>
                </div>
              </div>
            </div>

            {/* Chart Area */}
            <div className="space-y-1 flex-1 flex flex-col justify-end min-h-0 pb-1">
              <div className="flex justify-between items-center">
                <h4 className="text-[13px] font-extrabold text-slate-900 tracking-tight">Impact Overview</h4>
                <span className="text-[9px] font-mono font-bold text-[#3E6B48]">
                  {chartTab === 'week' && '02.05 - 02.11'}
                  {chartTab === 'month' && 'FEB 2026'}
                  {chartTab === 'year' && 'YEAR 2026'}
                </span>
              </div>

              <div className="bg-white border border-slate-100 rounded-[20px] p-2.5 shadow-sm space-y-2">
                {/* Custom Segmented Controller Tabs */}
                <div className="flex bg-slate-50 p-0.5 rounded-full text-[9px] font-bold text-slate-400 relative">
                  <button className={`flex-1 py-1 rounded-full relative z-10 transition-colors ${chartTab === 'week' ? 'text-slate-900 font-extrabold' : 'hover:text-slate-600'}`}>
                    WEEK
                    {chartTab === 'week' && (
                      <motion.span layoutId="activePill" className="absolute inset-0 bg-white shadow-[0_1.5px_4px_rgba(0,0,0,0.06)] rounded-full -z-10" />
                    )}
                  </button>
                  <button className={`flex-1 py-1 rounded-full relative z-10 transition-colors ${chartTab === 'month' ? 'text-slate-900 font-extrabold' : 'hover:text-slate-600'}`}>
                    MONTH
                    {chartTab === 'month' && (
                      <motion.span layoutId="activePill" className="absolute inset-0 bg-white shadow-[0_1.5px_4px_rgba(0,0,0,0.06)] rounded-full -z-10" />
                    )}
                  </button>
                  <button className={`flex-1 py-1 rounded-full relative z-10 transition-colors ${chartTab === 'year' ? 'text-slate-900 font-extrabold' : 'hover:text-slate-600'}`}>
                    YEAR
                    {chartTab === 'year' && (
                      <motion.span layoutId="activePill" className="absolute inset-0 bg-white shadow-[0_1.5px_4px_rgba(0,0,0,0.06)] rounded-full -z-10" />
                    )}
                  </button>
                </div>

                {/* Micro Bar Chart */}
                <div className="h-[95px] w-full flex items-end justify-around pt-2 px-0.5 relative min-h-0">
                  <div className="absolute left-0 right-0 top-3 border-t border-dashed border-slate-50" />
                  <div className="absolute left-0 right-0 top-10 border-t border-dashed border-slate-50" />
                  <div className="absolute left-0 right-0 top-17 border-t border-dashed border-slate-50" />

                  {currentChartData.map((bar) => (
                    <div key={bar.label} className="flex flex-col items-center flex-1 h-full justify-end z-10">
                      {bar.active && (
                        <motion.span
                          initial={{ scale: 0.8, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          className="bg-[#3E6B48] text-white font-mono font-bold text-[6px] py-0.5 px-1 rounded-md -mb-0.5 shadow-sm"
                        >
                          {bar.value} kg
                        </motion.span>
                      )}
                      <div className="w-4 bg-slate-50 rounded-full h-[60px] flex items-end overflow-hidden mt-0.5">
                        <motion.div
                          initial={{ height: "0%" }}
                          animate={{ height: `${bar.value}%` }}
                          transition={{ type: "spring", stiffness: 120, damping: 15 }}
                          className={`w-full rounded-full transition-colors duration-300 ${
                            bar.active ? 'bg-[#3E6B48]' : 'bg-[#C6D8C8]'
                          }`}
                        />
                      </div>
                      <span className={`text-[8px] mt-0.5 font-bold tracking-tight ${bar.active ? 'text-[#3E6B48] font-black' : 'text-slate-400'}`}>
                        {bar.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* EXPLORE SCREEN VIEW */}
          <div className="w-[268px] h-full flex-shrink-0 px-3.5 pt-3 pb-4 space-y-3.5 flex flex-col overflow-y-auto no-scrollbar bg-slate-50">
            <div>
              <h3 className="text-lg font-black text-[#3E6B48] tracking-tight leading-tight">
                Upcoming Events
              </h3>
              <p className="text-[10px] text-slate-400 font-medium">Be a catalyst for clean beaches</p>
            </div>

            {/* Event Cards stack */}
            <div className="space-y-3 flex-1 overflow-y-auto no-scrollbar min-h-0">
              {/* Event card #1 */}
              <div className="bg-white border border-slate-100 rounded-[20px] p-3 shadow-sm relative overflow-hidden transition-all duration-300">
                <div className="flex justify-between items-start">
                  <span className="px-1.5 py-0.5 rounded bg-slate-50 text-slate-400 font-mono text-[8px] font-bold">
                    BEACH SWEEP
                  </span>
                  <div className="flex items-center gap-0.5 text-[8.5px] text-slate-500 font-bold">
                    <Users className="w-3 h-3 text-[#3E6B48]" />
                    <span>46 Active</span>
                  </div>
                </div>

                <h4 className="text-[13px] font-black text-slate-900 tracking-tight mt-1.5">
                  Marina Beach Cleanup
                </h4>

                <div className="flex items-center gap-2 mt-2 text-[9px] text-slate-400 font-medium">
                  <div className="flex items-center gap-0.5">
                    <MapPin className="w-3 h-3 text-red-400" />
                    <span>Marina Beach</span>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <Calendar className="w-3 h-3 text-blue-400" />
                    <span>04/10</span>
                  </div>
                </div>

                <div className="border-t border-slate-50 mt-2.5 pt-2 flex justify-between items-center">
                  <span className="text-[8px] text-slate-400">By CC Volunteers</span>
                  
                  {/* Automated Interactive Button */}
                  <motion.div
                    animate={{
                      scale: isJoined ? 1.02 : 1,
                      backgroundColor: isJoined ? "#3E6B48" : "#E8F0EA"
                    }}
                    className={`px-2.5 py-1 rounded-full text-[8.5px] font-extrabold flex items-center gap-0.5 ${
                      isJoined ? "text-white" : "text-[#3E6B48]"
                    }`}
                  >
                    {isJoined ? (
                      <>
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                        <span>JOINED</span>
                      </>
                    ) : (
                      <span>JOIN</span>
                    )}
                  </motion.div>
                </div>
              </div>

              {/* Event card #2 */}
              <div className="bg-white border border-slate-100 rounded-[20px] p-3 shadow-sm relative overflow-hidden opacity-80">
                <div className="flex justify-between items-start">
                  <span className="px-1.5 py-0.5 rounded bg-slate-50 text-slate-400 font-mono text-[8px] font-bold">
                    ESTUARY HELP
                  </span>
                  <div className="flex items-center gap-0.5 text-[8.5px] text-slate-500 font-bold">
                    <Users className="w-3 h-3 text-[#3E6B48]" />
                    <span>28 Volunteers</span>
                  </div>
                </div>

                <h4 className="text-[13px] font-black text-slate-900 tracking-tight mt-1.5">
                  Adyar River Sweep
                </h4>

                <div className="flex items-center gap-2 mt-2 text-[9px] text-slate-400 font-medium">
                  <div className="flex items-center gap-0.5">
                    <MapPin className="w-3 h-3 text-red-400" />
                    <span>Besant Nagar</span>
                  </div>
                  <div className="flex items-center gap-0.5">
                    <Calendar className="w-3 h-3 text-blue-400" />
                    <span>04/12</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* App Bottom Navigation Bar */}
      <motion.div 
        animate={{ y: activeScreen === 'login' ? 48 : 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 22 }}
        className="h-[48px] bg-white border-t border-slate-100 flex justify-around items-center px-1 z-10 flex-shrink-0"
      >
        <button 
          onClick={() => {
            setActiveScreen('home');
            setPointer({ x: 27, y: 490, opacity: 0.8, scale: 1 });
          }}
          className={`flex flex-col items-center gap-0.5 text-[8px] transition-colors flex-1 ${activeScreen === 'home' ? 'text-[#3E6B48] font-black' : 'text-slate-400 font-bold'}`}
        >
          <Home className="w-3.5 h-3.5" />
          <span>HOME</span>
        </button>

        <button 
          onClick={() => {
            setActiveScreen('explore');
            setPointer({ x: 107, y: 490, opacity: 0.8, scale: 1 });
          }}
          className={`flex flex-col items-center gap-0.5 text-[8px] transition-colors flex-1 ${activeScreen === 'explore' ? 'text-[#3E6B48] font-black' : 'text-slate-400 font-bold'}`}
        >
          <Compass className="w-3.5 h-3.5" />
          <span>EXPLORE</span>
        </button>

        <button 
          className="flex flex-col items-center gap-0.5 text-[8px] text-slate-300 font-bold flex-1 cursor-default opacity-60"
          disabled
        >
          <Activity className="w-3.5 h-3.5" />
          <span>IMPACT</span>
        </button>

        <button 
          className="flex flex-col items-center gap-0.5 text-[8px] text-slate-300 font-bold flex-1 cursor-default opacity-60"
          disabled
        >
          <Heart className="w-3.5 h-3.5" />
          <span>DONATE</span>
        </button>

        <button 
          className="flex flex-col items-center gap-0.5 text-[8px] text-slate-300 font-bold flex-1 cursor-default opacity-60"
          disabled
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>CHAT</span>
        </button>
      </motion.div>

      {/* Loop Progress bar at the very bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-100 overflow-hidden">
        <motion.div 
          className="h-full bg-[#3E6B48]"
          animate={{ width: `${loopProgress}%` }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
        />
      </div>
    </div>
  );
};
