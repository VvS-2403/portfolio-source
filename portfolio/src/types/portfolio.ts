export interface Profile {
  name: string;
  degree: string;
  institution: string;
  campus: string;
  expectedGraduation: string;
  cgpa: string;
  summary: string;
  interests: string[];
  coursework: string[];
  contact: {
    email: string;
    linkedin: string;
    github: string;
    phone?: string;
  };
}

export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  type: "Individual" | "Team";
  status: "Completed" | "Ongoing" | "Paused";
  technologies: string[];
  concepts: string[];
  outcomes: string[];
  github?: string;
  featured: boolean;
}

export interface Experience {
  id: string;
  organization: string;
  role: string;
  duration: string;
  type: "internship" | "part-time" | "full-time";
  summary: string;
  responsibilities: string[];
  technologies?: string[];
  status: "ongoing" | "completed";
}

export interface ExtracurricularActivity {
  id: string;
  role: string;
  organization: string;
  duration?: string;
  description?: string;
  responsibilities?: string[];
  skills?: string[];
  type?: "extracurricular" | "volunteer" | "mentorship" | "technical" | "achievement";
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  category: "academic" | "competitive";
}

export interface QA {
  question: string;
  answer: string;
  category: string;
}

export interface SkillGroup {
  category: string;
  skills: string[];
}
