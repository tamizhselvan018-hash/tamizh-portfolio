
import { CaseStudy, Testimonial, FAQItem } from './types';

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'pathways-badge-quest',
    title: 'Pathways Badge Quest',
    category: 'Gamified Learning · Experience Design',
    description: 'A physical board game designed for Iowa State University’s College of Agriculture and Life Sciences to turn micro-credentials into a felt journey of progression.',
    tags: ['Experience Design', 'Gamification', 'Instructional Tool'],
    images: [
      'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1553481187-be93c21490a9?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80&w=800'
    ],
    color: 'bg-[#5a8c69]',
    role: 'UX Designer',
    platform: 'Physical Board Game + Mobile UI',
    duration: 'Summer 2025 · 3 months',
    tools: 'Figma, Adobe Illustrator'
  },
  {
    id: 'my-campus',
    title: 'My Campus',
    category: 'Product Design · Education',
    description: 'A mobile platform that unifies academic discovery, faculty access, event exploration, and career services into a single structured experience.',
    tags: ['UX Research', 'Information Architecture', 'Interaction Design'],
    images: [
      'https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?auto=format&fit=crop&q=80&w=800'
    ],
    color: 'bg-brand-600',
    role: 'UX / UI Lead Designer',
    platform: 'Mobile (iOS/Android)',
    duration: '3 Months',
    tools: 'Figma, FigJam'
  },
  {
    id: 'walk-for-plastic',
    title: 'Walk for Plastic',
    category: 'UX Case Study · Environmental Impact',
    description: 'A community-driven platform for Chennai\'s plastic cleanup movement. Transforming grassroots volunteering into a measurable digital experience.',
    tags: ['UX Research', 'Dashboard Design', 'Social Impact'],
    images: [
      'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800'
    ],
    color: 'bg-[#0A3161]',
    isFeatured: true,
    role: 'UX Researcher & Designer',
    platform: 'Mobile App',
    duration: '4 Weeks',
    tools: 'Figma, FigJam'
  },
  {
    id: 'par-production-control',
    title: 'PAR Production Control',
    category: 'Operations · Process Design · Full-Stack UX',
    description: 'An internal production control tool for pump assembly companies, built around an interconnected operational workflow and subtraction design Strategy.',
    tags: ['Operations UX', 'System Design', 'Workflow Tools'],
    images: [
      'https://i.imgur.com/kJ97VNS.png',
      'https://i.imgur.com/MSI21zc.png',
      'https://i.imgur.com/qCSorxc.png'
    ],
    color: 'bg-[#1e293b]',
    role: 'Product & Interaction Designer',
    platform: 'B2B Technical Web App',
    duration: '6 Weeks',
    tools: 'Figma, React Prototyping, Usability Testing',
    liveUrl: 'https://tamizhselvan018-hash.github.io/par-prototype/par-prototype.html'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    quote: "The Walk for Plastic app changed how our volunteers connect. Seeing the impact in real-time is a game changer.",
    author: 'Chennai Cleanup Crew',
    role: 'Community Lead',
    avatar: 'https://i.pravatar.cc/150?u=cleanup'
  }
];

export const FAQS: FAQItem[] = [
  {
    id: 'q1',
    question: "What's your typical project timeline?",
    answer: "The timeline depends on the project's scope. Branding and UI/UX projects usually take 2-6 weeks."
  }
];
