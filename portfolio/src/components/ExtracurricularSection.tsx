import extracurriculars from "@/data/extracurriculars";
import { ChevronRight } from "lucide-react";

export default function ExtracurricularSection() {
  return (
    <section id="extracurriculars" className="py-12 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-8">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2">
            Extracurricular Activities
          </p>
          <h3 className="text-xl font-semibold text-gray-900">Campus Involvement</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {extracurriculars.map((e) => (
            <div
              key={e.id}
              className="flex items-start gap-3 bg-gray-50 rounded-lg p-3 border border-gray-100"
            >
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-gray-900">{e.role}</h4>
                </div>
                <p className="text-xs text-gray-500">{e.organization}</p>
                {e.responsibilities && (
                  <ul className="mt-2 text-xs text-gray-600 space-y-1">
                    {e.responsibilities.slice(0, 3).map((r) => (
                      <li key={r} className="flex items-start gap-2">
                        <span className="w-1 h-1 bg-gray-400 rounded-full mt-2 flex-shrink-0" />
                        <span>{r}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="self-center">
                <ChevronRight size={18} className="text-gray-400" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
