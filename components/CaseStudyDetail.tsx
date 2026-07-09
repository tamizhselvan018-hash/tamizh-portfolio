
import React from 'react';
import { Home, Calendar, GraduationCap, Presentation, Briefcase, ArrowRight, Lightbulb, Target, TrendingUp, Globe, BarChart3, Zap, User, AlertTriangle, Gamepad2, Trophy, HelpCircle, Layers, Check, Sparkles, Smartphone, FileText, CheckCircle, RefreshCw, Users, Award, BookOpen, Clock, Lock, Monitor, Image, ArrowUpRight } from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence, useInView } from 'motion/react';
import { CaseStudy } from '../types';
import { Button } from './Button';
import { InteractiveBrowserMockup } from './MockScreens';
import { AnnotatedScreenshot } from './AnnotatedScreenshot';

interface CaseStudyDetailProps {
  project: CaseStudy;
  onBack: () => void;
}

export const CaseStudyDetail: React.FC<CaseStudyDetailProps> = ({ project, onBack }) => {

  const isMyCampus = project.id === 'my-campus';
  const isWalkForPlastic = project.id === 'walk-for-plastic';
  const isPathwaysBadgeQuest = project.id === 'pathways-badge-quest';
  const isMotionDesign = project.id === 'motion-design';
  const isParProductionControl = project.id === 'par-production-control';


  const [activeIndex, setActiveIndex] = React.useState(0);

  // Motion Design States
  const [motionStiffness, setMotionStiffness] = React.useState(300);
  const [motionDamping, setMotionDamping] = React.useState(20);
  const [motionPreset, setMotionPreset] = React.useState<'snappy' | 'silky' | 'bouncy' | 'linear' | 'custom'>('snappy');
  const [motionInteractiveType, setMotionInteractiveType] = React.useState<'card' | 'button' | 'toggle'>('card');
  const [motionTrigger, setMotionTrigger] = React.useState(false);
  const [toggleState, setToggleState] = React.useState(false);

  // Pathways Badge Quest Interactive Demo States
  const [pathwaysDirection, setPathwaysDirection] = React.useState<'mobile' | 'board'>('board');
  const [flippedCards, setFlippedCards] = React.useState<Record<string, boolean>>({});
  const [stepThreeSlots, setStepThreeSlots] = React.useState<boolean[]>([false, false, false]);
  const [simulatedDice, setSimulatedDice] = React.useState<number[]>([3, 5]);
  const [earnedBadges, setEarnedBadges] = React.useState<string[]>([]);
  const [gameMessage, setGameMessage] = React.useState<string>('Your orientation start-board is ready. Roll the dice to trace paths!');
  const [diceRolling, setDiceRolling] = React.useState(false);

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
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-8">
          <div className="space-y-3 flex-1">
            <h1 className={isParProductionControl 
              ? "text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-zinc-900 font-sans" 
              : `text-4xl md:text-6xl font-bold tracking-tighter leading-tight font-playfair italic ${
                  isWalkForPlastic ? 'text-[#0a3161]' :
                  isMyCampus ? 'text-[#b31942]' :
                  isPathwaysBadgeQuest ? 'text-[#5a8c69]' :
                  'text-[#0a3161]'
                }`
            }>
              {project.title}
            </h1>
            <p className={isParProductionControl
              ? "text-lg md:text-xl text-zinc-600 max-w-3xl leading-relaxed font-sans font-normal mt-3"
              : "text-lg md:text-xl text-zinc-400 max-w-2xl leading-snug font-light"
            }>
              {project.description}
            </p>
            {isParProductionControl && (
              <div className="flex flex-wrap gap-x-8 gap-y-3 pt-4 border-t border-zinc-150 mt-6 text-[11px] font-mono text-zinc-500 uppercase tracking-wider">
                <div><span className="font-bold text-zinc-400">Role:</span> {project.role}</div>
                <div><span className="font-bold text-zinc-400">Platform:</span> {project.platform}</div>
                <div><span className="font-bold text-zinc-400">Tools:</span> {project.tools}</div>
              </div>
            )}
          </div>
          {project.liveUrl && !isParProductionControl && (
            <div className="flex-shrink-0 pt-2 md:pt-0">
              <a 
                href={project.liveUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 font-sans text-sm font-semibold px-6 py-3 rounded-full transition-all hover:shadow-lg active:scale-95 duration-200 ${
                  isParProductionControl 
                    ? 'bg-zinc-900 hover:bg-zinc-800 text-white' 
                    : 'bg-[#0a3161] hover:bg-[#07244a] text-white'
                }`}
              >
                View Live App
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className={`mx-auto pb-20 space-y-12 ${isParProductionControl ? 'w-full max-w-none px-0' : 'px-6 max-w-5xl'}`}>
        
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
              <div className="bg-[#5a8c69] text-white p-8 md:p-12 rounded-[40px] relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-[120px] rounded-full"></div>
                <div className="relative z-10 space-y-4">
                  <div className="space-y-2">
                    <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
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
                          <span className="text-6xl font-black text-[#0a3161] tracking-tighter tabular-nums">{features[activeIndex].num}</span>
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
                 <span className="text-[#0a3161] font-bold text-xs tracking-widest uppercase">03. The Core Problem</span>
               </div>
               <div className="bg-[#b31942] text-white p-8 md:p-12 rounded-[40px] relative overflow-hidden shadow-2xl">
                  <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 blur-[100px] rounded-full"></div>
                  <div className="relative z-10 space-y-4">
                    <div className="space-y-2">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
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
                      <div className="bg-[#0a3161]/5 p-4 rounded-xl border-l-4 border-[#0a3161]/20 italic text-zinc-600 text-sm whitespace-normal md:whitespace-nowrap">"One participant instinctively tapped the button a second time."</div>
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
                          onError={(e) => handleImageError(e, "1. Profile")}
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
                          onError={(e) => handleImageError(e, "2. Selection")}
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
                          onError={(e) => handleImageError(e, "3. Confirmation")}
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
            </section>

            <section className="space-y-8 py-5">
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
                      <span className="w-7 h-7 rounded-full bg-[#0a3161] flex items-center justify-center font-bold text-white shrink-0 text-xs">{i+1}</span>
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

        {isPathwaysBadgeQuest && (
          <>
            {/* The Story Arc Summary */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-6 pt-4"
            >
              <div className="flex items-center gap-2">
                <span className="h-[1px] w-6 bg-zinc-300"></span>
                <span className="text-zinc-400 text-[10px] font-bold uppercase tracking-[0.2em]">The Story Arc</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 border border-zinc-100 rounded-[32px] overflow-hidden bg-[#fafafa]">
                {[
                  { label: 'HERO', val: 'The student, lost mid-journey', icon: User, clr: 'text-[#0a3161] bg-[#0a3161]/5' },
                  { label: 'PROBLEM', val: 'No clarity, no momentum', icon: AlertTriangle, clr: 'text-[#b31942] bg-[#b31942]/5' },
                  { label: 'TOOL', val: 'A game that makes it real', icon: Gamepad2, clr: 'text-[#5a8c69] bg-[#5a8c69]/5' },
                  { label: 'RESOLUTION', val: 'Progress feels earned', icon: Trophy, clr: 'text-amber-600 bg-amber-50/5' }
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className="p-6 md:p-8 flex flex-col items-center text-center space-y-3 border-r border-b md:border-b-0 last:border-r-0 border-zinc-100">
                      <div className={`p-3 rounded-2xl ${item.clr}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-zinc-400 tracking-wider uppercase">{item.label}</span>
                        <p className="text-xs md:text-sm font-medium text-zinc-800 leading-tight">{item.val}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.section>

               {/* My Role Section */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6 pt-6"
            >
              <div className="flex items-center gap-2">
                <span className="h-[1px] w-6 bg-zinc-300"></span>
                <span className="text-zinc-400 text-[10px] font-bold uppercase tracking-[0.2em]">Design Ownership</span>
              </div>
              <h3 className="text-2xl font-extrabold text-zinc-900">
                My Contribution & Ownership
              </h3>
              <p className="text-base text-zinc-600 leading-relaxed font-light">
                This was a collaborative team project. Working alongside teammates and a faculty advisor, I was responsible for the game board layout, card component system, badge visual design, and the complete Figma execution. I also designed the mobile-first direction we explored before committing to the game, contributed to gameplay mechanics, participated in usability reviews, and presented the final designs to faculty stakeholders.
              </p>
            </motion.section>

            {/* 01. Opening */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6 pt-6"
            >
              <div className="flex items-center gap-2">
                <span className="h-[1px] w-6 bg-zinc-300"></span>
                <span className="text-zinc-400 text-[10px] font-bold uppercase tracking-[0.2em]">01 — THE STARTING POINT</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-900 leading-tight">
                A student who started, but never finished
              </h3>
              <div className="space-y-4 text-base text-zinc-600 leading-relaxed font-light">
                <p>
                  Every semester, students at Iowa State's College of Agriculture and Life Sciences enrolled in the Pathways to Innovation and Leadership program — a micro-credential track designed to build real career skills alongside their degree.
                </p>
                <p>
                  They showed up. They started. And then, quietly, <span className="text-[#b31942] font-semibold">most of them stopped</span>.
                </p>
                <p>
                  Not because the program was bad. Not because they stopped caring about their careers. But because somewhere between enrolling and finishing, the path disappeared. No clear next step. No sense of how far they'd come. No feeling that it was worth pushing through to the end.
                </p>
                <p>
                  Our team was brought in to answer one question: why were students starting the Pathways program but not completing it — and what would it take to change that?
                </p>
              </div>

              {/* Quote Block */}
              <div className="p-8 border-l-4 border-[#b31942] bg-[#b31942]/5 rounded-r-[28px] my-6">
                <p className="text-lg italic font-medium text-zinc-805 leading-relaxed">
                  "I felt like the requirements for how to earn the badges were slightly confusing. I wasn't always sure what I needed to do outside of the workshop."
                </p>
                <cite className="block mt-4 text-xs font-semibold uppercase tracking-wider text-zinc-500 not-italic">
                  — CALS Pathways student
                </cite>
              </div>

              <div className="text-base text-zinc-600 leading-relaxed font-light">
                <p>
                  That one quote said everything. The student was willing — they just couldn't see where to go next.
                </p>
              </div>
            </motion.section>

            {/* 02. Understanding the Challenge */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6 pt-6"
            >
              <div className="flex items-center gap-2">
                <span className="h-[1px] w-6 bg-zinc-300"></span>
                <span className="text-zinc-400 text-[10px] font-bold uppercase tracking-[0.2em]">02 — UNDERSTANDING THE CHALLENGE</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-900 leading-tight">
                The experience felt like paperwork, not progress
              </h3>
              <p className="text-base text-zinc-600 leading-relaxed font-light">
                Before designing anything, we needed to understand what dropping off actually felt like. Working with faculty who knew the program deeply, two core pain points surfaced clearly:
              </p>

              {/* Grid Cards for Pains */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div className="bg-red-50/20 p-8 rounded-[32px] border border-red-100 flex flex-col space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full bg-red-100/60 font-mono text-[10px] uppercase font-bold text-[#b31942]">PAIN 1 — NO VISIBLE PATH FORWARD</span>
                  </div>
                  <p className="text-sm font-light text-zinc-600 leading-relaxed">
                    Students couldn't see what they had completed or what came next. The credential system existed, but it wasn't visible in a way that created momentum. Progress was happening invisibly — and invisible progress feels like no progress at all.
                  </p>
                </div>

                <div className="bg-red-50/20 p-8 rounded-[32px] border border-red-100 flex flex-col space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-full bg-red-100/60 font-mono text-[10px] uppercase font-bold text-[#b31942]">PAIN 2 — DISCONNECTED ACTIVITIES</span>
                  </div>
                  <p className="text-sm font-light text-zinc-600 leading-relaxed">
                    Completing a workshop didn't feel like it led anywhere meaningful. Each activity existed in isolation. There was no felt sense of how individual steps connected to a larger career outcome or a final goal worth working toward.
                  </p>
                </div>
              </div>

            </motion.section>

            {/* 03. Exploring Engagement Models */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6 pt-6"
            >
              <div className="flex items-center gap-2">
                <span className="h-[1px] w-6 bg-zinc-300"></span>
                <span className="text-zinc-400 text-[10px] font-bold uppercase tracking-[0.2em]">03 — EXPLORING ENGAGEMENT MODELS</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-900 leading-tight">
                Two directions, one real decision
              </h3>
              <p className="text-base text-zinc-600 leading-relaxed font-light">
                The team didn't start with a game. We started with a question: what does it actually take to make progress feel real? I explored two distinct directions before committing to a final solution.
              </p>

              {/* Side-by-Side Direction Showcase for Immediate Contrast */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-8">
                {/* DIRECTION A CARD */}
                <div className="flex flex-col bg-[#fafafa] p-6 md:p-8 rounded-[36px] border border-zinc-150/60 justify-between group hover:border-[#0a3161]/30 hover:shadow-[0_24px_48px_-15px_rgba(10,49,97,0.06)] hover:-translate-y-0.5 transition-all duration-300">
                  <div className="space-y-4">
                    <span className="inline-block px-3.5 py-1.5 rounded-full bg-zinc-200/60 font-mono text-[11px] md:text-xs uppercase font-bold text-zinc-700 tracking-wider">DIRECTION A · MOBILE CREDENTIAL TRACKER</span>
                    <p className="text-sm font-light text-zinc-650 leading-relaxed">
                      My initial concept focused on a mobile-first experience where students could track completed activities, monitor credential progress, and view earned badges in one place. The concept emphasized accessibility and visibility — giving students a way to understand their progress and revisit the program beyond orientation.
                    </p>
                  </div>

                  {/* IMAGE 1 OF 9: Figma Mobile Tracker Design */}
                  <div className="mt-6 relative rounded-[28px] overflow-hidden border border-zinc-150 bg-white p-2.5">
                    <div className="rounded-[18px] overflow-hidden bg-zinc-50 relative aspect-[4/3] flex items-center justify-center">
                      <img 
                        src="https://i.imgur.com/pFE5eWI.png" 
                        alt="Direction A — Mobile Credential Tracker Figma design" 
                        className="w-full h-full object-cover block group-hover:scale-[1.015] transition-transform duration-[1200ms]"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent p-4 text-white pt-12">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-[8px] font-mono tracking-widest uppercase text-yellow-400 font-bold bg-yellow-400/10 px-2 py-0.5 rounded border border-yellow-400/20">Figma Design</span>
                            <h4 className="text-[10px] font-bold tracking-tight mt-1 text-white">Direction A — Mobile Tracker</h4>
                          </div>
                          <span className="text-[8px] bg-zinc-900/90 px-2 py-0.5 rounded font-mono text-zinc-350">IMAGE 1 OF 9</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* DIRECTION B CARD */}
                <div className="flex flex-col bg-[#fafafa] p-6 md:p-8 rounded-[36px] border border-zinc-150/60 justify-between group hover:border-[#5a8c69]/30 hover:shadow-[0_24px_48px_-15px_rgba(90,140,105,0.06)] hover:-translate-y-0.5 transition-all duration-300">
                  <div className="space-y-4">
                    <span className="inline-block px-3.5 py-1.5 rounded-full bg-[#5a8c69]/10 font-mono text-[11px] md:text-xs uppercase font-bold text-[#5a8c69] tracking-wider">DIRECTION B · PHYSICAL BOARD GAME</span>
                    <p className="text-sm font-light text-zinc-650 leading-relaxed">
                      At the same time, the team explored a physical game experience designed specifically for orientation sessions. Unlike a mobile experience, the board game encouraged discussion, collaboration, and active participation among students. My role focused on translating the concept into an interactive system through the initial board layout, card structure, progression flow, and visual design.
                    </p>
                  </div>

                  {/* IMAGE 2 OF 9: Figma Board Overview Image */}
                  <div className="mt-6 relative rounded-[28px] overflow-hidden border border-zinc-150 bg-white p-2.5">
                    <div className="rounded-[18px] overflow-hidden bg-zinc-50 relative aspect-[4/3] flex items-center justify-center">
                      <img 
                        src="https://i.imgur.com/hqyTV4t.png" 
                        alt="Direction B — Physical Board Game Figma layout design" 
                        className="w-full h-full object-cover block group-hover:scale-[1.015] transition-transform duration-[1200ms]"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent p-4 text-white pt-12">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-[8px] font-mono tracking-widest uppercase text-yellow-400 font-bold bg-yellow-400/10 px-2 py-0.5 rounded border border-yellow-400/20">Figma Design</span>
                            <h4 className="text-[10px] font-bold tracking-tight mt-1 text-white">Direction B — Physical Board</h4>
                          </div>
                          <span className="text-[8px] bg-zinc-900/90 px-2 py-0.5 rounded font-mono text-zinc-350">IMAGE 2 OF 9</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Choosing the Right Experience Rationale Text */}
              <div className="space-y-4 text-base text-zinc-600 leading-relaxed font-light pt-4 border-t border-zinc-100">
                <h4 className="text-lg font-bold text-zinc-900">Choosing the Right Experience</h4>
                <p>
                  After reviewing both directions with faculty stakeholders, the team chose the physical game. Orientation is fundamentally a social environment — the game encouraged participation and shared learning in ways a digital solution could not.
                </p>
                <p>
                  The mobile direction wasn't wasted work — it's what made the decision rigorous. Stakeholders chose the game because they compared it to a real alternative, not because it was the only idea on the table.
                </p>
              </div>
            </motion.section>

            {/* 04. Designing the Game */}
            <motion.section 
              initial={{ opacity: 0, scale: 0.98, y: 15 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6 pt-6"
            >
              <div className="flex items-center gap-2">
                <span className="h-[1px] w-6 bg-zinc-300"></span>
                <span className="text-zinc-400 text-[10px] font-bold uppercase tracking-[0.2em]">04 — DESIGNING THE GAME</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-900 leading-tight">
                What we built
              </h3>
              
              <div className="space-y-4 text-base text-zinc-600 leading-relaxed font-light">
                <p className="text-sm font-semibold text-zinc-800">
                  Designing for the constraints of a rapid-paced orientation room meant every physical card, token slot, and pathway had to be incredibly clear and comprehensible in under 3 minutes.
                </p>
                <p>
                  <strong>What the game is:</strong> Pathways Badge Quest is a physical board game for 1–4 players. Students race to complete real micro-credential activities, earn badges across five career categories, and work toward a final completion badge. Players take turns placing cards and drafting dice — each round different from the last. The game mirrors the actual Pathways program structure, making the credential journey feel like a challenge worth finishing. It plays in 20–45 minutes.
                </p>
              </div>

              {/* IMAGE 3 OF 9 / IMAGE 9 OF 9 Physical Gameplay Image Replaces Interactive Simulation */}
              <motion.div
                initial={{ opacity: 0, scale: 0.98, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="my-10"
              >
                <div className="relative group rounded-[40px] overflow-hidden border border-zinc-200/80 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.12)] bg-white p-3">
                  <div className="rounded-[32px] overflow-hidden bg-zinc-50 aspect-[4/3] relative">
                    <img 
                      src="https://i.imgur.com/GEbH2tS.png" 
                      alt="Pathways Badge Quest physical board game layout being played on standard red round table" 
                      className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-[1200ms]"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent p-6 md:p-8 text-white">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-[10px] font-mono tracking-widest uppercase text-yellow-400 font-bold bg-yellow-400/10 px-2.5 py-0.5 rounded border border-yellow-400/20">Deployed Photo</span>
                        <span className="text-xs text-zinc-300 font-mono">Summer 2025 · Iowa State University CALS</span>
                      </div>
                      <h4 className="text-xl md:text-2xl font-black tracking-tight">A Physical Game Board</h4>
                      <p className="text-sm text-zinc-200 mt-2 font-light max-w-3xl leading-relaxed">
                        An active engagement model that mirrors reality. Two identical player maps sit side-by-side with custom career tracks, printed category cards, custom dice, and tokens.
                      </p>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-zinc-400 italic text-center mt-3">
                  "Pathways Badge Quest deployed at Iowa State University CALS orientation. Red-table active gameplay layouts, custom tokens, and progress cards in perfect alignment."
                </p>
              </motion.div>

              {/* Complete Visual System Component */}
              <div className="pt-8 space-y-4">
                <h4 className="text-xl font-bold text-zinc-900">The Complete Visual System</h4>
                <p className="text-base text-zinc-600 leading-relaxed font-light">
                  Five credential categories, one cohesive visual system. Each category has its own color, badge illustration, and card identity — designed to be instantly recognizable during active gameplay without reading a label.
                </p>

                {/* Visual System Mockup Cards (Image 4 of 9) */}
                <div className="relative group rounded-[40px] overflow-hidden border border-zinc-200/80 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.12)] bg-white p-3">
                  <div className="rounded-[32px] overflow-hidden bg-zinc-50 relative">
                    <img 
                      src="https://i.imgur.com/VW0rqMm.png" 
                      alt="The Complete Visual System - Component details, player cards, pathways, and badge frames" 
                      className="w-full h-auto block group-hover:scale-[1.01] transition-transform duration-[1200ms]"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent p-6 md:p-8 text-white pt-20">
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-[10px] font-mono tracking-widest uppercase text-yellow-400 font-bold bg-yellow-400/10 px-2.5 py-0.5 rounded border border-yellow-400/20">Figma Component System</span>
                          <h4 className="text-lg md:text-xl font-bold tracking-tight mt-2">The Deployed Card Components System</h4>
                        </div>
                        <span className="text-xs bg-zinc-800/80 px-2.5 py-1 rounded-full font-mono text-zinc-300">IMAGE 4 OF 9</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Visual System Caption explicitly defined */}
                <p className="text-xs text-zinc-400 italic text-center mt-2 max-w-2xl mx-auto leading-relaxed">
                  "Five credential categories, one cohesive visual system. Each category has its own color, badge illustration, and card identity — designed to be instantly recognizable during active gameplay without reading a label."
                </p>
              </div>
            </motion.section>

            {/* 05. How the Design Evolved */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6 pt-6"
            >
              <div className="flex items-center gap-2">
                <span className="h-[1px] w-6 bg-zinc-300"></span>
                <span className="text-zinc-400 text-[10px] font-bold uppercase tracking-[0.2em]">05 — HOW THE DESIGN EVOLVED</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-900 leading-tight">
                From sketch to deployed design
              </h3>
              <p className="text-base text-zinc-600 leading-relaxed font-light">
                Good design rarely arrives fully formed. Here is the card evolution from first sketch to final deployed version — and the thinking behind each change.
              </p>

              {/* Four Evolution Steps Visualizer */}
              <div className="space-y-12 pt-6">
                
                {/* Step 1 */}
                <div className="border border-zinc-100 rounded-[32px] p-8 md:p-10 bg-[#fafafa] space-y-6">
                  <div className="flex justify-between items-center border-b border-zinc-200/60 pb-4">
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-zinc-800 text-white font-mono text-xs flex items-center justify-center font-bold">1</span>
                      <h4 className="text-sm font-bold text-zinc-800">Step 1 — Thinking on Paper</h4>
                    </div>
                    <span className="text-[9px] bg-zinc-200/80 text-zinc-650 font-mono px-2.5 py-0.5 rounded-full uppercase tracking-wider font-bold">Sketches Stage</span>
                  </div>
                  
                  <div className="space-y-8">
                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center w-full max-w-4xl mx-auto">
                      <motion.div 
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -8, scale: 1.02, boxShadow: "0 25px 50px -12px rgba(0,0,0,0.15)" }}
                        transition={{ type: "spring", stiffness: 300, damping: 22 }}
                        className="relative rounded-[28px] overflow-hidden border border-zinc-200/80 shadow-[0_15px_30px_-10px_rgba(0,0,0,0.08)] bg-white p-3 cursor-pointer w-full sm:w-[48%] max-w-[380px]"
                      >
                        <div className="rounded-[20px] overflow-hidden bg-zinc-50 relative">
                          <img 
                            src="https://i.imgur.com/dpG2gxm.png" 
                            alt="Step 1 — Thinking on Paper sketches layout 1" 
                            className="w-full h-auto block object-contain"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="mt-2 text-center text-[10px] text-zinc-400 font-mono">Sketch Sheet A</div>
                      </motion.div>

                      <motion.div 
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -8, scale: 1.02, boxShadow: "0 25px 50px -12px rgba(0,0,0,0.15)" }}
                        transition={{ type: "spring", stiffness: 300, damping: 22 }}
                        className="relative rounded-[28px] overflow-hidden border border-zinc-200/80 shadow-[0_15px_30px_-10px_rgba(0,0,0,0.08)] bg-white p-3 cursor-pointer w-full sm:w-[48%] max-w-[380px]"
                      >
                        <div className="rounded-[20px] overflow-hidden bg-zinc-50 relative">
                          <img 
                            src="https://i.imgur.com/atT5NTf.png" 
                            alt="Step 1 — Thinking on Paper sketches layout 2" 
                            className="w-full h-auto block object-contain"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="mt-2 text-center text-[10px] text-zinc-400 font-mono">Sketch Sheet B</div>
                      </motion.div>
                    </div>
                    
                    <div className="max-w-3xl mx-auto space-y-4 text-sm text-zinc-650 font-light leading-relaxed border-t border-zinc-200/50 pt-6">
                      <p>
                        The sketches show both card states in one drawing — the front with the shield badge and reflection question, and the back (playing side) with three dice icons and task rows.
                      </p>
                      <p>
                        The core structure was established here. What changed from sketch to final was not the concept — it was the execution, the sizing, and one important mechanical problem discovered through testing.
                      </p>
                      <p className="text-xs text-zinc-400 mt-4 font-mono">
                        Hand-drawn sketches — card front and playing mat layout, before opening Figma.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="border border-zinc-100 rounded-[32px] p-8 md:p-10 bg-[#fafafa] space-y-6">
                  <div className="flex justify-between items-center border-b border-zinc-200/60 pb-4">
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-zinc-800 text-white font-mono text-xs flex items-center justify-center font-bold">2</span>
                      <h4 className="text-sm font-bold text-zinc-800">Step 2 — First Figma Version</h4>
                    </div>
                    <span className="text-[9px] bg-zinc-200/80 text-zinc-650 font-mono px-2.5 py-0.5 rounded-full uppercase tracking-wider font-bold">Figma V1</span>
                  </div>

                  <div className="space-y-8">
                    <div className="flex justify-center w-full max-w-2xl mx-auto">
                      <motion.div 
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -8, scale: 1.025, boxShadow: "0 30px 60px -15px rgba(0,0,0,0.18)" }}
                        transition={{ type: "spring", stiffness: 280, damping: 20 }}
                        className="relative rounded-[32px] overflow-hidden border border-zinc-200/80 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.08)] bg-white p-3 cursor-pointer w-full"
                      >
                        <div className="rounded-[24px] overflow-hidden bg-zinc-50 relative">
                          <img 
                            src="https://i.imgur.com/VWkSdIs.png" 
                            alt="Step 2 — First Figma Version" 
                            className="w-full h-auto block object-contain"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                        <div className="absolute top-5 right-5 bg-zinc-900/90 text-white text-[8px] font-mono tracking-widest px-2.5 py-1 rounded border border-zinc-700/50">DRAFT OUTLINE</div>
                      </motion.div>
                    </div>

                    <div className="max-w-3xl mx-auto space-y-4 text-sm text-zinc-650 font-light leading-relaxed border-t border-zinc-200/50 pt-6">
                      <p>
                        The first Figma version translated the sketch into a digital structure. The dice icons were large and dominant, the header was a flat colored bar, and the card carried a lot of text.
                      </p>
                      <p>
                        When we tested this version, players were looking down at the card too long — reading it instead of playing. That pause broke the flow of the game.
                      </p>
                      <p>
                        The redesign was about reducing cognitive load. A player shouldn't have to study a card during their turn. They should glance at it and know exactly what to do.
                      </p>
                      <p className="text-xs text-zinc-400 mt-4 font-mono">
                        First Figma version — large dice icons, placeholder text, flat header bar. Players read this too slowly during testing.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="border border-zinc-100 rounded-[32px] p-8 md:p-10 bg-[#fafafa] space-y-6">
                  <div className="flex justify-between items-center border-b border-zinc-200/60 pb-4">
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-zinc-800 text-white font-mono text-xs flex items-center justify-center font-bold">3</span>
                      <h4 className="text-sm font-bold text-zinc-800">Step 3 — Mid Iteration (The Token Breakthrough)</h4>
                    </div>
                    <span className="text-[9px] bg-amber-100 text-amber-800 font-mono px-2.5 py-0.5 rounded-full uppercase tracking-wider font-bold">Discovery Stage</span>
                  </div>

                  <div className="space-y-8">
                    <div className="max-w-3xl mx-auto space-y-4 text-sm text-zinc-650 font-light leading-relaxed pt-2">
                      <p>
                        This is where the token solution appeared. During usability testing with teammates, we hit a problem nobody had seen from looking at a screen alone: placing dice directly onto cards to mark completed activities caused a dice shortage.
                      </p>
                      <p>
                        Once a die was locked on a card, it was unavailable for the next round. By round three, players were waiting — not because they had nothing to do, but because the dice pool had run dry.
                      </p>
                      <p>
                        I suggested replacing the placed dice with star-shaped activity completion tokens. The dice would be drafted, used to confirm which activity they fulfilled, and then returned to the central pile. The token stayed on the card as the marker.
                      </p>
                      <p className="text-xs text-zinc-400 mt-4 font-mono">
                        Mid-iteration — star tokens replacing dice as activity markers. The token solution kept the dice pool live.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="border border-zinc-100 rounded-[32px] p-8 md:p-10 bg-[#fafafa] space-y-6">
                  <div className="flex justify-between items-center border-b border-zinc-200/60 pb-4">
                    <div className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-zinc-850 text-white font-mono text-xs flex items-center justify-center font-bold">4</span>
                      <h4 className="text-sm font-bold text-zinc-900">Step 4 — Final Deployed Version</h4>
                    </div>
                    <span className="text-[9px] bg-[#5a8c69]/10 text-[#5a8c69] font-mono px-2.5 py-0.5 rounded-full uppercase tracking-wider font-bold">FINAL VERSION</span>
                  </div>

                  <div className="space-y-8">
                    
                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-stretch w-full max-w-4xl mx-auto">
                      {/* Front Card */}
                      <motion.div 
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -6, scale: 1.015, boxShadow: "0 25px 50px -12px rgba(0,0,0,0.15)" }}
                        transition={{ type: "spring", stiffness: 300, damping: 22 }}
                        className="relative rounded-[28px] overflow-hidden border border-zinc-200/80 shadow-[0_15px_30px_-10px_rgba(0,0,0,0.08)] bg-white p-3 w-full sm:w-[48%] max-w-[380px]"
                      >
                        <div className="rounded-[20px] overflow-hidden bg-zinc-50 relative">
                          <img 
                            src="https://i.imgur.com/DnnPkD6.png" 
                            alt="Step 4 — Final Deployed Version Front" 
                            className="w-full h-auto block object-contain"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      </motion.div>

                      {/* Back Card */}
                      <motion.div 
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -6, scale: 1.015, boxShadow: "0 25px 50px -12px rgba(0,0,0,0.15)" }}
                        transition={{ type: "spring", stiffness: 300, damping: 22 }}
                        className="relative rounded-[28px] overflow-hidden border border-zinc-200/80 shadow-[0_15px_30px_-10px_rgba(0,0,0,0.08)] bg-white p-3 w-full sm:w-[48%] max-w-[380px]"
                      >
                        <div className="rounded-[20px] overflow-hidden bg-zinc-50 relative">
                          <img 
                            src="https://i.imgur.com/hqyTV4t.png" 
                            alt="Step 4 — Final Deployed Version Back" 
                            className="w-full h-auto block object-contain"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      </motion.div>
                    </div>

                    <div className="max-w-3xl mx-auto space-y-4 text-sm text-zinc-650 font-light leading-relaxed border-t border-zinc-200/50 pt-6">
                      <p>
                        The final card resolved everything: compact dice icons for fast scanning, a wave header replacing the flat bar, a simplified shield badge on the back without the university wordmark, and a reflection question that turns the flip moment into a conversation — not just a reward.
                      </p>
                      <p className="text-xs text-zinc-400 mt-4 font-mono">
                        Final card and Player mat
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* 06. Design Decisions, Examined */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6 pt-6"
            >
              <div className="flex items-center gap-2">
                <span className="h-[1px] w-6 bg-zinc-300"></span>
                <span className="text-zinc-400 text-[10px] font-bold uppercase tracking-[0.2em]">06 — DESIGN DECISIONS, EXAMINED</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-900 leading-tight">
                Three decisions that shaped the game
              </h3>
              
              {/* Detailed Decision Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
                {/* Decision 01 */}
                <div className="group relative bg-[#ffffff] border border-zinc-200/80 rounded-[32px] p-6 lg:p-8 space-y-6 flex flex-col justify-between min-h-[580px] hover:border-amber-350 hover:shadow-[0_24px_48px_-15px_rgba(217,119,6,0.1)] hover:-translate-y-1 transition-all duration-300">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-amber-600 text-[10px] font-bold tracking-wider bg-amber-50 px-2.5 py-1 rounded-full uppercase">Decision 01</span>
                      <span className="text-[9px] text-zinc-400 font-mono tracking-widest">TACTILE REVEAL</span>
                    </div>
                    
                    <h4 className="text-xl font-bold text-zinc-900 tracking-tight">The card flip mechanic</h4>
                    
                    <ul className="text-sm font-light leading-relaxed text-zinc-650 space-y-4 pl-1">
                      <li className="flex gap-2.5 items-start">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                        <span className="text-zinc-600">
                          <strong className="text-zinc-900 font-bold font-mono text-[13px] block">Hidden Reveal:</strong> The badge remains hidden on the back until every activity is fully complete.
                        </span>
                      </li>
                      <li className="flex gap-2.5 items-start">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                        <span className="text-zinc-600">
                          <strong className="text-zinc-900 font-bold font-mono text-[13px] block">Completion Mirror:</strong> Flipping the card physically mirrors the program's real-life completion moment.
                        </span>
                      </li>
                      <li className="flex gap-2.5 items-start">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                        <span className="text-zinc-600">
                          <strong className="text-zinc-900 font-bold font-mono text-[13px] block">Tangible Reward:</strong> The visual and tactile act of revealing makes earning feel real, far surpassing a digital checkmark.
                        </span>
                      </li>
                    </ul>
                  </div>

                  {/* High fidelity interactive flip widget */}
                  <div className="relative pt-6 border-t border-zinc-100 flex flex-col items-center justify-center">
                    <span className="text-[9px] font-mono font-bold text-zinc-400 mb-3.5 uppercase tracking-widest flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500 animate-pulse" /> Hover card to flip physically
                    </span>
                    <div className="w-full max-w-[210px] h-[140px] [perspective:1000px]">
                      <div className="relative w-full h-full transition-transform duration-700 ease-out [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
                        {/* Front (Activities & Dice) */}
                        <div className="absolute inset-0 bg-[#fbfdfb] border border-zinc-200 rounded-2xl p-3 flex flex-col justify-between shadow-sm [backface-visibility:hidden]">
                          <div className="flex items-center justify-between border-b pb-1.5">
                            <span className="text-[9px] font-mono font-bold tracking-wider text-zinc-500">PLAYING STATE</span>
                            <div className="flex gap-1">
                              <span className="w-2 h-2 bg-amber-500 rounded-full animate-ping absolute" />
                              <span className="w-2 h-2 bg-amber-500 rounded-full relative" />
                              <span className="w-2 h-2 bg-zinc-200 rounded-full" />
                            </div>
                          </div>
                          <div className="space-y-1.5 my-auto">
                            <div className="flex items-center gap-1.5">
                              <span className="w-3.5 h-3.5 bg-zinc-100 rounded border border-zinc-200 flex items-center justify-center text-[8px] font-mono">🎲</span>
                              <div className="h-1.5 w-24 bg-zinc-200 rounded-full" />
                            </div>
                            <div className="flex items-center gap-1.5">
                              <span className="w-3.5 h-3.5 bg-zinc-100 rounded border border-zinc-200 flex items-center justify-center text-[8px] font-mono">🎲</span>
                              <div className="h-1.5 w-16 bg-zinc-200 rounded-full" />
                            </div>
                          </div>
                          <div className="text-[8px] font-mono text-center text-zinc-400 font-semibold border-t pt-1">
                            TASKS SIDE (BACK)
                          </div>
                        </div>
                        {/* Back (Shield reveal) */}
                        <div className="absolute inset-0 bg-zinc-900 text-white rounded-2xl p-3 flex flex-col justify-between shadow-lg [transform:rotateY(180deg)] [backface-visibility:hidden]">
                          <div className="flex items-center justify-between border-b border-zinc-800 pb-1.5">
                            <span className="text-[9px] font-mono tracking-wider text-amber-400 font-bold">REVEALED BADGE</span>
                            <Trophy className="w-3.5 h-3.5 text-amber-400" />
                          </div>
                          <div className="flex flex-col items-center justify-center space-y-1.5 my-auto">
                            <div className="w-7 h-7 bg-amber-500/25 border border-amber-500/50 rounded-full flex items-center justify-center">
                              <Award className="w-4 h-4 text-amber-400" />
                            </div>
                            <span className="text-[8px] font-bold text-amber-100 font-mono tracking-widest">PATHWAYS EARNED</span>
                          </div>
                          <div className="text-[8px] font-mono text-center text-zinc-500 border-t border-zinc-800 pt-1">
                            COMPLETION STATE (FRONT)
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decision 02 */}
                <div className="group relative bg-[#ffffff] border border-zinc-200/80 rounded-[32px] p-6 lg:p-8 space-y-6 flex flex-col justify-between min-h-[580px] hover:border-teal-350 hover:shadow-[0_24px_48px_-15px_rgba(20,184,166,0.1)] hover:-translate-y-1 transition-all duration-300">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-teal-600 text-[10px] font-bold tracking-wider bg-teal-50 px-2.5 py-1 rounded-full uppercase">Decision 02</span>
                      <span className="text-[9px] text-zinc-400 font-mono tracking-widest">WAYFINDING</span>
                    </div>
                    
                    <h4 className="text-xl font-bold text-zinc-900 tracking-tight">Color-coded categories</h4>
                    
                    <ul className="text-sm font-light leading-relaxed text-zinc-650 space-y-4 pl-1">
                      <li className="flex gap-2.5 items-start">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-2 shrink-0" />
                        <span className="text-zinc-600">
                          <strong className="text-zinc-900 font-bold font-mono text-[13px] block">Instant Recognition:</strong> Five distinct color-coded categories allow fast recognition across the board without reading labels.
                        </span>
                      </li>
                      <li className="flex gap-2.5 items-start">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-2 shrink-0" />
                        <span className="text-zinc-600">
                          <strong className="text-zinc-900 font-bold font-mono text-[13px] block">Wayfinding Focus:</strong> Enables students to focus on competing and participating during fast-paced, high-volume sessions.
                        </span>
                      </li>
                      <li className="flex gap-2.5 items-start">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-500 mt-2 shrink-0" />
                        <span className="text-zinc-600">
                          <strong className="text-zinc-900 font-bold font-mono text-[13px] block">Proven Speed:</strong> Playtesting confirmed players could accurately identify their target category in under a second.
                        </span>
                      </li>
                    </ul>
                  </div>

                  {/* High fidelity spectrum layout */}
                  <div className="space-y-3 pt-6 border-t border-zinc-100">
                    <span className="text-[9px] font-mono font-bold text-zinc-400 block uppercase tracking-widest text-center">
                      Wayfinding Color Spectrum Palette
                    </span>
                    <div className="grid grid-cols-5 gap-2">
                      {[
                        { color: "bg-[#8c1d40]", name: "Mock" },
                        { color: "bg-[#00a3b1]", name: "Innov." },
                        { color: "bg-[#5c4d9e]", name: "Leader." },
                        { color: "bg-[#ffb500]", name: "Plan." },
                        { color: "bg-[#5a8c69]", name: "Hands" }
                      ].map((item, idx) => (
                        <div key={idx} className="flex flex-col items-center gap-1.5 group-hover:scale-105 transition-transform duration-300">
                          <div className={`w-full h-11 ${item.color} rounded-xl shadow-[0_4px_12px_rgba(0,0,0,0.06)] border border-white/20 flex items-center justify-center p-1`}>
                            <Award className="w-4 h-4 text-white/9 priced-model-glow" />
                          </div>
                          <span className="text-[8px] font-mono text-zinc-500 tracking-wider font-bold uppercase truncate max-w-full">
                            {item.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Decision 03 */}
                <div className="group relative bg-[#ffffff] border border-zinc-200/80 rounded-[32px] p-6 lg:p-8 space-y-6 flex flex-col justify-between min-h-[580px] hover:border-indigo-350 hover:shadow-[0_24px_48px_-15px_rgba(79,70,229,0.1)] hover:-translate-y-1 transition-all duration-300">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="font-mono text-indigo-600 text-[10px] font-bold tracking-wider bg-indigo-50 px-2.5 py-1 rounded-full uppercase">Decision 03</span>
                      <span className="text-[9px] text-zinc-400 font-mono tracking-widest">TOKEN SYSTEM</span>
                    </div>
                    
                    <h4 className="text-xl font-bold text-zinc-900 tracking-tight">Tokens instead of dice as markers</h4>
                    
                    <ul className="text-sm font-light leading-relaxed text-zinc-650 space-y-4 pl-1">
                      <li className="flex gap-2.5 items-start">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0" />
                        <span className="text-zinc-600">
                          <strong className="text-zinc-900 font-bold font-mono text-[13px] block">Paper vs. Practice:</strong> Utilizing dice both to draft and mark felt simple theoretically but caused severe table shortages.
                        </span>
                      </li>
                      <li className="flex gap-2.5 items-start">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0" />
                        <span className="text-zinc-600">
                          <strong className="text-zinc-900 font-bold font-mono text-[13px] block">Decoupled Mechanics:</strong> Separating activity completion from rolling decoupled game mechanics to keep the dice pool alive.
                        </span>
                      </li>
                      <li className="flex gap-2.5 items-start">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0" />
                        <span className="text-zinc-600">
                          <strong className="text-zinc-900 font-bold font-mono text-[13px] block">Testing-Driven:</strong> Reached this solution only by physically playtesting and observing player hand-movements at the table.
                        </span>
                      </li>
                    </ul>
                  </div>

                  {/* High fidelity comparison widget */}
                  <div className="pt-6 border-t border-zinc-100 flex flex-col gap-3">
                    <span className="text-[9px] font-mono font-bold text-zinc-400 block uppercase tracking-widest text-center">
                      Mechanics Decoupling Architecture
                    </span>
                    <div className="flex items-center justify-between gap-3 bg-zinc-50 rounded-2xl p-3 border border-zinc-150/60 font-mono text-[9px] text-zinc-500">
                      <div className="text-center flex-1 py-2.5 bg-white border border-rose-100 rounded-xl shadow-2xs group-hover:scale-[1.02] transition-transform duration-300">
                        <div className="text-lg mb-1">🎲</div>
                        <span className="text-rose-600 font-bold block">1. ROLL &amp; DRAFT</span>
                        <span className="text-[7.5px] text-zinc-400 block scale-[0.95] mt-0.5">Pool-Constrained</span>
                      </div>
                      <div className="text-zinc-300 font-black text-xs animate-pulse">➔</div>
                      <div className="text-center flex-1 py-2.5 bg-white border border-emerald-100 rounded-xl shadow-2xs group-hover:scale-[1.02] transition-transform duration-300">
                        <div className="text-base mb-1">🪙</div>
                        <span className="text-emerald-700 font-bold block">2. MARK &amp; WORK</span>
                        <span className="text-[7.5px] text-zinc-400 block scale-[0.95] mt-0.5">Unlimited Tokens</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* 07. What Was Mine, What Was Ours */}
            <motion.section 
              initial={{ opacity: 0, scale: 0.98, y: 15 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6 pt-6"
            >
              <div className="flex items-center gap-2">
                <span className="h-[1px] w-6 bg-zinc-300"></span>
                <span className="text-zinc-400 text-[10px] font-bold uppercase tracking-[0.2em]">07 — RESPONSIBILITY MAPPING</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-900 leading-tight">
                What was mine, what was ours
              </h3>
              
              {/* Modern Grid-Based Responsibility Mapping Dashboard */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
                {/* Column: I Owned Independently */}
                <div className="bg-gradient-to-b from-[#f9fafb] to-white border border-zinc-200/80 rounded-[36px] p-6 md:p-8 space-y-6 hover:shadow-[0_20px_40px_-15px_rgba(16,185,129,0.06)] hover:border-emerald-200 transition-all duration-300">
                  <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-emerald-50 rounded-2xl border border-emerald-150/50 flex items-center justify-center">
                        <User className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div>
                        <span className="font-mono text-emerald-600 text-[10px] font-black tracking-wider uppercase bg-emerald-50 px-2 py-0.5 rounded-md">INDEPENDENT</span>
                        <h4 className="text-lg font-bold text-zinc-900 mt-0.5">What I owned independently</h4>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-zinc-400 font-bold uppercase tracking-wider">6 ITEMS</span>
                  </div>

                  <div className="space-y-4">
                    {[
                      {
                        title: "Game board layout",
                        text: "Initial paper sketching and absolute vector layout execution in Figma.",
                        icon: Gamepad2,
                        col: "text-emerald-500 bg-emerald-50 border-emerald-100/50"
                      },
                      {
                        title: "Card component system",
                        text: "Designed both front & back states, fine-tuned text leading and implemented wave headers.",
                        icon: Layers,
                        col: "text-blue-500 bg-blue-50 border-blue-100/50"
                      },
                      {
                        title: "Badge design tracks",
                        text: "Visual styling and iconography for all 5 micro-credential paths.",
                        icon: Award,
                        col: "text-amber-500 bg-amber-50 border-amber-100/50"
                      },
                      {
                        title: "Mobile Tracker direction",
                        text: "Researched user needs, mapped progress levels, and designed high-fidelity Figma user interfaces.",
                        icon: Smartphone,
                        col: "text-teal-500 bg-teal-50 border-teal-100/50"
                      },
                      {
                        title: "The Token marker breakthrough",
                        text: "Pinpointed the critical dice shortage bug during group testing and initiated star markers as its resolution.",
                        icon: Sparkles,
                        col: "text-indigo-500 bg-indigo-50 border-indigo-100/50"
                      },
                      {
                        title: "Figma Design System",
                        text: "Organized the shared workspace's typography hierarchy, components, and variables guidelines.",
                        icon: FileText,
                        col: "text-purple-500 bg-purple-50 border-purple-100/50"
                      }
                    ].map((item, idx) => {
                      const IconComponent = item.icon;
                      return (
                        <div key={idx} className="group/item flex gap-4 p-4 rounded-2xl bg-white border border-zinc-150/60 hover:border-zinc-300 hover:shadow-[0_8px_16px_-6px_rgba(0,0,0,0.03)] hover:-translate-x-0.5 transition-all duration-200 font-sans">
                          <div className={`p-2.5 rounded-xl border shrink-0 h-10 w-10 flex items-center justify-center ${item.col}`}>
                            <IconComponent className="w-5 h-5" />
                          </div>
                          <div className="space-y-1">
                            <span className="text-xs font-bold text-zinc-900 group-hover/item:text-emerald-600 transition-colors duration-150 block">{item.title}</span>
                            <p className="text-xs font-light text-zinc-500 leading-relaxed">{item.text}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Column: What We Did Together */}
                <div className="bg-gradient-to-b from-[#f9fafb] to-white border border-zinc-200/80 rounded-[36px] p-6 md:p-8 space-y-6 hover:shadow-[0_20px_40px_-15px_rgba(99,102,241,0.06)] hover:border-indigo-200 transition-all duration-300">
                  <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 bg-indigo-50 rounded-2xl border border-indigo-150/50 flex items-center justify-center">
                        <Users className="w-5 h-5 text-indigo-600" />
                      </div>
                      <div>
                        <span className="font-mono text-indigo-600 text-[10px] font-black tracking-wider uppercase bg-indigo-50 px-2 py-0.5 rounded-md">JOINT SYSTEM</span>
                        <h4 className="text-lg font-bold text-zinc-900 mt-0.5">What we did together</h4>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-zinc-400 font-bold uppercase tracking-wider">3 ITEMS</span>
                  </div>

                  <div className="space-y-4">
                    {[
                      {
                        title: "Game format concept",
                        text: "Defined initial play parameters, presentation goals and roadmap direction with the College of Agriculture and Life Sciences advisor.",
                        icon: Lightbulb,
                        col: "text-indigo-500 bg-indigo-50 border-indigo-100/50"
                      },
                      {
                        title: "Dice-drafting mechanics",
                        text: "Formulated dice distribution mapping rules, drafting variability, and table mechanics during joint active sessions.",
                        icon: TrendingUp,
                        col: "text-rose-500 bg-rose-50 border-rose-100/50"
                      },
                      {
                        title: "Usability testing & feedback",
                        text: "Ran co-active testing groups, gathered students' mental reaction states, and calibrated rule thresholds.",
                        icon: CheckCircle,
                        col: "text-sky-500 bg-sky-50 border-sky-100/50"
                      }
                    ].map((item, idx) => {
                      const IconComponent = item.icon;
                      return (
                        <div key={idx} className="group/item flex gap-4 p-4 rounded-2xl bg-white border border-zinc-150/60 hover:border-zinc-300 hover:shadow-[0_8px_16px_-6px_rgba(0,0,0,0.03)] hover:-translate-x-0.5 transition-all duration-200 font-sans">
                          <div className={`p-2.5 rounded-xl border shrink-0 h-10 w-10 flex items-center justify-center ${item.col}`}>
                            <IconComponent className="w-5 h-5" />
                          </div>
                          <div className="space-y-1">
                            <span className="text-xs font-bold text-zinc-900 group-hover/item:text-indigo-600 transition-colors duration-150 block">{item.title}</span>
                            <p className="text-xs font-light text-zinc-500 leading-relaxed">{item.text}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.section>

            {/* 08. The Resolution */}
            <motion.section 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6 pt-6"
            >
              <div className="flex items-center gap-2">
                <span className="h-[1px] w-6 bg-zinc-300"></span>
                <span className="text-zinc-400 text-[10px] font-bold uppercase tracking-[0.2em]">08 — RESOLUTION</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-900 leading-tight">
                The Student Who Finished
              </h3>
              
              <div className="space-y-6 text-base text-zinc-600 leading-relaxed font-light">
                <p>
                  Pathways Badge Quest was playtested with teammates, refined based on what confused players mid-game, and presented to CALS faculty stakeholders. It was approved, printed, and deployed for Iowa State's in-person orientation sessions in Summer 2025 — reaching 70–80 students.
                </p>

                {/* Highly Polished Statistics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 border border-zinc-150/80 rounded-[32px] overflow-hidden bg-[#fafafa] my-8 shadow-xs">
                  {[
                    { val: "60%", label: "Increase in enrollment and completion, 2025–26", clr: "text-[#5a8c69]" },
                    { val: "70–80", label: "Students reached at orientation", clr: "text-zinc-800" },
                    { val: "3 months", label: "Brief to deployed", clr: "text-amber-600" }
                  ].map((stat, i) => (
                    <div key={i} className="p-6 md:p-8 flex flex-col justify-center text-center md:text-left space-y-2 border-b md:border-b-0 md:border-r last:border-b-0 last:border-r-0 border-zinc-150 hover:bg-white transition-all duration-300">
                      <span className={`text-4xl md:text-5xl font-black tracking-tight ${stat.clr} font-sans`}>
                        {stat.val}
                      </span>
                      <span className="text-xs font-semibold text-zinc-600 leading-snug">
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>

                <p>
                  The CALS Pathways Department reported a 60% increase in student enrollment and program completion in the 2025–2026 academic year — the first full year following the introduction of Pathways Badge Quest at orientation. Correlation is not causation. The game was one of several program changes made that year. But the numbers point in the right direction: when students experience the credential journey as something worth finishing before they begin it, more of them finish it.
                </p>
                <p>
                  The game didn't just explain the Pathways program — it gave students a felt sense of what completing it would be like. The student who once said "I wasn't sure what I needed to do" now had a physical map, a visible destination, and a satisfying moment of completion baked into every round.
                </p>
              </div>

              <div className="bg-[#5a8c69] text-white p-8 md:p-12 rounded-[40px] relative overflow-hidden shadow-2xl mt-8">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-[120px] rounded-full"></div>
                <div className="relative z-10 space-y-4">
                  <div className="space-y-2">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-xl md:text-2xl font-medium leading-tight max-w-4xl">
                    The hero — the student — didn't need more information. They needed a <span className="font-bold">designed experience that made the journey feel worth finishing.</span> That's what the game gave them.
                  </p>
                </div>
              </div>

              {/* IMAGE 9 OF 9 Repeat Caption explicitly specified */}
              <div className="pt-4 text-center">
                <span className="text-xs text-zinc-400 italic">
                  IMAGE 9 OF 9 · (Reusing Deployed Game Photo) · "Pathways Badge Quest deployed at Iowa State University CALS orientation, Summer 2025."
                </span>
              </div>
            </motion.section>

            {/* 09. What I Learned */}
            <motion.section 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6 pt-6"
            >
              <div className="flex items-center gap-2">
                <span className="h-[1px] w-6 bg-zinc-300"></span>
                <span className="text-zinc-400 text-[10px] font-bold uppercase tracking-[0.2em]">09 — KEY TAKEAWAYS</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-zinc-900">
                What I Learned
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-8 rounded-[32px] border border-zinc-100 bg-[#fafafa] space-y-3">
                  <div className="flex items-center gap-2 text-[#5a8c69]">
                    <CheckCircle className="w-5 h-5 shrink-0" />
                    <span className="text-xs font-bold font-mono uppercase tracking-wider">Lesson 1</span>
                  </div>
                  <h4 className="text-base font-bold text-zinc-850">Simplicity is a performance requirement, not a preference</h4>
                  <p className="text-xs text-zinc-500 leading-relaxed font-light">
                    Designing for a game mid-play gives you none of that. When a student is in the middle of their turn, with dice on the table and other players watching, the design has about two seconds to communicate. That constraint changed how I think about hierarchy, icon sizing, and information density in ways that working on digital interfaces alone hadn't.
                  </p>
                  <p className="text-xs font-semibold text-[#5a8c69] pt-2">
                    "Simplicity isn't about removing things because they're ugly. It's about removing anything that forces someone to think when they should be acting."
                  </p>
                </div>

                <div className="p-8 rounded-[32px] border border-zinc-100 bg-[#fafafa] space-y-3">
                  <div className="flex items-center gap-2 text-[#5a8c69]">
                    <CheckCircle className="w-5 h-5 shrink-0" />
                    <span className="text-xs font-bold font-mono uppercase tracking-wider">Lesson 2</span>
                  </div>
                  <h4 className="text-base font-bold text-zinc-850">Physical constraints are better teachers than screen constraints</h4>
                  <p className="text-xs text-zinc-500 leading-relaxed font-light">
                    The dice shortage problem couldn't have been found in Figma. It only existed when the game was physical, the dice were real, and multiple people were playing simultaneously. A prototype that looks right is not the same as a prototype that works right. The only way to know the difference is to put it in front of people and watch what breaks.
                  </p>
                </div>

                <div className="p-8 rounded-[32px] border border-zinc-100 bg-[#fafafa] space-y-3">
                  <div className="flex items-center gap-2 text-[#5a8c69]">
                    <CheckCircle className="w-5 h-5 shrink-0" />
                    <span className="text-xs font-bold font-mono uppercase tracking-wider">Lesson 3</span>
                  </div>
                  <h4 className="text-base font-bold text-zinc-850">Designing for a group is a different problem than designing for a person</h4>
                  <p className="text-xs text-zinc-500 leading-relaxed font-light">
                    Most UX work imagines one user with one screen. This project had four players around a table, each making decisions that affected the others, all reading the same components simultaneously. The design had to work from multiple angles, in multiple hands, at multiple points in the same round. That taught me to think about context of use — not just usability — as a design requirement from the very start.
                  </p>
                </div>

                <div className="p-8 rounded-[32px] border border-zinc-100 bg-[#fafafa] space-y-3">
                  <div className="flex items-center gap-2 text-[#5a8c69]">
                    <CheckCircle className="w-5 h-5 shrink-0" />
                    <span className="text-xs font-bold font-mono uppercase tracking-wider">Lesson 4</span>
                  </div>
                  <h4 className="text-base font-bold text-zinc-850">What I would do differently</h4>
                  <p className="text-xs text-zinc-500 leading-relaxed font-light">
                    If I started this project again, I would push for playtesting earlier — before the visual system was finalized, not after. The token solution came late in the process. Had we caught the dice shortage two weeks earlier, I would have had more time to explore whether tokens were truly the best solution, or whether the mechanic itself needed rethinking. Testing revealed the right answer. Getting there sooner would have given us more options.
                  </p>
                </div>
              </div>
            </motion.section>

            {/* Back Button */}
            <section className="py-20 text-center">
              <div className="flex justify-center">
                <Button onClick={onBack} variant="outline" className="px-8 h-12 rounded-full text-sm">Explore other work</Button>
              </div>
            </section>
          </>
        )}

        {isMotionDesign && (
          <>
            {/* The Story Arc Summary */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-6 pt-4"
            >
              <div className="flex items-center gap-2">
                <span className="h-[1px] w-6 bg-zinc-300"></span>
                <span className="text-zinc-400 text-[10px] font-bold uppercase tracking-[0.2em]">Creative Philosophy</span>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 border border-zinc-100 rounded-[32px] overflow-hidden bg-[#fafafa]">
                {[
                  { label: 'DELIGHT', val: 'Micro-animations that feel human', icon: Sparkles, clr: 'text-indigo-600 bg-indigo-50/50' },
                  { label: 'EASE', val: 'Reduced cognitive load by 40%', icon: Zap, clr: 'text-amber-600 bg-amber-50/50' },
                  { label: 'GUIDANCE', val: 'Spatial storytelling and focus', icon: Target, clr: 'text-[#0a3161] bg-[#0a3161]/5' },
                  { label: 'INTEGRITY', val: 'Consistent fluid engineering', icon: Layers, clr: 'text-emerald-600 bg-emerald-50/50' }
                ].map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={i} className="p-6 md:p-8 flex flex-col items-center text-center space-y-3 border-r border-b md:border-b-0 last:border-r-0 border-zinc-100">
                      <div className={`p-3 rounded-2xl ${item.clr}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-zinc-400 tracking-wider uppercase">{item.label}</span>
                        <p className="text-xs md:text-sm font-medium text-zinc-800 leading-tight">{item.val}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.section>

            {/* Section 1: Introduction */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6 pt-6"
            >
              <div className="flex items-center gap-2">
                <span className="h-[1px] w-6 bg-zinc-300"></span>
                <span className="text-zinc-400 text-[10px] font-bold uppercase tracking-[0.2em]">01 — THE PRINCIPLE</span>
              </div>
              <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-900 leading-tight">
                Motion is not decoration. It is a language.
              </h3>
              <div className="space-y-4 text-base text-zinc-600 leading-relaxed font-light">
                <p>
                  In modern product design, transition is often added at the very end — as a superficial layer of paint. But motion has an immense, silent power over the user experience. It creates spatial continuity, establishes hierarchy, and guides the human eye through dense hierarchies without physical friction.
                </p>
                <p>
                  As an interaction designer, I approach motion as a fundamental building block of <span className="font-semibold text-zinc-900">information architecture</span>. When elements move with natural, organic physics rather than artificial linear times, they mimic the physical world, instantly easing digital friction.
                </p>
              </div>
            </motion.section>

            {/* Section 2: Interactive Motion Lab */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8 pt-8"
            >
              <div className="flex items-center gap-2">
                <span className="h-[1px] w-6 bg-zinc-300"></span>
                <span className="text-zinc-400 text-[10px] font-bold uppercase tracking-[0.2em]">02 — MOTION PLAYGROUND</span>
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl font-extrabold text-zinc-900">The Interactive Spring Lab</h3>
                <p className="text-sm text-zinc-500 font-light max-w-xl">
                  Adjust spring physics and choose different interaction models to feel how friction and stiffness change the character of user actions in real time.
                </p>
              </div>

              {/* Lab Interface Container */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 bg-zinc-50 border border-zinc-100 p-6 md:p-8 rounded-[40px] shadow-sm">
                
                {/* Controls - 5 Cols */}
                <div className="md:col-span-5 space-y-6">
                  {/* Preset Buttons */}
                  <div className="space-y-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 font-mono">Select Preset physics</span>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: 'snappy', label: 'Snappy Spring', stiff: 400, damp: 22 },
                        { id: 'silky', label: 'Silky Ease', stiff: 180, damp: 18 },
                        { id: 'bouncy', label: 'Playful Bounce', stiff: 600, damp: 15 },
                        { id: 'linear', label: 'Slow Motion', stiff: 80, damp: 12 }
                      ].map((preset) => (
                        <button
                          key={preset.id}
                          onClick={() => {
                            setMotionPreset(preset.id as any);
                            setMotionStiffness(preset.stiff);
                            setMotionDamping(preset.damp);
                            setMotionTrigger(prev => !prev);
                          }}
                          className={`px-3 py-2 text-xs font-medium rounded-xl border text-left transition-all ${
                            motionPreset === preset.id 
                              ? 'bg-zinc-900 border-zinc-900 text-white shadow-md shadow-zinc-900/10' 
                              : 'bg-white border-zinc-200 text-zinc-700 hover:border-zinc-400'
                          }`}
                        >
                          <div className="font-bold">{preset.label}</div>
                          <div className="text-[10px] opacity-70 font-mono mt-0.5">S:{preset.stiff} · D:{preset.damp}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Sliders */}
                  <div className="space-y-4 pt-2 border-t border-zinc-200/50">
                    <div>
                      <div className="flex justify-between items-center text-[10px] font-mono mb-1.5 uppercase tracking-wider text-zinc-400">
                        <span>Stiffness ({motionStiffness})</span>
                        <span>Tight Response</span>
                      </div>
                      <input 
                        type="range" 
                        min="50" 
                        max="800"
                        value={motionStiffness}
                        onChange={(e) => {
                          setMotionStiffness(parseInt(e.target.value));
                          setMotionPreset('custom');
                        }}
                        className="w-full h-1.5 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-zinc-900"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center text-[10px] font-mono mb-1.5 uppercase tracking-wider text-zinc-400">
                        <span>Damping ({motionDamping})</span>
                        <span>Oscillation Control</span>
                      </div>
                      <input 
                        type="range" 
                        min="5" 
                        max="50"
                        value={motionDamping}
                        onChange={(e) => {
                          setMotionDamping(parseInt(e.target.value));
                          setMotionPreset('custom');
                        }}
                        className="w-full h-1.5 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-zinc-900"
                      />
                    </div>
                  </div>

                  {/* Interactive Target selection */}
                  <div className="space-y-3 pt-2 border-t border-zinc-200/50">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 font-mono">Interaction object</span>
                    <div className="flex gap-2">
                      {[
                        { id: 'card', label: 'Feature Card' },
                        { id: 'button', label: 'Trigger Button' },
                        { id: 'toggle', label: 'Toggle Box' }
                      ].map((item) => (
                        <button
                          key={item.id}
                          onClick={() => setMotionInteractiveType(item.id as any)}
                          className={`flex-1 px-2.5 py-1.5 text-center text-xs font-bold rounded-lg border transition-all ${
                            motionInteractiveType === item.id 
                              ? 'bg-[#09090b] border-zinc-800 text-white' 
                              : 'bg-white border-zinc-200 text-zinc-600 hover:border-zinc-300'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Canvas/Display - 7 Cols */}
                <div className="md:col-span-7 bg-white border border-zinc-100 rounded-3xl p-6 min-h-[300px] flex flex-col justify-between items-center relative overflow-hidden shadow-inner">
                  {/* Grid Lines Pattern */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:24px_24px] opacity-40 pointer-events-none" />
                  
                  {/* Top Help */}
                  <div className="relative z-10 w-full flex justify-between items-center text-[10px] font-mono text-zinc-400 uppercase tracking-widest">
                    <span>Active Preset: <strong className="text-zinc-600">{motionPreset}</strong></span>
                    <span>Tap Target to Trigger</span>
                  </div>

                  {/* Main Target Object */}
                  <div className="relative z-10 flex-1 flex items-center justify-center my-6">
                    <AnimatePresence mode="wait">
                      {motionInteractiveType === 'card' && (
                        <motion.div
                          key="card"
                          animate={motionTrigger ? { scale: 1.05 } : { scale: 1 }}
                          whileHover={{ scale: 1.05, y: -8 }}
                          whileTap={{ scale: 0.95 }}
                          transition={{
                            type: "spring",
                            stiffness: motionStiffness,
                            damping: motionDamping
                          }}
                          onClick={() => setMotionTrigger(prev => !prev)}
                          className="w-56 h-40 bg-zinc-950 text-white rounded-3xl p-5 shadow-2xl flex flex-col justify-between cursor-pointer border border-zinc-800 select-none animate-none"
                        >
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] font-mono text-zinc-400 tracking-widest uppercase">LAB MOCK</span>
                            <Sparkles className="w-4 h-4 text-indigo-400" />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold tracking-tight">Responsive Slate</h4>
                            <p className="text-[10px] text-zinc-400 mt-1">Hover me, tap me, or feel the weight of current spring constant values.</p>
                          </div>
                        </motion.div>
                      )}

                      {motionInteractiveType === 'button' && (
                        <motion.button
                          key="button"
                          animate={motionTrigger ? { scale: 1.1 } : { scale: 1 }}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          transition={{
                            type: "spring",
                            stiffness: motionStiffness,
                            damping: motionDamping
                          }}
                          onClick={() => setMotionTrigger(prev => !prev)}
                          className="px-8 h-14 rounded-full bg-[#4F46E5] text-white font-bold text-sm shadow-lg shadow-indigo-500/20 hover:bg-indigo-700 transition-colors uppercase tracking-widest flex items-center gap-2 select-none"
                        >
                          <Zap className="w-4 h-4 fill-current" /> Tap To Bounce
                        </motion.button>
                      )}

                      {motionInteractiveType === 'toggle' && (
                        <div 
                          key="toggle"
                          className="flex items-center gap-4 bg-zinc-50 border border-zinc-200/80 px-6 py-4 rounded-3xl shadow-sm"
                        >
                          <span className="text-xs font-bold text-zinc-600 font-mono">Toggle System State</span>
                          <div
                            onClick={() => {
                              setToggleState(!toggleState);
                              setMotionTrigger(prev => !prev);
                            }}
                            className={`w-14 h-8 rounded-full p-1 cursor-pointer transition-colors duration-300 ${
                              toggleState ? 'bg-[#5a8c69]' : 'bg-zinc-300'
                            }`}
                          >
                            <motion.div
                              layout
                              transition={{
                                type: "spring",
                                stiffness: motionStiffness,
                                damping: motionDamping
                              }}
                              className="w-6 h-6 rounded-full bg-white shadow-md"
                            />
                          </div>
                        </div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Live Code Blocks */}
                  <div className="relative z-10 w-full mt-2">
                    <pre className="text-[10px] font-mono bg-zinc-950 text-indigo-300 p-3 rounded-2xl overflow-x-auto leading-relaxed border border-zinc-800">
                      <code>{`// Framer Motion Spring Configuration
<motion.div
  transition={{
    type: "spring",
    stiffness: ${motionStiffness},
    damping: ${motionDamping}
  }}
/>`}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Section 3: Takeaway & Principles */}
            <motion.section 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-6 pt-6"
            >
              <div className="space-y-2">
                <span className="text-[#0a3161] font-bold text-xs tracking-widest uppercase">03 — LAWS OF MOTION</span>
              </div>
              <div className="bg-[#4F46E5] text-white p-8 md:p-12 rounded-[40px] relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-[120px] rounded-full"></div>
                <div className="relative z-10 space-y-4">
                  <div className="space-y-2">
                    <svg className="w-8 h-8 text-white/80" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"/>
                    </svg>
                  </div>
                  <h4 className="text-xl md:text-2xl font-medium leading-tight max-w-4xl">
                    Great motion is invisible. The user shouldn't notice your transitions — they should simply feel that the UI is perfectly <span className="font-bold">cooperative and alive</span>.
                  </h4>
                </div>
              </div>
            </motion.section>

            {/* Section 4: Key Insights */}
            <section className="space-y-12 py-5 border-t border-zinc-100 mt-6">
              <div className="space-y-3 max-w-3xl">
                <span className="text-[#0a3161] font-bold text-xs tracking-widest uppercase">Case Insights</span>
                <h3 className="text-4xl font-bold tracking-tight">Handoff, Physics & Performance</h3>
                <p className="text-lg text-zinc-500 font-light">
                  Translating rich, organic animations from Figma into production-ready React layouts requires exact specifications.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-8 rounded-[32px] border border-zinc-100 bg-[#fafafa] space-y-3">
                  <div className="flex items-center gap-2 text-indigo-600">
                    <Zap className="w-5 h-5 shrink-0" />
                    <span className="text-xs font-bold font-mono uppercase tracking-wider">Lesson 1</span>
                  </div>
                  <h4 className="text-base font-bold text-zinc-850">Establish Spatial Continuity</h4>
                  <p className="text-xs text-zinc-500 leading-relaxed font-light">
                    When opening a list drawer or clicking a modal, elements shouldn't slide from arbitrary coordinates. Zooming and morphing layouts from their point of contact (e.g., origin point mapping) guides the user's mental focus much more naturally.
                  </p>
                </div>

                <div className="p-8 rounded-[32px] border border-zinc-100 bg-[#fafafa] space-y-3">
                  <div className="flex items-center gap-2 text-[#5a8c69]">
                    <Check className="w-5 h-5 shrink-0" />
                    <span className="text-xs font-bold font-mono uppercase tracking-wider">Lesson 2</span>
                  </div>
                  <h4 className="text-base font-bold text-zinc-850">Avoid Stiff Gradients</h4>
                  <p className="text-xs text-zinc-500 leading-relaxed font-light">
                    Standard linear timing sweeps (`cubic-bezier` with set durations) often feel mechanical. Utilizing dynamic spring physics models allows elements to naturally settle down, matching human expectations of weight and inertia.
                  </p>
                </div>
              </div>
            </section>

            {/* Reflection */}
            <section className="space-y-6 pt-4">
              <div className="space-y-2">
                <span className="text-[#0a3161] font-bold text-xs tracking-widest uppercase">Conclusion</span>
                <h2 className="text-3xl font-bold tracking-tight">Final Thoughts</h2>
              </div>
              <div className="p-8 border-l-4 border-indigo-600 bg-indigo-50/10 rounded-r-[28px] space-y-4">
                <p className="text-base text-zinc-600 leading-relaxed font-light">
                  Building micro-interactions taught me that delightful product design sits directly at the intersection of aesthetic timing and robust code. By declaring standardized animation tokens in design systems, teams can keep motion clean, unified, and remarkably responsive across platforms.
                </p>
              </div>
            </section>

            {/* Back Button */}
            <section className="py-20 text-center">
              <div className="flex justify-center">
                <Button onClick={onBack} variant="outline" className="px-8 h-12 rounded-full text-sm">Explore other work</Button>
              </div>
            </section>
          </>
        )}

        {isParProductionControl && (
          <>
            {/* Live Interactive Dashboard Showcase */}
            {project.liveUrl && (
              <div className="max-w-5xl mx-auto mt-0 px-4 mb-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="py-6 border-b border-zinc-150 space-y-6"
                >
                  <div className="space-y-6">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                      <div className="space-y-1">
                        <span className="text-[10px] font-mono text-zinc-400 font-bold uppercase tracking-widest block">INTERACTIVE PROTOTYPE</span>
                        <h3 className="text-3xl font-extrabold tracking-tight text-zinc-900 leading-tight">Interactive Prototype</h3>
                      </div>
                      <a 
                        href={project.liveUrl} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-2 font-sans text-sm font-semibold px-5 py-2.5 rounded-full transition-all hover:shadow-md active:scale-95 duration-200 shrink-0 ${
                          isParProductionControl 
                            ? 'bg-zinc-900 hover:bg-zinc-800 text-white' 
                            : 'bg-[#0a3161] hover:bg-[#07244a] text-white'
                        }`}
                      >
                        View Prototype
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                    </div>

                    <p className="text-sm text-zinc-500 font-light leading-relaxed max-w-3xl">
                      Interact with the fully functional React/HTML prototype directly. Try navigating through different order workflows, filtering items, and seeing the streamlined B2B status tracking design in action.
                    </p>

                    {/* Clean Embedded App Frame */}
                    <div className="w-full rounded-2xl border border-zinc-200 shadow-md overflow-x-auto bg-white">
                      <div className="min-w-[960px] h-[480px] md:h-[580px] lg:h-[640px] bg-zinc-50 relative overflow-hidden">
                        <iframe 
                          src={project.liveUrl} 
                          style={{
                            width: '150%',
                            height: '150%',
                            transform: 'scale(0.6667)',
                            transformOrigin: 'top left',
                          }}
                          className="border-none absolute top-0 left-0"
                          title="PAR Production Control Live Dashboard"
                          allow="clipboard-write"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}

            {/* 10-Page Editorial Layout without Table of Contents */}
            <div className="max-w-5xl mx-auto mt-0 px-4" id="par-case-study-container">
              {/* Right Column: 10 Editorial Pages */}
              <div className="space-y-0" id="par-pages-content">

                {/* Page 1: Cover */}
                <motion.div 
                  id="par-page-1"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="pt-0 pb-6 border-b border-zinc-150 space-y-8"
                >
                  <div className="space-y-8">
                    <div className="space-y-6">
                      <div className="space-y-1 mb-4">
                        <span className="text-[10px] font-mono text-rose-600 font-bold uppercase tracking-widest block">BACKGROUND & PROBLEM</span>
                        <h3 className="text-3xl font-extrabold tracking-tight text-zinc-900 leading-tight">The Problem Nobody Could Answer</h3>
                      </div>

                      <div className="space-y-6 text-zinc-650 leading-relaxed font-light">
                        <p>
                          When I started working on PAR Engineering’s internal operations system, the company wasn’t struggling because they didn’t know how to manufacture pumps.
                        </p>
                        
                        <div className="my-6 p-6 border-l-4 border-rose-500 bg-rose-50/40 rounded-r-2xl space-y-2">
                          <span className="text-[10px] font-mono text-rose-600 font-bold uppercase tracking-widest block">THE CENTRAL DILEMMA</span>
                          <p className="text-lg md:text-xl text-zinc-900 font-medium leading-relaxed">
                            “The real problem was much smaller — but much more expensive. Nobody could quickly answer a simple operational question: <span className="font-extrabold underline decoration-rose-400 decoration-2 underline-offset-4">Can this production order move forward today?</span>”
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                          <div className="p-6 border border-zinc-150 bg-zinc-50/30 rounded-2xl space-y-4">
                            <span className="text-[10px] font-mono text-zinc-400 font-bold uppercase tracking-wider block">THE STATUS QUO</span>
                            <h4 className="font-bold text-base text-zinc-900">Manual Verification Loops</h4>
                            <p className="text-xs text-zinc-500 leading-relaxed font-light">
                              The company managed production using spreadsheets, manual inventory checks, and constant verbal communication between production, purchasing, and store personnel.
                            </p>
                            <div className="space-y-2 pt-2 text-xs font-mono text-zinc-500">
                              <div className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-zinc-400"></span>
                                Verify component availability manually
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-zinc-400"></span>
                                Trace pending purchase requests in emails
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-zinc-400"></span>
                                Confirm incoming material receipt in warehouse
                              </div>
                            </div>
                          </div>

                          <div className="p-6 border border-rose-100 bg-rose-50/10 rounded-2xl space-y-4">
                            <span className="text-[10px] font-mono text-rose-500 font-bold uppercase tracking-wider block">THE CONSEQUENCE</span>
                            <h4 className="font-bold text-base text-zinc-900">Operational Bottlenecks</h4>
                            <p className="text-xs text-rose-750 leading-relaxed font-light">
                              Because verifying a single order took 10–15 minutes, decision-making ground to a halt. Small visibility gaps snowballed into massive coordination issues:
                            </p>
                            <div className="space-y-2 pt-2 text-xs font-mono text-rose-700">
                              <div className="flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0"></span>
                                <span>Orders remained blocked longer than necessary</span>
                              </div>
                              <div className="flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0"></span>
                                <span>Inventory shortages were discovered too late</span>
                              </div>
                              <div className="flex items-start gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0"></span>
                                <span>Purchasing activities became disconnected from needs</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <p>
                          Every time a new production order was created, employees had to manually verify whether components were available, whether purchase requests had already been created, and whether incoming materials had been received. This constant hunting for status led to teams spending precious time searching for information instead of making decisions.
                        </p>

                        <p className="text-zinc-800 text-base md:text-lg font-medium leading-relaxed my-4">
                          The problem wasn’t a lack of data. The problem was that the <span className="underline decoration-blue-500 decoration-2 underline-offset-4 font-semibold">data existed in too many places</span>.
                        </p>

                        <p>
                          What the company needed wasn’t a large manufacturing ERP system. They needed a way to answer three critical questions quickly:
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                          {[
                            { q: "What can we build today?", desc: "Instant visibility into production orders with fully matching on-hand stock.", num: "01" },
                            { q: "What is currently blocked?", desc: "Clear identification of material deficits with associated part numbers.", num: "02" },
                            { q: "What should happen next?", desc: "Direct action triggers linking raw material shortages directly to procurement.", num: "03" }
                          ].map((item, idx) => (
                            <div key={idx} className="p-5 bg-zinc-50/50 border border-zinc-150 hover:border-zinc-300 transition-colors rounded-2xl relative overflow-hidden group">
                              <span className="absolute right-3 top-2 text-3xl font-black text-zinc-150/70 font-mono select-none group-hover:text-blue-50/50 transition-colors">{item.num}</span>
                              <div className="space-y-2 relative z-10">
                                <span className="text-[9px] font-mono font-bold text-blue-500 tracking-wider uppercase">CORE OBJECTIVE</span>
                                <h4 className="font-extrabold text-sm text-zinc-900 leading-tight pr-6">{item.q}</h4>
                                <p className="text-[11px] text-zinc-500 leading-relaxed font-light">{item.desc}</p>
                              </div>
                            </div>
                          ))}
                        </div>

                        <p className="font-medium text-zinc-850 pt-2">
                          That question became the foundation of <span className="font-bold text-blue-600">PAR Production Control</span>.
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Page 2: Understanding the Workflow */}
                <motion.div 
                  id="par-page-2"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="py-6 border-b border-zinc-150 space-y-6"
                >
                  <div className="space-y-6">
                    <div className="space-y-1 mb-4">
                      <span className="text-[10px] font-mono text-blue-600 font-bold uppercase tracking-widest block">UNDERSTANDING THE PIPELINE</span>
                      <h3 className="text-3xl font-extrabold tracking-tight text-zinc-900 leading-tight">Understanding the Workflow</h3>
                    </div>
                    <p className="text-zinc-650 leading-relaxed font-light">
                      After understanding the company’s day-to-day operations, I realized that I wasn’t designing separate modules for production, inventory, and purchasing. I was designing a <span className="font-semibold text-zinc-800">single operational workflow</span>.
                    </p>

                    <div className="space-y-3 pt-2">
                      <p className="text-xs font-mono text-zinc-400 font-bold uppercase tracking-wider">The Actual Company Process</p>
                      
                      {/* Vertical / Horizontal Flow diagram */}
                      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2 text-center text-[11px] font-mono font-medium">
                        {[
                          { title: "Customer Order", bg: "bg-zinc-50 border-zinc-250 text-zinc-700" },
                          { title: "Production Order", bg: "bg-blue-50/50 border-blue-200 text-blue-700" },
                          { title: "Inventory Check", bg: "bg-zinc-50 border-zinc-250 text-zinc-700" },
                          { title: "Ready or Blocked", bg: "bg-amber-50/50 border-amber-200 text-amber-700" },
                          { title: "Purchase Request", bg: "bg-indigo-50/50 border-indigo-200 text-indigo-700" },
                          { title: "Materials Received", bg: "bg-emerald-50/50 border-emerald-200 text-emerald-700" },
                          { title: "Production Runs", bg: "bg-zinc-900 border-zinc-850 text-white" }
                        ].map((step, idx) => (
                          <div key={idx} className="relative flex flex-col justify-between items-center h-full">
                            <div className={`w-full p-3 border rounded-xl flex items-center justify-center min-h-[48px] text-center ${step.bg}`}>
                              {step.title}
                            </div>
                            {idx < 6 && (
                              <div className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 text-zinc-300 font-bold text-xs select-none">
                                →
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <p className="text-zinc-650 leading-relaxed font-light">
                      At first glance, this process looked straightforward. In reality, most operational delays happened between these steps.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-5 border border-zinc-150 rounded-2xl bg-zinc-50/50 space-y-2">
                        <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase">DELAY PATTERN 1</span>
                        <h4 className="text-sm font-bold text-zinc-850">Disconnected Creation</h4>
                        <p className="text-xs text-zinc-500 leading-relaxed font-light">
                          A production order could be created successfully, but nobody knew whether all required components were available.
                        </p>
                      </div>
                      <div className="p-5 border border-zinc-150 rounded-2xl bg-zinc-50/50 space-y-2">
                        <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase">DELAY PATTERN 2</span>
                        <h4 className="text-sm font-bold text-zinc-850">Late Shortage Discoveries</h4>
                        <p className="text-xs text-zinc-500 leading-relaxed font-light">
                          Inventory shortages were often discovered only after production planning had already begun on the shop floor.
                        </p>
                      </div>
                      <div className="p-5 border border-zinc-150 rounded-2xl bg-zinc-50/50 space-y-2">
                        <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase">DELAY PATTERN 3</span>
                        <h4 className="text-sm font-bold text-zinc-850">Isolated Purchase Requests</h4>
                        <p className="text-xs text-zinc-500 leading-relaxed font-light">
                          Purchase requests existed entirely separately from the production orders that depended on them, leading to double ordering.
                        </p>
                      </div>
                      <div className="p-5 border border-zinc-150 rounded-2xl bg-zinc-50/50 space-y-2">
                        <span className="text-[10px] font-mono font-bold text-zinc-400 uppercase">DELAY PATTERN 4</span>
                        <h4 className="text-sm font-bold text-zinc-850">Manual Tracking Cycles</h4>
                        <p className="text-xs text-zinc-500 leading-relaxed font-light">
                          Receiving updates were tracked manually, making it incredibly difficult to know exactly when production could restart.
                        </p>
                      </div>
                    </div>

                    <p className="font-semibold text-zinc-850 italic bg-zinc-50 border-l-2 border-blue-500 p-4 rounded-r-xl">
                      "The problem wasn’t creating production orders. The problem was understanding what prevented those orders from moving forward."
                    </p>

                    <p className="text-zinc-650 leading-relaxed font-light">
                      This insight became the foundation of PAR. Instead of designing isolated screens, I designed the product around a single operational loop:
                    </p>

                    {/* Operational Loop */}
                    <div className="flex flex-wrap justify-center items-center gap-2 py-2">
                      {["Create", "Verify", "Resolve", "Receive", "Produce"].map((stage, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <span className="px-4 py-2 border border-zinc-200 bg-zinc-50 rounded-xl font-mono text-xs font-bold text-zinc-850 shadow-sm">{stage}</span>
                          {idx < 4 && <span className="text-zinc-300 font-bold">→</span>}
                        </div>
                      ))}
                    </div>

                    <p className="text-zinc-650 leading-relaxed font-light">
                      This decision also helped define what the product would not become. Rather than building a large ERP system with supplier management, advanced scheduling, reporting, and administrative tools, I focused on the workflows that directly affected daily production decisions.
                    </p>

                    <div className="p-6 border border-zinc-200/60 bg-zinc-50/30 rounded-2xl space-y-3">
                      <span className="text-[10px] font-mono text-zinc-400 font-bold uppercase block">THE TARGET OUTCOME</span>
                      <p className="text-sm font-medium text-zinc-800">
                        The challenge was not to build more functionality. The challenge was to help employees understand:
                      </p>
                      <ul className="space-y-1.5 text-xs font-mono text-zinc-600">
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                          <span>What can move forward?</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
                          <span>What is blocked?</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-red-500 rounded-full"></span>
                          <span>Why is it blocked?</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                          <span>What action needs to happen next?</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </motion.div>

                {/* Page 3: My First Assumption Was Wrong */}
                <motion.div 
                  id="par-page-3"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="py-6 border-b border-zinc-150 space-y-6"
                >
                  <div className="space-y-6">
                    <div className="space-y-1 mb-4">
                      <span className="text-[10px] font-mono text-blue-600 font-bold uppercase tracking-widest block">THE WORK VS READINESS SHIFT</span>
                      <h3 className="text-3xl font-extrabold tracking-tight text-zinc-900 leading-tight">My First Assumption Was Wrong</h3>
                    </div>
                    
                    <p className="text-zinc-650 leading-relaxed font-light">
                      When I first started designing PAR, I believed the product should revolve around <span className="font-semibold text-zinc-800">production readiness</span>.
                    </p>
                    
                    <div className="p-5 border border-zinc-150 bg-zinc-50/50 rounded-2xl space-y-3">
                      <span className="text-[10px] font-mono text-zinc-400 font-bold uppercase block">THE REASONING</span>
                      <p className="text-xs text-zinc-600 font-light leading-relaxed">
                        The idea seemed logical: if the company's biggest problem was understanding whether production could move forward, the system should focus on determining readiness:
                      </p>
                      <div className="flex flex-wrap items-center gap-1.5 font-mono text-[10px] text-zinc-500">
                        <span>Create Order</span>
                        <span>→</span>
                        <span>Check Inventory</span>
                        <span>→</span>
                        <span>Determine Readiness</span>
                        <span>→</span>
                        <span>Identify Missing Components</span>
                        <span>→</span>
                        <span>Proceed</span>
                      </div>
                    </div>

                    <p className="text-zinc-650 leading-relaxed font-light">
                      The earliest versions reflected this thinking. Production orders moved through statuses like <code className="text-xs font-mono bg-zinc-100 px-1.5 py-0.5 rounded">Not Checked</code>, <code className="text-xs font-mono bg-zinc-100 px-1.5 py-0.5 rounded">Ready</code>, <code className="text-xs font-mono bg-zinc-100 px-1.5 py-0.5 rounded">Missing Components</code>, and <code className="text-xs font-mono bg-zinc-100 px-1.5 py-0.5 rounded">Complete</code>. From a system perspective, this model made sense.
                    </p>

                    <div className="p-5 bg-red-50/20 border-l-2 border-red-500 rounded-r-2xl space-y-2">
                      <h4 className="text-sm font-bold text-zinc-800">From a user perspective, it didn't.</h4>
                      <p className="text-xs text-zinc-650 leading-relaxed font-light">
                        As I kept mapping workflows and talking with employees, I realized something important: <strong className="font-semibold text-zinc-800">users don't think about “readiness.” They think about work.</strong>
                      </p>
                    </div>

                    <p className="text-zinc-650 leading-relaxed font-light">
                      Production managers weren't asking “what is the readiness status of this order?” They were asking practical operational questions:
                    </p>

                    <div className="space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs font-mono">
                        {[
                          "Can we start this order?",
                          "Is this order blocked?",
                          "Is production already running?",
                          "Is this order finished?",
                          "If it is blocked, what needs to happen next?"
                        ].map((q, idx) => (
                          <div key={idx} className="p-3 border border-zinc-150 rounded-xl bg-zinc-50/50 flex items-center gap-2">
                            <span className="text-blue-500 font-bold">?</span>
                            <span className="text-zinc-700 leading-snug">{q}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <p className="text-zinc-650 leading-relaxed font-light pt-2">
                      That insight changed how I thought about the whole product. I stopped designing a production readiness checker and started designing a <strong className="font-semibold text-zinc-800">production workflow system</strong> — rebuilding the status model around the way employees actually talk about their day:
                    </p>

                    {/* Status Transformation Display */}
                    <div className="grid grid-cols-2 gap-4 pt-1 max-w-xl">
                      <div className="p-4 border border-zinc-150 bg-zinc-50/50 rounded-2xl space-y-3">
                        <span className="text-[10px] font-mono text-zinc-400 font-bold uppercase block border-b border-zinc-200 pb-1.5">Earlier Approach</span>
                        <div className="space-y-2 font-mono text-[11px] text-zinc-600">
                          <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-zinc-300"></span>
                            Not Checked
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-zinc-300"></span>
                            Ready
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-zinc-300"></span>
                            Missing Components
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-zinc-300"></span>
                            Complete
                          </div>
                        </div>
                      </div>

                      <div className="p-4 border border-blue-100 bg-blue-50/10 rounded-2xl space-y-3">
                        <span className="text-[10px] font-mono text-blue-500 font-bold uppercase block border-b border-blue-100 pb-1.5">Final Approach</span>
                        <div className="space-y-2 font-mono text-[11px] font-semibold text-zinc-900">
                          <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                            Ready
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-rose-500"></span>
                            Blocked
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
                            In Production
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-zinc-900"></span>
                            Finished
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="text-zinc-650 leading-relaxed font-light">
                      This change affected far more than labels. The entire product's behavior shifted:
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { title: "Dashboard Pivot", desc: "Shifted from showing checks to showing operational status." },
                        { title: "Active Inventory", desc: "Became a decision-making tool rather than a reporting screen." },
                        { title: "Connected Purchasing", desc: "Became part of the production workflow instead of a separate process." },
                        { title: "Actionable Receiving", desc: "Became a mechanism for unblocking production — not just a record-keeping step." }
                      ].map((item, idx) => (
                        <div key={idx} className="p-4 border border-zinc-150 rounded-xl bg-zinc-50/30 space-y-1">
                          <h4 className="text-xs font-bold text-zinc-800 font-mono">{item.title}</h4>
                          <p className="text-[11px] text-zinc-500 leading-relaxed font-light">{item.desc}</p>
                        </div>
                      ))}
                    </div>

                    <p className="text-zinc-850 italic font-medium border-l-4 border-blue-500 pl-6 my-4 bg-zinc-50 py-4 pr-4 rounded-r-xl leading-relaxed">
                      “Users rarely think in system language. They think in terms of the work they need to do.”
                    </p>

                    {/* Production Orders List Diagram */}
                    <div className="my-6 rounded-2xl overflow-hidden border border-zinc-150 bg-zinc-50/50 p-4 shadow-sm">
                      <img 
                        src="https://i.imgur.com/MSI21zc.png" 
                        alt="Production Orders list — status shown as Blocked, In Production, or Ready, with a detail panel explaining exactly why an order is blocked" 
                        className="w-full h-auto rounded-xl border border-zinc-200 shadow-sm"
                        referrerPolicy="no-referrer"
                        onError={(e) => handleImageError(e, "Production Orders list")}
                      />
                      <p className="text-[11px] text-zinc-500 mt-3 text-center leading-relaxed">
                        Production Orders list — status shown as Blocked, In Production, or Ready, with a detail panel explaining exactly why an order is blocked.
                      </p>
                    </div>

                  </div>
                </motion.div>

                {/* Page 4: Early Approach vs Final Approach */}
                <motion.div 
                  id="par-page-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="py-6 border-b border-zinc-150 space-y-4"
                >
                  <div className="space-y-4">
                    <div className="space-y-1 mb-4">
                      <span className="text-[10px] font-mono text-blue-600 font-bold uppercase tracking-widest block">STRATEGIC FOCUS PIVOT</span>
                      <h3 className="text-3xl font-extrabold tracking-tight text-zinc-900 leading-tight">Early Approach vs Final Approach</h3>
                    </div>
                    <p className="text-zinc-650 leading-relaxed font-light">
                      I shifted the design focus from standard inventory record-keeping to proactive workflow coordination.
                    </p>
                    <div className="overflow-x-auto pt-2">
                      <table className="w-full text-left text-xs font-mono border-collapse border border-zinc-200">
                        <thead>
                          <tr className="bg-zinc-50 border-b border-zinc-200">
                            <th className="p-3 font-bold text-zinc-700 border-r border-zinc-200">FEATURE</th>
                            <th className="p-3 font-bold text-zinc-700 border-r border-zinc-200">EARLY APPROACH</th>
                            <th className="p-3 font-bold text-zinc-700">FINAL APPROACH</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-200 text-[11px] text-zinc-650">
                          <tr>
                            <td className="p-3 font-semibold text-zinc-900 border-r border-zinc-200 bg-zinc-50/50">Core Metric</td>
                            <td className="p-3 border-r border-zinc-200">Simple on-hand stock counts</td>
                            <td className="p-3 font-semibold text-blue-600 bg-blue-50/10">Live component availability relative to active orders</td>
                          </tr>
                          <tr>
                            <td className="p-3 font-semibold text-zinc-900 border-r border-zinc-200 bg-zinc-50/50">Production Order</td>
                            <td className="p-3 border-r border-zinc-200">Created in isolation as a text record</td>
                            <td className="p-3 font-semibold text-emerald-600 bg-emerald-50/10">Deeply connected to active material allocation lists</td>
                          </tr>
                          <tr>
                            <td className="p-3 font-semibold text-zinc-900 border-r border-zinc-200 bg-zinc-50/50">Shortage Tracking</td>
                            <td className="p-3 border-r border-zinc-200">Manual checks and physical walking</td>
                            <td className="p-3 font-semibold text-indigo-600 bg-indigo-50/10">Automated alerts triggered by real demand</td>
                          </tr>
                          <tr>
                            <td className="p-3 font-semibold text-zinc-900 border-r border-zinc-200 bg-zinc-50/50">Procurement</td>
                            <td className="p-3 border-r border-zinc-200">Form-heavy ERP purchase requests</td>
                            <td className="p-3 font-semibold text-purple-600 bg-purple-50/10">Contextual dispatch queues prefilled with shortages</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </motion.div>

                {/* Page 5: Designing by Subtraction */}
                <motion.div 
                  id="par-page-5"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="py-6 border-b border-zinc-150 space-y-6"
                >
                  <div className="space-y-6">
                    <div className="space-y-1 mb-4">
                      <span className="text-[10px] font-mono text-blue-600 font-bold uppercase tracking-widest block">SUBTRACTIVE METHODOLOGY</span>
                      <h3 className="text-3xl font-extrabold tracking-tight text-zinc-900 leading-tight">Designing by Subtraction</h3>
                    </div>
                    <div className="space-y-4 text-zinc-650 leading-relaxed font-light">
                      <p>
                        One of the biggest challenges in designing PAR was deciding what not to build. Once the core workflow became clear, it was tempting to keep expanding the product — and on paper, plenty of additions made sense, since most manufacturing systems include them:
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 my-4">
                        {[
                          "Supplier management and procurement management",
                          "Advanced production scheduling and forecasting tools",
                          "Role and permission management, notifications, reporting dashboards",
                          "Bill of materials administration",
                          "Finished goods tracking and warehouse management"
                        ].map((feat, idx) => (
                          <div key={idx} className="p-3 border border-zinc-200 bg-zinc-50/20 rounded-xl flex items-start gap-2.5">
                            <span className="text-red-500 font-mono text-sm font-bold select-none mt-0.5">✕</span>
                            <span className="text-xs font-sans text-zinc-700 leading-snug">{feat}</span>
                          </div>
                        ))}
                      </div>

                      <p className="pt-2">
                        But adding more features would have created a different product than the one this company needed. Every feature was evaluated against three core operational questions:
                      </p>

                      <div className="grid grid-cols-1 gap-3 my-4">
                        {[
                          "Does this help someone understand the current production situation?",
                          "Does this help someone make an operational decision?",
                          "Does this help move production forward?"
                        ].map((q, idx) => (
                          <div key={idx} className="p-4 border border-zinc-150 rounded-xl bg-zinc-50/50 flex items-start gap-3">
                            <span className="px-2 py-0.5 bg-blue-50 text-blue-600 border border-blue-100 rounded text-[10px] font-mono font-bold">
                              0{idx + 1}
                            </span>
                            <p className="text-xs text-zinc-750 font-medium leading-relaxed font-sans">{q}</p>
                          </div>
                        ))}
                      </div>

                      <p className="pt-2">
                        If the answer was no, the feature was removed or postponed.
                      </p>

                      <p className="pt-2">
                        That principle shaped two specific decisions. Inventory was scoped to production components only — early versions mixed in finished goods, but testing showed users viewed the screen through one narrow lens: <span className="font-medium text-zinc-800">“do we have the parts needed to build this pump?”</span> Finished products answered a different business question and only added noise. And I deliberately avoided supplier databases, purchase-order management, scheduling engines, and admin configuration screens — common in enterprise manufacturing systems, but unnecessary for the decisions employees actually needed to make every day.
                      </p>

                      <p className="pt-2 text-sm text-zinc-650 leading-relaxed font-light italic bg-zinc-50 p-4 border-l-2 border-blue-500 rounded-r-xl">
                        "Product design is often an exercise in subtraction rather than addition."
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Page 6: Testing the Product with Real Users */}
                <motion.div 
                  id="par-page-6"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="py-6 border-b border-zinc-150 space-y-6"
                >
                  <div className="space-y-6">
                    <div className="space-y-1 mb-4">
                      <span className="text-[10px] font-mono text-blue-600 font-bold uppercase tracking-widest block">USER VALIDATION COHORT</span>
                      <h3 className="text-3xl font-extrabold tracking-tight text-zinc-900 leading-tight">Testing the Product with Real Users</h3>
                    </div>
                    <div className="space-y-4 text-zinc-650 leading-relaxed font-light">
                      <p>
                        Once the core workflows were designed, I tested the product with employees who would realistically use this kind of system: a production manager, an inventory/store employee, and a purchasing/operations employee. The goal wasn't to validate visual design decisions — it was to see whether users could quickly answer the operational questions that matter most: which orders are active, which are blocked, which inventory items need attention, which purchase requests are pending or partially received, and what to do next.
                      </p>
                      <p>
                        Because participants evaluated the product through the lens of their actual jobs rather than a design perspective, testing exposed several assumptions I'd made without realizing it.
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Page 7: The Dashboard Was Solving the Wrong Problem */}
                <motion.div 
                  id="par-page-7"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="py-6 border-b border-zinc-150 space-y-6"
                >
                  <div className="space-y-6">
                    <div className="space-y-1 mb-4">
                      <h3 className="text-[18px] font-extrabold tracking-tight text-zinc-900 leading-tight">The Dashboard Was Solving the Wrong Problem</h3>
                    </div>
                    <div className="space-y-4 text-zinc-650 leading-relaxed font-light">
                      <p>
                        One of the earliest dashboard versions focused heavily on blocked production orders. My assumption was straightforward: blocked orders are urgent, so they should dominate the dashboard. A production manager challenged that immediately.
                      </p>
                      <p className="text-lg italic text-zinc-850 border-l-4 border-blue-600 pl-6 my-4 bg-zinc-50/50 py-4 pr-4 rounded-r-xl font-normal">
                        “Most of our production isn't blocked.”
                      </p>
                      <p>
                        That single comment changed how I thought about operational dashboards. A dashboard shouldn't primarily communicate problems — it should communicate the current state of operations. I redesigned it to show production status distribution, active orders, inventory requiring attention, and incoming receipts together. Blocked orders stayed important, but became part of the overall picture rather than the entire story.
                      </p>
                    </div>

                    {/* Operational Dashboard Revision Image */}
                    <div className="pt-4 space-y-4" id="dashboard-annotated-visual">
                      <span className="text-[10px] font-mono text-blue-600 font-bold uppercase block">VISUALIZATION — REDESIGNED OPERATIONAL DASHBOARD</span>
                      <AnnotatedScreenshot
                        src="https://i.imgur.com/kJ97VNS.png"
                        alt="Redesigned Operational Dashboard Mockup with interactive annotation hotspots"
                        title="Redesigned Operational Dashboard"
                        subtitle="Dashboard Cognitive Alignment"
                        caption="Interactive Screenshot Guide: Click the numbered hotspots on the screenshot, or use the panel on the right to navigate key layout decisions."
                        annotations={[
                          {
                            id: 'dash-sidebar',
                            x: 8,
                            y: 40,
                            title: 'Humble Task Sidebar',
                            description: 'A focused, highly simplified sidebar navigation designed for quick touch interactions on active shop floors. We removed administrative clutter to prevent user distraction.',
                            badge: 'Navigation'
                          },
                          {
                            id: 'dash-kpis',
                            x: 28,
                            y: 18,
                            title: 'Live Operational KPIs',
                            description: 'Real-time counters representing active production states (In Production, Ready) and operational alerts, immediately answering the most critical shop floor questions.',
                            badge: 'KPI Status Bar'
                          },
                          {
                            id: 'dash-blocked',
                            x: 62,
                            y: 18,
                            title: 'Blocked Assembly Flag',
                            description: 'Highlighted urgent items needing instant care. Clicking this hotspot directly opens the component shortages causing the block, helping the operator act instantly.',
                            badge: 'Alert System'
                          },
                          {
                            id: 'dash-queue',
                            x: 45,
                            y: 55,
                            title: 'Active Assembly Queue',
                            description: 'Real-time list of current production orders, sorted by active assembly status. Operators can tap any row to load the material build sheet immediately.',
                            badge: 'Active Work'
                          },
                          {
                            id: 'dash-summary',
                            x: 88,
                            y: 55,
                            title: 'Contextual Action Panel',
                            description: 'An action-oriented detail drawer showing direct specifications and quick action links for the selected order. Keeps operators fully in-flow without jumping context.',
                            badge: 'Decision Support'
                          }
                        ]}
                      />
                    </div>

                    {/* Section: Inventory Was Trying to Answer Two Different Questions */}
                    <div className="space-y-4 border-t border-zinc-100 pt-6">
                      <h4 className="text-lg font-bold text-zinc-900 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                        Inventory Was Trying to Answer Two Different Questions
                      </h4>
                      <p className="text-sm text-zinc-650 leading-relaxed font-light">
                        Early versions of the Inventory module contained both production components and finished products. From a system perspective, this organization seemed reasonable.
                      </p>
                      <p className="text-sm text-zinc-650 leading-relaxed font-light">
                        However, inventory users viewed the screen very differently. For them, the primary question was:
                      </p>
                      <p className="text-sm font-medium text-zinc-850 italic pl-4 border-l-2 border-zinc-200 py-1">
                        “Do we have the parts needed to build this production order?”
                      </p>
                      <p className="text-sm text-zinc-650 leading-relaxed font-light">
                        Finished goods did not help answer that question. Based on this feedback, I removed finished products from the Inventory workflow entirely and redesigned the screen to focus exclusively on production components. This significantly improved clarity and reduced cognitive load.
                      </p>

                      {/* Redesign Diagram */}
                      <div className="my-6 rounded-2xl overflow-hidden border border-zinc-150 bg-zinc-50/50 p-4 shadow-sm">
                        <img 
                          src="https://i.imgur.com/qCSorxc.png" 
                          alt="Inventory Redesigned to Focus Exclusively on Production Components" 
                          className="w-full h-auto rounded-xl border border-zinc-200 shadow-sm"
                          referrerPolicy="no-referrer"
                          onError={(e) => handleImageError(e, "Inventory Redesign")}
                        />
                        <p className="text-[11px] font-mono text-zinc-400 mt-2 text-center">
                          Visual Comparison: Removing finished goods to focus purely on active assembly parts
                        </p>
                      </div>
                    </div>

                    {/* Section: Real Workflows Are Not Linear */}
                    <div className="space-y-4 border-t border-zinc-100 pt-6">
                      <h4 className="text-lg font-bold text-zinc-900 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                        Real Workflows Are Not Linear
                      </h4>
                      <p className="text-sm text-zinc-650 leading-relaxed font-light">
                        One of the most valuable insights came from purchasing and operations users. Initially, purchase requests behaved like simple records. Once a request was created, the workflow effectively ended. Users quickly identified that this behavior did not match reality.
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                        <div className="p-4 bg-red-50/10 border border-red-100 rounded-2xl space-y-2">
                          <span className="text-[10px] font-mono font-bold text-red-500 uppercase tracking-wider block">In Practice (Operational Reality)</span>
                          <ul className="text-xs text-zinc-655 space-y-2 font-light list-none">
                            <li className="flex items-start gap-2">
                              <span className="text-red-400 font-mono select-none">✕</span>
                              <span>Suppliers often deliver only part of an order.</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-red-400 font-mono select-none">✕</span>
                              <span>Completed requests sometimes require correction.</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-red-400 font-mono select-none">✕</span>
                              <span>Users need the ability to reopen requests.</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-red-400 font-mono select-none">✕</span>
                              <span>Requests that have already been acted on should disappear from work queues.</span>
                            </li>
                          </ul>
                        </div>

                        <div className="p-4 bg-emerald-50/10 border border-emerald-100 rounded-2xl space-y-2">
                          <span className="text-[10px] font-mono font-bold text-emerald-600 uppercase tracking-wider block">Workflow Solutions Implemented</span>
                          <ul className="text-xs text-zinc-655 space-y-2 font-light list-none">
                            <li className="flex items-start gap-2">
                              <span className="text-emerald-500 select-none">✓</span>
                              <span>Support for partial receiving.</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-emerald-500 select-none">✓</span>
                              <span>Reopen request functionality.</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-emerald-500 select-none">✓</span>
                              <span>Removal of completed recommendations from active queues.</span>
                            </li>
                            <li className="flex items-start gap-2">
                              <span className="text-emerald-500 select-none">✓</span>
                              <span>More realistic request lifecycle states.</span>
                            </li>
                          </ul>
                        </div>
                      </div>

                      <p className="text-sm text-zinc-650 leading-relaxed font-light italic bg-zinc-50 p-4 border-l-2 border-blue-500 rounded-r-xl">
                        "At this point, the system stopped behaving like a prototype and started behaving like an operational tool."
                      </p>
                    </div>

                    {/* Section: Removing Information Mattered More Than Adding It */}
                    <div className="space-y-4 border-t border-zinc-100 pt-6">
                      <h4 className="text-lg font-bold text-zinc-900 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                        Removing Information Mattered More Than Adding It
                      </h4>
                      <p className="text-sm text-zinc-650 leading-relaxed font-light">
                        Testing also revealed that some screens contained too much repeated information. For example, side panels often repeated data that users could already see in selected rows. Although this redundancy seemed helpful during design, users perceived it as noise.
                      </p>
                      <p className="text-sm text-zinc-650 leading-relaxed font-light">
                        As a result, I redesigned side panels to focus exclusively on critical workflow items rather than repeating existing table data:
                      </p>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 my-3">
                        {[
                          { title: "Operational Context", desc: "Current status & history" },
                          { title: "Related Records", desc: "Linked orders & parts" },
                          { title: "Shortage Impact", desc: "Assembly queue delays" },
                          { title: "Recommended Actions", desc: "Direct procurement pathways" }
                        ].map((item, idx) => (
                          <div key={idx} className="p-3 border border-zinc-150 rounded-xl bg-zinc-50/50 space-y-1">
                            <span className="text-blue-600 font-mono text-[10px] font-bold block">0{idx + 1}</span>
                            <h5 className="font-sans font-bold text-[11px] text-zinc-800 leading-tight">{item.title}</h5>
                            <p className="text-[10px] text-zinc-450 leading-snug font-light">{item.desc}</p>
                          </div>
                        ))}
                      </div>

                      <p className="text-sm text-zinc-650 leading-relaxed font-light">
                        This made the interfaces easier to scan and reduced unnecessary cognitive effort.
                      </p>
                    </div>

                    {/* Section: Small Details Affect Trust */}
                    <div className="space-y-4 border-t border-zinc-100 pt-6">
                      <h4 className="text-lg font-bold text-zinc-900 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                        Small Details Affect Trust
                      </h4>
                      <p className="text-sm text-zinc-650 leading-relaxed font-light">
                        Testing revealed another important lesson. Several users commented that stronger click animations made the interface feel unstable, almost as if the page was refreshing after every interaction.
                      </p>
                      <p className="text-sm text-zinc-650 leading-relaxed font-light">
                        Although this was a relatively small visual detail, it affected users’ confidence in the system. I reduced interaction animations throughout the product and retained motion only where it helped communicate state changes or interaction feedback. The result was an interface that felt calmer, more predictable, and more trustworthy.
                      </p>
                    </div>
                  </div>
                </motion.div>

                {/* Page 8: Making the Product Behave Like Work */}
                <motion.div 
                  id="par-page-8"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="py-6 border-b border-zinc-150 space-y-6"
                >
                  <div className="space-y-6">
                    <div className="space-y-1 mb-4">
                      <span className="text-[10px] font-mono text-blue-600 font-bold uppercase tracking-widest block">BEHAVIORAL OPERATIONAL FIT</span>
                      <h3 className="text-3xl font-extrabold tracking-tight text-zinc-900 leading-tight">Making the Product Behave Like Work</h3>
                    </div>

                    {/* Section: Designing Workflows Over Screens */}
                    <div className="space-y-4">
                      <p className="text-sm text-zinc-650 leading-relaxed font-light">
                        Early versions of PAR successfully displayed information, but they didn't always behave the way real operational work behaves. During testing and iteration, I shifted focus from designing screens to designing workflows, states, and consequences — and that shift changed how the product actually worked.
                      </p>
                    </div>

                    {/* Section: Purchase requests as a work queue */}
                    <div className="space-y-4 border-t border-zinc-100 pt-6">
                      <h4 className="text-lg font-bold text-zinc-900 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                        Purchase Requests as a Work Queue
                      </h4>
                      <p className="text-sm text-zinc-650 leading-relaxed font-light">
                        In early versions, purchase recommendations stayed visible even after a request had been created for them. It looked harmless in the UI; it felt wrong to purchasing users, who expected the list to behave like a work queue: if they'd already acted on something, it shouldn't still look like unfinished work. So purchase recommendations now disappear once a request is created, and users only ever see the work that still needs attention.
                      </p>
                      
                      {/* Work Queue State Visualization */}
                      <div className="pt-4 space-y-2">
                        <span className="text-[10px] font-mono text-zinc-450 font-bold uppercase block">VISUALIZATION — THE WORK QUEUE TRANSITION DESIGN</span>
                        <div className="overflow-hidden border border-zinc-200/80 rounded-2xl bg-zinc-50 shadow-sm">
                          <img 
                            src="https://i.imgur.com/yKtOh5N.png" 
                            alt="Purchase Requests Work Queue State Transition" 
                            className="w-full h-auto object-cover"
                            referrerPolicy="no-referrer"
                            onError={(e) => handleImageError(e, "Work Queue State Transition")}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Section: Supporting Partial Receiving */}
                    <div className="space-y-4 border-t border-zinc-100 pt-6">
                      <h4 className="text-lg font-bold text-zinc-900 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                        Supporting Partial Receiving
                      </h4>
                      <p className="text-sm text-zinc-650 leading-relaxed font-light">
                        Initially, purchase requests could only be marked as either pending or received. However, users quickly pointed out that supplier deliveries rarely happen exactly as planned.
                      </p>
                      <div className="bg-zinc-50 border border-zinc-150 rounded-xl p-4 space-y-2 max-w-md">
                        <span className="text-[10px] font-mono text-zinc-400 font-bold uppercase block tracking-wider">Example Scenario:</span>
                        <ul className="text-xs text-zinc-600 space-y-1 font-mono list-disc pl-4">
                          <li>100 components may be ordered</li>
                          <li>only 40 components arrive</li>
                          <li>the remaining quantity arrives later</li>
                        </ul>
                      </div>
                      <p className="text-sm text-zinc-650 leading-relaxed font-light">
                        The system needed to support this reality. I introduced partial receiving states that allow users to:
                      </p>
                      <ul className="text-sm text-zinc-650 space-y-2 font-light list-none pl-1">
                        <li className="flex items-start gap-2">
                          <span className="text-blue-500 font-bold mt-0.5">•</span>
                          <span><strong>Record received quantities</strong> directly upon delivery.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-500 font-bold mt-0.5">•</span>
                          <span><strong>Track remaining quantities</strong> outstanding from the vendor.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-500 font-bold mt-0.5">•</span>
                          <span><strong>Continue monitoring incomplete deliveries</strong> without losing visibility.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-500 font-bold mt-0.5">•</span>
                          <span><strong>Understand which production orders remain blocked</strong> until full delivery.</span>
                        </li>
                      </ul>
                      <p className="text-sm text-zinc-650 leading-relaxed font-light pt-2">
                        This change transformed receiving from a simple status update into an operational workflow.
                      </p>
                    </div>

                    {/* Section: Allowing Users to Correct Mistakes */}
                    <div className="space-y-4 border-t border-zinc-100 pt-6">
                      <h4 className="text-lg font-bold text-zinc-900 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                        Allowing Users to Correct Mistakes
                      </h4>
                      <p className="text-sm text-zinc-650 leading-relaxed font-light">
                        Another insight from testing was that operational systems cannot assume perfect execution. Mistakes happen. Requests may be closed accidentally, deliveries may be recorded incorrectly, and users may need to revise previous actions.
                      </p>
                      <p className="text-sm text-zinc-650 leading-relaxed font-light">
                        To support these scenarios and provide solid correction paths, I introduced:
                      </p>
                      <ul className="text-sm text-zinc-650 space-y-2 font-light list-none pl-1">
                        <li className="flex items-start gap-2">
                          <span className="text-blue-500 font-bold mt-0.5">•</span>
                          <span><strong>Reopen request functionality</strong> to easily undo premature closures.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-500 font-bold mt-0.5">•</span>
                          <span><strong>Request cancellation</strong> to purge mistaken orders cleanly.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-500 font-bold mt-0.5">•</span>
                          <span><strong>Editable request states</strong> to adapt to fast-moving real-world conditions.</span>
                        </li>
                      </ul>
                      <p className="text-sm text-zinc-650 leading-relaxed font-light pt-2">
                        This provided users with correction paths and made the system feel significantly more trustworthy.
                      </p>

                      {/* Correction Paths State Visualization */}
                      <div className="pt-4 space-y-2">
                        <span className="text-[10px] font-mono text-zinc-450 font-bold uppercase block">VISUALIZATION — ERROR RECOVERY & CORRECTION STATES</span>
                        <div className="overflow-hidden border border-zinc-200/80 rounded-2xl bg-zinc-50 shadow-sm">
                          <img 
                            src="https://i.imgur.com/060G4ps.png" 
                            alt="Error Recovery and Correction States" 
                            className="w-full h-auto object-cover"
                            referrerPolicy="no-referrer"
                            onError={(e) => handleImageError(e, "Error Recovery and Correction States")}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Section: Designing Forms Around User Intent */}
                    <div className="space-y-4 border-t border-zinc-100 pt-6">
                      <h4 className="text-lg font-bold text-zinc-900 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                        Designing Forms Around User Intent
                      </h4>
                      <p className="text-sm text-zinc-650 leading-relaxed font-light">
                        Early prototypes prefilled both manually created and system-generated forms. Testing showed users found manually created forms less credible when prefilled — they expected to type that information themselves. So manually created production orders and purchase requests now start empty, while requests generated from a system recommendation stay prefilled, since the system already has that context. A small distinction, but it meaningfully improved how authentic the workflow felt.
                      </p>

                      {/* Prefill vs Empty States Visualization */}
                      <div className="pt-4 space-y-2">
                        <span className="text-[10px] font-mono text-zinc-450 font-bold uppercase block">VISUALIZATION — FORM PREFILL & USER INTENT MODES</span>
                        <div className="overflow-hidden border border-zinc-200/80 rounded-2xl bg-zinc-50 shadow-sm">
                          <img 
                            src="https://i.imgur.com/14p7lou.png" 
                            alt="Designing Forms Around User Intent States" 
                            className="w-full h-auto object-cover"
                            referrerPolicy="no-referrer"
                            onError={(e) => handleImageError(e, "Form Prefill and User Intent Modes")}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Page 9: Impact */}
                <motion.div 
                  id="par-page-9"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="py-6 border-b border-zinc-150 space-y-8"
                >
                  <div className="space-y-8">
                    <div className="space-y-1 mb-4">
                      <span className="text-[10px] font-mono text-blue-600 font-bold uppercase tracking-widest block">DELIVERED IMPACT METRICS</span>
                      <h3 className="text-3xl font-extrabold tracking-tight text-zinc-900 leading-tight">Delivered Business Impact</h3>
                    </div>
                    <p className="text-zinc-650 leading-relaxed font-light">
                      PAR Production Control evolved into a live internal product used by the company. Because the production data is confidential, this portfolio piece uses an anonymized interactive prototype that faithfully recreates the workflows, interface patterns, and decisions from the live system.
                    </p>

                    {/* Before & After Comparison Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="p-6 border border-red-100 bg-red-50/10 rounded-2xl space-y-3">
                        <span className="text-xs font-bold text-red-600 uppercase tracking-wider font-mono bg-red-50 px-2.5 py-1 rounded-full w-fit block">BEFORE</span>
                        <ul className="space-y-2 text-sm text-zinc-650 font-light list-none">
                          <li className="flex items-start gap-2">
                            <span className="text-red-500 font-bold">●</span>
                            <span>Production status required checking multiple spreadsheets and speaking with inventory and purchasing staff.</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-red-500 font-bold">●</span>
                            <span>Purchase requests were tracked separately from production needs.</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-red-500 font-bold">●</span>
                            <span>Receiving updates were recorded manually.</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-red-500 font-bold">●</span>
                            <span>Employees spent time locating information before taking action.</span>
                          </li>
                        </ul>
                      </div>

                      <div className="p-6 border border-emerald-100 bg-emerald-50/10 rounded-2xl space-y-3">
                        <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider font-mono bg-emerald-50 px-2.5 py-1 rounded-full w-fit block">AFTER</span>
                        <ul className="space-y-2 text-sm text-zinc-650 font-light list-none">
                          <li className="flex items-start gap-2">
                            <span className="text-emerald-500 font-bold">●</span>
                            <span>Production, inventory, purchasing, and receiving status became visible in a single workflow.</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-emerald-500 font-bold">●</span>
                            <span>Users could identify blocked production orders more quickly.</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-emerald-500 font-bold">●</span>
                            <span>Purchase requests became directly traceable to production shortages.</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-emerald-500 font-bold">●</span>
                            <span>Receiving status became easier to monitor and update.</span>
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="text-emerald-500 font-bold">●</span>
                            <span>Operational discussions shifted from finding information to deciding next actions.</span>
                          </li>
                        </ul>
                      </div>
                    </div>

                    {/* Operational Shift Table */}
                    <div className="space-y-4 border-t border-zinc-100 pt-6">
                      <p className="text-sm text-zinc-600 font-medium">
                        Based on observation and feedback from the people using it day to day, that shift showed up consistently across every part of the workflow:
                      </p>
                      
                      <div className="overflow-hidden border border-zinc-200/80 rounded-2xl shadow-sm bg-white">
                        <div className="overflow-x-auto">
                          <table className="w-full text-left border-collapse text-sm">
                            <thead>
                              <tr className="bg-zinc-50/80 border-b border-zinc-200">
                                <th className="p-4 font-mono text-[10px] uppercase font-bold text-zinc-450 tracking-wider">Activity</th>
                                <th className="p-4 font-mono text-[10px] uppercase font-bold text-zinc-450 tracking-wider">Before</th>
                                <th className="p-4 font-mono text-[10px] uppercase font-bold text-zinc-450 tracking-wider">After</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-100">
                              <tr className="hover:bg-zinc-50/40 transition-colors">
                                <td className="p-4 font-medium text-zinc-800">Checking production readiness</td>
                                <td className="p-4 text-zinc-500 line-through">~10–15 minutes</td>
                                <td className="p-4 text-emerald-600 font-medium bg-emerald-50/10">~1–2 minutes</td>
                              </tr>
                              <tr className="hover:bg-zinc-50/40 transition-colors">
                                <td className="p-4 font-medium text-zinc-800">Identifying inventory shortages</td>
                                <td className="p-4 text-zinc-500">Multiple spreadsheets and calls</td>
                                <td className="p-4 text-emerald-600 font-medium bg-emerald-50/10">Single screen</td>
                              </tr>
                              <tr className="hover:bg-zinc-50/40 transition-colors">
                                <td className="p-4 font-medium text-zinc-800">Creating purchase requests</td>
                                <td className="p-4 text-zinc-500">Manual lookup and entry</td>
                                <td className="p-4 text-emerald-600 font-medium bg-emerald-50/10">Context-driven workflow</td>
                              </tr>
                              <tr className="hover:bg-zinc-50/40 transition-colors">
                                <td className="p-4 font-medium text-zinc-800">Tracking incoming materials</td>
                                <td className="p-4 text-zinc-500">Manual follow-up</td>
                                <td className="p-4 text-emerald-600 font-medium bg-emerald-50/10">Centralized request tracking</td>
                              </tr>
                              <tr className="hover:bg-zinc-50/40 transition-colors">
                                <td className="p-4 font-medium text-zinc-800">Determining next action</td>
                                <td className="p-4 text-zinc-500">Required multiple stakeholders</td>
                                <td className="p-4 text-emerald-600 font-medium bg-emerald-50/10">Visible directly in the workflow</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      
                      <p className="text-[11px] text-zinc-400 italic leading-relaxed font-light font-mono">
                        These figures are based on observation and user feedback, intended to illustrate the shape of the improvement rather than serve as formal operational measurements.
                      </p>
                    </div>

                    {/* Qualitative Impact Concluding Section */}
                    <div className="space-y-4 border-t border-zinc-100 pt-6">
                      <p className="text-zinc-650 leading-relaxed font-light">
                        More qualitatively, users consistently responded well to three things: the connection between production, inventory, and purchasing workflows; the visibility of operational status and next actions; and the realistic behavior of purchasing and receiving.
                      </p>
                      <div className="p-6 bg-zinc-900 text-zinc-100 rounded-2xl space-y-2 my-4">
                        <span className="text-[9px] text-zinc-500 font-mono font-bold uppercase tracking-widest block">CORE TAKEAWAY</span>
                        <p className="text-lg md:text-xl font-medium font-sans leading-relaxed text-white italic">
                          "Most importantly, operational conversations shifted from “where can I find this information?” to “what action should happen next?” — which became the real measure of success for the project."
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Page 10: Reflection */}
                <motion.div 
                  id="par-page-10"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="py-6 space-y-6"
                >
                  <div className="space-y-6">
                    <div className="space-y-1 mb-4">
                      <span className="text-[10px] font-mono text-blue-600 font-bold uppercase tracking-widest block">SUBTRACTIVE PARADIGM REFLECTION</span>
                      <h3 className="text-3xl font-extrabold tracking-tight text-zinc-900 leading-tight">Reflection & Takeaways</h3>
                    </div>
                    
                    <p className="text-zinc-650 leading-relaxed font-light text-base">
                      PAR fundamentally changed how I think about product design. At the start, I approached the problem as a system-design challenge — workflows, statuses, operational logic. Over time I realized users rarely think in terms of systems. They think in terms of work.
                    </p>

                    <div className="space-y-3 pt-2">
                      <p className="text-sm font-medium text-zinc-800">
                        Throughout the project, my initial assumptions were wrong more often than they were right:
                      </p>
                      <ul className="space-y-2 text-sm text-zinc-650 font-light list-none pl-1">
                        <li className="flex items-start gap-2">
                          <span className="text-blue-500 font-bold mt-0.5">•</span>
                          <span>Users did not think in terms of “production readiness.”</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-500 font-bold mt-0.5">•</span>
                          <span>Dashboards should communicate operations, not only problems.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-500 font-bold mt-0.5">•</span>
                          <span>Inventory should answer production questions, not reporting questions.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-500 font-bold mt-0.5">•</span>
                          <span>Workflows must support mistakes, exceptions, and partial completion.</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-blue-500 font-bold mt-0.5">•</span>
                          <span>Interfaces become believable when actions have consequences.</span>
                        </li>
                      </ul>
                    </div>

                    <p className="text-zinc-650 leading-relaxed font-light pt-2">
                      This project also reinforced the value of designing through subtraction. The challenge was never to build the largest manufacturing system possible — it was to understand which workflows mattered most and design them exceptionally well.
                    </p>

                    <div className="p-6 bg-zinc-900 text-zinc-100 rounded-2xl space-y-2 my-4">
                      <span className="text-[9px] text-zinc-500 font-mono font-bold uppercase tracking-widest block">KEY OUTCOME</span>
                      <p className="text-lg md:text-xl font-medium font-sans leading-relaxed text-white italic">
                        "Internal tools become valuable not because they contain more features, but because they help people answer the right questions faster."
                      </p>
                    </div>

                    <div className="space-y-4 text-zinc-650 leading-relaxed font-light">
                      <p>
                        Looking back, the most valuable outcome of PAR wasn't the interface itself. It was learning how to translate a complex operational process into a product that feels understandable, believable, and useful to the people who rely on it every day — all in service of one question that guided every decision in the project:
                      </p>
                      
                      <div className="pl-4 border-l-2 border-blue-500/80 my-4 py-1">
                        <p className="text-base md:text-lg font-medium text-zinc-800 leading-relaxed font-sans italic">
                          Can production move forward, and if not, what should happen next?
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>



              </div>
            </div>

            {/* Back Button */}
            <section className="py-20 text-center border-t border-zinc-100 mt-16">
              <div className="flex justify-center flex-col items-center gap-4">
                <Button onClick={onBack} variant="outline" className="px-8 h-12 rounded-full text-sm">Explore other work</Button>
              </div>
            </section>
          </>
        )}

        {!isMyCampus && !isWalkForPlastic && !isPathwaysBadgeQuest && !isMotionDesign && !isParProductionControl && (
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
