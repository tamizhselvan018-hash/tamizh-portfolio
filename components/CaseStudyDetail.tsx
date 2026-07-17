
import React from 'react';
import { Home, Calendar, GraduationCap, Presentation, Briefcase, ArrowRight, Lightbulb, Target, TrendingUp, Globe, BarChart3, Zap, User, AlertTriangle, Gamepad2, Trophy, HelpCircle, Layers, Check, Sparkles, Smartphone, FileText, CheckCircle, RefreshCw, Users, Award, BookOpen, Clock, Lock, Monitor, Image, ArrowUpRight, Plus, Coins, Building } from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence, useInView } from 'motion/react';
import { CaseStudy } from '../types';
import { Button } from './Button';
import { InteractiveBrowserMockup } from './MockScreens';
import { AnnotatedScreenshot } from './AnnotatedScreenshot';
import { FolderTag } from './FolderTag';

interface CaseStudyDetailProps {
  project: CaseStudy;
  onBack: () => void;
}

interface ActiveElbowDotProps {
  coord: { x: number; y: number };
  nextCoord: { x: number; y: number };
  yGap: number;
  scrollYProgress: any;
  index: number;
}

const ActiveElbowDot: React.FC<ActiveElbowDotProps> = ({ coord, nextCoord, yGap, scrollYProgress, index }) => {
  const fill1 = useTransform(
    scrollYProgress, 
    [index / 5, (index + 0.5) / 5], 
    ["#e4e4e7", "#ef4444"]
  );
  const scale1 = useTransform(
    scrollYProgress, 
    [index / 5, (index + 0.5) / 5], 
    [0.8, 1.2]
  );

  const fill2 = useTransform(
    scrollYProgress, 
    [index / 5, (index + 1) / 5], 
    ["#e4e4e7", "#ef4444"]
  );
  const scale2 = useTransform(
    scrollYProgress, 
    [index / 5, (index + 1) / 5], 
    [0.8, 1.2]
  );

  return (
    <React.Fragment>
      <motion.circle 
        cx={coord.x} 
        cy={yGap} 
        r="3" 
        style={{
          fill: fill1,
          scale: scale1
        }}
      />
      <motion.circle 
        cx={nextCoord.x} 
        cy={yGap} 
        r="3" 
        style={{
          fill: fill2,
          scale: scale2
        }}
      />
    </React.Fragment>
  );
};

const AnimatedCounter: React.FC<{ value: number; duration?: number }> = ({ value, duration = 1.2 }) => {
  const [count, setCount] = React.useState(0);
  const nodeRef = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    let active = true;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          let startTime: number | null = null;
          const start = 0;
          const end = value;

          const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
            // Easing function - easeOutQuad
            const easeProgress = progress * (2 - progress);
            
            if (active) {
              setCount(Math.floor(easeProgress * (end - start) + start));
            }

            if (progress < 1) {
              window.requestAnimationFrame(step);
            } else if (active) {
              setCount(end);
            }
          };

          window.requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (nodeRef.current) {
      observer.observe(nodeRef.current);
    }

    return () => {
      active = false;
      observer.disconnect();
    };
  }, [value, duration]);

  return <span ref={nodeRef}>{count}</span>;
};

