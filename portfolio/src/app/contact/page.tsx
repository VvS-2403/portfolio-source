import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, Linkedin, Github, FileText, ArrowUpRight } from "lucide-react";

const contacts = [
  {
    icon: Mail,
    label: "Email",
    value: "vismay@example.com",
    href: "mailto:vismay@example.com",
    description: "Best for professional inquiries",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/vismay-shanbhag",
    href: "https://linkedin.com/in/vismay-shanbhag",
    description: "Connect professionally",
  },
  {
    icon: Github,
    label: "GitHub",
    value: "github.com/vismayshanbhag",
    href: "https://github.com/vismayshanbhag",
    description: "View my code and projects",
  },
  {
    icon: FileText,
    label: "Resume",
    value: "Download PDF",
    href: "/resume.pdf",
    description: "Updated resume",
  },
];

export default function ContactPage() {
  return (
    <main>
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 pt-32 pb-24">
        <div className="mb-16">
          <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-3">
            Contact
          </p>
          <h1 className="font-display text-5xl text-gray-900 mb-4">
            Get in Touch
          </h1>
          <p className="text-gray-500 max-w-md text-sm leading-relaxed">
            Open to internship opportunities, research collaborations, and
            interesting conversations about AI and machine learning.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
          {contacts.map((contact) => {
            const Icon = contact.icon;
            return (
              <a
                key={contact.label}
                href={contact.href}
                target={contact.href.startsWith("http") ? "_blank" : undefined}
                rel={
                  contact.href.startsWith("http")
                    ? "noopener noreferrer"
                    : undefined
                }
                className="group bg-white rounded-2xl border border-gray-100 shadow-sm p-6 hover:border-blue-200 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 bg-gray-50 group-hover:bg-blue-50 rounded-xl flex items-center justify-center transition-colors">
                    <Icon
                      size={18}
                      className="text-gray-600 group-hover:text-blue-600 transition-colors"
                    />
                  </div>
                  <ArrowUpRight
                    size={15}
                    className="text-gray-300 group-hover:text-blue-500 transition-colors mt-1"
                  />
                </div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                  {contact.label}
                </p>
                <p className="text-sm font-medium text-gray-900 mb-1">
                  {contact.value}
                </p>
                <p className="text-xs text-gray-400">{contact.description}</p>
              </a>
            );
          })}
        </div>

        <div className="mt-12 p-6 bg-blue-50 border border-blue-100 rounded-2xl max-w-2xl">
          <p className="text-sm font-medium text-blue-900 mb-1">
            Update your contact details
          </p>
          <p className="text-xs text-blue-700 leading-relaxed">
            Replace the placeholder email, LinkedIn URL, and GitHub URL in{" "}
            <code className="bg-blue-100 px-1.5 py-0.5 rounded font-mono text-xs">
              portfolio-data/profile.json
            </code>{" "}
            and this page to show your real contact information.
          </p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
