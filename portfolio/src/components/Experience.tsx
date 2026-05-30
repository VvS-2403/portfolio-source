import { Briefcase, Clock } from "lucide-react";

export default function Experience() {
  return (
    <section id="experience" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-16">
          <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-3">
            Experience
          </p>
          <h2 className="font-display text-4xl text-gray-900">
            Professional Work
          </h2>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-5 top-0 bottom-0 w-px bg-gray-100 hidden sm:block" />

          <div className="space-y-6">
            {/* Caarya */}
            <div className="sm:pl-16 relative">
              {/* Timeline dot */}
              <div className="hidden sm:flex absolute left-0 top-6 w-10 h-10 rounded-full bg-blue-600 items-center justify-center">
                <Briefcase size={16} className="text-white" />
              </div>

              <div className="bg-gray-50 rounded-2xl border border-gray-100 p-6">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Practice School I Intern
                    </h3>
                    <p className="text-sm text-blue-600 font-medium">
                      Caarya Innovative
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <Clock size={12} />
                    <span>Ongoing</span>
                    <span className="ml-1 px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-100 rounded-full font-medium">
                      Active
                    </span>
                  </div>
                </div>

                <p className="text-sm text-gray-500 mb-4">
                  BITS Pilani Practice School-I Program
                </p>

                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  Internship undertaken as part of the BITS Pilani Practice
                  School-I program. Working with industry mentors on technology
                  and product-oriented projects with responsibilities currently
                  being finalized.
                </p>

                <div>
                  <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">
                    Expected Contribution Areas
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
                        className="px-2.5 py-1 text-xs text-gray-600 bg-white border border-gray-200 rounded-full"
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
