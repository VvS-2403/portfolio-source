"use client";

interface SuggestedQuestionsProps {
  onSelect?: (question: string) => void;
}

const questions = [
  "Tell me about yourself",
  "Explain your transformer project",
  "What extracurricular activities have you participated in?",
  "Why are you interested in AI?",
  "What are your future goals?",
  "What technologies do you work with?",
  "Describe your causal uplift modeling project",
];

export default function SuggestedQuestions({
  onSelect,
}: SuggestedQuestionsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {questions.map((q) => (
        <button
          key={q}
          onClick={() => onSelect?.(q)}
          className="px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-blue-50 hover:text-blue-700 border border-transparent hover:border-blue-100 rounded-full transition-all cursor-pointer"
        >
          {q}
        </button>
      ))}
    </div>
  );
}
