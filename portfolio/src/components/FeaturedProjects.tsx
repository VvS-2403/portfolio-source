import ProjectCard from "./ProjectCard";
import projects from "@/data/projects";

export default function FeaturedProjects() {
  const featured = projects.filter((project) => project.featured);

  return (
    <section id="projects" className="relative z-10 py-16 px-4"
      style={{ borderBottom: "1px solid rgba(28, 37, 72, 0.6)", background: "rgba(5, 7, 26, 0.97)" }}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="section-label mb-2">Projects</p>
            <h2
              className="font-display"
              style={{
                fontSize: "clamp(1.6rem, 3vw, 2.5rem)",
                background: "linear-gradient(135deg, #F0F4FF 20%, #A0B8FF 80%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Featured Work
            </h2>
            <p
              style={{
                color: "rgba(240,244,255,0.45)",
                fontSize: "0.75rem",
                lineHeight: 1.6,
                marginTop: "0.75rem",
              }}
            >
              A selection of projects I&apos;ve built and shipped.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3.5 md:grid-cols-2">
          {featured.map((project) => (
            <ProjectCard key={project.id} project={project} expandable />
          ))}
        </div>
      </div>
    </section>
  );
}