import { SkillGroup } from "@/types/portfolio";

const skillGroups: SkillGroup[] = [
  {
    category: "Programming Languages",
    skills: ["Python", "C", "C++", "Java", "JavaScript", "SQL", "MATLAB"],
  },
  {
    category: "Machine Learning",
    skills: [
      "PyTorch",
      "TensorFlow",
      "Scikit-Learn",
      "Pandas",
      "NumPy",
      "XGBoost",
      "Hugging Face",
      "FinBERT",
      "NLTK",
    ],
  },
  {
    category: "Web & Backend",
    skills: [
      "React",
      "Next.js",
      "Node.js",
      "FastAPI",
      "Flask",
      "Firebase",
    ],
  },
  {
    category: "Developer Tools",
    skills: [
      "Git",
      "GitHub",
      "Linux",
      "Docker",
      "Weights & Biases",
      "VS Code",
      "Google Colab",
      "Jupyter",
    ],
  },
  {
    category: "Databases & Cloud",
    skills: [
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "SQLite",
      "Vercel",
      "Render",
      "Hugging Face Spaces",
    ],
  },
];

const categoryColors: Record<string, string> = {
  "Programming Languages": "bg-violet-50 text-violet-700 border-violet-100",
  "Machine Learning": "bg-blue-50 text-blue-700 border-blue-100",
  "Web & Backend": "bg-emerald-50 text-emerald-700 border-emerald-100",
  "Developer Tools": "bg-amber-50 text-amber-700 border-amber-100",
  "Databases & Cloud": "bg-rose-50 text-rose-700 border-rose-100",
};

export default function Skills() {
  return (
    <section id="skills" className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16">
          <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-3">
            Skills
          </p>
          <h2 className="font-display text-4xl text-gray-900">
            Technical Toolkit
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillGroups.map((group) => (
            <div
              key={group.category}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm"
            >
              <h3 className="text-sm font-semibold text-gray-900 mb-4">
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className={`px-2.5 py-1 text-xs font-medium border rounded-full ${
                      categoryColors[group.category] ||
                      "bg-gray-50 text-gray-700 border-gray-200"
                    }`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
