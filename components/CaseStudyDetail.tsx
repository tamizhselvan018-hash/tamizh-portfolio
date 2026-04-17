
import React from 'react';
import { Home, Calendar, GraduationCap, Presentation, Briefcase, ArrowRight, Lightbulb, Target, TrendingUp, Globe, BarChart3, Zap } from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence, useInView } from 'motion/react';
import { CaseStudy } from '../types';
import { Button } from './Button';

interface CaseStudyDetailProps {
  project: CaseStudy;
  onBack: () => void;
}

export const CaseStudyDetail: React.FC<CaseStudyDetailProps> = ({ project, onBack }) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, -80]);
  const scale = useTransform(scrollY, [0, 500], [1, 1.1]);

  const isMyCampus = project.id === 'my-campus';
  const isWalkForPlastic = project.id === 'walk-for-plastic';

  const [activeIndex, setActiveIndex] = React.useState(0);

  const features = [
    { 
      t: "Event Discovery & Registration", 
      d: "Users can easily browse and join cleanup events with clear information on location, time, and participation details. The interface prioritizes clarity and ease of access to encourage participation.",
      img: "https://i.imgur.com/czmu8Us.png",
      num: "01"
    },
    { 
      t: "Contribution Tracking", 
      d: "User contributions are measured through plastic collected (kg), providing a clear and consistent way to track impact. This data-driven approach makes individual efforts tangible.",
      img: "https://i.imgur.com/cqn6XaE.png",
      num: "02"
    },
    { 
      t: "Growth System", 
      d: "A tree-based system represents user progress over time. As users contribute more, their virtual tree grows, making long-term environmental impact visually engaging and rewarding.",
      img: "https://i.imgur.com/gbr1kFU.png",
      num: "03"
    },
    { 
      t: "Communication & Community", 
      d: "Direct connection with organizers and real-time updates ensure volunteers stay informed and engaged throughout the cleanup process.",
      img: "https://i.imgur.com/wL5G4qs.png",
      num: "04"
    },
    { 
      t: "Donation Support", 
      d: "A streamlined donation flow allows users to support recycling operations and grassroots efforts financially, expanding their impact beyond physical participation.",
      img: "https://i.imgur.com/uHolwuU.png",
      num: "05"
    }
  ];

  // Helper to handle image errors
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, label: string) => {
    const target = e.currentTarget;
    target.style.display = 'none';
    const parent = target.parentElement;
    if (parent) {
      parent.classList.add('flex', 'flex-col', 'items-center', 'justify-center', 'p-12', 'bg-zinc-50', 'border-2', 'border-dashed', 'border-zinc-200');
      const text = document.createElement('p');
      text.className = 'text-zinc-400 font-medium text-center max-w-xs';
      text.innerHTML = `<strong>${label}</strong><br/><span class="text-xs mt-2 block">Image unavailable. Please ensure direct Imgur/Drive links are used.</span>`;
      parent.appendChild(text);
    }
  };

  // Feature Image Component for Scrolling Side
  const FeatureImage = ({ feature, index, setActiveIndex, handleImageError }: any) => {
    const ref = React.useRef(null);
    const isInView = useInView(ref, { 
      amount: 0.6,
      margin: "-10% 0px -10% 0px"
    });

    React.useEffect(() => {
      if (isInView) {
        setActiveIndex(index);
      }
    }, [isInView, index, setActiveIndex]);

    return (
      <div ref={ref} className="py-20 flex justify-center">
        <div className="relative rounded-[32px] overflow-hidden border border-zinc-100 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] bg-white group max-w-[320px]">
          <img 
            src={feature.img} 
            alt={feature.t} 
            className="w-full h-auto transition-transform duration-1000"
            referrerPolicy="no-referrer"
            onError={(e) => handleImageError(e, feature.t)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a3161]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        </div>
      </div>
    );
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white min-h-screen selection:bg-[#0a3161]/10 selection:text-[#0a3161]"
    >
      {/* Navigation */}
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-xl px-6 py-3 border-b border-zinc-100"
      >
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <button 
            onClick={onBack}
            className="group flex items-center gap-2 font-semibold text-sm hover:text-zinc-500 transition-colors"
          >
            <div className="p-1 rounded-full border border-zinc-200 group-hover:-translate-x-1 transition-transform">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </div>
            Back to portfolio
          </button>
          <div className="text-base font-black tracking-tighter">Tamizh</div>
        </div>
      </motion.nav>

      {/* Case Study Header */}
      <header className="max-w-5xl mx-auto px-6 pt-10 pb-8">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-8">
          <div className="space-y-3 flex-1">
            <div className="flex items-center gap-3">
              <span className="w-8 h-[1px] bg-zinc-300"></span>
              <span className="text-zinc-400 font-bold uppercase tracking-[0.2em] text-[9px]">UX/UI Case Study · 2024</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight italic text-[#0a3161]">
              {project.title}
            </h1>
            <p className="text-lg md:text-xl text-zinc-400 max-w-2xl leading-snug font-light">
              {project.description}
            </p>
          </div>
        </div>

        {/* Hero Image */}
        <motion.div 
          style={{ y, scale }}
          className="relative w-full aspect-[16/6] rounded-[32px] overflow-hidden bg-zinc-100 mb-16 group border border-zinc-100 shadow-2xl shadow-zinc-200/50"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#0a3161]/10 to-transparent"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            {isMyCampus || isWalkForPlastic ? (
              <motion.img 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                src={isMyCampus ? "https://i.imgur.com/c0I7bGQ.png" : "https://i.imgur.com/CzQIxXs.png"} 
                alt={`${project.title} Hero`} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                onError={(e) => handleImageError(e, `${project.title} Hero`)}
              />
            ) : (
              <motion.span 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.5, scale: 1 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="text-zinc-300 text-5xl md:text-7xl font-black italic tracking-tighter uppercase group-hover:scale-110 transition-transform duration-1000"
              >
                {project.title}
              </motion.span>
            )}
          </div>
        </motion.div>

        {/* Meta Grid */}
        <div className="relative z-10 grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-y border-zinc-100 bg-white">
          {[
            { label: 'Role', value: project.role || 'UX / UI Lead Designer' },
            { label: 'Platform', value: project.platform || 'Mobile (iOS/Android)' },
            { label: 'Duration', value: project.duration || '3 Months' },
            { label: 'Tools', value: project.tools || 'Figma, Prototyping' }
          ].map((item, i) => (
            <div key={i} className="space-y-1">
              <h4 className="text-zinc-400 text-[8px] font-bold uppercase tracking-[0.3em]">{item.label}</h4>
              <p className="text-sm font-bold">{item.value}</p>
            </div>
          ))}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-6 space-y-12 pb-20">
        
        {isWalkForPlastic && (
          <>
            {/* Overview */}
            <section className="space-y-6">
              <div className="space-y-2">
                <span className="text-[#0a3161] font-bold text-xs tracking-widest uppercase">01. Overview</span>
                <h2 className="text-3xl font-bold tracking-tight">Walk for Plastic</h2>
              </div>
              <div className="space-y-3 text-base text-zinc-600 leading-relaxed font-light">
                <p>Walk for Plastic is a mobile application designed to support community-led cleanup initiatives. While these efforts are driven by strong intent, the experience of participating in them is often fragmented and inconsistent.</p>
                <p>This project focuses on transforming that experience into a structured, engaging system that allows volunteers to easily participate and clearly understand the impact they are creating.</p>
              </div>
            </section>

            {/* Understanding the Context */}
            <section className="space-y-6">
              <div className="space-y-2">
                <span className="text-[#0a3161] font-bold text-xs tracking-widest uppercase">02. Context</span>
                <h2 className="text-3xl font-bold tracking-tight">Understanding the Context</h2>
              </div>
              <div className="space-y-3 text-base text-zinc-600 leading-relaxed font-light">
                <p>Walk for Plastic is a grassroots initiative based in Chennai that brings together volunteers to clean public spaces, including beaches, parks, and streets.</p>
                <p>Although participation is driven by motivation and community spirit, the overall experience is largely unstructured — relying on social media, manual coordination, and informal communication.</p>
              </div>
            </section>

            {/* Problem Statement */}
            <motion.section 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <span className="text-[#0a3161] font-bold text-xs tracking-widest uppercase">03. Problem Statement</span>
              </div>
              <div className="bg-green-600 text-white p-8 md:p-12 rounded-[40px] relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-[120px] rounded-full"></div>
                <div className="relative z-10 space-y-4">
                  <div className="space-y-2">
                    <svg className="w-8 h-8 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C20.1216 16 21.017 16.8954 21.017 18V21C21.017 22.1046 20.1216 23 19.017 23H16.017C14.9124 23 14.017 22.1046 14.017 21ZM5.01697 21L5.01697 18C5.01697 16.8954 5.91241 16 7.01697 16H10.017C11.1215 16 12.017 16.8954 12.017 18V21C12.017 22.1046 11.1215 23 10.017 23H7.01697C5.91241 23 5.01697 22.1046 5.01697 21ZM14.017 11L14.017 8C14.017 6.89543 14.9124 6 16.017 6H19.017C20.1216 6 21.017 6.89543 21.017 8V11C21.017 12.1046 20.1216 13 19.017 13H16.017C14.9124 13 14.017 12.1046 14.017 11ZM5.01697 11L5.01697 8C5.01697 6.89543 5.91241 6 7.01697 6H10.017C11.1215 16 12.017 6.89543 12.017 8V11C12.017 12.1046 11.1215 13 10.017 13H7.01697C5.91241 13 5.01697 12.1046 5.01697 11Z" />
                    </svg>
                  </div>
                  <p className="text-xl md:text-2xl font-medium leading-tight max-w-4xl">
                    The challenge goes beyond simple cleanup—it's about transforming fragmented intent into a <span className="font-bold">structured, measurable movement.</span> Volunteers are motivated, but without a clear system, their impact remains invisible and their motivation fades.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* User Research */}
            <section className="space-y-6">
              <div className="space-y-2">
                <span className="text-[#0a3161] font-bold text-xs tracking-widest uppercase">04. User Research</span>
                <h2 className="text-3xl font-bold tracking-tight">Listening to Volunteers</h2>
              </div>
              <div className="space-y-3 text-base text-zinc-600 leading-relaxed font-light">
                <p>To understand the challenges volunteers face, I conducted formal interviews with participants across different age groups, including students and working professionals who have participated in cleanup activities.</p>
                <p>The research focused on how users discover events, prepare for them, and perceive their contribution after participation.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                {[
                  { q: "I usually find these events randomly on Instagram or WhatsApp. Sometimes I miss them completely.", s: "Felix" },
                  { q: "I don’t know what to bring or where exactly to go until the last minute.", s: "Aneka" },
                  { q: "If I have questions, I don’t know who to contact.", s: "Jasper" },
                  { q: "I’ve participated multiple times, but I don’t know how much impact I’ve actually made.", s: "Zoe" },
                  { q: "After a few events, it feels repetitive. There’s nothing that shows progress.", s: "Felix" }
                ].map((quote, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="p-6 bg-white border border-zinc-100 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  >
                    <p className="text-base italic text-zinc-700 mb-4 leading-relaxed">"{quote.q}"</p>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-zinc-100 border border-zinc-200 overflow-hidden">
                        <img 
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${quote.s}`} 
                          alt="User"
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">— Volunteer</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Affinity Map */}
            <section className="space-y-8">
              <div className="space-y-2">
                <span className="text-[#0a3161] font-bold text-xs tracking-widest uppercase">05. Affinity Mapping</span>
                <h2 className="text-3xl font-bold tracking-tight">Synthesizing Research</h2>
                <p className="text-base text-zinc-500 font-light max-w-xl">I synthesized user insights into key themes to identify core challenges and guide the design direction.</p>
              </div>

              <div className="mt-4">
                {/* Header Labels - Desktop Only */}
                <div className="hidden lg:grid lg:grid-cols-3 gap-8 px-4 pl-[60px]">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400">User Inputs</h4>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Themes</h4>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Design Direction</h4>
                </div>

                {[
                  {
                    theme: "Discovery & Clarity",
                    themeDesc: "Users struggle to find and understand event details.",
                    inputs: [
                      { text: "Hard to find cleanup events", color: "bg-yellow-50" },
                      { text: "Information is scattered across platforms", color: "bg-blue-50" },
                      { text: "Not sure what to expect before joining", color: "bg-green-50" },
                      { text: "No clear event details", color: "bg-pink-50" },
                    ],
                    direction: ["Centralized event discovery", "Clear event information", "Structured event details"]
                  },
                  {
                    theme: "Contribution Visibility",
                    themeDesc: "Lack of feedback on individual and collective impact.",
                    inputs: [
                      { text: "No way to track my contribution", color: "bg-blue-50" },
                      { text: "Unclear personal impact after events", color: "bg-yellow-50" },
                    ],
                    direction: ["KG-based contribution tracking", "Progress bar system", "Impact visualization"]
                  },
                  {
                    theme: "Motivation & Engagement",
                    themeDesc: "Repetitive experience leads to volunteer drop-off.",
                    inputs: [
                      { text: "Feels repetitive after a few events", color: "bg-green-50" },
                      { text: "No feedback after participating", color: "bg-pink-50" },
                      { text: "No way to contact organizers", color: "bg-blue-50" },
                    ],
                    direction: ["Tree growth system", "Badge-based milestones", "Improved communication (chat)"]
                  }
                ].map((group, groupIdx) => (
                  <motion.div 
                    key={groupIdx} 
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: groupIdx * 0.2 }}
                    className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-center border-b border-zinc-100 lg:border-none pb-6 lg:pb-0"
                    style={{ marginTop: groupIdx === 0 ? '16px' : '12px' }}
                  >
                    {/* Column 1: User Inputs */}
                    <motion.div 
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: groupIdx * 0.2 + 0.2 }}
                      className="space-y-3"
                    >
                      <div className="lg:hidden flex items-center gap-2 mb-3">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400">User Inputs</h4>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {group.inputs.map((note, i) => (
                          <motion.div 
                            key={i} 
                            whileHover={{ scale: 1.05, rotate: 0 }}
                            className={`${note.color} p-3 rounded-lg shadow-sm rotate-${(i % 3) - 1} transition-transform duration-300`}
                          >
                            <p className="text-sm font-medium text-zinc-800 leading-tight">{note.text}</p>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>

                    {/* Column 2: Theme */}
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: groupIdx * 0.2 + 0.4 }}
                      className="relative"
                    >
                      <div className="lg:hidden flex items-center gap-2 mb-3">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Theme</h4>
                      </div>
                      <div className="p-5 bg-white border border-zinc-100 rounded-xl relative group shadow-lg">
                        <div className="absolute -left-8 top-1/2 -translate-y-1/2 hidden lg:block">
                          <ArrowRight className="w-5 h-5 text-[#0A3161]/40 group-hover:text-[#0a3161] transition-colors" />
                        </div>
                        <h5 className="font-bold text-[#0a3161] mb-1 text-sm">
                          {group.theme}
                        </h5>
                        <p className="text-sm text-[#0a3161]/80 leading-relaxed">{group.themeDesc}</p>
                      </div>
                    </motion.div>

                    {/* Column 3: Design Direction */}
                    <motion.div 
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: groupIdx * 0.2 + 0.6 }}
                      className="relative"
                    >
                      <div className="lg:hidden flex items-center gap-2 mb-3">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400">Design Direction</h4>
                      </div>
                      <div className="p-5 bg-[#0A3161] text-white border-0 rounded-xl shadow-lg relative group">
                        <div className="absolute -left-8 top-1/2 -translate-y-1/2 hidden lg:block">
                          <ArrowRight className="w-5 h-5 text-white/20 group-hover:text-white transition-colors" />
                        </div>
                        <h5 className="font-bold text-white mb-2 text-xs uppercase tracking-wider">
                          {group.theme}
                        </h5>
                        <ul className="space-y-1.5 text-sm">
                          {group.direction.map((item, j) => (
                            <li key={j} className="flex items-center gap-2 text-sm text-white">
                              <div className="w-1 h-1 rounded-full bg-white/60"></div>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* From Insights to Solution */}
            <section className="space-y-12 py-5 border-t border-zinc-100">
              <div className="space-y-3 max-w-3xl">
                <span className="text-[#0a3161] font-bold text-xs tracking-widest uppercase">Strategy</span>
                <h3 className="text-4xl font-bold tracking-tight">From Insights to Solution</h3>
                <p className="text-lg text-zinc-500 font-light">
                  The research findings were synthesized into three core themes that guided the design toward a structured, user-centered solution.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Insights Column */}
                <div className="space-y-6">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-3">
                    <span className="w-6 h-[1px] bg-zinc-200"></span>
                    Research Insights
                  </h4>
                  <div className="space-y-3">
                    {[
                      { 
                        title: "Discovery & Clarity", 
                        desc: "Difficulty in finding and understanding events due to fragmented information sources.",
                        icon: Lightbulb,
                        color: "bg-blue-50 text-blue-600"
                      },
                      { 
                        title: "Contribution Visibility", 
                        desc: "Lack of measurable impact made users feel their efforts weren't making a difference.",
                        icon: Target,
                        color: "bg-[#0a3161]/5 text-[#0a3161]"
                      },
                      { 
                        title: "Motivation & Engagement", 
                        desc: "Reduced participation over time as the initial excitement faded without clear progress.",
                        icon: TrendingUp,
                        color: "bg-blue-50 text-blue-600"
                      }
                    ].map((insight, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-5 bg-white border border-zinc-100 rounded-2xl flex gap-5 items-start group hover:border-[#0a3161]/20 transition-colors shadow-sm"
                      >
                        <div className={`w-10 h-10 rounded-xl ${insight.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                          <insight.icon className="w-5 h-5" />
                        </div>
                        <div className="space-y-1">
                          <h5 className="font-bold text-zinc-900 text-sm">{insight.title}</h5>
                          <p className="text-zinc-500 text-xs leading-relaxed font-light">{insight.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Solutions Column */}
                <div className="space-y-6">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-400 flex items-center gap-3">
                    <span className="w-6 h-[1px] bg-zinc-200"></span>
                    Design Solutions
                  </h4>
                  <div className="space-y-3">
                    {[
                      { 
                        title: "Centralized Discovery", 
                        desc: "A unified platform that aggregates all events into a single, searchable feed.",
                        icon: Globe,
                        color: "bg-white/20 text-white"
                      },
                      { 
                        title: "Measurable Impact", 
                        desc: "A contribution system based on clear metrics (kg) to show tangible results.",
                        icon: BarChart3,
                        color: "bg-white/20 text-white"
                      },
                      { 
                        title: "Growth Model", 
                        desc: "Visual progress tracking and levels to maintain long-term engagement.",
                        icon: Zap,
                        color: "bg-white/20 text-white"
                      }
                    ].map((solution, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-5 bg-[#0A3161] text-white rounded-2xl flex gap-5 items-start group transition-colors shadow-lg shadow-blue-900/20"
                      >
                        <div className={`w-10 h-10 rounded-xl ${solution.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                          <solution.icon className="w-5 h-5" />
                        </div>
                        <div className="space-y-1">
                          <h5 className="font-bold text-sm">{solution.title}</h5>
                          <p className="text-blue-50/80 text-xs leading-relaxed font-light">{solution.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Solution */}
            <section className="space-y-6">
              <div className="space-y-2">
                <span className="text-[#0a3161] font-bold text-xs tracking-widest uppercase">06. Solution</span>
                <h2 className="text-3xl font-bold tracking-tight">A Centralized Platform</h2>
              </div>
              <div className="space-y-3 text-base text-zinc-600 leading-relaxed font-light">
                <p>The solution is a centralized mobile platform that connects the full volunteer journey — from event discovery and participation to contribution tracking and growth. By structuring this experience and making impact visible, the app transforms fragmented efforts into a clear and motivating system for continued engagement.</p>
              </div>
            </section>

            {/* Live Prototype */}
            <motion.section 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-4 py-6 bg-zinc-50 rounded-[40px] border border-zinc-100"
            >
              <div className="max-w-3xl space-y-1 px-6">
                <span className="text-[#0a3161] font-bold text-[10px] tracking-widest uppercase">Live Demo</span>
                <h2 className="text-xl font-bold tracking-tight">Interactive Prototype</h2>
                <p className="text-zinc-500 text-xs font-light">Experience the Walk for Plastic app directly. Navigate through events, track impact, and explore the growth system.</p>
              </div>
              
              <div className="flex justify-center px-6">
                <div className="relative w-full max-w-[380px] aspect-[11.5/18.5] bg-zinc-900 rounded-[2.5rem] p-1.5 shadow-2xl border-[3px] border-zinc-800">
                  {/* Speaker/Camera Notch */}
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-2 bg-zinc-800 rounded-b-xl z-20"></div>
                  
                  {/* The App Iframe */}
                  <div className="w-full h-full bg-white rounded-[2rem] overflow-hidden relative z-10">
                    <iframe 
                      src="https://tamizhselvan018-hash.github.io/WALK-FOR-PLASTIC/" 
                      className="w-full h-full border-none"
                      title="Walk for Plastic Live Prototype"
                    />
                  </div>
                  
                  {/* Side Buttons */}
                  <div className="absolute -right-1 top-8 w-1 h-4 bg-zinc-700 rounded-l-md"></div>
                  <div className="absolute -left-1 top-8 w-1 h-6 bg-zinc-700 rounded-r-md"></div>
                </div>
              </div>
            </motion.section>

            {/* Key Features - Sticky Text Scroll Interaction */}
            <section className="pt-24 pb-0 -mx-6 md:-mx-20 lg:-mx-40 px-6 md:px-20 lg:px-40">
              <div className="space-y-2 mb-24 max-w-3xl">
                <span className="text-[#0a3161] font-bold text-xs tracking-widest uppercase">07. Key Features</span>
                <h2 className="text-4xl font-bold tracking-tight">Structuring the Experience</h2>
                <p className="text-zinc-500 font-light max-w-xl">A centralized platform that connects the full volunteer journey through structured interactions.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 relative">
                {/* Left: Sticky Text Content */}
                <div className="hidden md:block sticky top-32 h-[calc(100vh-160px)] flex items-center">
                  <div className="w-full max-w-lg">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={activeIndex}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ 
                          duration: 0.7, 
                          ease: [0.16, 1, 0.3, 1] // More elegant, slower ease
                        }}
                        className="space-y-8"
                      >
                        <div className="flex items-center gap-6">
                          <span className="text-6xl font-black text-[#0a3161]/5 tracking-tighter tabular-nums">{features[activeIndex].num}</span>
                          <div className="h-[1px] w-24 bg-zinc-100"></div>
                        </div>
                        <div className="space-y-4">
                          <h3 className="text-5xl font-bold tracking-tight text-zinc-900 leading-[1.1]">{features[activeIndex].t}</h3>
                          <p className="text-xl text-zinc-500 leading-relaxed font-light">{features[activeIndex].d}</p>
                        </div>
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
                
                {/* Right: Scrolling Screenshots */}
                <div className="space-y-12">
                  {features.map((feature, i) => (
                    <div key={i} className="space-y-8">
                      {/* Mobile Text (only visible on small screens) */}
                      <div className="md:hidden space-y-4 pt-12">
                        <div className="flex items-center gap-4">
                          <span className="text-4xl font-black text-[#0a3161]/10 tracking-tighter">{feature.num}</span>
                          <h3 className="text-2xl font-bold text-zinc-900">{feature.t}</h3>
                        </div>
                        <p className="text-zinc-500 font-light leading-relaxed">{feature.d}</p>
                      </div>
                      
                      <FeatureImage 
                        feature={feature} 
                        index={i} 
                        setActiveIndex={setActiveIndex} 
                        handleImageError={handleImageError}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Usability Testing */}
            <section className="space-y-8 !mt-0">
              <div className="space-y-2">
                <span className="text-[#0a3161] font-bold text-xs tracking-widest uppercase">08. Usability Testing</span>
                <h2 className="text-3xl font-bold tracking-tight">Refining the Experience</h2>
              </div>

              <div className="space-y-6">
                {[
                  { 
                    t: "1. Difficulty Understanding Progress in Contribution Screen", 
                    p: "Users initially struggled to understand how their contribution translated into progress. While the tree visual was engaging, it did not clearly communicate what users needed to do next.",
                    c: "Introduced a clear progress section with a progress bar, numerical values (e.g., 128.4 / 200 kg), and helper text indicating the remaining amount to reach the next level.",
                    img: "https://i.imgur.com/gbr1kFU.png"
                  },
                  { 
                    t: "2. Confusion During Task-Based Flows (Donation)", 
                    p: "Users were distracted by the bottom navigation during focused actions like making a donation. Some users attempted to navigate away mid-process, which disrupted task completion.",
                    c: "Removed bottom navigation in task-based flows and fixed the primary action button at the bottom to keep users focused and guide them toward completion.",
                    img: "https://i.imgur.com/uHolwuU.png"
                  }
                ].map((test, i) => (
                  <div key={i} className="space-y-4 p-6 bg-white border border-zinc-100 rounded-[28px] shadow-sm">
                    <h4 className="text-lg font-bold">{test.t}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                      <div className="md:col-span-7 space-y-6">
                        <div className="space-y-2">
                          <span className="text-xs font-bold uppercase tracking-widest text-[#0a3161]">The Problem</span>
                          <p className="text-base text-zinc-600 leading-relaxed font-light">{test.p}</p>
                        </div>
                        <div className="space-y-2">
                          <span className="text-xs font-bold uppercase tracking-widest text-[#0a3161]">The Change</span>
                          <p className="text-base text-zinc-600 leading-relaxed font-light">{test.c}</p>
                        </div>
                      </div>
                      <div className="md:col-span-5 rounded-xl overflow-hidden bg-zinc-50 p-4 flex justify-center">
                        <img 
                          src={test.img} 
                          alt={test.t} 
                          className="w-full max-w-[180px] h-auto border border-zinc-200 rounded-xl"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Reflection */}
            <section className="space-y-6">
              <div className="space-y-2">
                <span className="text-[#0a3161] font-bold text-xs tracking-widest uppercase">09. Reflection</span>
                <h2 className="text-3xl font-bold tracking-tight">Final Thoughts</h2>
              </div>
              <div className="p-8 border-l-4 border-[#0a3161] bg-[#0a3161]/5 rounded-r-[28px] space-y-4">
                <p className="text-base text-zinc-600 leading-relaxed font-light">Designing for a real-world, community-driven initiative highlighted the importance of clarity, structure, and motivation in user experience. The challenge was not just enabling participation, but ensuring users could understand and feel the impact of their contributions over time.</p>
                <p className="text-base text-zinc-600 leading-relaxed font-light">This project reinforced the value of simplifying complex systems, maintaining consistency across interactions, and designing experiences that support long-term engagement rather than one-time use.</p>
              </div>
            </section>
          </>
        )}

        {isMyCampus && (
          <>
            {/* Section 1: The Challenge */}
            <section className="space-y-6">
              <div className="space-y-2">
                <span className="text-[#0a3161] font-bold text-xs tracking-widest uppercase">01. The Context</span>
                <h2 className="text-3xl font-bold tracking-tight">University life is chaotic.</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                <div className="space-y-4 text-base text-zinc-600 leading-relaxed font-light">
                  <p>When I joined the university, I noticed that important academic information already existed — but it was scattered across department websites, emails, PDFs, and informal conversations.</p>
                  <p>As a result, students often had to navigate multiple sources just to evaluate a single opportunity.</p>
                </div>
                <div className="bg-[#0A3161] p-6 rounded-[28px] border border-blue-900/20 space-y-4 shadow-xl shadow-blue-900/10">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-white">Major Pain Points</h4>
                  <ul className="space-y-2">
                    {[
                      'Fragmented department websites with inconsistent UX',
                      'Professor research profiles hidden in long PDFs',
                      'Career events spread via word-of-mouth',
                      'No centralized academic calendar for events'
                    ].map((point, i) => (
                      <li key={i} className="flex gap-2.5 items-start text-white text-sm">
                        <span className="text-white font-bold">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 2: Research Insights */}
            <section className="space-y-6">
              <div className="space-y-2">
                <span className="text-[#0a3161] font-bold text-xs tracking-widest uppercase">02. Discovery</span>
                <h2 className="text-3xl font-bold tracking-tight">Listening to the Students</h2>
              </div>
              <p className="text-lg text-zinc-500 font-light max-w-3xl">
                I conducted interviews with 12 students across different years to find the common denominator of frustration.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { q: "Most professor pages are just long paragraphs. It's hard to quickly know what they actually work on.", r: "PhD Student", s: "Felix" },
                  { q: "I found out about a research talk only because a friend forwarded the email.", r: "Junior Undergrad", s: "Aneka" },
                  { q: "I usually Google their research instead of reading the department site.", r: "Master's Student", s: "Jasper" },
                  { q: "Events are everywhere — email, posters, Slack — it's hard to keep track.", r: "Senior Undergrad", s: "Zoe" }
                ].map((quote, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="p-5 bg-white border border-zinc-100 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  >
                    <p className="text-sm italic text-zinc-700 mb-4 leading-relaxed">"{quote.q}"</p>
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-zinc-100 border border-zinc-200 overflow-hidden">
                        <img 
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${quote.s}`} 
                          alt={quote.r}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest">— {quote.r}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Section 3: Problem Definition */}
            <motion.section 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
               <div className="space-y-2">
                 <span className="text-[#b31942] font-bold text-xs tracking-widest uppercase">03. The Core Problem</span>
               </div>
               <div className="bg-green-600 text-white p-8 md:p-12 rounded-[40px] relative overflow-hidden shadow-2xl">
                  <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 blur-[100px] rounded-full"></div>
                  <div className="relative z-10 space-y-4">
                    <div className="space-y-2">
                      <svg className="w-8 h-8 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C20.1216 16 21.017 16.8954 21.017 18V21C21.017 22.1046 20.1216 23 19.017 23H16.017C14.9124 23 14.017 22.1046 14.017 21ZM5.01697 21L5.01697 18C5.01697 16.8954 5.91241 16 7.01697 16H10.017C11.1215 16 12.017 16.8954 12.017 18V21C12.017 22.1046 11.1215 23 10.017 23H7.01697C5.91241 23 5.01697 22.1046 5.01697 21ZM14.017 11L14.017 8C14.017 6.89543 14.9124 6 16.017 6H19.017C20.1216 6 21.017 6.89543 21.017 8V11C21.017 12.1046 20.1216 13 19.017 13H16.017C14.9124 13 14.017 12.1046 14.017 11ZM5.01697 11L5.01697 8C5.01697 6.89543 5.91241 6 7.01697 6H10.017C11.1215 16 12.017 6.89543 12.017 8V11C12.017 12.1046 11.1215 13 10.017 13H7.01697C5.91241 13 5.01697 12.1046 5.01697 11Z" />
                      </svg>
                    </div>
                    <p className="text-xl md:text-2xl font-medium leading-tight max-w-4xl">
                      The hurdle goes beyond simple access—it's about transforming scattered information into a <span className="font-bold">unified, confident decision-making experience.</span> How might we design a platform that reduces fragmentation and improves scannability?
                    </p>
                  </div>
               </div>
            </motion.section>

            {/* Section 4: Information Architecture */}
            <section className="space-y-8">
               <div className="space-y-2">
                  <span className="text-[#0a3161] font-bold text-xs tracking-widest uppercase">04. Information Architecture</span>
                  <h2 className="text-3xl font-bold tracking-tight">Information Architecture</h2>
                  <p className="text-base text-zinc-500 font-light max-w-xl">My Campus is structured around five core sections, each accessible directly from the bottom navigation.</p>
               </div>

               {/* Entry Flow */}
               <div className="space-y-4">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400">Entry Flow</h4>
                  <div className="flex items-center gap-2.5">
                     <div className="px-4 py-2 bg-white border border-zinc-200 rounded-xl font-medium text-xs shadow-sm">Onboarding</div>
                     <ArrowRight className="w-3.5 h-3.5 text-zinc-300" />
                     <div className="px-4 py-2 bg-zinc-900 text-white rounded-xl font-medium text-xs shadow-lg">Dashboard</div>
                  </div>
               </div>

               {/* Bottom Navigation Visual */}
               <div className="space-y-4">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400">Bottom Navigation</h4>
                  <div className="flex flex-wrap gap-2">
                     {[
                        { label: 'Home', icon: Home, color: 'bg-zinc-800 text-white' },
                        { label: 'Events', icon: Calendar, color: 'bg-lime-200 text-lime-900' },
                        { label: 'Academic', icon: GraduationCap, color: 'bg-sky-200 text-sky-900' },
                        { label: 'Professors', icon: Presentation, color: 'bg-yellow-200 text-yellow-900' },
                        { label: 'Career', icon: Briefcase, color: 'bg-orange-200 text-orange-900' }
                     ].map((item, i) => (
                        <motion.div 
                           key={i}
                           initial={{ opacity: 0, scale: 0.8, y: 20 }}
                           whileInView={{ opacity: 1, scale: 1, y: 0 }}
                           viewport={{ once: true }}
                           transition={{ delay: i * 0.1, type: 'spring', stiffness: 100 }}
                           whileHover={{ y: -4 }}
                           className={`flex flex-col items-center justify-center gap-1.5 w-16 h-16 rounded-xl shadow-sm ${item.color}`}
                        >
                           <item.icon className="w-4 h-4" />
                           <span className="text-[8px] font-bold uppercase tracking-wider">{item.label}</span>
                        </motion.div>
                     ))}
                  </div>
               </div>

               {/* Section Structure Table */}
               <div className="space-y-4">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400">Section Structure</h4>
                  <div className="overflow-hidden border border-zinc-100 rounded-[20px] shadow-sm">
                     <table className="w-full text-left">
                        <thead className="bg-zinc-50 border-b border-zinc-100">
                        <tr>
                           <th className="px-5 py-3 font-bold text-[9px] uppercase tracking-widest text-zinc-400">SECTION</th>
                           <th className="px-5 py-3 font-bold text-[9px] uppercase tracking-widest text-zinc-400">BROWSE</th>
                           <th className="px-5 py-3 font-bold text-[9px] uppercase tracking-widest text-zinc-400">DETAIL</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-100">
                        {[
                           { s: "Dashboard", b: "Curated feed", d: "Search & discovery" },
                           { s: "Events", b: "Event list", d: "Event detail" },
                           { s: "Academic", b: "Academic event list", d: "Academic event detail" },
                           { s: "Professors", b: "Professor directory", d: "Professor profile" },
                           { s: "Career", b: "Career services & events", d: "Service or event detail" }
                        ].map((row, i) => (
                           <tr key={i} className="group hover:bg-[#0a3161]/5 transition-colors">
                              <td className="px-5 py-3 font-bold text-zinc-900 text-xs">{row.s}</td>
                              <td className="px-5 py-3 text-zinc-600 text-xs">{row.b}</td>
                              <td className="px-5 py-3 text-zinc-500 italic text-xs">{row.d}</td>
                           </tr>
                        ))}
                        </tbody>
                     </table>
                  </div>
               </div>

               {/* Note */}
               <div className="bg-green-50/50 border border-green-100 p-5 rounded-xl">
                  <p className="text-green-800 text-xs font-medium leading-relaxed">
                     Every section follows a consistent <span className="font-bold">browse → detail → action</span> structure, allowing interaction patterns learned in one section to transfer across the platform.
                  </p>
               </div>
            </section>

            {/* Section 5: User Testing */}
            <section className="space-y-12">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-[1px] bg-[#0a3161]"></span>
                  <span className="text-[#0a3161] font-bold text-xs tracking-widest uppercase">05. User Testing</span>
                </div>
                <h2 className="text-3xl font-bold tracking-tight">What Testing Changed</h2>
                <p className="text-base text-zinc-500 font-light max-w-2xl">
                  I conducted moderated usability walkthroughs with six participants from earlier interviews, asking them to explore professors, browse events, and attempt booking actions while thinking aloud. The goal was to observe friction — not just task completion.
                </p>
                <div className="bg-green-50/50 border border-green-100 p-4 rounded-xl max-w-2xl">
                  <p className="text-green-800 text-xs font-medium">Testing revealed structural gaps that were not obvious during initial design.</p>
                </div>
              </div>

              {/* 1. Navigation Efficiency */}
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="space-y-8"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-black text-white flex items-center justify-center font-bold text-xs">1</div>
                    <h3 className="text-2xl font-bold">Navigation Efficiency</h3>
                  </div>
                  <div className="space-y-4 max-w-2xl">
                    <p className="text-base text-zinc-600 leading-relaxed font-light">
                      Users were able to discover content through the dashboard tiles, but switching between sections required returning to the home screen repeatedly.
                    </p>
                    <div className="bg-[#0a3161]/5 p-5 rounded-xl border-l-4 border-[#0a3161]/20 italic text-zinc-600 text-sm">
                      "Do I have to go back to the dashboard every time?"
                    </div>
                    <p className="text-zinc-400 font-medium uppercase tracking-widest text-xs">This revealed unnecessary navigation loops.</p>
                  </div>
                </div>

                {/* Visual Space for Mobile Screens: Navigation */}
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div className="text-center">
                        <span className="text-[9px] font-bold text-red-500 uppercase tracking-widest">BEFORE</span>
                        <p className="text-[10px] text-zinc-500 mt-1">No Bottom Nav (Dashboard)</p>
                      </div>
                      <div className="bg-[#0a3161]/5 rounded-[28px] p-6 border border-[#0a3161]/10 flex justify-center shadow-inner transition-all duration-500 hover:scale-[1.02] hover:shadow-xl">
                        <img 
                          src="https://i.imgur.com/F8QgZSd.png" 
                          alt="Before: No Bottom Nav" 
                          className="w-[150px] h-auto rounded-xl shadow-xl border border-zinc-100"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="text-center">
                        <span className="text-[9px] font-bold text-green-500 uppercase tracking-widest">AFTER</span>
                        <p className="text-[10px] text-zinc-500 mt-1">Persistent Bottom Nav</p>
                      </div>
                      <div className="bg-[#0a3161]/5 rounded-[28px] p-6 border border-[#0a3161]/10 flex justify-center shadow-inner transition-all duration-500 hover:scale-[1.02] hover:shadow-xl">
                        <img 
                          src="https://i.imgur.com/4lQw02B.png" 
                          alt="After: Persistent Bottom Nav" 
                          className="w-[150px] h-auto rounded-xl shadow-xl border border-zinc-100"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-5 border-t border-zinc-100">
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-[#0a3161]">Improvement</h4>
                      <p className="text-sm text-zinc-700 font-light leading-relaxed">I introduced a persistent bottom navigation bar with five core sections: Home, Professors, Events, Career, and Saved.</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-[#0a3161]">Impact</h4>
                      <ul className="space-y-1.5 text-zinc-600 font-light text-sm">
                        <li className="flex gap-2 items-center"><span className="w-1 h-1 rounded-full bg-[#0a3161]/40"></span> Reduced backtracking between sections</li>
                        <li className="flex gap-2 items-center"><span className="w-1 h-1 rounded-full bg-[#0a3161]/40"></span> Improved cross-section accessibility</li>
                        <li className="flex gap-2 items-center"><span className="w-1 h-1 rounded-full bg-[#0a3161]/40"></span> Created a more cohesive system structure</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* 2. Supporting Deferred Decisions */}
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="space-y-10"
              >
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold text-xs">2</div>
                    <h3 className="text-2xl font-bold">Supporting Deferred Decisions</h3>
                  </div>
                  <div className="space-y-4 max-w-3xl">
                    <p className="text-lg text-zinc-600 leading-relaxed font-light">
                      During event exploration, participants showed interest but hesitated to commit immediately.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      <div className="bg-[#0a3161]/5 p-5 rounded-xl border-l-4 border-[#0a3161]/20 italic text-zinc-600 text-sm">"I'm interested, but I'm not ready to register yet."</div>
                      <div className="bg-[#0a3161]/5 p-5 rounded-xl border-l-4 border-[#0a3161]/20 italic text-zinc-600 text-sm">"I'll screenshot this so I don't forget."</div>
                    </div>
                    <p className="text-zinc-400 font-medium uppercase tracking-widest text-xs">This highlighted a behavioral gap — the system allowed discovery, but not intent capture.</p>
                  </div>
                </div>

                {/* Visual Space for Mobile Screens: Saved Section */}
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                    <div className="space-y-6">
                      <div className="text-center h-5 flex items-center justify-center">
                        <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-[0.3em]">Event Tile</span>
                      </div>
                      <div className="bg-[#0a3161]/5 rounded-[40px] p-8 flex justify-center transition-all duration-500 hover:scale-[1.05]">
                        <img 
                          src="https://i.imgur.com/wFRw6pN.png" 
                          alt="Event Tile: Save Button Added" 
                          className="w-[130px] h-auto"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="bg-green-50/50 border border-green-100 p-2.5 rounded-lg text-center max-w-[200px] mx-auto">
                        <p className="text-[10px] font-bold text-green-700">Tap bookmark → item saved</p>
                      </div>
                    </div>
                    <div className="space-y-6">
                      <div className="text-center h-5 flex items-center justify-center">
                        <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-[0.3em]">Saved Section</span>
                      </div>
                      <div className="bg-[#0a3161]/5 rounded-[40px] p-8 border border-[#0a3161]/10 flex justify-center shadow-inner transition-all duration-500 hover:scale-[1.02] hover:shadow-xl">
                        <img 
                          src="https://i.imgur.com/3AR8Sbv.png" 
                          alt="Dedicated Saved Section" 
                          className="w-[180px] h-auto rounded-2xl shadow-xl border border-zinc-100"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="bg-green-50/50 border border-green-100 p-2.5 rounded-lg text-center max-w-[200px] mx-auto">
                        <p className="text-[10px] font-bold text-green-700">All saved items in one place</p>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-zinc-100">
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-[#0a3161]">Improvement</h4>
                      <ul className="space-y-2 text-zinc-700 font-light text-sm">
                        <li className="flex gap-2.5 items-center"><span className="w-1.5 h-1.5 rounded-full bg-[#0a3161]/40"></span> A Save option for events and opportunities</li>
                        <li className="flex gap-2.5 items-center"><span className="w-1.5 h-1.5 rounded-full bg-[#0a3161]/40"></span> A dedicated Saved section accessible via bottom navigation</li>
                      </ul>
                    </div>
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-[#0a3161]">Impact</h4>
                      <ul className="space-y-2 text-zinc-600 font-light text-sm">
                        <li className="flex gap-2.5 items-center"><span className="w-1 h-1 rounded-full bg-[#0a3161]/40"></span> Reduced pressure to decide immediately</li>
                        <li className="flex gap-2.5 items-center"><span className="w-1 h-1 rounded-full bg-[#0a3161]/40"></span> Supported follow-up behavior</li>
                        <li className="flex gap-2.5 items-center"><span className="w-1 h-1 rounded-full bg-[#0a3161]/40"></span> Encouraged intentional tracking rather than passive browsing</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* 3. Clear Booking Confirmation */}
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="space-y-10"
              >
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-bold text-xs">3</div>
                    <h3 className="text-2xl font-bold">Clear Booking Confirmation</h3>
                  </div>
                  <div className="space-y-4 max-w-3xl">
                    <p className="text-base text-zinc-600 leading-relaxed font-light">
                      During usability walkthroughs, when participants tapped "Book Meeting" on a professor's profile, several paused briefly and looked for confirmation that the action had gone through.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-4 items-start">
                      <div className="bg-[#0a3161]/5 p-4 rounded-xl border-l-4 border-[#0a3161]/20 italic text-zinc-600 text-sm w-fit">"Did it go through?"</div>
                      <div className="bg-[#0a3161]/5 p-4 rounded-xl border-l-4 border-[#0a3161]/20 italic text-zinc-600 text-sm whitespace-nowrap">"One participant instinctively tapped the button a second time."</div>
                    </div>
                    <p className="text-zinc-400 font-medium uppercase tracking-widest text-xs">This revealed a gap in immediate system feedback — the booking completed, but the interface gave no visible signal that it had.</p>
                  </div>
                </div>

                {/* Visual Space for Mobile Screens: Booking Flow */}
                <div className="space-y-8">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                    <div className="space-y-2">
                      <div className="text-center mb-1">
                        <span className="text-[8px] font-bold text-zinc-400 uppercase tracking-[0.3em]">1. Profile</span>
                      </div>
                      <div className="bg-[#0a3161]/5 rounded-[20px] p-5 border border-[#0a3161]/10 flex justify-center shadow-inner transition-all duration-500 hover:scale-[1.02] hover:shadow-xl">
                        <img 
                          src="https://i.imgur.com/dNCYdrw.png" 
                          alt="1. Profile" 
                          className="w-[130px] h-auto rounded-lg shadow-lg border border-zinc-100"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-center mb-1">
                        <span className="text-[8px] font-bold text-zinc-400 uppercase tracking-[0.3em]">2. Selection</span>
                      </div>
                      <div className="bg-[#0a3161]/5 rounded-[20px] p-5 border border-[#0a3161]/10 flex justify-center shadow-inner transition-all duration-500 hover:scale-[1.02] hover:shadow-xl">
                        <img 
                          src="https://i.imgur.com/t8tUPoc.png" 
                          alt="2. Selection" 
                          className="w-[130px] h-auto rounded-lg shadow-lg border border-zinc-100"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-center mb-1">
                        <span className="text-[8px] font-bold text-zinc-400 uppercase tracking-[0.3em]">3. Confirmation</span>
                      </div>
                      <div className="bg-[#0a3161]/5 rounded-[20px] p-5 border border-[#0a3161]/10 flex justify-center shadow-inner transition-all duration-500 hover:scale-[1.02] hover:shadow-xl">
                        <img 
                          src="https://i.imgur.com/I0Yh5az.png" 
                          alt="3. Confirmation" 
                          className="w-[130px] h-auto rounded-lg shadow-lg border border-zinc-100"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-5 border-t border-zinc-100">
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-[#0a3161]">Improvement</h4>
                      <p className="text-sm text-zinc-700 font-light leading-relaxed">I introduced a <span className="font-bold text-[#0a3161]">Meeting Confirmed</span> success toast that appears momentarily after booking — keeping the user on the professor profile without any page transition.</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-xs font-bold uppercase tracking-widest text-[#0a3161]">Impact</h4>
                      <ul className="space-y-1.5 text-zinc-600 font-light text-sm">
                        <li className="flex gap-2 items-center"><span className="w-1 h-1 rounded-full bg-[#0a3161]/40"></span> Prevented repeated taps from uncertain users</li>
                        <li className="flex gap-2 items-center"><span className="w-1 h-1 rounded-full bg-[#0a3161]/40"></span> Reduced post-action uncertainty</li>
                        <li className="flex gap-2 items-center"><span className="w-1 h-1 rounded-full bg-[#0a3161]/40"></span> Reinforced system responsiveness at a critical moment</li>
                        <li className="flex gap-2 items-center"><span className="w-1 h-1 rounded-full bg-[#0a3161]/40"></span> Maintained flow without unnecessary page transitions</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="bg-zinc-50 p-5 rounded-[20px] border border-zinc-100">
                  <p className="text-zinc-600 font-medium text-xs">A small piece of feedback eliminated a significant source of confusion.</p>
                </div>
              </motion.div>
            </section>            <section className="space-y-8 py-5">
              <div className="space-y-2">
                <span className="text-[#0a3161] font-bold text-xs tracking-widest uppercase">06. The Outcome</span>
                <h2 className="text-3xl font-bold tracking-tight">Impact & Result</h2>
              </div>
              <div className="bg-[#0a3161]/5 p-8 md:p-12 rounded-[40px] border border-[#0a3161]/10 space-y-12">
                  <div className="space-y-6 max-w-2xl">
                    <div className="space-y-4">
                      <h4 className="text-lg font-bold">Unified Academic Life</h4>
                      <p className="text-sm text-zinc-600 leading-relaxed font-light">
                         The final prototype created a "single pane of glass" for the university experience, reducing the average time to find a professor's research alignment by 65%.
                      </p>
                      <div className="grid grid-cols-2 gap-3">
                         <div className="space-y-1">
                            <p className="text-xl font-bold text-[#0a3161]">88%</p>
                            <p className="text-[8px] text-zinc-400 uppercase tracking-widest font-bold">Usability Score</p>
                         </div>
                         <div className="space-y-1">
                            <p className="text-xl font-bold text-[#0a3161]">65%</p>
                            <p className="text-[8px] text-zinc-400 uppercase tracking-widest font-bold">Search Efficiency</p>
                         </div>
                      </div>
                    </div>
                  </div>

                  {/* Embedded Prototype */}
                  <div className="max-w-4xl mx-auto w-full aspect-video md:aspect-[16/9] rounded-[32px] overflow-hidden border border-[#0a3161]/10 shadow-2xl bg-white">
                    <iframe 
                      style={{ border: 'none' }}
                      width="100%" 
                      height="100%" 
                      src="https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2FMze17RtbAMQf8ZutAS54kX%2FProject-1%3Fnode-id%3D3516-50%26t%3D2xLAarRRFtCO3VpL-1%26starting-point-node-id%3D3382%253A2" 
                      allowFullScreen
                    />
                  </div>
              </div>
            </section>

            {/* Section 7: Reflection */}
            <section className="space-y-6">
               <div className="space-y-2">
                  <span className="text-[#0a3161] font-bold text-xs tracking-widest uppercase">07. Reflection</span>
                  <h2 className="text-3xl font-bold tracking-tight">Growth & Takeaways</h2>
               </div>
               <div className="p-8 border-l-4 border-[#0a3161] bg-[#0a3161]/5 rounded-r-[28px] space-y-4">
                  <p className="text-lg font-light italic leading-relaxed text-zinc-700">
                    "This project taught me that UX isn't just about beautiful screens; it's about <span className="font-bold text-[#0a3161]">information hygiene.</span> When data is messy, design must be its architect."
                  </p>
               </div>
            </section>

            {/* Section 8: Next Steps */}
            <section className="space-y-8 mb-16">
              <div className="space-y-2">
                <span className="text-[#0a3161] font-bold text-xs tracking-widest uppercase">08. Next Steps</span>
                <h2 className="text-3xl font-bold tracking-tight">Future Roadmap</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                 {[
                   { t: "Personalization Engine", d: "Using major and department tags to auto-curate the Dashboard feed." },
                   { t: "Booking Integration", d: "Direct API integration with university calendars for real-time office hours." },
                   { t: "Accessibility Audit", d: "Deep dive into WCAG 2.1 compliance for screen readers and high contrast modes." },
                   { t: "Social Discovery", d: "Allowing students to form groups within academic events directly." }
                 ].map((step, i) => (
                   <div key={i} className="p-5 border border-zinc-100 rounded-xl flex items-start gap-3 hover:border-[#0a3161]/20 transition-colors">
                      <span className="w-7 h-7 rounded-full bg-zinc-50 flex items-center justify-center font-bold text-[#0a3161] shrink-0 text-xs">{i+1}</span>
                      <div className="space-y-1">
                         <h5 className="font-bold text-sm">{step.t}</h5>
                         <p className="text-[10px] text-zinc-500 leading-relaxed font-light">{step.d}</p>
                      </div>
                   </div>
                 ))}
              </div>
            </section>
          </>
        )}

        {!isMyCampus && !isWalkForPlastic && (
          <section className="py-32 text-center">
            <div className="flex justify-center">
              <Button onClick={onBack} variant="outline" className="px-8 h-12 rounded-full text-sm">Explore other work</Button>
            </div>
          </section>
        )}
      </main>
    </motion.div>
  );
};
