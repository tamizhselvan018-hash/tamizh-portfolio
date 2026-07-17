import { CaseStudy, Testimonial, FAQItem } from './types';

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'par-production-control',
    title: 'PAR Production Control',
    category: 'Enterprise · B2B Dashboard',
    description: 'Streamlining complex manufacturing workflows and stock visibility for inventory managers and operational efficiency.',
    tags: ['ENTERPRISE', 'B2B SYSTEM'],
    images: [
      'https://i.imgur.com/IHBVwNk.mp4'
    ],
    color: 'bg-[#065f46]',
    textColor: 'text-white',
    date: 'DEC 2024',
    role: 'Lead UX Architect',
    platform: 'B2B Desktop Web App',
    duration: '6 Weeks',
    tools: 'Figma, Component Library',
    liveUrl: 'https://tamizhselvan018.github.io/Walkforplastic-React/'
  },
  {
    id: 'pathways-badge-quest',
    title: 'Pathways Badge Quest',
    category: 'Gamification · Student Engagement',
    description: 'A gamified orientation platform that guides new students through a physical campus and community board game.',
    tags: ['GAMIFICATION', 'INTERACTIVE'],
    images: [
      'https://i.imgur.com/P68DzMw.mp4'
    ],
    color: 'bg-[#FACC15]',
    textColor: 'text-zinc-950',
    date: 'JUL 2024',
    role: 'UX Game Designer',
    platform: 'Mobile & Board Game',
    duration: '2 Months',
    tools: 'Figma, Unity'
  },
  {
    id: 'my-campus',
    title: 'My Campus',
    category: 'Product Design · Education',
    description: 'Rethinking the university experience through a unified digital ecosystem for students and faculty.',
    tags: ['UX Research', 'Information Architecture', 'Interaction Design'],
    images: [
      'https://i.imgur.com/6llATFO.mp4'
    ],
    color: 'bg-[#4338CA]',
    textColor: 'text-white',
    date: 'FEB 2025',
    role: 'Product Designer',
    platform: 'Mobile App',
    duration: '4 Weeks',
    tools: 'Figma, User Testing'
  },
  {
    id: 'walk-for-plastic',
    title: 'Walk for Plastic',
    category: 'UX Case Study · Environmental Impact',
    description: 'A community-driven platform for Chennai’s plastic cleanup movement. Transforming grassroots volunteering into a digital experience.',
    tags: ['UX Research', 'Dashboard Design', 'Social Impact'],
    images: [
      'https://i.imgur.com/Sc7WkPT.mp4'
    ],
    color: 'bg-[#0D9488]',
    textColor: 'text-white',
    date: 'MAR 2026',
    role: 'UX & Product Designer',
    platform: 'Mobile App',
    duration: '3 Months',
    tools: 'Figma, React'
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
