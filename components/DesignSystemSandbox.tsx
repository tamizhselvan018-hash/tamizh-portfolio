import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Upload, Plus, Trash2, Settings, Layers, Eye, Check, Compass, 
  HelpCircle, ChevronLeft, ChevronRight, Info, Sparkles, Smartphone, 
  Laptop, Type, Palette, Play, RotateCcw, Code, Copy, Sliders, X, AlertCircle
} from 'lucide-react';
import { Button } from './Button';

// Color contrast helper
interface ColorRGB { r: number; g: number; b: number; }

const hexToRgb = (hex: string): ColorRGB | null => {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  const fullHex = hex.replace(shorthandRegex, (_, r, g, b) => r + r + g + g + b + b);
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
};

const getRelativeLuminance = (rgb: ColorRGB): number => {
  const transform = (val: number) => {
    const s = val / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * transform(rgb.r) + 0.7152 * transform(rgb.g) + 0.0722 * transform(rgb.b);
};

const getContrastRatio = (color1: string, color2: string): number => {
  const rgb1 = hexToRgb(color1);
  const rgb2 = hexToRgb(color2);
  if (!rgb1 || !rgb2) return 1;
  const l1 = getRelativeLuminance(rgb1);
  const l2 = getRelativeLuminance(rgb2);
  const brighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (brighter + 0.05) / (darker + 0.05);
};

// Available pre-loaded design system colors
const SYSTEM_COLORS = [
  { name: 'Crimson Primary', hex: '#B31942', type: 'brand' },
  { name: 'Navy Brand Blue', hex: '#0A3161', type: 'brand' },
  { name: 'Dark Slate', hex: '#1A1A1A', type: 'neutral' },
  { name: 'Background Cream', hex: '#FAF9F6', type: 'neutral' },
  { name: 'Pure White', hex: '#FFFFFF', type: 'neutral' },
  { name: 'Zinc Gray', hex: '#71717A', type: 'neutral' },
  { name: 'Emerald Impact', hex: '#5A8C69', type: 'accent' },
  { name: 'Amber Warning', hex: '#F59E0B', type: 'accent' }
];

// Available stock screens from Tamizh's high-fidelity designs
const STOCK_SCREENS = [
  { id: 'wfp-feed', name: 'Walk For Plastic: Live Feed', url: '/public/screenshots/image_msg342_idx0.png', description: 'Main social impact feed detailing dynamic campaign actions and goals.', device: 'mobile' },
  { id: 'wfp-event', name: 'Walk For Plastic: Clean Beach', url: '/public/screenshots/image_msg346_idx0.png', description: 'Clean beach cleanup map details and coordinator briefing guide.', device: 'mobile' },
  { id: 'wfp-tree', name: 'Walk For Plastic: Green Growth', url: '/public/screenshots/image_msg346_idx1.png', description: 'Visualized individual progress with a growing digital cleanup tree.', device: 'mobile' },
  { id: 'wfp-contrib', name: 'Walk For Plastic: Plastic Ledger', url: '/public/screenshots/image_msg346_idx3.png', description: 'Input logs of materials collected showing dynamic user ledger entries.', device: 'mobile' },
  { id: 'wfp-chat', name: 'Walk For Plastic: Community Chat', url: '/public/screenshots/image_msg346_idx4.png', description: 'Real-time peer-to-peer and community organizer communication boards.', device: 'mobile' },
  { id: 'my-campus-home', name: 'My Campus: Personalised Portal', url: '/public/screenshots/image_msg351_idx0.png', description: 'Main academic dashboard showing unified student resources.', device: 'mobile' },
  { id: 'my-campus-course', name: 'My Campus: Course Registry', url: '/public/screenshots/image_msg351_idx1.png', description: 'Modern UI listing upcoming lectures, enrollment counters, and tasks.', device: 'mobile' },
  { id: 'my-campus-prof', name: 'My Campus: Faculty Lookup', url: '/public/screenshots/image_msg351_idx2.png', description: 'Seamless access cards highlighting professor research directories.', device: 'mobile' },
  { id: 'my-campus-careers', name: 'My Campus: Careers Guide', url: '/public/screenshots/image_msg351_idx3.png', description: 'Central opportunities panel containing career counseling channels.', device: 'mobile' },
  { id: 'pathways-board', name: 'Pathways Quest: Game Board', url: '/public/screenshots/image_msg364_idx0.png', description: 'Custom physical-virtual board game canvas illustrating progression.', device: 'tablet' },
  { id: 'pathways-rules', name: 'Pathways Quest: Quest Guide', url: '/public/screenshots/image_msg364_idx1.png', description: 'Interactive mobile rules overlays mapping gamified learning guides.', device: 'mobile' },
  { id: 'wfp-tracker', name: 'Walk For Plastic: Map Pathing', url: '/public/screenshots/screenshot_2026-03-22_at_2.44.57_pm_msg346_idx2.png', description: 'Interactive location maps guiding Chennai beach cleanups.', device: 'mobile' }
];

interface CustomHotspot {
  id: string;
  x: number; // percentage (0-100)
  y: number; // percentage (0-100)
  title: string;
  description: string;
  badge?: string;
}

export const DesignSystemSandbox: React.FC = () => {
  // Navigation tabs
  const [activeTab, setActiveTab] = useState<'screen-review' | 'design-tokens' | 'component-bench'>('screen-review');
  
  // Design Screens / Review States
  const [selectedScreen, setSelectedScreen] = useState<string>(STOCK_SCREENS[0].url);
  const [deviceWrapper, setDeviceWrapper] = useState<'mobile' | 'tablet' | 'browser'>('mobile');
  const [userUploadedUrl, setUserUploadedUrl] = useState<string | null>(null);
  
  // Hotspots / Annotations states
  const [hotspots, setHotspots] = useState<CustomHotspot[]>([
    { id: '1', x: 50, y: 15, title: 'Hero Branding Area', description: 'Clean primary brand typography using Space Grotesk tracking to reinforce modern aesthetic.', badge: 'Typography' },
    { id: '2', x: 25, y: 48, title: 'Visual Impact Card', description: 'Bento-style card using a subtle 1px border and custom drop shadow to group related content.', badge: 'Interaction' },
    { id: '3', x: 75, y: 88, title: 'Sticky Action Button', description: 'Primary action floats at the bottom to remain fully within natural reach. High contrast crimson background.', badge: 'Access' }
  ]);
  const [activeHotspotId, setActiveHotspotId] = useState<string | null>('1');
  const [newHotspotX, setNewHotspotX] = useState<number | null>(null);
  const [newHotspotY, setNewHotspotY] = useState<number | null>(null);
  
  // New hotspot input form state
  const [formTitle, setFormTitle] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formBadge, setFormBadge] = useState('Interaction');
  const [isAddingMode, setIsAddingMode] = useState(false);
  const [tourPlaying, setTourPlaying] = useState(false);
  const [tourInterval, setTourInterval] = useState<NodeJS.Timeout | null>(null);

  // File drag states
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  // Contrast checker states
  const [contrastFg, setContrastFg] = useState('#FFFFFF');
  const [contrastBg, setContrastBg] = useState('#B31942');

  // Typography interactive playground states
  const [typoText, setTypoText] = useState("Crafting interfaces that make technical workflows simple.");
  const [typoFont, setTypoFont] = useState<'sans' | 'display' | 'mono'>('sans');
  const [typoSize, setTypoSize] = useState<number>(32);
  const [typoSpacing, setTypoSpacing] = useState<string>('tracking-tight');
  const [typoLeading, setTypoLeading] = useState<string>('leading-snug');
  const [typoWeight, setTypoWeight] = useState<string>('font-medium');

  // Interactive component states
  const [btnText, setBtnText] = useState('Explore Projects');
  const [btnVariant, setBtnVariant] = useState<'primary' | 'secondary' | 'outline' | 'ghost'>('primary');
  const [btnState, setBtnState] = useState<'normal' | 'loading' | 'disabled'>('normal');
  const [chipState, setChipState] = useState<'Ready' | 'In production' | 'Blocked' | 'Pending'>('Ready');
  const [cardShadow, setCardShadow] = useState<'sm' | 'md' | 'lg' | 'none'>('md');
  const [cardBorder, setCardBorder] = useState<'none' | 'soft' | 'high-contrast' | 'dashed'>('soft');
  const [cardAnimateTrigger, setCardAnimateTrigger] = useState(false);

  // Handle uploaded screens
  const handleFiles = (files: FileList) => {
    if (files && files[0]) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          const url = e.target.result as string;
          setUserUploadedUrl(url);
          setSelectedScreen(url);
          // Auto switch to appropriate device mode based on name clues if possible
          if (file.name.toLowerCase().includes('board') || file.name.toLowerCase().includes('tablet')) {
            setDeviceWrapper('tablet');
          } else if (file.name.toLowerCase().includes('desktop') || file.name.toLowerCase().includes('browser')) {
            setDeviceWrapper('browser');
          } else {
            setDeviceWrapper('mobile');
          }
          // Clear current hotspots when a new custom screen is uploaded so they can build their own annotation map
          setHotspots([]);
          setActiveHotspotId(null);
          setIsAddingMode(true);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const onButtonClick = () => {
    fileInputRef.current?.click();
  };

  // Add hotspot by clicking on screenshot
  const handleImageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current) return;
    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setNewHotspotX(parseFloat(x.toFixed(1)));
    setNewHotspotY(parseFloat(y.toFixed(1)));
    setFormTitle(`Design Element ${hotspots.length + 1}`);
    setFormDesc('Describe the custom UX pattern, alignment or typography choices.');
    setIsAddingMode(true);
  };

  const saveHotspot = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle) return;

    const xVal = newHotspotX !== null ? newHotspotX : 50;
    const yVal = newHotspotY !== null ? newHotspotY : 50;

    const newHotspot: CustomHotspot = {
      id: Date.now().toString(),
      x: xVal,
      y: yVal,
      title: formTitle,
      description: formDesc,
      badge: formBadge
    };

    setHotspots([...hotspots, newHotspot]);
    setActiveHotspotId(newHotspot.id);
    setNewHotspotX(null);
    setNewHotspotY(null);
    setFormTitle('');
    setFormDesc('');
  };

  const deleteHotspot = (id: string) => {
    const updated = hotspots.filter(h => h.id !== id);
    setHotspots(updated);
    if (activeHotspotId === id) {
      setActiveHotspotId(updated[0]?.id || null);
    }
  };

  const playTour = () => {
    if (hotspots.length === 0) return;
    setTourPlaying(true);
    let currentIndex = hotspots.findIndex(h => h.id === activeHotspotId);
    if (currentIndex === -1) currentIndex = 0;

    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % hotspots.length;
      setActiveHotspotId(hotspots[currentIndex].id);
    }, 3000);

    setTourInterval(interval);
  };

  const stopTour = () => {
    if (tourInterval) {
      clearInterval(tourInterval);
      setTourInterval(null);
    }
    setTourPlaying(false);
  };

  // Cleanup tour on unmount
  useEffect(() => {
    return () => {
      if (tourInterval) clearInterval(tourInterval);
    };
  }, [tourInterval]);

  // Navigate annotations
  const nextHotspot = () => {
    if (hotspots.length === 0) return;
    const currIdx = hotspots.findIndex(h => h.id === activeHotspotId);
    const nextIdx = (currIdx + 1) % hotspots.length;
    setActiveHotspotId(hotspots[nextIdx].id);
  };

  const prevHotspot = () => {
    if (hotspots.length === 0) return;
    const currIdx = hotspots.findIndex(h => h.id === activeHotspotId);
    const prevIdx = (currIdx - 1 + hotspots.length) % hotspots.length;
    setActiveHotspotId(hotspots[prevIdx].id);
  };

  // Contrast score evaluation
  const contrastVal = getContrastRatio(contrastFg, contrastBg);
  const passesAALarge = contrastVal >= 3.0;
  const passesAANormal = contrastVal >= 4.5;
  const passesAAALarge = contrastVal >= 4.5;
  const passesAAANormal = contrastVal >= 7.0;

  return (
    <section className="bg-transparent border-t border-zinc-200" id="design-system-playground">
      <div className="max-w-6xl mx-auto px-6 py-24">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-red-500 font-medium uppercase tracking-[0.2em] text-[10px]">
              <span className="w-8 h-[1px] bg-red-200" />
              <span>Tamizh's Playground</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-zinc-900 leading-none">
              Design System Playground
            </h2>
            <p className="text-zinc-500 text-sm md:text-base max-w-2xl font-light">
              Review existing high-fidelity design screens or drag-and-drop your own files to inspect accessibility, explore live typography weights, and map dynamic hotspot guides.
            </p>
          </div>

          {/* Navigation Controls */}
          <div className="flex bg-zinc-100 p-1 rounded-xl self-stretch md:self-auto gap-1 border border-zinc-200/50">
            <button
              onClick={() => { setActiveTab('screen-review'); stopTour(); }}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                activeTab === 'screen-review' 
                  ? 'bg-white text-zinc-900 shadow-sm' 
                  : 'text-zinc-500 hover:text-zinc-800'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Review Screens</span>
            </button>
            <button
              onClick={() => { setActiveTab('design-tokens'); stopTour(); }}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                activeTab === 'design-tokens' 
                  ? 'bg-white text-zinc-900 shadow-sm' 
                  : 'text-zinc-500 hover:text-zinc-800'
              }`}
            >
              <Palette className="w-3.5 h-3.5" />
              <span>Design Tokens</span>
            </button>
            <button
              onClick={() => { setActiveTab('component-bench'); stopTour(); }}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                activeTab === 'component-bench' 
                  ? 'bg-white text-zinc-900 shadow-sm' 
                  : 'text-zinc-500 hover:text-zinc-800'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Interactive Sandbox</span>
            </button>
          </div>
        </div>

        {/* ==================== SCREEN REVIEW TAB ==================== */}
        {activeTab === 'screen-review' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Frame: Device interactive frame (7 Cols) */}
            <div className="lg:col-span-7 flex flex-col items-center">
              {/* Responsive Size Selectors */}
              <div className="flex items-center gap-3 mb-4 bg-zinc-100 p-1 border border-zinc-200 rounded-lg">
                <button 
                  onClick={() => setDeviceWrapper('mobile')}
                  className={`p-1.5 rounded-md flex items-center gap-1 text-[10px] font-mono font-bold tracking-wider ${
                    deviceWrapper === 'mobile' ? 'bg-white text-zinc-950 shadow-sm' : 'text-zinc-500 hover:text-zinc-800'
                  }`}
                  title="Mobile phone view"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>PHONE</span>
                </button>
                <button 
                  onClick={() => setDeviceWrapper('tablet')}
                  className={`p-1.5 rounded-md flex items-center gap-1 text-[10px] font-mono font-bold tracking-wider ${
                    deviceWrapper === 'tablet' ? 'bg-white text-zinc-950 shadow-sm' : 'text-zinc-500 hover:text-zinc-800'
                  }`}
                  title="Tablet view"
                >
                  <Laptop className="w-3.5 h-3.5" />
                  <span>TABLET</span>
                </button>
              </div>

              {/* Upload Drag & Drop Area */}
              <div 
                className={`w-full max-w-full relative transition-all duration-300 ${
                  dragActive ? 'scale-98 border-2 border-dashed border-red-500' : ''
                }`}
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
              >
                {/* Real hidden file input */}
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept="image/*" 
                  onChange={(e) => e.target.files && handleFiles(e.target.files)} 
                />

                {/* Device container */}
                <div className="flex justify-center w-full">
                  {deviceWrapper === 'mobile' ? (
                    /* PHONE WRAPPER */
                    <div className="relative w-full max-w-[340px] aspect-[9/18.5] bg-zinc-950 rounded-[44px] p-3 shadow-2xl border-[4px] border-zinc-800 flex flex-col">
                      {/* Notch */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-zinc-950 rounded-b-2xl z-40 flex items-center justify-center">
                        <div className="w-12 h-1 bg-zinc-800 rounded-full mb-1" />
                        <div className="w-2.5 h-2.5 bg-zinc-900 rounded-full absolute right-6 top-1.5" />
                      </div>
                      
                      {/* Inner screen frame */}
                      <div 
                        ref={imageContainerRef}
                        onClick={handleImageClick}
                        className="w-full h-full bg-zinc-100 rounded-[34px] overflow-hidden relative cursor-crosshair group z-10 border border-zinc-900"
                      >
                        <img 
                          src={selectedScreen} 
                          alt="Playground View" 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover select-none pointer-events-none"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?auto=format&fit=crop&q=80&w=600";
                          }}
                        />

                        {/* Rendering Active Hotspots */}
                        {hotspots.map((h, idx) => {
                          const isActive = h.id === activeHotspotId;
                          return (
                            <button
                              key={h.id}
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveHotspotId(h.id);
                                setIsAddingMode(false);
                              }}
                              className="absolute z-20 -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 focus:outline-none"
                              style={{ left: `${h.x}%`, top: `${h.y}%` }}
                            >
                              <span className={`absolute -inset-3 rounded-full transition-all duration-300 ${
                                isActive ? 'bg-red-500/20 ring-4 ring-red-500/10 scale-110 opacity-100 animate-pulse' : 'bg-transparent opacity-0'
                              }`} />
                              <span className={`flex items-center justify-center w-5.5 h-5.5 rounded-full border-2 text-[10px] font-sans font-bold shadow-lg transition-all duration-300 ${
                                isActive ? 'bg-red-600 border-white text-white scale-110' : 'bg-white border-zinc-400 text-zinc-700 hover:bg-zinc-50'
                              }`}>
                                {idx + 1}
                              </span>
                            </button>
                          );
                        })}

                        {/* Visual guide ring for new placement click */}
                        {newHotspotX !== null && newHotspotY !== null && (
                          <div 
                            className="absolute z-30 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-2 border-dashed border-red-500 bg-red-100/40 animate-ping pointer-events-none"
                            style={{ left: `${newHotspotX}%`, top: `${newHotspotY}%` }}
                          />
                        )}

                        {/* Hotspot Instructions Overlay on empty sandbox */}
                        {hotspots.length === 0 && !newHotspotX && (
                          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex flex-col items-center justify-center p-6 text-center text-white">
                            <Compass className="w-10 h-10 text-red-400 mb-3 animate-bounce" />
                            <h4 className="font-bold text-sm">Add custom hotspots</h4>
                            <p className="text-[10px] text-zinc-300 mt-1 max-w-[200px]">
                              Click anywhere on this screen layout to pin interactive notes, or drag-and-drop your own design screen!
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    /* TABLET WRAPPER */
                    <div className="relative w-full max-w-[580px] aspect-[14/10] bg-zinc-950 rounded-[32px] p-3.5 shadow-2xl border-[4px] border-zinc-800 flex flex-col">
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-zinc-900 rounded-full" />
                      
                      {/* Inner tablet screen */}
                      <div 
                        ref={imageContainerRef}
                        onClick={handleImageClick}
                        className="w-full h-full bg-zinc-100 rounded-[22px] overflow-hidden relative cursor-crosshair group z-10 border border-zinc-900"
                      >
                        <img 
                          src={selectedScreen} 
                          alt="Playground Tablet View" 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover select-none pointer-events-none"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&q=80&w=800";
                          }}
                        />

                        {/* Stored Hotspots */}
                        {hotspots.map((h, idx) => {
                          const isActive = h.id === activeHotspotId;
                          return (
                            <button
                              key={h.id}
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveHotspotId(h.id);
                                setIsAddingMode(false);
                              }}
                              className="absolute z-20 -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 focus:outline-none"
                              style={{ left: `${h.x}%`, top: `${h.y}%` }}
                            >
                              <span className={`absolute -inset-3 rounded-full transition-all duration-300 ${
                                isActive ? 'bg-red-500/20 ring-4 ring-red-500/10 scale-110 opacity-100 animate-pulse' : 'bg-transparent opacity-0'
                              }`} />
                              <span className={`flex items-center justify-center w-5.5 h-5.5 rounded-full border-2 text-[10px] font-sans font-bold shadow-lg transition-all duration-300 ${
                                isActive ? 'bg-red-600 border-white text-white scale-110' : 'bg-white border-zinc-400 text-zinc-700 hover:bg-zinc-50'
                              }`}>
                                {idx + 1}
                              </span>
                            </button>
                          );
                        })}

                        {/* Click guide ring */}
                        {newHotspotX !== null && newHotspotY !== null && (
                          <div 
                            className="absolute z-30 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full border-2 border-dashed border-red-500 bg-red-100/40 animate-ping pointer-events-none"
                            style={{ left: `${newHotspotX}%`, top: `${newHotspotY}%` }}
                          />
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Overlaid drag handle trigger */}
                {dragActive && (
                  <div className="absolute inset-0 bg-red-50/90 border border-dashed border-red-500 rounded-[32px] flex flex-col items-center justify-center z-50 p-6 pointer-events-none">
                    <Upload className="w-12 h-12 text-red-500 animate-bounce mb-3" />
                    <p className="font-sans font-bold text-red-950 text-lg">Drop your screen file here</p>
                    <p className="text-zinc-500 text-xs mt-1">Accepts PNG, JPG, WebP formats</p>
                  </div>
                )}
              </div>

              {/* Upload Action Strip */}
              <div className="mt-6 flex flex-wrap items-center justify-center gap-4 w-full">
                <Button variant="outline" className="text-xs h-10 px-5 font-bold cursor-pointer" onClick={onButtonClick}>
                  <Upload className="w-3.5 h-3.5" />
                  <span>UPLOAD CUSTOM SCREEN</span>
                </Button>
                {userUploadedUrl && (
                  <button 
                    onClick={() => {
                      setUserUploadedUrl(null);
                      setSelectedScreen(STOCK_SCREENS[0].url);
                      setDeviceWrapper('mobile');
                      setHotspots([
                        { id: '1', x: 50, y: 15, title: 'Hero Branding Area', description: 'Clean primary brand typography using Space Grotesk tracking to reinforce modern aesthetic.', badge: 'Typography' },
                        { id: '2', x: 25, y: 48, title: 'Visual Impact Card', description: 'Bento-style card using a subtle 1px border and custom drop shadow to group related content.', badge: 'Interaction' },
                        { id: '3', x: 75, y: 88, title: 'Sticky Action Button', description: 'Primary action floats at the bottom to remain fully within natural reach. High contrast crimson background.', badge: 'Access' }
                      ]);
                      setActiveHotspotId('1');
                    }}
                    className="text-xs font-semibold text-zinc-500 hover:text-red-500 transition-colors flex items-center gap-1 cursor-pointer font-mono"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>RESTORE STOCK SAMPLES</span>
                  </button>
                )}
              </div>
            </div>

            {/* Right Panel: Metadata & Tour config (5 Cols) */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Hotspot details card */}
              <div className="bg-white border border-zinc-200/80 p-6 rounded-3xl shadow-sm space-y-5">
                <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
                  <div className="flex items-center gap-2">
                    <Compass className="w-4 h-4 text-red-500" />
                    <span className="font-bold text-sm tracking-tight text-zinc-900">Annotation Details</span>
                  </div>
                  
                  {/* Tour playing buttons */}
                  <div className="flex items-center gap-1.5">
                    {tourPlaying ? (
                      <button 
                        onClick={stopTour}
                        className="px-2.5 py-1 rounded bg-zinc-900 text-white font-mono text-[9px] font-bold flex items-center gap-1 shadow-sm transition-all"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-ping" />
                        <span>STOP TOUR</span>
                      </button>
                    ) : (
                      <button 
                        onClick={playTour}
                        disabled={hotspots.length === 0}
                        className="px-2.5 py-1 rounded bg-zinc-100 hover:bg-zinc-200 border border-zinc-200 text-zinc-700 font-mono text-[9px] font-bold flex items-center gap-1 cursor-pointer"
                        title="Auto cycle tour"
                      >
                        <Play className="w-2.5 h-2.5" />
                        <span>PLAY TOUR</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Hotspot details body */}
                <div className="min-h-[140px] flex flex-col justify-between">
                  <AnimatePresence mode="wait">
                    {activeHotspotId && hotspots.find(h => h.id === activeHotspotId) ? (
                      (() => {
                        const h = hotspots.find(h => h.id === activeHotspotId)!;
                        const idx = hotspots.indexOf(h);
                        return (
                          <motion.div
                            key={h.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-3"
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="w-6 h-6 rounded-full bg-red-600 text-white font-mono font-bold text-xs flex items-center justify-center">
                                  {idx + 1}
                                </span>
                                {h.badge && (
                                  <span className="text-[9px] font-mono uppercase bg-red-50 text-red-700 font-extrabold px-2 py-0.5 rounded border border-red-100">
                                    {h.badge}
                                  </span>
                                )}
                              </div>
                              <button 
                                onClick={() => deleteHotspot(h.id)}
                                className="p-1 text-zinc-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
                                title="Remove hotspot"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>

                            <h4 className="text-base font-extrabold text-zinc-900 tracking-tight">{h.title}</h4>
                            <p className="text-zinc-650 text-xs font-light leading-relaxed">{h.description}</p>
                            
                            <div className="pt-2 text-[9px] font-mono text-zinc-400 flex gap-4">
                              <span>X: {h.x}%</span>
                              <span>Y: {h.y}%</span>
                            </div>
                          </motion.div>
                        );
                      })()
                    ) : (
                      <div className="flex flex-col items-center justify-center text-zinc-400 py-8 text-center">
                        <HelpCircle className="w-8 h-8 text-zinc-300 mb-2" />
                        <p className="text-xs">No active hotspot selected.</p>
                        <p className="text-[10px] text-zinc-400 mt-1 max-w-[240px]">Click any of the numbers on the phone mock, or click the image to place a new one.</p>
                      </div>
                    )}
                  </AnimatePresence>

                  {/* Hotspot navigator controls */}
                  {hotspots.length > 0 && (
                    <div className="flex items-center gap-2 pt-5 border-t border-zinc-100 mt-5">
                      <button 
                        onClick={prevHotspot}
                        className="flex-1 py-1.5 px-3 bg-zinc-50 border border-zinc-200 hover:bg-zinc-100 rounded-lg text-[10px] font-mono font-bold tracking-wider text-zinc-600 flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <ChevronLeft className="w-3 h-3" />
                        <span>PREV</span>
                      </button>
                      <button 
                        onClick={nextHotspot}
                        className="flex-1 py-1.5 px-3 bg-zinc-900 hover:bg-zinc-850 rounded-lg text-[10px] font-mono font-bold tracking-wider text-white flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <span>NEXT</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Add Custom Annotation Overlay Form */}
              {isAddingMode && (
                <div className="bg-red-50/50 border border-red-100 p-6 rounded-3xl space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-red-800 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{newHotspotX !== null ? 'Configure Hotspot' : 'Annotation Guide'}</span>
                    </h4>
                    {newHotspotX !== null && (
                      <button 
                        onClick={() => { setNewHotspotX(null); setNewHotspotY(null); }}
                        className="p-1 hover:bg-red-100 rounded text-red-800 transition-all cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {newHotspotX !== null && newHotspotY !== null ? (
                    <form onSubmit={saveHotspot} className="space-y-3">
                      <div>
                        <label className="block text-[10px] font-mono font-bold uppercase text-zinc-500 mb-1">HOTSPOT TITLE</label>
                        <input 
                          type="text" 
                          required 
                          placeholder="e.g., Grid Alignment" 
                          className="w-full text-xs p-2 bg-white border border-red-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500"
                          value={formTitle}
                          onChange={(e) => setFormTitle(e.target.value)}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-[10px] font-mono font-bold uppercase text-zinc-500 mb-1">EXPLANATION</label>
                        <textarea 
                          rows={2.5} 
                          required
                          placeholder="Details about specific microcopy, responsive layouts, or interactive triggers." 
                          className="w-full text-xs p-2 bg-white border border-red-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500 resize-none font-light"
                          value={formDesc}
                          onChange={(e) => setFormDesc(e.target.value)}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[10px] font-mono font-bold uppercase text-zinc-500 mb-1">TAG / TYPE</label>
                          <select 
                            className="w-full text-[11px] p-2 bg-white border border-red-200 rounded-lg focus:outline-none font-mono"
                            value={formBadge}
                            onChange={(e) => setFormBadge(e.target.value)}
                          >
                            <option value="Typography">Typography</option>
                            <option value="Interaction">Interaction</option>
                            <option value="Color">Color</option>
                            <option value="Layout">Layout</option>
                            <option value="Access">Access</option>
                          </select>
                        </div>
                        <div className="flex items-end">
                          <button 
                            type="submit" 
                            className="w-full py-2 bg-red-600 hover:bg-red-700 text-white font-mono text-[10px] font-bold rounded-lg tracking-wider transition-all cursor-pointer h-9 shadow-sm"
                          >
                            SAVE HOTSPOT
                          </button>
                        </div>
                      </div>
                    </form>
                  ) : (
                    <p className="text-zinc-650 text-xs font-light leading-relaxed">
                      Click directly on the image screen preview to pin a new annotation hotspot. You can fully document alignment guidelines, component specs, or custom flows.
                    </p>
                  )}
                </div>
              )}

              {/* High-Fidelity Screens Stock Selector */}
              <div className="bg-white border border-zinc-200/85 p-6 rounded-3xl shadow-sm space-y-4">
                <div className="flex items-center gap-2 border-b border-zinc-100 pb-3">
                  <Layers className="w-4 h-4 text-zinc-400" />
                  <span className="font-bold text-sm tracking-tight text-zinc-900">Pre-loaded Case Screens</span>
                </div>

                <div className="max-h-[170px] overflow-y-auto pr-1 space-y-1.5 no-scrollbar">
                  {STOCK_SCREENS.map((screen) => {
                    const isSelected = selectedScreen === screen.url;
                    return (
                      <button
                        key={screen.id}
                        onClick={() => {
                          setSelectedScreen(screen.url);
                          setDeviceWrapper(screen.device as any);
                          // Clear custom adding placeholders
                          setNewHotspotX(null);
                          setNewHotspotY(null);
                          setIsAddingMode(false);
                          
                          // Load preset hotspots based on selection to give dynamic experience
                          if (screen.id.startsWith('wfp')) {
                            setHotspots([
                              { id: '1', x: 50, y: 15, title: 'Branded Layout Headers', description: 'Prominent custom status tracking utilizing brand standard layout margins.', badge: 'Layout' },
                              { id: '2', x: 42, y: 44, title: 'Active Contributions Counter', description: 'Bold numerical impact units keeping environmental tracking physical.', badge: 'Interaction' },
                              { id: '3', x: 50, y: 84, title: 'Central Call-To-Action', description: 'Streamlined input flows with prominent rounded action keys.', badge: 'Interaction' }
                            ]);
                          } else if (screen.id.startsWith('my-campus')) {
                            setHotspots([
                              { id: '1', x: 15, y: 10, title: 'Profile Micro-context', description: 'Simple user-centric profile headers ensuring instant context.', badge: 'Access' },
                              { id: '2', x: 50, y: 55, title: 'Interconnected Information Cards', description: 'Bento-style card configurations offering direct department links.', badge: 'Layout' },
                              { id: '3', x: 80, y: 92, title: 'Bottom Tabbed Navigator', description: 'Thumb-friendly navigation system simplifying complex university pathways.', badge: 'Interaction' }
                            ]);
                          } else {
                            setHotspots([
                              { id: '1', x: 50, y: 25, title: 'Core Interface Node', description: 'Clear interactive nodes matching virtual game progress with physical playboards.', badge: 'Layout' }
                            ]);
                          }
                          setActiveHotspotId('1');
                        }}
                        className={`w-full text-left p-2.5 rounded-xl border transition-all text-xs flex justify-between items-center group cursor-pointer ${
                          isSelected 
                            ? 'bg-red-50 border-red-200 text-red-950 font-semibold' 
                            : 'bg-zinc-50 hover:bg-zinc-100 border-zinc-150 text-zinc-650'
                        }`}
                      >
                        <div className="truncate pr-4">
                          <p className="truncate font-sans">{screen.name}</p>
                          <p className={`text-[9px] truncate font-light ${isSelected ? 'text-red-700' : 'text-zinc-400'}`}>
                            {screen.description}
                          </p>
                        </div>
                        <span className="text-[8px] font-mono border px-1.5 py-0.5 rounded uppercase font-bold shrink-0">
                          {screen.device}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ==================== DESIGN TOKENS TAB ==================== */}
        {activeTab === 'design-tokens' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Color Swatch Panel (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Palette Grid */}
              <div className="bg-white border border-zinc-200/80 p-6 rounded-3xl shadow-sm space-y-6">
                <div>
                  <h3 className="font-extrabold text-lg text-zinc-900 tracking-tight flex items-center gap-2">
                    <Palette className="w-5 h-5 text-red-500" />
                    <span>System Color Palette</span>
                  </h3>
                  <p className="text-zinc-500 text-xs font-light mt-1">
                    Click any color swatch to automatically copy the hexadecimal token to your clipboard.
                  </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {SYSTEM_COLORS.map((color) => {
                    const isBgSelected = contrastBg === color.hex;
                    const isFgSelected = contrastFg === color.hex;
                    return (
                      <div 
                        key={color.name}
                        onClick={() => {
                          // Copy to clipboard
                          navigator.clipboard.writeText(color.hex);
                        }}
                        className="group border border-zinc-200/60 rounded-2xl overflow-hidden bg-zinc-50/50 cursor-pointer hover:shadow-md hover:border-zinc-300 transition-all text-center flex flex-col justify-between"
                      >
                        {/* Swatch color bubble */}
                        <div 
                          className="h-20 w-full relative transition-all duration-300 flex items-end justify-between p-2"
                          style={{ backgroundColor: color.hex }}
                        >
                          <span className="text-[8px] font-mono font-bold uppercase bg-black/40 text-white px-1.5 py-0.5 rounded select-none">
                            {color.type}
                          </span>
                        </div>
                        
                        {/* Meta text */}
                        <div className="p-3 text-left space-y-1 bg-white">
                          <p className="font-bold text-zinc-900 text-[11px] truncate leading-tight">{color.name}</p>
                          <p className="text-zinc-400 font-mono text-[9px] uppercase">{color.hex}</p>
                          
                          {/* Accessibility Test Shortcuts */}
                          <div className="flex gap-1.5 pt-2 border-t border-zinc-50 mt-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setContrastBg(color.hex);
                              }}
                              className={`flex-1 text-[8px] font-mono font-bold py-0.5 border rounded uppercase ${
                                isBgSelected ? 'bg-zinc-900 text-white border-zinc-900' : 'bg-zinc-50 border-zinc-200 text-zinc-500 hover:bg-zinc-100'
                              }`}
                            >
                              SET BG
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setContrastFg(color.hex);
                              }}
                              className={`flex-1 text-[8px] font-mono font-bold py-0.5 border rounded uppercase ${
                                isFgSelected ? 'bg-zinc-900 text-white border-zinc-900' : 'bg-zinc-50 border-zinc-200 text-zinc-500 hover:bg-zinc-100'
                              }`}
                            >
                              SET FG
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Interactive Typography Playground */}
              <div className="bg-white border border-zinc-200/80 p-6 rounded-3xl shadow-sm space-y-6">
                <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 border-b border-zinc-100 pb-4">
                  <div>
                    <h3 className="font-extrabold text-lg text-zinc-900 tracking-tight flex items-center gap-2">
                      <Type className="w-5 h-5 text-zinc-400" />
                      <span>Typography Tester</span>
                    </h3>
                    <p className="text-zinc-500 text-xs font-light mt-1">Explore custom scales and layouts.</p>
                  </div>

                  {/* Font Family Selector */}
                  <div className="flex bg-zinc-100 p-1 rounded-lg gap-1 border border-zinc-200/50 self-start">
                    <button
                      onClick={() => setTypoFont('display')}
                      className={`px-2.5 py-1 rounded text-[10px] font-mono font-bold ${
                        typoFont === 'display' ? 'bg-white text-zinc-900 shadow-xs' : 'text-zinc-500'
                      }`}
                    >
                      DISPLAY (Playfair)
                    </button>
                    <button
                      onClick={() => setTypoFont('sans')}
                      className={`px-2.5 py-1 rounded text-[10px] font-mono font-bold ${
                        typoFont === 'sans' ? 'bg-white text-zinc-900 shadow-xs' : 'text-zinc-500'
                      }`}
                    >
                      SANS (Inter)
                    </button>
                    <button
                      onClick={() => setTypoFont('mono')}
                      className={`px-2.5 py-1 rounded text-[10px] font-mono font-bold ${
                        typoFont === 'mono' ? 'bg-white text-zinc-900 shadow-xs' : 'text-zinc-500'
                      }`}
                    >
                      MONO (JetBrains)
                    </button>
                  </div>
                </div>

                {/* Typography live preview canvas */}
                <div className="p-6 bg-[#FAF9F6] border border-zinc-250/60 rounded-2xl min-h-[140px] flex items-center justify-center">
                  <div 
                    className={`w-full max-w-xl text-center leading-normal transition-all ${
                      typoFont === 'display' ? 'font-playfair italic' : typoFont === 'mono' ? 'font-mono' : 'font-sans'
                    } ${typoSpacing} ${typoLeading} ${typoWeight}`}
                    style={{ fontSize: `${typoSize}px` }}
                  >
                    {typoText}
                  </div>
                </div>

                {/* Typography controls sliders */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  <div className="space-y-4">
                    {/* Size slider */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center text-[10px] font-mono font-bold uppercase text-zinc-500">
                        <span>FONT SIZE</span>
                        <span className="text-zinc-800">{typoSize}px</span>
                      </div>
                      <input 
                        type="range" 
                        min="14" 
                        max="72" 
                        className="w-full h-1.5 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-red-600"
                        value={typoSize}
                        onChange={(e) => setTypoSize(parseInt(e.target.value))}
                      />
                    </div>

                    {/* Weight Selector */}
                    <div className="space-y-1.5">
                      <span className="block text-[10px] font-mono font-bold uppercase text-zinc-500">FONT WEIGHT</span>
                      <div className="grid grid-cols-3 gap-1">
                        {['font-light', 'font-normal', 'font-bold'].map((weight) => (
                          <button
                            key={weight}
                            onClick={() => setTypoWeight(weight)}
                            className={`py-1 text-[10px] font-mono border rounded transition-all uppercase font-bold ${
                              typoWeight === weight ? 'bg-zinc-900 text-white border-zinc-900' : 'bg-zinc-50 text-zinc-500 border-zinc-200 hover:bg-zinc-100'
                            }`}
                          >
                            {weight.replace('font-', '')}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {/* Tracking / Spacing selector */}
                    <div className="space-y-1.5">
                      <span className="block text-[10px] font-mono font-bold uppercase text-zinc-500">LETTER SPACING</span>
                      <div className="grid grid-cols-3 gap-1">
                        {['tracking-tight', 'tracking-normal', 'tracking-widest'].map((tracking) => (
                          <button
                            key={tracking}
                            onClick={() => setTypoSpacing(tracking)}
                            className={`py-1 text-[10px] font-mono border rounded transition-all uppercase font-bold ${
                              typoSpacing === tracking ? 'bg-zinc-900 text-white border-zinc-900' : 'bg-zinc-50 text-zinc-500 border-zinc-200 hover:bg-zinc-100'
                            }`}
                          >
                            {tracking.replace('tracking-', '')}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Custom text input */}
                    <div className="space-y-1.5">
                      <label className="block text-[10px] font-mono font-bold uppercase text-zinc-500">CUSTOM TEXT STUB</label>
                      <input 
                        type="text" 
                        className="w-full text-xs p-2 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none"
                        value={typoText}
                        onChange={(e) => setTypoText(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Panel: Accessibility & contrast analysis (5 Cols) */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Accessibility / Contrast Calculator */}
              <div className="bg-white border border-zinc-200/80 p-6 rounded-3xl shadow-sm space-y-6">
                <div>
                  <h3 className="font-extrabold text-sm tracking-tight text-zinc-900 flex items-center gap-1.5">
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>WCAG Accessibility Analyzer</span>
                  </h3>
                  <p className="text-zinc-500 text-xs font-light mt-1">
                    Inspecting color contrast conformance values. Use the palette shortcuts to test specific combinations.
                  </p>
                </div>

                {/* Live Preview Block */}
                <div 
                  className="p-6 rounded-2xl flex flex-col justify-center items-center text-center transition-all duration-300 min-h-[120px] border border-zinc-200/40 shadow-inner"
                  style={{ backgroundColor: contrastBg, color: contrastFg }}
                >
                  <p className="text-xl font-bold font-sans">Dynamic Contrast Preview</p>
                  <p className="text-xs font-light mt-1 max-w-[280px]">
                    "Design is not just what it looks like and feels like. Design is how it works." — Steve Jobs
                  </p>
                </div>

                {/* Hex Inputs Row */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="block text-[10px] font-mono font-bold uppercase text-zinc-500">FOREGROUND</label>
                    <div className="flex items-center bg-zinc-50 border border-zinc-200 rounded-lg p-1.5">
                      <div className="w-4 h-4 rounded border border-zinc-300 mr-2 shrink-0" style={{ backgroundColor: contrastFg }} />
                      <input 
                        type="text" 
                        className="w-full text-xs bg-transparent border-none outline-none font-mono uppercase"
                        value={contrastFg}
                        onChange={(e) => setContrastFg(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[10px] font-mono font-bold uppercase text-zinc-500">BACKGROUND</label>
                    <div className="flex items-center bg-zinc-50 border border-zinc-200 rounded-lg p-1.5">
                      <div className="w-4 h-4 rounded border border-zinc-300 mr-2 shrink-0" style={{ backgroundColor: contrastBg }} />
                      <input 
                        type="text" 
                        className="w-full text-xs bg-transparent border-none outline-none font-mono uppercase"
                        value={contrastBg}
                        onChange={(e) => setContrastBg(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Contrast Score Meter */}
                <div className="bg-zinc-50 border border-zinc-150 p-4 rounded-xl flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-[9px] font-mono text-zinc-400 block font-bold uppercase tracking-wider">CONTRAST RATIO</span>
                    <span className={`text-2xl font-black tabular-nums tracking-tight ${contrastVal >= 4.5 ? 'text-zinc-900' : 'text-red-600'}`}>
                      {contrastVal.toFixed(2)}:1
                    </span>
                  </div>
                  <div className="text-right">
                    <span className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      contrastVal >= 4.5 ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-red-50 text-red-700 border border-red-100'
                    }`}>
                      {contrastVal >= 7.0 ? 'EXCELLENT (AAA)' : contrastVal >= 4.5 ? 'PASS (AA)' : 'FAIL'}
                    </span>
                  </div>
                </div>

                {/* Score breakdown metrics list */}
                <div className="space-y-2 pt-2 border-t border-zinc-100">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-zinc-500 font-light">AA Standard (Normal Text)</span>
                    <div className="flex items-center gap-1.5 font-bold font-mono text-[10px]">
                      <span>4.5:1</span>
                      {passesAANormal ? (
                        <span className="text-emerald-600 flex items-center gap-0.5 bg-emerald-50 px-1 rounded">PASS</span>
                      ) : (
                        <span className="text-red-600 flex items-center gap-0.5 bg-red-50 px-1 rounded">FAIL</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-zinc-500 font-light">AAA Standard (Normal Text)</span>
                    <div className="flex items-center gap-1.5 font-bold font-mono text-[10px]">
                      <span>7.0:1</span>
                      {passesAAANormal ? (
                        <span className="text-emerald-600 flex items-center gap-0.5 bg-emerald-50 px-1 rounded">PASS</span>
                      ) : (
                        <span className="text-red-600 flex items-center gap-0.5 bg-red-50 px-1 rounded">FAIL</span>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-xs">
                    <span className="text-zinc-500 font-light">AA Standard (Large Text)</span>
                    <div className="flex items-center gap-1.5 font-bold font-mono text-[10px]">
                      <span>3.0:1</span>
                      {passesAALarge ? (
                        <span className="text-emerald-600 flex items-center gap-0.5 bg-emerald-50 px-1 rounded">PASS</span>
                      ) : (
                        <span className="text-red-600 flex items-center gap-0.5 bg-red-50 px-1 rounded">FAIL</span>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-xs">
                    <span className="text-zinc-500 font-light">AAA Standard (Large Text)</span>
                    <div className="flex items-center gap-1.5 font-bold font-mono text-[10px]">
                      <span>4.5:1</span>
                      {passesAAALarge ? (
                        <span className="text-emerald-600 flex items-center gap-0.5 bg-emerald-50 px-1 rounded">PASS</span>
                      ) : (
                        <span className="text-red-600 flex items-center gap-0.5 bg-red-50 px-1 rounded">FAIL</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ==================== COMPONENT BENCH TAB ==================== */}
        {activeTab === 'component-bench' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Interactive Components Sandbox (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Dynamic Button Sandbox */}
              <div className="bg-white border border-zinc-200/80 p-6 rounded-3xl shadow-sm space-y-5">
                <div>
                  <h3 className="font-extrabold text-lg text-zinc-900 tracking-tight flex items-center gap-2">
                    <Sliders className="w-5 h-5 text-red-500" />
                    <span>Magnet Button Workbench</span>
                  </h3>
                  <p className="text-zinc-500 text-xs font-light mt-1">
                    Inspect Tamizh's spring-loaded magnet CTA action component. Move your cursor over the button inside the canvas to feel the organic target attraction.
                  </p>
                </div>

                {/* Button Live Canvas */}
                <div className="p-8 bg-[#FAF9F6] border border-zinc-250/60 rounded-2xl flex items-center justify-center min-h-[120px]">
                  <Button 
                    variant={btnVariant}
                    onClick={() => {
                      // Visual click flash
                      setCardAnimateTrigger(true);
                      setTimeout(() => setCardAnimateTrigger(false), 800);
                    }}
                    className={btnState === 'disabled' ? 'opacity-50 pointer-events-none' : ''}
                  >
                    {btnState === 'loading' ? (
                      <div className="flex items-center gap-2">
                        <span className="w-3.5 h-3.5 rounded-full border-2 border-zinc-300 border-t-zinc-900 animate-spin" />
                        <span>LOADING...</span>
                      </div>
                    ) : (
                      btnText
                    )}
                  </Button>
                </div>

                {/* Button Settings Form */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  <div>
                    <label className="block text-[10px] font-mono font-bold uppercase text-zinc-500 mb-1">BUTTON TEXT</label>
                    <input 
                      type="text" 
                      className="w-full text-xs p-2 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none"
                      value={btnText}
                      onChange={(e) => setBtnText(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono font-bold uppercase text-zinc-500 mb-1">VARIANT TYPE</label>
                    <select 
                      className="w-full text-[11px] p-2 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none font-mono"
                      value={btnVariant}
                      onChange={(e) => setBtnVariant(e.target.value as any)}
                    >
                      <option value="primary">PRIMARY (Slate)</option>
                      <option value="secondary">SECONDARY (White)</option>
                      <option value="outline">OUTLINE (1px)</option>
                      <option value="ghost">GHOST (Clear)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono font-bold uppercase text-zinc-500 mb-1">INTERACTION STATE</label>
                    <select 
                      className="w-full text-[11px] p-2 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none font-mono"
                      value={btnState}
                      onChange={(e) => setBtnState(e.target.value as any)}
                    >
                      <option value="normal">NORMAL</option>
                      <option value="loading">LOADING STATE</option>
                      <option value="disabled">DISABLED</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Card Spec / Border Workbench */}
              <div className="bg-white border border-zinc-200/80 p-6 rounded-3xl shadow-sm space-y-5">
                <div>
                  <h3 className="font-extrabold text-lg text-zinc-900 tracking-tight flex items-center gap-2">
                    <Layers className="w-5 h-5 text-zinc-400" />
                    <span>Card Bento Structure Lab</span>
                  </h3>
                  <p className="text-zinc-500 text-xs font-light mt-1">Configure bento border types, shadow weights, and hover parameters.</p>
                </div>

                {/* Card Sandbox Canvas */}
                <div className="p-8 bg-[#FAF9F6] border border-zinc-250/60 rounded-2xl flex items-center justify-center min-h-[220px]">
                  <motion.div
                    animate={cardAnimateTrigger ? { scale: [1, 1.03, 1], rotate: [0, 1, -1, 0] } : {}}
                    whileHover={{ y: -5, scale: 1.01 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className={`w-full max-w-sm bg-white p-6 rounded-2xl select-none transition-all duration-300 ${
                      cardShadow === 'sm' ? 'shadow-sm' :
                      cardShadow === 'md' ? 'shadow-md' :
                      cardShadow === 'lg' ? 'shadow-xl shadow-zinc-100' : 'shadow-none'
                    } ${
                      cardBorder === 'none' ? 'border-none' :
                      cardBorder === 'soft' ? 'border border-zinc-150' :
                      cardBorder === 'high-contrast' ? 'border-2 border-zinc-900' : 'border border-dashed border-zinc-300'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-4">
                      <span className={`inline-block px-2.5 py-0.5 rounded text-[8.5px] font-mono font-bold uppercase tracking-wider ${
                        chipState === 'Ready' ? 'bg-green-50 text-green-700 border border-green-100' :
                        chipState === 'Blocked' ? 'bg-red-50 text-red-700 border border-red-100' :
                        chipState === 'In production' ? 'bg-orange-50 text-orange-700 border border-orange-100' :
                        'bg-zinc-100 text-zinc-650 border border-zinc-200'
                      }`}>
                        {chipState}
                      </span>
                      <span className="text-[9px] font-mono text-zinc-400">LEDGER-0491</span>
                    </div>

                    <h4 className="font-extrabold text-base text-zinc-900 leading-snug tracking-tight">
                      Chennai beach cleanup: Marina coast campaign
                    </h4>
                    
                    <p className="text-zinc-500 text-xs mt-2 font-light leading-relaxed">
                      Transforming raw community action logs into elegant digital ledgers mapping specific metrics.
                    </p>

                    <div className="mt-5 pt-4 border-t border-zinc-100 flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-zinc-400">
                        <div className="w-4 h-4 rounded-full bg-zinc-100 border border-zinc-200" />
                        <span className="text-[9.5px] font-mono">Coordinator #02</span>
                      </div>
                      <span className="text-[10px] font-mono font-bold text-zinc-900 group-hover:text-red-500 transition-colors">
                        DETAILS →
                      </span>
                    </div>
                  </motion.div>
                </div>

                {/* Card Configurations Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  <div>
                    <label className="block text-[10px] font-mono font-bold uppercase text-zinc-500 mb-1">SHADOW WEIGHT</label>
                    <div className="grid grid-cols-4 gap-1">
                      {['none', 'sm', 'md', 'lg'].map((sh) => (
                        <button
                          key={sh}
                          onClick={() => setCardShadow(sh as any)}
                          className={`py-1 text-[9px] font-mono border rounded transition-all font-bold uppercase ${
                            cardShadow === sh ? 'bg-zinc-900 text-white border-zinc-900' : 'bg-zinc-50 text-zinc-500 border-zinc-200 hover:bg-zinc-100'
                          }`}
                        >
                          {sh}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono font-bold uppercase text-zinc-500 mb-1">BORDER CLASS</label>
                    <select 
                      className="w-full text-[11px] p-2 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none font-mono"
                      value={cardBorder}
                      onChange={(e) => setCardBorder(e.target.value as any)}
                    >
                      <option value="none">NONE</option>
                      <option value="soft">SOFT (1px border-zinc-150)</option>
                      <option value="high-contrast">HIGH-CONTRAST (2px black)</option>
                      <option value="dashed">DASHED (1px dotted)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-mono font-bold uppercase text-zinc-500 mb-1">CHIP CHANGER</label>
                    <select 
                      className="w-full text-[11px] p-2 bg-zinc-50 border border-zinc-200 rounded-lg focus:outline-none font-mono"
                      value={chipState}
                      onChange={(e) => setChipState(e.target.value as any)}
                    >
                      <option value="Ready">READY (Green)</option>
                      <option value="In production">IN PRODUCTION (Orange)</option>
                      <option value="Blocked">BLOCKED (Red)</option>
                      <option value="Pending">PENDING (Zinc)</option>
                    </select>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Panel: Spec Sheet Code Generator (5 Cols) */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Dynamic Tailwind Class inspector */}
              <div className="bg-zinc-900 text-white p-6 rounded-3xl shadow-xl space-y-5 border border-zinc-800">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                  <div className="flex items-center gap-2">
                    <Code className="w-4 h-4 text-red-400" />
                    <span className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-300">Live Spec Sheet</span>
                  </div>
                  <span className="text-[9px] font-mono text-zinc-500 font-bold">TAILWIND SPEC</span>
                </div>

                <div className="space-y-4">
                  <div>
                    <span className="text-[8.5px] font-mono text-zinc-500 uppercase tracking-widest block mb-1">CARD WRAPPER COMPONENT</span>
                    <pre className="p-3 bg-zinc-950/80 border border-zinc-800 rounded-lg overflow-x-auto text-[9.5px] font-mono text-red-300 leading-normal">
{`<div className="rounded-2xl p-6 bg-white transition-all duration-300
  ${cardShadow === 'sm' ? 'shadow-sm' : cardShadow === 'md' ? 'shadow-md' : cardShadow === 'lg' ? 'shadow-xl' : 'shadow-none'}
  ${cardBorder === 'none' ? 'border-none' : cardBorder === 'soft' ? 'border border-zinc-150' : cardBorder === 'high-contrast' ? 'border-2 border-zinc-900' : 'border border-dashed border-zinc-300'}
  hover:-translate-y-1 hover:scale-[1.01]"
>`}
                    </pre>
                  </div>

                  <div>
                    <span className="text-[8.5px] font-mono text-zinc-500 uppercase tracking-widest block mb-1">BUTTON EXPORT SPEC</span>
                    <pre className="p-3 bg-zinc-950/80 border border-zinc-800 rounded-lg overflow-x-auto text-[9.5px] font-mono text-red-300 leading-normal">
{`<motion.button 
  className="rounded-full font-medium transition-colors duration-300 flex items-center justify-center gap-2
    ${btnVariant === 'primary' ? 'bg-black text-white hover:bg-zinc-800' : btnVariant === 'secondary' ? 'bg-white text-black hover:bg-zinc-100' : btnVariant === 'outline' ? 'border border-zinc-200' : 'bg-transparent text-zinc-650'}"
  animate={{ x: magnetX, y: magnetY }}
  transition={{ type: 'spring', stiffness: 150 }}
>
  {${btnState === 'loading' ? '"LOADING..."' : `"${btnText}"`}}
</motion.button>`}
                    </pre>
                  </div>
                </div>

                <div className="bg-zinc-950 p-4 border border-zinc-800 rounded-xl flex items-start gap-2 text-[10px] text-zinc-400 font-mono leading-relaxed">
                  <Info className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
                  <span>
                    Toggle values inside the workbench sliders or selectors. The generated spec code compiles in real-time, matching standard design tokens.
                  </span>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
