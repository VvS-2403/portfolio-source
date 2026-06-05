import { Trophy } from "lucide-react";

const achievements = [
  {
    icon: Trophy,
    title: "2nd Place — Training Without Gradients Hackathon",
    org: "BITS Pilani Goa",
    description:
      "Secured 2nd position in a college-level ML hackathon focused on gradient-free training approaches, developing a competitive solution under time constraints.",
    color: "amber",
  },
];

const colorMap: Record<string, { bg: string; icon: string; badge: string; badgeText: string }> = {
  amber: {
    bg: "bg-[#151C2F] border-[#243045]",
    icon: "bg-[#F59E0B]/15 text-[#F59E0B]",
    badge: "bg-[#F59E0B]/15 text-[#F59E0B] border-[#F59E0B]/20",
    badgeText: "Hackathon",
  },
};

export default function Achievements() {
  return (
    <section id="achievements" className="relative z-10 border-b border-[#243045] py-16 px-6 bg-[#0A0F1C]">
      <div className="max-w-6xl mx-auto">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#4F8CFF] mb-2">Achievements</p>
        <h2 className="font-display text-3xl text-[#F0F4FF] mb-8">Recognition</h2>

        <div className="flex flex-col gap-4 max-w-2xl">
          {achievements.map((achievement) => {
            const Icon = achievement.icon;
            const config = colorMap[achievement.color];
            return (
              <div key={achievement.title} className={`rounded-[24px] border p-6 ${config.bg}`}>
                <div className="flex items-start gap-4">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${config.icon}`}>
                    <Icon size={18} />
                  </div>
                  <div className="flex-1">
                    <div className="mb-3 flex flex-wrap items-center gap-3">
                      <h3 className="text-sm font-semibold text-[#F0F4FF]">{achievement.title}</h3>
                      <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${config.badge}`}>
                        {config.badgeText}
                      </span>
                    </div>
                    <p className="text-xs text-[#94A3B8] mb-1">{achievement.org}</p>
                    <p className="text-sm leading-7 text-[#94A3B8]">{achievement.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
