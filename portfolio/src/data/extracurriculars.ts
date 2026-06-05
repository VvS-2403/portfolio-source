import { ExtracurricularActivity } from "@/types/portfolio";

export const extracurriculars: ExtracurricularActivity[] = [
  {
    id: "sec-dept-mc",
    role: "Secretary",
    organization: "Department of Mathematics and Computing, BITS Pilani Goa",
    responsibilities: [
      "Represented student concerns to faculty and administration",
      "Organized departmental Open Day events",
      "Coordinated alumni interaction and networking sessions",
      "Facilitated communication between students and faculty",
    ],
    skills: ["communication", "coordination", "event-planning"],
    type: "extracurricular",
  },
  {
    id: "devsoc-core-ai",
    role: "Core AI/ML Developer",
    organization: "Developers' Society, BITS Goa",
    responsibilities: [
      "Contributed to AI and ML initiatives within the society",
      "Collaborated on technical projects and learning activities",
      "Participated in experimentation with modern ML techniques",
    ],
    skills: ["machine-learning", "collaboration"],
    type: "technical",
  },
  {
    id: "vol-abhiigyaan",
    role: "Volunteer Mathematics Instructor",
    organization: "Abhiigyaan",
    responsibilities: [
      "Taught mathematics to mess workers seeking advancement",
      "Mentored learners preparing for government competitive exams",
      "Simplified concepts for diverse learning backgrounds",
    ],
    skills: ["teaching", "mentorship"],
    type: "volunteer",
  },
  {
    id: "peer-mentor",
    role: "Peer Mentorship Program Mentor",
    organization: "BITS Pilani Goa",
    responsibilities: [
      "Guided junior students through academic challenges",
      "Provided advice on coursework and academic planning",
      "Supported student transition into university life",
    ],
    skills: ["mentorship", "advising"],
    type: "mentorship",
  },
  {
    id: "twg-2nd",
    role: "2nd Place — Training Without Gradients Hackathon",
    organization: "BITS Pilani Goa",
    responsibilities: [
      "Secured 2nd position in college-level ML hackathon",
      "Developed a solution under competitive time constraints",
      "Focused on gradient-free training approaches",
    ],
    skills: ["competition", "ml-experiments"],
    type: "achievement",
  },
];

export default extracurriculars;