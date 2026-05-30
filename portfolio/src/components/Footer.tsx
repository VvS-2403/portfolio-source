import Link from "next/link";
import { Github, Linkedin, Mail, Sparkles } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <p className="font-display text-lg text-gray-900 mb-1">
              Vismay Vinayak Shanbhag
            </p>
            <p className="text-sm text-gray-500">
              B.E. Mathematics and Computing · BITS Pilani Goa
            </p>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="mailto:vismay@example.com"
              className="w-9 h-9 border border-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:text-blue-600 hover:border-blue-200 transition-colors"
              aria-label="Email"
            >
              <Mail size={15} />
            </a>
            <a
              href="https://linkedin.com/in/vismay-shanbhag"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 border border-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:text-blue-600 hover:border-blue-200 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={15} />
            </a>
            <a
              href="https://github.com/vismayshanbhag"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 border border-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-900 hover:border-gray-400 transition-colors"
              aria-label="GitHub"
            >
              <Github size={15} />
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <Link href="/projects" className="hover:text-gray-900 transition-colors">
              Projects
            </Link>
            <Link href="/experience" className="hover:text-gray-900 transition-colors">
              Experience
            </Link>
            <Link href="/contact" className="hover:text-gray-900 transition-colors">
              Contact
            </Link>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            <Sparkles size={11} />
            <span>AI assistant coming soon</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
