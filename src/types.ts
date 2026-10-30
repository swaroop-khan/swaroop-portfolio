export interface SocialLink {
  id: string;
  label: string;
  url: string;
  badgeUrl: string;
  color: string;
  iconName: string;
}

export interface TechBadge {
  id: string;
  name: string;
  category: 'languages' | 'ml_ds' | 'ai_ecosystem' | 'web' | 'tools';
  badgeColor: string;
  logo: string;
  logoColor?: string;
  level?: 'Expert' | 'Advanced' | 'Intermediate' | 'Familiar';
  years?: number;
  highlight?: string;
}

export interface CoreDirective {
  title: string;
  items: { label: string; value: string }[];
}

export interface ProjectCard {
  id: string;
  title: string;
  description: string;
  tags: string[];
  githubUrl: string;
  liveUrl?: string;
  stars?: number;
  forks?: number;
  featured?: boolean;
}

export interface ProfileData {
  developerName: string;
  taglineLines: string[];
  location: string;
  role: string;
  specialization: string;
  currentFocus: string;
  currentlyBuilding: string;
  philosophy: string;
  portfolioUrl: string;
  linkedinUrl: string;
  githubUsername: string;
  githubUrl: string;
  leetcodeUsername: string;
  leetcodeUrl: string;
  email: string;
  bannerTheme: {
    type: 'waving' | 'slice' | 'rect' | 'soft';
    height: number;
    gradientColors: string[];
    fontSize: number;
  };
  typingConfig: {
    font: string;
    weight: number;
    size: number;
    duration: number;
    pause: number;
    color: string;
  };
  badgeStyle: 'flat-square' | 'for-the-badge' | 'plastic' | 'flat';
  selectedTech: string[]; // Badge IDs
  statsTheme: string;
  customSections: {
    id: string;
    title: string;
    content: string;
    enabled: boolean;
  }[];
}
