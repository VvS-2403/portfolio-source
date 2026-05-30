import { BookOpen, GraduationCap, Target } from "lucide-react";

const coursework = [
  "Data Structures and Algorithms",
  "Object-Oriented Programming",
  "Machine Learning",
  "Linear Algebra and Applications",
  "Probability and Statistics",
  "Numerical Optimization",
];

const interests = [
  "Machine Learning",
  "Retrieval-Augmented Generation",
  "Data Science",
  "Full-Stack AI Systems",
  "Causal Inference",
];

export default function About() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section heading */}
        <div className="mb-16">
          <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-3">
            About
          </p>
          <h2 className="font-display text-4xl text-gray-900">Background</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Education Card */}
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <GraduationCap size={16} className="text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 text-sm">Education</h3>
            </div>
            <p className="font-display text-xl text-gray-900 mb-1">
              B.E. Mathematics and Computing
            </p>
            <p className="text-sm text-gray-600 mb-1">
              BITS Pilani, K.K. Birla Goa Campus
            </p>
            <p className="text-xs text-gray-500 mb-4">Expected 2028</p>
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-gray-500">CGPA</span>
              <span className="text-sm font-bold text-gray-900">8.73 / 10</span>
            </div>
          </div>

          {/* Coursework Card */}
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <BookOpen size={16} className="text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 text-sm">
                Relevant Coursework
              </h3>
            </div>
            <ul className="space-y-2">
              {coursework.map((course) => (
                <li key={course} className="flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                  <span className="text-sm text-gray-600">{course}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Interests Card */}
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                <Target size={16} className="text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 text-sm">
                Career Interests
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {interests.map((interest) => (
                <span
                  key={interest}
                  className="px-3 py-1.5 text-xs font-medium text-blue-700 bg-blue-50 border border-blue-100 rounded-full"
                >
                  {interest}
                </span>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600 leading-relaxed">
                Focused on building end-to-end AI systems that bridge research
                and real-world deployment.
              </p>
            </div>
          </div>
        </div>

        {/* Achievements row */}
        <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "JEE Main Percentile", value: "97.3%", sub: "National Entrance Exam" },
            { label: "BITSAT Score", value: "299/390", sub: "Engineering Admission" },
            { label: "Class XII Boards", value: "97.5%", sub: "Karnataka State Board" },
            { label: "Hackathon", value: "2nd Place", sub: "Training Without Gradients" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-gray-100 p-5 bg-white"
            >
              <p className="font-display text-2xl text-gray-900 mb-0.5">
                {stat.value}
              </p>
              <p className="text-xs font-medium text-gray-700">{stat.label}</p>
              <p className="text-xs text-gray-400 mt-0.5">{stat.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
