import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Briefcase, Clock, Trophy, GraduationCap } from "lucide-react";

export default function ExperiencePage() {
  return (
    <main>
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 pt-32 pb-24">
        <div className="mb-16">
          <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-3">
            Experience
          </p>
          <h1 className="font-display text-5xl text-gray-900 mb-4">
            Professional Journey
          </h1>
          <p className="text-gray-500 max-w-xl text-sm">
            Industry experience, academic achievements, and competitive results.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main timeline */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
              Work Experience
            </h2>

            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Briefcase size={16} className="text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                    <h3 className="font-semibold text-gray-900">
                      Practice School I Intern
                    </h3>
                    <span className="flex items-center gap-1.5 text-xs text-blue-600 font-medium">
                      <Clock size={11} />
                      Ongoing
                    </span>
                  </div>
                  <p className="text-sm font-medium text-blue-600 mb-1">
                    Caarya Innovative
                  </p>
                  <p className="text-xs text-gray-400 mb-4">
                    BITS Pilani Practice School-I Program
                  </p>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    Working with industry mentors on technology and
                    product-oriented projects. Assigned responsibilities
                    currently being finalized. Expected to contribute across AI
                    applications, product development, and software engineering.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "AI Applications",
                      "Product Development",
                      "Software Engineering",
                      "Team Collaboration",
                    ].map((area) => (
                      <span
                        key={area}
                        className="px-2.5 py-1 text-xs text-gray-600 bg-gray-100 rounded-full"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar: achievements */}
          <div className="space-y-6">
            <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
              Achievements
            </h2>

            {[
              {
                icon: Trophy,
                label: "JEE Main",
                value: "97.3 Percentile",
                color: "amber",
              },
              {
                icon: GraduationCap,
                label: "BITSAT",
                value: "299 / 390",
                color: "blue",
              },
              {
                icon: GraduationCap,
                label: "Class XII Boards",
                value: "97.5%",
                color: "green",
              },
              {
                icon: Trophy,
                label: "Training Without Gradients Hackathon",
                value: "2nd Place",
                color: "violet",
              },
            ].map((item) => {
              const Icon = item.icon;
              const colors: Record<string, string> = {
                amber: "bg-amber-100 text-amber-600",
                blue: "bg-blue-100 text-blue-600",
                green: "bg-green-100 text-green-600",
                violet: "bg-violet-100 text-violet-600",
              };
              return (
                <div
                  key={item.label}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 flex items-start gap-3"
                >
                  <div
                    className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${colors[item.color]}`}
                  >
                    <Icon size={15} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-0.5">{item.label}</p>
                    <p className="font-semibold text-gray-900 text-sm">
                      {item.value}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
