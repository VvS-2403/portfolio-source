"use client";

import { useState } from "react";
import { ExternalLink, Github, ChevronDown, ChevronUp } from "lucide-react";
import { Project } from "@/types/portfolio";

interface ProjectCardProps {
  project: Project;
  expandable?: boolean;
}

const statusStyles: Record<string, string> = {
  Completed: "bg-green-50 text-green-700 border-green-100",
  Ongoing: "bg-blue-50 text-blue-700 border-blue-100",
  Paused: "bg-gray-50 text-gray-600 border-gray-200",
};

export default function ProjectCard({
  project,
  expandable = false,
}: ProjectCardProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden group">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 pr-4">
            <h3 className="font-semibold text-gray-900 text-base leading-snug mb-1 group-hover:text-blue-600 transition-colors">
              {project.title}
            </h3>
            <p className="text-sm text-gray-500">{project.type} Project</p>
          </div>
          <span
            className={`flex-shrink-0 px-2.5 py-1 text-xs font-medium border rounded-full ${
              statusStyles[project.status]
            }`}
          >
            {project.status}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 leading-relaxed mb-4">
          {project.shortDescription}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 text-xs text-gray-600 bg-gray-100 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Footer row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {project.github && project.github !== null ? (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-900 transition-colors"
              >
                <Github size={13} />
                GitHub
              </a>
            ) : (
              <span className="text-xs text-gray-400">GitHub: coming soon</span>
            )}
          </div>
          {expandable && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="flex items-center gap-1.5 text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors"
            >
              {expanded ? (
                <>
                  Show less <ChevronUp size={13} />
                </>
              ) : (
                <>
                  View details <ChevronDown size={13} />
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Expanded content */}
      {expandable && expanded && (
        <div className="border-t border-gray-100 p-6 bg-gray-50">
          <div className="space-y-4">
            <div>
              <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">
                Full Description
              </h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                {project.fullDescription}
              </p>
            </div>

            {project.concepts.length > 0 && (
              <div>
                <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">
                  Concepts & Methods
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {project.concepts.map((concept) => (
                    <span
                      key={concept}
                      className="px-2.5 py-1 text-xs text-blue-700 bg-blue-50 border border-blue-100 rounded-full"
                    >
                      {concept}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {project.outcomes.length > 0 && (
              <div>
                <h4 className="text-xs font-semibold text-gray-700 uppercase tracking-wide mb-2">
                  Key Outcomes
                </h4>
                <ul className="space-y-1.5">
                  {project.outcomes.map((outcome) => (
                    <li key={outcome} className="flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-blue-400 mt-1.5 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
