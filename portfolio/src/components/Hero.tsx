"use client";

import Link from "next/link";
import { ArrowRight, Download, Sparkles, MapPin } from "lucide-react";

export default function Hero() {
  return (
    <section className="min-h-screen flex items-center pt-16 bg-white">
      <div className="max-w-6xl mx-auto px-6 py-24 w-full">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 border border-blue-100 rounded-full text-xs font-medium text-blue-700 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            Available for opportunities · Batch of 2028
          </div>

          {/* Name */}
          <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-normal text-gray-900 leading-tight mb-6">
            Vismay Vinayak
            <br />
            <span className="text-blue-600">Shanbhag</span>
          </h1>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500 mb-6">
            <span className="font-medium text-gray-700">
              B.E. Mathematics and Computing
            </span>
            <span className="text-gray-300">·</span>
            <span className="flex items-center gap-1">
              <MapPin size={13} />
              BITS Pilani, K.K. Birla Goa Campus
            </span>
            <span className="text-gray-300">·</span>
            <span className="font-medium text-green-600">CGPA 8.73/10</span>
          </div>

          {/* Summary */}
          <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mb-10">
            Interested in data-driven problem solving — particularly{" "}
            <span className="text-gray-900 font-medium">
              machine learning, data science,
            </span>{" "}
            and{" "}
            <span className="text-gray-900 font-medium">
              retrieval-augmented generation
            </span>
            . I build end-to-end projects and experiment with modern AI
            techniques while gaining real-world experience.
          </p>

          {/* Interest tags */}
          <div className="flex flex-wrap gap-2 mb-10">
            {[
              "Machine Learning",
              "RAG Systems",
              "Data Science",
              "Causal Inference",
              "Full-Stack AI",
            ].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-full hover:bg-gray-700 transition-colors"
            >
              View Projects
              <ArrowRight size={15} />
            </Link>
            <a
              href="/resume.pdf"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-gray-200 text-gray-700 text-sm font-medium rounded-full hover:bg-gray-50 transition-colors"
            >
              <Download size={15} />
              Download Resume
            </a>
            <Link
              href="#ai-assistant"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white text-sm font-medium rounded-full hover:bg-blue-700 transition-colors"
            >
              <Sparkles size={15} />
              Ask My AI Assistant
            </Link>
          </div>
        </div>

        {/* Decorative grid pattern */}
        <div
          className="absolute right-0 top-16 w-1/3 h-screen opacity-[0.03] pointer-events-none hidden lg:block"
          style={{
            backgroundImage:
              "radial-gradient(circle, #000 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
      </div>
    </section>
  );
}
