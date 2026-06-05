import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const contentRoot = path.join(process.cwd(), 'content');

export function readMarkdownFile(filePath: string): { data: Record<string, string>; content: string } {
  try {
    const fullPath = path.join(contentRoot, filePath);
    const raw = fs.readFileSync(fullPath, 'utf-8');
    const { data, content } = matter(raw);
    return { data, content };
  } catch (err) {
    return { data: {}, content: '' };
  }
}

export function readProjectSubfolder(slug: string): Record<string, string> {
  const dir = path.join(contentRoot, 'projects', slug);
  const result: Record<string, string> = {};
  if (fs.existsSync(dir) && fs.statSync(dir).isDirectory()) {
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
    for (const f of files) {
      const sectionName = f.replace('.md', '');
      const { content } = readMarkdownFile(`projects/${slug}/${f}`);
      if (content) result[sectionName] = content;
    }
  }
  return result;
}

export function readProfileDocs(): string {
  const dir = path.join(contentRoot, 'profile');
  if (!fs.existsSync(dir)) return readAbout(); // Fallback to old about.md
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
  return files.map(f => readMarkdownFile(`profile/${f}`).content).join('\n\n');
}

export function readSkillDoc(skill: string): string | null {
  const { content } = readMarkdownFile(`skills/${skill}.md`);
  return content || null;
}

export function readAllProjectDocs(): string {
  const dir = path.join(contentRoot, 'projects');
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
  return files
    .map(f => {
      const { data, content } = readMarkdownFile(`projects/${f}`);
      return `### ${data.title ?? f}\n${content}`;
    })
    .join('\n\n---\n\n');
}

export function readProjectDoc(slug: string): string | null {
  const dir = path.join(contentRoot, 'projects');
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
  for (const f of files) {
    const { data, content } = readMarkdownFile(`projects/${f}`);
    if (data.slug === slug) return content;
  }
  return null;
}

export function readAbout(): string {
  const { content } = readMarkdownFile('about.md');
  return content;
}

export function readExperienceDocs(): string {
  const dir = path.join(contentRoot, 'experience');
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'));
  return files.map(f => readMarkdownFile(`experience/${f}`).content).join('\n\n');
}

export function readExtracurriculars(): string {
  const { content } = readMarkdownFile('extracurriculars.md');
  return content;
}
