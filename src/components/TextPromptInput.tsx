import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import type { AgentType } from "./AgentSelector";

interface TextPromptInputProps {
  value: string;
  onChange: (value: string) => void;
  agentType: AgentType | undefined;
  disabled?: boolean;
}

export const TextPromptInput = ({ value, onChange, agentType, disabled }: TextPromptInputProps) => {
  const getLabel = () => {
    if (!agentType) return "Enter Your Prompt";
    return agentType === "seo" ? "Enter SEO Query" : "Enter Creative Prompt";
  };

  const getPlaceholder = () => {
    if (!agentType) return "Select an agent first...";
    return agentType === "seo"
      ? "Describe the SEO content you want to generate... (e.g., 'Create product description focusing on eco-friendly features')"
      : "Describe the advertisement scene you want to create... (e.g., 'Place product in a modern kitchen setting with natural lighting')";
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="prompt-input" className="text-sm font-medium">
        {getLabel()}
      </Label>
      <Textarea
        id="prompt-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={getPlaceholder()}
        disabled={disabled || !agentType}
        className="min-h-[120px] resize-none"
      />
      <p className="text-xs text-muted-foreground">
        Be specific for better results
      </p>
    </div>
  );
};
