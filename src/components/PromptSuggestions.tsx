import { useState, useEffect, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";
import type { AgentType } from "./AgentSelector";

interface PromptSuggestionsProps {
  agentType: AgentType | undefined;
  inputValue: string;
  onSelectSuggestion: (suggestion: string) => void;
}

const SEO_SUGGESTIONS = [
  "SEO for blogs with focus on readability",
  "SEO for ecommerce products highlighting features",
  "Create product description focusing on eco-friendly features",
  "Generate meta description for luxury brand",
  "Optimize title tags for mobile devices",
  "Write SEO content for tech products",
  "Create compelling product headlines",
];

const IMAGE_SUGGESTIONS = [
  "Enhance lighting and increase brightness",
  "Remove background and add gradient",
  "Boost color vibrancy and saturation",
  "Place product in a modern kitchen setting with natural lighting",
  "Create professional studio lighting effect",
  "Add soft shadows and depth",
  "Enhance product on white background",
];

export const PromptSuggestions = ({
  agentType,
  inputValue,
  onSelectSuggestion,
}: PromptSuggestionsProps) => {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!agentType || inputValue.length < 2) {
      setShowSuggestions(false);
      return;
    }

    const allSuggestions =
      agentType === "seo" ? SEO_SUGGESTIONS : IMAGE_SUGGESTIONS;

    const filtered = allSuggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(inputValue.toLowerCase())
    );

    setSuggestions(filtered.slice(0, 5));
    setShowSuggestions(filtered.length > 0);
  }, [inputValue, agentType]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!showSuggestions || suggestions.length === 0) return null;

  return (
    <div ref={containerRef} className="relative z-50">
      <Card className="absolute top-0 left-0 right-0 max-h-[200px] overflow-y-auto shadow-lg border bg-card">
        <div className="p-2 space-y-1">
          <div className="flex items-center space-x-2 px-2 py-1 text-xs text-muted-foreground">
            <Lightbulb className="h-3 w-3" />
            <span>Suggestions</span>
          </div>
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => {
                onSelectSuggestion(suggestion);
                setShowSuggestions(false);
              }}
              className="w-full text-left px-3 py-2 text-sm rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
};
