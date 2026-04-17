
export interface CaseStudy {
  id: string;
  title: string;
  category: string;
  description: string;
  tags: string[];
  images: string[];
  color?: string;
  isFeatured?: boolean;
  role?: string;
  platform?: string;
  duration?: string;
  tools?: string;
  isComingSoon?: boolean;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  avatar: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}
