import fs from 'fs';
import path from 'path';

const CONTENT_ROOT = path.join(process.cwd(), 'content');
const PORTFOLIO_DATA_ROOT = path.join(process.cwd(), 'portfolio-data');

// ─── File system helpers ──────────────────────────────────────────────────────

function safeRead(filePath: string): string {
  try { return fs.readFileSync(filePath, 'utf-8'); } catch { return ''; }
}

function scanMarkdownFiles(dir: string): string[] {
  try {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    const files: string[] = [];
    for (const entry of entries) {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) files.push(...scanMarkdownFiles(full));
      else if (entry.isFile() && entry.name.endsWith('.md')) files.push(full);
    }
    return files;
  } catch { return []; }
}

// ─── Section registry ─────────────────────────────────────────────────────────
// Built entirely from the file system at runtime.
// Add a file → it appears here automatically, no code changes needed.

export interface Section {
  key: string;           // unique id, e.g. "projects/transformer-attention"
  label: string;         // human-readable, e.g. "Project: Transformer Variants"
  filePath: string;      // absolute path
  preview: string;       // first ~200 chars, shown to the planner LLM
}

export function buildSectionRegistry(): Section[] {
  const sections: Section[] = [];

  const scanDir = (dir: string, labelPrefix: string) => {
    const files = scanMarkdownFiles(dir);
    for (const filePath of files) {
      const rel = path.relative(dir, filePath).replace(/\\/g, '/');
      const raw = safeRead(filePath);
      if (!raw.trim()) continue;
      sections.push({
        key: `${labelPrefix}/${rel.replace('.md', '')}`,
        label: `${labelPrefix}: ${rel.replace('.md', '').replace(/[-_/]/g, ' ')}`,
        filePath,
        preview: raw.slice(0, 200).replace(/\n+/g, ' ').trim(),
      });
    }
  };

  // Scan all content directories
  scanDir(path.join(CONTENT_ROOT, 'projects'),       'project');
  scanDir(path.join(CONTENT_ROOT, 'experience'),     'experience');

  // Single-file sections
  const singleFiles: { path: string; key: string; label: string }[] = [
    { path: path.join(CONTENT_ROOT, 'about.md'),            key: 'about',            label: 'About / Background / Interests / Hobbies' },
    { path: path.join(CONTENT_ROOT, 'extracurriculars.md'), key: 'extracurriculars', label: 'Extracurricular Activities / Clubs / Achievements' },
    { path: path.join(PORTFOLIO_DATA_ROOT, 'profile.json'), key: 'profile',          label: 'Profile: Name / Degree / CGPA / Contact / Institution' },
    { path: path.join(PORTFOLIO_DATA_ROOT, 'projects.json'), key: 'projects-index',  label: 'Projects index: all project titles, tech, concepts, outcomes' },
    { path: path.join(PORTFOLIO_DATA_ROOT, 'experience.json'), key: 'experience-index', label: 'Experience index: internship, roles, organizations' },
  ];

  for (const f of singleFiles) {
    const raw = safeRead(f.path);
    if (!raw.trim()) continue;
    sections.push({
      key: f.key,
      label: f.label,
      filePath: f.path,
      preview: raw.slice(0, 200).replace(/\n+/g, ' ').trim(),
    });
  }

  return sections;
}

// ─── Read a section's full content ───────────────────────────────────────────

export function readSection(section: Section): string {
  return safeRead(section.filePath);
}
