export interface Experience {
  title: string;
  company: string;
  location?: string;
  period: string;
  description: string | string[];
  skills: string[];
}

export interface Project {
  title: string;
  description: string;
  image?: string;
  technologies: string[];
  demoLink?: string;
  codeLink?: string;
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  description?: string;
}

export interface Skill {
  name: string;
  level?: number;
}

export interface BlogPost {
  title: string;
  description: string;
  category: string;
  date?: string;
  link?: string;
}

export interface ContactInfo {
  address: string;
  email: string;
  phone: string;
  social: {
    github: string;
    linkedin: string;
  };
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}
