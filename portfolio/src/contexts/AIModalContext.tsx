"use client";
import { createContext, useContext, useState, type ReactNode } from "react";

interface AIModalContextType {
  isOpen: boolean;
  initialQuery: string;
  openModal: (query?: string) => void;
  closeModal: () => void;
}

const AIModalContext = createContext<AIModalContextType | null>(null);

export function AIModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [initialQuery, setInitialQuery] = useState("");

  const openModal = (query = "") => {
    setInitialQuery(query);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setInitialQuery("");
  };

  return (
    <AIModalContext.Provider value={{ isOpen, initialQuery, openModal, closeModal }}>
      {children}
    </AIModalContext.Provider>
  );
}

export function useAIModal() {
  const ctx = useContext(AIModalContext);
  if (!ctx) {
    throw new Error("useAIModal must be used within AIModalProvider");
  }
  return ctx;
}
