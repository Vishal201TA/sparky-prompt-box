import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, Loader2 } from "lucide-react";
import type { AgentType } from "./AgentSelector";

interface Tool {
  name: string;
  status: "idle" | "running" | "completed";
}

interface ToolsPanelProps {
  agentType: AgentType | undefined;
  isRunning: boolean;
  activeTool?: string;
}

const AGENT_TOOLS: Record<AgentType, string[]> = {
  "seo": [
    "InitialImageDescriptionTool",
    "SEOEnhancementTool",
    "SERankingSimilarKeywordTool",
    "SERankingRelatedKeywordTool",
    "SERankingQuestionKeywordTool",
  ],
  "image-enhancer": [
    "GenerativeImageTool",
  ],
};

export const ToolsPanel = ({ agentType, isRunning, activeTool }: ToolsPanelProps) => {
  if (!agentType) return null;

  const tools = AGENT_TOOLS[agentType] || [];

  const getToolStatus = (toolName: string): Tool["status"] => {
    if (!isRunning) return "idle";
    if (activeTool === toolName) return "running";
    const toolIndex = tools.indexOf(toolName);
    const activeIndex = tools.indexOf(activeTool || "");
    if (activeIndex > toolIndex) return "completed";
    return "idle";
  };

  return (
    <Card className="p-4 mb-6 shadow-[var(--shadow-card)]">
      <h3 className="text-sm font-semibold mb-3 text-foreground">Tools Used</h3>
      <div className="flex flex-wrap gap-2">
        {tools.map((tool) => {
          const status = getToolStatus(tool);
          return (
            <Badge
              key={tool}
              variant={status === "running" ? "default" : "outline"}
              className={`
                px-3 py-1.5 text-xs font-medium transition-all duration-300
                ${status === "running" ? "animate-pulse shadow-lg shadow-primary/50" : ""}
                ${status === "completed" ? "border-green-500 text-green-700 dark:text-green-400" : ""}
              `}
            >
              {status === "running" && (
                <Loader2 className="h-3 w-3 mr-1.5 animate-spin inline" />
              )}
              {status === "completed" && (
                <Check className="h-3 w-3 mr-1.5 inline text-green-600 dark:text-green-400" />
              )}
              {tool}
            </Badge>
          );
        })}
      </div>
    </Card>
  );
};
