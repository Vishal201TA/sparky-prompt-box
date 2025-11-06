import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import type { AgentType } from "./AgentSelector";

interface PromptSuggestionsProps {
  value: string;
  agentType: AgentType | undefined;
  onSelect: (suggestion: string) => void;
}

const SEO_SUGGESTIONS = [
  "SEO for blogs focusing on tech reviews",
  "SEO for ecommerce products with eco-friendly features",
  "Create product description highlighting premium quality",
  "Generate meta description for luxury watch",
  "Write SEO content for sustainable fashion brand",
  "Optimize description for fitness equipment",
  "SEO for handmade artisan products",
  "Create compelling product copy for electronics",
];

const IMAGE_SUGGESTIONS = [
  "Enhance lighting and add warm tones",
  "Remove background and add gradient",
  "Boost color vibrancy and contrast",
  "Place product in modern kitchen setting with natural lighting",
  "Create lifestyle scene with the product",
  "Add soft shadows and professional studio lighting",
  "Generate outdoor advertisement scene",
  "Place in minimalist white background",
];

export const PromptSuggestions = ({ value, agentType, onSelect }: PromptSuggestionsProps) => {
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!agentType || value.length < 2) {
      setIsOpen(false);
      return;
    }

    const suggestions = agentType === "seo" ? SEO_SUGGESTIONS : IMAGE_SUGGESTIONS;
    const filtered = suggestions.filter(s => 
      s.toLowerCase().includes(value.toLowerCase())
    );

    setFilteredSuggestions(filtered);
    setIsOpen(filtered.length > 0);
    setSelectedIndex(-1);
  }, [value, agentType]);

  const handleSelect = (suggestion: string) => {
    onSelect(suggestion);
    setIsOpen(false);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!isOpen) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < filteredSuggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleSelect(filteredSuggestions[selectedIndex]);
        }
        break;
      case "Escape":
        setIsOpen(false);
        break;
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown as any);
    return () => document.removeEventListener("keydown", handleKeyDown as any);
  }, [isOpen, selectedIndex, filteredSuggestions]);

  if (!isOpen || filteredSuggestions.length === 0) return null;

  return (
    <Card 
      ref={suggestionsRef}
      className="absolute z-50 w-full mt-1 max-h-48 overflow-y-auto shadow-lg border border-border bg-card"
    >
      {filteredSuggestions.map((suggestion, index) => (
        <button
          key={index}
          onClick={() => handleSelect(suggestion)}
          className={`
            w-full text-left px-4 py-2.5 text-sm transition-colors
            hover:bg-accent hover:text-accent-foreground
            ${index === selectedIndex ? "bg-accent text-accent-foreground" : ""}
            ${index > 0 ? "border-t border-border" : ""}
          `}
        >
          {suggestion}
        </button>
      ))}
    </Card>
  );
};
