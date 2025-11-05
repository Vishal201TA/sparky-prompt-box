import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export type AgentType = "seo" | "image-enhancer" | "doc-agent";

interface AgentSelectorProps {
  value: AgentType | undefined;
  onChange: (value: AgentType) => void;
  disabled?: boolean;
}

export const AgentSelector = ({ value, onChange, disabled }: AgentSelectorProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="agent-select" className="text-sm font-medium">
        Select Agent
      </Label>
      <Select
        value={value}
        onValueChange={onChange}
        disabled={disabled}
      >
        <SelectTrigger id="agent-select" className="w-full">
          <SelectValue placeholder="Choose an AI agent..." />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="seo">SEO Content Agent</SelectItem>
          <SelectItem value="image-enhancer">Image Enhancer Agent</SelectItem>
          <SelectItem value="doc-agent">Document QA Agent</SelectItem>
        </SelectContent>
      </Select>
      {value && (
        <p className="text-xs text-muted-foreground">
          {value === "seo" 
            ? "Generate SEO-optimized content from product images" 
            : value === "image-enhancer"
            ? "Create enhanced advertisement scenes from product images"
            : "Chat with your documents using RAG-powered AI"}
        </p>
      )}
    </div>
  );
};
