import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectCard from "@/components/ProjectCard";
import projects from "@/data/projects";

export default function ProjectsPage() {
  const completed = projects.filter((p) => p.status === "Completed");
  const ongoing = projects.filter((p) => p.status === "Ongoing");

  return (
    <main>
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 pt-32 pb-24">
        {/* Header */}
        <div className="mb-16">
          <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-3">
            All Projects
          </p>
          <h1 className="font-display text-5xl text-gray-900 mb-4">Work</h1>
          <p className="text-gray-500 max-w-xl text-sm leading-relaxed">
            End-to-end ML systems, deep learning experiments, and AI
            applications. Each project is built to explore a specific research
            question or real-world problem.
          </p>
        </div>

        {/* Ongoing */}
        {ongoing.length > 0 && (
          <div className="mb-16">
            <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-6 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              Currently Ongoing
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ongoing.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  expandable={true}
                />
              ))}
            </div>
          </div>
        )}

        {/* Completed */}
        <div>
          <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-6 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            Completed
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {completed.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                expandable={true}
              />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