export const CaseStudyDetail: React.FC<CaseStudyDetailProps> = ({ project, onBack }) => {

  const isMyCampus = project.id === 'my-campus';
  const isWalkForPlastic = project.id === 'walk-for-plastic';
  const isPathwaysBadgeQuest = project.id === 'pathways-badge-quest';
  const isMotionDesign = project.id === 'motion-design';
  const isParProductionControl = project.id === 'par-production-control';

  const isMeridianHealth = project.id === 'meridian-health';
  const isStylebook = project.id === 'stylebook';
  const isHomestead = project.id === 'homestead';
  const isNorthLight = project.id === 'north-light';

  // Meridian Health Interactive States
  const [mhMobility, setMhMobility] = React.useState<Record<string, string>>({
    'Left Shoulder': 'Normal',
    'Right Shoulder': 'Slightly Restricted',
    'Left Knee': 'Normal',
    'Right Knee': 'Restricted'
  });
  const [mhMilestones, setMhMilestones] = React.useState<Record<string, boolean>>({
    'Pincer Grasp': true,
    'Bilateral Reach': false,
    'Transfer Object': false
  });

  // Stylebook Interactive States
  const [stylebookAppts, setStylebookAppts] = React.useState([
    { id: 1, time: '10:00 AM', client: 'Alice Smith', service: 'Haircut & Blowout', stylist: 'Alex', color: 'bg-indigo-500/10 text-indigo-700 border-indigo-200' },
    { id: 2, time: '11:15 AM', client: 'John Miller', service: 'Beard Trim', stylist: 'Jordan', color: 'bg-emerald-500/10 text-emerald-700 border-emerald-200' },
    { id: 3, time: '12:30 PM', client: 'Sarah Connor', service: 'Balayage Color', stylist: 'Alex', color: 'bg-amber-500/10 text-amber-700 border-amber-200' }
  ]);
  const [stylebookStylist, setStylebookStylist] = React.useState('Alex');
  const [stylebookClient, setStylebookClient] = React.useState('');
  const [stylebookService, setStylebookService] = React.useState('Haircut & Blowout');
  const [stylebookTime, setStylebookTime] = React.useState('02:00 PM');
  const [stylebookConflict, setStylebookConflict] = React.useState(false);

  // Homestead Interactive States
  const [homesteadHomePrice, setHomesteadHomePrice] = React.useState(450000);
  const [homesteadDownPaymentPct, setHomesteadDownPaymentPct] = React.useState(20);

  // North Light Interactive States
  const [northLightMode, setNorthLightMode] = React.useState<'control' | 'field'>('control');
  const [northLightMutedAlerts, setNorthLightMutedAlerts] = React.useState<string[]>([]);


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

  // PAR Production Control Interactive States
  const [parActiveStep, setParActiveStep] = React.useState<number>(1);
  const [parCutHover, setParCutHover] = React.useState<string | null>(null);

  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const howItWorksRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress: howItWorksScrollYProgress } = useScroll({
    target: isParProductionControl ? howItWorksRef : undefined,
    container: scrollContainerRef,
    offset: ["start 40%", "end 60%"]
  });
  const howItWorksPathLength = useTransform(howItWorksScrollYProgress, [0, 1], [0, 1]);

  interface Point {
    x: number;
    y: number;
  }
  interface RowBounds {
    top: number;
    bottom: number;
  }
  const [badgeCoords, setBadgeCoords] = React.useState<Point[]>([]);
  const [rowBounds, setRowBounds] = React.useState<RowBounds[]>([]);
  const badgeRefs = React.useRef<(HTMLElement | null)[]>([]);
  const rowRefs = React.useRef<(HTMLElement | null)[]>([]);
 
  const measureBadges = React.useCallback(() => {
    if (!howItWorksRef.current) return;
    const parentRect = howItWorksRef.current.getBoundingClientRect();
    const coords: Point[] = [];
    const bounds: RowBounds[] = [];
    
    for (let i = 0; i < 5; i++) {
      const el = badgeRefs.current[i];
      if (el) {
        const rect = el.getBoundingClientRect();
        // Calculate center of the badge relative to the parent container
        const x = rect.left - parentRect.left + rect.width / 2;
        const y = rect.top - parentRect.top + rect.height / 2;
        coords.push({ x, y });
      }

      const rowEl = rowRefs.current[i];
      if (rowEl) {
        const rect = rowEl.getBoundingClientRect();
        const top = rect.top - parentRect.top;
        const bottom = rect.bottom - parentRect.top;
        bounds.push({ top, bottom });
      }
    }
    
    // Only update if coords have actually changed to avoid redundant renders
    setBadgeCoords(prev => {
      if (prev.length !== coords.length) return coords;
      const changed = prev.some((p, i) => Math.abs(p.x - coords[i].x) > 1 || Math.abs(p.y - coords[i].y) > 1);
      return changed ? coords : prev;
    });

    // Only update if row bounds have actually changed to avoid redundant renders
    setRowBounds(prev => {
      if (prev.length !== bounds.length) return bounds;
      const changed = prev.some((b, i) => Math.abs(b.top - bounds[i].top) > 1 || Math.abs(b.bottom - bounds[i].bottom) > 1);
      return changed ? bounds : prev;
    });
  }, []);

  React.useEffect(() => {
    measureBadges();
    
    // Set up a couple of timeouts for layout shifts
    const t1 = setTimeout(measureBadges, 100);
    const t2 = setTimeout(measureBadges, 500);
    const t3 = setTimeout(measureBadges, 1500);

    window.addEventListener('resize', measureBadges);

    let resizeObserver: ResizeObserver | null = null;
    if (howItWorksRef.current && typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        measureBadges();
      });
      resizeObserver.observe(howItWorksRef.current);
    }

    return () => {
      window.removeEventListener('resize', measureBadges);
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, [measureBadges]);

  const getOrthogonalPath = React.useCallback((coords: Point[], bounds: RowBounds[]) => {
    if (coords.length < 2) return "";
    let d = "";
    for (let i = 0; i < coords.length - 1; i++) {
      const p1 = coords[i];
      const p2 = coords[i + 1];
      let y_gap = (p1.y + p2.y) / 2;
      if (bounds[i] && bounds[i + 1]) {
        y_gap = (bounds[i].bottom + bounds[i + 1].top) / 2;
      }
      
      if (i === 0) {
        d += `M ${p1.x} ${p1.y}`;
      }
      
      // Go vertically down from p1.x to the gap height (y_gap)
      d += ` L ${p1.x} ${y_gap}`;
      // Go horizontally across the gap from p1.x to p2.x
      d += ` L ${p2.x} ${y_gap}`;
      // Go vertically down from the gap height (y_gap) to p2.y
      d += ` L ${p2.x} ${p2.y}`;
    }
    return d;
  }, []);

  const pathD = React.useMemo(() => {
    return getOrthogonalPath(badgeCoords, rowBounds);
  }, [badgeCoords, rowBounds, getOrthogonalPath]);

  const parWorkflowSteps = [
    {
      num: "01",
      name: "Create",
      title: "Initiate Production",
      desc: "An order is initiated for assembly on the shop floor with a specified Bill of Materials (BOM).",
      icon: Plus,
      color: "border-red-100 bg-red-50/50 text-red-600",
      img: "https://i.imgur.com/14p7lou.png"
    },
    {
      num: "02",
      name: "Verify",
      title: "Verify Inventory",
      desc: "The system automatically matches order requirements against physical stock levels instantly.",
      icon: CheckCircle,
      color: "border-amber-100 bg-amber-50/50 text-amber-600",
      img: "https://i.imgur.com/MSI21zc.png"
    },
    {
      num: "03",
      name: "Resolve",
      title: "Resolve Shortages",
      desc: "Missing components trigger auto-generated purchase cards with context-driven 1-click requisition.",
      icon: Zap,
      color: "border-indigo-100 bg-indigo-50/50 text-indigo-600",
      img: "https://i.imgur.com/qCSorxc.png"
    },
    {
      num: "04",
      name: "Receive",
      title: "Receive Materials",
      desc: "Suppliers' partial deliveries are logged dynamically, and outstanding amounts are kept on active watch.",
      icon: RefreshCw,
      color: "border-purple-100 bg-purple-50/50 text-purple-600",
      img: "https://i.imgur.com/yKtOh5N.png"
    },
    {
      num: "05",
      name: "Produce",
      title: "Produce Pump",
      desc: "The instant final parts arrive, the order is unblocked in the queue and heads to the assembly line.",
      icon: Sparkles,
      color: "border-emerald-100 bg-emerald-50/50 text-emerald-600",
      img: "https://i.imgur.com/060G4ps.png"
    }
  ];

  const cutFeatures = [
    {
      name: "Supplier management",
      why: "The pump manufacturing company already had a fully functioning supplier database in their ERP. Building a duplicate interface inside the production app would create data conflicts and increase maintenance overhead without adding design value."
    },
    {
      name: "Advanced scheduling",
      why: "Observation showed that managers preferred a simple whiteboard scheduling session over a complex automated drag-and-drop calendar. Forcing software-guided scheduling created system resistance; a flexible queue model was far more effective."
    },
    {
      name: "Reporting dashboards",
      why: "Recruiters and managers alike often think tools need endless charts. But users in the plant didn't want charts — they wanted to know what to build next. An actionable list unblocked them, while passive telemetry only cluttered their screens."
    },
    {
      name: "BOM admin",
      why: "Pump configurations are engineering-controlled. Changing Bill of Materials specs on the shop floor is extremely dangerous. Keeping this read-only in the app eliminated the risk of critical manufacturing errors."
    },
    {
      name: "Warehouse management",
      why: "A comprehensive warehouse locator requires barcode scanning and physical layout mappings. We focused strictly on active production parts to deliver immediate value within a 2-month timeline, leaving generic storage for later."
    }
  ];

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

  const isLight = project.color === 'bg-white' || project.textColor === 'text-zinc-950';

  return (
    <motion.div 
      ref={scrollContainerRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-50 bg-[#FAF9F6] overflow-y-auto w-full h-full selection:bg-[#0a3161]/10 selection:text-[#0a3161]"
    >
      {/* Dual Engineering Blueprint Grid Background */}
      <div className="fixed inset-0 opacity-[0.035] pointer-events-none z-0" style={{
        backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)`,
        backgroundSize: '40px 40px'
      }} />
      <div className="fixed inset-0 opacity-[0.012] pointer-events-none z-0" style={{
        backgroundImage: `linear-gradient(to right, #000 1px, transparent 1px), linear-gradient(to bottom, #000 1px, transparent 1px)`,
        backgroundSize: '8px 8px'
      }} />

      <div className="relative z-10">
        {/* Navigation */}
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="sticky top-0 z-50 w-full bg-[#FAF9F6]/80 backdrop-blur-xl px-6 py-4 border-b border-zinc-150/40"
      >
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <button 
            onClick={onBack}
            className="group flex items-center gap-2 font-semibold text-sm hover:text-zinc-500 transition-colors"
          >
            <div className="p-1 rounded-full border border-zinc-200 group-hover:-translate-x-1 transition-transform bg-white">
              <svg className="w-3.5 h-3.5 text-zinc-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </div>
            <span className="text-zinc-800">Back to portfolio</span>
          </button>
          <div className="text-base font-black tracking-tighter text-zinc-900">Tamizh</div>
        </div>
      </motion.nav>

      {/* Case Study Header Banner */}
      <motion.div
        layoutId={`card-container-${project.id}`}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`relative ${project.color} ${isLight ? 'text-zinc-800 border border-zinc-100' : 'text-white'} mx-4 md:mx-8 mt-6 mb-12 p-8 md:p-16 rounded-[40px] overflow-hidden shadow-xl`}
      >
        {/* Abstract background shapes */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/5 blur-[80px] rounded-full pointer-events-none"></div>

        <div className="relative z-10 flex flex-col justify-between h-full max-w-5xl mx-auto">
          <div className="space-y-4">
            <motion.p 
              layoutId={`card-category-${project.id}`}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className={`text-xs font-semibold uppercase tracking-widest ${isLight ? 'text-zinc-500' : 'text-white/60'} block text-left`}
            >
              {project.category}
            </motion.p>
            
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div className="flex-1 min-w-[280px]">
                <motion.h1 
                  layoutId={`card-title-${project.id}`}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight block text-left font-sans"
                >
                  {isParProductionControl ? "PAR — Production Control" : project.title}
                </motion.h1>
              </div>
              
              {project.liveUrl && !isParProductionControl && (
                <div className="flex-shrink-0">
                  <a 
                    href={project.liveUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 font-sans text-sm font-semibold px-6 py-3 rounded-full transition-all hover:shadow-lg active:scale-95 duration-200 ${
                      isLight 
                        ? 'bg-zinc-900 hover:bg-zinc-800 text-white' 
                        : 'bg-white text-zinc-900 hover:bg-zinc-100'
                    }`}
                  >
                    View Live App
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </div>
              )}
            </div>

            <motion.p 
              layoutId={`card-desc-${project.id}`}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className={`text-lg md:text-xl font-light leading-relaxed max-w-3xl block text-left ${isLight ? 'text-zinc-600' : 'text-white/90'}`}
            >
              {isParProductionControl 
                ? "A connected production, inventory, and purchasing workflow for a pump manufacturing company." 
                : project.description}
            </motion.p>
          </div>

          {/* Quick Info Matrix */}
          {(() => {
            return (
              <div className={`pt-8 mt-10 border-t ${isLight ? 'border-zinc-200/50' : 'border-white/10'} flex flex-col md:flex-row md:items-end md:justify-between gap-6 text-[11px] font-mono uppercase tracking-wider`}>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 flex-1 w-full">
                  <div>
                    <span className={`block font-bold mb-1 ${isLight ? 'text-zinc-400' : 'text-white/40'}`}>Role:</span>
                    <span className={isLight ? 'text-zinc-800' : 'text-white'}>{project.role}</span>
                  </div>
                  <div>
                    <span className={`block font-bold mb-1 ${isLight ? 'text-zinc-400' : 'text-white/40'}`}>Platform:</span>
                    <span className={isLight ? 'text-zinc-800' : 'text-white'}>{project.platform}</span>
                  </div>
                  <div>
                    <span className={`block font-bold mb-1 ${isLight ? 'text-zinc-400' : 'text-white/40'}`}>Duration:</span>
                    <span className={isLight ? 'text-zinc-800' : 'text-white'}>{project.duration}</span>
                  </div>
                  <div>
                    <span className={`block font-bold mb-1 ${isLight ? 'text-zinc-400' : 'text-white/40'}`}>Tools:</span>
                    <span className={isLight ? 'text-zinc-800' : 'text-white'}>{project.tools}</span>
                  </div>
                </div>
                
                {/* Folder tags for the case study inline/parallel to the quick info line */}
                <div className="flex items-center gap-3.5 self-start md:self-auto pt-2 md:pt-0">
                  {project.tags.slice(0, 2).map((tag) => {
                    const colors = (() => {
                      if (isLight) {
                        return { fillColor: '#09090b', textColorClass: 'text-white', isDark: true };
                      }
                      if (isWalkForPlastic) {
                        return { fillColor: '#ffffff', textColorClass: 'text-[#0D9488]', isDark: false };
                      }
                      if (isMyCampus) {
                        return { fillColor: '#ffffff', textColorClass: 'text-[#4338CA]', isDark: false };
                      }
                      if (isParProductionControl) {
                        return { fillColor: '#ffffff', textColorClass: 'text-[#065f46]', isDark: false };
                      }
                      return { fillColor: '#ffffff', textColorClass: 'text-zinc-950', isDark: false };
                    })();

                    return (
                      <FolderTag 
                        key={tag}
                        text={tag}
                        fillColor={colors.fillColor}
                        textColorClass={colors.textColorClass}
                        isDark={colors.isDark}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })()}
        </div>
      </motion.div>

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

            {/* Back Button */}
            <section className="py-4 text-center border-t border-zinc-100 mt-4">
              <div className="flex justify-center flex-col items-center gap-4">
                <Button onClick={onBack} className="px-8 h-12 rounded-full text-sm bg-zinc-950 text-white hover:bg-zinc-800 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md font-semibold border border-zinc-950">Explore other work</Button>
              </div>
            </section>
          </>
        )}

        {isMyCampus && (
          <>
            {/* Section 1: The Challenge */}
            <section className="space-y-6 bg-white p-8 md:p-12 rounded-[40px] border border-zinc-200 shadow-md">
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
            <section className="space-y-6 bg-white p-8 md:p-12 rounded-[40px] border border-zinc-200 shadow-md">
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
                    className="p-5 bg-zinc-50/80 border border-zinc-200 rounded-2xl shadow-sm hover:bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
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
              className="space-y-6 bg-white p-8 md:p-12 rounded-[40px] border border-zinc-200 shadow-md"
            >
               <div className="space-y-2">
                 <span className="text-[#0a3161] font-bold text-xs tracking-widest uppercase">03. The Core Problem</span>
               </div>
               <div className="bg-[#b31942] text-white p-8 md:p-12 rounded-[28px] relative overflow-hidden shadow-xl">
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
            <section className="space-y-8 bg-white p-8 md:p-12 rounded-[40px] border border-zinc-200 shadow-md">
               <div className="space-y-2">
                  <span className="text-[#0a3161] font-bold text-xs tracking-widest uppercase">04. Information Architecture</span>
                  <h2 className="text-3xl font-bold tracking-tight">Information Architecture</h2>
                  <p className="text-base text-zinc-500 font-light max-w-xl">My Campus is structured around five core sections, each accessible directly from the bottom navigation.</p>
               </div>

               {/* Entry Flow */}
               <div className="space-y-4">
                  <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400">Entry Flow</h4>
                  <div className="flex items-center gap-2.5">
                     <div className="px-4 py-2 bg-white border border-zinc-300 rounded-xl font-medium text-xs shadow-md">Onboarding</div>
                     <ArrowRight className="w-3.5 h-3.5 text-zinc-400" />
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
                  <div className="overflow-hidden border border-zinc-200 rounded-[20px] shadow-lg bg-white">
                     <table className="w-full text-left">
                        <thead className="bg-[#0a3161]/5 border-b border-[#0a3161]/10">
                        <tr>
                           <th className="px-5 py-4.5 font-bold text-[10px] uppercase tracking-widest text-[#0a3161]">SECTION</th>
                           <th className="px-5 py-4.5 font-bold text-[10px] uppercase tracking-widest text-[#0a3161]">BROWSE</th>
                           <th className="px-5 py-4.5 font-bold text-[10px] uppercase tracking-widest text-[#0a3161]">DETAIL</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-100">
                        {[
                           { s: "Dashboard", b: "Curated feed", d: "Search & discovery", badge: "bg-zinc-100 text-zinc-800 border border-zinc-300" },
                           { s: "Events", b: "Event list", d: "Event detail", badge: "bg-lime-50 text-lime-800 border border-lime-200" },
                           { s: "Academic", b: "Academic event list", d: "Academic event detail", badge: "bg-sky-50 text-sky-800 border border-sky-200" },
                           { s: "Professors", b: "Professor directory", d: "Professor profile", badge: "bg-yellow-50 text-yellow-800 border border-yellow-200" },
                           { s: "Career", b: "Career services & events", d: "Service or event detail", badge: "bg-orange-50 text-orange-800 border border-orange-200" }
                        ].map((row, i) => (
                           <tr key={i} className="group hover:bg-[#0a3161]/5 transition-colors">
                              <td className="px-5 py-4 font-bold text-zinc-900 text-xs">
                                 <span className={`inline-flex items-center px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider ${row.badge}`}>
                                    {row.s}
                                 </span>
                              </td>
                              <td className="px-5 py-4 text-zinc-700 text-xs font-medium">{row.b}</td>
                              <td className="px-5 py-4 text-zinc-600 italic text-xs font-light">{row.d}</td>
                           </tr>
                        ))}
                        </tbody>
                      </table>
                  </div>
               </div>

               {/* Note */}
               <div className="bg-green-50 border border-green-200 p-5 rounded-xl shadow-sm">
                  <p className="text-green-900 text-xs font-medium leading-relaxed">
                     Every section follows a consistent <span className="font-bold">browse → detail → action</span> structure, allowing interaction patterns learned in one section to transfer across the platform.
                  </p>
               </div>
            </section>

            {/* Section 5: User Testing */}
            <section className="space-y-12 bg-white p-8 md:p-12 rounded-[40px] border border-zinc-200 shadow-md">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-[1px] bg-[#0a3161]"></span>
                  <span className="text-[#0a3161] font-bold text-xs tracking-widest uppercase">05. User Testing</span>
                </div>
                <h2 className="text-3xl font-bold tracking-tight">What Testing Changed</h2>
                <p className="text-base text-zinc-500 font-light max-w-2xl">
                   I conducted moderated usability walkthroughs with six participants from earlier interviews, asking them to explore professors, browse events, and attempt booking actions while thinking aloud. The goal was to observe friction — not just task completion.
                </p>
                <div className="bg-green-50 border border-green-200 p-4 rounded-xl max-w-2xl shadow-sm">
                   <p className="text-green-900 text-xs font-medium">Testing revealed structural gaps that were not obvious during initial design.</p>
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
                    <div className="bg-zinc-50 border border-zinc-200 border-l-4 border-l-[#0a3161] p-5 rounded-r-xl italic text-zinc-700 text-sm shadow-sm">
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
                      <div className="bg-zinc-50 rounded-[28px] p-6 border border-zinc-200 flex justify-center shadow-sm transition-all duration-500 hover:scale-[1.02] hover:shadow-lg">
                        <img 
                          src="https://i.imgur.com/F8QgZSd.png" 
                          alt="Before: No Bottom Nav" 
                          className="w-[150px] h-auto rounded-xl shadow-xl border border-zinc-200"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="text-center">
                        <span className="text-[9px] font-bold text-green-500 uppercase tracking-widest">AFTER</span>
                        <p className="text-[10px] text-zinc-500 mt-1">Persistent Bottom Nav</p>
                      </div>
                      <div className="bg-zinc-50 rounded-[28px] p-6 border border-zinc-200 flex justify-center shadow-sm transition-all duration-500 hover:scale-[1.02] hover:shadow-lg">
                        <img 
                          src="https://i.imgur.com/4lQw02B.png" 
                          alt="After: Persistent Bottom Nav" 
                          className="w-[150px] h-auto rounded-xl shadow-xl border border-zinc-200"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-5 border-t border-zinc-150">
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
                      <div className="bg-zinc-50 border border-zinc-200/80 border-l-4 border-l-[#0a3161] p-5 rounded-r-xl italic text-zinc-700 text-sm shadow-sm">"I'm interested, but I'm not ready to register yet."</div>
                      <div className="bg-zinc-50 border border-zinc-200/80 border-l-4 border-l-[#0a3161] p-5 rounded-r-xl italic text-zinc-700 text-sm shadow-sm">"I'll screenshot this so I don't forget."</div>
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
                      <div className="bg-zinc-50 rounded-[40px] p-8 border border-zinc-200 shadow-sm flex justify-center transition-all duration-500 hover:scale-[1.05] hover:shadow-lg">
                        <img 
                          src="https://i.imgur.com/wFRw6pN.png" 
                          alt="Event Tile: Save Button Added" 
                          className="w-[130px] h-auto"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="bg-green-50 border border-green-200 p-2.5 rounded-lg text-center max-w-[200px] mx-auto shadow-sm">
                        <p className="text-[10px] font-bold text-green-800">Tap bookmark → item saved</p>
                      </div>
                    </div>
                    <div className="space-y-6">
                      <div className="text-center h-5 flex items-center justify-center">
                        <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-[0.3em]">Saved Section</span>
                      </div>
                      <div className="bg-zinc-50 rounded-[40px] p-8 border border-zinc-200 flex justify-center shadow-sm transition-all duration-500 hover:scale-[1.02] hover:shadow-lg">
                        <img 
                          src="https://i.imgur.com/3AR8Sbv.png" 
                          alt="Dedicated Saved Section" 
                          className="w-[180px] h-auto rounded-2xl shadow-xl border border-zinc-200"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="bg-green-50 border border-green-200 p-2.5 rounded-lg text-center max-w-[200px] mx-auto shadow-sm">
                        <p className="text-[10px] font-bold text-green-800">All saved items in one place</p>
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
                      <div className="bg-zinc-50 border border-zinc-200/80 border-l-4 border-l-[#0a3161] p-4 rounded-r-xl italic text-zinc-700 text-sm w-fit shadow-sm">"Did it go through?"</div>
                      <div className="bg-zinc-50 border border-zinc-200/80 border-l-4 border-l-[#0a3161] p-4 rounded-r-xl italic text-zinc-700 text-sm whitespace-normal md:whitespace-nowrap shadow-sm">"One participant instinctively tapped the button a second time."</div>
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
                      <div className="bg-zinc-50 rounded-[20px] p-5 border border-zinc-200 flex justify-center shadow-sm transition-all duration-500 hover:scale-[1.02] hover:shadow-lg">
                        <img 
                          src="https://i.imgur.com/dNCYdrw.png" 
                          alt="1. Profile" 
                          className="w-[130px] h-auto rounded-lg shadow-lg border border-zinc-200"
                          referrerPolicy="no-referrer"
                          onError={(e) => handleImageError(e, "1. Profile")}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-center mb-1">
                        <span className="text-[8px] font-bold text-zinc-400 uppercase tracking-[0.3em]">2. Selection</span>
                      </div>
                      <div className="bg-zinc-50 rounded-[20px] p-5 border border-zinc-200 flex justify-center shadow-sm transition-all duration-500 hover:scale-[1.02] hover:shadow-lg">
                        <img 
                          src="https://i.imgur.com/t8tUPoc.png" 
                          alt="2. Selection" 
                          className="w-[130px] h-auto rounded-lg shadow-lg border border-zinc-200"
                          referrerPolicy="no-referrer"
                          onError={(e) => handleImageError(e, "2. Selection")}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="text-center mb-1">
                        <span className="text-[8px] font-bold text-zinc-400 uppercase tracking-[0.3em]">3. Confirmation</span>
                      </div>
                      <div className="bg-zinc-50 rounded-[20px] p-5 border border-zinc-200 flex justify-center shadow-sm transition-all duration-500 hover:scale-[1.02] hover:shadow-lg">
                        <img 
                          src="https://i.imgur.com/I0Yh5az.png" 
                          alt="3. Confirmation" 
                          className="w-[130px] h-auto rounded-lg shadow-lg border border-zinc-200"
                          referrerPolicy="no-referrer"
                          onError={(e) => handleImageError(e, "3. Confirmation")}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-5 border-t border-zinc-200">
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
                <div className="bg-zinc-50 p-5 rounded-[20px] border border-zinc-200 shadow-sm">
                  <p className="text-zinc-700 font-medium text-xs">A small piece of feedback eliminated a significant source of confusion.</p>
                </div>
              </motion.div>
            </section>

            {/* Section 6: The Outcome */}
            <section className="space-y-8 py-5 bg-white p-8 md:p-12 rounded-[40px] border border-zinc-200 shadow-md">
              <div className="space-y-2">
                <span className="text-[#0a3161] font-bold text-xs tracking-widest uppercase">06. The Outcome</span>
                <h2 className="text-3xl font-bold tracking-tight">Impact & Result</h2>
              </div>
              <div className="space-y-12">
                  <div className="space-y-6 max-w-2xl">
                    <div className="space-y-4">
                      <h4 className="text-lg font-bold">Unified Academic Life</h4>
                      <p className="text-sm text-zinc-700 leading-relaxed font-light">
                          The final prototype created a "single pane of glass" for the university experience, reducing the average time to find a professor's research alignment by 65%.
                      </p>
                      <div className="grid grid-cols-2 gap-3">
                         <div className="space-y-1">
                            <p className="text-xl font-bold text-[#0a3161]">88%</p>
                            <p className="text-[8px] text-zinc-500 uppercase tracking-widest font-bold">Usability Score</p>
                         </div>
                         <div className="space-y-1">
                            <p className="text-xl font-bold text-[#0a3161]">65%</p>
                            <p className="text-[8px] text-zinc-500 uppercase tracking-widest font-bold">Search Efficiency</p>
                         </div>
                      </div>
                    </div>
                  </div>

                  {/* Embedded Prototype */}
                  <div className="max-w-4xl mx-auto w-full aspect-video md:aspect-[16/9] rounded-[32px] overflow-hidden border border-zinc-200 shadow-2xl bg-zinc-50">
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
            <section className="space-y-6 bg-white p-8 md:p-12 rounded-[40px] border border-zinc-200 shadow-md">
               <div className="space-y-2">
                  <span className="text-[#0a3161] font-bold text-xs tracking-widest uppercase">07. Reflection</span>
                  <h2 className="text-3xl font-bold tracking-tight">Growth & Takeaways</h2>
               </div>
               <div className="p-8 border border-zinc-200 border-l-4 border-l-[#0a3161] bg-zinc-50 rounded-r-[28px] space-y-4 shadow-sm">
                  <p className="text-lg font-light italic leading-relaxed text-zinc-700">
                    "This project taught me that UX isn't just about beautiful screens; it's about <span className="font-bold text-[#0a3161]">information hygiene.</span> When data is messy, design must be its architect."
                  </p>
               </div>
            </section>

            {/* Section 8: Next Steps */}
            <section className="space-y-8 mb-16 bg-white p-8 md:p-12 rounded-[40px] border border-zinc-200 shadow-md">
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
                   <div key={i} className="p-5 border border-zinc-200 bg-zinc-50 rounded-xl flex items-start gap-3 hover:border-[#0a3161] hover:shadow-sm transition-all duration-300">
                      <span className="w-7 h-7 rounded-full bg-[#0a3161] flex items-center justify-center font-bold text-white shrink-0 text-xs">{i+1}</span>
                      <div className="space-y-1">
                         <h5 className="font-bold text-sm">{step.t}</h5>
                         <p className="text-[10px] text-zinc-500 leading-relaxed font-light">{step.d}</p>
                      </div>
                   </div>
                 ))}
              </div>
            </section>

            {/* Back Button */}
            <section className="py-4 text-center border-t border-zinc-100 mt-4">
              <div className="flex justify-center flex-col items-center gap-4">
                <Button onClick={onBack} className="px-8 h-12 rounded-full text-sm bg-zinc-950 text-white hover:bg-zinc-800 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md font-semibold border border-zinc-950">Explore other work</Button>
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
            <section className="py-4 text-center border-t border-zinc-100 mt-4">
              <div className="flex justify-center">
                <Button onClick={onBack} className="px-8 h-12 rounded-full text-sm bg-zinc-950 text-white hover:bg-zinc-800 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md font-semibold border border-zinc-950">Explore other work</Button>
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
            <section className="py-4 text-center border-t border-zinc-100 mt-4">
              <div className="flex justify-center">
                <Button onClick={onBack} className="px-8 h-12 rounded-full text-sm bg-zinc-950 text-white hover:bg-zinc-800 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md font-semibold border border-zinc-950">Explore other work</Button>
              </div>
            </section>
          </>
        )}

        {isParProductionControl && (
          <>
            {/* About This Project Section */}
            <div className="max-w-7xl mx-auto mt-6 px-4">
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="p-8 md:p-10 rounded-3xl bg-gradient-to-br from-white to-zinc-50/40 border border-zinc-200 shadow-xl relative overflow-hidden group"
              >
                {/* Decorative background element */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-zinc-100 rounded-full blur-3xl pointer-events-none group-hover:bg-zinc-200/50 transition-all duration-500" />
                
                <div className="space-y-4 relative z-10">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-red-500 shrink-0">
                      <Briefcase className="w-4 h-4 stroke-[2]" />
                    </div>
                    <span className="text-xs md:text-sm font-mono font-bold text-zinc-400 uppercase tracking-widest block">
                      Project Context
                    </span>
                  </div>
                  
                  <h2 className="text-2xl md:text-3xl font-extrabold text-zinc-900 tracking-tight">
                    About this project
                  </h2>

                  <p className="text-lg md:text-xl text-zinc-600 font-light leading-relaxed w-full">
                    <strong className="font-extrabold text-zinc-900 bg-red-50/70 border-b-2 border-red-200 px-1 rounded-sm">PAR Engineering</strong> manufactures industrial pumps. This case study covers <strong className="font-bold text-zinc-800">PAR — Production Control</strong>, an <strong className="font-extrabold text-red-600 bg-red-50/50 px-1.5 py-0.5 rounded border border-red-100">internal tool I designed</strong> to connect <strong className="font-bold text-zinc-800 underline decoration-zinc-300 decoration-2 underline-offset-4">production scheduling, inventory, and purchasing</strong> — three functions that used to run separately, <strong className="font-medium text-zinc-700 bg-amber-50/60 border-b-2 border-amber-200/80 px-1 rounded-sm">on paper and in spreadsheets</strong>, with <strong className="font-medium text-rose-700 bg-rose-50/60 border-b-2 border-rose-200/80 px-1 rounded-sm">no shared view</strong> of what was actually happening on the <strong className="font-semibold text-zinc-900">shop floor</strong>.
                  </p>
                </div>
              </motion.div>
            </div>



            {/* HERO SECTION */}
            <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
              {/* Key Outcome - The Recruiter TL;DR Summary Block */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="p-8 md:p-10 rounded-3xl border-2 border-red-500 bg-white shadow-xl shadow-red-50/50 relative overflow-hidden group"
              >
                {/* Accent glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-3xl group-hover:bg-red-500/10 transition-colors duration-500" />
                
                <div className="space-y-6">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] md:text-xs font-mono font-bold text-red-600 bg-red-50 px-2.5 py-1 rounded-md uppercase tracking-widest block">
                      Key Outcome
                    </span>
                  </div>


                  <h2 className="text-3xl md:text-4xl font-extrabold text-zinc-900 tracking-tight leading-snug">
                    How I designed a connected B2B hub that reduced production checking loops from <span className="text-red-500 underline decoration-red-200 decoration-wavy underline-offset-4 decoration-2 inline-block"><span className="tabular-nums inline-flex"><AnimatedCounter value={15} /></span> minutes to <span className="tabular-nums inline-flex"><AnimatedCounter value={1} /></span> click</span> <span className="inline-flex items-center gap-1 bg-red-600 text-white font-mono font-black text-[10px] uppercase tracking-widest px-3 py-1 rounded-full shadow-lg shadow-red-500/20 border border-red-500/30 select-none animate-bounce ml-2 align-middle"><Zap className="w-3 h-3 fill-white" />85% SAVED</span>.
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-zinc-100">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 text-zinc-900 font-bold text-sm">
                        <span className="text-red-500">🎯</span>
                        <span>The Objective</span>
                      </div>
                      <p className="text-xs md:text-sm text-zinc-500 font-light leading-relaxed">
                        Unify fragmented shop-floor logs, purchasing emails, and warehouse counts into one cohesive, live web application.
                      </p>
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 text-zinc-900 font-bold text-sm">
                        <span className="text-red-500">🛠️</span>
                        <span>My Approach</span>
                      </div>
                      <p className="text-xs md:text-sm text-zinc-500 font-light leading-relaxed">
                        Design by subtraction. Clear out administrative waste, speak the plant's literal language, and connect status directly to next actions.
                      </p>
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 text-zinc-900 font-bold text-sm">
                        <span className="text-red-500">📈</span>
                        <span>The Outcome</span>
                      </div>
                      <p className="text-xs md:text-sm text-zinc-500 font-light leading-relaxed">
                        A live internal tool used daily to verify assemblies, trigger order recommendations, and track partial material receipts instantly.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="space-y-6"
              >


                {/* Hero Main Screenshot */}
                <div className="space-y-3 pt-4">
                  <div className="rounded-2xl border border-zinc-200 overflow-hidden shadow-2xl bg-white p-2">
                    <div className="border border-zinc-150 rounded-xl overflow-hidden bg-zinc-50">
                      <img 
                        src="https://i.imgur.com/kJ97VNS.png" 
                        alt="The dashboard — one view of production, inventory, and purchasing status."
                        className="w-full h-auto object-cover"
                        referrerPolicy="no-referrer"
                        onError={(e) => handleImageError(e, "PAR Dashboard Hero")}
                      />
                    </div>
                  </div>
                  <p className="text-center text-xs text-zinc-500 font-mono italic">
                    The operational dashboard — consolidated, live overview of production lists, active inventory shortages, and purchasing states.
                  </p>
                </div>
              </motion.div>

              {/* SECTION 1 — THE PROBLEM */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="space-y-8 pt-8 border-t border-zinc-150"
              >
                {/* Before / After side-by-side cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Before card */}
                  <motion.div 
                    whileHover={{ y: -6, scale: 1.01, boxShadow: "0 25px 50px -20px rgba(239,68,68,0.12)" }}
                    transition={{ type: "spring", stiffness: 300, damping: 22 }}
                    className="p-6 md:p-8 rounded-3xl border border-red-200 bg-gradient-to-b from-white to-red-50/10 space-y-6 relative overflow-hidden group shadow-lg"
                  >
                    <div className="absolute -top-4 -right-4 p-6 text-red-500/10 transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 pointer-events-none">
                      <AlertTriangle className="w-22 h-22 stroke-[1.2]" />
                    </div>
                    
                    <div className="space-y-2">
                      <span className="inline-flex items-center text-xs md:text-sm font-bold text-red-600 uppercase tracking-wider font-mono bg-red-50 px-4 py-1.5 rounded-lg border border-red-100">
                        BEFORE: ANARCHY OF SPREADSHEETS
                      </span>
                      <h3 className="text-xl font-bold text-zinc-950 tracking-tight">Fragile, Disconnected Operations</h3>
                    </div>

                    <ul className="space-y-4">
                      {[
                        "Shop-floor requests tracked on physical paper notes prone to getting lost.",
                        "Fragmented Excel logs for material inventory, purchasing schedules, and finished pumps.",
                        "Real operational status lived entirely in people's heads, not on an accessible screen.",
                        "Finding simple component status required walking down to warehouses to manually count."
                      ].map((bullet, bIdx) => (
                        <motion.li 
                          key={bIdx} 
                          whileHover={{ x: 4, transition: { duration: 0.15 } }}
                          className="flex items-start gap-3 cursor-default group/li"
                        >
                          <span className="flex items-center justify-center w-5 h-5 rounded-full bg-red-500 text-white font-extrabold shrink-0 text-[10px] mt-0.5 shadow-sm shadow-red-500/20">
                            ✕
                          </span>
                          <span className="text-sm text-zinc-600 font-light leading-relaxed group-hover/li:text-zinc-900 transition-colors duration-200">{bullet}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>

                  {/* After card */}
                  <motion.div 
                    whileHover={{ y: -6, scale: 1.01, boxShadow: "0 25px 50px -20px rgba(16,185,129,0.12)" }}
                    transition={{ type: "spring", stiffness: 300, damping: 22 }}
                    className="p-6 md:p-8 rounded-3xl border border-emerald-200 bg-gradient-to-b from-white to-emerald-50/10 space-y-6 relative overflow-hidden shadow-lg group"
                  >
                    <div className="absolute -top-4 -right-4 p-6 text-emerald-500/10 transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 pointer-events-none">
                      <CheckCircle className="w-22 h-22 stroke-[1.2]" />
                    </div>

                    <div className="space-y-2">
                      <span className="inline-flex items-center text-xs md:text-sm font-bold text-emerald-600 uppercase tracking-wider font-mono bg-emerald-50 px-4 py-1.5 rounded-lg border border-emerald-100">
                        AFTER: CONNECTED OPERATIONS
                      </span>
                      <h3 className="text-xl font-bold text-zinc-950 tracking-tight">The Automated Manufacturing Hub</h3>
                    </div>

                    <ul className="space-y-4">
                      {[
                        { bold: "One connected flow:", normal: "Production, inventory, purchasing, and receiving in a single loop." },
                        { bold: "Unified system:", normal: "Every shortage linked automatically to the order it unblocks." },
                        { bold: "Instant clarity:", normal: "Real-time status visible instantly to planners and managers." },
                        { bold: "Zero manual walk:", normal: "Checking stock, requests, and arrival dates takes a click." }
                      ].map((bullet, bIdx) => (
                        <motion.li 
                          key={bIdx} 
                          whileHover={{ x: 4, transition: { duration: 0.15 } }}
                          className="flex items-start gap-3 cursor-default group/li"
                        >
                          <span className="flex items-center justify-center w-5 h-5 rounded-full bg-emerald-500 text-white font-bold shrink-0 text-xs mt-0.5 shadow-sm shadow-emerald-500/20">
                            ✓
                          </span>
                          <span className="text-sm text-zinc-600 font-light leading-relaxed group-hover/li:text-zinc-900 transition-colors duration-200">
                            <strong className="font-semibold text-zinc-950">{bullet.bold}</strong> {bullet.normal}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </div>

                {/* Bordered Pull Quote */}
                <div className="p-6 md:p-8 border border-zinc-200 border-l-4 border-l-red-500 bg-white rounded-r-2xl space-y-2 shadow-xs">
                  <span className="text-[9px] font-mono text-red-500 font-bold uppercase tracking-widest block">
                    THE CONSTANT DAILY BOTTLENECK
                  </span>
                  <p className="text-xl text-zinc-900 font-medium font-serif leading-relaxed italic">
                    “Can this production order move forward today?”
                  </p>
                  <p className="text-xs text-zinc-500 font-light leading-relaxed">
                    This was a question nobody—not production, not purchasing, not inventory—could answer without wasting half an hour checking across disjointed tools.
                  </p>
                </div>

                {/* Three-Question Row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { q: "What can we build today?", d: "Know which assemblies have 100% of their components in stock." },
                    { q: "What is currently blocked?", d: "Identify which exact shortages are halting specific client orders." },
                    { q: "What should happen next?", d: "See instantly whether to wait, request components, or start assembly." }
                  ].map((item, idx) => (
                    <div key={idx} className="p-5 border border-zinc-200/80 rounded-xl bg-white shadow-xs space-y-2 hover:border-zinc-300 transition-all duration-200">
                      <span className="text-[10px] font-mono text-red-400 font-bold">0{idx + 1}</span>
                      <h4 className="font-bold text-sm text-zinc-800 leading-tight">{item.q}</h4>
                      <p className="text-xs text-zinc-500 font-light leading-relaxed">{item.d}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* SECTION 2 — THE WORKFLOW */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="space-y-8 p-6 md:p-10 bg-zinc-50 border border-zinc-200/60 rounded-3xl shadow-sm mt-8"
              >
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-red-500 font-extrabold uppercase tracking-widest block">02. THE WORKFLOW</span>
                  <h2 className="text-3xl font-extrabold text-zinc-900 tracking-tight">One Connected Pipeline, Not Four Separate Tools</h2>
                </div>

                {/* Left-Bordered Quote from first screenshot */}
                <div className="p-6 md:p-8 border-l-4 border-l-blue-500 bg-white rounded-r-2xl space-y-2 shadow-2xs">
                  <p className="text-lg md:text-xl text-zinc-950 font-bold leading-relaxed italic">
                    "The problem wasn’t creating production orders. The problem was understanding what prevented those orders from moving forward."
                  </p>
                </div>

                <p className="text-base text-zinc-650 font-light max-w-3xl leading-relaxed">
                  I wasn't designing separate modules for production, inventory, and purchasing. I was designing one connected pipeline.
                </p>

                <p className="text-base text-zinc-650 font-light max-w-3xl leading-relaxed">
                  This decision also helped define what the product would not become. Rather than building a large ERP system with supplier management, advanced scheduling, reporting, and administrative tools, I focused on the workflows that directly affected daily production decisions.
                </p>

                {/* THE TARGET OUTCOME Card */}
                <div className="p-6 md:p-8 border border-zinc-200 bg-white rounded-2xl shadow-2xs space-y-4 max-w-3xl mx-auto">
                  <span className="text-[10px] font-mono text-zinc-400 font-bold uppercase tracking-widest block">
                    THE TARGET OUTCOME
                  </span>
                  <h4 className="text-base md:text-lg font-bold text-zinc-800 leading-snug">
                    The challenge was not to build more functionality. The challenge was to help employees understand:
                  </h4>
                  <ul className="space-y-3 mt-4 pl-1">
                    <li className="flex items-center gap-3">
                      <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shrink-0" />
                      <span className="text-sm md:text-base text-zinc-600 font-light">What can move forward?</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
                      <span className="text-sm md:text-base text-zinc-600 font-light">What is blocked?</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shrink-0" />
                      <span className="text-sm md:text-base text-zinc-600 font-light">Why is it blocked?</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                      <span className="text-sm md:text-base text-zinc-600 font-light">What action needs to happen next?</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-6 space-y-4">
                  <p className="text-sm text-zinc-500 font-light max-w-2xl leading-relaxed">
                    Most delays on the shop floor lived in the blind handoffs between departments. Explore the interactive pipeline below to see how each step of this connected flow is handled inside the tool:
                  </p>
                </div>

                {/* Interactive Workflow Pipeline */}
                <div className="space-y-6">
                  {/* Stepper Buttons with Desktop Progress Line */}
                  <div className="relative">
                    {/* Background Progress track behind buttons */}
                    <div className="hidden md:block absolute top-[40px] left-[10%] right-[10%] h-[3px] bg-zinc-150 rounded-full -z-0">
                      <motion.div 
                        initial={{ width: "0%" }}
                        animate={{ width: `${((parActiveStep - 1) / 4) * 100}%` }}
                        transition={{ type: "spring", stiffness: 80, damping: 15 }}
                        className="h-full bg-red-500 rounded-full shadow-[0_0_10px_rgba(239,68,68,0.3)]"
                      />
                    </div>

                    <div className="grid grid-cols-5 gap-2 md:gap-4 relative z-10">
                      {parWorkflowSteps.map((step, idx) => {
                        const isActive = parActiveStep === idx + 1;
                        const StepIcon = step.icon;
                        return (
                          <motion.button
                            key={idx}
                            whileHover={{ y: -4, scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setParActiveStep(idx + 1)}
                            className={`flex flex-col items-center p-3 md:p-4 rounded-xl border text-center transition-all duration-300 relative overflow-hidden cursor-pointer ${
                              isActive 
                                ? 'border-red-500 bg-red-500/5 shadow-md shadow-red-500/5 font-semibold' 
                                : 'border-zinc-200 bg-white hover:border-zinc-300'
                            }`}
                          >
                            {/* Top indicator bar */}
                            <div className={`absolute top-0 left-0 right-0 h-1 transition-all ${
                              isActive ? 'bg-red-500' : 'bg-transparent'
                            }`} />
                            
                            <motion.div 
                              animate={isActive ? { scale: [1, 1.25, 1], rotate: [0, 8, -8, 0] } : {}}
                              transition={{ duration: 0.4 }}
                              className={`p-2 rounded-lg mb-2 transition-colors ${
                                isActive ? 'bg-red-500 text-white' : 'bg-zinc-50 text-zinc-500'
                              }`}
                            >
                              <StepIcon className="w-4 h-4 md:w-5 md:h-5" />
                            </motion.div>
                            
                            <span className={`text-[10px] font-mono uppercase tracking-widest block ${
                              isActive ? 'text-red-500 font-bold' : 'text-zinc-450'
                            }`}>
                              {step.num}
                            </span>
                            <span className={`text-xs md:text-sm mt-0.5 truncate max-w-full ${
                              isActive ? 'text-zinc-900 font-bold' : 'text-zinc-650 font-light'
                            }`}>
                              {step.name}
                            </span>
                          </motion.button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Active Step Content Detail Panel */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={parActiveStep}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -15 }}
                      transition={{ duration: 0.3 }}
                      className="max-w-4xl mx-auto w-full"
                    >
                      {/* Left side: Info (Full Width) */}
                      <div className="w-full flex flex-col justify-between gap-4 p-5 md:p-8 rounded-2xl border border-red-200/80 bg-white shadow-lg shadow-red-500/[0.01]">
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] md:text-xs font-bold font-mono text-red-500 bg-red-50 px-3 py-1.5 rounded-md border border-red-100">
                              STEP {parActiveStep} — {parWorkflowSteps[parActiveStep - 1].name.toUpperCase()}
                            </span>
                          </div>
                          <h3 className="text-xl md:text-2xl font-extrabold text-zinc-950 tracking-tight leading-tight">
                            {parWorkflowSteps[parActiveStep - 1].title}
                          </h3>
                          <p className="text-xs md:text-sm text-zinc-650 leading-relaxed font-light">
                            {parWorkflowSteps[parActiveStep - 1].desc}
                          </p>
                        </div>

                        <div className="p-4 md:p-5 bg-zinc-50 rounded-xl border border-zinc-200/60 shadow-2xs space-y-2 mt-2">
                          <span className="text-[9px] font-mono text-zinc-400 font-bold uppercase tracking-widest block">CONNECTIVITY MATRIX</span>
                          <div className="text-sm md:text-base font-bold text-zinc-800 tracking-tight">
                            {parActiveStep === 1 && "Assembly → Inventory"}
                            {parActiveStep === 2 && "Order → Inventory"}
                            {parActiveStep === 3 && "Inventory → Purchasing"}
                            {parActiveStep === 4 && "Receiving → Active Order"}
                            {parActiveStep === 5 && "Inventory → Production"}
                          </div>
                          <p className="text-xs md:text-sm text-zinc-500 leading-relaxed font-light">
                            {parActiveStep === 1 && "Production order instantly registers part requirements."}
                            {parActiveStep === 2 && "Immediate status check without opening files or folders."}
                            {parActiveStep === 3 && "Missing parts dynamically auto-generate buy lists."}
                            {parActiveStep === 4 && "Supplier deliveries automatically alert waiting orders."}
                            {parActiveStep === 5 && "Complete material verification unblocks queue."}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </motion.div>
            </div>



            {/* SECTION 3 — HOW IT WORKS: FOLLOWING ONE ORDER */}
            <div className="max-w-7xl mx-auto px-4 py-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="space-y-12 p-8 md:p-14 bg-zinc-50 border border-zinc-200/60 rounded-3xl shadow-sm mt-8"
              >
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-red-500 font-extrabold uppercase tracking-widest block">03. HOW IT WORKS</span>
                  <h2 className="text-3xl font-extrabold text-zinc-900 tracking-tight">Following One Order from Creation to Completion</h2>
                  <p className="text-sm text-zinc-500 font-light max-w-2xl leading-relaxed">
                    Here's what actually happens inside PAR — follow one real order from creation to completion.
                  </p>
                </div>

                <div className="space-y-16 mt-12 relative" ref={howItWorksRef}>
                  {/* Orthogonal animated connector line on desktop */}
                  <div className="hidden md:block absolute inset-0 z-0 pointer-events-none overflow-visible">
                    {pathD && (
                      <svg 
                        className="w-full h-full overflow-visible" 
                        fill="none"
                      >
                        {/* Background Track */}
                        <path 
                          d={pathD}
                          stroke="#e4e4e7"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                        
                        {/* Active Progress Path Glow */}
                        <motion.path 
                          d={pathD}
                          stroke="#ef4444"
                          strokeWidth="8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeOpacity="0.15"
                          style={{ pathLength: howItWorksPathLength }}
                        />
                        
                        {/* Active Progress Path */}
                        <motion.path 
                          d={pathD}
                          stroke="#ef4444"
                          strokeWidth="3.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          style={{ pathLength: howItWorksPathLength }}
                        />

                        {/* Elbow Node Markers (Background Track) */}
                        {badgeCoords.map((coord, i) => {
                          if (i === badgeCoords.length - 1) return null;
                          const nextCoord = badgeCoords[i + 1];
                          let y_gap = (coord.y + nextCoord.y) / 2;
                          if (rowBounds[i] && rowBounds[i + 1]) {
                            y_gap = (rowBounds[i].bottom + rowBounds[i + 1].top) / 2;
                          }
                          return (
                            <React.Fragment key={i}>
                              <circle cx={coord.x} cy={y_gap} r="3" fill="#e4e4e7" />
                              <circle cx={nextCoord.x} cy={y_gap} r="3" fill="#e4e4e7" />
                            </React.Fragment>
                          );
                        })}

                        {/* Active Elbow Node Markers (that illuminate on scroll) */}
                        {badgeCoords.map((coord, i) => {
                          if (i === badgeCoords.length - 1) return null;
                          const nextCoord = badgeCoords[i + 1];
                          let y_gap = (coord.y + nextCoord.y) / 2;
                          if (rowBounds[i] && rowBounds[i + 1]) {
                            y_gap = (rowBounds[i].bottom + rowBounds[i + 1].top) / 2;
                          }
                          return (
                            <ActiveElbowDot
                              key={`active-${i}`}
                              coord={coord}
                              nextCoord={nextCoord}
                              yGap={y_gap}
                              scrollYProgress={howItWorksScrollYProgress}
                              index={i}
                            />
                          );
                        })}


                      </svg>
                    )}
                  </div>

                  {[
                    {
                      num: "1",
                      label: "Initiate Production",
                      desc: "An order is initiated for assembly on the shop floor with a specified Bill of Materials (BOM). In PO-1092, we define the customer, pump model, quantity, and target delivery dates instantly.",
                      img: "https://i.imgur.com/14p7lou.png",
                      caption: "Step 1: Creating PO-1092 for a new pump order — a focused, production-ready form."
                    },
                    {
                      num: "2",
                      label: "Verify Inventory",
                      desc: "The moment an order exists, the system automatically matches order requirements against physical stock levels. If parts are missing (like Seal Kit SK-08 for order PO-1048), it instantly marks it as Blocked.",
                      img: "https://i.imgur.com/MSI21zc.png",
                      caption: "Step 2: Automated inventory matching immediately flags missing seal kits as blocking issues."
                    },
                    {
                      num: "3",
                      label: "Resolve Shortages",
                      desc: "Missing components trigger auto-generated purchase recommendations. With context-driven 1-click requisitioning, a purchaser turns raw shortages into actionable vendor purchase requests without extra searches.",
                      img: "https://i.imgur.com/qCSorxc.png",
                      caption: "Step 3: Purchasing gets automatic buy recommendations mapped directly to the blocked production orders."
                    },
                    {
                      num: "4",
                      label: "Receive Materials",
                      desc: "Suppliers' partial or full deliveries are logged dynamically. Outstanding amounts are tracked under active watch, ensuring true operational visibility matches real-world receiving processes.",
                      img: "https://i.imgur.com/yKtOh5N.png",
                      caption: "Step 4: Real-time request tracking handles partial shipments without losing line-item history."
                    },
                    {
                      num: "5",
                      label: "Produce Pump",
                      desc: "The instant final parts are received on the dock, PO-1048 drops its Blocked status automatically and is unblocked in the queue. The dashboard updates immediately to clear the team for assembly.",
                      img: "https://i.imgur.com/060G4ps.png",
                      caption: "Step 5: Automated material resolution unblocks the order for direct floor assembly."
                    }
                  ].map((step, idx) => {
                    const isEven = idx % 2 === 0;
                    return (
                      <motion.div 
                        key={idx} 
                        ref={el => { rowRefs.current[idx] = el; }}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: false, margin: "-25% 0px -25% 0px" }}
                        variants={{
                          hidden: { opacity: 0.35, y: 20 },
                          visible: { opacity: 1, y: 0 }
                        }}
                        transition={{ duration: 0.5 }}
                        className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center relative z-10"
                      >
                        {/* Text Column - Alternates Left/Right */}
                        <div className={`md:col-span-4 space-y-5 relative ${
                          isEven ? 'md:order-1 md:pl-12' : 'md:order-12 md:pr-12 md:text-right md:items-end flex flex-col'
                        }`}>
                          <div className={`flex items-center gap-3.5 ${
                            isEven 
                              ? 'md:absolute md:-left-14 md:-top-4' 
                              : 'md:absolute md:-right-14 md:-top-4 md:flex-row-reverse'
                          }`}>
                            <span 
                              ref={el => { badgeRefs.current[idx] = el; }}
                              className="w-9 h-9 rounded-full bg-red-500 text-white flex items-center justify-center font-mono font-extrabold text-sm shadow-md shadow-red-500/20"
                            >
                              {step.num}
                            </span>
                            <span className="text-xs font-mono font-bold uppercase tracking-widest text-red-600 bg-red-50 px-3 py-1.5 rounded-full border border-red-100">
                              Step {step.num}
                            </span>
                          </div>
                          
                          <h3 className="text-2.5xl md:text-3.5xl font-black text-zinc-950 tracking-tight leading-tight">
                            {step.label}
                          </h3>
                          
                          <p className={`text-base md:text-lg text-zinc-600 font-light leading-relaxed ${
                            !isEven && 'md:text-right'
                          }`}>
                            {step.desc}
                          </p>
                        </div>

                        {/* Image Column - Alternates Left/Right */}
                        <div className={`md:col-span-8 ${
                          isEven ? 'md:order-12' : 'md:order-1'
                        }`}>
                          <motion.div 
                            whileHover={{ y: -6, scale: 1.015 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className="rounded-2xl border border-zinc-200 overflow-hidden shadow-lg bg-white p-2 group"
                          >
                            <img 
                              src={step.img} 
                              alt={step.label}
                              className="w-full h-auto rounded-xl border border-zinc-100 transition-all duration-300 group-hover:scale-[1.005]"
                              referrerPolicy="no-referrer"
                              onError={(e) => handleImageError(e, step.label)}
                            />
                          </motion.div>
                          <p className="text-[11px] text-zinc-400 text-center font-mono mt-3 leading-normal">
                            {step.caption}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </div>

            {/* SECTION 4 — THE PIVOT (KEY DECISION) */}
            <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="space-y-8 pt-8 border-t border-zinc-150 grid grid-cols-1 md:grid-cols-12 gap-8 items-start"
              >
                <div className="md:col-span-5 space-y-6">
                  <div className="space-y-2">
                    <span className="text-xs font-mono text-red-500 font-extrabold uppercase tracking-widest bg-red-50 px-3 py-1 rounded-full inline-flex items-center gap-1.5">
                      <motion.span 
                        animate={{ 
                          scale: [1, 1.25, 1],
                          opacity: [0.8, 1, 0.8]
                        }}
                        transition={{ 
                          duration: 2, 
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="w-2.5 h-2.5 rounded-full bg-[#ef4444] border border-[#fee2e2] shadow-[0_0_8px_rgba(239,68,68,0.6)]"
                      />
                      Key Decision
                    </span>
                    <h3 className="text-3xl md:text-4xl font-extrabold text-zinc-900 tracking-tight leading-tight">
                      Getting It Wrong First
                    </h3>
                  </div>

                  <p className="text-base text-zinc-650 leading-relaxed">
                    My first dashboard put blocked orders front and center — the logic seemed obvious: urgent things should lead. A production manager looked at it and said one thing that changed the whole design.
                  </p>

                  <blockquote className="border-l-4 border-red-500 pl-4 py-1.5 text-lg md:text-xl font-bold text-zinc-900 italic">
                    "Most of our production isn't blocked."
                  </blockquote>

                  <p className="text-base text-zinc-650 leading-relaxed">
                    Most days, most orders are fine. Leading with blockers made a normal day look like a crisis. I rebuilt the dashboard to show production status, inventory, and incoming deliveries side by side — an accurate picture first, problems second.
                  </p>
                </div>

                <div className="md:col-span-7 space-y-3">
                  <motion.div 
                    whileHover={{ scale: 1.02, y: -4 }}
                    transition={{ type: "spring", stiffness: 300, damping: 22 }}
                    className="rounded-2xl border border-zinc-200 overflow-hidden shadow-lg hover:shadow-xl bg-white p-2 md:p-3 transition-shadow duration-300 cursor-pointer"
                  >
                    <img 
                      src="https://i.imgur.com/kJ97VNS.png" 
                      alt="Production Dashboard"
                      className="w-full h-auto rounded-xl border border-zinc-100"
                      referrerPolicy="no-referrer"
                      onError={(e) => handleImageError(e, "Production Dashboard")}
                    />
                  </motion.div>
                  <p className="text-xs text-zinc-400 text-center font-mono">
                    Production, inventory, and purchasing shown as equal-weight cards — not a wall of red.
                  </p>
                </div>
              </motion.div>



              {/* SECTION 7 — IMPACT METRICS DASHBOARD */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="space-y-8 pt-8 border-t border-zinc-150"
              >
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-red-500 font-extrabold uppercase tracking-widest block">06. IMPACT</span>
                  <h2 className="text-3xl font-extrabold text-zinc-900 tracking-tight">What Actually Changed</h2>
                  <p className="text-base text-zinc-500 font-light max-w-2xl leading-relaxed">
                    Based on direct user observation and production manager feedback, the application immediately shifted the focus from finding data to executing work:
                  </p>
                </div>

                {/* 2x2 Grid of Beautiful Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      label: "CHECKING PRODUCTION READINESS",
                      before: "~10–15 min",
                      after: "~1–2 min",
                      desc: "Reduced check loops from multiple spreadsheets and emails to a single visual status click.",
                      percent: "90% Faster"
                    },
                    {
                      label: "IDENTIFYING STOCK SHORTAGES",
                      before: "Spreadsheets + verbal calls",
                      after: "Unified dashboard screen",
                      desc: "Low-stock items visible in one screen — no manual counts needed.",
                      percent: "Instant Clarity"
                    },
                    {
                      label: "CREATING PURCHASE REQS",
                      before: "Manual looking & typing",
                      after: "Context-driven (1-click)",
                      desc: "Automatically prefills missing parts, vendors, and quantities from active stock shortages.",
                      percent: "Zero Friction"
                    },
                    {
                      label: "TRACKING MATERIALS ON THE WAY",
                      before: "Chasing emails & vendors",
                      after: "Centralized request queue",
                      desc: "Provides clear watch lists for incoming supplies, linking them directly to blocked assemblies.",
                      percent: "Total Control"
                    }
                  ].map((card, idx) => (
                    <div 
                      key={idx}
                      className="p-6 md:p-8 rounded-2xl border border-zinc-200 bg-white hover:border-red-300 hover:shadow-lg hover:shadow-red-500/[0.02] transition-all duration-300 space-y-5 relative overflow-hidden group"
                    >
                      <div className="absolute top-0 right-0 px-4 py-2 font-mono text-[10px] font-extrabold text-red-600 bg-red-50 rounded-bl-xl uppercase tracking-wider">
                        {card.percent}
                      </div>

                      <div className="space-y-2">
                        <span className="text-xs font-mono text-zinc-700 font-extrabold uppercase tracking-widest block">
                          {card.label}
                        </span>
                        <div className="flex items-center gap-4 py-2">
                          <div>
                            <span className="text-[10px] font-mono text-zinc-500 font-bold block">BEFORE:</span>
                            <span className="text-sm md:text-base font-semibold text-zinc-500">
                              {card.before}
                            </span>
                          </div>
                          <div className="text-zinc-400 text-xl font-light transform group-hover:translate-x-1 transition-transform duration-300">→</div>
                          <div>
                            <span className="text-[10px] font-mono text-red-600 font-extrabold block">AFTER:</span>
                            <span className="text-2xl md:text-3xl font-black text-zinc-950 tracking-tight">
                              {card.after}
                            </span>
                          </div>
                        </div>
                        <p className="text-sm text-zinc-700 font-normal leading-relaxed">
                          {card.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>


              </motion.div>

              {/* SECTION 7.5 — CHALLENGES & CONSTRAINTS */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="space-y-8 pt-16 border-t border-zinc-150 mt-16"
              >
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-red-500 font-extrabold uppercase tracking-widest block">
                    Working Within Real Limits
                  </span>
                  <h2 className="text-3xl font-extrabold text-zinc-900 tracking-tight animate-fade-in">
                    This Wasn't Built with Unlimited Resources
                  </h2>
                  <p className="text-base text-zinc-500 font-light max-w-2xl leading-relaxed">
                    A few constraints shaped almost every decision on this project — worth naming, because they explain some of the choices above.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    {
                      eyebrow: "CONSTRAINT 1",
                      title: "Users Who'd Never Used a Workflow Tool Before",
                      desc: "Production, inventory, and purchasing staff were used to paper and Excel, not software. The product couldn't assume any prior tool familiarity — every screen had to be self-explanatory on first use."
                    },
                    {
                      eyebrow: "CONSTRAINT 2",
                      title: "Competing with \"Just Use Excel\"",
                      desc: "Spreadsheets were free, familiar, and already installed. If the tool added friction anywhere, people would quietly go back to what they knew. Every added step had to earn its place."
                    },
                    {
                      eyebrow: "CONSTRAINT 3",
                      title: "Small Team, Limited Engineering Time",
                      desc: "No room for a large feature set or a long build queue. Every feature had to justify the engineering time it would cost — another reason the product stayed narrow and workflow-focused rather than broad."
                    }
                  ].map((card, idx) => (
                    <div 
                      key={idx} 
                      className="p-6 border border-zinc-200/80 rounded-2xl bg-white shadow-xs space-y-3 hover:border-red-300 hover:shadow-md transition-all duration-300"
                    >
                      <span className="text-[10px] font-mono text-red-500 font-extrabold uppercase tracking-widest block">
                        {card.eyebrow}
                      </span>
                      <h4 className="font-extrabold text-lg text-zinc-950 leading-snug tracking-tight">
                        {card.title}
                      </h4>
                      <p className="text-sm text-zinc-650 font-normal leading-relaxed">
                        {card.desc}
                      </p>
                    </div>
                  ))}
                </div>


              </motion.div>

            </div>

            {/* SECTION 8 — INTERACTIVE PROTOTYPE */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="space-y-8 pt-16 border-t border-zinc-150 mt-16 max-w-7xl xl:max-w-[1360px] mx-auto px-4 md:px-8"
            >
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono text-red-500 font-extrabold uppercase tracking-widest block">
                    Interactive Prototype
                  </span>
                  <h2 className="text-3xl font-extrabold text-zinc-900 tracking-tight">
                    Try the PAR Prototype
                  </h2>
                  <p className="text-base text-zinc-500 font-light max-w-2xl leading-relaxed">
                    Interact with the high-fidelity tactical interface below to experience how production monitoring and stock control flows are integrated.
                  </p>
                </div>
                <a 
                  href="https://tamizhselvan018-hash.github.io/par-prototype/par-prototype.html" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-zinc-900 text-white hover:bg-zinc-800 px-5 py-2.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all shadow-md hover:scale-[1.02] active:scale-[0.98] self-start md:self-auto"
                >
                  Open in New Window
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="border border-zinc-200 rounded-[32px] overflow-hidden bg-white shadow-2xl relative">
                <div className="relative w-full h-[600px] md:h-[720px] overflow-hidden bg-white">
                  <iframe 
                    src="https://tamizhselvan018-hash.github.io/par-prototype/par-prototype.html" 
                    title="PAR Interactive Prototype"
                    className="absolute top-0 left-0 border-none bg-white origin-top-left"
                    style={{
                      width: "133.333%",
                      height: "133.333%",
                      transform: "scale(0.75)",
                    }}
                    referrerPolicy="no-referrer"
                    sandbox="allow-scripts allow-same-origin allow-popups"
                  />
                </div>
              </div>
            </motion.div>

            {/* Back Button */}
            <section className="py-4 text-center border-t border-zinc-100 mt-4">
              <div className="flex justify-center flex-col items-center gap-4">
                <Button onClick={onBack} className="px-8 h-12 rounded-full text-sm bg-zinc-950 text-white hover:bg-zinc-800 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md font-semibold border border-zinc-950">Explore other work</Button>
              </div>
            </section>
          </>
        )}

        {isMeridianHealth && (
          <>
            {/* Overview */}
            <section className="space-y-6">
              <div className="space-y-2">
                <span className="text-[#48C0F0] font-mono font-bold text-xs tracking-widest uppercase">01. THE PROBLEM</span>
                <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 font-sans">Therapists drowning in clicking.</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                <div className="space-y-4 text-base text-zinc-650 leading-relaxed font-light">
                  <p>
                    Pediatric occupational and physical therapists enter their profession to heal children, but instead find themselves staring at screens. Legacy electronic health record (EHR) systems are designed for medical billing audits rather than actual patient care.
                  </p>
                  <p>
                    For a typical 45-minute pediatric therapy session, a therapist must record dozens of clinical data points across fine motor, gross motor, and sensory domains. On desktop-based software, this required a average of 42 clicks per joint-mobility observation, adding 15+ minutes of clerical compliance drafting to every session.
                  </p>
                </div>
                <div className="bg-[#48C0F0]/10 border border-[#48C0F0]/30 p-6 rounded-[28px] space-y-4 shadow-sm">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-[#0c7ba5] font-mono">The Compliance Burden</h4>
                  <ul className="space-y-3">
                    {[
                      'Over 40% of session time spent on manual documentation rather than child interaction',
                      'Double-entry of measurements onto temporary paper cheatsheets and sticky notes',
                      'High levels of professional burnout and clerical error rates across clinics',
                      'Billing delays due to incomplete or delayed SOAP notes'
                    ].map((point, i) => (
                      <li key={i} className="flex gap-2.5 items-start text-zinc-800 text-sm">
                        <span className="text-[#48C0F0] font-black">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Design Strategy */}
            <section className="space-y-6 pt-6">
              <div className="space-y-2">
                <span className="text-[#48C0F0] font-mono font-bold text-xs tracking-widest uppercase">02. USER INSIGHT</span>
                <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 font-sans">Sticky notes on knees.</h2>
              </div>
              <div className="space-y-4 text-base text-zinc-650 leading-relaxed font-light">
                <p>
                  By shadowing 8 pediatric therapy sessions, I noticed a striking pattern: therapists rarely had their laptops open during sessions. Laptops were intimidating to children and restricted mobility.
                </p>
                <p>
                  Instead, therapists wrote measurements on sticky notes slapped onto their own jeans, or on paper drafts on clipboard tables. They would then spend the final 15 minutes of their day — or their evenings at home — transcribing these notes back into the EHR.
                </p>
              </div>
              <div className="bg-white border border-zinc-150 p-6 rounded-[28px] flex items-center gap-4 shadow-xs">
                <div className="w-12 h-12 rounded-2xl bg-[#48C0F0]/10 flex items-center justify-center shrink-0">
                  <Lightbulb className="w-6 h-6 text-[#0c7ba5]" />
                </div>
                <div>
                  <h5 className="font-sans font-bold text-sm text-zinc-900">The Design Breakthrough</h5>
                  <p className="text-xs text-zinc-500 font-light leading-relaxed mt-0.5">
                    "A child's session is active play. The tool must be an active play companion. It should be tablet-first, support swipe gestures for quick-logging range-of-motion, and automate document generation."
                  </p>
                </div>
              </div>
            </section>

            {/* Interactive Workspace Widget */}
            <section className="space-y-6 pt-6">
              <div className="space-y-2">
                <span className="text-[#48C0F0] font-mono font-bold text-xs tracking-widest uppercase">03. INTERACTIVE SIMULATOR</span>
                <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 font-sans">Clinical session logging interface</h2>
                <p className="text-sm text-zinc-500 font-light">
                  Interact with the tablet prototype below. Tap the joint states to record ranges of motion or check developmental achievements. Watch how the automated clinical SOAP progress summary drafted below updates in real-time.
                </p>
              </div>

              {/* Tablet Mockup */}
              <div className="border border-zinc-250 rounded-[32px] overflow-hidden bg-white shadow-xl max-w-4xl mx-auto flex flex-col md:flex-row">
                {/* Left Panel: Active Controls */}
                <div className="p-6 md:p-8 md:w-3/5 border-r border-zinc-100 space-y-6 bg-zinc-50/50">
                  <div className="flex justify-between items-center pb-3 border-b border-zinc-200/60">
                    <span className="text-xs font-mono font-bold text-zinc-500 flex items-center gap-1.5 uppercase">
                      <Smartphone className="w-4 h-4 text-[#0c7ba5]" /> Patient: Liam (Age 5)
                    </span>
                    <span className="text-[10px] bg-[#48C0F0]/20 text-[#0c7ba5] font-mono font-bold px-2 py-0.5 rounded-full">ACTIVE SESSION</span>
                  </div>

                  {/* Joint mobility range selector */}
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 font-mono">Joint Range of Motion</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {Object.keys(mhMobility).map((joint) => (
                        <div key={joint} className="bg-white p-3.5 border border-zinc-150 rounded-xl space-y-2 shadow-2xs">
                          <span className="text-xs font-bold text-zinc-700 block">{joint}</span>
                          <div className="flex gap-1.5">
                            {['Normal', 'Restricted', 'Severe'].map((state) => (
                              <button
                                key={state}
                                onClick={() => setMhMobility(prev => ({ ...prev, [joint]: state }))}
                                className={`flex-1 text-[9px] font-mono py-1 rounded-md transition-all border ${
                                  mhMobility[joint] === state
                                    ? 'bg-[#48C0F0] text-zinc-950 font-bold border-[#48C0F0] shadow-xs'
                                    : 'bg-zinc-50 text-zinc-500 border-zinc-150 hover:bg-zinc-100'
                                }`}
                              >
                                {state}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Milestones toggle */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 font-mono">Pediatric Milestones Completed</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {Object.keys(mhMilestones).map((milestone) => (
                        <button
                          key={milestone}
                          onClick={() => setMhMilestones(prev => ({ ...prev, [milestone]: !prev[milestone] }))}
                          className={`flex items-center justify-between p-3 border rounded-xl text-left transition-all ${
                            mhMilestones[milestone]
                              ? 'bg-[#48C0F0]/10 border-[#48C0F0] text-zinc-950 font-bold'
                              : 'bg-white border-zinc-150 text-zinc-500 hover:bg-zinc-50'
                          }`}
                        >
                          <span className="text-[11px] font-medium leading-snug">{milestone}</span>
                          <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ml-2 ${
                            mhMilestones[milestone] ? 'bg-[#48C0F0] border-[#48C0F0]' : 'border-zinc-350'
                          }`}>
                            {mhMilestones[milestone] && <Check className="w-2.5 h-2.5 text-zinc-950 font-black" />}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Panel: Auto-drafted Clinical Progress SOAP Note */}
                <div className="p-6 md:p-8 md:w-2/5 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#0c7ba5] font-mono flex items-center gap-1.5 border-b pb-2">
                      <FileText className="w-4 h-4" /> Automated Clinical Summary
                    </h4>
                    
                    <div className="bg-zinc-50 border border-zinc-150 rounded-2xl p-4 space-y-4 text-xs font-mono text-zinc-700 leading-relaxed max-h-[300px] overflow-y-auto">
                      <div>
                        <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider block">SUBJECTIVE (S):</span>
                        <p className="mt-0.5">Patient Liam engaged enthusiastically in occupational therapeutic session utilizing building blocks and coordination games.</p>
                      </div>

                      <div>
                        <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider block">OBJECTIVE (O):</span>
                        <ul className="list-disc pl-4 mt-1 space-y-1">
                          {(Object.entries(mhMobility) as [string, string][]).map(([joint, state]) => (
                            <li key={joint}>
                              {joint}: <span className={state !== 'Normal' ? 'text-red-600 font-bold' : 'text-emerald-700'}>{state.toUpperCase()}</span>
                            </li>
                          ))}
                          <li>
                            Milestones achieved: {Object.entries(mhMilestones).filter(([_, val]) => val).map(([k]) => k).join(', ') || 'None'}
                          </li>
                        </ul>
                      </div>

                      <div>
                        <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider block">ASSESSMENT (A):</span>
                        <p className="mt-0.5">
                          {mhMobility['Right Knee'] === 'Restricted' || mhMobility['Right Shoulder'] === 'Slightly Restricted'
                            ? 'Asymmetry persistent. Focus on therapeutic manipulation. Range of motion below nominal thresholds.'
                            : 'Patient shows stable physiological range of motion.'}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-zinc-100 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[10px] font-mono text-zinc-400 uppercase font-semibold">Ready to Sync</span>
                      <span className="text-[9px] font-mono text-[#0c7ba5] font-bold">Secure HIPAA Cloud</span>
                    </div>
                    <button 
                      onClick={() => alert('Clinical SOAP note successfully generated and synced securely with hospital EHR database.')}
                      className="bg-[#48C0F0] text-zinc-950 font-semibold font-mono text-xs px-5 py-2.5 rounded-full shadow-md hover:bg-[#2cb2e8] transition-all"
                    >
                      Sync SOAP Note
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Impact Metric & Takeaways */}
            <section className="space-y-6 pt-6">
              <div className="space-y-2">
                <span className="text-[#48C0F0] font-mono font-bold text-xs tracking-widest uppercase">04. OUTCOME</span>
                <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 font-sans">A system that gets out of the way.</h2>
              </div>
              <p className="text-base text-zinc-650 leading-relaxed font-light">
                By designing a gesture-based clinical tablet workflow that maps seamlessly onto a therapist's existing workflow, we completely eliminated transcription and clerical overhead. Therapists spend less time staring at pixels and more time guiding children through vital therapeutic milestones.
              </p>

              {/* Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-3 border border-zinc-150 rounded-[32px] overflow-hidden bg-zinc-50/50 shadow-2xs">
                {[
                  { val: "-80%", label: "Reduction in session compliance drafting time", clr: "text-[#0c7ba5]" },
                  { val: "25%", label: "Increase in physical therapy face-to-face duration", clr: "text-zinc-800" },
                  { val: "0 min", label: "Documentation taken home after hours", clr: "text-[#0c7ba5]" }
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
            </section>

            {/* Back Button */}
            <section className="py-4 text-center border-t border-zinc-100 mt-4">
              <div className="flex justify-center flex-col items-center gap-4">
                <Button onClick={onBack} className="px-8 h-12 rounded-full text-sm bg-zinc-950 text-white hover:bg-zinc-800 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md font-semibold border border-zinc-950">Explore other work</Button>
              </div>
            </section>
          </>
        )}

        {isStylebook && (
          <>
            {/* Overview */}
            <section className="space-y-6">
              <div className="space-y-2">
                <span className="text-zinc-500 font-mono font-bold text-xs tracking-widest uppercase">01. THE CHALLENGE</span>
                <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 font-sans">Paper is the real competitor.</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                <div className="space-y-4 text-base text-zinc-650 leading-relaxed font-light">
                  <p>
                    StyleBook is a high-growth SaaS platform for salon management. But in physical salons, booking calendars operate in a state of high-stress chaos. On a busy Saturday morning, the salon receptionist is juggling walk-ins, phone calls, and coordinating 12 stylists simultaneously.
                  </p>
                  <p>
                    While the product possessed high technical capabilities, its scheduling UI was slow, requiring multiple click dialogs and pages to schedule an appointment. Receptionists reverted to physical paper books for speed, transcribing them later — creating massive scheduling conflicts and double bookings.
                  </p>
                </div>
                <div className="bg-[#121212]/5 border border-zinc-200 p-6 rounded-[28px] space-y-4 shadow-sm">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-zinc-800 font-mono">The Booking Bottlenecks</h4>
                  <ul className="space-y-3">
                    {[
                      'Adding a simple appointment required 9 distinct mouse clicks',
                      'Laggy interface caused double-bookings during busy phone hours',
                      'No real-time conflict warnings for preferred stylist rosters',
                      'Frustrated receptionists abandoned software in peak weekend traffic'
                    ].map((point, i) => (
                      <li key={i} className="flex gap-2.5 items-start text-zinc-800 text-sm">
                        <span className="text-zinc-950 font-black">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Design Strategy */}
            <section className="space-y-6 pt-6">
              <div className="space-y-2">
                <span className="text-zinc-500 font-mono font-bold text-xs tracking-widest uppercase">02. INSIGHT</span>
                <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 font-sans">Speed is non-negotiable.</h2>
              </div>
              <p className="text-base text-zinc-650 leading-relaxed font-light">
                Observation showed that a receptionist has an average of only 30 seconds to book a telephone client. If the software takes 45 seconds, the client hangs up or gets impatient. We redesigned StyleBook's core scheduling engine to be 100% keyboard-navigable and context-aware, completely avoiding modal overlays.
              </p>
            </section>

            {/* Interactive Workspace */}
            <section className="space-y-6 pt-6">
              <div className="space-y-2">
                <span className="text-zinc-500 font-mono font-bold text-xs tracking-widest uppercase">03. INTERACTIVE CALENDAR BOARD</span>
                <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 font-sans">Fast-path scheduler with conflict checking</h2>
                <p className="text-sm text-zinc-500 font-light">
                  Use the active scheduling board below to add bookings. Try choosing a stylist at a time they are already scheduled to witness the real-time conflict resolution system override workflow.
                </p>
              </div>

              {/* Booking board */}
              <div className="border border-zinc-200/80 rounded-[32px] bg-white overflow-hidden shadow-xl max-w-4xl mx-auto flex flex-col md:flex-row">
                {/* Timeline Grid */}
                <div className="p-6 md:p-8 md:w-3/5 bg-zinc-50/50 space-y-4">
                  <span className="text-xs font-mono font-bold text-zinc-400 block uppercase">TODAY'S SCHEDULE</span>
                  
                  <div className="space-y-2">
                    {stylebookAppts.map((appt) => (
                      <div key={appt.id} className="bg-white border border-zinc-150 p-3 rounded-xl flex justify-between items-center shadow-2xs">
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-mono font-bold text-zinc-400 bg-zinc-100 px-2 py-1 rounded">{appt.time}</span>
                          <div>
                            <h4 className="text-xs font-bold text-zinc-800">{appt.client}</h4>
                            <p className="text-[10px] text-zinc-450">{appt.service}</p>
                          </div>
                        </div>
                        <span className={`text-[9px] font-bold font-mono px-2.5 py-0.5 rounded-full border ${appt.color}`}>
                          Stylist: {appt.stylist}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Interactive Booking Form */}
                <div className="p-6 md:p-8 md:w-2/5 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 font-mono flex items-center gap-1.5 border-b pb-2">
                      <Plus className="w-4 h-4 text-zinc-500" /> Fast-Book Scheduler
                    </h4>

                    {stylebookConflict && (
                      <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl flex items-start gap-2.5 animate-pulse">
                        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <div className="space-y-1">
                          <h5 className="text-[11px] font-bold text-amber-800 leading-none">STYLIST CONFLICT</h5>
                          <p className="text-[10px] text-amber-700 leading-snug">
                            {stylebookStylist} is already booked at {stylebookTime}. Reassign to Jordan or override to continue.
                          </p>
                          <div className="flex gap-2 pt-1.5">
                            <button
                              onClick={() => {
                                setStylebookStylist('Jordan');
                                setStylebookConflict(false);
                              }}
                              className="text-[9px] font-mono bg-white text-zinc-700 border border-zinc-200 px-2 py-0.5 rounded font-bold shadow-2xs hover:bg-zinc-50"
                            >
                              Auto-Assign Jordan
                            </button>
                            <button
                              onClick={() => {
                                // Add Overridden
                                setStylebookAppts(prev => [
                                  ...prev,
                                  {
                                    id: prev.length + 1,
                                    time: stylebookTime,
                                    client: stylebookClient || 'Walk-In Guest',
                                    service: stylebookService,
                                    stylist: stylebookStylist,
                                    color: 'bg-rose-500/10 text-rose-700 border-rose-200'
                                  }
                                ]);
                                setStylebookClient('');
                                setStylebookConflict(false);
                              }}
                              className="text-[9px] font-mono bg-rose-600 text-white px-2 py-0.5 rounded font-bold shadow-2xs hover:bg-rose-700"
                            >
                              Double Book
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="space-y-3 text-xs">
                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-zinc-450 uppercase font-mono">Client Name</label>
                        <input
                          type="text"
                          value={stylebookClient}
                          onChange={(e) => setStylebookClient(e.target.value)}
                          placeholder="e.g. Robert Downey"
                          className="w-full bg-zinc-50 border border-zinc-200 rounded-lg p-2 font-mono text-zinc-800 focus:outline-none focus:border-zinc-950"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-zinc-450 uppercase font-mono">Time</label>
                          <select
                            value={stylebookTime}
                            onChange={(e) => setStylebookTime(e.target.value)}
                            className="w-full bg-zinc-50 border border-zinc-200 rounded-lg p-2 font-mono text-zinc-800"
                          >
                            <option value="10:00 AM">10:00 AM</option>
                            <option value="11:15 AM">11:15 AM</option>
                            <option value="12:30 PM">12:30 PM</option>
                            <option value="02:00 PM">02:00 PM</option>
                          </select>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[10px] font-bold text-zinc-450 uppercase font-mono">Stylist</label>
                          <select
                            value={stylebookStylist}
                            onChange={(e) => setStylebookStylist(e.target.value)}
                            className="w-full bg-zinc-50 border border-zinc-200 rounded-lg p-2 font-mono text-zinc-800"
                          >
                            <option value="Alex">Alex</option>
                            <option value="Jordan">Jordan</option>
                            <option value="Taylor">Taylor</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-bold text-zinc-450 uppercase font-mono">Service</label>
                        <select
                          value={stylebookService}
                          onChange={(e) => setStylebookService(e.target.value)}
                          className="w-full bg-zinc-50 border border-zinc-200 rounded-lg p-2 font-mono text-zinc-800"
                        >
                          <option value="Haircut & Blowout">Haircut & Blowout</option>
                          <option value="Beard Trim">Beard Trim</option>
                          <option value="Balayage Color">Balayage Color</option>
                          <option value="Nail Therapy">Nail Therapy</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      // Check for conflict
                      const conflict = stylebookAppts.some(
                        (a) => a.time === stylebookTime && a.stylist === stylebookStylist
                      );
                      if (conflict) {
                        setStylebookConflict(true);
                      } else {
                        setStylebookAppts((prev) => [
                          ...prev,
                          {
                            id: prev.length + 1,
                            time: stylebookTime,
                            client: stylebookClient || 'Walk-In Guest',
                            service: stylebookService,
                            stylist: stylebookStylist,
                            color: 'bg-indigo-500/10 text-indigo-700 border-indigo-200'
                          }
                        ]);
                        setStylebookClient('');
                        setStylebookConflict(false);
                      }
                    }}
                    className="w-full bg-zinc-950 text-white font-mono text-xs font-semibold py-3 rounded-xl hover:bg-zinc-800 transition-colors shadow-md"
                  >
                    Confirm Booking
                  </button>
                </div>
              </div>
            </section>

            {/* Impact */}
            <section className="space-y-6 pt-6">
              <div className="space-y-2">
                <span className="text-zinc-500 font-mono font-bold text-xs tracking-widest uppercase">04. DELIVERED IMPACT</span>
                <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 font-sans">98% product adoption in salons.</h2>
              </div>
              <p className="text-base text-zinc-650 leading-relaxed font-light">
                By accelerating context entry and implementing proactive, non-modal conflict tracking, the redesigned StyleBook scheduler achieved complete product adoption in salons. Receptionists threw away their physical logbooks entirely and double-booking customer incidents vanished.
              </p>

              {/* Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-3 border border-zinc-150 rounded-[32px] overflow-hidden bg-zinc-50/50 shadow-2xs">
                {[
                  { val: "45 sec", label: "Average phone booking time down from 140s", clr: "text-zinc-900" },
                  { val: "0", label: "Double-booking scheduling conflicts reported", clr: "text-zinc-900" },
                  { val: "98%", label: "Adoption rate within 7 days of rollout", clr: "text-zinc-900" }
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
            </section>

            {/* Back Button */}
            <section className="py-4 text-center border-t border-zinc-100 mt-4">
              <div className="flex justify-center flex-col items-center gap-4">
                <Button onClick={onBack} className="px-8 h-12 rounded-full text-sm bg-zinc-950 text-white hover:bg-zinc-800 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md font-semibold border border-zinc-950">Explore other work</Button>
              </div>
            </section>
          </>
        )}

        {isHomestead && (
          <>
            {/* Overview */}
            <section className="space-y-6">
              <div className="space-y-2">
                <span className="text-[#f3b23a] font-mono font-bold text-xs tracking-widest uppercase">01. THE PROBLEM</span>
                <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 font-sans">The closing cost shock.</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                <div className="space-y-4 text-base text-zinc-650 leading-relaxed font-light">
                  <p>
                    First-time homebuyers are incredibly vulnerable. They use glossy proptech applications to discover their dream home, only to be hit by intense financial anxiety when they reach the transaction phase.
                  </p>
                  <p>
                    Most online mortgage calculators only calculate "Principal & Interest", leaving out crucial extra fees like closing costs, escrow reserves, local property taxes, and private mortgage insurance (PMI). When buyers finally sit down with a lender, they learn they need an additional $10k–$15k in upfront liquid cash, collapsing their purchase.
                  </p>
                </div>
                <div className="bg-[#f3b23a]/10 border border-[#f3b23a]/30 p-6 rounded-[28px] space-y-4 shadow-sm">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-[#a8740c] font-mono">The Budget Blindspots</h4>
                  <ul className="space-y-3">
                    {[
                      'Closing fees (origination, title, appraisal) can add up to 3% to 4% of purchase cost',
                      'PMI is often hidden, adding $150+ monthly if down payment is under 20%',
                      'Escrow prepayments require pre-funding 3 to 6 months of tax and insurance reserves',
                      'Vague jargon leaves buyers feeling anxious, distrustful, and disempowered'
                    ].map((point, i) => (
                      <li key={i} className="flex gap-2.5 items-start text-zinc-800 text-sm">
                        <span className="text-[#f3b23a] font-black">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Design Strategy */}
            <section className="space-y-6 pt-6">
              <div className="space-y-2">
                <span className="text-[#f3b23a] font-mono font-bold text-xs tracking-widest uppercase">02. USER FOCUS</span>
                <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 font-sans">Radical transparency over glossy pages.</h2>
              </div>
              <p className="text-base text-zinc-650 leading-relaxed font-light">
                We designed Homestead as an educational budget-mapping system. Instead of hiding transaction realities, it guides first-time buyers through a visually decomposed financial model. The interface calculates and explains closing fees, reserve thresholds, and tax variances, empowering buyers with authentic affordability planning before they speak to brokers.
              </p>
            </section>

            {/* Interactive Calculator widget */}
            <section className="space-y-6 pt-6">
              <div className="space-y-2">
                <span className="text-[#f3b23a] font-mono font-bold text-xs tracking-widest uppercase">03. INTERACTIVE PORTFOLIO WIDGET</span>
                <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 font-sans">Upfront and monthly cost calculator</h2>
                <p className="text-sm text-zinc-500 font-light">
                  Adjust the sliders to set a home price and down payment percentage. Watch how the real financial formulas dynamically calculate the required upfront cash reserves and a comprehensive monthly payment breakdown.
                </p>
              </div>

              {/* Calculator Box */}
              <div className="border border-zinc-200/80 rounded-[32px] overflow-hidden bg-white shadow-xl max-w-4xl mx-auto flex flex-col md:flex-row">
                {/* Inputs */}
                <div className="p-6 md:p-8 md:w-1/2 bg-zinc-50/50 space-y-6">
                  <span className="text-xs font-mono font-bold text-zinc-400 block uppercase">PLANNING CRITERIA</span>
                  
                  {/* Home Price Slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-zinc-700">Home Purchase Price</span>
                      <span className="font-mono font-bold text-[#a8740c] text-sm">${homesteadHomePrice.toLocaleString()}</span>
                    </div>
                    <input
                      type="range"
                      min={150000}
                      max={1200000}
                      step={10000}
                      value={homesteadHomePrice}
                      onChange={(e) => setHomesteadHomePrice(Number(e.target.value))}
                      className="w-full accent-[#f3b23a] h-1.5 bg-zinc-200 rounded-lg cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-zinc-400 font-mono">
                      <span>$150,000</span>
                      <span>$1,200,000</span>
                    </div>
                  </div>

                  {/* Down Payment Pct Slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-zinc-700">Down Payment Pct</span>
                      <span className="font-mono font-bold text-[#a8740c] text-sm">{homesteadDownPaymentPct}%</span>
                    </div>
                    <input
                      type="range"
                      min={3}
                      max={30}
                      step={1}
                      value={homesteadDownPaymentPct}
                      onChange={(e) => setHomesteadDownPaymentPct(Number(e.target.value))}
                      className="w-full accent-[#f3b23a] h-1.5 bg-zinc-200 rounded-lg cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-zinc-400 font-mono">
                      <span>3% (FHA Min)</span>
                      <span>30%</span>
                    </div>
                  </div>

                  {/* Financial metrics list */}
                  <div className="pt-4 border-t border-zinc-200/60 space-y-3 font-mono text-xs text-zinc-500">
                    <div className="flex justify-between">
                      <span>Principal Loan Amount:</span>
                      <span className="font-bold text-zinc-800">
                        ${(homesteadHomePrice * (1 - homesteadDownPaymentPct / 100)).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Est. Annual Property Tax (1.1%):</span>
                      <span className="font-bold text-zinc-800">
                        ${(homesteadHomePrice * 0.011).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Interest Rate Fixed:</span>
                      <span className="font-bold text-zinc-800">6.80% Fixed</span>
                    </div>
                  </div>
                </div>

                {/* Outputs Layout */}
                <div className="p-6 md:p-8 md:w-1/2 flex flex-col justify-between space-y-6">
                  {/* Calculations */}
                  {(() => {
                    // Math calculations
                    const loanAmount = homesteadHomePrice * (1 - homesteadDownPaymentPct / 100);
                    const downPayment = homesteadHomePrice * (homesteadDownPaymentPct / 100);
                    const closingCosts = homesteadHomePrice * 0.03; // 3% estimation
                    const escrowReserves = homesteadHomePrice * 0.012; // 1.2% estimation
                    const totalUpfront = downPayment + closingCosts + escrowReserves;

                    // Monthly Payment Formulas
                    const monthlyRate = 0.068 / 12;
                    const totalMonths = 360; // 30 Years
                    const principalInterest = loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / (Math.pow(1 + monthlyRate, totalMonths) - 1);
                    const monthlyTaxes = (homesteadHomePrice * 0.011) / 12;
                    const monthlyInsurance = 100;
                    const monthlyPmi = homesteadDownPaymentPct < 20 ? (loanAmount * 0.0075) / 12 : 0;
                    const totalMonthly = principalInterest + monthlyTaxes + monthlyInsurance + monthlyPmi;

                    return (
                      <div className="space-y-6">
                        {/* Section 1: Cash Needed Upfront */}
                        <div className="space-y-3">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-[#a8740c] font-mono flex items-center gap-1.5 border-b pb-1.5">
                            <Coins className="w-4 h-4" /> Upfront Cash Required
                          </h4>
                          <div className="bg-zinc-50 border border-zinc-150 p-4 rounded-2xl flex justify-between items-center shadow-2xs">
                            <div>
                              <span className="text-[10px] font-mono text-zinc-400 font-bold block">LIQUID CASH NEEDED</span>
                              <span className="text-2xl font-black font-sans text-zinc-950">${Math.round(totalUpfront).toLocaleString()}</span>
                            </div>
                            <span className="text-[9px] font-bold font-mono bg-[#f3b23a]/10 text-[#a8740c] px-2.5 py-1 rounded-md border border-[#f3b23a]/30">
                              Verified affordability
                            </span>
                          </div>

                          <div className="grid grid-cols-3 gap-2 font-mono text-[10px] text-zinc-500">
                            <div className="bg-zinc-50/50 p-2 border border-zinc-100 rounded-lg">
                              <span className="block font-bold">Down Payment</span>
                              <span className="text-zinc-800 font-black">${Math.round(downPayment).toLocaleString()}</span>
                            </div>
                            <div className="bg-zinc-50/50 p-2 border border-zinc-100 rounded-lg">
                              <span className="block font-bold">Closing Fees</span>
                              <span className="text-zinc-800 font-black">${Math.round(closingCosts).toLocaleString()}</span>
                            </div>
                            <div className="bg-zinc-50/50 p-2 border border-zinc-100 rounded-lg">
                              <span className="block font-bold">Escrow Reserves</span>
                              <span className="text-zinc-800 font-black">${Math.round(escrowReserves).toLocaleString()}</span>
                            </div>
                          </div>
                        </div>

                        {/* Section 2: Est Monthly Fee */}
                        <div className="space-y-3">
                          <h4 className="text-xs font-bold uppercase tracking-wider text-[#a8740c] font-mono flex items-center gap-1.5 border-b pb-1.5">
                            <Building className="w-4 h-4" /> Monthly Payment Breakdown
                          </h4>
                          <div className="bg-zinc-50 border border-zinc-150 p-4 rounded-2xl flex justify-between items-center shadow-2xs">
                            <div>
                              <span className="text-[10px] font-mono text-zinc-450 font-bold block">EST. TOTAL MONTHLY</span>
                              <span className="text-2xl font-black font-sans text-zinc-950">${Math.round(totalMonthly).toLocaleString()}/mo</span>
                            </div>
                          </div>

                          <div className="grid grid-cols-4 gap-1.5 font-mono text-[9px] text-zinc-500">
                            <div className="bg-zinc-50/50 p-1.5 border border-zinc-100 rounded-lg text-center">
                              <span className="block font-bold">P &amp; I</span>
                              <span className="text-zinc-800 font-semibold">${Math.round(principalInterest).toLocaleString()}</span>
                            </div>
                            <div className="bg-zinc-50/50 p-1.5 border border-zinc-100 rounded-lg text-center">
                              <span className="block font-bold">Taxes</span>
                              <span className="text-zinc-800 font-semibold">${Math.round(monthlyTaxes).toLocaleString()}</span>
                            </div>
                            <div className="bg-zinc-50/50 p-1.5 border border-zinc-100 rounded-lg text-center">
                              <span className="block font-bold">Insurance</span>
                              <span className="text-zinc-800 font-semibold">${monthlyInsurance}</span>
                            </div>
                            <div className="bg-zinc-50/50 p-1.5 border border-zinc-100 rounded-lg text-center">
                              <span className="block font-bold">PMI (Ins.)</span>
                              <span className={monthlyPmi > 0 ? 'text-amber-600 font-black' : 'text-zinc-400'}>
                                ${Math.round(monthlyPmi)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })()}

                  <div className="pt-4 border-t border-zinc-100 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-zinc-400 italic">HIPAA-free financial ledger</span>
                    <button 
                      onClick={() => alert('Affordability budget successfully saved to your Homestead dashboard.')}
                      className="bg-[#f3b23a] text-zinc-950 font-semibold font-mono text-xs px-5 py-2.5 rounded-full shadow-md hover:bg-[#e2a225] transition-all"
                    >
                      Save Affordable Plan
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Impact */}
            <section className="space-y-6 pt-6">
              <div className="space-y-2">
                <span className="text-[#f3b23a] font-mono font-bold text-xs tracking-widest uppercase">04. DELIVERED VALUE</span>
                <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 font-sans">Empowering first-time buyers.</h2>
              </div>
              <p className="text-base text-zinc-650 leading-relaxed font-light">
                By presenting financial realities clearly and explaining every line-item budget requirement beforehand, Homestead established high trust and psychological calm. Real homebuyers mapped their purchase plans confidently, completely avoiding closing day panic.
              </p>

              {/* Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-3 border border-zinc-150 rounded-[32px] overflow-hidden bg-zinc-50/50 shadow-2xs">
                {[
                  { val: "4.9/5", label: "User satisfaction score on budgeting clarity", clr: "text-[#a8740c]" },
                  { val: "12,000+", label: "Prospective first-time buyers budgeted", clr: "text-zinc-800" },
                  { val: "35%", label: "Increase in mortgage pre-approval completions", clr: "text-[#a8740c]" }
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
            </section>

            {/* Back Button */}
            <section className="py-4 text-center border-t border-zinc-100 mt-4">
              <div className="flex justify-center flex-col items-center gap-4">
                <Button onClick={onBack} className="px-8 h-12 rounded-full text-sm bg-zinc-950 text-white hover:bg-zinc-800 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md font-semibold border border-zinc-950">Explore other work</Button>
              </div>
            </section>
          </>
        )}

        {isNorthLight && (
          <>
            {/* Overview */}
            <section className="space-y-6">
              <div className="space-y-2">
                <span className="text-[#b31942] font-mono font-bold text-xs tracking-widest uppercase">01. THE ENTERPRISE PROBLEM</span>
                <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 font-sans">The 6-month developer stalemate.</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                <div className="space-y-4 text-base text-zinc-650 leading-relaxed font-light">
                  <p>
                    North Light builds grid telemetries for high-volume energy grids. During a product refresh cycle, development hit a critical block: the core dashboard layout was stuck in stakeholder conflict.
                  </p>
                  <p>
                    The power systems engineers wanted incredibly dense, granular telemetry data feeds — real-time waves, microsecond logs, and nested knobs. Meanwhile, the field technicians on physical grid platforms wore heavy gloves and operated in extreme cold; they demanded high-contrast, massive status banners and single-tap triggers, calling the engineers' layout "unusable clutter."
                  </p>
                </div>
                <div className="bg-[#b31942]/10 border border-[#b31942]/30 p-6 rounded-[28px] space-y-4 shadow-sm">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-[#9c1236] font-mono">Divergent Enterprise Needs</h4>
                  <ul className="space-y-3">
                    {[
                      'Control Room: Needs multi-series charts, microsecond frequency logs, and granular details',
                      'Field Platform: Needs high-contrast, glove-friendly giant alert tap zones',
                      'Development halted due to inability to agree on a single dashboard layout',
                      'High risk of critical power infrastructure terminal failures from usability lag'
                    ].map((point, i) => (
                      <li key={i} className="flex gap-2.5 items-start text-zinc-800 text-sm">
                        <span className="text-[#b31942] font-black">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Solution Strategy */}
            <section className="space-y-6 pt-6">
              <div className="space-y-2">
                <span className="text-[#b31942] font-mono font-bold text-xs tracking-widest uppercase">02. STRATEGIC INSIGHT</span>
                <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 font-sans">Modular Profile Switching.</h2>
              </div>
              <p className="text-base text-zinc-650 leading-relaxed font-light">
                Instead of forcing a compromise that satisfied neither stakeholder, I designed an adaptable modular widget dashboard with a top-level workspace profile switch. By toggling between Control Room Mode and Field Technician Mode, we preserved the precise telemetry layers for engineers while scaling active alerts for field platforms — utilizing a unified underlying codebase.
              </p>
            </section>

            {/* Interactive Widget Mode Swapper */}
            <section className="space-y-6 pt-6">
              <div className="space-y-2">
                <span className="text-[#b31942] font-mono font-bold text-xs tracking-widest uppercase">03. INTERACTIVE SIMULATOR</span>
                <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 font-sans">Unified Adaptable Telemetry Dashboard</h2>
                <p className="text-sm text-zinc-500 font-light">
                  Toggle the profile switch below to see how the dashboard transforms. Click "Trigger Frequency Spike" to see how the failure state is handled in each specific operational environment.
                </p>
              </div>

              {/* Mode Controller UI */}
              <div className="border border-zinc-200/80 rounded-[32px] overflow-hidden bg-white shadow-xl max-w-4xl mx-auto flex flex-col">
                {/* Switcher bar */}
                <div className="p-4 bg-zinc-950 text-white flex justify-between items-center border-b border-zinc-800">
                  <div className="flex gap-2 items-center">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#b31942] animate-pulse" />
                    <span className="text-xs font-mono font-bold tracking-wider uppercase">GRID telemetry: NORTH_LIGHT_GRID_A</span>
                  </div>
                  
                  {/* Toggles */}
                  <div className="flex bg-zinc-800 p-1 rounded-lg border border-zinc-700">
                    <button
                      onClick={() => setNorthLightMode('control')}
                      className={`text-[10px] font-mono font-bold px-3 py-1.5 rounded transition-all ${
                        northLightMode === 'control'
                          ? 'bg-[#b31942] text-white shadow'
                          : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      Control Room
                    </button>
                    <button
                      onClick={() => setNorthLightMode('field')}
                      className={`text-[10px] font-mono font-bold px-3 py-1.5 rounded transition-all ${
                        northLightMode === 'field'
                          ? 'bg-[#b31942] text-white shadow'
                          : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      Field Operator
                    </button>
                  </div>
                </div>

                {/* Dashboard Panel Viewport */}
                <div className="p-6 md:p-8 min-h-[320px] bg-zinc-50 flex flex-col justify-between">
                  {northLightMode === 'control' ? (
                    /* CONTROL ROOM MODE */
                    <div className="space-y-6">
                      <div className="flex justify-between items-center pb-3 border-b border-zinc-200">
                        <span className="text-xs font-mono font-bold text-zinc-500">CONTROL CENTER PANEL (DENSE DRAFT)</span>
                        <span className="text-[10px] bg-emerald-500/15 text-emerald-700 font-mono font-bold px-2 py-0.5 rounded border border-emerald-300">SYSTEM: NORMAL</span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {/* Dial 1 */}
                        <div className="bg-white border border-zinc-200 rounded-xl p-4 space-y-1 shadow-2xs">
                          <span className="text-[9px] font-mono text-zinc-400 font-bold block">GRID FREQUENCY</span>
                          <span className="text-lg font-mono font-black text-zinc-800">60.00 Hz</span>
                          <div className="h-1 w-full bg-zinc-150 rounded-full overflow-hidden mt-2">
                            <div className="h-full bg-emerald-500 w-3/5" />
                          </div>
                        </div>

                        {/* Dial 2 */}
                        <div className="bg-white border border-zinc-200 rounded-xl p-4 space-y-1 shadow-2xs">
                          <span className="text-[9px] font-mono text-zinc-400 font-bold block">THERMAL LOAD</span>
                          <span className="text-lg font-mono font-black text-zinc-800">42.4 °C</span>
                          <div className="h-1 w-full bg-zinc-150 rounded-full overflow-hidden mt-2">
                            <div className="h-full bg-emerald-500 w-2/5" />
                          </div>
                        </div>

                        {/* Dial 3 */}
                        <div className="bg-white border border-zinc-200 rounded-xl p-4 space-y-1 shadow-2xs">
                          <span className="text-[9px] font-mono text-zinc-400 font-bold block">VOLTAGE LEAKAGE</span>
                          <span className="text-lg font-mono font-black text-zinc-800">0.02 kV</span>
                          <div className="h-1 w-full bg-zinc-150 rounded-full overflow-hidden mt-2">
                            <div className="h-full bg-emerald-500 w-1/12" />
                          </div>
                        </div>
                      </div>

                      {/* SVG Live Looking Wavechart */}
                      <div className="bg-zinc-900 border border-zinc-850 p-4 rounded-xl space-y-2 text-white font-mono text-xs shadow-inner">
                        <span className="text-[9px] text-zinc-500 font-bold uppercase tracking-wider block">Real-time Oscilloscope Grid Feed</span>
                        <div className="h-24 w-full flex items-center justify-center relative overflow-hidden bg-black/40 rounded border border-zinc-800">
                          <svg className="w-full h-full text-emerald-500" viewBox="0 0 100 20" preserveAspectRatio="none">
                            <path d="M0,10 Q10,1 20,10 T40,10 T60,10 T80,10 T100,10" fill="none" stroke="currentColor" strokeWidth="0.8" className="animate-pulse" />
                          </svg>
                          <div className="absolute top-2 left-2 text-[9px] bg-black/50 px-1.5 py-0.5 rounded border border-zinc-800 text-zinc-500">60.00 Hz nominal</div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    /* FIELD TECHNICIAN MODE */
                    <div className="space-y-6">
                      <div className="flex justify-between items-center pb-3 border-b border-zinc-200">
                        <span className="text-xs font-mono font-bold text-zinc-500">FIELD GLOVE-FRIENDLY PANEL</span>
                        <span className="text-[10px] bg-zinc-950 text-white font-mono font-bold px-2 py-0.5 rounded">Glove-Fit active</span>
                      </div>

                      {/* Giant touch panels */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <button 
                          onClick={() => alert('Triggering physical on-site diagnostic suite')}
                          className="bg-[#b31942] hover:bg-[#9c1236] text-white rounded-2xl p-6 flex flex-col justify-between text-left h-36 shadow-lg border-2 border-white/20 active:scale-95 transition-all"
                        >
                          <span className="text-[10px] font-mono tracking-widest font-black uppercase text-white/60">Tap to Initiate</span>
                          <span className="text-2xl font-black font-sans leading-none">GRID DIAGNOSTIC</span>
                          <span className="text-[9px] font-mono text-white/50 block mt-2">Giant 44px+ click zone</span>
                        </button>

                        <button 
                          onClick={() => alert('Sending all current fault codes to Control Center via sat-relay')}
                          className="bg-zinc-900 hover:bg-zinc-800 text-white rounded-2xl p-6 flex flex-col justify-between text-left h-36 shadow-lg border-2 border-zinc-800 active:scale-95 transition-all"
                        >
                          <span className="text-[10px] font-mono tracking-widest font-black uppercase text-zinc-500">Status Nominal</span>
                          <span className="text-2xl font-black font-sans leading-none">REPORT NOMINAL</span>
                          <span className="text-[9px] font-mono text-zinc-400 block mt-2">Instant field sync</span>
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="pt-4 border-t border-zinc-200/60 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-zinc-400 italic">North Light Tactical Framework</span>
                    <button 
                      onClick={() => {
                        alert(`Alert triggered! Telemetry frequency spike reported at 62.4 Hz. ${
                          northLightMode === 'control' 
                            ? 'Cascading logs and frequency oscillation lines generated in Control Center.' 
                            : 'FIELD INTERFACE: Displaying large flashing warning cards on the tablet screen!'
                        }`);
                      }}
                      className="bg-[#b31942] text-white font-semibold font-mono text-xs px-5 py-2.5 rounded-full shadow-md hover:bg-[#9c1236] transition-all"
                    >
                      Trigger Frequency Spike (62.4 Hz)
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Outcome */}
            <section className="space-y-6 pt-6">
              <div className="space-y-2">
                <span className="text-[#b31942] font-mono font-bold text-xs tracking-widest uppercase">04. DELIVERED IMPACT</span>
                <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 font-sans">Stakeholder deadlock broken.</h2>
              </div>
              <p className="text-base text-zinc-650 leading-relaxed font-light">
                By presenting modular switching profile layers, we fully satisfied both engineering telemetry and on-field tactical demands. Stakeholders aligned within 2 workshops, accelerating product deployment with significant engineering overhead savings.
              </p>

              {/* Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-3 border border-zinc-150 rounded-[32px] overflow-hidden bg-zinc-50/50 shadow-2xs">
                {[
                  { val: "2", label: "Workshops to reach absolute layout alignment", clr: "text-[#b31942]" },
                  { val: "$300k", label: "Estimated development capital saved", clr: "text-zinc-800" },
                  { val: "4 mo", label: "Acceleration in product development lifecycle", clr: "text-[#b31942]" }
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
            </section>

            {/* Back Button */}
            <section className="py-4 text-center border-t border-zinc-100 mt-4">
              <div className="flex justify-center flex-col items-center gap-4">
                <Button onClick={onBack} className="px-8 h-12 rounded-full text-sm bg-zinc-950 text-white hover:bg-zinc-800 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md font-semibold border border-zinc-950">Explore other work</Button>
              </div>
            </section>
          </>
        )}

        {!isMyCampus && !isWalkForPlastic && !isPathwaysBadgeQuest && !isMotionDesign && !isParProductionControl && !isMeridianHealth && !isStylebook && !isHomestead && !isNorthLight && (
          <section className="py-4 text-center">
            <div className="flex justify-center">
              <Button onClick={onBack} className="px-8 h-12 rounded-full text-sm bg-zinc-950 text-white hover:bg-zinc-800 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md font-semibold border border-zinc-950">Explore other work</Button>
            </div>
          </section>
        )}
      </main>

      <footer className="max-w-5xl mx-auto px-6 py-12 border-t border-zinc-100 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex flex-col gap-2 items-center md:items-start">
          <div className="text-xl font-black tracking-tighter text-zinc-950">Tamizh</div>
          <div className="text-zinc-400 text-xs tracking-widest uppercase font-medium">Product Designer</div>
        </div>

        <div className="flex gap-8 text-sm font-medium">
          <a href="https://www.linkedin.com/in/tamizhselvan-u" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-red-500 transition-colors">LinkedIn</a>
          <a href="https://github.com/tamizhselvan018" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-red-500 transition-colors">GitHub</a>
          <a href="mailto:tamizhselvan018@gmail.com" className="text-zinc-500 hover:text-red-500 transition-colors">Email</a>
        </div>

        <div className="text-zinc-400 text-sm">© 2025 Tamizh. All rights reserved.</div>
      </footer>
      </div>
    </motion.div>
  );
};
