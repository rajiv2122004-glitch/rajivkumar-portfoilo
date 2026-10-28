export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'AI Research & AEO' | 'Digital Growth' | 'Analytics & Search';
  summary: string;
  problem: string;
  approach: string;
  tools: string[];
  outcomes: string[];
  keyHighlight: string;
  isVerified: boolean;
  link?: string;
  linkText?: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  description: string;
  skills: {
    name: string;
    level: string;
    focus: string;
    tags: string[];
  }[];
}

export interface TimelineMilestone {
  period: string;
  role: string;
  organization: string;
  location?: string;
  description: string;
  highlights: string[];
  isVerified: boolean;
}

export interface ContactSubmissionState {
  name: string;
  email: string;
  company: string;
  message: string;
  honeypot: string;
}

export interface StoredMessage {
  id: string;
  name: string;
  email: string;
  company?: string;
  message: string;
  createdAt: string;
  status: 'new' | 'read' | 'archived';
  ipAddress?: string;
}
