"use client";

import { useState } from "react";
import { Sparkles, Send, Lock } from "lucide-react";
import SuggestedQuestions from "./SuggestedQuestions";

export default function ChatPreview() {
  const [inputValue, setInputValue] = useState("");
  const [selectedQ, setSelectedQ] = useState("");

  const handleSelect = (q: string) => {
    setInputValue(q);
    setSelectedQ(q);
  };

  return (
    <section id="ai-assistant" className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-12">
          <p className="text-xs font-semibold text-blue-600 uppercase tracking-widest mb-3">
            AI Assistant
          </p>
          <h2 className="font-display text-4xl text-gray-900 mb-4">
            Ask My AI Assistant
          </h2>
          <p className="text-gray-500 max-w-xl text-sm leading-relaxed">
            Instead of reading through a static resume, ask questions naturally.
            The AI assistant is trained on my projects, experience, and
            background.
          </p>
        </div>

        <div className="max-w-2xl">
          {/* Chat window mockup */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {/* Chat header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Sparkles size={14} className="text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">
                    Vismay's AI Assistant
                  </p>
                  <p className="text-xs text-gray-400">
                    Powered by RAG + GPT
                  </p>
                </div>
              </div>
              <span className="flex items-center gap-1.5 text-xs text-amber-600 font-medium">
                <Lock size={11} />
                Coming Soon
              </span>
            </div>

            {/* Chat body */}
            <div className="px-5 py-5 space-y-3 min-h-[160px]">
              {/* Bot message */}
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Sparkles size={11} className="text-blue-600" />
                </div>
                <div className="bg-gray-50 rounded-xl rounded-tl-sm px-4 py-3 max-w-xs">
                  <p className="text-sm text-gray-700">
                    Hi! I&apos;m Vismay&apos;s AI assistant. Ask me anything
                    about his background, projects, or experience.
                  </p>
                </div>
              </div>

              {/* User message echo if selected */}
              {selectedQ && (
                <div className="flex items-start gap-3 flex-row-reverse">
                  <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" />
                  <div className="bg-blue-600 rounded-xl rounded-tr-sm px-4 py-3 max-w-xs">
                    <p className="text-sm text-white">{selectedQ}</p>
                  </div>
                </div>
              )}

              {selectedQ && (
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Sparkles size={11} className="text-blue-600" />
                  </div>
                  <div className="bg-gray-50 rounded-xl rounded-tl-sm px-4 py-3 max-w-xs">
                    <p className="text-sm text-gray-500 italic">
                      ✦ This feature is coming soon. The AI backend is under
                      development.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="px-5 py-4 border-t border-gray-100">
              <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-4 py-3">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask anything about Vismay..."
                  className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
                  disabled
                />
                <button
                  disabled
                  className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center opacity-40 cursor-not-allowed"
                >
                  <Send size={13} className="text-white" />
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-2 text-center">
                AI backend under development · Available soon
              </p>
            </div>
          </div>

          {/* Suggested questions */}
          <div className="mt-6">
            <p className="text-xs font-medium text-gray-500 mb-3 uppercase tracking-wide">
              Try asking
            </p>
            <SuggestedQuestions onSelect={handleSelect} />
          </div>
        </div>
      </div>
    </section>
  );
}
