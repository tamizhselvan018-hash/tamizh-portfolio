
import { CaseStudy, Testimonial, FAQItem } from './types';

export const CASE_STUDIES: CaseStudy[] = [
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
    id: 'motion-design',
    title: 'Motion Design',
    category: 'Motion · Animation',
    description: 'Bringing digital interfaces to life through purposeful movement and fluid transitions.',
    tags: ['UI Animation', 'Lottie', 'Micro-interactions'],
    images: [
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800'
    ],
    color: 'bg-white',
    isComingSoon: true
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
